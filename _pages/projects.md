---
layout: portfolio-modern
permalink: /projects/
title: "Agents, applications & impact."
kicker: "AI PROJECTS / ENGINEERING EXPERIENCE"
excerpt: "Conversational agents, persona-based retrieval, ML data collection, and the full stack systems that make them useful."
redirect_from:
  - /wordpress/projects/
---
<div class="work-entry" id="hr-agent" markdown="1">
<p class="eyebrow">01 / CONVERSATIONAL HR AI AGENT · UIUC</p>

## Turning hiring conversations into a plan

Built a **Hiring Planner AI Agent** that chats with HR to gather budget, skills, and timelines, then produces two job descriptions and a 10-step hiring checklist.

- Orchestrated the agent with **LangGraph**, using OpenAI function calls and session memory to carry context through the conversation.
- Built the web interface with Next.js/React and the agent backend with Flask, incorporating RAG, prompt engineering, and context engineering.
- Added LangGraph/LangChain tracing support to inspect agent execution.
- Shipped the prototype in five days as part of UIUC’s Information Systems Development & Management coursework.

<div class="impact-row"><div><strong>5 days</strong><small>To ship the prototype</small></div><div><strong>2 JDs</strong><small>Generated from the hiring brief</small></div><div><strong>10 steps</strong><small>In the hiring checklist</small></div></div>
<div class="tags"><span>LangGraph</span><span>OpenAI function calls</span><span>Flask</span><span>React</span><span>RAG</span><span>Session memory</span></div>

[Explore the project on GitHub ↗](https://github.com/tarashagarwal/hr-agentic-ai)
</div>
<div class="work-entry" id="toneweave" markdown="1">
<p class="eyebrow">02 / TONEWEAVE AI AGENT · PERSONA SIMULATION</p>

## Giving retrieval a distinct voice

Built a Gen-Z persona simulation agent that combines clustering, retrieval, and generation to create persona-specific reactions to input text.

- Clustered Blogger.com comments into **four personas using KMeans**.
- Built separate **FAISS indexes** for each persona.
- Matched new inputs to persona data using similarity scores, retrieving aligned emotions and traits.
- Passed retrieved emotional and sentiment attributes to **GPT-4.1-mini** through engineered prompts to generate tailored reactions.
- Presented **public reactions and internal thoughts side by side** in a Next.js dashboard.
- Enriched source text using GoEmotions/RoBERTa and XLNet sentiment signals, including a masking flag when emotion and sentiment diverge.

The repository reports **96,639 processed rows** and four discovered personas. This is a prototype with uneven cluster sizes and sampling limitations, rather than a representative model of all Gen-Z users.

<div class="tags"><span>Python</span><span>FAISS</span><span>KMeans</span><span>RAG</span><span>NLP</span><span>Prompt & context engineering</span></div>

[Explore the project on GitHub ↗](https://github.com/tarashagarwal/genz-persona-simulation)
</div>
<div class="work-entry" id="intelli-scraper" markdown="1">
<p class="eyebrow">03 / INTELLI-SCRAPER · ML DATA COLLECTION</p>

## Reaching the content standard crawlers miss

Built a specialized crawler to extract hidden and event-triggered links from SEO-unfriendly websites, supporting the collection of dynamic, non-indexed content for machine learning datasets.

- Implemented **multi-worker concurrency** to process content efficiently.
- Added filtering options and quick/stealth modes.
- Used Python, Flask, Playwright, Tailwind CSS, and HTML2Text to crawl, extract, and present the collected data.

<div class="tags"><span>Python</span><span>Playwright</span><span>Flask</span><span>HTML2Text</span><span>Concurrent crawling</span></div>

[Explore the project on GitHub ↗](https://github.com/tarashagarwal/intelli-scaper)
</div>
<div class="work-entry" id="mnemosyne" markdown="1">
<p class="eyebrow">04 / MNEMOSYNE MCP · AI KNOWLEDGE & MEMORY</p>

## Context that can outlast a conversation

An evolving knowledge and memory project for AI systems, organized around Apache Airflow pipelines for document and web-data ingestion, enrichment, and persistent storage.

- Separates orchestration from document processing and storage concerns.
- Organizes an architecture for cleaning, chunking, embeddings, and metadata enrichment.
- Targets a shared knowledge layer so AI clients and agents can retrieve consistent context over time.

The README describes the query/API layer as future work; the project is presented here as an evolving architecture.

<div class="tags"><span>Python</span><span>Apache Airflow</span><span>AI memory</span><span>Ingestion pipelines</span><span>MCP</span></div>

[Explore the project on GitHub ↗](https://github.com/tarashagarwal/mnemosyne-mcp)
</div>
<div class="work-entry" id="impacter-ai" markdown="1">
<p class="eyebrow">05 / IMPACTERAI · PERSONALIZED COMMUNICATION</p>

## AI messaging, backed by cloud infrastructure

**AI Intern · San Francisco, USA · September 2025–present**

Contribute to a personalized communication AI MVP that profiles customers for tailored messaging. Work spans the Flask/Next.js application, enhancements to AWS-hosted infrastructure, and deployment orchestration with Terraform.

<div class="tags"><span>Flask</span><span>Next.js</span><span>AWS</span><span>Terraform</span><span>Personalized AI</span></div>
</div>
<div class="work-entry" id="brokerlift" markdown="1">
<p class="eyebrow">06 / BROKERLIFT · APPLICATION RELIABILITY</p>

## Fewer incidents. More confidence in releases.

**Software Developer · Toronto, Canada · May 2023–August 2024**

Implemented optimistic locking across 10+ Node.js APIs, added 100+ Cypress tests, and automated Gmail token refresh for BDD tests through Python jobs in Jenkins.

<div class="impact-row"><div><strong>10 → 1</strong><small>Incident tickets in one week</small></div><div><strong>~85%</strong><small>Test coverage from a zero-test baseline</small></div><div><strong>50%</strong><small>Fewer post-deployment bugs</small></div></div>
<div class="tags"><span>Node.js</span><span>Cypress</span><span>Python</span><span>Jenkins</span><span>Optimistic locking</span></div>
</div>
<div class="work-entry" id="automation" markdown="1">
<p class="eyebrow">07 / IBM · SYSTEMS & AUTOMATION</p>

## Improving the systems behind the application

**Software Developer · Bangalore, India · January 2020–December 2021**

- Built React account switching with a floating dialog and cookie updates, reducing login steps by 70% and time by 80% in ten days.
- Optimized 10+ PostgreSQL queries to trim average API runtime by 3–4%.
- Migrated Ansible-run installation scripts from Bash to Python, reducing installation time by approximately 10%.
- Delivered a custom Ubuntu Docker image for Python scripts to resolve Red Hat compatibility issues in 24 hours.
- Adjusted Kafka partitions, brokers, and replication to address consumer mismatches and reduce lag.

<div class="tags"><span>React</span><span>Python</span><span>PostgreSQL</span><span>Ansible</span><span>Docker</span><span>Kafka</span></div>
</div>
<div class="work-entry" id="commerce" markdown="1">
<p class="eyebrow">08 / VOYLLA · MARKETPLACE & MESSAGING</p>

## Scaling commerce from cart to marketplace

**Senior Software Engineer · Jaipur, India · May 2017–December 2019**

- Rebuilt pipelines, migrated 50+ APIs, and updated AWS infrastructure to deliver a multi-vendor marketplace in six months.
- Designed the first Django microservice to decentralize notifications, reducing average order completion time by 3–4%.
- Parallelized odd/even image batches with Python, halving build time and doubling throughput to 600 images per day.
- Built an SNS/SQS notification system delivering 50,000 messages per day across SMS and WhatsApp.

Resolved a JavaScript `includes()` compatibility issue on UC Browser with `indexOf()`, restoring layouts for the affected 8–10% of mobile users. Also stabilized React asset precompilation through parallel batching to prevent memory overload.

<div class="tags"><span>Python</span><span>Django</span><span>AWS</span><span>SNS / SQS</span><span>React</span><span>JavaScript</span></div>
</div>
<div class="work-entry" id="acm" markdown="1">
<p class="eyebrow">09 / ACM UIUC · INFRASTRUCTURE LEADERSHIP</p>

## Shared infrastructure for a student community

Led Infrastructure & Core API within a team of 10 developers. Working with five developers, integrated a link shortener into ACM core in four months, migrating SQLite to DynamoDB and rebuilding the React/Node.js stack.

Also built a SIGLead Management System in four months with five developers, integrating Azure AD and centralizing workflows to cut sign-up time by 90%.

<div class="tags"><span>React</span><span>Node.js</span><span>DynamoDB</span><span>Azure AD</span><span>Team leadership</span></div>

[Explore ACM core on GitHub ↗](https://github.com/acm-uiuc/core)
</div>
<div class="work-entry" id="halifax-foodie" markdown="1">
<p class="eyebrow">10 / HALIFAX FOODIE · SERVERLESS CLOUD</p>

## A food delivery platform without managed servers

Led a team of four to design and deploy a fully serverless food delivery platform in one month for Dalhousie’s Serverless Data Processing course.

Built user management, support chat, NLP feedback analysis, and real-time data visualization with AWS Lambda, S3, DynamoDB, Cognito, and Comprehend alongside GCP Firestore, Pub/Sub, Data Studio, Cloud Run, BigQuery, and Firebase.

<div class="tags"><span>AWS</span><span>GCP</span><span>Firebase</span><span>Serverless</span><span>NLP</span></div>

[Explore the project on GitHub ↗](https://github.com/tarashagarwal/halifax-foodie-serverless)
</div>
<div class="work-entry" id="plagiarism" markdown="1">
<p class="eyebrow">11 / PLAGIARISM CHECK SYSTEM · CLOUD AUTOMATION</p>

## From document upload to detection report

Built an automated plagiarism detection system using AWS CloudFormation, S3, SQS, SNS, Lambda, and EC2. A Python pipeline with boto3 and copydetect processes uploaded documents, generates reports, and sends notifications.

<div class="tags"><span>Python</span><span>CloudFormation</span><span>Lambda</span><span>S3</span><span>SNS / SQS</span><span>EC2</span></div>

[Explore the project on GitHub ↗](https://github.com/tarashagarwal/Plagiarism-Check-System-Network)
</div>
