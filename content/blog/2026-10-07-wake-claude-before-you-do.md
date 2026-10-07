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

A plain `claude -p "ping"` isn't small. Claude Code sends its whole setup with every call: its long instructions, its list of tools, your plugins, your connected apps, your `CLAUDE.md` files. On my machine that was **about 30,800 tokens** (the units Claude counts your usage in) to say "ping".

Turn all of that off, and switch to Haiku, Claude's smallest and cheapest model. Same check, **482 tokens**. About 60 times smaller.

> A ping only needs to arrive. It doesn't need your whole setup.

{% <deep_dive title="The flags that make it small"> %}

```bash
claude -p "ping" --model haiku \
  --setting-sources "" \
  --strict-mcp-config \
  --tools "" \
  --disable-slash-commands \
  --system-prompt "Reply pong." \
  --no-session-persistence
```

- `--setting-sources ""` skips your settings and plugins.
- `--strict-mcp-config` skips your connected apps (MCP servers).
- `--tools ""` sends no tool list.
- `--disable-slash-commands` skips your skills.
- `--system-prompt "Reply pong."` replaces the long default instructions.
- `--no-session-persistence` doesn't save the chat.

One trap: **don't use `--bare`**. It looks perfect, but it skips your Claude login and needs an API key. Then you pay per message, and your plan's clock never starts.

{% </deep_dive> %}

## Set it up once

On a Mac it takes four pieces: a token, a small script, a schedule, and a wake time.

The token surprised me. My first version ran on time and did nothing. The log said why: `Not logged in · Please run /login`. The scheduler runs outside your login, so it can't read the Claude login your Mac keeps in its password store. `claude setup-token` gives you a token that lasts a year and belongs to your plan.

The wake time matters too. A sleeping Mac skips the 7:01 ping, and a ping at 10:00 starts your block at 10:00. Gain gone. So the Mac wakes itself at 6:58.

A locked screen is fine. The ping doesn't need your password. A closed lid is the weak spot: a MacBook shut with no external screen can wake for a moment and fall back asleep before 7:01. A Mac that is shut down doesn't wake at all.

{% <deep_dive title="Step by step"> %}

**1. Get a token.** `claude setup-token` opens your browser and prints a token. Copy it, then save it in a file only you can read:

```bash
claude setup-token
mkdir -p ~/.config/claude-ping
pbpaste > ~/.config/claude-ping/token
chmod 600 ~/.config/claude-ping/token
```

**2. Write the script.** Save this as `~/.local/bin/claude-ping`. Replace `/path/to/claude` with the output of `which claude`:

```sh
#!/bin/sh
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
export CLAUDE_CODE_OAUTH_TOKEN="$(cat "$HOME/.config/claude-ping/token")"
cd /tmp || exit 1
date "+%F %R"
/path/to/claude -p "ping" --model haiku \
  --setting-sources "" --strict-mcp-config --tools "" \
  --disable-slash-commands --system-prompt "Reply pong." \
  --no-session-persistence
```

Run `chmod +x ~/.local/bin/claude-ping`, then `~/.local/bin/claude-ping`. You want `pong`.

**3. Schedule it.** cron is the scheduler built into your Mac. Run `crontab -e` and add one line:

```
1 7,12,17 * * * $HOME/.local/bin/claude-ping >> $HOME/.claude-ping.log 2>&1
```

**4. Wake the Mac at 6:58.** Undo it later with `sudo pmset repeat cancel`.

```bash
sudo pmset repeat wake MTWRFSU 06:58:00
```

The next morning, open `~/.claude-ping.log`. You want a date and `pong` for each run. If your laptop sleeps closed, test one night with the lid shut.

{% </deep_dive> %}

{% <deep_dive title="A prompt to let your agent set it up"> %}

Run `claude setup-token` yourself and save the token as in step 1. Then paste this into Claude Code, Codex, or any agent that can run commands:

```text
Set up "claude-ping" on this Mac so my Claude usage block starts at 7:01, 12:01, and 17:01 every day.

1. Check that ~/.config/claude-ping/token exists. Never read or print it. If it is missing, stop and tell me.
2. Run `which claude` and use that full path as <CLAUDE_PATH>.
3. Create ~/.local/bin/claude-ping with this content and make it executable:
   #!/bin/sh
   export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
   export CLAUDE_CODE_OAUTH_TOKEN="$(cat "$HOME/.config/claude-ping/token")"
   cd /tmp || exit 1
   date "+%F %R"
   <CLAUDE_PATH> -p "ping" --model haiku --setting-sources "" --strict-mcp-config --tools "" --disable-slash-commands --system-prompt "Reply pong." --no-session-persistence
4. Add this line to my crontab. Keep any lines already there:
   1 7,12,17 * * * $HOME/.local/bin/claude-ping >> $HOME/.claude-ping.log 2>&1
5. Run ~/.local/bin/claude-ping. It should print the date and pong.
6. Do not use --bare. Do not run sudo. Tell me the pmset command to wake the Mac at 06:58 so I can run it myself.
7. Tell me what you changed and the test result.
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
