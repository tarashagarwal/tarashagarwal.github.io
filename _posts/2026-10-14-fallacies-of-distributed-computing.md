---
layout: portfolio-modern
article: true
title: "Eight fallacies of distributed computing: design for the network you actually have"
date: 2026-10-14 21:25:20 -0500
updated: 2026-10-14
excerpt: "Distributed systems cannot assume reliable, instant, free, secure, or uniform communication. Treat the eight fallacies as a checklist for explicit failure handling and operational boundaries."
summary: "Distributed systems cannot assume reliable, instant, free, secure, or uniform communication. Treat the eight fallacies as a checklist for explicit failure handling and operational boundaries."
kicker: "ENGINEERING LAWS / 20 OF 20 / DISTRIBUTED SYSTEMS CHECKLIST"
cover_image: /images/articles/engineering-laws/fallacies-of-distributed-computing.svg
permalink: /posts/2026/10/fallacies-of-distributed-computing/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 20
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 20 / 20 · Distributed systems checklist</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/fallacies-of-distributed-computing.svg" alt="Eight distributed-system concerns arranged in two rows: delivery, latency, capacity, security, topology, ownership, cost, and compatibility. Each is paired with a practical design consideration." caption="Question all eight assumptions. A timeout does not establish whether an operation committed." height="470" %}

## What it means

The **fallacies of distributed computing** are eight assumptions that break down when software communicates across a network. They form a practical design checklist. Oracle’s architecture guidance reproduces the familiar checklist. [Oracle Reference Architecture, Application Infrastructure Foundation](https://www.oracle.com/technetwork/topics/entarch/oracle-ra-application-infr-r3-0-176698.pdf).

The following table paraphrases the eight assumptions and turns each into a review question. The controls are design examples, not guarantees that one setting solves a distributed system.

## Worked example

| Misleading assumption | A practical question |
| --- | --- |
| Communication always succeeds | What happens after loss, duplication, or disconnection? |
| Messages arrive instantly | What is the end-to-end deadline and latency budget? |
| Capacity is unlimited | Where are payload, concurrency, and queue bounds? |
| The network is inherently safe | How are peers authenticated and actions authorized? |
| Addresses and routes stay fixed | How do discovery, failover, and stale connections work? |
| One authority controls everything | Who owns each dependency and coordinates incidents? |
| Moving data has no cost | What are the bandwidth, compute, and operational costs? |
| All machines speak identically | How are versions, encodings, and schemas reconciled? |

Imagine a checkout service asking a payment service to charge an order. The payment commits, but the response is lost. The checkout timeout cannot distinguish “never charged” from “charged, acknowledgement missing.” An immediate retry with a new identity can charge twice. This invented example connects several fallacies: unreliable communication, nonzero latency, and differing views of state.

## Put it to work

Assign a stable business operation identity before the first attempt. The payment service needs durable deduplication semantics that return the prior outcome for a repeated operation, with clearly defined retention and transaction boundaries. The checkout service also needs a way to query or reconcile an uncertain result.

Apply bounded retries only where semantics permit them. Use backoff and jitter, propagate deadlines, and prevent retries at several layers from multiplying load uncontrollably. A timeout should produce an explicit state instead of an invented assertion that the operation failed.

For agent tools, preserve these distinctions in the tool result. An agent should not issue another purchase because it saw no reply. Authorization, idempotency, and reconciliation belong in the executing system, beyond the model’s natural-language reasoning.

## Limits and misuses

The checklist is not a demand to build a globally distributed platform for every small application. Deployment scope and consequences determine how much machinery is justified.

It also does not make “exactly once” a property of a queue checkbox. End-to-end business effects depend on durable state, transaction boundaries, retries, and external systems. Review the complete workflow under partial failure. A good design makes uncertainty visible and recovery possible instead of assuming the network behaved like a local function call.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/zipfs-law/' | relative_url }}">← Previous: Zipf’s law</a></nav>
