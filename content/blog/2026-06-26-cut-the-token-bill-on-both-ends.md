+++
title = "Cut the Token Bill on Both Ends"
description = "Two small tools that compound: Caveman shrinks what the agent says back, RTK shrinks what your terminal pipes in. More room in the same context window, same model, same prompts."
draft = false
[taxonomies]
tags = [ "ai", "productivity", "developer-tools", "agentic-coding" ]
[extra]
subtitle = "Two leaks, two patches"
static_thumbnail = "/images/blog/2026-06-26/cover.webp"
series = "ai"
series_order = 8
related_posts = [
  "blog/2026-05-19-skills-over-agents.md",
  "blog/2026-04-17-inside-the-claude-folder.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2016-10-01-the-pragmatic-programmer.md",
]
+++

Every agentic session burns tokens in two directions at once. The agent talks back to you, and the terminal pipes its output in. Both flow through the same context window, and both of them leak.

Run a session long enough and you hit the wall. The answers get worse and the bill climbs.

<!-- more -->

> Same model. Same prompts. Lighter bill.

Open any session transcript and the biggest blocks aren't your prompts:

- Agent responses: small talk, hedging, repetition, "Sure! Happy to help...".
- Tool output: `npm install` logs, `git status` walls of text, `grep` dumps with full file paths.

The two tools below each go after one of those. Caveman handles what the agent says back. RTK handles what the shell sends in.

## Caveman trims the output

**[Caveman](https://github.com/JuliusBrussee/caveman)** is an Agent Skill. Run `/caveman full` once and the agent stops padding its replies: no articles, no filler, no small talk. Fragments are fine, and the technical terms stay exact.

Install:

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
```

What dies:

- Articles: a, an, the.
- Fillers: just, really, basically, actually, simply.
- Small talk: sure, of course, happy to.
- Hedging: might, perhaps, it depends.

What stays:

- Code blocks, exact errors, file paths, commands.
- Security warnings and destructive ops (skill auto-clarifies).

{% deep_dive(title="Before and after") %}

Normal mode:

> Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by an off-by-one error in your token expiry check. The middleware compares the current time using `<` when it should really be using `<=`. Here's the fix:

Caveman mode:

> Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:

Same fix, and the code block that follows is identical. All that shrank is the prose around it, down to about a quarter.

{% end %}

There are three levels: `lite`, `full`, and `ultra`. Start at `full`, since `ultra` reads like a telegram. If an answer ever lands too terse for you, type `normal mode` and it backs off.

> The agent doesn't lose intelligence when you take away its small talk.

## RTK trims the input

**[RTK](https://github.com/rtk-ai/rtk)** (Rust Token Killer) wraps the commands your agent runs. A hook rewrites `git status` into `rtk git status` behind the scenes, so there's nothing extra to type and no overhead to notice.

Install:

```bash
brew install rtk
rtk init -g    # install the hook that auto-rewrites commands
```

If `rtk gain` later errors, a different tool with the same name slipped in; install from the [repo](https://github.com/rtk-ai/rtk) instead.

The wrapped version strips the noise before it ever reaches the agent: color codes, repeated separators, `npm` install banners, verbose timestamps.

Here's the same `git status`, raw and then wrapped:

```
$ rtk proxy git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	content/blog/new-draft.md

nothing added to commit but untracked files present (use "git add" to track)
```

```
$ rtk git status
* main...origin/main
? Untracked: 1 file
   content/blog/new-draft.md
```

Same information in half the lines. On a busy repo the gap only grows, as dozens of untracked files, branch hints, and instruction lines all collapse into one small block.

```bash
rtk gain              # see how many tokens it saved you
rtk gain --history    # per-command breakdown
rtk discover          # scan your agent history for missed wins
```

RTK reports [60-90% fewer tokens](https://github.com/rtk-ai/rtk) on common dev commands. Run `rtk gain` after some real use to see your own number.

It never touches the payload, only the noise around it, so errors and stack traces come through exactly as they are. If a filter ever eats something you actually need, bypass it for that one call with `rtk proxy <cmd>`.

> Output you never read is still output the model has to read.

## Why the combo compounds

On their own, each tool helps a little. Run them together and the effect compounds, because they hit different halves of the same loop. A turn goes like this: you prompt, the agent thinks, it runs a command, the terminal answers, the agent reads that, then it replies to you. RTK shrinks the terminal half and Caveman shrinks the reply, so every turn gets cheaper and you fit more of them in one window.

Here's the real check, on a $100/month plan. Before I added these, I hit the weekly usage cap all the time, sometimes from a single project. Now I run several projects in parallel and the cap rarely shows up. The plan didn't get bigger; the sessions got smaller.

## Set it once, then forget it

Both installs are global, and you do them once. After that you keep typing `git status`, `grep`, and `npm install` exactly as before. The hook rewrites them for you and Caveman kicks in on its own, so there are no new habits to learn.

Not sure where to start? Pick whichever leak hurts more right now. If long replies on every little fix are the problem, start with Caveman. If it's floods of `grep` and `npm install` output, start with RTK. Add the other one whenever you feel like it, since they don't get in each other's way.

> You didn't upgrade the model. You stopped wasting its attention.

![blog-footer](/images/blog/2026-06-26/footer.webp)
