---
layout: portfolio-modern
article: true
title: "Gustafson’s law for AI agents: evaluate more within the same deadline"
date: 2026-10-14 21:25:04 -0500
updated: 2026-10-14
excerpt: "More workers can expand an agent evaluation or research workload within a fixed time budget. That is a different goal from making one unchanged conversation faster."
summary: "More workers can expand an agent evaluation or research workload within a fixed time budget. That is a different goal from making one unchanged conversation faster."
kicker: "DESIGNING AI AGENTS / RULE 04 OF 20 / SCALED SPEEDUP MODEL"
cover_image: /images/articles/engineering-laws/agents/gustafsons-law.svg
permalink: /posts/2026/10/gustafsons-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 4
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 04 / 20 · Scaled speedup model</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/gustafsons-law.svg" alt="AI agent design example: One-hour budget: 5% serial preparation. 32 evaluation workers: 95% parallel execution. 30.45× scaled work: Ideal model, excluding overhead." caption="Before scaling an agent pipeline, decide whether success means lower latency or more useful work within a fixed window." height="470" %}

## What it means

Sometimes success means doing more work within a deadline rather than finishing yesterday’s dataset sooner. Gustafson’s scaled-speedup model starts with the elapsed time of a parallel run and asks how long one worker would need for that enlarged workload:

**S(N) = N − α(N − 1)**.

Here α is the serial fraction of the **parallel execution time**. It is not the same parameter as the parallel fraction of a one-worker baseline in Amdahl’s formula. Sun and Ni study these fixed-time and fixed-size models together. [Scalable problems and memory bounded speedup](https://ntrs.nasa.gov/citations/19930007365).

{% include article-diagram.html image="/images/articles/engineering-laws/gustafsons-law.svg" alt="In a normalized one-hour run on 32 workers, 5% serial time and 95% parallel time correspond to 30.45 hours of ideal one-worker work." caption="In a normalized one-hour run on 32 workers, 5% serial time and 95% parallel time correspond to 30.45 hours of ideal one-worker work." height="470" %}

## AI agent example

Imagine an agent evaluation pipeline with a one-hour release window. On 32 workers, serial preparation and aggregation take 0.05 hours. Independent test cases occupy the remaining 0.95 hours.

Under the ideal model, one worker would need **0.05 + 32 × 0.95 = 30.45 hours** for that enlarged workload. The scaled speedup is 30.45×. The product benefit is broader evaluation coverage before the release decision, rather than a claim that every chat answer is 30.45 times faster.

The team might cover more tool-failure scenarios, longer conversations, or additional retrieval collections. It should preserve the scoring method so increased case volume does not become a substitute for meaningful coverage.

If aggregation now needs to read a much larger trace archive, the serial fraction may grow. Measure that change instead of assuming the one-hour budget remains achievable at every scale.

## Before you build

State the objective explicitly: faster answers for a fixed task, more completed cases before a deadline, or more coverage under a cost cap. Report wall time, completed valid cases, cost, and failure distribution together.

Keep evaluation cases independent where possible, and define how partial completion affects the release decision. A batch that silently drops hard cases can appear to scale while producing less trustworthy evidence.

**Design decision:** Before scaling an agent pipeline, decide whether success means lower latency or more useful work within a fixed window.

## Limits and misuses

Gustafson’s law does not invalidate Amdahl’s law. They hold different things fixed and therefore answer different questions. A useful performance report can show both: latency for a fixed dataset and capacity for a fixed deadline.

Real communication, uneven task sizes, memory pressure, and costs are absent from the simple formula. Nor does it promise that more data produces proportionally more product value. Use the model to frame a scaled experiment, then measure what the larger workload actually delivers.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/amdahls-law/' | relative_url }}">← Previous: Amdahl’s law</a>
<a href="{{ '/posts/2026/10/universal-scalability-law/' | relative_url }}">Next: Universal scalability law →</a></nav>
