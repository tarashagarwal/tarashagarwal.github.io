---
layout: portfolio-modern
article: true
title: "Murphy’s law: turn a pessimistic slogan into a recovery plan"
date: 2026-10-14 21:25:09 -0500
updated: 2026-10-14
excerpt: "Murphy’s law is a reminder to examine failure paths, not a probability theorem. Identify credible failures, limit their impact, and prove that recovery works."
summary: "Murphy’s law is a reminder to examine failure paths, not a probability theorem. Identify credible failures, limit their impact, and prove that recovery works."
kicker: "ENGINEERING LAWS / 09 OF 20 / ENGINEERING APHORISM"
cover_image: /images/articles/engineering-laws/murphys-law.svg
permalink: /posts/2026/10/murphys-law/
tags: [engineering laws, software architecture, systems design]
series: engineering-laws
series_order: 9
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
<nav class="series-trail" aria-label="Engineering laws series"><a href="{{ '/engineering-laws/' | relative_url }}">← All 20 engineering laws</a><span>Article 09 / 20 · Engineering aphorism</span></nav>

{% include article-diagram.html image="/images/articles/engineering-laws/murphys-law.svg" alt="A worker writes an output and crashes before acknowledging the queue message. Redelivery must not create a duplicate customer charge or overwrite the wrong artifact." caption="A worker writes an output and crashes before acknowledging the queue message. Redelivery must not create a duplicate customer charge or overwrite the wrong artifact." height="470" %}

## What it means

Murphy’s law is commonly expressed as the expectation that things which can go wrong eventually will. Treat that as an engineering prompt, rather than a mathematical claim that every imaginable failure is inevitable.

A more useful question is: **what happens if this operation stops between any two important steps?** Formal systems work handles risks, verification, and validation explicitly; the aphorism is not a substitute for those activities. [NASA Systems Engineering Handbook](https://www.nasa.gov/reference/systems-engineering-handbook/).

The following workflow is an application of that question, not a claim about the historical origin of the saying.

## Worked example

A report-generation worker receives a job, writes the finished report, and then acknowledges the queue message. It crashes after the write but before the acknowledgement. The queue later delivers the job again.

If the second worker assumes every delivery represents a new business request, it can publish another report, send another email, or charge the customer again. The failure is ordinary: a process stopped at an inconvenient point.

Give the business request a stable identity. Record completion durably, make repeated execution return the existing result where appropriate, and use an atomic publication strategy for the artifact. These choices need careful transaction boundaries; adding a random request ID on each retry would defeat deduplication.

## Put it to work

List failures against the actual workflow: interrupted uploads, expired credentials, full disks, dependency timeouts, duplicate events, and lost acknowledgements. Rank them by likelihood and impact so the exercise remains focused.

For each important failure, define detection, containment, recovery, and an owner. A backup is useful only if restoration succeeds within the required time and produces usable data. Run a restore exercise rather than relying on a green “backup complete” message.

An agent that executes tools needs explicit pending, succeeded, failed, and uncertain states. After a timeout on a side-effecting call, check the authoritative result before retrying. “No response” does not prove that nothing happened. Keep an audit trail that lets an operator reconcile what was attempted with what actually committed.

## Limits and misuses

Pessimism without prioritization can paralyze a team. You cannot eliminate every failure, and a complicated defensive mechanism can introduce new ones. Choose controls proportional to the consequence and verify them through targeted fault injection or recovery drills.

Avoid using the slogan to blame people after an incident. The productive output is a more resilient system: smaller failure domains, understandable state transitions, bounded retries, and a recovery procedure someone has actually practiced.

<nav class="series-pagination" aria-label="More in this series"><a href="{{ '/posts/2026/10/postels-law/' | relative_url }}">← Previous: Postel’s law</a>
<a href="{{ '/posts/2026/10/brooks-law/' | relative_url }}">Next: Brooks’s law →</a></nav>
