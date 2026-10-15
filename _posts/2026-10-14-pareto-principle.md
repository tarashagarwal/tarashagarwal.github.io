---
layout: portfolio-modern
article: true
title: "The Pareto principle: prioritize from evidence, not an automatic 80/20 split"
date: 2026-10-14 21:25:14 -0500
updated: 2026-10-14
excerpt: "A small number of causes often account for a large share of an outcome. Measure the actual distribution, prioritize high-impact work, and keep rare but severe risks visible."
summary: "A small number of causes often account for a large share of an outcome. Measure the actual distribution, prioritize high-impact work, and keep rare but severe risks visible."
kicker: "ENGINEERING LAWS / 14 OF 20 / PRIORITIZATION HEURISTIC"
cover_image: /images/articles/engineering-laws/pareto-principle.svg
permalink: /posts/2026/10/pareto-principle/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 14
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 14 / 20 · Prioritization heuristic</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/pareto-principle.svg" alt="In an invented incident sample, five causes contribute 50, 30, 10, 6, and 4 incidents. The first two explain 80%, although they are 40% of the causes." caption="In an invented incident sample, five causes contribute 50, 30, 10, 6, and 4 incidents. The first two explain 80%, although they are 40% of the causes." height="470" %}

## What it means

The Pareto principle encourages attention to the relatively few causes responsible for much of an outcome. Quality practice uses Pareto analysis to rank observed causes and identify the largest contributors. The familiar 80/20 wording is a heuristic, not a required ratio. [Juran Institute, Pareto principle and analysis](https://www.juran.com/blog/a-guide-to-the-pareto-principle-80-20-rule-pareto-analysis/).

This makes it useful for performance and reliability work: a complete list of possible improvements is less helpful than understanding which ones explain most of a measured problem.

## Worked example

Consider 100 fictional incidents classified into five causes: a connection leak causes 50, a retry loop 30, a deployment configuration error 10, stale credentials six, and an uncommon parsing bug four.

The first two causes explain **80 incidents**, or 80% of the total. They represent **two of five categories**, or 40%, rather than 20%. The useful result is the concentration of impact, not whether the data conforms to the slogan.

Fixing the connection leak may be an excellent first investment. But incident count is only one metric. If the four parsing incidents corrupted important records, their severity may justify earlier attention. A frequency chart should not erase consequences.

## Put it to work

Start with a clear outcome and a representative time window. Decide whether you are prioritizing error count, customer minutes lost, compute cost, or support effort. Keep categories meaningful and avoid counting the same event several times.

Sort causes by contribution, calculate a cumulative share, and investigate the largest actionable items. After a change, measure again. Removing one bottleneck changes the distribution; yesterday’s dominant cause may no longer deserve the same priority.

For an agent service, classify failed tasks before redesigning the whole pipeline. If most failures come from a missing permission check or a brittle tool contract, another prompt rewrite may have little effect. Use examples from each failure group to evaluate whether the proposed fix addresses the actual cause.

## Limits and misuses

Observed concentration does not prove causation. Several error labels may arise from one upstream failure, and incomplete telemetry can make invisible problems look unimportant. Validate a hypothesis before spending the whole engineering budget on it.

Some work is mandatory even when infrequent: a rare authorization defect can have a severe consequence. Use Pareto analysis alongside severity, uncertainty, and strategic value. The principle helps sequence investigation; it does not authorize ignoring the remaining users or declaring the last 20% unnecessary.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/metcalfes-law/' | relative_url }}">← Previous: Metcalfe’s law</a>
<a href="{{ '/posts/2026/10/galls-law/' | relative_url }}">Next: Gall’s law →</a></nav>
