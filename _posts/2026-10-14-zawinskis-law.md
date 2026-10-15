---
layout: portfolio-modern
article: true
title: "Zawinski’s law: when a focused product starts becoming everything"
date: 2026-10-14 21:25:17 -0500
updated: 2026-10-14
excerpt: "The joke about software expanding into email is a useful lens on scope growth. Evaluate adjacent features by the core workflow they improve and the lifecycle costs they introduce."
summary: "The joke about software expanding into email is a useful lens on scope growth. Evaluate adjacent features by the core workflow they improve and the lifecycle costs they introduce."
kicker: "ENGINEERING LAWS / 17 OF 20 / HUMOROUS SOFTWARE OBSERVATION"
cover_image: /images/articles/engineering-laws/zawinskis-law.svg
permalink: /posts/2026/10/zawinskis-law/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 17
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 17 / 20 · Humorous software observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/zawinskis-law.svg" alt="A report viewer gains comments, then mentions, then inboxes and message search. Each addition seems adjacent, but the product is now operating a communication system." caption="A report viewer gains comments, then mentions, then inboxes and message search. Each addition seems adjacent, but the product is now operating a communication system." height="470" %}

## What it means

The observation commonly attributed to Jamie Zawinski jokes that software tends to grow until it handles email. Read it as humor about software envelopment and expanding scope, not as a scientific prediction about every program.

For a product team, the useful question is about responsibility: when a focused tool absorbs adjacent workflows, which additional obligations has the team accepted? A feature can look small on a roadmap while introducing a new kind of data, a new permission boundary, or an ongoing operational duty. Reviewing those consequences makes scope growth a deliberate decision.

## Worked example

Start with a fictional report viewer. Users ask for comments so they can discuss a result. Comments lead to mentions, notifications, unread counts, and an inbox. Someone then needs message search, attachments, delivery preferences, and retention controls.

Each request can be reasonable. Together they create a communication product with a lifecycle of its own. An unread counter is no longer just a badge: it needs consistent state across devices, clear semantics, and recovery after failed delivery.

One option is to build the complete collaboration layer. Another is to integrate with a communication tool and preserve a durable link to the report. A third is to support a small annotation workflow with explicitly limited scope. The right choice depends on the product’s users, rather than the joke deciding it in advance.

## Put it to work

For each adjacent feature, name the core user outcome it improves. Identify whether it introduces a new data type, permission model, operational dependency, or support obligation. Estimate maintenance and migration effort alongside implementation.

Keep a record of what the product owns and what it integrates. A notification adapter can be a deliberate boundary if the core product does not need to become a full messaging service. If collaboration is central to the product, investing in it may be exactly the right choice.

Agent platforms face similar expansion. A helpful assistant can turn into a workflow engine, integration catalog, scheduling system, and analytics suite. Decide which capabilities are essential to the promised outcome. A broadly capable model does not remove the need to own the surrounding product behavior.

## Limits and misuses

Scope growth is not automatically bad. User needs evolve, and combining workflows can remove expensive friction. The warning is about accepting new responsibilities without making the decision visible.

As background on the cost of accumulated software and redesign decisions, see the author’s own discussion of existing code in [Spolsky, Things You Should Never Do, Part I](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/). That essay is related reading, not a source for the origin of Zawinski’s saying. Review the whole product obligation before treating a feature as a small addition.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/leaky-abstractions/' | relative_url }}">← Previous: The law of leaky abstractions</a>
<a href="{{ '/posts/2026/10/reeds-law/' | relative_url }}">Next: Reed’s law →</a></nav>
