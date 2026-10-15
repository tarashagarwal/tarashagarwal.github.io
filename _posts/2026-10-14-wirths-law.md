---
layout: portfolio-modern
article: true
title: "Wirth’s law: why faster hardware can still feel slower"
date: 2026-10-14 21:25:12 -0500
updated: 2026-10-14
excerpt: "Software growth can consume hardware gains. Track the work required for a user task, establish performance budgets, and spend extra capacity on useful functionality deliberately."
summary: "Software growth can consume hardware gains. Track the work required for a user task, establish performance budgets, and spend extra capacity on useful functionality deliberately."
kicker: "ENGINEERING LAWS / 12 OF 20 / SOFTWARE EFFICIENCY OBSERVATION"
cover_image: /images/articles/engineering-laws/wirths-law.svg
permalink: /posts/2026/10/wirths-law/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 12
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 12 / 20 · Software efficiency observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/wirths-law.svg" alt="If a machine becomes twice as fast but a page requires three times the CPU work, its CPU-bound task takes 1.5 times as long under the simplified model." caption="If a machine becomes twice as fast but a page requires three times the CPU work, its CPU-bound task takes 1.5 times as long under the simplified model." height="470" %}

## What it means

The observation commonly called Wirth’s law warns that software can become slower faster than hardware improves. In his 1995 essay, Niklaus Wirth argued for leaner software and attributed the slowdown formulation to Martin Reiser. It is an observation about software growth, not a universal physical rate. [Wirth, A Plea for Lean Software](https://gwern.net/doc/cs/algorithm/1995-wirth.pdf).

Faster machines create room for useful capabilities. They can also conceal unnecessary work until users encounter an older phone, a constrained container, or a large dataset.

## Worked example

Assume a CPU-bound page task needs 100 units of computation on an old device. A newer device processes those units twice as fast. If the page now performs 300 units because of extra dependencies and repeated rendering, its relative runtime is **3 / 2 = 1.5** times the original.

This invented arithmetic isolates CPU work; actual page performance also depends on networking, storage, scheduling, and interaction design. The point is that a hardware improvement does not guarantee an improved user experience when the workload changes.

A similar issue appears in backend services. A larger instance can temporarily hide an unnecessary query inside a loop. As request volume grows, that extra work returns as latency, database load, and operating cost.

## Put it to work

Choose budgets for a meaningful user task: time until a page responds to input, transferred bytes, memory at steady state, and CPU time per successful operation. Measure on representative devices or instance sizes, not only a developer’s newest machine.

Review new dependencies for the work they add to the critical path. Load optional functionality when needed, avoid repeated transformations of unchanged data, and profile before optimizing a small function that contributes little to total time.

Agent systems have an equivalent resource budget. Additional retrieval passes, unnecessary model calls, and oversized context can consume latency and money without improving answer quality. Compare the quality gained with the extra work using a fixed evaluation set. A more elaborate pipeline should earn its cost.

## Limits and misuses

Efficiency is not the only goal. Accessibility, better security, richer capabilities, and maintainable abstractions may justify more computation. Removing a valuable feature to win an artificial benchmark can make the product worse.

Keep the comparison honest: same task, comparable data, comparable quality, and an explicit device profile. The principle is to make resource growth visible and intentional. It should help a team distinguish useful capability from accidental overhead, rather than romanticizing every small program.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/parkinsons-law/' | relative_url }}">← Previous: Parkinson’s law</a>
<a href="{{ '/posts/2026/10/metcalfes-law/' | relative_url }}">Next: Metcalfe’s law →</a></nav>
