---
layout: portfolio-modern
article: true
title: "Gustafson’s law: use more compute to solve a larger problem"
date: 2026-10-14 21:25:04 -0500
updated: 2026-10-14
excerpt: "Gustafson holds elapsed time roughly fixed while the parallel workload grows. S = N − α(N − 1), where α is the serial fraction measured on the parallel run, describes that different scaling question."
summary: "Gustafson holds elapsed time roughly fixed while the parallel workload grows. S = N − α(N − 1), where α is the serial fraction measured on the parallel run, describes that different scaling question."
kicker: "ENGINEERING LAWS / 04 OF 20 / SCALED SPEEDUP MODEL"
cover_image: /images/articles/engineering-laws/gustafsons-law.svg
permalink: /posts/2026/10/gustafsons-law/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 4
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 04 / 20 · Scaled speedup model</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/gustafsons-law.svg" alt="In a normalized one-hour run on 32 workers, 5% serial time and 95% parallel time correspond to 30.45 hours of ideal one-worker work." caption="In a normalized one-hour run on 32 workers, 5% serial time and 95% parallel time correspond to 30.45 hours of ideal one-worker work." height="470" %}

## What it means

Sometimes success means doing more work within a deadline rather than finishing yesterday’s dataset sooner. Gustafson’s scaled-speedup model starts with the elapsed time of a parallel run and asks how long one worker would need for that enlarged workload:

**S(N) = N − α(N − 1)**.

Here α is the serial fraction of the **parallel execution time**. It is not the same parameter as the parallel fraction of a one-worker baseline in Amdahl’s formula. Sun and Ni study these fixed-time and fixed-size models together. [Scalable problems and memory bounded speedup](https://ntrs.nasa.gov/citations/19930007365).

## Worked example

Imagine a simulation on 32 workers with a one-hour budget. The run uses 0.05 hours for serial setup and 0.95 hours for perfectly parallel computation. Running that exact enlarged computation on one worker would take **0.05 + 32 × 0.95 = 30.45 hours**, ignoring overhead.

The scaled speedup is therefore 30.45×. That does not mean the original small simulation became 30.45 times faster. It means the enlarged run contains that much ideal one-worker work while remaining inside the hour.

A product equivalent is an offline evaluation service. More workers could evaluate more independent examples before a morning release meeting, even if a single evaluation has not become faster. The valuable output is broader coverage within the same wall-clock window.

## Put it to work

Define the scaling objective before benchmarking. State whether the dataset stays fixed, grows with worker count, or grows subject to a memory budget. For an evaluation pipeline, report evaluated examples, completed runs, cost, and wall time together.

Check that the supposedly serial setup remains close to constant as the dataset grows. Loading a larger manifest, merging results, or writing one shared report can quietly become the new bottleneck. A design that scales independent computation can still run into a central database or storage limit.

Use enough work per worker to make distribution worthwhile, then verify result equivalence. Increasing the volume of low-quality evaluations is not an improvement merely because the cluster stays busy.

## Limits and misuses

Gustafson’s law does not invalidate Amdahl’s law. They hold different things fixed and therefore answer different questions. A useful performance report can show both: latency for a fixed dataset and capacity for a fixed deadline.

Real communication, uneven task sizes, memory pressure, and costs are absent from the simple formula. Nor does it promise that more data produces proportionally more product value. Use the model to frame a scaled experiment, then measure what the larger workload actually delivers.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/amdahls-law/' | relative_url }}">← Previous: Amdahl’s law</a>
<a href="{{ '/posts/2026/10/universal-scalability-law/' | relative_url }}">Next: Universal scalability law →</a></nav>
