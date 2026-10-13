---
layout: portfolio-modern
article: true
title: "A mixed stack without the maintenance spiral"
date: 2022-01-01
updated: 2026-10-13
excerpt: "How to choose technology boundaries that preserve flexibility without multiplying operational complexity."
summary: "A mixed stack is useful when different workloads have different needs. Keep the core simple, isolate vendor dependencies behind stable interfaces, and budget for the operational work that each extra technology introduces."
kicker: "ENGINEERING NOTES / FIELD GUIDE"
permalink: /posts/2022/01/the-mixed-stack/
tags: ["architecture", "open-source", "mixed-stack"]
sections:
  - id: why-diversify
    title: "Why diversify?"
  - id: the-boundary
    title: "The boundary"
  - id: a-worked-example
    title: "Worked example"
  - id: a-decision-checklist
    title: "Decision checklist"
---
## Why diversify?

A product rarely lives inside one technology forever. A transactional application may need a search engine, an event processor, or an AI retrieval service. Different workloads can justify different tools, but adding a language or database also adds deployment, monitoring, and support work.

Licensing is a separate question from architecture. The Open Source Initiative’s definition allows commercial use; a vendor’s hosted service or packaged distribution can have its own terms. Chef’s documentation distinguishes its Apache-licensed source from commercial distributions. Check the specific artifact you deploy rather than assuming that source availability determines every cost. [Open Source Definition](https://opensource.org/osd), [Chef licensing](https://docs.chef.io/licensing/).

## The boundary

Put application behavior behind interfaces that describe what the product needs. A search adapter should expose operations such as `find_products(query)`, rather than leaking a vendor-specific query language into every controller.

{% include article-diagram.html image="/images/articles/mixed-stack.svg" alt="Application core connects through stable adapters to a transactional database, a search service, and an AI retrieval service." caption="Use a shared application boundary while allowing specialized services to evolve independently." %}

This makes a replacement possible. It does not make replacements free: ranking behavior, consistency, authentication, and operational guarantees still differ between implementations.

## A worked example

Imagine a catalog application whose purchases live in PostgreSQL. Search and recommendations are separate workloads. Keep checkout inside the transactional boundary, send catalog-change events to a search index, and let a retrieval service build embeddings asynchronously.

| Workload | Illustrative choice | Boundary to keep explicit |
| --- | --- | --- |
| Purchases | Relational database | Transactions and business invariants |
| Catalog discovery | Search index | Ranking and index freshness |
| Semantic retrieval | Vector store | Embedding version and retrieval quality |

Start with one implementation per interface. A tested migration path is usually more manageable than operating two interchangeable stacks indefinitely. Document what happens when a downstream service is unavailable; checkout should not depend on a recommendation response.

## A decision checklist

Before introducing another component, write down its workload, owner, deployment process, and recovery path. Estimate infrastructure and maintenance costs alongside license or subscription costs. Test exporting data and rebuilding derived indexes.

The architectural goal is a deliberate boundary that keeps future changes understandable. Choose diversity where it solves a measured problem, then keep the surrounding product as simple as possible.
