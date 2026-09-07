+++
title = "Ownership Is Accepted, Never Assigned"
description = "Ownership means following a problem through to a working solution. It takes initiative, support, and the authority to make decisions."
draft = false
[taxonomies]
tags = [ "leadership", "career", "team-management", "communication" ]
[extra]
tldr = "You can assign a task, but ownership has to be accepted. Understand the problem, check that the solution works, and keep people informed. Leaders need to give people the authority and support to do that."
subtitle = "You can hand out tasks, not ownership"
static_thumbnail = "/images/blog/2026-09-20/cover.webp"
series = "leadership"
series_order = 9
related_posts = [
  "blog/2022-06-08-the-path-to-seniority-in-software.md",
  "blog/2023-05-17-dedicated-qa-teams.md",
  "blog/2025-04-12-ship-show-ask.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2016-08-01-the-clean-coder.md",
  "readings/2021-09-12-turn-the-ship-around.md",
]
+++

Thorsten Ball [shared a Slack message](https://x.com/thorstenball/status/2066907538499506349) about ownership. He uses the word often with his team, but hadn't explained what he meant by it in a while.

That made me think. I've used it in posts about [seniority](/blog/the-path-to-seniority-in-software/), [quality](/blog/dedicated-qa-teams/), and [leadership](/blog/the-beauty-of-leadership/) too. But what does it mean in practice?

For me, it means following a problem through until the solution works for the people who need it.

<!-- more -->

## You have to accept it

Kent Beck puts it clearly in [Extreme Programming Explained](/readings/extreme-programming-explained/): responsibility cannot be assigned, only accepted.

A manager can put your name on a ticket. Ownership starts when you agree on the outcome and commit to following through, including when something is missing from the ticket.

"Nobody told me" might explain why something was missed. Once you notice it, you can ask, raise the issue, or help solve it.

## Understand the problem first

"We need to move from X to Y."

Why? Is the current system slow? Does it fail for some customers? Is it hard to change?

The answer matters. A migration might be right, but a smaller change might solve the same problem. Before choosing a solution, explain what is wrong and who is affected.

I wrote about this in [The Path to Seniority](/blog/the-path-to-seniority-in-software/): if you can't explain it, you don't own it yet.

## Follow through after the merge

Imagine a customer reports a broken export. You fix the code, add a test, and merge the PR. There is still work to do.

Check that the change reached production and that the export works for the affected customer. Let them know it's fixed. Check the logs later to see whether the error returns.

The same applies to a new feature. Is it enabled? Can people use it? Does it solve the problem you started with?

Tests help you ship with confidence. Using the feature and checking its behavior in production help you see what you missed.

## Keep people informed

Your work affects other people. A change in behavior, a new convention, or a bug you found may matter to someone else's work.

Share it with the people who need to know. If you're stuck, say where and what help you need. If the plan changes, explain why.

This is what I mean by [working with the garage door open](/blog/working-with-the-garage-door-open/). Give people enough context to help while the work can still change.

## Give people room to decide

Leaders have work to do here too. You can't expect someone to own an outcome while requiring permission for every decision.

David Marquet's [Turn the Ship Around](/readings/turn-the-ship-around/) connects three things: authority to decide, competence to decide well, and clarity about the goal.

That means sharing context, helping people build the skills they need, and letting them make decisions. It also means listening when they say the scope is too large or they need more support.

Asking for ownership doesn't solve understaffing. People need time and support to follow through.

## Ask for help

Ownership doesn't mean doing everything yourself. Pair with a colleague. Ask for a review. Bring in someone who knows the system better.

You can delegate parts of the work and agree on who handles what. The same applies when working with agents: [you remain responsible for what ships](/blog/the-human-bottleneck/).

If you hand over ownership, make sure the other person accepts it and has the context to continue.

The important part is making those agreements explicit. If you haven't checked who's handling something, don't assume it's covered.

For your next task, look beyond the merge. What needs to happen before the person who reported the problem can consider it solved? Follow through on that.

{% kudos() %}
Thanks to [Thorsten Ball](https://x.com/thorstenball/status/2066907538499506349) for the Slack message that started this post.
{% end %}

![blog-footer](/images/blog/2026-09-20/footer.webp)
