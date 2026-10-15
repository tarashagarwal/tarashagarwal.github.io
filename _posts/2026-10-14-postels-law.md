---
layout: portfolio-modern
article: true
title: "Postel’s law for AI agents: validate tool arguments before execution"
date: 2026-10-14 21:25:08 -0500
updated: 2026-10-14
excerpt: "Agent-generated arguments need one unambiguous interpretation. Specify supported input, validate it, authorize the action, and execute the same validated object."
summary: "Agent-generated arguments need one unambiguous interpretation. Specify supported input, validate it, authorize the action, and execute the same validated object."
kicker: "DESIGNING AI AGENTS / RULE 08 OF 20 / PROTOCOL DESIGN PRINCIPLE"
cover_image: /images/articles/engineering-laws/agents/postels-law.svg
permalink: /posts/2026/10/postels-law/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 8
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 08 / 20 · Protocol design principle</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/postels-law.svg" alt="AI agent design example: Agent proposes arguments: Duplicate amount is ambiguous. Validate + authorize: Reject invalid or forbidden calls. Execute validated object: One interpretation reaches the tool." caption="Before connecting an agent to an action, define exactly which input is valid and where enforcement happens." height="470" %}

## What it means

The robustness principle associated with Jon Postel encouraged conservative output and tolerance when receiving input. It appears in the historical TCP specification. [RFC 793](https://www.rfc-editor.org/rfc/rfc0793).

Modern protocol guidance explains why tolerance alone can create long-term problems: accepting malformed input hides defects and allows incompatible interpretations to accumulate. Active maintenance and agreement on behavior are essential. [RFC 9413, Maintaining Robust Protocols](https://www.rfc-editor.org/rfc/rfc9413.html).

A useful distinction is between an explicitly supported variation and an invalid message that happens to pass one parser.

## AI agent example

A purchasing agent generates a tool request containing the amount field twice. One parser takes the first value and another takes the last. A gateway could approve one amount while the executing service processes another.

Define duplicate keys as invalid for this tool contract and reject the request before authorization or execution. Return a structured validation error the agent can understand. If it retries, the retry must still pass the complete validation and authorization path.

Other inputs need equally explicit rules: whether an empty string is allowed, whether a missing destination differs from null, and which currency or unit a numeric value uses. A confident explanation attached to a malformed call does not make it executable.

Supported convenience can still be deliberate. A read-only search tool may normalize permitted surrounding whitespace. That behavior should be documented and applied consistently across components.

## Before you build

Use a tool schema plus application checks for semantic constraints, size limits, permissions, and business invariants. Ensure validation and execution share one parsed representation. Do not silently repair a risky amount or destination into a different action.

Add fixtures for malformed arguments and verify that rejected calls produce no side effect. Give the agent useful error codes while keeping the actual enforcement in the executing service.

**Design decision:** Before connecting an agent to an action, define exactly which input is valid and where enforcement happens.

## Limits and misuses

Strictness can also be designed badly. Rejecting a documented optional extension or harmless supported representation can make a protocol needlessly brittle. Forward compatibility should be specified, not guessed.

Postel’s law is historical engineering advice, not a universal security policy. The practical goal is predictable interoperability: valid messages have a shared meaning, invalid ones fail clearly, and implementations are actively maintained together. Tolerance is useful when it supports that agreement; it is harmful when it conceals disagreement.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/hyrums-law/' | relative_url }}">← Previous: Hyrum’s law</a>
<a href="{{ '/posts/2026/10/murphys-law/' | relative_url }}">Next: Murphy’s law →</a></nav>
