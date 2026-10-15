---
layout: portfolio-modern
article: true
title: "Leaky abstractions: the hidden layer returns when performance or failure matters"
date: 2026-10-14 21:25:16 -0500
updated: 2026-10-14
excerpt: "Abstractions simplify ordinary work, but details beneath them can reappear through latency, failure, and semantics. Keep the abstraction and learn which underlying behaviors matter at its boundaries."
summary: "Abstractions simplify ordinary work, but details beneath them can reappear through latency, failure, and semantics. Keep the abstraction and learn which underlying behaviors matter at its boundaries."
kicker: "ENGINEERING LAWS / 16 OF 20 / SOFTWARE DESIGN OBSERVATION"
cover_image: /images/articles/engineering-laws/leaky-abstractions.svg
permalink: /posts/2026/10/leaky-abstractions/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 16
sections:
  - id: what-it-means
    title: "What it means"
  - id: worked-example
    title: "Worked example"
  - id: put-it-to-work
    title: "Put it to work"
  - id: limits-and-misuses
    title: "Limits and misuses"
---
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 16 / 20 · Software design observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/leaky-abstractions.svg" alt="An ORM loop that loads one parent list and then 100 children creates 101 queries. At an assumed ten milliseconds per sequential round trip, that is about 1,010 milliseconds before other work." caption="An ORM loop that loads one parent list and then 100 children creates 101 queries. At an assumed ten milliseconds per sequential round trip, that is about 1,010 milliseconds before other work." height="470" %}

## What it means

Joel Spolsky’s law of leaky abstractions describes a familiar engineering problem: an abstraction cannot hide every detail of the layer beneath it. When performance or failures depend on those details, callers need to understand more than the convenient interface. [Spolsky, The Law of Leaky Abstractions](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/).

An abstraction remains valuable even when it leaks. The design question is which assumptions it exposes, how it behaves at failure boundaries, and what a user must know to diagnose an unexpected result.

## Worked example

Suppose an ORM returns 100 orders. Rendering each order accesses a lazily loaded customer record. The code looks like an ordinary loop over objects, but it can issue one query for the orders and 100 more queries for the related records.

At an illustrative ten milliseconds per sequential database round trip, the round-trip component alone is **101 × 10 = 1,010 milliseconds**. If an appropriate eager-loading strategy uses two queries, the same simplified component becomes 20 milliseconds. Actual runtime also depends on query execution, row size, connection behavior, and application work.

The object interface concealed the network boundary. Understanding SQL, query counts, and loading behavior makes the abstraction usable rather than requiring the team to abandon it.

## Put it to work

Document the properties that matter beneath an interface: timeouts, consistency, ordering, resource ownership, and retry behavior. Add observability where logical operations cross network or storage boundaries.

Profile realistic workloads. An abstraction that behaves well with ten records may leak badly with ten thousand. Test failure as well as speed: a method called “save” may still leave uncertainty if the server commits and the connection drops before a response.

Agent orchestration frameworks provide another example. A convenient “stream” can contain model text, tool events, and status changes with different audiences. The application still needs to know which events are intended for the user and which require authorization or review. A shared iterator does not make their semantics identical.

## Limits and misuses

The law is not a demand that every developer understand every transistor or replace every library with custom code. That would remove the productivity benefit of abstraction.

Learn the next layer when evidence shows it affects your guarantees. Prefer interfaces that expose important failure states and resource costs without forcing callers to reimplement internals. A good abstraction makes ordinary work simple and exceptional behavior explainable; it cannot make the underlying system cease to exist.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/galls-law/' | relative_url }}">← Previous: Gall’s law</a>
<a href="{{ '/posts/2026/10/zawinskis-law/' | relative_url }}">Next: Zawinski’s law →</a></nav>
