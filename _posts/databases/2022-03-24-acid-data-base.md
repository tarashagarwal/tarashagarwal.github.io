---
layout: portfolio-modern
article: true
title: "ACID transactions: guarantees, boundaries, and trade-offs"
date: 2022-03-25
updated: 2026-10-13
excerpt: "What atomicity, consistency, isolation, and durability mean in a practical transaction, including document databases."
summary: "ACID describes transaction guarantees, not a relational-only database category. Identify the operations that must succeed together, define the invariants, choose an isolation level, and handle retries and side effects deliberately."
kicker: "ENGINEERING NOTES / FIELD GUIDE"
tags: ["database", "ACID", "transactions"]
sections:
  - id: four-guarantees
    title: "Four guarantees"
  - id: a-worked-transaction
    title: "Worked transaction"
  - id: beyond-relational
    title: "Beyond relational"
  - id: outside-the-boundary
    title: "Outside the boundary"
---
## Four guarantees

A transaction groups operations into a logical unit. PostgreSQL’s transaction tutorial illustrates how a set of changes can commit together or be rolled back. [PostgreSQL transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html).

| Property | Practical meaning |
| --- | --- |
| Atomicity | The transaction’s changes succeed together or are rolled back |
| Consistency | Valid operations preserve defined invariants and constraints |
| Isolation | Concurrent transactions interact according to an isolation level |
| Durability | Committed changes persist according to the database’s configured guarantees |

Consistency does not mean the database automatically knows every business rule. Constraints and application logic must express those rules. Isolation also has levels: a transaction is not automatically equivalent to executing every request serially.

## A worked transaction

Consider an illustrative inventory reservation. Creating a reservation and reducing available stock should share a transaction boundary so the application does not persist only one of those changes.

```sql
BEGIN;

WITH reserved AS (
  UPDATE inventory
  SET available = available - 1
  WHERE product_id = 42 AND available > 0
  RETURNING product_id
)
INSERT INTO reservations (product_id, customer_id)
SELECT product_id, 7 FROM reserved;

COMMIT;
```

This is a teaching sketch, not a complete checkout implementation. If no stock row is updated, this statement inserts no reservation; the application must handle that sold-out result. It also needs an idempotency strategy for repeated requests and a deliberate plan for concurrency.

{% include article-diagram.html image="/images/articles/acid-transactions.svg" alt="Begin a transaction, validate and reserve inventory, create the reservation, and commit; a failure rolls back the grouped changes." caption="The commit boundary groups database changes. Failures before commit take the rollback path." %}

## Beyond relational

ACID is not exclusive to relational databases. MongoDB documents multi-document transactions, including the trade-offs involved; its data model can also keep related values inside a single document when that suits the workload. [MongoDB transactions](https://www.mongodb.com/docs/manual/core/transactions/).

Choose a model around the invariants and access patterns rather than using “SQL” or “NoSQL” as a substitute for examining the actual guarantees.

## Outside the boundary

A database transaction does not automatically include an email service or a payment API. Committing the reservation and then sending a notification introduces another failure point.

A practical design can record an event with the reservation, then deliver that event asynchronously with retries. Define what happens when delivery repeats or the downstream system is unavailable. The application remains responsible for these cross-system behaviors even when its database transactions are correct.
