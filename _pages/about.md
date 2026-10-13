---
layout: portfolio-modern
permalink: /
title: "Tarash Agarwal — AI & Platform Engineer"
excerpt: "Tarash Agarwal — AI agents, persistent context, LangGraph, RAG, and platform engineering. Explore my projects and experience."
home: true
redirect_from:
  - /about/
  - /about.html
---
<section class="hero wrap">
<div class="hero-copy">
<p class="eyebrow"><span class="status-dot"></span> PERSONAL PORTFOLIO / BASED IN THE USA</p>
<h1 class="profile-name">Tarash<br><em>Agarwal.</em></h1>
<p class="profile-role">AI &amp; Platform Engineer</p>
<p class="current-employer"><span class="status-dot" aria-hidden="true"></span>HarmonEyes · Jan 2026–present</p>
<p class="profile-tagline">AI agents. Thoughtful code. Real impact.</p>
<p class="hero-description">I build conversational agents, retrieval-augmented experiences, and the full stack systems behind them — bringing together LangGraph, Python, React, and cloud infrastructure.</p>
<section class="hero-achievements" aria-labelledby="achievements-title">
<h2 id="achievements-title" class="eyebrow">SELECTED ACHIEVEMENTS</h2>
<ul class="achievement-grid">
<li><a href="{{ '/projects/' | relative_url }}#hr-agent"><strong>5 days</strong><span>To ship an AI hiring planner prototype</span><small>LangGraph · UIUC <span aria-hidden="true">↗</span></small></a></li>
<li><a href="{{ '/projects/' | relative_url }}#brokerlift"><strong>10 → 1</strong><span>Incident tickets reduced in one week</span><small>API reliability · Brokerlift <span aria-hidden="true">↗</span></small></a></li>
<li><a href="{{ '/projects/' | relative_url }}#acm"><strong>90%</strong><span>Reduction in sign-up time</span><small>Team leadership · ACM UIUC <span aria-hidden="true">↗</span></small></a></li>
</ul>
</section>
<div class="actions"><a class="button" href="{{ '/projects/' | relative_url }}">Explore my AI projects <span>↗</span></a><a class="text-link" href="{{ '/cv/' | relative_url }}">Meet the engineer <span>→</span></a></div>
</div>
<div class="profile-console">
<div class="profile-console-top"><span class="status-dot" aria-hidden="true"></span><span>PROFILE / TARASH AGARWAL</span><span class="console-coordinates" aria-hidden="true">01 — TA</span></div>
<div class="profile-image-stage">
<div class="profile-ring" aria-hidden="true"></div><div class="profile-ring profile-ring-inner" aria-hidden="true"></div>
<img class="hero-portrait" src="{{ '/images/profile.jpeg' | relative_url }}" alt="Tarash Agarwal" width="745" height="820" fetchpriority="high">
<div class="portrait-scan" aria-hidden="true"></div>
<span class="portrait-corner corner-tl" aria-hidden="true"></span><span class="portrait-corner corner-tr" aria-hidden="true"></span><span class="portrait-corner corner-bl" aria-hidden="true"></span><span class="portrait-corner corner-br" aria-hidden="true"></span>
</div>
<div class="profile-console-bottom"><span>AI AGENTS / RAG / PLATFORMS</span><span>UNITED STATES</span></div>
<div class="profile-system" aria-hidden="true"><span>CONTEXT</span><i>→</i><span>REASONING</span><i>→</i><span>ACTION</span></div>
</div>
</section>
<div class="stack-band"><div class="wrap"><span>MY TOOLKIT</span><b>LangGraph</b><i>✳</i><b>Python</b><i>✳</i><b>React</b><i>✳</i><b>RAG</b><i>✳</i><b>FAISS</b><i>✳</i><b>AWS</b></div></div>
<section class="wrap section" id="work"><div class="section-heading"><div><p class="eyebrow">01 / FEATURED AI PROJECTS</p><h2>From a conversation to something useful.</h2></div><a class="text-link" href="{{ '/projects/' | relative_url }}">All work <span>↗</span></a></div>
<div class="project-grid ai-project-grid">
{% for project in site.data.featured_projects %}
<a class="project-card" href="{{ '/projects/' | relative_url }}#{{ project.id }}">
<div class="project-visual {{ project.visual }}"><span class="visual-caption">{{ project.caption }}</span><div class="pipeline">{% for step in project.steps %}<span>{{ step.label }}<br><b aria-hidden="true">{{ step.symbol }}</b></span>{% unless forloop.last %}<i aria-hidden="true">→</i>{% endunless %}{% endfor %}</div><span class="visual-note">{{ project.note }}</span></div>
<div class="project-info"><span class="eyebrow">{{ project.eyebrow }}</span><h3>{{ project.title }} <span aria-hidden="true">↗</span></h3><p>{{ project.description }}</p><div class="tags">{% for tag in project.tags %}<span>{{ tag }}</span>{% endfor %}</div></div>
</a>{% endfor %}
</div></section>
<section class="about-section"><div class="wrap about-grid"><div class="portrait-composition"><img src="{{ '/images/profile.jpeg' | relative_url }}" alt="Tarash Agarwal" loading="lazy" width="420" height="460"><span class="portrait-note">Agent builder.<br>Systems thinker.</span><span class="portrait-star" aria-hidden="true">✳</span></div><div><p class="eyebrow">02 / THE PERSON BEHIND THE CODE</p><h2>AI engineering.<br><em>A full stack foundation.</em></h2><p>My work connects AI agents with practical software engineering: planning conversations, retrieving relevant context, managing session memory, and delivering useful outputs. I’ve been working at HarmonEyes since January 2026. My previous work includes a personalized communication AI MVP and its AWS infrastructure at ImpacterAI.</p><p>With master’s degrees in Technology Management from UIUC and Computer Science from Dalhousie, I bring both a product perspective and a technical foundation to my work — backed by experience at Brokerlift, IBM, and Voylla.</p><div class="expertise"><div><span>01</span><b>AI agents & retrieval</b><small>LangGraph, RAG, FAISS & persistent context</small></div><div><span>02</span><b>Full stack development</b><small>Python, React, Next.js, Node.js & TypeScript</small></div><div><span>03</span><b>Cloud & reliable delivery</b><small>AWS, Terraform, Docker & CI/CD</small></div></div><a class="text-link" href="{{ '/cv/' | relative_url }}">Explore my background →</a></div></div></section>
<section class="wrap section"><div class="section-heading"><div><p class="eyebrow">03 / NOTES & IDEAS</p><h2>Thinking out loud.</h2></div><a class="text-link" href="{{ '/year-archive/' | relative_url }}">All writing ↗</a></div><div class="writing-grid">{% for post in site.posts limit:3 %}<a class="writing-card" href="{{ post.url | relative_url }}"><span class="eyebrow">{{ post.date | date: '%b %d, %Y' }}</span><h3>{{ post.title }}</h3><p>{{ post.excerpt | strip_html | truncate: 130 }}</p><span class="text-link">Read the story ↗</span></a>{% endfor %}</div></section>
<section class="wrap contact-section"><div><p class="eyebrow">LET’S MAKE SOMETHING USEFUL</p><h2>A good conversation<br>can start <em>something great.</em></h2></div><a class="button" href="https://www.linkedin.com/in/tarash-agarwal/">Connect on LinkedIn ↗</a><span class="contact-star" aria-hidden="true">✳</span></section>
