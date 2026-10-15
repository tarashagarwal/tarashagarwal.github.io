---
layout: portfolio-modern
article: true
title: "Hyrum’s law for AI agents: tool changes can break learned expectations"
date: 2026-10-14 21:25:07 -0500
updated: 2026-10-14
excerpt: "Prompts and downstream clients can depend on tool ordering, defaults, or error wording. Evaluate existing agent workflows when those observable behaviors change."
summary: "Prompts and downstream clients can depend on tool ordering, defaults, or error wording. Evaluate existing agent workflows when those observable behaviors change."
kicker: "DESIGNING AI AGENTS / RULE 07 OF 20 / COMPATIBILITY OBSERVATION"
cover_image: /images/articles/engineering-laws/agents/hyrums-law.svg
permalink: /posts/2026/10/hyrums-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 7
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 07 / 20 · Compatibility observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/hyrums-law.svg" alt="AI agent design example: Search tool changes: Newest-first becomes unsorted. Schema still passes: Fields remain unchanged. Agent picks wrong order: Make selection semantics explicit." caption="Before changing a tool implementation, test the agent decisions that depend on its observable behavior." height="470" %}

## What it means

Hyrum Wright’s formulation warns that enough users will make surprising dependencies on observable system behavior. Documentation describes an intended contract; callers can observe more than that contract. Output order, error text, timing, and defaults can all become expectations. [Hyrum’s Law, author’s site](https://www.hyrumslaw.com/).

The lesson is about compatibility risk, not a guarantee that every detail is currently used. An implementation change can be internally correct and still disrupt a consumer that learned a different, accidental contract.

## AI agent example

A support agent calls an order-search tool. Its prompt examples show the newest order first, so the agent routinely chooses the first result when a user says “my recent order.” The tool’s documentation never promised a sort order.

A backend optimization changes the returned order. Every field still satisfies the schema, but the agent now selects an older purchase. This hypothetical regression lives in an observable behavior outside the intended contract.

Make sorting explicit in the tool request or response contract. Require the agent to inspect the relevant timestamp or selected order identity instead of relying on position. Test ambiguous references such as “latest,” “previous,” and “the one I just bought.”

Error wording can create similar dependencies. A stable machine-readable status is easier to evolve deliberately than a prompt that has learned to recognize one English sentence.

## Before you build

Version important tool semantics, preserve representative traces, and run regression evaluations before broad rollout. Include output order, missing fields, pagination, defaults, and errors in contract reviews.

Observe whether a model or client has learned an accidental convention. Provide a migration path where practical, and enforce important selection rules in the application. Repeating a desired behavior in the prompt is weaker than establishing it in an authoritative contract.

**Design decision:** Before changing a tool implementation, test the agent decisions that depend on its observable behavior.

## Limits and misuses

The rule does not require preserving insecure or broken behavior forever. Sometimes a migration is necessary. A responsible change explains the new contract, provides a transition where possible, and has a clear rollback or containment plan.

Nor should every quirky consumer become a permanent public guarantee. Distinguish intentional promises from temporary compatibility accommodations. The important work is to make that decision using evidence about consumers and consequences, rather than assuming that “undocumented” means “unobservable.”

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/conways-law/' | relative_url }}">← Previous: Conway’s law</a>
<a href="{{ '/posts/2026/10/postels-law/' | relative_url }}">Next: Postel’s law →</a></nav>
