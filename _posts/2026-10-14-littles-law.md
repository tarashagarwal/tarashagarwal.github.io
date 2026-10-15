---
layout: portfolio-modern
article: true
title: "Little’s law for AI agents: size the work in progress"
date: 2026-10-14 21:25:02 -0500
updated: 2026-10-14
excerpt: "Ten admitted agent runs per second with five seconds average end-to-end time imply 50 runs in flight on average. Measure the same boundary before sizing queues, workers, and memory."
summary: "Ten admitted agent runs per second with five seconds average end-to-end time imply 50 runs in flight on average. Measure the same boundary before sizing queues, workers, and memory."
kicker: "DESIGNING AI AGENTS / RULE 02 OF 20 / QUEUEING RELATIONSHIP"
cover_image: /images/articles/engineering-laws/agents/littles-law.svg
permalink: /posts/2026/10/littles-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 2
sections:
  - id: what-it-means
    title: "What it means"
  - id: ai-agent-example
    title: "AI agent example"
  - id: before-you-build
    title: "Before you build"
  - id: limits-and-misuses
    title: "Limits and misuses"
---
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 02 / 20 · Queueing relationship</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/littles-law.svg" alt="AI agent design example: 10 runs / second: Admitted throughput. 5 seconds / run: Average end-to-end time. 50 runs in flight: Average occupancy, not a limit." caption="Before increasing concurrency, measure how many runs are waiting and how long they remain inside each stage." height="470" %}

## What it means

Little’s law connects three long-run averages: **L**, the number of items inside a system; **λ**, the effective arrival or throughput rate; and **W**, the time an item spends there. With a consistent boundary and suitable stable averages, **L = λ × W**. John Little’s retrospective explains both the relationship and its conditions. [Little, Little’s Law as Viewed on Its 50th Anniversary](https://people.cs.umass.edu/~emery/classes/cmpsci691st/readings/OS/Littles-Law-50-Years-Later.pdf).

The boundary matters. Time spent waiting in a queue belongs in W if queued items belong in L. A measurement of active execution cannot be combined casually with end-to-end latency.

## AI agent example

Suppose a support-agent service admits ten runs per second during a stable period. A run spends an average of five seconds between admission and completion, including retrieval, model calls, tool waiting, and output checks. Little’s law gives **L = 10 × 5 = 50 runs** in the system on average.

If the admitted rate stays constant while average completion time grows to 12 seconds, average work in progress becomes 120 runs. Those runs retain conversation state and may occupy connections or worker capacity. Adding a larger queue does not make the underlying calls finish sooner.

Track a model-call pool separately. If the five-second run only spends two seconds inside one model-call stage, the whole-run estimate cannot be used as that stage’s occupancy. Multiple model calls per run further change the rate at that boundary.

These are illustrative averages, not a prescription to configure 50 workers or a prediction of burst concurrency.

## Before you build

Record admission, queue entry, tool start, model start, cancellation, and completion. Calculate rate and time for matching boundaries and windows. Count accepted runs consistently when retries or cancellations occur.

Give each run a deadline and bound the admission queue. Show a useful queued state or reject overload clearly. Monitor average work in progress alongside tail latency so a stable average cannot conceal users waiting far longer than expected.

**Design decision:** Before increasing concurrency, measure how many runs are waiting and how long they remain inside each stage.

## Limits and misuses

Do not multiply a p99 latency by average throughput and call the result p99 concurrency. Little’s law concerns averages. It also cannot infer a latency distribution from one number.

If arrivals exceed departures and the backlog keeps growing, a short window is not evidence of a steady state. Include cancellations and rejected work consistently, and avoid mixing offered traffic with the rate actually admitted. Use the relationship as a measurement check and planning aid, then test realistic bursts separately.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/cap-theorem/' | relative_url }}">← Previous: CAP theorem</a>
<a href="{{ '/posts/2026/10/amdahls-law/' | relative_url }}">Next: Amdahl’s law →</a></nav>
