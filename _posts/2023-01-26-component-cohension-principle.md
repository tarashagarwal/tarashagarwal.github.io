---
layout: portfolio-modern
article: true
title: "Component cohesion: choosing what belongs together"
date: 2023-01-26
updated: 2026-10-13
excerpt: "Use release, change, and reuse boundaries to organize components that remain understandable as a product grows."
summary: "Component cohesion is about grouping code around meaningful relationships. Examine what releases together, changes together, and is consumed together, then choose boundaries that reduce unnecessary coordination."
kicker: "ENGINEERING NOTES / FIELD GUIDE"
permalink: /posts/2023/01/component-cohesion-principles/
tags: ["architecture", "components", "cohesion"]
sections:
  - id: three-lenses
    title: "Three lenses"
  - id: draw-the-boundary
    title: "Draw the boundary"
  - id: a-worked-example
    title: "Worked example"
  - id: revisit-the-design
    title: "Revisit the design"
---
## Three lenses

Robert C. Martin’s component principles include the Reuse/Release Equivalence Principle, Common Closure Principle, and Common Reuse Principle. Together, they frame a discussion about how code should be packaged. [Author’s component-principles outline](https://cleancoder.com/files/solid.md), [Clean Architecture, chapter 13](https://www.informit.com/store/clean-architecture-a-craftsmans-guide-to-software-structure-9780134494166).

- **Release/reuse:** Give consumers a versioned unit they can depend on and upgrade deliberately.
- **Common closure:** Group code that tends to change for the same reason.
- **Common reuse:** Avoid making a consumer depend on unrelated functionality simply to use one capability.

These lenses can pull in different directions. A larger package may reduce coordination for one team but create unwanted dependencies for another. The correct boundary depends on the consumers and the change pattern.

## Draw the boundary

Start with use cases and dependency direction before organizing folders by technical labels alone. A directory called `utils` says little about what its consumers actually need.

{% include article-diagram.html image="/images/articles/component-cohesion.svg" alt="A hiring application depends on separate planning, retrieval, and export components, each containing related functionality." caption="Illustrative boundaries follow responsibilities and consumers, rather than one shared bucket of utilities." %}

A component can be a module or package inside one application. It does not have to become a separate microservice. Independent deployment adds network, failure, and ownership concerns that a package boundary may not need.

## A worked example

Imagine a hiring planner with prompt construction, retrieval, and PDF export. Prompt templates and checklist rules often evolve with planning behavior. Retrieval depends on indexing and ranking. Export depends on document formatting.

Keep a planning package focused on the plan it produces. Let retrieval return a documented context structure and let export consume a completed plan. A prompt edit should not force a consumer of the export library to learn about an embedding provider.

| Signal in the codebase | Question to ask |
| --- | --- |
| Several modules change in every feature | Are they one responsibility split too finely? |
| One tiny consumer imports many heavy dependencies | Can its dependency be narrowed? |
| Releases repeatedly require coordination | Is the release boundary mismatched? |
| Shared code has many unrelated owners | Does the package contain several distinct concerns? |

## Revisit the design

Review change history and dependency graphs. Move one responsibility at a time, keep behavior covered by meaningful tests, and avoid inventing a new boundary for every small helper.

Good cohesion makes the next change easier to explain: which component owns it, who depends on that component, and what contract must remain stable.
