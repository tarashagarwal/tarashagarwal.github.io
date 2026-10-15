---
layout: portfolio-modern
article: true
title: "Distributed computing fallacies for AI agents: a tool call is a network operation"
date: 2026-10-14 21:25:20 -0500
updated: 2026-10-14
excerpt: "Agent tools inherit network failure, latency, versioning, ownership, and cost. A missing response does not establish that an action failed; explicit uncertainty and reconciliation belong in the runtime."
summary: "Agent tools inherit network failure, latency, versioning, ownership, and cost. A missing response does not establish that an action failed; explicit uncertainty and reconciliation belong in the runtime."
kicker: "DESIGNING AI AGENTS / RULE 20 OF 20 / DISTRIBUTED SYSTEMS CHECKLIST"
cover_image: /images/articles/engineering-laws/agents/fallacies-of-distributed-computing.svg
permalink: /posts/2026/10/fallacies-of-distributed-computing/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 20
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 20 / 20 · Distributed systems checklist</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/fallacies-of-distributed-computing.svg" alt="AI agent design example: Agent requests an order: Stable business operation ID. Order commits; reply lost: Timeout leaves an uncertain result. Reconcile before retry: Return the authoritative outcome." caption="Before giving an agent a remote action, define its behavior when execution and observation disagree." height="470" %}

## What it means

The **fallacies of distributed computing** are eight assumptions that break down when software communicates across a network. They form a practical design checklist. Oracle’s architecture guidance reproduces the familiar checklist. [Oracle Reference Architecture, Application Infrastructure Foundation](https://www.oracle.com/technetwork/topics/entarch/oracle-ra-application-infr-r3-0-176698.pdf).

The following table paraphrases the eight assumptions and turns each into a review question. The controls are design examples, not guarantees that one setting solves a distributed system.

## AI agent example

A purchasing agent sends an order to a remote tool. The order commits, but the confirmation message is lost. The run sees a timeout and cannot tell whether the order exists.

If the agent retries with a new business identity, it may place a duplicate order. Preserve an operation identity, use a tool contract with durable repeat-request semantics, and query or reconcile the original result. A chat transcript alone cannot establish the state of an external system.

The eight assumptions below identify other boundaries to review before the tool becomes part of an autonomous workflow:

| Misleading assumption | Agent design question |
| --- | --- |
| Communication always succeeds | Can the run handle lost replies and duplicate delivery? |
| Messages arrive instantly | Are deadlines propagated across model and tool stages? |
| Capacity is unlimited | Are context, payloads, queues, and concurrent calls bounded? |
| The network is inherently safe | Which identity and permission authorize this tool action? |
| Addresses and routes stay fixed | Can discovery and failover leave stale connections? |
| One authority controls everything | Who owns each external tool and coordinates an incident? |
| Moving data has no cost | What do context transfer, tool traffic, and retries consume? |
| All machines speak identically | How are schema and tool-version changes handled? |

## Before you build

Represent pending, succeeded, failed, and uncertain results explicitly. Enforce authorization and business invariants in the executing system. Bound retries and use appropriate backoff, cancellation, and deadlines.

Test lost acknowledgements, delayed responses, changed tool schemas, and unavailable dependencies. Check the actual committed outcome as well as the final answer. The agent should report what is known rather than translating every timeout into a definitive failure.

**Design decision:** Before giving an agent a remote action, define its behavior when execution and observation disagree.

## Limits and misuses

The checklist is not a demand to build a globally distributed platform for every small application. Deployment scope and consequences determine how much machinery is justified.

It also does not make “exactly once” a property of a queue checkbox. End-to-end business effects depend on durable state, transaction boundaries, retries, and external systems. Review the complete workflow under partial failure. A good design makes uncertainty visible and recovery possible instead of assuming the network behaved like a local function call.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/zipfs-law/' | relative_url }}">← Previous: Zipf’s law</a></nav>
