+++
title = "Working With the Garage Door Open"
description = "Working in the open lets people help while the work is still shapeable. But an open door is passive. The real skill is pushing the right signal to the right room."
draft = false
[taxonomies]
tags = [ "communication", "leadership", "career", "mentoring" ]
[extra]
subtitle = "Visibility is passive, signal is not"
static_thumbnail = "/images/blog/2026-07-14/cover.webp"
series = "leadership"
series_order = 8
related_posts = [
  "blog/2026-04-17-inside-the-claude-folder.md",
  "blog/2025-04-12-ship-show-ask.md",
  "blog/2024-03-28-effective-pair-programming.md",
]
related_readings = [
  "readings/2022-09-30-dare-to-lead.md",
  "readings/2024-04-17-radical-candor.md",
]
+++

Most people work with the garage door closed. They work in private and raise it only when the car is polished and parked. The neighbors see a finished thing. Never the work.

The phrase comes from writer Robin Sloan. Researcher [Andy Matuschak](https://notes.andymatuschak.org/Work_with_the_garage_door_up) turned it into a practice: notes and half-baked ideas visible to anyone walking past.

Open the door.

<!-- more -->

It means showing the work while it's still in progress. The draft with the ugly variable names. The experiment you're halfway through. Not the demo. The middle.

## Why we keep it closed

Fear, mostly. A closed door protects you. Nobody judges a mess they can't see.

So we hide the drafts. We only push code once it's clean enough to survive review. By the time anyone sees the work, every real decision was made in private.

That instinct feels safe. It costs you the exact moments where help was still possible.

> A finished result can only be admired. A work in progress can be shaped.

## What the open door gives you

When people see the middle, they can change it. A teammate spots the dead-end approach before you sink another day into it. A junior asks the "dumb" question that turns out to be the real problem. [Pair programming](/blog/effective-pair-programming/) is this at its purest: the door open, live.

The open door also kills the myth that seniors don't struggle. When a junior watches you get stuck and google an error you "should" know, they learn what real work looks like. Not the highlight reel.

I lived this with [bashunit](/blog/bashunit/), my bash testing library. I shipped it imperfect. Everyone who looked inside the garage shaped it: bug reports, feature requests, pull requests. Same with [Phel](/blog/phel-first-release/) and [my public `.claude` folder](/blog/inside-the-claude-folder/). [The open-source way](/blog/open-source-software/).

## But an open door isn't enough

Here's the trap. You leave the door up, open a PR, write notes in a shared doc, and wait for help to arrive.

It doesn't. Nobody wanders into your garage.

Visibility is passive. "Public by default" is the floor, not the goal.

> Leaving the door open is not the same as inviting someone in.

The skill isn't openness. It's pushing the right signal to the right people, on purpose.

## Push signal to the right room

Every channel comes with an expectation of who reads it. Matching your update to it is the whole game. Post in the wrong room and you're noise or invisible.

- **The whole company reads it.** `#general`. Post only what matters to everyone.
- **The tech team reads it.** `#engineering`. Where a work-in-progress update belongs.
- **Interested people opt in.** `#insights`: industry news, customer signals. Useful, but nobody has to read it.
- **Nobody has to read it.** `#random`. Say whatever.

Same update, four different outcomes depending on where it lands. Learn the map before you broadcast.

## What a good signal looks like

A good update is not _"hey, I pushed something."_ It carries enough context that a reader can engage without asking you a single question.

Say I'm halfway through a pilot: a new way to slice and [review pull requests](/blog/pull-request-vs-pair-prog/), tested on one team. I don't wait for the end. A short update goes to `#engineering`: where I'm stuck, plus one explicit ask. _"Has anyone tried this with a monorepo?"_ gets answers.

When the pilot ends, the result goes to the same room:

- **What I tried** and why it mattered.
- **What worked**, with a concrete before and after.
- **What didn't**, honestly. The failed part is the most useful part.
- **What you'd do** to try it yourself.

Both are signals, not statuses. They turn one team's experiment into something the whole org can copy or shoot down. This is [Ship, Show, Ask](/blog/ship-show-ask/) applied past the pull request.

## Start small

Pick one thing this week. One experiment, one draft, one stuck moment. Do two things: leave the door open, then walk out and tell the right room it's there.

You'll get help you didn't expect. You'll teach someone without meaning to. And the fear that kept the door down will look smaller from the other side.

The polished result impresses people. The pushed signal is how the work gets better.

Open the door. Then point at it.

{% kudos() %}
Thanks to my colleague Aike, who gave me the idea in one of our conversations about making work visible.
{% end %}

![blog-footer](/images/blog/2026-07-14/footer.webp)
