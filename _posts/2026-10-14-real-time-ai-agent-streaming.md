---
layout: portfolio-modern
article: true
title: "How do we stream an AI agent in real time?"
date: 2026-10-14
updated: 2026-10-14
excerpt: "A product and engineering case study of streaming, buffering, latency, and the guardrails between an AI agent and its users."
summary: "Streaming can make an agent feel faster, but every published chunk is already disclosed. Separate the model’s generation stream from your application’s publication policy: review a complete answer, release reviewed units, or explicitly accept provisional output. Deleting a message afterward does not undo exposure."
kicker: "PRODUCT & ENGINEERING / AI AGENTS"
cover_image: /images/articles/ai-streaming-cover.svg
permalink: /posts/2026/10/real-time-ai-agent-streaming/
tags: [AI agents, streaming, OpenAI API, guardrails, product design, LangChain]
sections:
  - id: the-product-problem
    title: "The product problem"
  - id: two-api-modes-three-delivery-policies
    title: "Modes vs delivery policies"
  - id: where-the-guardrail-runs
    title: "The guardrail boundary"
  - id: why-delete-it-later-is-not-prevention
    title: "Why deletion is too late"
  - id: a-practical-publication-gate
    title: "A publication gate"
  - id: measure-what-the-user-experiences
    title: "Latency and evaluation"
  - id: the-product-decision
    title: "The product decision"
  - id: posters-to-keep
    title: "Download the posters"
---
{% include article-diagram.html image="/images/articles/ai-streaming-cover.svg" alt="Real-time AI agents: speed, control, and the moment an answer becomes visible. A visual cover by Tarash Agarwal, dated October 14, 2026." caption="A product and engineering case study. The scenario and timings below are illustrative, not results from a production deployment." height="506" %}

## The product problem

A user asks an AI agent a question. The agent retrieves context, calls an LLM API, and begins composing an answer. The model may already be producing text while the user still sees a loading indicator.

As a product team, we have two goals: show useful progress quickly and enforce the application’s output policy. The tension appears when the fastest route to the screen is also the route that publishes text before we have reviewed the complete answer.

Consider an **illustrative internal knowledge assistant**. It answers from company documents. Users want a conversational experience; the product must respect document permissions and avoid exposing restricted information. This is a design case study, not a claim about a system I deployed or a measured improvement at an employer.

The central question is: **when does generated text become approved, user-visible content?**

## Two API modes, three delivery policies

For an interactive request, distinguish **non-streaming** from **streaming**. In OpenAI’s Responses API, `stream=True` enables incremental server-sent events, including text deltas such as `response.output_text.delta`. Non-streaming returns the generated response together. A delta is a transport update, not necessarily a complete sentence or a meaningful policy-review unit. [OpenAI streaming guide](https://developers.openai.com/api/docs/guides/streaming-responses).

Do not call non-streaming “Batch mode.” The **Batch API** is a separate asynchronous service for collections of requests, such as offline evaluations or classification. It is not the alternative delivery setting for a live chat turn. [OpenAI Batch API](https://developers.openai.com/api/docs/guides/batch).

There are also **two different connections**: the model provider to your backend, and your backend to the user. Streaming the first does not require streaming raw output over the second.

| Application delivery policy | What the backend does | What the user sees |
| --- | --- | --- |
| Full-answer review | Collects the answer, checks it, then publishes or substitutes a response | Progress first; answer after review |
| Direct, provisional streaming | Forwards text as it arrives; checks may finish later | Earliest generated text, with exposure risk |
| Reviewed-unit streaming | Holds a sentence, paragraph, or other unit; checks before releasing it | Incremental reviewed units, with added delay |

All three can receive a provider stream. A backend can buffer that entire stream and still publish one final answer. If you use an orchestration framework such as LangChain, its stream should enter this same publication decision; framework events should not automatically become browser messages.

{% include article-diagram.html image="/images/articles/ai-streaming-delivery-paths.svg" alt="An LLM stream reaches a backend with three publication choices: full-answer review before display, direct forwarding before final review, or reviewed-unit buffering before incremental display." caption="Separate generation from publication. The same upstream model stream can support three different user experiences." height="620" %}

## Where the guardrail runs

With full-answer review, the application holds the draft privately. It checks the complete answer against the product’s policies, then releases the answer, regenerates it, or sends an application-owned fallback. The trade-off is a longer wait for substantive answer text.

With direct streaming, publishing and reviewing can overlap. If a review rejects the answer after publication starts, the app can stop later chunks, but the earlier ones have already crossed the disclosure boundary.

OpenAI notes that partial completions are harder to moderate. Its documented inline output moderation scores arrive after the generated output is complete, rather than with each text delta. Enabling that feature alone does not establish a per-chunk publication gate. [OpenAI moderation guide](https://developers.openai.com/api/docs/guides/moderation).

An application guardrail can combine several checks. A content classifier is one signal; it does not by itself verify a user’s entitlement to a document, detect every secret, validate a business rule, or authorize a tool action. Guardrails need evaluation and failure handling. A full-answer gate also only blocks the violations its checks actually detect.

For the knowledge assistant, check retrieval permissions **before** placing documents in the model context. Output review is another layer, rather than a replacement for access control. OpenAI recommends testing safety behavior and using appropriate oversight in production applications. [Safety best practices](https://developers.openai.com/api/docs/guides/safety-best-practices).

## Why delete it later is not prevention

Suppose the browser displays a fragment containing restricted information. A later policy verdict causes the app to remove the message and show “This answer could not be displayed.”

That may limit continued viewing, but the user might already have read it, copied it, heard it through a screen reader, or captured it. A browser may also have received the data even if the UI never rendered it. **Hiding or deleting a message cannot undo disclosure.**

The same applies to labels such as “unverified” or “provisional.” They can describe the state of an answer; they do not prevent the exposure of its contents.

For a requirement such as “restricted text must not reach an unauthorized client,” the check must run before that text is sent. Do not put unapproved text in a hidden element, browser-side buffer, or client event and treat it as withheld.

{% include article-diagram.html image="/images/articles/ai-streaming-disclosure-boundary.svg" alt="Preventive flow: private draft, policy review, release to browser. Reactive flow: send draft to browser, user sees it, later reject and remove it. Removal does not reverse the original disclosure." caption="A correction event changes the UI state. It does not reverse the earlier transfer of information." height="440" %}

## A practical publication gate

A middle path is to receive the provider stream on the server while holding a meaningful unit before release. The application reviews that unit with enough context, then sends only approved text to the client.

This is a **design pattern, not a guarantee of full-answer policy compliance**. A policy violation can span units, or only become apparent in the final answer. Reviewing each fragment independently misses those relationships. Increasing the look-ahead or checking the accumulated prefix helps some policies but cannot predict every future continuation. When a policy depends on the complete answer, hold that answer until its check finishes.

A framework-neutral sketch makes the ordering explicit:

```text
send application-owned status: "Preparing your answer"

for each user-facing text delta from the provider:
    append delta to a private server-side buffer
    if a meaningful review unit is ready:
        review unit with the conversation and released prefix
        if review is blocked, uncertain, or unavailable:
            cancel generation, discard withheld text, stop release
        otherwise:
            send the approved unit, then remove it from the buffer

on confirmed successful generation completion:
    review and release the remaining unit under the same policy
    perform any required full-answer checks
    mark complete only if the applicable checks pass
```

This is explanatory pseudocode, not a complete implementation. Bound the buffer and review backlog; if review cannot keep up, apply backpressure or stop rather than forwarding unchecked text. Treat incomplete generation, transport failures, and review timeouts as explicit states. If a final check fails after earlier units were published, handle it as a correction and an exposure event, not as proof that nothing escaped.

Keep the API key and publication gate on a trusted server. Only forward intended answer text and application-owned progress. Do not proxy every agent event, private tool result, or internal trace to the browser. Validate tool arguments and permissions before executing actions; a text guardrail cannot undo an already executed tool call.

Useful application-level events might be `status`, `approved_text`, `blocked`, `failed`, and `complete`. These are your protocol, not provider event names. Render text safely, define reconnect behavior, and propagate user cancellation upstream.

## Measure what the user experiences

A stream can reduce the wait for visible content without making generation itself faster. OpenAI’s latency guidance treats streaming as a way to improve the experience while other latency work addresses model choice, output length, and system architecture. [Latency optimization](https://developers.openai.com/api/docs/guides/latency-optimization).

Be precise about “time to first byte.” The first HTTP headers or a status heartbeat may arrive before any model text. Measure at least:

- **First acknowledgement:** when the app confirms the request is active.
- **First upstream text:** when the backend receives the first model delta.
- **First visible answer text:** when the user can read substantive content.
- **First approved answer text:** when content has passed the chosen publication check.
- **Completion:** when generation and required checks have finished.

Here is a hypothetical timeline, with retrieval and networking simplified. It illustrates the delivery choice; it is not an API benchmark:

| Milestone | Illustrative elapsed time |
| --- | --- |
| First upstream text | 0.8 seconds |
| First meaningful unit ready | 1.2 seconds |
| First unit review finishes | 1.4 seconds |
| Generation finishes | 4.0 seconds |
| Full-answer review finishes | 4.2 seconds |

A direct stream could show text at 0.8 seconds. Reviewed-unit delivery could start at 1.4 seconds. Full-answer review would publish at 4.2 seconds. All three could send an earlier application-owned acknowledgement.

{% include article-diagram.html image="/images/articles/ai-streaming-latency.svg" alt="Hypothetical timeline: direct text visible at 0.8 seconds, first reviewed unit at 1.4 seconds, and full-answer publication after review at 4.2 seconds. Earlier acknowledgements are distinct from answer text." caption="Illustrative timings only. The gap between first upstream text and first approved publication is part of the product’s latency budget." height="440" %}

Evaluate each delivery policy on the same representative tasks. Compare latency distributions, inappropriate content actually delivered, false blocks, interruptions, and completed tasks. Include test cases where sensitive strings split across updates, an initially acceptable passage changes meaning later, the review service times out, or the user cancels mid-answer. A low first-byte number is insufficient if the app leaks data or frequently replaces answers.

## The product decision

For the illustrative knowledge assistant, I would use full-answer review where the response requires complete-context checks, and server-side reviewed-unit delivery only for workflows whose policies permit incremental disclosure. I would still send truthful progress messages during retrieval and generation.

Direct provisional streaming is a conscious product choice for contexts that tolerate it. It should not be described as enforcing “no exposure before approval” if the check runs after publication. Reviewed-unit streaming should not make that full-answer promise either.

The engineering decision is where the publication boundary sits, what evidence allows text to cross it, and how the system behaves when that evidence is missing. Design those rules alongside the product experience, then evaluate them together.

## Posters to keep

The visual summary is available as two downloadable posters. Choose SVG for scalable, selectable text, or PNG for sharing as an image.

- Landscape article poster: <a href="{{ '/images/articles/ai-streaming-cover.svg' | relative_url }}" download>SVG</a> · <a href="{{ '/images/articles/ai-streaming-cover.png' | relative_url }}" download>PNG</a>
- Portrait decision poster: <a href="{{ '/images/articles/ai-streaming-decision-poster.svg' | relative_url }}" download>SVG</a> · <a href="{{ '/images/articles/ai-streaming-decision-poster.png' | relative_url }}" download>PNG</a>

{% include article-diagram.html image="/images/articles/ai-streaming-decision-poster.svg" alt="Poster summarizing the publication choices for real-time AI agents: review the full answer, release reviewed units, or accept provisional output. Key message: once text reaches the user, deleting it does not undo exposure." caption="Keep the boundary visible: fast feedback, deliberate publication, and an honest statement of what each guardrail can check." height="1125" %}
