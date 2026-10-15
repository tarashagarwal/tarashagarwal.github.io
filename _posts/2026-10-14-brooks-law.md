---
layout: portfolio-modern
article: true
title: "Brooks’s law: why adding people can delay a late software project"
date: 2026-10-14 21:25:10 -0500
updated: 2026-10-14
excerpt: "New people bring capacity and also require onboarding, coordination, and integration. A late project benefits only when added help can relieve its actual bottleneck in time."
summary: "New people bring capacity and also require onboarding, coordination, and integration. A late project benefits only when added help can relieve its actual bottleneck in time."
kicker: "ENGINEERING LAWS / 10 OF 20 / PROJECT MANAGEMENT OBSERVATION"
cover_image: /images/articles/engineering-laws/brooks-law.svg
permalink: /posts/2026/10/brooks-law/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 10
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 10 / 20 · Project management observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/brooks-law.svg" alt="Four engineers have six possible communication pairs; eight have 28. Those counts illustrate coordination growth, not a formula for project duration." caption="Four engineers have six possible communication pairs; eight have 28. Those counts illustrate coordination growth, not a formula for project duration." height="470" %}

## What it means

Frederick Brooks warned that adding people to an already late software project can make it later. New contributors need context, experienced teammates spend time teaching them, and additional workstreams require coordination. [Brooks, The Mythical Man-Month, publisher’s edition](https://www.informit.com/store/mythical-man-month-essays-on-software-engineering-anniversary-9780201835953).

People and months are not interchangeable units when tasks depend on one another. A team cannot divide an unresolved architectural decision among ten people and assume it will finish in one tenth of the time.

## Worked example

Imagine four engineers trying to finish a release in two weeks. Four more join. If each newcomer needs six hours of focused mentoring from an existing engineer, the original group spends 24 hours of its scarce remaining time transferring context.

Some of that investment will pay back later. Whether it helps this release depends on when the new contributors become productive and whether there are independent tasks available. If the critical path is one data migration design, adding parallel feature work may not move the release date at all.

The number of possible pairwise communication links rises from **4 × 3 / 2 = 6** to **8 × 7 / 2 = 28**. This is a combinatorial illustration, not a prediction that meetings or delivery time will rise by the same ratio.

## Put it to work

Identify the constraint before staffing it. If experienced engineers are blocked by repetitive test setup, documentation, or an isolated adapter, additional help with a clear interface may free them for the critical path. If the obstacle is a disputed requirement, resolve the decision first.

Reduce onboarding cost with a working development setup, concise architectural notes, small initial changes, and a named mentor. Protect uninterrupted time for the people resolving the hardest dependency. Track integrated, verified progress rather than the number of simultaneous branches.

Coding agents change some mechanics but not the underlying need for review and integration. Generating more patches can increase a reviewer queue. Give each task a bounded scope and an acceptance criterion, and measure how quickly correct changes reach the shared system.

## Limits and misuses

Brooks’s law is not an instruction never to hire, ask for help, or increase team size. Early staffing, independent work, and experienced specialists can help considerably. The warning concerns timing, dependencies, and the cost of introducing people into ongoing work.

Compare staffing options with scope reduction and sequencing changes. A smaller coherent release may deliver value sooner than a larger group coordinating an unchanged promise. Make that choice openly, using the actual critical path.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/murphys-law/' | relative_url }}">← Previous: Murphy’s law</a>
<a href="{{ '/posts/2026/10/parkinsons-law/' | relative_url }}">Next: Parkinson’s law →</a></nav>
