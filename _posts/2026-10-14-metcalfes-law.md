---
layout: portfolio-modern
article: true
title: "Metcalfe’s law for AI agents: useful connections matter more than tool count"
date: 2026-10-14 21:25:13 -0500
updated: 2026-10-14
excerpt: "An agent workspace can create valuable connections between people and workflows. Pair counts explain opportunities; they do not prove that adding tools or agents improves capability quadratically."
summary: "An agent workspace can create valuable connections between people and workflows. Pair counts explain opportunities; they do not prove that adding tools or agents improves capability quadratically."
kicker: "DESIGNING AI AGENTS / RULE 13 OF 20 / NETWORK VALUE HEURISTIC"
cover_image: /images/articles/engineering-laws/agents/metcalfes-law.svg
permalink: /posts/2026/10/metcalfes-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 13
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 13 / 20 · Network value heuristic</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/metcalfes-law.svg" alt="AI agent design example: People + expertise: Relevant, active participants. Agent routes the case: Choose an authorized path. Useful collaboration: Measure resolved outcomes." caption="Before expanding a tool or agent catalog, identify which useful connection the addition enables and how you will measure it." height="470" %}

## What it means

Metcalfe’s law proposes that network value can grow approximately with the square of its participant count. A common intuition is the number of possible pairwise connections. Robert Metcalfe discusses the law and evidence for it in his retrospective. [Metcalfe, Metcalfe’s Law after 40 Years of Ethernet](https://gwern.net/doc/economics/automation/metcalfes-law/2013-metcalfe-2.pdf).

For N distinct participants, the exact count of possible undirected pairs is **N(N − 1)/2**. Counting pairs is mathematics. Assigning economic or social value to those pairs requires assumptions.

{% include article-diagram.html image="/images/articles/engineering-laws/metcalfes-law.svg" alt="Five people have ten possible undirected pairs; ten people have 45. Neither count tells us how many conversations will actually be useful." caption="Five people have ten possible undirected pairs; ten people have 45. Neither count tells us how many conversations will actually be useful." height="470" %}

## AI agent example

Imagine an agent-assisted support workspace shared by five specialists. There are **ten possible undirected person-to-person pairs**. At ten specialists, there are **45**. An assistant that routes a case to the right person can help turn some of those opportunities into useful collaboration.

Adding members helps only when their expertise is relevant and reachable. A new account that never participates does not automatically improve the experience. Measure whether cases reach someone who can resolve them.

Tool catalogs require a separate analysis. Ten tools do not imply 45 useful tool combinations or a predictable increase in agent quality. Tools have different roles, permission requirements, dependencies, and failure modes. A smaller catalog with clear selection semantics may support a task better than a larger ambiguous catalog.

This distinction preserves the network intuition while avoiding a false mathematical promise about multi-agent performance.

## Before you build

Define the valuable connection: a resolved handoff, an authorized data lookup, or a completed cross-team workflow. Track successful outcomes, discovery time, and failures caused by irrelevant choices.

Add an integration when it removes a real workflow gap. Give tools distinct purposes and explicit contracts, then evaluate selection accuracy. Keep trust, permissions, and maintenance costs visible alongside the size of the network.

**Design decision:** Before expanding a tool or agent catalog, identify which useful connection the addition enables and how you will measure it.

## Limits and misuses

Metcalfe’s law is a network-value heuristic, not a theorem that revenue, adoption, or valuation must follow N squared. Users have limited attention, connections vary in usefulness, and costs can grow alongside opportunities.

Use the pair count to reason about potential interaction, then test whether participants actually realize that potential. Product design should lower the cost of finding a relevant connection and completing a useful task. Growth becomes meaningful when the experience improves, not merely when the graph gains more nodes.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/wirths-law/' | relative_url }}">← Previous: Wirth’s law</a>
<a href="{{ '/posts/2026/10/pareto-principle/' | relative_url }}">Next: Pareto principle →</a></nav>
