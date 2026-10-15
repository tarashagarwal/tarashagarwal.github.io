---
layout: portfolio-modern
article: true
title: "Murphy’s law for AI agents: plan for the crash after the action"
date: 2026-10-14 21:25:09 -0500
updated: 2026-10-14
excerpt: "An agent can lose a response after a tool has committed. Design durable operation identities, uncertain-result handling, and recovery before enabling automatic retries."
summary: "An agent can lose a response after a tool has committed. Design durable operation identities, uncertain-result handling, and recovery before enabling automatic retries."
kicker: "DESIGNING AI AGENTS / RULE 09 OF 20 / ENGINEERING APHORISM"
cover_image: /images/articles/engineering-laws/agents/murphys-law.svg
permalink: /posts/2026/10/murphys-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 9
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 09 / 20 · Engineering aphorism</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/murphys-law.svg" alt="AI agent design example: Booking commits: Stable business operation ID. Worker loses the reply: Chat state is incomplete. Resume + reconcile: Look up the existing result." caption="Before enabling retries, decide how a resumed agent distinguishes an unexecuted action from a committed action with a missing reply." height="470" %}

## What it means

Murphy’s law is commonly expressed as the expectation that things which can go wrong eventually will. Treat that as an engineering prompt, rather than a mathematical claim that every imaginable failure is inevitable.

A more useful question is: **what happens if this operation stops between any two important steps?** Formal systems work handles risks, verification, and validation explicitly; the aphorism is not a substitute for those activities. [NASA Systems Engineering Handbook](https://www.nasa.gov/reference/systems-engineering-handbook/).

The following workflow is an application of that question, not a claim about the historical origin of the saying.

## AI agent example

A travel agent submits a reservation through a booking tool. The booking commits, but the worker crashes before saving the result in conversation state. When the run resumes, the chat history contains no confirmation.

Repeating the booking as a new request can create a second reservation. Instead, establish a stable business operation identity before the initial call. The tool service must define durable repeat-request behavior and let the application recover or reconcile the original outcome.

The UI can show “confirmation pending” while the service checks the booking. It should not tell the user the reservation failed merely because the response was lost. A timeout describes an observation, not the authoritative business result.

This fictional scenario is useful because the failure fits between ordinary workflow steps. The model can follow instructions perfectly while the surrounding system still mishandles recovery.

## Before you build

Test interruptions before execution, after commit, after checkpointing, and before user notification. For each point, check both stored state and the user-visible result.

Make recovery ownership explicit. Use bounded retries only where the operation’s semantics allow them, and query uncertain results before creating new side effects. Practice restoring a run from persisted state; a checkpoint is useful only if replay preserves the intended business operation.

**Design decision:** Before enabling retries, decide how a resumed agent distinguishes an unexecuted action from a committed action with a missing reply.

## Limits and misuses

Pessimism without prioritization can paralyze a team. You cannot eliminate every failure, and a complicated defensive mechanism can introduce new ones. Choose controls proportional to the consequence and verify them through targeted fault injection or recovery drills.

Avoid using the slogan to blame people after an incident. The productive output is a more resilient system: smaller failure domains, understandable state transitions, bounded retries, and a recovery procedure someone has actually practiced.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/postels-law/' | relative_url }}">← Previous: Postel’s law</a>
<a href="{{ '/posts/2026/10/brooks-law/' | relative_url }}">Next: Brooks’s law →</a></nav>
