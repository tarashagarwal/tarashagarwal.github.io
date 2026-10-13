---
layout: portfolio-modern
article: true
title: "Diagnosing database scaling before changing databases"
date: 2022-11-02
updated: 2026-10-13
excerpt: "A practical path from slow-query evidence to indexes, partitioning, caching, and specialized read models."
summary: "More rows do not automatically require a new database. Inspect the query plan and workload first, reduce unnecessary work, then choose a scaling technique that addresses the measured bottleneck."
kicker: "ENGINEERING NOTES / FIELD GUIDE"
permalink: /posts/2022/11/the-database-scaling-issue/
tags: ["database", "postgresql", "performance"]
sections:
  - id: start-with-evidence
    title: "Start with evidence"
  - id: improve-the-query
    title: "Improve the query"
  - id: choose-the-next-boundary
    title: "Choose the next boundary"
  - id: verify-the-result
    title: "Verify the result"
---
## Start with evidence

A growing table can expose poor query patterns, stale statistics, I/O pressure, or lock contention. Index tree depth is only one part of the cost. Returning a huge result set is expensive even when finding its first row is fast.

PostgreSQL’s `EXPLAIN` shows the planner’s chosen operations. `EXPLAIN ANALYZE` actually executes the statement and adds observed timing and row counts; use care with statements that modify data. Compare estimates with actual rows rather than interpreting a single number as the entire diagnosis. [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html).

{% include article-diagram.html image="/images/articles/database-scaling.svg" alt="Measure the workload, inspect the plan, optimize queries, then evaluate partitioning or specialized read models and measure again." caption="Scaling is a feedback loop: gather evidence before introducing a new data boundary." %}

## Improve the query

Consider an illustrative activity feed that repeatedly asks for the latest events for one customer:

```sql
SELECT id, created_at, event_type
FROM events
WHERE account_id = 42
ORDER BY created_at DESC
LIMIT 50;
```

An index aligned with the filter and ordering is a candidate to evaluate. Avoid selecting large payloads if the screen only needs three columns. Record the query plan before and after the change, along with write overhead and index storage.

Pagination needs similar care: fetching every event and trimming the result in application memory shifts work rather than removing it. A cursor based on the ordering keys can support incremental navigation when its tie-breaking rules are explicit.

## Choose the next boundary

Partitioning can help when queries filter on a partition key and the planner can prune unrelated partitions. It is less helpful when every request touches most partitions. Design partition maintenance and retention before relying on it. [PostgreSQL partitioning](https://www.postgresql.org/docs/current/ddl-partitioning.html).

| Symptom | Candidate approach | Trade-off to examine |
| --- | --- | --- |
| Repeated expensive reads | Cache | Freshness and invalidation |
| Independent read traffic | Read replicas | Replication lag |
| Large time-oriented history | Time partitioning | Pruning and partition maintenance |
| Search or analytics workload | Derived read model | Synchronization and rebuilds |

Deleting or truncating records is not a general scaling strategy. Retention decisions should follow the product’s data requirements and recovery plan.

## Verify the result

Benchmark a representative mix of reads and writes. Track tail latency, throughput, lock waits, and failure behavior. A fast isolated query can still produce a slow application if requests wait on a connection pool or a downstream service.

Keep the smallest change that demonstrably improves the workload, then measure again as usage grows.
