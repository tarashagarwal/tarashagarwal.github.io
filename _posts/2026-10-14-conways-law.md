---
layout: portfolio-modern
article: true
title: "Conway’s law: architecture follows the paths people use to communicate"
date: 2026-10-14 21:25:06 -0500
updated: 2026-10-14
excerpt: "System boundaries tend to reflect organizational communication boundaries. Improve ownership and collaboration alongside APIs; changing a diagram alone rarely fixes a handoff problem."
summary: "System boundaries tend to reflect organizational communication boundaries. Improve ownership and collaboration alongside APIs; changing a diagram alone rarely fixes a handoff problem."
kicker: "ENGINEERING LAWS / 06 OF 20 / ORGANIZATIONAL OBSERVATION"
cover_image: /images/articles/engineering-laws/conways-law.svg
permalink: /posts/2026/10/conways-law/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 6
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 06 / 20 · Organizational observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/conways-law.svg" alt="A checkout change that crosses frontend, backend, and database queues can be redesigned around a team owning the complete customer capability." caption="A checkout change that crosses frontend, backend, and database queues can be redesigned around a team owning the complete customer capability." height="470" %}

## What it means

Melvin Conway’s original essay argues that the communication structure of a design organization constrains the systems it can produce. Teams discover requirements, negotiate interfaces, and resolve disagreements through the paths available to them. Those paths influence technical boundaries. [Conway, How Do Committees Invent?](https://www.melconway.com/research/committees.html).

In practical terms, a boundary that requires constant cross-team approval can become a slow integration point. An organization chart is not a deployment diagram, but it affects which changes are easy to coordinate and which local compromises survive.

## Worked example

Consider a fictional checkout feature: let a customer choose a delivery slot before payment. A frontend team owns the screen, an API team owns orchestration, and a database team owns schema changes. Each team has its own queue and release date.

The customer sees one feature, while the organization sees three tickets. A late discovery that reservation and payment need a shared state transition now crosses all three queues. The resulting design may mirror those handoffs with fragile integration code.

One alternative is a team that owns the checkout capability from interface through persistence, using shared platform services where appropriate. It can negotiate one clear reservation contract with the delivery domain. This is an illustrative organizational choice, not proof that every layered team structure fails.

## Put it to work

Map a real change from idea to production. Mark ownership changes, waiting periods, and decisions that require several groups to agree. Then compare that map with synchronous calls and deployment dependencies in the system.

Write down who owns an API’s behavior, on-call response, migrations, and deprecation. A published schema without someone responsible for its lifecycle is an incomplete interface. Shared documentation, early design reviews, and stable contracts can reduce avoidable negotiation.

For an agent product, clarify the boundary between the product team defining tool behavior and the platform team providing execution, identity, and observability. The agent should not become an unowned integration layer that absorbs every disagreement about business rules.

## Limits and misuses

Conway’s law is not a theorem that predicts each service from a reporting line. Organizations communicate through informal networks, existing code constrains choices, and deliberate architecture work matters.

Reorganizing teams also has a cost. Avoid creating a microservice for every group or moving people solely to match a fashionable diagram. Start with the customer capability and the coordination problem. Evaluate whether a change improves delivery time, interface reliability, and clear ownership, rather than merely making the chart look symmetrical.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/universal-scalability-law/' | relative_url }}">← Previous: Universal scalability law</a>
<a href="{{ '/posts/2026/10/hyrums-law/' | relative_url }}">Next: Hyrum’s law →</a></nav>
