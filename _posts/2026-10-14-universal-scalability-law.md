---
layout: portfolio-modern
article: true
title: "The universal scalability law for AI agents: find the concurrency limit"
date: 2026-10-14 21:25:05 -0500
updated: 2026-10-14
excerpt: "An agent fleet can slow down as workers compete for shared state and coordination. Measure completed tasks, fit the scaling curve cautiously, and investigate the point where more concurrency stops helping."
summary: "An agent fleet can slow down as workers compete for shared state and coordination. Measure completed tasks, fit the scaling curve cautiously, and investigate the point where more concurrency stops helping."
kicker: "DESIGNING AI AGENTS / RULE 05 OF 20 / SCALABILITY MODEL"
cover_image: /images/articles/engineering-laws/agents/universal-scalability-law.svg
permalink: /posts/2026/10/universal-scalability-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 5
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 05 / 20 · Scalability model</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/universal-scalability-law.svg" alt="AI agent design example: 8 workers: Model capacity: 6.39×. About 22 workers: Illustrative throughput peak. 64 workers: Model capacity: 6.20×." caption="Before adding more agent workers, verify that successful throughput still increases at the proposed concurrency." height="470" %}

## What it means

Amdahl’s ideal curve approaches a ceiling. Many production systems do something less pleasant: throughput rises, peaks, and then falls. Neil Gunther’s universal scalability law supplies a model that can express that behavior:

**C(N) = N / (1 + α(N − 1) + βN(N − 1))**.

C is capacity normalized to one worker, α represents contention, and β represents a concurrency-dependent coordination penalty. A baseline throughput factor converts normalized capacity into throughput units. [Gunther, A General Theory of Computational Scalability Based on Rational Functions](https://arxiv.org/abs/0808.1431). These coefficients describe a fitted model; they do not independently prove a physical cause.

{% include article-diagram.html image="/images/articles/engineering-laws/universal-scalability-law.svg" alt="With illustrative contention α = 0.02 and coordination β = 0.002, normalized throughput peaks near 22 workers and declines as concurrency grows further." caption="With illustrative contention α = 0.02 and coordination β = 0.002, normalized throughput peaks near 22 workers and declines as concurrency grows further." height="470" %}

## AI agent example

Suppose an agent-job service adds workers while every run reads shared memory and writes checkpoints through the same service. More workers help initially. Later, contention and coordination consume an increasing part of the run.

With the illustrative USL coefficients α = 0.02 and β = 0.002, normalized throughput is **6.39×** at eight workers, peaks near 22 workers, reaches **8.88×** at 32, and falls to **6.20×** at 64. These are model outputs, not measurements of an agent provider or framework.

If completed tasks decline as the fleet grows, investigate the checkpoint store, shared locks, hot keys, connection pools, and upstream admission limits. A retry storm can make attempted calls rise while useful completions fall.

Do not infer a specific physical bottleneck from a fitted coefficient alone. The curve helps choose experiments; traces and controlled changes establish which resource is actually responsible.

## Before you build

Sweep agent-run concurrency using the same task mix, model configuration, and deployment resources. Record successful completions, latency, rate-limit responses, checkpoint delays, and cost. Reserve measurements to validate any fitted curve.

Bound retries and in-flight work. Consider reducing shared writes or partitioning state when evidence supports it. Keep the operating point below saturation with room for bursts, rather than autoscaling solely from queue depth.

**Design decision:** Before adding more agent workers, verify that successful throughput still increases at the proposed concurrency.

## Limits and misuses

A fitted USL curve is a compact hypothesis about a particular workload and configuration. Sparse or noisy measurements can produce misleading coefficients. A regime change, different instance type, or altered request mix can invalidate the old fit.

Do not extrapolate a small benchmark indefinitely or identify β with one specific lock without investigation. Use the estimated peak to choose the next experiment and establish an operating region with headroom, rather than running production exactly at a mathematical maximum.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/gustafsons-law/' | relative_url }}">← Previous: Gustafson’s law</a>
<a href="{{ '/posts/2026/10/conways-law/' | relative_url }}">Next: Conway’s law →</a></nav>
