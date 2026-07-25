+++
title = "The Levels of AI Adoption"
description = "A six-level ladder of AI adoption, from copy-paste prompts to agentic teams and AI-native workflows. Where most companies stall, and how to climb."
draft = false
[taxonomies]
tags = [ "ai", "software", "leadership", "craftsmanship", "productivity", "developer-tools" ]
[extra]
subtitle = "From copy-paste prompts to agentic teams"
static_thumbnail = "/images/blog/2026-05-01/cover.jpg"
series = "ai"
series_order = 6
related_posts = [
  "blog/2026-04-17-inside-the-claude-folder.md",
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
    "readings/2018-06-04-clean-architecture.md",
    "readings/2020-03-05-extreme-programming-explained.md",
]
+++

Most companies use AI today, but few know where they stand on the AI adoption ladder. At one end, you paste code into ChatGPT. At the other, agents open PRs while you sleep. Beyond that, AI reaches people who never touched a terminal. This post maps the path.

<!-- more -->

## Where we started

Using AI to code meant a second tab. Write a function, get stuck, paste the error into chat, paste the answer back, and hope it works. It was slow, messy, and disconnected from your code.

[GitHub Copilot](https://github.com/features/copilot), built on OpenAI's early Codex, added suggestions inside the editor, often confidently wrong. It was trained on public code, and most public code isn't great. It also knew nothing about *your* domain, *your* conventions, *your* architecture. It was autocomplete that sometimes guessed right.

> The first generation of AI coding tools gave you a parrot trained on the whole internet. Fluent, confident, and often saying things that made no sense in your codebase.

This was *vibe-coding* in its first form: you gave the vibe by pasting context, and the AI filled in code that looked right. It compiled often enough to feel useful, and broke often enough to feel dangerous.

## The IDE generation

The next step was obvious: if the AI needs context, give it the whole editor.

[Cursor](https://cursor.com), [Windsurf](https://windsurf.com), and similar IDEs moved the model inside your coding flow. The assistant could read files, follow imports, and see more than one function at a time. Vibe-coding became a conversation with your project, and productivity jumped. For a moment, it felt like the endgame.

It wasn't. Editing files is only part of the job. The rest is running tests, reading logs, opening branches, reviewing diffs, and understanding what the codebase already does. Editor-only assistants helped you type faster, but they couldn't take a task from *"fix this bug"* to *"PR ready for review."*

## The agentic shift

OpenAI launched [Codex](https://openai.com/index/introducing-codex/) as a cloud agent: give it a task, it works on a branch, and you come back to a PR. Anthropic shipped [Claude Code](https://claude.com/product/claude-code), a CLI agent in your terminal, on your repo, with your tools.

This was the big shift, and not because the models were smarter. The unit of work changed. You stopped prompting line by line and started delegating tasks: read the ticket, write the change, run the tests, explain what you did. An agent doesn't need hand-holding. It needs a goal and the right context.

> The jump from assistant to agent is not a speed improvement. It's a change of job description. You move from typing code to directing work.

Claude Code needs almost no setup. No editor lock-in. Point it at your repo, drop a `.claude` folder with rules and conventions, and it adapts. I covered that in [Inside the .claude Folder](https://chemaclass.com/blog/inside-the-claude-folder/).

The model you pick matters more than before. Today's frontier models are way ahead of where they were a year ago. The gap between *"can draft a function"* and *"can refactor a module with judgment"* closed faster than expected, and it keeps closing as Claude, Codex, and Gemini push each other forward every month. Prices are getting closer too, which is a polite way of saying everyone copies whoever figures out the sustainable version first.

## Agents with their own home

The next leap wasn't smarter models, it was agents with their own machine.

[OpenClaw](https://openclaw.ai) is the clearest example. It's an open-source gateway you run on your own hardware (Mac Mini, old laptop, VPS), an always-on agent connected to your messaging apps, files, and calendar. You bring your own brain: Opus, GPT, or a local model via [Ollama](https://ollama.com). When a provider tightens limits or raises prices, you switch. You own the setup.

A coding agent lives inside one repo for a task. An OpenClaw-style agent lives in *your life*, across days and tools. [Sauron](https://sauronbot.github.io/about/) is mine. It reviews my PRs, opens issues, drafts code, ships open source contributions, and pushes back when I'm about to tunnel on something. Anything I can do on a computer, it can do too, just faster. It stops being a tool you open and becomes a place you work in.

> A coding agent is a coworker you invite to a task. A gateway agent is a coworker who lives on a machine and shows up every day.

Providers change their plans and limits faster than anyone tracks, so people build setups that aren't tied to one vendor. The logo on the model matters less every quarter, and the architecture around it matters more.

## AI beyond developers

AI coding was the loudest story because developers are loud. The bigger story is agentic tools reaching people who never wrote a line of code.

[ChatGPT agent mode](https://openai.com/index/introducing-chatgpt-agent/) and [Claude's Cowork](https://claude.com/product/cowork) are the obvious examples: an AI that reads your documents, fills your spreadsheets, drafts your slides, and runs code for you in the background. [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs) launched on April 17 and [dropped Figma's stock over 7% on launch day](https://sherwood.news/tech/anthropic-launches-claude-design-sending-shares-of-figma-down/). The pitch is simple: describe what you want, get a working prototype, hand it to Claude Code to ship. A workflow that used to need a designer, a PM, a frontend engineer, and three review rounds is squeezed into one conversation.

Lovable, v0, Canva, and Figma itself are all under pressure to rethink their positioning. Whether Claude Design "kills" any of them is the wrong question. The right one is what happens when making a usable prototype drops from *"hire a designer"* to *"describe it out loud."*

The companies feeling this first aren't the design tools. They're the small businesses that couldn't afford design work, the founders building a pitch deck at midnight, the PMs testing an idea before booking a meeting. There's a minority of cases where someone would have paid a designer and now won't, and that cost is real. But in most of them, AI didn't replace anyone: it filled a space where no designer was ever going to exist.

![Small library with wooden bookshelves and stacks of books](/images/blog/2026-05-01/middle.jpg)

## The levels of AI adoption

Every company I talk to sits somewhere on this ladder. The levels aren't about how much you pay in licenses, but about how deeply AI is built into the way work gets done, and not just in engineering.

### Level 0: Denial

*A company-level stance.* No AI, officially. Some people use ChatGPT on personal laptops and don't mention it. Leadership worries about IP leaks, or hasn't made it a priority. The conversation stays at *"we should look into this someday."*

The risk here isn't technology, it's time. Every month at Level 0 is a month your competitors grow their lead.

### Level 1: Personal productivity

*Individual adoption.* AI is allowed, maybe encouraged. Each person uses it their own way: ChatGPT in a tab, Copilot in the IDE, Claude for the tricky stuff, a design tool for mockups. Output goes up, but the know-how stays inside each person's head. Two engineers, or two PMs, or two designers on the same team get very different results because they prompt differently.

Most companies are here in early 2026. It's a real improvement over Level 0, and it's where the myth of *"AI gives you speed"* gets born. As I [argued before](https://chemaclass.com/blog/ai-gives-you-speed-not-quality/), speed without shared direction is faster chaos.

### Level 2: Shared practices

The team agrees on how to use AI: shared conventions, prompts people reuse, rules in the repo, a shared sense of when to trust the output and when to push back. Code reviews catch AI mistakes the same way they catch human ones, and design reviews do too. Tests are required whether a person or a model wrote the code.

This is the first level where AI becomes a team skill rather than a personal habit. Higher ceiling, higher floor. New people ramp up faster because the prompts and rules capture how the team works.

### Level 3: Context-aware tooling

The team invests in context: rules files, conventions, architecture docs agents can read, and [MCP servers](https://chemaclass.com/blog/mcp-giving-your-ai-agent-the-right-context/) connecting agents to the databases, APIs, and internal tools they need. The AI stops being a generic assistant and becomes closer to a coworker who has read the onboarding docs.

At this level, quality depends less on the model and more on the context around it. A weaker model with great context beats a frontier model with none. Good docs and clean architecture pay off twice: they help both humans and agents.

### Level 4: Agentic teams

Instead of one assistant, you get a squad: a TDD coach, a clean code reviewer, a domain architect, a docs maintainer. Outside engineering, the same idea applies with research, design, and ops agents. I covered the developer side in [Build Your Own Team of Agents](https://chemaclass.com/blog/build-your-own-team-of-agents/), and the leverage is real.

Humans stop competing with AI on speed and start directing it. You review, decide, and set the bar. Agents handle typing, and increasingly the thinking. Pair programming with a person still wins on complex trade-offs, but an agent pair is always there for the rest.

At the company level, the org chart, roles, and processes are still the same. What changes is that each person produces a lot more, and the team's output reflects it. Level 4 multiplies output inside the existing structure. Level 5 changes the structure.

### Level 5: AI-native workflows

The final shift is about how the company runs. Processes are designed *around* agents instead of just fitting them in. Tickets are written so an agent can act on them, and reviews assume part of the work was written by a machine. Architecture decisions take into account what agents do and don't do well. Even hiring changes: a senior IC at Level 5 is closer to a tech lead leading people and agents than a classic individual contributor.

Few companies are fully here in 2026, but the direction is obvious enough that ignoring it is its own decision.

> You don't move up a level by buying better tools. You move up by changing how work is organized and reviewed.

## AI is not stealing jobs

I keep hearing people call this a layoff story, and that framing is lazy.

The industrial revolution didn't end work. It ended specific kinds of work and created others. The people who lost the most refused to re-skill, and the people who gained the most learned to operate the new machines instead of competing with them.

Same pattern here. AI isn't taking your job, it's changing what your job is. A developer who learns to lead agents out-ships one who refuses. A designer making ten versions before lunch with Claude Design out-designs one still opening Figma from scratch. A PM who ships prototypes out-prioritizes one writing specs nobody reads.

> AI doesn't replace the skilled worker. It replaces the worker who thinks skill is a fixed asset instead of a moving target.

With the right training, model, and setup for your context, AI gives you 10x speed without losing quality. I've seen it, and it's not marketing. But the 10x only shows up when you already know what good looks like. Without that foundation, AI happily produces 10x more mediocre work.

That's the honest version of the promise: AI can produce crap ten times faster, *and* excellent work ten times faster. Which one you get is on you.

## The shift in where your attention goes

You stop thinking about details first and start thinking about direction: what are we building, who for, what shape, and which trade-offs. Agents then do most of the implementation while you protect quality and coherence.

This sounds like good news for anyone who prefers architecture to typing, and it is. But there's a trap: you can only work at the high level if you know the low level well enough to catch drift. When the agent produces something subtly wrong (a test that passes for the wrong reason, a refactor that changes behavior under load, a design that breaks on mobile), you need to spot it instantly. If you can't, you're not directing, you're signing off on whatever shows up.

> AI lets you spend more time on direction, but only if you've already earned the right to ignore the details. You earn that by having mastered them first.

## Why the ladder matters

I see teams skip levels and fail. A team jumps from Level 1 to Level 4 because leadership read a blog post about agent squads, and the agents produce mountains of low-quality code because nobody agreed on what quality means. The agents aren't the problem, the missing foundation is.

The ladder is an order that matters. Shared practices come before context engineering, context engineering before agent teams, and agent teams before AI-native workflows. Each level builds on the previous one, the same way clean code builds on naming, and naming builds on knowing what you're modelling.

The companies that win the next few years aren't the ones with the biggest AI budget. They're the ones that climb this ladder deliberately, one level at a time, without skipping the parts that look boring.

## Where to start

At Level 0 or 1, the next move isn't more licenses. It's deciding, as a team, how to use these tools. Write it down, commit it to the repo, and review it every week or month as the tools evolve.

At Level 2 or 3, look at where context is missing. What does your AI not know about your codebase, product, or brand that a new hire would learn in week one? Write it down. An afternoon of rules and docs pays back for months.

Further along, the question flips. You stop asking *"how do I use AI better?"* and start asking *"how does my team need to change so AI amplifies what we already do well?"* That's a leadership question, not a tooling one.

> AI is moving fast, but the work of adoption is still slow and human. The tools are the easy part. The hard part is deciding what good looks like, writing it down, and holding the line.

AI can execute, but it doesn't know where you're going. It can produce, but it doesn't know what's worth producing. That part is still on us. Speed is a gift, and direction is a responsibility. From the solo engineer at Level 1 to the AI-native org at Level 5, the same truth holds: the human supervises, understands, and gives meaning. The machine does the rest.

When the hype settles (and it will), the question won't be *"did you use AI?"* Everyone will. The question will be *"at what level, and with what direction?"*

![Library reading room with an open book on a wooden desk](/images/blog/2026-05-01/footer.jpg)
