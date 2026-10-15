---
layout: portfolio-modern
article: true
title: "Postel’s law: where tolerant input becomes dangerous ambiguity"
date: 2026-10-14 21:25:08 -0500
updated: 2026-10-14
excerpt: "Historical advice to accept varied input has limits. Define unambiguous contracts, keep implementations aligned, and avoid silently accepting malformed data whose meaning differs across components."
summary: "Historical advice to accept varied input has limits. Define unambiguous contracts, keep implementations aligned, and avoid silently accepting malformed data whose meaning differs across components."
kicker: "ENGINEERING LAWS / 08 OF 20 / PROTOCOL DESIGN PRINCIPLE"
cover_image: /images/articles/engineering-laws/postels-law.svg
permalink: /posts/2026/10/postels-law/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 8
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 08 / 20 · Protocol design principle</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/postels-law.svg" alt="A gateway and a service interpret a duplicate amount field differently. A request should have one defined meaning or be rejected before it can trigger a payment." caption="A gateway and a service interpret a duplicate amount field differently. A request should have one defined meaning or be rejected before it can trigger a payment." height="470" %}

## What it means

The robustness principle associated with Jon Postel encouraged conservative output and tolerance when receiving input. It appears in the historical TCP specification. [RFC 793](https://www.rfc-editor.org/rfc/rfc0793).

Modern protocol guidance explains why tolerance alone can create long-term problems: accepting malformed input hides defects and allows incompatible interpretations to accumulate. Active maintenance and agreement on behavior are essential. [RFC 9413, Maintaining Robust Protocols](https://www.rfc-editor.org/rfc/rfc9413.html).

A useful distinction is between an explicitly supported variation and an invalid message that happens to pass one parser.

## Worked example

Imagine a payment request containing the same amount field twice. One component uses the first occurrence; another uses the last. A gateway might approve one value while the payment service acts on another.

This hypothetical failure is not fixed by declaring both parsers “liberal.” The application needs a single contract and an enforcement point. It can reject duplicate fields for this message type before authorizing an action, then return a structured error explaining the invalid request.

By contrast, trimming explicitly permitted surrounding whitespace in a search query can be a documented convenience. The difference is that the accepted behavior is intentional, tested, and consistent across the path.

## Put it to work

Define field types, size limits, supported encodings, unknown-field handling, and duplicate-field rules. Validate before business actions, and ensure validation and execution operate on the same interpretation. Authorization cannot safely refer to one parsed object while execution uses another.

Add compatibility fixtures shared by clients, gateways, and services. Include malformed examples and expected rejections. If an old client emits an invalid value, give it a migration path and telemetry rather than silently maintaining several meanings forever.

Agent-generated tool arguments are another input boundary. Treat them as untrusted structured input: validate types and permissions, distinguish missing from null, and reject ambiguous values. A natural-language model’s confidence does not make an action request well formed.

## Limits and misuses

Strictness can also be designed badly. Rejecting a documented optional extension or harmless supported representation can make a protocol needlessly brittle. Forward compatibility should be specified, not guessed.

Postel’s law is historical engineering advice, not a universal security policy. The practical goal is predictable interoperability: valid messages have a shared meaning, invalid ones fail clearly, and implementations are actively maintained together. Tolerance is useful when it supports that agreement; it is harmful when it conceals disagreement.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/hyrums-law/' | relative_url }}">← Previous: Hyrum’s law</a>
<a href="{{ '/posts/2026/10/murphys-law/' | relative_url }}">Next: Murphy’s law →</a></nav>
