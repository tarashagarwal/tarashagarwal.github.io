---
layout: portfolio-modern
article: true
title: "Conway’s law for AI agents: design ownership as carefully as orchestration"
date: 2026-10-14 21:25:06 -0500
updated: 2026-10-14
excerpt: "An agent crosses product, platform, and domain-tool boundaries. Clear ownership of contracts, permissions, evaluations, and incidents matters as much as the orchestration diagram."
summary: "An agent crosses product, platform, and domain-tool boundaries. Clear ownership of contracts, permissions, evaluations, and incidents matters as much as the orchestration diagram."
kicker: "DESIGNING AI AGENTS / RULE 06 OF 20 / ORGANIZATIONAL OBSERVATION"
cover_image: /images/articles/engineering-laws/agents/conways-law.svg
permalink: /posts/2026/10/conways-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 6
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 06 / 20 · Organizational observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/conways-law.svg" alt="AI agent design example: Product owner: Outcome + conversation. Agent platform: Runtime + traces + identity. Domain-tool owner: Business rules + committed result." caption="Before drawing agent roles, assign owners for the real interfaces and decisions those roles depend on." height="470" %}

## What it means

Melvin Conway’s original essay argues that the communication structure of a design organization constrains the systems it can produce. Teams discover requirements, negotiate interfaces, and resolve disagreements through the paths available to them. Those paths influence technical boundaries. [Conway, How Do Committees Invent?](https://www.melconway.com/research/committees.html).

In practical terms, a boundary that requires constant cross-team approval can become a slow integration point. An organization chart is not a deployment diagram, but it affects which changes are easy to coordinate and which local compromises survive.

## AI agent example

Imagine a customer-support agent. The product team owns conversation behavior, a platform team owns model routing and runtime, and the orders team owns refunds. The agent needs all three to complete one customer request.

If nobody owns the complete refund outcome, disagreements can land in a prompt: the product asks for a helpful answer while the tool service returns a vague failure. A model is then expected to improvise around an organizational gap.

Define a refund contract with explicit eligibility, authorization, completion, and uncertain-result states. The orders team owns its business semantics; the platform owns reliable execution and traceability; the product team owns how users understand the result.

Review a failed refund as one workflow. That exposes handoffs and missing decisions more clearly than three separate dashboards that each report local success.

## Before you build

Map ownership across retrieval, model access, memory, tool execution, and user-visible confirmation. Name who changes each contract and who responds when it fails.

Use shared examples and evaluation cases during contract changes. Give one team responsibility for the end-to-end customer outcome while retaining appropriate domain ownership. Creating more named sub-agents does not resolve unclear human responsibilities.

**Design decision:** Before drawing agent roles, assign owners for the real interfaces and decisions those roles depend on.

## Limits and misuses

Conway’s law is not a theorem that predicts each service from a reporting line. Organizations communicate through informal networks, existing code constrains choices, and deliberate architecture work matters.

Reorganizing teams also has a cost. Avoid creating a microservice for every group or moving people solely to match a fashionable diagram. Start with the customer capability and the coordination problem. Evaluate whether a change improves delivery time, interface reliability, and clear ownership, rather than merely making the chart look symmetrical.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/universal-scalability-law/' | relative_url }}">← Previous: Universal scalability law</a>
<a href="{{ '/posts/2026/10/hyrums-law/' | relative_url }}">Next: Hyrum’s law →</a></nav>
