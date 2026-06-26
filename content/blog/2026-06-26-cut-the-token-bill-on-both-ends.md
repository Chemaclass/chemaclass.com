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

Every agentic session burns tokens in two directions. Agent talks back. Terminal pipes output in. Same context window, both ends leaking.

Run long enough and you hit the wall. Quality drops. Costs climb.

Two tools fixed most of it. One trims what the agent says. The other trims what flows back from the shell.

<!-- more -->

> Same model. Same prompts. Lighter bill.

## Two leaks in the same window

Biggest blocks in any session transcript: agent responses and tool output. Not your prompts.

- Agent responses: pleasantries, hedging, restatements, "Sure! Happy to help...".
- Tool output: `npm install` logs, `git status` walls of text, `grep` dumps with full file paths.

Both pile up. Both push the useful signal away from the model.

## Caveman trims the output

**[Caveman](https://github.com/JuliusBrussee/caveman)** is a Claude Code skill. One command, `/caveman full`, and the agent drops articles, fillers, and pleasantries. Fragments are welcome. Technical terms stay exact.

Install:

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
```

What dies:

- Articles: a, an, the.
- Fillers: just, really, basically, actually, simply.
- Pleasantries: sure, of course, happy to.
- Hedging: might, perhaps, it depends.

What stays:

- Code blocks, exact errors, file paths, commands.
- Security warnings and destructive ops (skill auto-clarifies).

Same answer. A fraction of the prose.

{% deep_dive(title="Before and after") %}

Normal mode:

> Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by an off-by-one error in your token expiry check. The middleware compares the current time using `<` when it should really be using `<=`. Here's the fix:

Caveman mode:

> Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:

Same fix. Same code block follows. Quarter of the prose.

{% end %}

Levels: `lite`, `full`, `ultra`. Start at `full`. Ultra reads like telegrams.

> The agent does not lose intelligence when you take away its small talk.

## RTK trims the input

**[RTK](https://github.com/rtk-ai/rtk)** (Rust Token Killer) wraps the commands your agent runs. A hook rewrites `git status` into `rtk git status`. Transparent. Zero overhead.

Install:

```bash
brew install rtk
rtk init -g    # install the hook that auto-rewrites commands
```

The wrapped version strips noise before it reaches the agent. Color codes. Repeated separators. `npm` install banners. Verbose timestamps.

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

Run `rtk gain` after real use. Mine:

```
RTK Token Savings (Global Scope)
Total commands:    14773
Input tokens:      49.4M
Output tokens:     3.8M
Tokens saved:      45.6M (92.3%)
```

92.3% of terminal input tokens never had to reach the model.

> Output you never read is still output the model has to read.

## Why the combo compounds

Each tool plugs one leak. Together they multiply.

A turn: prompt, think, run command, terminal output, read, answer. RTK shrinks the tool output. Caveman shrinks the answer. Smaller turns, more turns in the same window.

Compaction kicks in later. Cached top of conversation stays cheap. Only the new parts cost.

Real check on the $100/month Claude Max plan. Before both tools: I hit the weekly usage cap often, sometimes on a single project. After: multiple projects running in parallel and the cap rarely shows.

## When not to compress

Both tools know when to step aside.

Caveman switches back to normal prose for:

- Security warnings and destructive operations.
- Multi-step sequences where fragments could be misread.
- When you ask the agent to clarify or repeat.

RTK never touches the payload. Strips noise around it. Errors and stack traces stay exact. If a filter ever eats something you need, bypass it for one call:

```bash
rtk proxy <cmd>   # raw output, no filtering
```

If an answer lands too terse, type `normal mode`.

> Compression is for the chatter. Never for the substance.

## Start with one, add the other

You do not need both on day one. Pick the leak that hurts more.

Agent writes long essays for every fix? Install Caveman first.

Every `grep` or `npm install` floods the window? Install RTK first.

Then add the second. They do not conflict.

> Two tools. Two leaks. One context window that lasts twice as long.

![blog-footer](/images/blog/2026-06-26/footer.webp)
