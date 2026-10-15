---
layout: portfolio-modern
article: true
title: "Hyrum’s law: your undocumented behavior may already be someone’s API"
date: 2026-10-14 21:25:07 -0500
updated: 2026-10-14
excerpt: "At sufficient scale, consumers can depend on observable behavior beyond the documented contract. Discover those dependencies before changing an implementation, and make compatibility a deliberate product decision."
summary: "At sufficient scale, consumers can depend on observable behavior beyond the documented contract. Discover those dependencies before changing an implementation, and make compatibility a deliberate product decision."
kicker: "ENGINEERING LAWS / 07 OF 20 / COMPATIBILITY OBSERVATION"
cover_image: /images/articles/engineering-laws/hyrums-law.svg
permalink: /posts/2026/10/hyrums-law/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 7
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 07 / 20 · Compatibility observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/hyrums-law.svg" alt="A documented API contract is surrounded by observable error wording, response order, timing, and implicit defaults. Each can become a consumer dependency." caption="Observable behavior extends beyond the intended contract." height="470" %}

## What it means

Hyrum Wright’s formulation warns that enough users will make surprising dependencies on observable system behavior. Documentation describes an intended contract; callers can observe more than that contract. Output order, error text, timing, and defaults can all become expectations. [Hyrum’s Law, author’s site](https://www.hyrumslaw.com/).

The lesson is about compatibility risk, not a guarantee that every detail is currently used. An implementation change can be internally correct and still disrupt a consumer that learned a different, accidental contract.

## Worked example

Suppose an endpoint returns a JSON object with customer fields. A consumer stores the response as a raw string and compares it with a previous string to detect changes. An optimization changes key order while preserving every documented field and value.

The consumer now reports false updates. The server team can reasonably say that key order was not promised, but the customer still experiences a regression. The missing step was discovering and managing the dependency before a broad rollout.

A second example is a monitoring script that recognizes one English error message instead of a stable error code. Rewording that message for clarity can disable the alert. Both examples are hypothetical and illustrate why behavior extends beyond a type signature.

## Put it to work

Identify observable surfaces during reviews: wire format, ordering, pagination, default values, errors, retries, and timing-sensitive workflows. Add stable machine-readable fields where clients currently have to infer meaning from prose.

Sample real consumer behavior where privacy and access rules permit it. Use integration tests for known consumers, release notes, canary rollouts, and a migration window for risky changes. Measure failures and support reports during rollout rather than treating successful server tests as the whole compatibility story.

Agent tools need the same discipline. A prompt may have learned an error phrase or a field’s implicit meaning. Keep tool contracts explicit, evaluate existing workflows after changes, and version behavior when a semantic change cannot be made safely in place.

## Limits and misuses

The rule does not require preserving insecure or broken behavior forever. Sometimes a migration is necessary. A responsible change explains the new contract, provides a transition where possible, and has a clear rollback or containment plan.

Nor should every quirky consumer become a permanent public guarantee. Distinguish intentional promises from temporary compatibility accommodations. The important work is to make that decision using evidence about consumers and consequences, rather than assuming that “undocumented” means “unobservable.”

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/conways-law/' | relative_url }}">← Previous: Conway’s law</a>
<a href="{{ '/posts/2026/10/postels-law/' | relative_url }}">Next: Postel’s law →</a></nav>
