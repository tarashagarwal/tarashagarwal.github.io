---
layout: portfolio-modern
article: true
title: "Brooks’s law for AI agents: more builders can overwhelm review"
date: 2026-10-14 21:25:10 -0500
updated: 2026-10-14
excerpt: "Adding people late can increase onboarding and integration work. Parallel coding agents raise a related review-capacity question, but Brooks’s observation does not supply a numerical law for AI productivity."
summary: "Adding people late can increase onboarding and integration work. Parallel coding agents raise a related review-capacity question, but Brooks’s observation does not supply a numerical law for AI productivity."
kicker: "DESIGNING AI AGENTS / RULE 10 OF 20 / PROJECT MANAGEMENT OBSERVATION"
cover_image: /images/articles/engineering-laws/agents/brooks-law.svg
permalink: /posts/2026/10/brooks-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 10
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 10 / 20 · Project management observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/brooks-law.svg" alt="AI agent design example: Many candidate patches: Parallel generation. Shared review queue: Finite reviewer capacity. Verified integration: Accepted changes create progress." caption="Before adding builders or coding-agent sessions, identify who can verify and integrate their output." height="470" %}

## What it means

Frederick Brooks warned that adding people to an already late software project can make it later. New contributors need context, experienced teammates spend time teaching them, and additional workstreams require coordination. [Brooks, The Mythical Man-Month, publisher’s edition](https://www.informit.com/store/mythical-man-month-essays-on-software-engineering-anniversary-9780201835953).

People and months are not interchangeable units when tasks depend on one another. A team cannot divide an unresolved architectural decision among ten people and assume it will finish in one tenth of the time.

## AI agent example

A team is late delivering an agent feature. Its critical path is agreement on a tool contract and a reliable permission boundary. Adding four engineers creates useful future capacity, but experienced contributors must first explain the system and coordinate changes.

Now consider a related automation decision: ten coding-agent sessions generate ten candidate patches. If one engineer owns review and every patch changes the same tool interface, the candidate count can rise while integrated progress stalls.

The automation example is an analogy about shared constraints, not evidence that Brooks’s law quantitatively predicts coding-agent output. A candidate patch may be fast to generate and still expensive to verify, reconcile, and deploy.

Additional help works best when it relieves the actual constraint: isolated evaluation fixtures, a self-contained adapter, or a reproducible environment task may free the contract owner to finish the critical decision.

## Before you build

Measure time to a correct integrated change, not generated code volume. Identify ownership, review capacity, conflicting edits, and required domain knowledge before parallelizing implementation.

Give human and automated contributors bounded tasks with clear interfaces and acceptance criteria. Reserve time for integration and evaluation. Resolve a disputed requirement directly instead of multiplying implementation branches around an unresolved decision.

**Design decision:** Before adding builders or coding-agent sessions, identify who can verify and integrate their output.

## Limits and misuses

Brooks’s law is not an instruction never to hire, ask for help, or increase team size. Early staffing, independent work, and experienced specialists can help considerably. The warning concerns timing, dependencies, and the cost of introducing people into ongoing work.

Compare staffing options with scope reduction and sequencing changes. A smaller coherent release may deliver value sooner than a larger group coordinating an unchanged promise. Make that choice openly, using the actual critical path.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/murphys-law/' | relative_url }}">← Previous: Murphy’s law</a>
<a href="{{ '/posts/2026/10/parkinsons-law/' | relative_url }}">Next: Parkinson’s law →</a></nav>
