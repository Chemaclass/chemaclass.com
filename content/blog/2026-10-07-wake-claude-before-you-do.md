+++
title = "Wake Claude Before You Do"
description = "Claude's usage blocks start with your first message. A tiny ping at 7:00 moves your resets to 12:00 and 17:00: three blocks in your workday, not two."
draft = false
[taxonomies]
tags = [ "ai", "productivity", "developer-tools" ]
[extra]
tldr = "Claude's usage blocks start with your first message. Ping it at 7:00, 12:00 and 17:00 with a 500-token call and a 9-to-6 workday gets three fresh blocks instead of two."
subtitle = "Three blocks, not two"
static_thumbnail = "/images/blog/2026-10-07/cover.webp"
series = "ai"
series_order = 11
reading_time = 4
related_posts = [
  "blog/2026-06-26-cut-the-token-bill-on-both-ends.md",
  "blog/2026-04-17-inside-the-claude-folder.md",
  "blog/2026-05-19-skills-over-agents.md",
]
related_readings = [
  "readings/2019-11-12-atomic-habits.md",
  "readings/2016-10-01-the-pragmatic-programmer.md",
]
+++

It's 11:00. You're in the middle of a task, and Claude Code stops: usage limit reached, resets at 14:00.

Three hours of waiting. Not because you worked too much. Because you started at 9:00.

<!-- more -->

> The clock starts when you do. So start it earlier.

## Claude counts usage in 5-hour blocks

On the Pro and Max plans, Claude gives you usage in **5-hour blocks**. The block doesn't start at a fixed hour. It **starts with your first message**.

Send your first prompt at 9:00 and your block runs until 14:00. Use it all by 11:00 and you wait.

The fix isn't a bigger plan. It's moving that first message.

That's what a ping does. A tiny message, sent on a schedule, that only says "ping".

## A ping at 7:00 gives you a third block

Say you work from 9:00 to 18:00.

- **No ping.** Blocks run 9:00 to 14:00 and 14:00 to 19:00. That's two blocks in your day. Run out at 11:00 and you wait until 14:00.
- **Ping at 7:00.** Blocks run 7:00 to 12:00, 12:00 to 17:00, and 17:00 to 22:00. You use all three. Run out at 11:00 and you wait until 12:00.

The first block is half spent before you sit down. That's fine. Nobody was using it anyway.

> **Same plan. Same work. Three blocks instead of two.**

If you never hit the limit, skip this post. If you hit it most days, read on.

## Ping every 5 hours, not every 2

My first idea was to ping every 2 or 3 hours, to keep Claude "warm" all day. Wrong idea.

There's nothing to warm up. A ping can't make Claude faster. It only decides when a block starts. And **a ping during a running block does nothing**. The next block starts with the first message after the old one ends.

Ping at 7, 9, 11 and 13, and the 12:00 reset waits until your 13:00 ping. You lose an hour on every reset.

So the ping times must match the blocks: 7:01, 12:01, 17:01. The extra minute makes sure the old block is over.

## Make the ping almost free

A plain `claude -p "ping"` isn't small. Claude Code sends its whole setup with every call: its long instructions, its list of tools, your plugins, your connected apps, your `CLAUDE.md` files. On my machine that was **about 30,800 tokens** to say "ping".

These flags turn all of it off:

```bash
claude -p "ping" --model haiku \
  --setting-sources "" \
  --strict-mcp-config \
  --tools "" \
  --disable-slash-commands \
  --system-prompt "Reply pong." \
  --no-session-persistence
```

Same check, **482 tokens**. About 60 times smaller. Haiku is Claude's smallest and cheapest model.

- `--setting-sources ""` skips your settings and plugins.
- `--strict-mcp-config` skips your connected apps (MCP servers).
- `--tools ""` sends no tool list.
- `--disable-slash-commands` skips your skills.
- `--system-prompt "Reply pong."` replaces the long default instructions.
- `--no-session-persistence` doesn't save the chat.

One trap: **don't use `--bare`**. It looks perfect, but it skips your Claude login and needs an API key. Then you pay per message, and your plan's clock never starts.

> A ping only needs to arrive. It doesn't need your whole setup.

## Set it up once

Three steps on macOS. First, find where `claude` lives. The scheduler needs the full path:

```bash
which claude
```

**1. A shortcut to run it by hand.** Add it to `~/.zshrc`. It prints `OK` or `FAIL`, which also tells you whether Claude works at all:

```zsh
alias claude-ping='claude -p "ping" --model haiku --setting-sources "" --strict-mcp-config --tools "" --disable-slash-commands --system-prompt "Reply pong." --no-session-persistence >/dev/null && echo OK || echo FAIL'
```

**2. Schedule it.** cron is the scheduler built into your Mac. Run `crontab -e` and add one line, with your path from `which claude`:

```
1 7,12,17 * * * cd /tmp && /path/to/claude -p "ping" --model haiku --setting-sources "" --strict-mcp-config --tools "" --disable-slash-commands --system-prompt "Reply pong." --no-session-persistence >> $HOME/.claude-ping.log 2>&1
```

**3. Wake the Mac.** Cron skips runs while the laptop sleeps, and a ping at 10:00 starts your block at 10:00. Gain gone. This wakes it at 6:58:

```bash
sudo pmset repeat wakeorpoweron MTWRFSU 06:58:00
```

It doesn't work if the Mac is shut down. Undo it with `sudo pmset repeat cancel`.

The next day, check `~/.claude-ping.log`. You want to see `pong`.

{% <deep_dive title="A prompt to let your agent set it up"> %}

Paste this into Claude Code, Codex, or any agent that can run commands:

```text
Set up "claude-ping" on this machine so my Claude usage block starts at 7:01, 12:01, and 17:01 every day.

1. Run `which claude` and use that full path in the scheduled job.
2. Add this alias to my shell config (~/.zshrc or ~/.bashrc), replacing any old claude-ping alias:
   alias claude-ping='claude -p "ping" --model haiku --setting-sources "" --strict-mcp-config --tools "" --disable-slash-commands --system-prompt "Reply pong." --no-session-persistence >/dev/null && echo OK || echo FAIL'
3. Add this line to my crontab. Keep any lines already there:
   1 7,12,17 * * * cd /tmp && <CLAUDE_PATH> -p "ping" --model haiku --setting-sources "" --strict-mcp-config --tools "" --disable-slash-commands --system-prompt "Reply pong." --no-session-persistence >> $HOME/.claude-ping.log 2>&1
4. Test the alias with `zsh -ic claude-ping`. It should print OK.
5. Test the scheduled command the way cron runs it. It should print pong:
   env -i HOME="$HOME" USER="$USER" LOGNAME="$USER" PATH=/usr/bin:/bin /bin/sh -c '<the crontab command without the >> log part>'
6. Do not use --bare. Do not run sudo. On a Mac, tell me the pmset command to wake it at 06:58 so I can run it myself.
7. Tell me what you changed and the test results.
```

{% </deep_dive> %}

## Your first message still wins

The ping is a default, not a lock. If you send a real prompt at 6:30, your prompt starts the block, and the schedule shifts with it. Each ping also counts toward your weekly limit. At 482 tokens on Haiku, three times a day, you won't notice.

This works with the 5-hour blocks as Anthropic runs them in October 2026. If the rules change, change the times.

It pairs well with [cutting the token bill on both ends](/blog/cut-the-token-bill-on-both-ends/). That post makes each block last longer. This one gives you more blocks.

## Switch tools, keep your setup

Sometimes you still hit the limit. Three blocks, all spent, and the work isn't done.

That's when a second tool pays off. Codex, Cursor, Gemini CLI, or whatever else you pay for. The catch: each tool reads its instructions from different files. Your rules, skills, and agents live in `.claude/`, and the other tool can't see them. So you switch, and you start from zero.

That's why I built [agnostic-ai](https://agnostic-ai.org/). You write your rules, skills, and agents once. `agnostic-ai sync` turns them into the files each tool reads. When Claude runs out, open the next tool. Same rules, same skills, same project context.

> Don't wait for the clock. Set it. And when it runs out anyway, switch tools, not setups.

![Sunset light breaking through a row of trees in an open field](/images/blog/2026-10-07/footer.webp)
