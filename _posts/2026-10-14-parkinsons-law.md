---
layout: portfolio-modern
article: true
title: "Parkinson’s law for AI agents: define done before starting the loop"
date: 2026-10-14 21:25:11 -0500
updated: 2026-10-14
excerpt: "Give an agent task a clear outcome, a bounded budget, and a stopping decision. Time limits constrain scope; they do not guarantee correctness or make necessary verification disappear."
summary: "Give an agent task a clear outcome, a bounded budget, and a stopping decision. Time limits constrain scope; they do not guarantee correctness or make necessary verification disappear."
kicker: "DESIGNING AI AGENTS / RULE 11 OF 20 / SATIRICAL MANAGEMENT OBSERVATION"
cover_image: /images/articles/engineering-laws/agents/parkinsons-law.svg
permalink: /posts/2026/10/parkinsons-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 11
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 11 / 20 · Satirical management observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/parkinsons-law.svg" alt="AI agent design example: Bounded task brief: Outcome + tool-call budget. Progress checkpoint: New evidence or repeated work?. Deliver, stop, or ask: Expose partial and uncertain states." caption="Before starting an autonomous loop, define its finish line, budget, and behavior when evidence runs out." height="470" %}

## What it means

C. Northcote Parkinson’s satirical writing describes work expanding to occupy the time available and examines administrative growth. The familiar deadline interpretation is a useful prompt for spotting elastic scope, rather than a universal estimate of human productivity. [Parkinson, Parkinson’s Law, reproduced book extract](https://www.panarchy.org/parkinson/parkinsonlaw.html).

In software work, ambiguity often leaves room for endless revision. A task called “improve the dashboard” can absorb a day or a quarter because nobody has defined the user decision it should improve.

## AI agent example

A research agent receives the instruction “explore this market thoroughly.” It can keep searching, rewriting, and generating additional comparisons without a clear finish line. More iterations may consume the entire budget without answering the user’s decision.

A bounded brief is more concrete: compare three options against four stated criteria, cite the evidence available, and report unresolved questions. The application can set limits on elapsed time, tool calls, and spending, then decide whether to deliver, stop, or ask for direction.

At a progress checkpoint, the system should examine what new evidence was obtained. Repeating similar searches is not necessarily progress. If the required source is unavailable, an honest partial result can be better than another loop that implies completeness.

Applying Parkinson’s observation here is a design analogy. A shorter deadline does not make an LLM more accurate, and an iteration cap does not validate an answer.

## Before you build

Define completion criteria before execution and enforce budgets in application code. Keep separate states for complete, partial, failed, and waiting for input. Record the reason a run stopped.

Evaluate whether the task actually satisfies the requested criteria. Protect required permission checks and verification even when the budget is nearly exhausted. Adjust scope explicitly instead of silently dropping the most important checks.

**Design decision:** Before starting an autonomous loop, define its finish line, budget, and behavior when evidence runs out.

## Limits and misuses

The law is not evidence that any task can be completed faster by assigning less time. Arbitrary pressure can simply move work into evenings, reduce quality, or hide risk. Necessary testing and integration do not disappear because a calendar changes.

Use the observation to remove unclear scope and unproductive waiting. Review cycle time and outcomes with the team, and adjust the promise when new evidence changes the work. A useful timebox constrains an experiment or a deliverable; it should not pretend uncertainty has already been resolved.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/brooks-law/' | relative_url }}">← Previous: Brooks’s law</a>
<a href="{{ '/posts/2026/10/wirths-law/' | relative_url }}">Next: Wirth’s law →</a></nav>
