---
layout: portfolio-modern
article: true
title: "CAP theorem for AI agents: what happens when shared state splits?"
date: 2026-10-14 21:25:01 -0500
updated: 2026-10-14
excerpt: "Before an agent confirms a booking or spends a shared budget, decide what it should do when replicas cannot agree. A confident model response cannot establish that an action committed."
summary: "Before an agent confirms a booking or spends a shared budget, decide what it should do when replicas cannot agree. A confident model response cannot establish that an action committed."
kicker: "DESIGNING AI AGENTS / RULE 01 OF 20 / THEOREM"
cover_image: /images/articles/engineering-laws/agents/cap-theorem.svg
permalink: /posts/2026/10/cap-theorem/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 1
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 01 / 20 · Theorem</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/cap-theorem.svg" alt="AI agent design example: Two agent runs: Competing reservation requests. Partitioned state: Regions cannot coordinate. One booking slot: Confirm only with authority." caption="Before adding a write tool, define what the agent may promise when authoritative state is unreachable." height="470" %}

## What it means

CAP is a statement about guarantees in a distributed system, rather than a shopping list of database features. Its consistency is a single, real-time order of operations, usually expressed as linearizability. Its availability requires every request to a non-failing node to receive a response under the model. A partition prevents some nodes from communicating. In that situation, both guarantees cannot always be maintained. [Gilbert and Lynch, Perspectives on the CAP Theorem](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer2.pdf).

The useful design question is what an isolated replica should do when it cannot establish the latest state. “Pick any two” hides that decision. Partition tolerance is not an optional feature when the deployment can experience a partition.

## AI agent example

Imagine a booking agent deployed in two regions. Both replicas show one available appointment. Their connection fails, and two users ask their local agent to reserve that slot.

If both tool services independently confirm the reservation, the system can double-book. A conversation that sounds successful has hidden a shared-state conflict. Requiring coordination for the reservation protects exclusivity, but an isolated region may have to leave the request pending or refuse it.

The agent can still explain options using a cached schedule, provided it communicates the freshness limit. It should say that the reservation is unconfirmed until the authoritative booking service confirms it. Reading suggestions and committing a booking need different guarantees.

This is a hypothetical design example. The important boundary is the state-changing tool: an LLM’s wording cannot repair an inconsistent reservation protocol.

## Before you build

Classify each tool as a read, an advisory calculation, or a state-changing operation. Document which operations require coordination and which can tolerate stale results. Keep confirmation semantics in the tool service, and pass explicit pending or unavailable states back to the agent.

Test a partition while two agent runs compete for one resource. Check the stored booking and both user-visible outcomes. Also plan reconciliation after reconnection; simply resuming chat does not resolve conflicting state.

**Design decision:** Before adding a write tool, define what the agent may promise when authoritative state is unreachable.

## Limits and misuses

CAP consistency is different from the C in ACID. CAP availability is also different from a monthly uptime percentage or a latency service objective. The theorem does not choose a replication protocol, calculate throughput, or settle every trade-off during normal operation.

A practical review should therefore name the operation, failure scenario, and guarantee. “This system is CP” is much less informative than explaining why a purchase refuses to commit when it cannot establish exclusive ownership.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/littles-law/' | relative_url }}">Next: Little’s law →</a></nav>
