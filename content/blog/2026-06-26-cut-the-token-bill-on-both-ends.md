+++
title = "Cut the Token Bill on Both Ends"
description = "Two small tools that compound: Caveman shrinks what the agent says back, RTK shrinks what your terminal pipes in. Same context window, twice the room."
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

Every agentic session burns tokens in two directions. The agent talks back. The terminal pipes output in. Same context window, both ends leaking.

Run long enough and you hit the wall: quality drops, costs climb.

<!-- more -->

> Same model. Same prompts. Lighter bill.

The biggest blocks in a session transcript aren't your prompts:

- Agent responses: small talk, hedging, repetition, "Sure! Happy to help...".
- Tool output: `npm install` logs, `git status` walls of text, `grep` dumps with full file paths.

Two tools, one leak each. One trims what the agent says. The other trims what the shell sends back.

## Caveman trims the output

**[Caveman](https://github.com/JuliusBrussee/caveman)** is a Claude Code skill. One command, `/caveman full`, and the agent drops articles, fillers, and small talk. Fragments are welcome. Technical terms stay exact.

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

Same fix. Same code block follows. Quarter of the prose.

{% end %}

Levels: `lite`, `full`, `ultra`. Start at `full`; ultra reads like telegrams. If an answer ever lands too terse, type `normal mode`.

> The agent doesn't lose intelligence when you take away its small talk.

## RTK trims the input

**[RTK](https://github.com/rtk-ai/rtk)** (Rust Token Killer) wraps the commands your agent runs. A hook rewrites `git status` into `rtk git status`. Transparent. Zero overhead.

Install:

```bash
brew install rtk
rtk init -g    # install the hook that auto-rewrites commands
```

If `rtk gain` later errors, a different tool with the same name slipped in; install from the [repo](https://github.com/rtk-ai/rtk) instead.

The wrapped version strips noise before it reaches the agent: color codes, repeated separators, `npm` install banners, verbose timestamps.

Same `git status`, raw vs wrapped:

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

Same information. Half the lines. On a busy repo the gap scales: dozens of untracked files, branch hints, instruction lines, all collapse to one block.

```bash
rtk gain              # see how many tokens it saved you
rtk gain --history    # per-command breakdown
rtk discover          # scan your Claude Code history for missed wins
```

RTK reports [60-90% fewer tokens](https://github.com/rtk-ai/rtk) on common dev commands. Run `rtk gain` after real use to see your own.

It never touches the payload, only the noise around it. Errors and stack traces stay exact. If a filter ever eats something you need, bypass it for one call: `rtk proxy <cmd>`.

> Output you never read is still output the model has to read.

## Why the combo compounds

Each tool plugs one leak. Together they multiply. A turn goes: prompt, think, run command, terminal output, read, answer. RTK shrinks the tool output. Caveman shrinks the answer. Smaller turns, more turns in the same window.

Real check on the $100/month Claude Max plan. Before both tools: I hit the weekly usage cap often, sometimes on a single project. After: multiple projects running in parallel and the cap rarely shows.

> The plan didn't get bigger. The sessions got smaller.

## Set it once, then forget it

Both installs are global and one-time. You keep typing `git status`, `grep`, and `npm install` exactly as before: the hook rewrites them, and Caveman activates on its own. No babysitting, no new habits.

Not sure where to start? Pick the leak that hurts more. Long replies for every fix, Caveman first. Floods of `grep` and `npm install` output, RTK first. Then add the other; they don't conflict.

> Two tools. Two leaks. One context window that lasts twice as long.

![blog-footer](/images/blog/2026-06-26/footer.webp)
