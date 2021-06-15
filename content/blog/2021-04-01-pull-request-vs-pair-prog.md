+++
title = "Pull Requests vs Pair Programming"
description = "Why choosing when you can have both?"
[taxonomies]
tags = [ "team-work", "pull-request", "pair-programming" ]
[extra]
subtitle = "Why choosing when you can have both?"
static_thumbnail = "/images/blog/2021-04-01/cover.jpg"
+++

![blog-cover](/images/blog/2021-04-01/cover.jpg)

Let's talk about the benefits of Pull Requests and Pair Programming, and my thoughts on these after some years of experience with them. 

<!-- more -->

# Pull Requests

A Pull Request (PR) is basically a way of showing your suggested code changes such that they are easily comparable with the existing source code. This is part of a workflow that helps developers to share knowledge about the changes that are being done within the system.

> A Pull Request is the moment where you ask your peers to review and check out your code changes.

Usually, it's also used:
1. For discussions about code style.
2. To spot potential bugs.
3. For architectural or design discussions once the solution is done.

## Pull Requests aren't the best tool for everything

The main problem with these topics above is that PR's are usually ready when the feature/bug is already being worked on and in the last stage of its development process. It's an "already change proposal to be merged into the current system", don't forget that.

The concept of "Draft PR" exists to make explicit that a PR is not ready to be merged, so it's still a "work in progress thing", but that's another topic.

Pull Requests are, indeed, one of the best tools that we have in our industry to share knowledge about the changes that we are doing in the system, but sometimes they might be misused, as for example:

1. **Discussions about code style**. Code style shouldn't be discussed in a PR. There should be already a CI running a code style checker, that's all. If you want to talk about code style, request a change in your code style checker, but not in a random PR.
2. **Spot bugs**. Bugs and desired behavior should be covered by automated tests. The developer is the first responsible person for this topic.
3. **Architectural or design discussions**. Once a particular solution is developed and ready for review, it is usually really hard to "rollback" that idea and rewrite it again. Because "why would you do that? For some subjective opinion? It's done already. And it seems to work just fine."

Having an extra person looking at the changes that we have done for "designing decisions" might be beneficial, but we could have addressed "potential disagreements" in a sooner stage.

## What should the purpose of a Pull Request be?

1. Sharing knowledge about the proposed changes with the team.
2. Ensuring the team aligns and agrees across the multiples changes that are getting submitted every day in order to keep a healthy direction for the project. Yes, this might include double-checking the outcome design, but… What if that is now too late? How could we solve all those issues?

# Pair Programming

The concept of "Pair Programming" can be understood from different points of view. Pair thinking and pair programming, driver-navigator roles concepts, or pure live coding from one side. Actually, this is way easier than it looks like at first instance:
- Either you watch and help the other person to write code,
- Or you type while getting another pair of eyes watching and helping you.

> Pair Programming helps the team to work together.

Pair programming is the joy of working with an extra brain and another pair of eyes, where the key is to **build a context** where you two **share the same goal** in order to find the **best possible solution**. All of this while learning from each other every single second.
Pair Programming is not about developing the best solution at the very beginning. It's about making it work, sharing ideas, and finding a better solution together. After that, you can refactor and clean the code.

## Pair Programming is a continuous code review

Pull Requests are an asynchronous way to share code changes, while Pair Programming is totally **synchronous** because it happens at the same time.

That said, Pull Requests and Pair Programming aren't mutually exclusive, they can coexist. They are tools, and we should wisely choose them in order to achieve our objectives.

The most common fear that I saw while encouraging to do Pair Programming is that some people are shy and they don't like to have other eyes around them while they are coding because of:
- Fear that they don't know what to code or where to start.
- Fear that others will laugh at their solutions.
- Fear to don't succeed in public.
- Fear to not be able to develop the expected solution for multiple reasons: misunderstanding the task or lack of knowledge.
- Fear to change your mind in front of others.
- Fear to discuss and make decisions loud.
- Fear of disagreeing with others.

## After several years of experience on this topic

The pattern which rejects Pair Programing is basically "fear", and being out of your comfort zone. And this is due to the misunderstanding of the roots of the actual Pair Programming concept.

Pair Programming is not "to show off in front of your colleagues" or "to be screwed by your peers", but to be transparent (showing your skills as they really are) and improve as a team lifting up each other.

Programming is an iterative process that needs a continuous refactoring of our way of thinking in order to achieve better solutions, day by day. Therefore, programming with another person next to you (with a different way of thinking) will help the team to get the best from each other while discarding the waste or bad habits if necessary.

Pair Programming doesn't need to be always set for everything. As a tool, it's flexible, and we can choose how, when and for what reason.

A personal rule of thumb, before starting tasks that might involve touching multiple modules or complex business rules, think about a quick Pair Thinking/Programming with another more experienced colleague in that field.

> Everything depends on a particular context and people: the developers, the pairs, the tasks, the mood.

## Still uncomfortable with Pair Programming?

If you still feel uncomfortable having another person next to you while you write code, it might be because you aren't particularly happy with your own code, or the process that you follow in order to achieve some result. My favorite way to work on this is by exercising on your own and working on improving your skills as a software developer.
- Create and play around with your own pet projects.
- Work on code katas on your own and with others.

> Practice makes the master.

# Summary

- Don't get me wrong, Pull Requests are great. Keep doing them.
- Team collaboration is essential. Pair Programming aims for this.
- Pair Programming encourages the team to proactively work together.
- Don't be afraid of coding while having eyes around you. Ask questions when something is unclear. Ask for help when you don't know how to solve something.

> It's totally ok not knowing everything. The most important thing is to know how to work together.

![blog-img](/images/blog/2021-04-01/footer.jpg)
