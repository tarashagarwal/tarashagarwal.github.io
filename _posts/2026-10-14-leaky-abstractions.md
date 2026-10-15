---
layout: portfolio-modern
article: true
title: "Leaky abstractions in AI agents: trace what the framework hides"
date: 2026-10-14 21:25:16 -0500
updated: 2026-10-14
excerpt: "A convenient agent API can hide network calls, memory reads, retries, or private events. Trace the underlying behavior when latency, cost, permissions, and publication semantics matter."
summary: "A convenient agent API can hide network calls, memory reads, retries, or private events. Trace the underlying behavior when latency, cost, permissions, and publication semantics matter."
kicker: "DESIGNING AI AGENTS / RULE 16 OF 20 / SOFTWARE DESIGN OBSERVATION"
cover_image: /images/articles/engineering-laws/agents/leaky-abstractions.svg
permalink: /posts/2026/10/leaky-abstractions/
tags: [AI agents, agent architecture, engineering laws, systems design]
series: engineering-laws
series_order: 16
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← 20 rules before designing AI agents</a><span>Article 16 / 20 · Software design observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/agents/leaky-abstractions.svg" alt="AI agent design example: One memory method: Convenient framework interface. 101 hidden queries: Illustrative round trips: 1,010 ms. Trace + load intentionally: Two-query component: 20 ms." caption="Before trusting an agent abstraction, inspect its hidden calls, resource costs, and failure semantics." height="470" %}

## What it means

Joel Spolsky’s law of leaky abstractions describes a familiar engineering problem: an abstraction cannot hide every detail of the layer beneath it. When performance or failures depend on those details, callers need to understand more than the convenient interface. [Spolsky, The Law of Leaky Abstractions](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/).

An abstraction remains valuable even when it leaks. The design question is which assumptions it exposes, how it behaves at failure boundaries, and what a user must know to diagnose an unexpected result.

## AI agent example

An agent framework exposes a simple method that loads conversation memory. Internally, an ORM fetches 100 messages and lazily loads one related record for each message. That can produce one list query plus 100 additional queries.

At an assumed ten milliseconds per sequential database round trip, this component alone takes **101 × 10 = 1,010 milliseconds**. An appropriate two-query loading strategy would contribute 20 milliseconds under the same simplified assumptions. Actual performance also includes query execution and application work.

The agent developer sees one memory call; the user experiences the hidden network work. Tracing query counts and loading behavior makes the abstraction explainable.

Streaming has a different leak: a framework iterator can mix user-facing text with tool events and private context. The application must know the event semantics before deciding what may reach the browser.

## Before you build

Trace model requests, tool calls, memory access, retries, and publication events across the full run. Inspect what a convenience method actually emits and which side effects it can repeat.

Keep the framework when it helps, while learning the layers that affect your guarantees. Add explicit boundaries for authorization and user-visible output. A single SDK method does not imply a single network operation or a single safe publication unit.

**Design decision:** Before trusting an agent abstraction, inspect its hidden calls, resource costs, and failure semantics.

## Limits and misuses

The law is not a demand that every developer understand every transistor or replace every library with custom code. That would remove the productivity benefit of abstraction.

Learn the next layer when evidence shows it affects your guarantees. Prefer interfaces that expose important failure states and resource costs without forcing callers to reimplement internals. A good abstraction makes ordinary work simple and exceptional behavior explainable; it cannot make the underlying system cease to exist.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/galls-law/' | relative_url }}">← Previous: Gall’s law</a>
<a href="{{ '/posts/2026/10/zawinskis-law/' | relative_url }}">Next: Zawinski’s law →</a></nav>
