---
layout: portfolio-modern
article: true
title: "The Pareto principle for AI agents: fix the failures your evaluations reveal"
date: 2026-10-14 21:25:14 -0500
updated: 2026-10-14
excerpt: "Prioritize agent improvements from measured failure categories. A few causes may dominate, but rare authorization or side-effect failures still deserve attention because severity matters."
summary: "Prioritize agent improvements from measured failure categories. A few causes may dominate, but rare authorization or side-effect failures still deserve attention because severity matters."
kicker: "DESIGNING AI AGENTS / RULE 14 OF 20 / PRIORITIZATION HEURISTIC"
cover_image: /images/articles/engineering-laws/agents/pareto-principle.svg
permalink: /posts/2026/10/pareto-principle/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 14
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 14 / 20 · Prioritization heuristic</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/pareto-principle.svg" alt="AI agent design example: 100 failed tasks: Classified evaluation sample. 50 schema + 30 retrieval: 80% from two of five causes. Prioritize + check severity: Rare permission failures still matter." caption="Before rewriting an agent, inspect the largest actionable failure groups while keeping high-severity failures visible." height="470" %}

## What it means

The Pareto principle encourages attention to the relatively few causes responsible for much of an outcome. Quality practice uses Pareto analysis to rank observed causes and identify the largest contributors. The familiar 80/20 wording is a heuristic, not a required ratio. [Juran Institute, Pareto principle and analysis](https://www.juran.com/blog/a-guide-to-the-pareto-principle-80-20-rule-pareto-analysis/).

This makes it useful for performance and reliability work: a complete list of possible improvements is less helpful than understanding which ones explain most of a measured problem.

{% include article-diagram.html image="/images/articles/engineering-laws/pareto-principle.svg" alt="An illustrative agent evaluation sample has 50 tool-schema failures, 30 retrieval misses, ten timeouts, six authorization failures, and four other errors. Two of five categories account for 80% of the failures." caption="An illustrative agent evaluation sample has 50 tool-schema failures, 30 retrieval misses, ten timeouts, six authorization failures, and four other errors. Two of five categories account for 80% of the failures." height="470" %}

## AI agent example

An illustrative evaluation set contains 100 failed support-agent tasks: 50 tool-schema mistakes, 30 retrieval misses, ten timeouts, six authorization failures, and four other errors.

The first two categories account for 80% of failures, but they are two of five categories: **40%, not 20%**. The distribution identifies promising improvement work without needing to match the slogan exactly.

Better tool descriptions and retrieval evaluation may outperform a broad rewrite of the whole agent. However, the six authorization failures must be examined immediately for impact. A small frequency can still represent a serious boundary failure.

Review traces to establish cause. A schema error might be downstream of an ambiguous tool name, and a retrieval miss might reflect a permissions filter working correctly. Categorization starts an investigation; it does not establish the fix by itself.

## Before you build

Build an evaluation taxonomy around user outcomes and actual failure modes. Record frequency, severity, affected users, and confidence in the diagnosis. Avoid double-counting one root cause under several labels.

Choose a targeted change and evaluate it against both the affected category and the full task set. Recompute the distribution after the fix. The next dominant cause may differ, and a local improvement should not create new severe failures elsewhere.

**Design decision:** Before rewriting an agent, inspect the largest actionable failure groups while keeping high-severity failures visible.

## Limits and misuses

Observed concentration does not prove causation. Several error labels may arise from one upstream failure, and incomplete telemetry can make invisible problems look unimportant. Validate a hypothesis before spending the whole engineering budget on it.

Some work is mandatory even when infrequent: a rare authorization defect can have a severe consequence. Use Pareto analysis alongside severity, uncertainty, and strategic value. The principle helps sequence investigation; it does not authorize ignoring the remaining users or declaring the last 20% unnecessary.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/metcalfes-law/' | relative_url }}">← Previous: Metcalfe’s law</a>
<a href="{{ '/posts/2026/10/galls-law/' | relative_url }}">Next: Gall’s law →</a></nav>
