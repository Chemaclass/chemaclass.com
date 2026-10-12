+++
title = "Wake Claude Before You Do"
description = "Claude's usage blocks start with your first message. A tiny ping at 7:00 moves your resets to 12:00 and 17:00: three blocks in your workday, not two."
draft = false
[taxonomies]
tags = [ "ai", "productivity", "developer-tools" ]
[extra]
tldr = "Claude's usage blocks start with your first message. Ping it at 7:01, 12:01 and 17:01 with a cloud routine on Haiku, and a 9-to-6 workday gets three fresh blocks instead of two."
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

The fix isn't a bigger plan. It's moving that first message. That's what a ping does: a tiny message, sent on a schedule, that only says "ping".

## A ping at 7:00 gives you a third block

Say you work from 9:00 to 18:00.

- **No ping.** Blocks run 9:00 to 14:00 and 14:00 to 19:00. That's two blocks in your day. Run out at 11:00 and you wait until 14:00.
- **Ping at 7:00.** Blocks run 7:00 to 12:00, 12:00 to 17:00, and 17:00 to 22:00. You use all three. Run out at 11:00 and you wait until 12:00.

The first block is half spent before you sit down. That's fine. Nobody was using it anyway.

> **Same plan. Same work. Three blocks instead of two.**

A ping during a running block does nothing. The next block starts with the first message after the old one ends. So ping once per block, at 7:01, 12:01 and 17:01. The extra minute makes sure the old block is over.

## Set it up with a routine

Claude Code on the web can send the ping for you at set times. It calls this a routine. Your computer can stay off, and the routine uses your plan, so it starts your block.

Two choices keep it cheap: Haiku 5.5, Claude's smallest model, and a machine that can't reach anything. A ping needs no internet, no code, and no connected apps.

**1. Make an empty machine.** In Claude Code on the web, click "Add cloud environment". Call it "No access env", set "Network access" to None, and leave the script box empty.

![Add cloud environment dialog, named No access env, with network access set to None and an empty setup script](/images/blog/2026-10-07/routine-env.webp)

**2. Create the routine.** Open Routines and add a new one. Name it "Ping", write "Reply pong" as the instructions, and pick Haiku 5.5 and "No access env". Skip "Select a repository" and "Add connector". Under "Select a trigger", pick Custom and type this schedule:

```
1 5,10,15 * * *
```

It reads as "minute 1 of hours 5, 10 and 15, every day". The times are in UTC, which is London time in winter. So this means 7:01, 12:01 and 17:01 in Spain in summer. Shift the hours to match where you live, and again when the clocks change.

![New routine form: name Ping, instructions Reply pong, Haiku 5.5, No access env, and a custom schedule of 1 5,10,15 * * *](/images/blog/2026-10-07/routine-new.webp)

**3. Check the runs.** The routine page lists every run. Runs can start a few minutes late: this morning's ran at 7:13, not 7:01.

![The Ping routine page with its run history, three runs a day, running with No access env and Haiku 5.5](/images/blog/2026-10-07/routine-history.webp)

**4. Check your usage.** At 9:07 my usage page said 0% used, resets in 3 hours. The block started with the ping, before I sat down.

![Usage limits panel: current session 0% used, resets in 3 hr 3 min](/images/blog/2026-10-07/routine-usage.webp)

{% <deep_dive title="No routines? Run it from your Mac"> %}

The same ping works from your own computer with cron, the scheduler built into your Mac. It takes four pieces: a token, a small script, a schedule, and a wake time.

**1. Get a token.** cron runs outside your login, so it can't read the Claude login your Mac keeps in its password store. Without a token, the log says `Not logged in · Please run /login`. `claude setup-token` opens your browser and prints a token that lasts a year and belongs to your plan. Save it in a file only you can read:

```bash
claude setup-token
mkdir -p ~/.config/claude-ping
pbpaste > ~/.config/claude-ping/token
chmod 600 ~/.config/claude-ping/token
```

**2. Write the script.** Save this as `~/.local/bin/claude-ping`:

```sh
#!/bin/sh
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
export CLAUDE_CODE_OAUTH_TOKEN="$(cat "$HOME/.config/claude-ping/token")"
cd /tmp || exit 1
date "+%F %R"
claude -p "ping" --model haiku \
  --setting-sources "" --strict-mcp-config --tools "" \
  --disable-slash-commands --system-prompt "Reply pong." \
  --no-session-persistence
```

A plain `claude -p "ping"` sends your whole setup with it: long instructions, tool list, plugins, connected apps, `CLAUDE.md` files. On my machine that was about 30,800 tokens to say "ping". These flags turn all of that off. With Haiku, the same ping is 482 tokens.

Don't use `--bare`. It looks perfect, but it skips your Claude login and needs an API key. Then you pay per message, and your plan's clock never starts.

Run `chmod +x ~/.local/bin/claude-ping`, then `~/.local/bin/claude-ping`. You want `pong`.

**3. Schedule it.** Run `crontab -e` and add one line. Here the times are your Mac's local time:

```
1 7,12,17 * * * $HOME/.local/bin/claude-ping >> $HOME/.claude-ping.log 2>&1
```

**4. Wake the Mac at 6:58.** A sleeping Mac skips the 7:01 ping. Undo it later with `sudo pmset repeat cancel`.

```bash
sudo pmset repeat wake MTWRFSU 06:58:00
```

A locked screen is fine. A closed lid is the weak spot: a MacBook shut with no external screen can wake for a moment and fall back asleep before 7:01. The next morning, open `~/.claude-ping.log`. You want a date and `pong` for each run.

Rather let an agent do steps 2 to 4? Save the token yourself, then paste this into Claude Code, Codex, or any agent that can run commands:

```text
Set up "claude-ping" on this Mac so my Claude usage block starts at 7:01, 12:01, and 17:01 every day.

1. Check that ~/.config/claude-ping/token exists. Never read or print it. If it is missing, stop and tell me.
2. Create ~/.local/bin/claude-ping with this content and make it executable:
   #!/bin/sh
   export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
   export CLAUDE_CODE_OAUTH_TOKEN="$(cat "$HOME/.config/claude-ping/token")"
   cd /tmp || exit 1
   date "+%F %R"
   claude -p "ping" --model haiku --setting-sources "" --strict-mcp-config --tools "" --disable-slash-commands --system-prompt "Reply pong." --no-session-persistence
3. Add this line to my crontab. Keep any lines already there:
   1 7,12,17 * * * $HOME/.local/bin/claude-ping >> $HOME/.claude-ping.log 2>&1
4. Run ~/.local/bin/claude-ping. It should print the date and pong.
5. Do not use --bare. Do not run sudo. Tell me the pmset command to wake the Mac at 06:58 so I can run it myself.
6. Tell me what you changed and the test result.
```

{% </deep_dive> %}

## Your first message still wins

The ping is a default, not a lock. If you send a real prompt at 6:30, your prompt starts the block, and the schedule shifts with it. Each ping also counts toward your weekly limit. A "pong" from Haiku three times a day, you won't notice.

This works with the 5-hour blocks as Anthropic runs them in October 2026. If the rules change, change the times.

It pairs well with [cutting the token bill on both ends](/blog/cut-the-token-bill-on-both-ends/). That post makes each block last longer. This one gives you more blocks.

## Switch tools, keep your setup

Sometimes you still hit the limit. Three blocks, all spent, and the work isn't done.

That's when a second tool pays off. Codex, Cursor, Gemini CLI, or whatever else you pay for. The catch: each tool reads its instructions from different files. Your rules, skills, and agents live in `.claude/`, and the other tool can't see them. So you switch, and you start from zero.

That's why I built [agnostic-ai](https://agnostic-ai.org/). You write your rules, skills, and agents once. `agnostic-ai sync` turns them into the files each tool reads. When Claude runs out, open the next tool. Same rules, same skills, same project context.

> Don't wait for the clock. Set it. And when it runs out anyway, switch tools, not setups.

![Sunset light breaking through a row of trees in an open field](/images/blog/2026-10-07/footer.webp)
