---
layout: portfolio-modern
article: true
title: "The six pillars of AWS Well-Architected, in practice"
date: 2023-01-25
updated: 2026-10-13
excerpt: "A concrete way to review a cloud workload across operations, security, reliability, performance, cost, and sustainability."
summary: "AWS Well-Architected evaluates a workload through six complementary pillars. Use the pillars to ask concrete questions about your application, document trade-offs, and prioritize changes with observable benefits."
kicker: "ENGINEERING NOTES / FIELD GUIDE"
permalink: /posts/2022/01/six-pillars-of-well-architected-framework/
tags: ["cloud", "AWS", "architecture"]
sections:
  - id: the-six-perspectives
    title: "Six perspectives"
  - id: review-a-workload
    title: "Review a workload"
  - id: make-trade-offs-explicit
    title: "Make trade-offs explicit"
  - id: turn-review-into-action
    title: "Turn review into action"
---
## The six perspectives

The AWS Well-Architected Framework names six pillars: operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability. Each contributes a different perspective on a workload’s quality. [AWS framework overview](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html).

| Pillar | What to examine |
| --- | --- |
| Operational excellence | Deployment, observability, incident response, learning |
| Security | Identities, permissions, secrets, data protection |
| Reliability | Recovery, dependency failures, capacity, testing |
| Performance efficiency | Resource fit and changing workload demands |
| Cost optimization | Value delivered for the resources consumed |
| Sustainability | Resource efficiency and reducing unnecessary work |

These are review dimensions, not six independent scores to maximize in isolation. AWS’s definitions explain their distinct goals. [Pillar definitions](https://docs.aws.amazon.com/wellarchitected/latest/framework/definitions.html).

{% include article-diagram.html image="/images/articles/well-architected.svg" alt="A cloud workload is surrounded by six review pillars: operations, security, reliability, performance, cost, and sustainability." caption="One workload, six perspectives. A change can affect several pillars at once." height="480" %}

## Review a workload

Take an illustrative document-processing pipeline: an upload enters object storage, a queue schedules work, workers extract text, and an application presents the result.

Ask how an operator finds a failed document. Ask which component can read the original file. Ask whether replaying a queue message duplicates a result. Ask how long a burst takes to drain, what idle workers cost, and whether expired outputs still consume storage.

These questions turn an abstract architecture review into observable behaviors. Write down the expected result and a test for each critical assumption.

## Make trade-offs explicit

A larger worker pool may shorten a backlog but increase cost. A cache may reduce repeated computation while adding freshness and invalidation questions. Keeping every intermediate artifact may make debugging easier but extend retention and storage use.

The review should record the product requirement behind each choice. For example, set a completion target for routine documents and a separate recovery target for failed jobs. Evaluate the resources needed to meet those targets under realistic load.

For sustainability, examine resources used per completed unit of work and avoid processing or retaining data without a purpose. [AWS sustainability design principles](https://docs.aws.amazon.com/wellarchitected/2024-06-27/framework/sus-design-principles.html).

## Turn review into action

Pick a bounded improvement, assign an owner, and record the baseline. For the pipeline, that could mean adding a retry limit, tracing one document across components, or cleaning up expired temporary files.

Repeat the review after meaningful workload changes. The framework becomes useful when its questions lead to decisions that the team can explain, test, and revisit.
