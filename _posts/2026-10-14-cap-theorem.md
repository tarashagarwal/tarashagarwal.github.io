---
layout: portfolio-modern
article: true
title: "CAP theorem: what a network partition forces you to choose"
date: 2026-10-14 21:25:01 -0500
updated: 2026-10-14
excerpt: "During a network partition, a distributed read/write system cannot guarantee both linearizable consistency and a response for every request. Make the choice for each operation, using the business consequence of stale data or refusal."
summary: "During a network partition, a distributed read/write system cannot guarantee both linearizable consistency and a response for every request. Make the choice for each operation, using the business consequence of stale data or refusal."
kicker: "ENGINEERING LAWS / 01 OF 20 / THEOREM"
cover_image: /images/articles/engineering-laws/cap-theorem.svg
permalink: /posts/2026/10/cap-theorem/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 1
sections:
  - id: what-it-means
    title: "What it means"
  - id: worked-example
    title: "Worked example"
  - id: put-it-to-work
    title: "Put it to work"
  - id: limits-and-misuses
    title: "Limits and misuses"
---
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 01 / 20 · Theorem</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/cap-theorem.svg" alt="Two replicas lose contact. Refusing an uncertain write protects a single order; accepting independent writes preserves responses but can create conflicting state." caption="Two replicas lose contact. Refusing an uncertain write protects a single order; accepting independent writes preserves responses but can create conflicting state." height="470" %}

## What it means

CAP is a statement about guarantees in a distributed system, rather than a shopping list of database features. Its consistency is a single, real-time order of operations, usually expressed as linearizability. Its availability requires every request to a non-failing node to receive a response under the model. A partition prevents some nodes from communicating. In that situation, both guarantees cannot always be maintained. [Gilbert and Lynch, Perspectives on the CAP Theorem](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf).

The useful design question is what an isolated replica should do when it cannot establish the latest state. “Pick any two” hides that decision. Partition tolerance is not an optional feature when the deployment can experience a partition.

## Worked example

Imagine a ticket service with one seat left. Two regions initially agree that it is available. Their connection fails, and each region receives a purchase request.

If both confirm a sale independently, customers receive immediate answers, but the system can oversell. If one region requires coordination before confirming, its request may wait or fail while the partition lasts. That sacrifices CAP availability for that operation, rather than promising both customers the same exclusive seat.

A browsing endpoint can make a different choice: show cached seat availability with a freshness label, then require stronger coordination at purchase time. These are illustrative product decisions, not guarantees supplied by a particular database name.

## Put it to work

Write a small decision table for each important operation: what invariant must hold, how stale may a read be, and what happens when quorum or the authoritative owner is unreachable? Test a partition between regions, not just the failure of one process. Those failures expose different behavior.

For an agent platform, a search result might tolerate a slightly old index. A tool that transfers ownership or spends a limited budget needs a more explicit decision about coordination and refusal. The model should receive an honest “not confirmed” result rather than inventing success from a timeout.

Give the UI distinct states for unavailable, pending, and confirmed. Reconnection also needs a plan for conflict resolution and reconciliation.

## Limits and misuses

CAP consistency is different from the C in ACID. CAP availability is also different from a monthly uptime percentage or a latency service objective. The theorem does not choose a replication protocol, calculate throughput, or settle every trade-off during normal operation.

A practical review should therefore name the operation, failure scenario, and guarantee. “This system is CP” is much less informative than explaining why a purchase refuses to commit when it cannot establish exclusive ownership.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/littles-law/' | relative_url }}">Next: Little’s law →</a></nav>
