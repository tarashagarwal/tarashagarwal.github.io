---
layout: portfolio-modern
article: true
title: "From data to intelligence: eight architecture concepts, explained together"
date: 2026-10-14 19:09:47 -0500
updated: 2026-10-14
excerpt: "Kimball modeling, knowledge graphs, ontologies, data mesh, Medallion architecture, semantic layers, Lambda architecture, and knowledge distillation—with one practical retail example."
summary: "These eight ideas solve different problems: analytical structure, relationships, meaning, ownership, data refinement, metric consistency, processing latency, and model efficiency. They can complement each other, but a product does not need all eight. Follow one fictional retailer from raw order events to trustworthy analytics and AI to see where each idea belongs."
kicker: "DEEP DIVE / DATA PLATFORMS & AI"
cover_image: /images/articles/data-architecture-ai-cover.webp
permalink: /posts/2026/10/data-architecture-and-ai-explained/
tags: [data architecture, Kimball, knowledge graphs, ontology, data mesh, Medallion, semantic layer, Lambda architecture, knowledge distillation]
sections:
  - id: start-with-the-question
    title: "The map"
  - id: one-retailer-eight-design-questions
    title: "The example"
  - id: kimball-modeling-start-with-the-grain
    title: "Kimball modeling"
  - id: medallion-architecture-refine-data-in-stages
    title: "Medallion architecture"
  - id: the-semantic-layer-define-the-metric-once
    title: "Semantic layer"
  - id: knowledge-graphs-make-relationships-queryable
    title: "Knowledge graphs"
  - id: ontology-make-the-vocabulary-explicit
    title: "Ontology"
  - id: data-mesh-give-data-products-an-owner
    title: "Data mesh"
  - id: lambda-architecture-balance-freshness-and-recomputation
    title: "Lambda architecture"
  - id: knowledge-distillation-teach-a-smaller-model
    title: "Knowledge distillation"
  - id: how-the-pieces-fit-in-one-product
    title: "Putting it together"
  - id: what-i-would-build-first
    title: "Where to start"
  - id: the-architecture-field-guide
    title: "Download the field guide"
---
{% include article-diagram.html image="/images/articles/data-architecture-ai-cover.webp" alt="Conceptual illustration of data tables, bronze-silver-gold terraces, a connected knowledge graph, and a large model guiding a smaller model." caption="Original AI-generated editorial illustration. It introduces the concepts visually; the labeled diagrams below describe the actual example architecture." height="507" %}

## Start with the question

A star schema, a knowledge graph, and a smaller language model can all appear in the same product. That does not make them competing versions of the same architecture.

Some concepts describe **how data is represented**. Others describe **who owns it**, **how it is processed**, **what a metric means**, or **how a model is trained**. Comparing them without naming the problem leads to designs that sound impressive but are difficult to operate.

Here is the map for this article:

| Concept | Main question it answers | A typical artifact |
| --- | --- | --- |
| Kimball dimensional modeling | How should analytical facts and descriptive context be organized? | Fact tables, dimensions, declared grain |
| Knowledge graph | Which entities are connected, and how? | Identified entities and typed relationships |
| Ontology | What do those entity types and relationships mean? | A shared vocabulary and formal semantics |
| Data mesh | Who owns a usable analytical data product? | Domain ownership, contracts, platform standards |
| Medallion architecture | How does raw data become progressively more usable? | Bronze, silver, and gold datasets |
| Semantic layer | How do consumers calculate business metrics consistently? | Versioned metric and dimension definitions |
| Lambda architecture | How do historical recomputation and low-latency updates coexist? | Batch, speed, and serving paths |
| Knowledge distillation | How can a student model learn useful behavior from a teacher? | A trained model and its evaluation results |

The examples below are **fictional teaching examples**, not claims about systems I delivered for an employer. The diagrams show logical responsibilities, rather than a required vendor stack.

## One retailer, eight design questions

Imagine **Northstar Retail**, a fictional business selling products through a website and several stores. Its systems produce orders, refunds, customer updates, product catalog changes, and supplier shipment events.

For one order line:

| Field | Example |
| --- | --- |
| Order / line | O-1042 / L-1 |
| Customer | C-17 |
| Product / supplier | P-7 / S-9 |
| Quantity / unit price | 2 / USD 50 |
| Line discount | USD 10 |
| Completed line amount | USD 90 |
| Later allocated refund | USD 45 |

For the **illustrative metric definition used here**, net sales after that refund are USD 45, excluding tax and shipping. This is an application reporting definition, not a claim that every business should recognize revenue this way.

The team wants to answer several different questions: How much did we sell? Which suppliers are linked to frequently returned products? Why do two dashboards disagree? How fresh are today's numbers? Can a small model reliably route customer questions to the right service?

Each architecture concept helps with a different part of those questions.

## Kimball modeling: start with the grain

Kimball dimensional modeling organizes analytical measurements around business processes, facts, and descriptive dimensions. Its critical starting point is the **grain**: the exact business event or observation represented by one fact-table row. [Kimball Group modeling techniques](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/).

For Northstar, choose **one row per completed order line**. A `fact_order_line` table might contain order and line identifiers, dimension keys, quantity, and the completed line amount. Dimensions describe the date, customer, product, and store. This is a star schema: descriptive tables surround the central measurements.

{% include article-diagram.html image="/images/articles/data-kimball-star.svg" alt="A central order-line fact table with date, customer, product, and store dimensions. The declared grain is one completed order line." caption="The grain determines which facts belong together. Order totals and individual line amounts are different grains." height="520" %}

### Example: prevent refund fan-out

Refunds may arrive more than once for a line. Joining raw refund rows directly to order lines and summing both sides can repeat the original sales amount. Aggregate refunds to the order-line grain first:

```sql
WITH refunds_by_line AS (
  SELECT order_id, line_id, SUM(refund_amount_usd) AS refunded_usd
  FROM fact_refund
  GROUP BY order_id, line_id
)
SELECT
  o.order_id,
  o.line_id,
  o.completed_amount_usd - COALESCE(r.refunded_usd, 0)
    AS lifetime_net_sales_usd
FROM fact_order_line AS o
LEFT JOIN refunds_by_line AS r
  ON o.order_id = r.order_id AND o.line_id = r.line_id;
```

This teaching query assumes refunds have already been validated, deduplicated, and normalized to USD. It computes a lifetime line value. Reporting by order date versus refund date requires an explicit time policy; the query does not decide that policy for you.

Historical descriptive changes also matter. If a customer changes region, decide whether a report needs their region at purchase time or their current region. Kimball's slowly changing dimension techniques provide different ways to represent that history. [Slowly changing dimensions](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/type-2/).

Use dimensional modeling when people repeatedly aggregate measurements by understandable business attributes. A good star schema simplifies those questions; it does not replace transactional application design or define every business metric by itself.

## Medallion architecture: refine data in stages

Medallion architecture describes logical stages commonly called **bronze, silver, and gold**. The pattern progressively improves the usefulness of data as it moves from raw capture toward business-ready datasets. [Databricks Medallion documentation](https://docs.databricks.com/aws/en/lakehouse/medallion).

For Northstar:

- **Bronze:** retain incoming order and refund events, source identifiers, arrival times, and original payloads for replay.
- **Silver:** validate fields, normalize currencies and timestamps, resolve event identity, and build trustworthy records at a documented grain.
- **Gold:** publish the order-line facts, product dimensions, or other curated data products used by reporting and applications.

{% include article-diagram.html image="/images/articles/data-medallion-semantic.svg" alt="Raw bronze events move through silver validation and normalization into gold analytical models. A semantic layer exposes consistent metrics to dashboards and an agent." caption="Medallion describes refinement. A star schema can live in gold, while a semantic layer defines how consumers use it." height="440" %}

### Example: a duplicate is not always an update

Suppose event `E-100` arrives twice because a producer retries. Silver processing should avoid counting the same event twice. But event `E-101` may be a legitimate later update to the same order line. Deduplicating only by `order_id` would incorrectly discard that update.

The data contract needs event identity, record identity, operation type, and ordering or version information. The transformation must distinguish replayed events from new business changes. Keep invalid records available for diagnosis rather than silently inventing missing values.

Calling three folders bronze, silver, and gold does not create quality checks, transaction guarantees, or lineage. Those require actual storage, processing, and operational mechanisms. Define what makes a dataset eligible to move to the next stage, and test whether a replay produces the same business result.

## The semantic layer: define the metric once

A semantic layer gives consumers shared definitions for metrics and the entities and dimensions used to query them. For example, dbt's Semantic Layer uses declared models and metrics to construct consistent analytical queries. [dbt Semantic Layer](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl).

Northstar's marketing dashboard might count paid orders, while finance subtracts refunds and operations includes cancellations. Labeling all three “revenue” creates a disagreement that faster SQL cannot resolve.

### Example: a metric contract

A conceptual definition—not executable dbt configuration—could be:

```yaml
metric: lifetime_net_sales_usd
version: 1
owner: commerce-analytics
grain: order_line
formula: completed_amount_usd - allocated_refunds_usd
currency: USD
excluded_amounts: [tax, shipping]
allowed_dimensions: [order_date, product_category, store_region]
refund_policy: attribute_to_original_order_line
```

For O-1042 / L-1, the result is `90 - 45 = 45`. If another report must show refunds on the day they occurred, define that separate event-time measure deliberately instead of quietly changing this one.

A metric definition also needs join rules, null behavior, currency handling, and access policies. Joining an order-level metric to many order lines can multiply it; defining the name centrally does not repair an incorrect join.

For an AI assistant, expose an approved metric interface so the model can request an existing measure instead of inventing “net sales” from column names. Validate the request and authorize its dimensions on the server. The semantic layer supports consistency, while permissions and reliable execution remain application responsibilities.

## Knowledge graphs: make relationships queryable

A knowledge graph represents identified entities and their relationships. One standards-based representation is RDF, which expresses statements as subject–predicate–object triples. Property graphs are another implementation approach; a knowledge graph does not require one particular database. [W3C RDF primer](https://www.w3.org/TR/rdf11-primer/).

Northstar might represent these relationships:

```text
Customer C-17  --placed-->       Order O-1042
Order O-1042   --has_line-->     OrderLine L-1
OrderLine L-1  --product-->      Product P-7
Product P-7    --supplied_by-->  Supplier S-9
Supplier S-9   --located_in-->   Region R-2
```

### Example: follow a business connection

A support analyst asks: “Which orders include products supplied by S-9?” The graph follows supplier → product → order line → order. Another question could connect product families, replacement items, and supplier locations without forcing all relationships into one wide table.

{% include article-diagram.html image="/images/articles/data-graph-ontology.svg" alt="An ontology defines types and relation meanings. Below it, a graph contains actual customer, order, order-line, product, and supplier instances connected by those relationships." caption="The ontology describes the vocabulary. The graph holds particular statements using that vocabulary." height="560" %}

Relationships do not remove the need for identity resolution. If two systems use different supplier IDs, the graph needs a governed mapping. It also needs provenance, timestamps, and a policy for conflicting claims.

A vector index answers a similarity question, such as which passages resemble a query. An explicit graph answers a relationship question. An application can combine them, but embedding text does not automatically construct a trustworthy graph of its claims. Likewise, a path linking a supplier to a returned item is evidence of a connection—not proof that the supplier caused the return.

## Ontology: make the vocabulary explicit

An ontology specifies concepts and relationships in a domain, potentially with formal logical semantics. OWL is a W3C language for expressing ontologies; it can describe classes, properties, and relationships between them. [W3C OWL primer](https://www.w3.org/TR/owl2-primer/).

For Northstar, define `Customer`, `Order`, `OrderLine`, `Product`, and `Supplier`. Make it explicit that an order has lines and that each line refers to a product. Decide whether a supplier is the manufacturer, distributor, seller, or some separate role—these are not interchangeable labels.

### Example: schema, ontology, and validation

A database column named `supplier_id` describes a storage field. The ontology documents what a supplier is and what the relationship means. A separate validation rule can check whether required supplier information is present.

Be careful with **open-world reasoning**. In OWL, missing information generally does not establish that a statement is false. Domain and range declarations can support inference; they should not be treated as SQL-style “reject this bad row” rules.

If Northstar requires every published order line to have exactly one product reference, implement and test that publishing constraint. For RDF data, SHACL provides a language for expressing validation shapes. [W3C SHACL specification](https://www.w3.org/TR/shacl/).

Useful ontology work begins with a narrow set of business questions and a vocabulary the teams can maintain. A very large class hierarchy with no agreed users or update process is unlikely to improve the product.

## Data mesh: give data products an owner

Data mesh addresses organizational scale through domain ownership, data as a product, a self-service platform, and federated governance. Its originator, Zhamak Dehghani, describes these as interdependent principles. It is not simply a technique for distributing tables across databases. [Data mesh principles](https://martinfowler.com/articles/data-mesh-principles.html).

Northstar can assign responsibilities like this:

| Domain | Owned data product | Example consumer |
| --- | --- | --- |
| Commerce | Completed order lines and allocated refunds | Finance dashboard |
| Catalog | Product identities and supplier relationships | Support assistant |
| Fulfillment | Shipment milestones and delays | Operations dashboard |

{% include article-diagram.html image="/images/articles/data-mesh-ownership.svg" alt="Commerce, catalog, and fulfillment teams own data products. A shared platform supplies tooling, while common identity, access, and contract standards apply across domains." caption="Ownership is distributed; interoperability and platform capabilities still need shared agreements." height="440" %}

### Example: make ownership observable

For the commerce data product, publish an owner, schema version, freshness objective, access rules, and instructions for reporting an issue. An illustrative freshness objective might be “95% of accepted events reflected within 15 minutes”; that is a proposed contract for this example, not a measured guarantee.

The shared platform can provide ingestion templates, deployment automation, catalogs, and standard checks. Domain teams still own the correctness and usability of their products. Shared customer identifiers and metric conventions need coordination across domains.

For a small team, separate ownership of every dataset can introduce more handoffs than value. Domain-aligned documentation and explicit contracts can be useful before a company adopts a full data-mesh operating model. Choose the organizational structure because team coordination is the problem, rather than because the diagram looks modern.

## Lambda architecture: balance freshness and recomputation

Lambda architecture combines a **batch layer** for historical recomputation, a **speed layer** for recent incremental results, and a **serving layer** that exposes the combined view. Nathan Marz's original discussion explains the use of recomputable views over retained data alongside a real-time path. This architectural pattern is separate from the AWS Lambda serverless product. [Nathan Marz's architecture discussion](https://nathanmarz.com/blog/how-to-beat-the-cap-theorem.html).

Northstar's operations team wants a view of sales that updates quickly, while the analytical pipeline periodically rebuilds a corrected historical view.

{% include article-diagram.html image="/images/articles/data-lambda-architecture.svg" alt="The event log feeds historical batch recomputation and a speed layer. A serving view merges the published batch snapshot through frontier F with the non-overlapping stream tail after F." caption="The merge boundary must be explicit. Adding two independently computed totals can double-count the same events." height="520" %}

### Example: do not count the same sale twice

Suppose the published batch snapshot covers input-log positions through a documented frontier **F**. The speed result contributes only events beyond that frontier. When a new batch snapshot is published, advance the frontier and retire the now-covered speed contribution coherently.

In a partitioned log, the frontier can be a vector of offsets rather than a single number. An implementation must also handle corrections, deleted records, and whether its measures can actually be merged using the chosen operations.

A late refund may arrive today but refer to yesterday's order. Event time and arrival order are different. A naive “ignore everything with yesterday's timestamp” rule can lose that correction even though the event has not been processed by the batch snapshot.

Lambda's cost is maintaining and reconciling two paths. A streaming-first design, sometimes described as Kappa architecture, may instead reuse one processing path and replay retained events for recovery or recomputation. That still requires retention, versioning, and correct state handling. Pick the pattern around freshness and recovery requirements, not the name.

## Knowledge distillation: teach a smaller model

Knowledge distillation transfers useful behavior from a teacher model or ensemble to a student through training. In the classic formulation, softened teacher predictions provide information beyond a single hard label. It does not mean exporting a knowledge graph into a smaller file. [Hinton, Vinyals, and Dean's distillation paper](https://arxiv.org/abs/1503.02531).

Northstar's assistant initially uses a strong model to route questions into three categories: `sales_metric`, `supplier_relationship`, and `general_support`. The team considers a smaller student for this narrow routing task.

{% include article-diagram.html image="/images/articles/data-knowledge-distillation.svg" alt="A teacher provides reviewed supervision on training examples. A student learns from that supervision, is evaluated on held-out cases, and is deployed only if it meets the task's quality and operational requirements." caption="Distillation changes model parameters through training. Retrieval supplies external context at inference time; they solve different problems." height="440" %}

### Example: learn a routing boundary

For “How much did we sell by region?”, a teacher might assign probabilities across all three categories. Those probabilities can communicate uncertainty that a single class label hides. A student can learn from teacher supervision, task labels, or a combination, depending on the training method.

| Routing class | Illustrative teacher probability | Hard target |
| --- | --- | --- |
| `sales_metric` | 0.70 | 1 |
| `supplier_relationship` | 0.20 | 0 |
| `general_support` | 0.10 | 0 |

These made-up values illustrate the difference between a distribution and a single label; they are not predictions from a trained system.

If the teacher is accessed through an API that does not expose its full distributions, do not assume that classic logits-based distillation is available. Training on reviewed teacher-generated examples is another approach, with its own data and evaluation requirements.

A practical experiment would:

1. Define the routing taxonomy and representative requests.
2. Separate training, validation, and final evaluation data before generating supervision.
3. Review teacher outputs and remove examples that violate data-use requirements.
4. Train a student and compare it with the existing router on held-out requests.
5. Measure accuracy, category-specific failures, calibration, latency, and serving cost.
6. Keep a fallback path for ambiguous requests and monitor changing traffic.

A smaller model is not automatically better for a product. Evaluate its actual deployment characteristics and quality. Distillation may reproduce a teacher's errors or biases. It also does not keep the student synchronized with today's orders: fresh sales still come from an authorized data or metric service, not from the model's parameters.

## How the pieces fit in one product

One possible design for Northstar connects these responsibilities without treating them as one mandatory pipeline:

- Source events enter a retained ingestion layer and are refined into usable datasets.
- Dimensional facts support repeatable aggregation; the semantic layer exposes agreed metrics.
- A graph represents supplier and product connections using an agreed ontology.
- Domain teams own the data products, with shared platform services and governance.
- A low-latency path is added only where its freshness requirement justifies its operating cost.
- A distilled router may select a service, but does not replace that service's data or permissions.

{% include article-diagram.html image="/images/articles/data-architecture-map.svg" alt="A layered map connects source events to refined data, dimensional models, graph representations, shared metrics, and consuming applications. Ownership overlays the data products, and optional distillation supports an application router." caption="An illustrative composition. Processing stages, modeling choices, ownership, and model training are different design dimensions." height="650" %}

### Three questions, three execution paths

| User asks | Suitable path in this example | What must remain explicit |
| --- | --- | --- |
| “What were net sales by region?” | Authorized query against the semantic metric | Metric version, time policy, currency, access |
| “Which orders connect to supplier S-9?” | Graph traversal, optionally joined to analytical facts | Identity mapping, relation meaning, provenance |
| “Where should this request go?” | Evaluated router or a distilled classifier | Taxonomy, confidence, fallback, monitoring |

The assistant should describe its source and effective data time. A fast response based on a stale snapshot can still be wrong for a real-time question. A fluent explanation of a graph path can still overstate causality. Clear contracts matter at the boundary between each system and its consumer.

## What I would build first

For a small retail team, I would start with retained source data, a documented order-line model, a clear metric definition, and an owner for each important dataset. I would test a replay, a duplicate delivery, a refund, and a changed customer attribute before adding more architectural layers.

Then I would add capabilities in response to specific needs:

| Observed problem | Next capability to evaluate |
| --- | --- |
| Dashboards disagree about definitions | Semantic layer and metric contracts |
| Supplier relationships are difficult to query across sources | Governed entity mapping and a graph |
| Teams interpret the same relationship differently | A focused ontology and validation rules |
| A central team blocks domain changes | Domain-owned data products and platform support |
| A measured freshness requirement is unmet | A suitable incremental processing design |
| Model serving cost or latency is too high for a narrow task | A distillation experiment with quality gates |

Avoid conflating refinement stages with processing modes: bronze, silver, and gold do not have to map to batch, speed, and serving. Avoid equating a semantic layer with an ontology: a shared sales metric and a formal description of `Supplier` are related kinds of meaning, but distinct artifacts.

The design should make the next change easier to reason about. Identify the question, choose the smallest useful capability, and make its contract and ownership visible.

## The architecture field guide

Keep the distinctions together with this downloadable visual guide:

- <a href="{{ '/images/articles/data-architecture-field-guide.svg' | relative_url }}" download>Download the scalable SVG field guide</a>
- <a href="{{ '/images/articles/data-architecture-field-guide.png' | relative_url }}" download>Download the PNG field guide</a>

The cover is conceptual artwork. The diagrams and guide are original explanatory visuals for the fictional example, with the primary sources linked beside the relevant concepts.
