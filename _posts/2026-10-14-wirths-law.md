---
layout: portfolio-modern
article: true
title: "Wirth’s law for AI agents: stop extra layers consuming every speed gain"
date: 2026-10-14 21:25:12 -0500
updated: 2026-10-14
excerpt: "Faster inference can be offset by more model calls, larger context, and redundant retrieval. Measure the full user task and require each added stage to justify its cost."
summary: "Faster inference can be offset by more model calls, larger context, and redundant retrieval. Measure the full user task and require each added stage to justify its cost."
kicker: "DESIGNING AI AGENTS / RULE 12 OF 20 / SOFTWARE EFFICIENCY OBSERVATION"
cover_image: /images/articles/engineering-laws/agents/wirths-law.svg
permalink: /posts/2026/10/wirths-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 12
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 12 / 20 · Software efficiency observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/wirths-law.svg" alt="AI agent design example: Faster inference: Assume 2× throughput. 3× computation added: Repeated planning + retrieval. End-to-end task slows: Simplified ratio: 3 / 2 = 1.5×." caption="Before adding another agent stage, measure what it improves and what it costs across the complete task." height="470" %}

## What it means

The observation commonly called Wirth’s law warns that software can become slower faster than hardware improves. In his 1995 essay, Niklaus Wirth argued for leaner software and attributed the slowdown formulation to Martin Reiser. It is an observation about software growth, not a universal physical rate. [Wirth, A Plea for Lean Software](https://gwern.net/doc/cs/algorithm/1995-wirth.pdf).

Faster machines create room for useful capabilities. They can also conceal unnecessary work until users encounter an older phone, a constrained container, or a large dataset.

## AI agent example

Suppose an illustrative agent task requires two units of model computation. An inference improvement doubles throughput for that same work. If the product now adds three times as much computation through repeated planning, critique, and rewriting, the CPU-like simplified comparison becomes **3 / 2 = 1.5×** the original time.

Actual model services are not simple constant-throughput machines. Context, output length, batching, provider behavior, and networking all matter. The arithmetic illustrates how workload growth can consume a speed gain; it is not a forecast for a particular model.

A practical example is an assistant that retrieves the same documents separately in planning, drafting, and checking. Reusing authorized, sufficiently fresh results within the run may reduce redundant work. Measure quality before removing a stage: some checks provide important value even when they add latency.

## Before you build

Set budgets for successful task latency, model calls, input and output volume, retrieval work, and cost. Compare candidate pipelines on the same task set and quality criteria.

Trace repeated work before switching to a larger machine or a faster provider. Keep stages that improve the outcome or enforce required guarantees, and simplify stages that add cost without useful evidence. Report end-to-end performance instead of only the fastest individual call.

**Design decision:** Before adding another agent stage, measure what it improves and what it costs across the complete task.

## Limits and misuses

Efficiency is not the only goal. Accessibility, better security, richer capabilities, and maintainable abstractions may justify more computation. Removing a valuable feature to win an artificial benchmark can make the product worse.

Keep the comparison honest: same task, comparable data, comparable quality, and an explicit device profile. The principle is to make resource growth visible and intentional. It should help a team distinguish useful capability from accidental overhead, rather than romanticizing every small program.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/parkinsons-law/' | relative_url }}">← Previous: Parkinson’s law</a>
<a href="{{ '/posts/2026/10/metcalfes-law/' | relative_url }}">Next: Metcalfe’s law →</a></nav>
