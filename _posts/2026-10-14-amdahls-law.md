---
layout: portfolio-modern
article: true
title: "Amdahl’s law: why more workers stop making a fixed job faster"
date: 2026-10-14 21:25:03 -0500
updated: 2026-10-14
excerpt: "For a fixed workload with parallel fraction p, ideal speedup is 1 / ((1 − p) + p/N). The serial portion creates a ceiling even before communication and scheduling overhead."
summary: "For a fixed workload with parallel fraction p, ideal speedup is 1 / ((1 − p) + p/N). The serial portion creates a ceiling even before communication and scheduling overhead."
kicker: "ENGINEERING LAWS / 03 OF 20 / PARALLEL SPEEDUP MODEL"
cover_image: /images/articles/engineering-laws/amdahls-law.svg
permalink: /posts/2026/10/amdahls-law/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 3
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 03 / 20 · Parallel speedup model</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/amdahls-law.svg" alt="A 100-second job with 10 serial seconds and 90 parallel seconds takes an ideal 21.25 seconds on eight workers: a 4.71× speedup." caption="A 100-second job with 10 serial seconds and 90 parallel seconds takes an ideal 21.25 seconds on eight workers: a 4.71× speedup." height="470" %}

## What it means

Amdahl’s law asks how much faster the **same amount of work** can finish when only part of it benefits from parallel execution. In the simplified model, p is the fraction of the one-worker runtime that can be divided perfectly across N workers:

**S(N) = 1 / ((1 − p) + p/N)**.

The fixed-size formulation and its relation to other scaling models are discussed in Sun and Ni’s primary research. [Scalable problems and memory bounded speedup](https://ntrs.nasa.gov/citations/19930007365). The formula assumes no extra overhead and an unchanged serial part.

## Worked example

Consider a hypothetical data export that takes 100 seconds: 10 seconds to prepare a consistent snapshot and 90 seconds to transform independent records. Eight ideal workers reduce the transform stage to 90/8 = 11.25 seconds. Total time becomes **21.25 seconds**, giving **100/21.25 ≈ 4.71×** speedup.

With infinitely fast parallel work, the job still needs its 10 serial seconds. The ceiling is 10×. Buying 80 workers instead of eight therefore cannot deliver an 80× improvement under these assumptions.

Now imagine reducing snapshot preparation to two seconds while preserving the same 90-second transform work. On eight workers the revised job takes 13.25 seconds. Removing a serial bottleneck can beat adding a large number of workers to the unchanged design.

## Put it to work

Profile the critical path before choosing a concurrency setting. Split time into stages that must happen in sequence and work that can actually overlap. Measure coordination, serialization, shared locks, and data movement separately; they are real time even when a dashboard labels them “overhead.”

In an agent workflow, independent retrieval calls may run together. A tool whose arguments depend on a previous tool result cannot simply be launched at the same time. Parallelizing dependent actions may change correctness rather than improve performance.

Run the same dataset and quality checks at one, two, four, and eight workers. Compare measured runtime with the ideal curve. The gap is useful evidence about contention or imbalance, rather than a reason to hide the baseline.

## Limits and misuses

This is a model of fixed work, not a claim that large parallel computers are pointless. A larger machine may let a team solve a larger problem in the same time, which is the question behind Gustafson’s law.

Cache effects, altered algorithms, and different memory behavior can change the assumptions and sometimes produce apparent superlinear speedup. Report those changes explicitly. The practical lesson is to identify what remains serial and measure the whole job, rather than equating worker count with speedup.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/littles-law/' | relative_url }}">← Previous: Little’s law</a>
<a href="{{ '/posts/2026/10/gustafsons-law/' | relative_url }}">Next: Gustafson’s law →</a></nav>
