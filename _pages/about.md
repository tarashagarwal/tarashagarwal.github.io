---
layout: portfolio-modern
permalink: /
title: "Tarash Agarwal — AI, Platform & Full Stack"
excerpt: "Tarash Agarwal — AI engineering, platform engineering, and full stack development. Agents, cloud systems, interfaces, and APIs."
home: true
redirect_from:
  - /about/
  - /about.html
---
<section class="hero wrap">
<div class="hero-copy">
<p class="eyebrow"><span class="status-dot"></span> TARASH AGARWAL · BASED IN THE USA</p>
<h1 class="profile-name">Tarash<br><em>Agarwal.</em></h1>
<p class="profile-role">AI · Platform · Full Stack</p>
<p class="current-employer"><span class="status-dot" aria-hidden="true"></span>HarmonEyes · Jan 2026–present</p>
<p class="hero-description">I build AI agents, the platforms they run on, and the interfaces people use. My work spans retrieval and context engineering, cloud infrastructure, and full stack applications.</p>

<div class="actions"><a class="button" href="{{ '/projects/' | relative_url }}">Explore my work <span>↗</span></a><a class="text-link" href="{{ '/cv/' | relative_url }}">Meet the engineer <span>→</span></a></div>
</div>
<div class="profile-console">
<div class="profile-console-top"><span class="status-dot" aria-hidden="true"></span><span>Tarash Agarwal</span></div>
<div class="profile-image-stage">
<div class="profile-ring" aria-hidden="true"></div><div class="profile-ring profile-ring-inner" aria-hidden="true"></div>
<img class="hero-portrait" src="{{ '/images/profile.jpeg' | relative_url }}" alt="Tarash Agarwal" width="745" height="820" fetchpriority="high">
<div class="portrait-scan" aria-hidden="true"></div>
<span class="portrait-corner corner-tl" aria-hidden="true"></span><span class="portrait-corner corner-tr" aria-hidden="true"></span><span class="portrait-corner corner-bl" aria-hidden="true"></span><span class="portrait-corner corner-br" aria-hidden="true"></span>
</div>
<div class="profile-console-bottom"><span>AI / PLATFORM / FULL STACK</span><span>UNITED STATES</span></div>

</div>
</section>

<section class="hero-achievements wrap" aria-labelledby="achievements-title">
<h2 id="achievements-title" class="eyebrow">SELECTED ACHIEVEMENTS</h2>
<ul class="achievement-grid">
<li><a href="{{ '/projects/' | relative_url }}#hr-agent"><strong>5 days</strong><span>To ship an AI hiring planner prototype</span><small>LangGraph · UIUC <span aria-hidden="true">↗</span></small></a></li>
<li><a href="{{ '/projects/' | relative_url }}#brokerlift"><strong>10 → 1</strong><span>Incident tickets reduced in one week</span><small>API reliability · Brokerlift <span aria-hidden="true">↗</span></small></a></li>
<li><a href="{{ '/projects/' | relative_url }}#acm"><strong>90%</strong><span>Reduction in sign-up time</span><small>Team leadership · ACM UIUC <span aria-hidden="true">↗</span></small></a></li>
</ul>
</section>
<section class="wrap focus-section" aria-labelledby="focus-title">
<div class="section-heading"><div><p class="eyebrow">WHAT I BUILD</p><h2 id="focus-title">Three strengths. One connected approach.</h2></div></div>
<div class="focus-grid">{% for focus in site.data.expertise %}<a class="focus-card" href="#{{ focus.id }}-work"><span class="focus-number" aria-hidden="true">0{{ forloop.index }}</span><h3>{{ focus.title }}</h3><p>{{ focus.description }}</p><span class="focus-technologies">{{ focus.technologies }}</span><span class="focus-link">Explore work <span aria-hidden="true">↗</span></span></a>{% endfor %}</div>
</section>
<section class="wrap section work-section" id="work" aria-labelledby="work-title">
<div class="section-heading"><div><p class="eyebrow">SELECTED WORK</p><h2 id="work-title">From AI ideas to working systems.</h2></div><a class="text-link" href="{{ '/projects/' | relative_url }}">All projects & experience ↗</a></div>
{% for focus in site.data.expertise %}
<div class="work-group" id="{{ focus.id }}-work"><div class="work-group-heading"><h3>{{ focus.title }}</h3><p>{{ focus.description }}</p></div><div class="project-grid ai-project-grid">
{% assign projects = site.data.featured_projects | where: 'focus', focus.id %}
{% for project in projects %}
<a class="project-card" href="{{ '/projects/' | relative_url }}#{{ project.id }}">
<div class="project-visual {{ project.visual }}"><span class="visual-caption">{{ project.caption }}</span><div class="pipeline">{% for step in project.steps %}<span>{{ step.label }}<br><b aria-hidden="true">{{ step.symbol }}</b></span>{% unless forloop.last %}<i aria-hidden="true">→</i>{% endunless %}{% endfor %}</div><span class="visual-note">{{ project.note }}</span></div>
<div class="project-info"><span class="eyebrow">{{ project.eyebrow }}</span><h3>{{ project.title }} <span aria-hidden="true">↗</span></h3><p>{{ project.description }}</p><div class="tags">{% for tag in project.tags %}<span>{{ tag }}</span>{% endfor %}</div></div>
</a>{% endfor %}</div></div>{% endfor %}
</section>
<section class="about-section"><div class="wrap about-grid"><div class="background-card"><p class="eyebrow">EDUCATION & LEADERSHIP</p><h3>A technical foundation.<br>A product perspective.</h3><dl><div><dt>UIUC · Gies College of Business</dt><dd>Master’s in Technology Management · 2025</dd></div><div><dt>Dalhousie University</dt><dd>Master’s in Computer Science · 2023</dd></div><div><dt>ACM at UIUC</dt><dd>Infrastructure & Core API Lead</dd></div></dl><a class="text-link" href="{{ '/cv/' | relative_url }}">Full background ↗</a></div><div><p class="eyebrow">BACKGROUND</p><h2>From prototype<br><em>to practical software.</em></h2><p>My work connects AI agents with practical software engineering: planning conversations, retrieving relevant context, managing session memory, and delivering useful outputs. I’ve been working at HarmonEyes since January 2026. My previous work includes a personalized communication AI MVP and its AWS infrastructure at ImpacterAI.</p><p>With master’s degrees in Technology Management from UIUC and Computer Science from Dalhousie, I bring both a product perspective and a technical foundation to my work — backed by experience at Brokerlift, IBM, and Voylla.</p><div class="expertise"><div><span>01</span><b>AI agents & retrieval</b><small>LangGraph, RAG, FAISS & persistent context</small></div><div><span>02</span><b>Full stack development</b><small>Python, React, Next.js, Node.js & TypeScript</small></div><div><span>03</span><b>Cloud & reliable delivery</b><small>AWS, Terraform, Docker & CI/CD</small></div></div><a class="text-link" href="{{ '/cv/' | relative_url }}">Explore my background →</a></div></div></section>
<section class="wrap section"><div class="section-heading"><div><p class="eyebrow">WRITING</p><h2>Thinking out loud.</h2></div><a class="text-link" href="{{ '/year-archive/' | relative_url }}">All writing ↗</a></div><div class="writing-grid">{% for post in site.posts limit:3 %}<a class="writing-card" href="{{ post.url | relative_url }}"><span class="eyebrow">{{ post.date | date: '%b %d, %Y' }}</span><h3>{{ post.title }}</h3><p>{{ post.excerpt | strip_html | truncate: 130 }}</p><span class="text-link">Read the story ↗</span></a>{% endfor %}</div></section>
<section class="wrap contact-section"><div><p class="eyebrow">LET’S MAKE SOMETHING USEFUL</p><h2>Let’s build<br><em>something useful.</em></h2></div><a class="button" href="https://www.linkedin.com/in/tarash-agarwal/">Connect on LinkedIn ↗</a><span class="contact-star" aria-hidden="true">✳</span></section>
