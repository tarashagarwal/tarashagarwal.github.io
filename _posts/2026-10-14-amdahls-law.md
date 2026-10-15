---
layout: portfolio-modern
article: true
title: "Amdahl’s law for AI agents: parallelize the independent work"
date: 2026-10-14 21:25:03 -0500
updated: 2026-10-14
excerpt: "Parallel tools only accelerate the part of an agent run that can overlap. Planning, dependent actions, and final synthesis can remain on the critical path."
summary: "Parallel tools only accelerate the part of an agent run that can overlap. Planning, dependent actions, and final synthesis can remain on the critical path."
kicker: "DESIGNING AI AGENTS / RULE 03 OF 20 / PARALLEL SPEEDUP MODEL"
cover_image: /images/articles/engineering-laws/agents/amdahls-law.svg
permalink: /posts/2026/10/amdahls-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 3
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 03 / 20 · Parallel speedup model</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/amdahls-law.svg" alt="AI agent design example: Plan + synthesize: 1 second remains serial. Parallel retrieval: 9 seconds / 8 workers. Ideal total: 2.125 s: Speedup: 10 / 2.125 = 4.71×." caption="Before parallelizing an agent, identify the serial decisions and side effects that must preserve their order." height="470" %}

## What it means

Amdahl’s law asks how much faster the **same amount of work** can finish when only part of it benefits from parallel execution. In the simplified model, p is the fraction of the one-worker runtime that can be divided perfectly across N workers:

**S(N) = 1 / ((1 − p) + p/N)**.

The fixed-size formulation and its relation to other scaling models are discussed in Sun and Ni’s primary research. [Scalable problems and memory bounded speedup](https://ntrs.nasa.gov/citations/19930007365). The formula assumes no extra overhead and an unchanged serial part.

{% include article-diagram.html image="/images/articles/engineering-laws/amdahls-law.svg" alt="Fixed-workload model with 90% parallel work: eight workers yield an ideal 4.71× speedup, with a 10× ceiling as the worker count grows." caption="Fixed-workload model with 90% parallel work: eight workers yield an ideal 4.71× speedup, with a 10× ceiling as the worker count grows." height="470" %}

## AI agent example

Consider an illustrative ten-second research-agent run. Planning and final synthesis together consume one second. Nine seconds are independent retrieval work that can be divided perfectly among workers.

With eight ideal workers, retrieval takes 9/8 = 1.125 seconds. Total runtime becomes **1 + 1.125 = 2.125 seconds**, or **4.71×** faster. Even infinitely fast retrieval leaves the one-second serial portion, so the model’s speedup ceiling is 10×.

Real runs pay for scheduling, data transfer, provider limits, and result merging. If one tool needs an identifier returned by another, those calls are dependent and cannot be included in the perfectly parallel fraction.

A booking agent illustrates the correctness limit: checking availability and committing the chosen reservation are not interchangeable parallel tasks. Launching them together can change behavior rather than reduce the runtime of the same correct workflow.

## Before you build

Draw the dependency graph for a representative task. Mark steps that consume previous outputs and identify independent read operations. Measure the critical path before adding parallel branches.

Run an unchanged evaluation set at several concurrency levels. Compare successful task latency, tool errors, and cost against the ideal model. Avoid counting speculative calls as a speed improvement if they introduce extra actions or lower answer quality.

**Design decision:** Before parallelizing an agent, identify the serial decisions and side effects that must preserve their order.

## Limits and misuses

This is a model of fixed work, not a claim that large parallel computers are pointless. A larger machine may let a team solve a larger problem in the same time, which is the question behind Gustafson’s law.

Cache effects, altered algorithms, and different memory behavior can change the assumptions and sometimes produce apparent superlinear speedup. Report those changes explicitly. The practical lesson is to identify what remains serial and measure the whole job, rather than equating worker count with speedup.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/littles-law/' | relative_url }}">← Previous: Little’s law</a>
<a href="{{ '/posts/2026/10/gustafsons-law/' | relative_url }}">Next: Gustafson’s law →</a></nav>
