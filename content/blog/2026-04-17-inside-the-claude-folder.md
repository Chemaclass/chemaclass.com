+++
title = "Inside the .claude Folder"
description = "A hands-on tour of Claude Code's project folder. What rules, skills, agents, hooks, and settings each do, and how they fit together."
draft = false
updated = 2026-10-01
[taxonomies]
tags = [ "ai", "software", "tutorial", "craftsmanship", "developer-tools", "productivity" ]
[extra]
tldr = "A tour of the .claude folder: what rules, skills, agents, hooks and settings each do. Treat it like infrastructure, version it, and keep one spec when your team uses more than one AI tool."
subtitle = "A tutorial through rules, skills, agents, hooks, and settings"
static_thumbnail = "/images/blog/2026-04-17/cover.webp"
series = "ai"
series_order = 5
related_posts = [
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2026-01-11-mcp-giving-your-ai-agent-the-right-context.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2016-10-01-the-pragmatic-programmer.md",
]
faq = [
  { q = "Should I commit the .claude folder to git?", a = "Yes, except settings.local.json, which holds personal overrides. If a shared spec such as agnostic-ai generates the folder, commit the spec and gitignore the generated files." },
  { q = "What is the difference between a skill and a rule?", a = "A skill is a procedure, loaded when you call it with a slash or when the task matches its description. A rule is a convention, loaded when Claude works on files that match its glob pattern." },
  { q = "Do permission deny rules fully block a command?", a = "No. Deny rules match the command text, so a different command with the same effect can get past them. Use a PreToolUse hook or the sandbox when you need a hard block." },
  { q = "Where should I start with the .claude folder?", a = "With CLAUDE.md, then permissions in settings.json. Add skills, rules, hooks and agents only when real friction asks for them." },
]
+++

Every project I work on has a `.claude/` folder at the root. Its source lives in git, like the rest of the code.

That folder turns Claude Code from a generic assistant into a project-aware teammate. Everyone who clones the repo inherits the same setup.

Agentic coding is only as good as the context you give the agent. The `.claude/` folder is where that context lives.

<!-- more -->

## The .claude folder, at a glance

```
your-project/
├── .mcp.json               # shared MCP servers (root only)
└── .claude/
    ├── CLAUDE.md           # project onboarding
    ├── settings.json       # permissions, hooks, env
    ├── settings.local.json # personal overrides, gitignored
    ├── skills/             # procedures, loaded on demand
    ├── rules/              # conventions, optionally scoped
    ├── hooks/              # scripts for hooks
    └── agents/             # specialized roles
```

Six layers, one folder. Context, safety, procedures, guardrails, automation, specialists.

## The foundation

### CLAUDE.md: where everything starts

Claude Code reads `CLAUDE.md` on every boot. The onboarding doc.

In [Phel](https://github.com/phel-lang/phel-lang), mine covers the compiler pipeline (Lexer → Parser → Analyzer → Emitter), module structure, conventions, and key commands.

A global `~/.claude/CLAUDE.md` applies to _all_ your projects. The project file says _how this codebase works_. The global file says _how I work_.

Every byte ships in every prompt. Keep it short. Past one screen, move detail into `rules/` or `skills/`.

> A good `CLAUDE.md` is a good onboarding doc. The better it is, the less you repeat yourself.

### settings.json: safety before leverage

Before giving the agent more power, lock down what it must never do.

`.claude/settings.json` holds three things: **permissions** (allow/deny), **hooks** (event commands), and **env** (variables). A gitignored `settings.local.json` keeps personal overrides separate.

{% <deep_dive title="Permissions example from Phel"> %}

```json
{
  "permissions": {
    "allow": [
      "Bash(composer:*)",
      "Bash(./bin/phel:*)",
      "Bash(git:*)",
      "Bash(gh:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)"
    ]
  }
}
```

{% </deep_dive> %}

Allow unlocks flow. Deny stops the obvious mistakes, but it matches the command text, not what the command does. `find . -delete` walks past a `rm` deny rule. For a hard block, use a [hook](#hooks-automation-at-the-edges).

> Deny rules catch the obvious. Hooks enforce the rest.

## Procedures and guardrails

### Skills: procedures you can run

Next pain after onboarding: repetition. Skills solve that.

A skill is a folder in `.claude/skills/` with a `SKILL.md` inside: a short description plus the steps. Only the description sits in context. Claude loads the full skill when you call it with a slash, or on its own when the task matches the description.

A few from Phel:

- **`/gh-issue <number>`**: issue to branch, [TDD](/blog/test-driven-development/) plan, PR.
- **`/commit`**: fix, analysis, tests, conventional commit.
- **`/refactor-check`**: [SOLID](/readings/clean-architecture/), naming, architecture smells.
- **`/release [version]`**: changelog, PHAR, tag, release.

{% <deep_dive title="Skills vs rules vs raw prompting"> %}

- **Raw prompt**: _"fix issue #42"_. Agent improvises. Different every time.
- **Rule**: _"use conventional commits"_. Shapes output, not procedure.
- **Skill**: _"`/gh-issue 42`"_. The procedure _is_ the instruction.

Skills turn team habits into steps anyone can run.

{% </deep_dive> %}

> Skills capture what to do. Rules capture what not to do.

### Rules: the guardrails

`CLAUDE.md` loads every session. Rules load only when they match. Files in `.claude/rules/` target code areas with glob patterns, so the context stays lean.

{% <deep_dive title="Glob-targeted rules in practice"> %}

Rule files in [Phel](/blog/phel-first-release/):

- **`compiler.md`**: strict 4-phase pipeline, no bypassing.
- **`php.md`**: PER 3.0, `final` classes, `readonly`, Gacela.
- **`phel.md`**: kebab-case, `defn-` private, `:doc`/`:example` required.
- **`integration-tests.md`**: `--PHEL--` / `--PHP--` fixture sections.

Compiler rules don't fire when editing Phel source. Phel rules don't fire when editing PHP infrastructure.

{% </deep_dive> %}

Rules are not suggestions. A convention change and its rule ship in the same commit. No drift, no outdated wiki.

![blog-middle](/images/blog/2026-04-17/middle.webp)

## Automation and delegation

### Hooks: automation at the edges

Rules tell the agent what to do. Hooks make sure it happens even if the agent forgets.

Hooks are shell commands triggered by Claude Code events (`PreToolUse`, `PostToolUse`, `Stop`), wired through `settings.json`. In Phel, `PreToolUse` blocks edits to critical files (`build/release.sh`, `.github/*`, `composer.lock`). `PostToolUse` auto-formats PHP via `php-cs-fixer`.

{% <deep_dive title="Hooks wiring"> %}

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{ "type": "command", "command": ".claude/hooks/protect-files.sh" }]
    }],
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{ "type": "command", "command": ".claude/hooks/format-php.sh" }]
    }]
  }
}
```

{% </deep_dive> %}

> Rules are what the agent should know. Hooks are what the system enforces anyway.

### Agents: specialized roles

Everything so far shapes one agent. Agents add specialists the main agent can delegate to, each with its own tools, permissions, and model. The most advanced piece, so add it last.

A few from Phel:

- **Explorer** (Sonnet, read-only): files, structure mapping.
- **[Clean Code](/readings/clean-code/) Reviewer**: SOLID and naming on diffs.
- **TDD Coach**: red-green-refactor enforcement.
- **Domain Architect**: module boundaries, compiler pipeline.
- **Debugger**: compiler errors across all phases.

Each agent runs in its own context window, so the main session stays clean while the specialist digs deep. The win is focus, not only cost. An agent with only read and grep cannot rewrite your codebase by mistake.

> Right model for the right job. Fast and cheap for exploration. Deep and careful for architecture.

## Start small, grow with friction

Do not build all of this on day one.

The order, driven by real friction:

1. Start with [`CLAUDE.md`](#claude-md-where-everything-starts).
2. Lock down [`settings.json`](#settings-json-safety-before-leverage) permissions.
3. First time you repeat yourself, write a [skill](#skills-procedures-you-can-run).
4. First time the agent breaks a convention, add a [rule](#rules-the-guardrails).
5. First time something bad almost gets committed, add a [hook](#hooks-automation-at-the-edges).
6. First time a generalist is wrong for the job, define a [specialist](#agents-specialized-roles).

Each step fixes a problem you actually had. Not one you imagined.

Empty folder? Let the agent start it. `/init` drafts a `CLAUDE.md` from your repo. Then ask: _"Which conventions do I repeat in this codebase? Propose rules and skills for them."_

Already have one? Ask the agent to audit it: _"Check `.claude/` against the current Claude Code docs. What is stale, unused, or wrong?"_ Tools change fast, and your setup ages with them. That's how this post got its last update.

Commit the folder. Share it. When someone joins, their session inherits everything.

## One spec for teams with more than one AI tool

If your team uses only Claude Code, you can stop here.

`.claude/` has one limit: only Claude Code reads it. Codex reads `AGENTS.md`, Cursor reads `.cursor/rules/`. On a mixed team, the same rules get copied into each format, and the copies drift.

That's why I built [agnostic-ai](https://agnostic-ai.org/). Write your rules, skills, agents, and hooks once. `agnostic-ai sync` turns them into the files each tool reads. You commit the spec, and the generated folders stay out of git. This site and Phel both run on it.

> `.claude/` teaches one tool your project. One spec teaches all of them.

Treat your agent setup like infrastructure. Version it. Review it. Evolve it with the codebase.

![blog-footer](/images/blog/2026-04-17/footer.webp)
