+++
title = "Working With the Garage Door Open"
description = "Working in the open lets people help while the work is still shapeable. But an open door is passive. The real skill is pushing the right signal to the right room."
draft = true
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

Most people work with the garage door closed. They pull the door down, work in private, and raise it only when the car is polished and parked. The neighbors see a finished thing. They never see the work.

The phrase comes from writer Robin Sloan. Researcher [Andy Matuschak](https://notes.andymatuschak.org/Work_with_the_garage_door_up) turned it into a way of working: notes and half-baked ideas visible to anyone walking past.

Open the door.

<!-- more -->

Working with the garage door open means showing the work while it's still in progress. The draft with the ugly variable names. The plan you're not sure about. The experiment you're halfway through. Not the demo. The middle.

## Why we keep it closed

Fear, mostly. A closed door protects you. Nobody judges a mess they can't see.

So we hide the drafts. We practice what to say before the meeting. We only push code once it's clean enough to survive review. By the time anyone sees the work, every interesting decision has already been made in private.

That instinct feels safe. It costs you the exact moments where help was still possible.

> A finished result can only be admired. A work in progress can be shaped.

## What the open door gives you

When people see the middle, they can change it. A teammate spots the dead-end approach before you sink another day into it. A junior asks the "dumb" question that turns out to be the real problem. [Pair programming](/blog/effective-pair-programming/) is this at its purest: the door open in real time.

The open door also kills the myth that seniors don't struggle. When a junior watches you get stuck, rename things three times, and google an error you "should" know, they learn what real work looks like. Not the highlight reel.

I lived this with [bashunit](/blog/bashunit/), a testing library for bash. I shipped it imperfect. Feedback arrived with the first users: bug reports, feature requests, pull requests. I let that interest decide what I built next. The library that exists today was shaped by everyone who looked inside the garage. Same with [Phel](/blog/phel-first-release/), and with [my public `.claude` folder](/blog/inside-the-claude-folder/). [The open-source way](/blog/open-source-software/).

## But an open door isn't enough

Here's the trap. You leave the door up, you create a PR, you write your notes in a shared doc, and you wait for the help to arrive.

It doesn't. Nobody wanders into your garage.

Visibility is passive. "Public by default" is the floor, not the goal. The work being findable is not the same as the work being seen.

> Leaving the door open is not the same as inviting someone in.

The skill isn't openness. It's pushing the right signal to the right people, on purpose.

## Push signal to the right room

Every channel comes with an expectation of who reads it. Matching your update to that expectation is the whole game. Post in the wrong room and you're either noise or invisible.

- **The whole company reads it.** `#general`. Post only what matters to everyone.
- **The tech team reads it.** `#engineering`. This is where a work-in-progress update belongs.
- **Interested people opt in.** `#insights`: industry news, customer signals. Useful, but nobody has to read it.
- **Nobody has to read it.** `#random`. Say whatever.

Same update, four very different outcomes depending on where it lands. Learn the map before you broadcast.

## What a good signal looks like

A good update is not _"hey, I pushed something."_ It carries enough context that a reader can engage without asking you a single question.

Say I'm halfway through a pilot: a new way to slice and [review pull requests](/blog/pull-request-vs-pair-prog/), tested on one team first. I don't wait for the end. A short update goes to `#engineering` (or your team's channel, if you have several tech teams): where I'm stuck, plus one explicit ask. _"Has anyone tried this with a monorepo?"_ gets answers.

When the pilot ends, the result goes to the same room:

- **What I tried** and why it mattered.
- **What worked**, with a concrete before and after.
- **What didn't**, honestly. The failed part is the most useful part.
- **What you'd do** to try it yourself.

Both are signals, not statuses. They turn one team's experiment into something the whole org can copy or shoot down. This is [Ship, Show, Ask](/blog/ship-show-ask/) applied past the pull request: match the visibility to the audience.

## Start small

Pick one thing this week. One experiment, one draft, one stuck moment. Do two things with it: leave the door open, then walk out and tell the right room it's there.

You'll get help you didn't expect. You'll teach someone without meaning to. And the fear that kept the door down will look a lot smaller from the other side.

The polished result impresses people. The pushed signal is how the work actually gets better.

Open the door. Then point at it.

{% kudos() %}
Thanks to my colleague Aike, who gave me the idea for this post in one of our conversations about making work visible.
{% end %}

![blog-footer](/images/blog/2026-07-14/footer.webp)
