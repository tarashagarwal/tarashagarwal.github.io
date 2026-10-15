---
layout: portfolio-modern
article: true
title: "Little’s law: connect throughput, latency, and work in progress"
date: 2026-10-14 21:25:02 -0500
updated: 2026-10-14
excerpt: "L = λW relates average work in a system to its effective throughput and average time inside the same boundary. Use consistent units and stable averages; it does not predict tail latency."
summary: "L = λW relates average work in a system to its effective throughput and average time inside the same boundary. Use consistent units and stable averages; it does not predict tail latency."
kicker: "ENGINEERING LAWS / 02 OF 20 / QUEUEING RELATIONSHIP"
cover_image: /images/articles/engineering-laws/littles-law.svg
permalink: /posts/2026/10/littles-law/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 2
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 02 / 20 · Queueing relationship</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/littles-law.svg" alt="At 200 completed requests per second and 0.25 seconds average response time, the average number of requests in flight is 50." caption="At 200 completed requests per second and 0.25 seconds average response time, the average number of requests in flight is 50." height="470" %}

## What it means

Little’s law connects three long-run averages: **L**, the number of items inside a system; **λ**, the effective arrival or throughput rate; and **W**, the time an item spends there. With a consistent boundary and suitable stable averages, **L = λ × W**. John Little’s retrospective explains both the relationship and its conditions. [Little, Little’s Law as Viewed on Its 50th Anniversary](https://people.cs.umass.edu/~emery/classes/cmpsci691st/readings/OS/Littles-Law-50-Years-Later.pdf).

The boundary matters. Time spent waiting in a queue belongs in W if queued items belong in L. A measurement of active execution cannot be combined casually with end-to-end latency.

## Worked example

Suppose an API completes 200 requests per second over a stable measurement window. A request spends an average of 250 milliseconds, or 0.25 seconds, between admission and completion. The average in-flight population is **200 × 0.25 = 50 requests**.

If the same admitted rate continues while average latency rises to 0.75 seconds, the implied population becomes 150. That extra work occupies memory, connection slots, and downstream capacity. Increasing a queue limit may absorb a burst, but it does not remove the reason work is taking longer.

These figures are an invented example. They are an average occupancy estimate, not a recommendation to configure exactly 50 workers. Capacity headroom and burst behavior require additional analysis.

## Put it to work

Instrument admission, completion, rejection, queue depth, and time in the system. Compute rate and latency over matching windows after warm-up. Compare measured occupancy with the estimate; a large mismatch can reveal an inconsistent boundary or a growing backlog.

For an AI job service, distinguish accepted jobs waiting for a worker from jobs currently calling a model. A model connection pool is only one subsystem. End-to-end user waiting includes scheduling, retrieval, generation, and publication checks.

Put limits at admission so a slowdown cannot create unlimited work in progress. When demand exceeds capacity, a clear rejection or a bounded asynchronous queue can be more useful than accepting jobs that will miss their deadlines.

## Limits and misuses

Do not multiply a p99 latency by average throughput and call the result p99 concurrency. Little’s law concerns averages. It also cannot infer a latency distribution from one number.

If arrivals exceed departures and the backlog keeps growing, a short window is not evidence of a steady state. Include cancellations and rejected work consistently, and avoid mixing offered traffic with the rate actually admitted. Use the relationship as a measurement check and planning aid, then test realistic bursts separately.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/cap-theorem/' | relative_url }}">← Previous: CAP theorem</a>
<a href="{{ '/posts/2026/10/amdahls-law/' | relative_url }}">Next: Amdahl’s law →</a></nav>
