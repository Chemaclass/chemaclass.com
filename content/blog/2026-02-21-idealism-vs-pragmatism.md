+++
title = "Idealism vs Pragmatism"
description = "The tension between doing things right and getting things done shapes every decision in software and in life. TDD, pair programming, AI adoption: the best results come from holding both ends of the rope."
draft = true
[taxonomies]
tags = [ "ai", "software", "craftsmanship", "leadership" ]
[extra]
subtitle = "Holding both ends of the rope"
static_thumbnail = "/images/blog/2026-02-21/cover.jpg"
related_posts = [
  "blog/2021-08-01-test-driven-development.md",
  "blog/2024-03-28-effective-pair-programming.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2020-08-16-advance-web-application-architecture.md",
  "readings/2018-06-04-clean-architecture.md",
  "readings/2016-05-01-clean-code.md",
]
+++

You believe in clean architecture, comprehensive tests, disciplined processes. You also shipped an ugly fix at 11pm last month because the system was down and users were waiting.

Both of those are you. The tension between them isn't a contradiction. It's how this work actually gets done.

<!-- more -->

## Two forces, one decision

**Idealism** is the compass. Clean code, tested behavior, shared understanding, principled design. Without it, you drift. Every shortcut compounds, every hack breeds another hack, and eventually you're maintaining a system nobody wants to touch. Poor software quality cost US companies [$2.41 trillion in 2022](https://www.it-cisq.org/the-cost-of-poor-quality-software-in-the-us-a-2022-report/), with technical debt as a major driver. That's what "we'll fix it later" looks like at scale.

**Pragmatism** is the engine. Deadlines, incomplete information, limited resources, shifting requirements. Without it, you never ship. You spend weeks perfecting an abstraction that the business abandoned two sprints ago.

> The goal isn't to pick a side. It's to know when each one should lead.

Idealism without pragmatism produces beautiful code that nobody uses. Pragmatism without idealism produces a product that works today and collapses tomorrow.

## TDD: the benefit and the cost

I believe in [test-driven development](/blog/test-driven-development/). Red, green, refactor. The rhythm forces you to think before you code, to specify what you want before building it. It produces better designs, shorter feedback loops, and code you can refactor with confidence.

That's the ideal. And it's not just a feeling. A [study across four teams at Microsoft and IBM](https://www.microsoft.com/en-us/research/wp-content/uploads/2009/10/Realizing-Quality-Improvement-Through-Test-Driven-Development-Results-and-Experiences-of-Four-Industrial-Teams-nagappan_tdd.pdf) found TDD reduced defect density by 40-90%, with a 15-35% increase in development time. Both sides of the tension, measured.

{% deep_dive(title="More on the study") %}

The [study](https://www.microsoft.com/en-us/research/wp-content/uploads/2009/10/Realizing-Quality-Improvement-Through-Test-Driven-Development-Results-and-Experiences-of-Four-Industrial-Teams-nagappan_tdd.pdf) covered four teams: three at Microsoft (Windows, MSN, Visual Studio) and one at IBM working on device drivers. Each TDD team was compared against a similar team on the same product, using the same languages and tools, under the same senior manager. The only difference was TDD.

The IBM team saw a 40% defect density reduction. The Microsoft teams ranged from 60% to 90%. As Nagappan noted, "over a development cycle of 12 months, 35 percent is another four months, which is huge." Every manager still considered it worth it because the reduction in post-release maintenance costs more than compensated.

No one was forced into TDD. The teams adopted it voluntarily, which likely matters: people who choose a practice tend to apply it better than people who are told to.

{% end %}

TDD is a discipline, and discipline costs something. When you're exploring a new domain and don't yet know what the right abstractions are, writing tests first can feel like drawing a map before you've seen the territory. Sometimes you need to write throwaway code, spike a solution, feel your way through the problem space. Discovery doesn't always follow a red-green-refactor rhythm.

{% deep_dive(title="When test-first meets the unknown") %}

There's a difference between _"I know what this should do and I'll specify it first"_ and _"I'm not sure what this should do yet."_ TDD shines in the first scenario. In the second, a test-last approach (or even no tests during exploration) can be more honest.

The key is what happens after discovery. Once you understand the problem, go back and write the tests. Codify what you learned. The pragmatic detour doesn't mean abandoning the ideal; it means reaching it through a different path.

As I discussed in [TDD vs BDD](/blog/tdd-vs-bdd/), the power of TDD is its feedback loop. But a feedback loop requires knowing what feedback you're looking for. When you're still figuring that out, forcing the loop can slow you down more than it helps.

{% end %}

The mistake isn't choosing test-first or test-last. The mistake is making it a religious decision instead of a contextual one. The idealist says _"always test first."_ The pragmatist says _"test when it makes sense."_ I say: test first when I can, test after when I must, but always test.

> TDD is a compass, not a cage. Follow it when you can see the path. When you can't, find the path first and mark it after.

## Pair programming: the ideal and the overhead

[Effective pair programming](/blog/effective-pair-programming/) is one of the best practices a team can adopt. Two people, one problem, continuous code review. Knowledge spreads, design improves, blind spots shrink.

That's the ideal. And in many contexts, it's the right call.

But pairing has a cost. It demands synchronous time, shared focus, and compatible energy levels. In a distributed team across time zones, finding overlap windows is already hard. Filling those windows with pairing sessions leaves little room for deep individual work. Some problems benefit from one person going deep for three hours, not two people going medium-deep for six.

{% deep_dive(title="Pairing patterns and their trade-offs") %}

There are multiple pairing patterns: Driver-Navigator, Ping-Pong, Tourist Guide. Each fits different contexts.

The anti-patterns matter too. The Silent Partner who lets the other person do all the work. The Dictator who won't let go of the keyboard. The Philosophical Pair who spends the entire session debating naming conventions instead of writing code.

Pairing works best when both people are engaged, the problem benefits from two perspectives, and the session has a clear scope. When any of those conditions is missing, pairing becomes a ritual instead of a practice. And rituals without purpose are just overhead.

[Pull requests and pair programming](/blog/pull-request-vs-pair-prog/) aren't mutually exclusive. They serve different needs. Sometimes asynchronous review is enough. Sometimes you need the real-time back-and-forth. The pragmatic choice depends on the problem, the people, and the moment.

{% end %}

> The goal of pairing isn't to pair. It's to build shared understanding and catch mistakes early. If another approach achieves that in your context, use it.

![blog-middle](/images/blog/2026-02-21/middle.jpg)

## AI: from skeptic to squad leader

A year ago, I was skeptical about AI coding assistants. My concern: an AI that doesn't understand architecture, doesn't care about maintainability, and optimizes for speed over quality will produce code that looks impressive and decays fast. I wrote about this in [AI gives you speed, not quality](/blog/ai-gives-you-speed-not-quality/), and I stand by the core message.

My concern didn't change. What changed is how I use them, and what they're capable of now.

### The resistance

The reactions from other engineers surprise me more than the technology. Fear, skepticism, flat-out rejection. I get it. I was there. Something you spent years mastering suddenly has a machine doing parts of it. That feels personal. But holding on to how things were doesn't protect the craft. It just delays your own growth.

### A team, not an assistant

Most engineers treat AI agents like autocomplete on steroids. One assistant, one chat, one stream of generated code. I started treating them like a team. Not one chatty assistant. An actual squad. One thinks architecture. One writes the first draft. One reviews and spots bugs. One writes tests. When they [collaborate](/blog/build-your-own-team-of-agents/), the output isn't just faster. It's structurally better.

Speed is the easy part, and everyone's obsessing over it. AI can spit out a ton of code in seconds. It still doesn't care about readability, edge cases, or what the codebase looks like in six months. You're still the one who has to own it, understand it, and feel good pushing it live.

I used to think AI couldn't write clean code. Then I tried it on my terms: [proper context](/blog/mcp-giving-your-ai-agent-the-right-context/), rules, conventions, specialized roles, quality gates. With the right setup, AI can write genuinely good code. Sometimes it needs a few iterations, but so do we.

The difference is that AI gets there faster, and it doesn't get tired between iterations. Given good context and clear constraints, the results have been better than I expected. Often better than what I'd produce solo under time pressure.

But none of this works if you don't know what good architecture looks like. You have to have read the books, experimented, failed, learned. You need to understand what high and low level design decisions mean for your project. AI amplifies whatever you bring to the table. If you bring solid foundations, you get solid output. If you don't, you get confident-looking garbage that you won't even recognize as garbage.

We are still the ones responsible for keeping the system in good shape. AI helps us get there. But only if we hold up our end.

### Where idealism meets AI

AI made me more idealistic, not less. The practices I described earlier, TDD and pair programming, used to compete with deadlines. Now they don't have to.

I like to practice TDD, but recently I experimented with a dedicated agent to help me with tests, and it's surprisingly good. A [TDD coach](/blog/build-your-own-team-of-agents/) that guides the red-green-refactor cycle. An explorer that reads the codebase before I touch it. A clean code reviewer, a domain architect, a React reviewer, a docs maintainer. Each one specialized, each one supporting my way of thinking and my flow. If new logic gets added without coverage, the TDD agent catches it. 100% code coverage used to be the kind of goal you'd set in a retro and quietly abandon by sprint three. With a dedicated agent enforcing it, it's just how the project works.

I still practice pair programming with real people for complex topics. The human back-and-forth has depth that AI doesn't reach, especially when you're navigating trade-offs that require experience and judgment. But on the daily basis, I always have a pair buddy agent with me. I bounce ideas off it, challenge an approach, talk through edge cases, explore a design before committing to it. It supports my thoughts, speeds up the progress, and keeps the quality bar where I want it.

The pragmatist in me used to drop TDD when deadlines got tight. The pragmatist in me with the right AI setup keeps it running.

{% deep_dive(title="My setup") %}

I use Claude for everything. Claude Code with Opus or Sonnet as the agentic coder: full development workflows, reading the codebase, following conventions, running tests, creating PRs. Claude app and Claude as a coworker for the chat side: brainstorming, architecture discussions, explaining code, drafting documentation. For inline assistance, the plugins I already have in my IDE are enough. I tried Copilot and Cursor, they're not for me. Claude covers what I need.

Different modes for different tasks. An agentic assistant following my TDD commands is a different workflow from chatting about design patterns. Both are useful. Neither replaces the other.

The market right now is intense. Claude, Codex, Gemini and others are strong players with similar products, and they're all getting better on a monthly basis. The results are impressive and only accelerating. That's the beauty of competition: it forces everyone to improve or become irrelevant, and the consumer wins either way. As of today, Claude Code seems to be the strongest option for how I work. But I have no loyalty to a brand. If Anthropic stopped pushing forward and a competitor became clearly better, I'd switch without hesitation. What matters is the capability, not the logo.

{% end %}

> I was wrong about AI in the way that idealists are often wrong: I measured the tool against the ideal outcome and found it lacking, instead of measuring it against the realistic alternative.

The alternative to AI-assisted development isn't a team of senior architects writing perfect code. It's the same team writing the same imperfect code, just slower.

The engineers who learn to lead agents instead of racing against them will have a real advantage. And this is still early.

> The question was never _"can AI write perfect code?"_ It was _"can I lead AI to write better code, faster?"_ And the answer, with the right setup, is yes.

## The whole game

Every practice in this post follows the same pattern. The ideal version exists in books. The pragmatic version exists in your codebase under pressure. You need both.

> Next time you're shipping that 11pm fix, you'll know which corners you cut and why. That's the whole game. Not perfection. Not speed. Knowing which one should lead.

![blog-footer](/images/blog/2026-02-21/footer.jpg)
