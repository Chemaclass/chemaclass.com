+++
title = "The Human Bottleneck"
description = "AI agents ship faster than you can review. The answer isn't speeding up. It's choosing where your attention actually matters."
draft = false
[taxonomies]
tags = [ "ai", "software", "leadership", "agile" ]
[extra]
tldr = "When agents ship faster than you can review, the fix is not reviewing faster. Decide where your attention actually matters and grant autonomy where it has been earned."
subtitle = "Attention is the one thing you can't scale"
static_thumbnail = "/images/blog/2026-08-10/cover.webp"
series = "ai"
series_order = 9
related_posts = [
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2025-04-12-ship-show-ask.md",
]
+++

[AI agents](/blog/build-your-own-team-of-agents/) can write code, review it, test it, and deploy it. We spent decades making machines faster. Now the slowest part of the system has changed.

It's us.

<!-- more -->

My [OpenClaw](https://openclaw.ai) agent, Sauron, runs several coding agents in parallel. One checks code quality. One handles integrations. One writes tests. They produce PRs, review each other's work, and flag decisions for me. Every important choice still reaches me.

You can add more agents. You can't add more of yourself.

## The approval trap

Most teams treat human review as a gate. Nothing moves without a human stamp. That made sense when humans wrote the code. It makes less sense when agents produce ten PRs while you drink your morning coffee.

Your instinct is to review everything. When you try, you start skimming. You stop catching real problems. You click "approve" on autopilot.

> If you review everything with the same depth, you review nothing with real depth.

I wrote about a related problem in [AI Gives You Speed, Not Quality](/blog/ai-gives-you-speed-not-quality/). The mess moved from writing code to reviewing it.

## Human-on-the-loop

Instead of blocking every action on approval, let agents act. Give humans the power to watch and step in.

Think pilot and autopilot. The plane flies itself most of the time. The pilot watches the instruments and takes control when something looks wrong. Nobody steers every second.

That works because the instruments tell the pilot when to look. Without alerts of your own, you're watching a blank panel. Human-on-the-loop becomes human-out-of-the-loop.

The FAA calls this [automation dependency](https://www.faa.gov/sites/faa.gov/files/MayJun2025.pdf): pilots who rely on automation for too long can lose the manual skills they need in an emergency. Same for developers.

The fix: practice on purpose. Read diffs you don't have to read. Walk through changes in the terminal. Ask the agent to explain its reasoning before you merge.

## When full review still wins

Four exceptions:

- **Security code.** Login flows, API keys, permission checks. Anything where a mistake gives someone the wrong access.
- **Actions you can't undo.** Database migrations, data deletion, money transfers, messages sent to users.
- **A new codebase.** In your first month you're learning the territory. Skimming ten PRs a day won't build that.
- **Changes that require a named approver.** If policy or regulation requires a person to approve the change, an agent cannot take that responsibility.

In these areas, you spend full attention. On purpose.

## Reduce what needs review

The answer isn't faster humans. It's fewer things that need human attention in the first place.

**Make operations safe to retry.** If a sync job runs twice without breaking anything, approval stops being a ritual. No harm, no stress.

**Make changes easy to undo.** Feature flags. Release to a small group first. Roll back in seconds. You're not approving a permanent decision. You're approving an experiment.

**Let the build catch mistakes.** Automate checks a machine can make. On this site, `check-assets.py` fails when a page points to a missing file. Without it, renaming `search.js` would let every page ship with broken search. A reviewer may miss that. The build should not.

**Show better context for review.** Don't hand over a raw diff. Show what changed, why, what was tested, what could go wrong. Name real risks. "No breaking changes" is a claim. A good summary also says "...but this file touched a public interface."

> The goal isn't to remove humans. It's to make every moment of human attention count.

## Slice by value, not by layer

Agents don't push back on scope. Ask for a search box and you get a cache layer, a config system, and three interfaces nobody asked for.

They write the code you asked for, then the code they guess you'll need later. [YAGNI](/blog/london-vs-chicago/) at machine speed. Every line plausible. Every line yours to review and maintain.

The fix is old. Cut the work into vertical slices: one thin path from screen to database that a user can actually use. Not the repository layer this week and the controllers next month.

A layered plan ships nothing until the last fat PR merges, and then asks you to review a month of guesses at once. That's [waterfall](/blog/what-is-waterfall/) in a smaller box.

> The agent decides how. You decide what, and how much.

## Earned autonomy

Not every agent deserves the same trust. Not every task carries the same risk. Onboard agents like junior developers: review everything at first, review less as they prove good judgment.

Trust needs data. Count how often an agent's change gets reverted or causes a bug, per area of code. If dependency updates are always fine but auth changes cause issues, adjust the rules per domain. Trust where the track record exists. Keep reviewing where it doesn't.

Agents can review each other before a human sees the code. The human becomes the final check, not the only one.

## Ownership and learning stay human

Two questions this approach doesn't answer by itself.

**Who gets paged at 3am?** When an agent ships a bug, the alert goes to a human. You own the system. You set the rules that let the code ship. Agents don't change who is responsible.

**How do junior developers grow?** Fixing lint, updating dependencies, adding test coverage: that repetitive work gave juniors a safe way to learn the codebase. If agents take that work, replace it with something deliberate. Mentorship. Architecture walkthroughs. Guided exposure to production incidents.

## Where your attention belongs

The attention you save has somewhere better to go. Architecture decisions. Product direction. Customer trust. Incident response. These aren't inefficiencies waiting for automation.

[Ship, Show, Ask](/blog/ship-show-ask/) was always about matching attention to risk. That was optional when review volume was small. It's not optional when agents produce ten PRs an hour.

The question isn't _"how do I review faster?"_ It's _"where does my review actually matter?"_

Agents didn't create this bottleneck. They made it impossible to ignore.

![A gravel path curving into green woods, past a metal fence](/images/blog/2026-08-10/footer.webp)
