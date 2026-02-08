+++
title = "AI Gives You Speed, Not Quality"
description = "AI writes code fast but doesn't care about quality. Learn to prompt well, never accept code you don't understand, and remember: you own every line you commit. Speed without direction is just chaos."
draft = false
[taxonomies]
tags = [ "ai", "software-architecture", "craftsmanship", "leadership" ]
[extra]
subtitle = "The human factor in the age of vibe-coding"
static_thumbnail = "/images/blog/2025-12-02/cover.jpg"
related_posts = [
  "blog/2020-04-07-the-art-of-testing.md",
  "blog/2022-10-08-different-beliefs-about-software-quality.md",
  "blog/2024-03-28-effective-pair-programming.md",
]
related_readings = [
  "readings/2016-05-01-clean-code.md",
  "readings/2018-06-04-clean-architecture.md",
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2020-08-16-advance-web-application-architecture.md",
  "readings/2020-09-10-domain-driven-design-distilled.md",
  "readings/2020-10-10-object-design-style-guide.md",
]
+++

I've been using AI coding assistants extensively: ChatGPT, Codex, Claude with Sonnet and Opus. They're incredibly helpful. They give you speed like nothing else.

But speed isn't quality.

<!-- more -->

## The vibe-coding trap

AI models are excellent at imitating their surroundings. Give them context, and they'll do whatever it takes to complete the task. This has become known as _"vibe-coding"_: you describe what you want, and the AI produces something that works. Fast.

The problem? AI will happily generate messy code if that's what gets the job done. It doesn't care about maintainability. It doesn't think about what happens when requirements change next month. It just produces output.

> AI is a mirror that reflects the context you give it. If your codebase is messy, it will generate more mess. If your prompts are vague, it will make assumptions.

Without careful guidance, you end up with patches on top of patches. Freshly created legacy code. A codebase where every change feels risky and the team spends more time fighting the code than building features.

## The art of asking

Remember Stack Overflow? Google searches that led you to forum threads from 2011 where someone had the exact same problem?

Ten years ago, being a developer meant learning how to ask good questions. You'd craft your Stack Overflow post carefully: describe the problem, show what you tried, explain what you expected versus what happened. If your question was vague or lazy, the community would let you know. Sometimes harshly.

But that friction taught us something valuable: **the quality of your answer depends on the quality of your question**.

The same principle applies to AI. A vague prompt gets a vague response. A well-structured prompt with clear context, constraints, and examples gets something useful. The skill of formulating good questions didn't become obsolete. It became more important.

> Learning to prompt AI effectively is the modern equivalent of learning to search Google and ask Stack Overflow. The developers who master this will get better results.

Even when AI gives you a fast, impressive-looking answer, **never accept code you don't fully understand**. It's tempting. The response appears in seconds, it looks professional, it might even work. But if you can't explain what it does and why, you're planting a time bomb in your codebase. And when it breaks at 2am, you'll be debugging code you didn't write with no mental model of why it exists.

Challenge the output. Ask: _"Can you simplify this?"_ or _"Is there boilerplate here we can remove?"_ AI's default is to add, not to improve. It will generate abstractions, helper functions, and patterns you didn't ask for. It won't refactor unless you tell it to. Push back.

This is especially critical with tests. Ask AI to generate tests and you'll often get tests that mirror implementation details rather than behavior. They'll break the moment you refactor, even if the logic stays the same. If you want tests that verify behavior, you need to explicitly say so. AI won't make that choice for you.

> Don't be seduced by speed. Sometimes, a fast answer you don't understand is worse than a slow answer you do.

## The human factor

AI can write code fast, but it can't understand overall architecture. It doesn't know why certain decisions were made months ago. It can't see the bigger picture of where the product is heading. It only sees what you show it, making local decisions without understanding global implications. That's our job.

As I explored in [different beliefs about software quality](/blog/different-beliefs-about-software-quality), teams often have varying standards for what _"good enough"_ means. When you add AI to the mix, maintaining that shared understanding becomes even more critical. The AI doesn't share your team's values. It just generates code.

> The discipline to maintain clean architecture, to say _"no"_ to quick hacks, to refactor before things get worse. That's uniquely human.

Books like [Clean Code](/readings/clean-code/) and [Clean Architecture](/readings/clean-architecture/) aren't less relevant in the AI age. They're more relevant. They help you spot when AI is heading in the wrong direction.

## Collaboration over automation

There's something else AI can't replace: the team.

A conversation with a colleague about _"should we extract this into a service?"_ often leads to insights that no AI prompt would surface. That back-and-forth, the pushback, the _"what if we tried this instead"_. That's where real understanding happens.

[Extreme Programming Explained](/readings/extreme-programming-explained/) emphasizes practices like pair programming and collective code ownership for good reason. These aren't inefficiencies to be automated away. They're how teams build quality into their process.

When you skip the human discussion and just let AI generate solutions, you lose the opportunity to learn, to challenge assumptions, and to grow as a team.

## You own the code

When AI writes code and you commit it, review it, approve it, merge it, and deploy it, **it's your code**. You can't blame the AI when something breaks in production. You can't point at Claude or Copilot when the architecture becomes unmaintainable.

As I wrote about [the art of testing](/blog/the-art-of-testing/), quality is a choice we make at every step. Every commit is a decision. Every review is an opportunity to catch problems. Every merge is an endorsement of the code's quality.

> We are the ultimate responsible party for the code AI writes. The commit, the review, the approval, the merge, the deploy. That's all us.

Moving fast in the wrong direction just gets you lost faster. Lines of code appearing on screen isn't progress. The value we bring as developers isn't typing speed. Our value is in understanding where we're going, maintaining discipline over chaos, and ensuring that the code we ship today doesn't become tomorrow's nightmare.

Use AI. Embrace the speed. But never forget: **you're the one steering**. If you let go of the wheel, you'll end up in a pile of unmaintainable code faster than you expected.

And when that happens, there's no one else to blame.

![cover](/images/blog/2025-12-02/footer.jpg)
