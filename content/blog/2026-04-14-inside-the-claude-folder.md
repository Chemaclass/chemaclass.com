+++
title = "Inside the .claude Folder"
description = "A hands-on tour of Claude Code's project folder. What rules, skills, agents, hooks, and settings each do, and how they fit together."
draft = true
[taxonomies]
tags = [ "ai", "software", "tutorial", "craftsmanship" ]
[extra]
subtitle = "A tutorial through rules, skills, agents, hooks, and settings"
static_thumbnail = "https://placehold.co/960x540?text=Inside+the+.claude+Folder"
series = "ai"
series_order = 5
related_posts = [
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2026-01-11-mcp-giving-your-ai-agent-the-right-context.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
]
+++

Open any project I work on and you will find a `.claude/` folder at the root. Next to `src/`, next to `README.md`, committed to git like the rest of the code.

That folder is how I work with Claude Code. Every teammate who clones the repo gets the same setup. No one has to learn _how we do things here_ from scratch.

This post is a tour of that folder, in the order I would teach it to a first-time dev.

<!-- more -->

## The .claude folder, at a glance

Here is the map, in teaching order.

```
.claude/
├── CLAUDE.md         # project onboarding
├── settings.json     # permissions, hooks, env
├── skills/           # reusable procedures (slash commands)
├── rules/            # glob-targeted conventions
├── hooks/            # shell scripts run on events
├── agents/           # specialized roles
└── templates/        # boilerplate the skills read from
```

Each folder has one job. Together they turn a generic AI into a teammate that knows your project.

A quick rule of thumb:

- **`CLAUDE.md`** teaches the agent _how this project works_.
- **`settings.json`** controls _what the agent is allowed to do_.
- **`skills/`** captures _procedures the agent can run_.
- **`rules/`** sets _what the agent must not write_.
- **`hooks/`** reacts to _events automatically_.
- **`agents/`** defines _specialists the main agent can delegate to_.

> Context, safety, procedures, guardrails, automation, specialists. Six layers, one folder.

## CLAUDE.md: where everything starts

Every Claude Code session reads `CLAUDE.md` when it boots. This is the onboarding doc. Always step one.

Mine usually covers:

- The stack and the folder structure.
- The conventions the agent must follow (commit format, naming, architecture).
- The commands that matter (`zola serve`, `zola build`, `./build.sh`).
- The skills in `.claude/skills/` so the agent knows what it can invoke.

There is also a global `~/.claude/CLAUDE.md` that applies to _all_ your projects. Mine holds personal preferences: conventional commits only, never mention Claude in commit messages, use `ref:` instead of `refactor:`, DTO naming rules. The project file says _how this codebase works_. The global file says _how I work_.

> A good `CLAUDE.md` is a good onboarding doc. The better it is, the less you repeat yourself.

Keep it short. If it grows past one screen, split the detail into `rules/` or `skills/` and keep the entry point lean.

## settings.json: safety before leverage

Before giving the agent more power, lock down what it must never do. Two minutes of work. It prevents disasters.

Three things live in `.claude/settings.json`:

1. **`permissions`**: what the agent can run. Deny the dangerous stuff (`rm -rf`, `git reset --hard`, `git push --force`). Add a whitelist if you want a tighter sandbox.
2. **`hooks`**: wires Claude Code events to shell commands (see the Hooks section below).
3. **`env`**: environment variables and feature flags. For example, where you enable experimental features.

```json
{
  "permissions": {
    "deny": [
      "Bash(git push --force:*)",
      "Bash(git reset --hard:*)",
      "Bash(rm -rf:*)"
    ]
  }
}
```

There is also `settings.local.json`, which is gitignored. Put personal stuff there: extra permissions only you need, your paths, your experiments. The shared file stays shared. Your overrides stay local.

> Permissions are the floor. Everything else builds on top of a safe baseline.

## Commands and skills: procedures you can run

After onboarding and permissions, the next pain is repetition. _"I keep typing the same setup instructions."_ That is what skills solve.

A skill is a markdown file inside `.claude/skills/` (older setups call them `commands/`). Each one is a procedure. You call it with a slash: `/new-blog-post`, `/serve`, `/check-links`.

This site is a good example. My skills include:

- **`/new-blog-post <topic>`**: scaffolds a post from a template, with front matter and a cover image placeholder.
- **`/translate <file>`**: translates a post between English and Spanish, keeping front matter in sync.
- **`/validate-posts`**: lints structure, front matter, and asset references.
- **`/check-translations`**: finds content missing a Spanish version.

On code projects I use skills more: `/create-module` scaffolds a hexagonal module, `/gh-issue` turns a GitHub issue into a PR, `/refactor-check` looks for SOLID violations.

{% deep_dive(title="Skills vs rules vs raw prompting") %}

- **Raw prompt**: _"create a new blog post about X"_. The agent improvises. Works once, different every time.
- **Rule**: _"blog posts must have this front matter"_. Shapes the output, but the agent still invents the steps.
- **Skill**: _"`/new-blog-post <topic>` reads the template, generates the slug, fills front matter, places the cover"_. The procedure _is_ the instruction.

Skills turn tribal knowledge into steps you can run. What used to be _"ask Chema how he sets up a new post"_ becomes a command anyone can run.

{% end %}

> Skills capture what to do. Rules, next, capture what not to do.

## Rules: the guardrails

`CLAUDE.md` is read every session. Rules are read only when they apply.

Files inside `.claude/rules/` target specific parts of the code with glob patterns. Domain code gets one set. Infrastructure gets another. Frontend gets its own. The agent loads only the rules that match the files it is touching.

{% deep_dive(title="Glob-targeted rules in practice") %}

- **`modules/*/Domain/**/*.php`**: no framework imports, no infrastructure, only plain PHP.
- **`modules/*/Infrastructure/**/*.php`**: thin controllers, repositories own DB access, models stay in their place.
- **`resources/js/**/*.tsx`**: TypeScript strictness, component conventions, styling, accessibility.

Domain rules do not fire when editing a controller. Frontend rules do not fire when editing PHP.

{% end %}

Rules are not suggestions. They are the lines the agent must not cross. Write them once and every future session respects them.

And they travel with the code. When a convention changes, the rule changes in the same commit. No drift, no outdated wiki pages.

![blog-middle](https://placehold.co/960x540?text=.claude+folder+layers)

## Hooks: automation at the edges

Rules tell the agent what to do. Hooks make sure something happens even if the agent forgets.

Hooks are shell commands that run on Claude Code events. Scripts live in `.claude/hooks/`. `settings.json` wires them to events.

Common events:

- **PreToolUse**: before a tool call runs. Block unsafe actions, add extra checks.
- **PostToolUse**: after a tool call. Format code, run a linter, regenerate a snapshot.
- **Stop**: when the session ends. Play a sound, send a notification, log metrics.

On this blog, a `PreToolUse` hook runs `zola check` before every `git commit`. If a link is broken, the commit never leaves my machine. On code projects, the same pattern runs tests or a coverage check.

{% deep_dive(title="A commit-time safety net") %}

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [
          {
            "type": "command",
            "command": "zola check 2>&1 | tail -5"
          }
        ]
      }
    ]
  }
}
```

The agent cannot skip it. Neither can I. The check is part of the workflow, not a step I might forget.

{% end %}

> Rules are what the agent should know. Hooks are what the system enforces anyway.

## Agents: specialized roles

Everything so far shapes one agent. Agents add a second layer: specialists the main agent can delegate to. This is the most advanced piece. I recommend it last.

Files inside `.claude/agents/` define roles with their own tools, permissions, and model. You do not need your best model to rename a variable. You probably do for architecture decisions.

Each agent file has frontmatter (name, description, allowed tools, model) and a body that describes the role. When a task fits a specialist, the main agent delegates. The specialist runs in its own context and reports back.

Roles I reuse across projects:

- **Explorer** (small model): read-only. Finds files, maps structure, answers _"where is X"_.
- **Reviewer** (mid-tier): reads diffs, flags smells and SOLID violations, no write access.
- **Test writer** (mid-tier): edits test files, runs the suite, cannot touch production code.
- **Architect** (top-tier): module boundaries, cross-cutting changes, big refactors.

The win is not only cost. It is focus. An agent with only read and grep tools cannot rewrite your codebase by mistake. Its permissions shape its behavior.

> The right model for the right job. Fast and cheap for exploration. Deep and careful for architecture.

## Start small, grow with friction

You do not build all of this on day one. If you try, you will over-engineer and get none of it right.

The order I recommend, driven by real friction:

1. Start with a `CLAUDE.md`. A few paragraphs about the stack, the structure, the conventions.
2. Lock down `settings.json` permissions before the agent can do something you cannot undo.
3. The first time you repeat yourself across sessions, write a skill.
4. The first time the agent breaks a convention in a specific layer, add a rule.
5. The first time something bad almost got committed, add a hook.
6. The first time one generalist is the wrong shape for the job, define a specialist agent.

Each step fixes a problem you actually had. Not one you imagined.

> The setup grows from real friction, not from upfront design.

Commit the folder. Share it with the team. When someone joins, their Claude Code session inherits the whole thing. That is the real payoff. Not what a single session can do. What every session in the project inherits by default.

The `.claude/` folder is the most undervalued file in your repo. Treat it like infrastructure.

## Related

- [@internal-link Build Your Own Team of Agents](@/blog/2026-02-07-build-your-own-team-of-agents.md)
- [@internal-link MCP: Giving Your AI Agent the Right Context](@/blog/2026-01-11-mcp-giving-your-ai-agent-the-right-context.md)
- [@internal-link AI Gives You Speed, Not Quality](@/blog/2025-10-10-ai-gives-you-speed-not-quality.md)

![blog-footer](https://placehold.co/960x540?text=.claude+is+infrastructure)
