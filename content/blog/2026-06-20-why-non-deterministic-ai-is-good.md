+++
title = "Why non-deterministic AI is a feature, not a bug"
description = "Same prompt, different answer. That unpredictability is what makes generative AI useful."
draft = true
[taxonomies]
tags = [ "ai", "engineering", "mindset" ]
[extra]
subtitle = "Randomness is the cost of creativity"
static_thumbnail = "/images/blog/placeholder.jpg"
series = "ai"
series_order = 7
related_posts = [
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
  "blog/2026-03-01-idealism-vs-pragmatism.md",
]
+++

![cover](/images/blog/placeholder.jpg)

I ran the same prompt twice and got two different answers. My first instinct was to call it broken. It took me a while to realize the opposite: that difference is where most of the value lives.

<!-- more -->

> Non-determinism is the price of creativity, and it is worth paying.

## The instinct to expect determinism

As programmers, we are trained to trust repeatability. Same input, same output. Flaky tests fail. Non-reproducible builds fail. So when an LLM phrases things differently on the second call, the reflex is to call it a bug.

It is not. It is the shape of the tool.

> If you wanted a lookup table, you would have built one.

## Creativity needs a roll of the dice

A model that always picks the most likely next token produces flat, repetitive text. Sampling adds randomness, and that randomness is what lets the model explore plausible completions. Drop the temperature to zero and you trade range for reliability.

Ask yourself: do you want a tool that always gives you the same answer, or one that can surprise you in a useful way?

## Non-determinism as a search

When I run the same prompt three times, I get three angles on the problem. Three ways to structure a function. Three tones. Three framings. That is not noise. It is cheap parallel exploration.

A deterministic model hands me one option. A non-deterministic one hands me a distribution to pick from.

> My workflow stopped being "ask and accept" and became "sample and choose."

## Where it hurts, and what to do

Non-determinism breaks tasks with a single right answer: math, extraction, strict formatting, tool calls. The fix is not to fight it, but to constrain it.

- Low temperature.
- Structured outputs and schemas.
- Retries with validation.
- Evals instead of assertions.

Know which parts of your pipeline need control and which benefit from variance.

## Context is how you steer the dice

If the output is a distribution, my job is to shape it. I cannot pick the seed, but I can pick the setup. In agentic coding, the outcome depends less on the model and more on what the model sees: `CLAUDE.md`, project conventions, skills, slash commands, templates, examples, wired-up tools, guardrails in `settings.json`.

Loose setup, wide noisy distribution. Tight setup, narrow distribution centered on what "good" looks like in this repo. Same randomness, better samples.

> I am not removing non-determinism. I am making every roll land inside the target.

This is why I keep investing in the `.claude/` folder, in style guides, in memory files, in well-scoped skills. The returns compound.

## Stop treating AI like a function

A function has one output per input. A collaborator gives me a different draft each morning. An LLM is the second. Judging it by the rules of the first is how teams end up blocked on "reproducibility," chasing seeds they will never need.

Embrace variance where it helps. Constrain it where it hurts. That is the whole game.
