---
layout: portfolio-modern
article: true
title: "Parkinson’s law: give work a clear finish line, not an impossible deadline"
date: 2026-10-14 21:25:11 -0500
updated: 2026-10-14
excerpt: "Vague work can expand to occupy its available time. Timebox learning and define completion, while preserving the real time needed for testing, uncertainty, and safe delivery."
summary: "Vague work can expand to occupy its available time. Timebox learning and define completion, while preserving the real time needed for testing, uncertainty, and safe delivery."
kicker: "ENGINEERING LAWS / 11 OF 20 / SATIRICAL MANAGEMENT OBSERVATION"
cover_image: /images/articles/engineering-laws/parkinsons-law.svg
permalink: /posts/2026/10/parkinsons-law/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 11
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 11 / 20 · Satirical management observation</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/parkinsons-law.svg" alt="A two-day dashboard decision needs three agreed metrics and one usable chart. An unbounded brief invites cosmetic work before anyone agrees what decision the dashboard supports." caption="A two-day dashboard decision needs three agreed metrics and one usable chart. An unbounded brief invites cosmetic work before anyone agrees what decision the dashboard supports." height="470" %}

## What it means

C. Northcote Parkinson’s satirical writing describes work expanding to occupy the time available and examines administrative growth. The familiar deadline interpretation is a useful prompt for spotting elastic scope, rather than a universal estimate of human productivity. [Parkinson, Parkinson’s Law, reproduced book extract](https://www.panarchy.org/parkinson/parkinsonlaw.html).

In software work, ambiguity often leaves room for endless revision. A task called “improve the dashboard” can absorb a day or a quarter because nobody has defined the user decision it should improve.

## Worked example

Suppose a team needs a dashboard to decide whether a nightly import is healthy. The essential output is a view of completed records, failed records, and the age of the latest successful run. The first usable version needs clear thresholds and links to affected jobs.

Without a finish line, the team may spend the week experimenting with chart libraries, reorganizing navigation, and polishing animations. Those tasks may have value later, but they do not answer the immediate operational question.

A two-day decision timebox can produce a working version and a review with an operator. It cannot make an unknown data source reliable by decree. If the required signals are missing, the result should expose that finding and the work needed to obtain them.

## Put it to work

Write a definition of done around observable behavior: which user can perform which action, using which data, with what validation? Keep optional improvements in a separate backlog so they do not silently redefine completion.

Use short discovery timeboxes for uncertainty. At the end, decide whether to proceed, reduce scope, or investigate a specific unresolved risk. A research task can finish with evidence and a recommendation even when the answer is that the proposed approach is unsuitable.

For an AI assistant feature, separate a demo from production readiness. A demo may prove that users understand the interaction. A production release still needs permission checks, failure handling, evaluations, and operational ownership. Calling all of that “polish” creates a misleading deadline.

## Limits and misuses

The law is not evidence that any task can be completed faster by assigning less time. Arbitrary pressure can simply move work into evenings, reduce quality, or hide risk. Necessary testing and integration do not disappear because a calendar changes.

Use the observation to remove unclear scope and unproductive waiting. Review cycle time and outcomes with the team, and adjust the promise when new evidence changes the work. A useful timebox constrains an experiment or a deliverable; it should not pretend uncertainty has already been resolved.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/brooks-law/' | relative_url }}">← Previous: Brooks’s law</a>
<a href="{{ '/posts/2026/10/wirths-law/' | relative_url }}">Next: Wirth’s law →</a></nav>
