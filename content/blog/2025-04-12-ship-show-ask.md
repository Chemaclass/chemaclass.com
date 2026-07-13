+++
title = "Ship, Show, Ask"
aliases = [ "/ship-show-ask" ]
description = "Not every change needs the same review. Ship, Show, Ask matches the review process to the risk of the change, so teams keep shipping without losing quality or collaboration."
draft = false
[taxonomies]
tags = [ "agile", "code-review", "team-management", "productivity" ]
[extra]
subtitle = "Match the review to the risk, not the ritual"
static_thumbnail = "/images/blog/2025-04-12/cover.webp"
related_posts = [
  # TODO re-enable when garage-door post publishes
  # "blog/2026-07-14-working-with-the-garage-door-open.md",
  "blog/2024-02-25-deployments-on-fridays.md",
  "blog/2024-03-28-effective-pair-programming.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2023-03-19-accelerate.md",
  "readings/2020-03-12-clean-agile.md",
]
series = "agile"
series_order = 6
+++

In fast-moving teams, one of the biggest tensions we face is this: How do we keep shipping without compromising quality or collaboration?

The traditional approach to pull requests often slows things down. We wait hours, or days, for approvals, even for trivial changes. But the alternative, merging directly, can feel reckless or invisible to the rest of the team.

<!-- more -->

That's where the Ship-Show-Ask strategy comes in. Originally described by [Rouan Wilsenach](https://martinfowler.com/articles/ship-show-ask.html), this model offers a more flexible and thoughtful way to handle code changes. It's not just a branching strategy, it's a shift in how teams collaborate, trust, and take ownership.

## What is Ship, Show, Ask?

It's a model that classifies changes based on how much review they require:

- **Ship**: Merge directly to main (without a PR)
- **Show**: Open a pull request, but merge it immediately
- **Ask**: Open a pull request and wait for review

The key idea is to use Ask as the default for most work, fall back to Show when the context makes it safe, and avoid Ship (or reserve it for extremely trivial cases, if used at all).

## Why I prefer to Ask and Show

Treat every change, even the small ones, as something worth sharing. I always create a branch and open a PR. It provides visibility, builds a shared history, and creates a space for optional or asynchronous feedback. It's [working with the garage door open](/blog/working-with-the-garage-door-open/), applied to code.

But not all PRs need to follow the same review process.

### I default to Ask

I prefer to wait for a peer review when:

- The change involves risky or complex logic
- It could impact other developers or teams
- It introduces architectural or structural decisions that haven't been agreed on yet
- It benefits from shared input or a second pair of eyes

That said, **Ask doesn't mean over-engineering the process**. Often, one thoughtful reviewer is enough, especially if they're familiar with the domain. If the change touches a specific area, I'll ask for feedback from the person who owns (or best understands) that part of the code. It doesn't need to involve everyone.

> In small teams, requiring two approvals on every PR can quickly become a bottleneck and slow down the delivery of value. The goal is alignment and quality, not ceremony for its own sake.

### I use Show for safe, low-impact changes

I might merge immediately when:

- Practicing [pair programming](/blog/effective-pair-programming/) (the review already happened live)
- Fixing typos or broken links
- Updating documentation or changelogs
- Refactoring within a module I own
- Adding tests for existing behavior
- Making non-functional tweaks (formatting, logs, comments)
- Applying UI or style adjustments with no logic change

The key principle: **Show is optional, never mandatory**. I choose Show only if the change is low-risk and fits within team expectations. When I use Show, I own the outcome. The responsibility is mine.

## Why this approach works for me

This model helps me:

- Ship faster without compromising quality
- Work with greater autonomy and ownership
- Avoid bottlenecks, especially in small or async teams
- Foster a mindset of trust, accountability, and thoughtful decision-making

> It shifts the goal from getting approval to sharing intent and owning the outcome.

## What makes a good "Show"?

A Show PR might be the right choice when:

- The change is trivial and within my area of responsibility
- No one is available to review, and waiting would block progress
- The PR includes clear context and reasoning
- I'm open to post-merge feedback
- I'm ready to follow up with adjustments if needed

## Tips for making it work

Some practical advice from experience:

- Clarify team expectations for when to use Show vs Ask
- Always provide context in your PR, even if merging immediately
- Write tests for any new logic or behavior
- Welcome post-merge feedback, review doesn't stop at merge
- Reflect regularly as a team and adjust the approach as needed

---

Ship, Show, Ask is more than branching hygiene. It builds a culture of clarity, accountability, and trust, where developers move fast while staying thoughtful.

If you're tired of slow PR queues and over-engineered approvals, try it on your next change. Want to dive deeper? Read [Rouan Wilsenach's original post](https://martinfowler.com/articles/ship-show-ask.html).

> Match the review to the risk. Own what you merge.

![blog-footer](/images/blog/2025-04-12/footer.webp)
