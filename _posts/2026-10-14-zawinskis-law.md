---
layout: portfolio-modern
article: true
title: "Zawinski’s law for AI agents: keep the assistant’s scope deliberate"
date: 2026-10-14 21:25:17 -0500
updated: 2026-10-14
excerpt: "A focused assistant can expand into email, scheduling, purchases, and workflow automation. Each capability adds data, permissions, operational duties, and user expectations."
summary: "A focused assistant can expand into email, scheduling, purchases, and workflow automation. Each capability adds data, permissions, operational duties, and user expectations."
kicker: "DESIGNING AI AGENTS / RULE 17 OF 20 / HUMOROUS SOFTWARE OBSERVATION"
cover_image: /images/articles/engineering-laws/agents/zawinskis-law.svg
permalink: /posts/2026/10/zawinskis-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 17
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 17 / 20 · Humorous software observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/zawinskis-law.svg" alt="AI agent design example: Answer reports: Read-only analytics. Send + schedule: Recipients + calendars. Purchase + automate: Spending + durable side effects." caption="Before adding an adjacent feature, account for the new product responsibility and permission boundary it creates." height="470" %}

## What it means

The observation commonly attributed to Jamie Zawinski jokes that software tends to grow until it handles email. Read it as humor about software envelopment and expanding scope, not as a scientific prediction about every program.

For a product team, the useful question is about responsibility: when a focused tool absorbs adjacent workflows, which additional obligations has the team accepted? A feature can look small on a roadmap while introducing a new kind of data, a new permission boundary, or an ongoing operational duty. Reviewing those consequences makes scope growth a deliberate decision.

## AI agent example

A report assistant initially answers questions about approved analytics. Users then request emailed summaries, calendar scheduling, expense submission, and automatic purchases.

Each request sounds adjacent to “help me get the work done.” Together they move the product from read-only analysis into communication, scheduling, and spending. Those are different permission and recovery boundaries.

Email introduces recipients and disclosure concerns. Scheduling introduces shared availability and conflict handling. Purchases introduce committed side effects and uncertain-result recovery. A model that can describe all three workflows does not mean the product already supports them reliably.

The team can choose to build a complete action platform, integrate with existing products, or keep a focused assistant with a clear handoff. Make the scope decision in product and engineering terms instead of letting tool availability define the promise.

## Before you build

For each new tool, list the user outcome, required access, data retained, possible side effects, and operational owner. Evaluate how it changes the existing agent’s tool selection and failure modes.

Introduce capabilities in bounded increments, with appropriate confirmation and recovery. Keep a clear statement of what the assistant can complete versus what it only helps prepare. Broad model capability should not silently broaden product authority.

**Design decision:** Before adding an adjacent feature, account for the new product responsibility and permission boundary it creates.

## Limits and misuses

Scope growth is not automatically bad. User needs evolve, and combining workflows can remove expensive friction. The warning is about accepting new responsibilities without making the decision visible.

As background on the cost of accumulated software and redesign decisions, see the author’s own discussion of existing code in [Spolsky, Things You Should Never Do, Part I](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/). That essay is related reading, not a source for the origin of Zawinski’s saying. Review the whole product obligation before treating a feature as a small addition.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/leaky-abstractions/' | relative_url }}">← Previous: The law of leaky abstractions</a>
<a href="{{ '/posts/2026/10/reeds-law/' | relative_url }}">Next: Reed’s law →</a></nav>
