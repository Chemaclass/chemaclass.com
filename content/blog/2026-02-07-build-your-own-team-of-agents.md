+++
title = "Build Your Own Team of Agents"
description = "Most people use AI as a single assistant. The real leverage comes when you organize it into a team: onboarding docs, standard procedures, specialists, and parallel execution."
draft = false
[taxonomies]
tags = [ "ai", "software", "craftsmanship", "leadership" ]
[extra]
subtitle = "From solo assistant to coordinated workforce"
static_thumbnail = "/images/blog/2026-02-07/cover.jpg"
related_posts = [
  "blog/2026-01-11-mcp-giving-your-ai-agent-the-right-context.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2018-06-04-clean-architecture.md",
]
+++

Most people use AI coding assistants as a single conversation partner. You open a chat, describe what you need, and get an answer. It works. But it's like hiring one generalist to handle everything: frontend, backend, testing, documentation, deployment. No real team works that way.

The real leverage comes when you organize AI as a team: onboarding, standard procedures, specialists, and parallel execution.

In the [MCP post](/blog/mcp-giving-your-ai-agent-the-right-context/), I covered how to give your AI agent access to your environment. In [AI gives you speed, not quality](/blog/ai-gives-you-speed-not-quality/), why human judgment still matters. This post covers the missing piece: how to organize that access into a coordinated workflow.

<!-- more -->

## The onboarding doc

Every good team starts with onboarding. AI agents need the same.

### Project rules

In Claude Code, the `CLAUDE.md` file at the root of your project is the onboarding doc. The agent reads it every time it starts working: project structure, coding conventions, style guides, tool configurations.

But `CLAUDE.md` is just the entry point. You can split rules into focused files under `.claude/rules/`, each targeting specific parts of your codebase via glob patterns. The agent doesn't just know your conventions, it's constrained by them. Layer boundaries, naming patterns, dependency directions. All versioned alongside the code they protect. And since `.claude/` lives in the repo, every human teammate gets the same setup when they join the project.

{% deep_dive(title="Glob-targeted rules in practice") %}

- **`modules/*/Domain/**/*.php`**: No framework imports, no infrastructure dependencies, only plain PHP.
- **`modules/*/Infrastructure/**/*.php`**: Controllers stay thin, Eloquent models stay in their place.
- **`resources/js/**/*.tsx`**: Component conventions, TypeScript strictness, styling patterns.

Each rule file is scoped to the files it cares about. Domain rules don't fire when editing a controller.

{% end %}

### Personal preferences

There's also a global `~/.claude/CLAUDE.md` that applies across all your projects. Commit message conventions, communication style, formatting habits. The project file says _how this codebase works_. The global file says _how I work_.

> A well-written CLAUDE.md is like a good onboarding doc. The better it is, the less you repeat yourself.

## Standard operating procedures

Every team has recurring workflows that live in wikis, runbooks, or someone's head. When they live in someone's head, they're fragile.

Custom slash commands in `.claude/commands/` turn these workflows into executable instructions. Each command is a markdown file describing a multi-step procedure. In one of my projects, every creation command starts with tests. TDD is baked into the procedure, not left to discipline.

{% deep_dive(title="Commands from a real project") %}

**Creation (TDD-first):**
- **`/create-module`**: Scaffolds a hexagonal module with domain, application, and infrastructure layers.
- **`/create-entity`**: Domain entities with value objects and test files.
- **`/create-use-case`**: Command/query handlers with mocked tests.
- **`/create-page`**: React pages with factories and smoke tests.

**Quality & workflow:**
- **`/refactor-check`**: Analyzes code against SOLID principles.
- **`/test`**: Runs the suite with module filtering.
- **`/fix`**: Auto-applies linting and static analysis corrections.
- **`/gh-issue`**: From GitHub issue to implementation to PR in one command.

{% end %}

The key insight: commands turn tribal knowledge into executable instructions. What used to be "ask Sarah how we set up a new module" becomes a command anyone can run, human or agent.

## Specialists, not generalists

Commands are _your_ procedures. They encode how your team does things. But there's another layer: skills and agents.

### Skills as knowledge bases

Skills are structured knowledge the agent can draw from. In one of my projects, I have skills for SOLID principles, hexagonal architecture, TDD workflows, and React/Inertia patterns.

Rules constrain: "don't do this, always do that." Skills teach: "here's the pattern, here's why, here are the common mistakes." Rules are guardrails. Skills are expertise.

### Agents as specialized roles

Instead of one generalist, you define specialized agents with a clear role, specific tools, and even a different model based on the complexity of their job. You don't need your most senior architect to rename a variable.

{% deep_dive(title="Agent roles from a real project") %}

- **Explorer** (lightweight model): Read-only reconnaissance. Searches the codebase, finds files, understands structure. Access to read and search tools, nothing else.
- **Clean code reviewer** (mid-tier model): Checks for SOLID violations, code smells, and naming inconsistencies. Read and grep access only.
- **TDD coach** (mid-tier model): Guides the red-green-refactor cycle. Can edit files and run tests.
- **React reviewer** (mid-tier model): Frontend patterns: component structure, TypeScript strictness, dark mode support, accessibility.
- **Domain architect** (most capable model): Complex architectural decisions, module boundaries, and DDD patterns.

{% end %}

> The right model for the right job. Fast and cheap for exploration. Capable and thorough for architecture.

## Let them work together

This is where the team metaphor becomes literal. A single agent following instructions is useful. Multiple agents working from a shared plan is a team.

### Subagents vs agent teams

Not all multi-agent setups are the same. There are two distinct coordination models, and choosing the right one matters.

**Subagents** run within a single session. They do focused work and report results back to the main agent. They can't talk to each other. The main agent manages everything.

**Agent teams** are different. Each teammate is a fully independent Claude Code session with its own context window. They communicate through a shared mailbox, claim tasks from a shared task list, and coordinate without going through a central bottleneck.

The architecture has four components:

- **Team lead**: the main session that creates the team and orchestrates work
- **Teammates**: separate Claude Code instances, each owning specific tasks
- **Task list**: shared work items with dependency tracking. Blocked tasks automatically unblock when dependencies complete
- **Mailbox**: direct messaging between agents, including broadcasts to the entire team

> Subagents are workers that report back. Agent teams are collaborators that think together.

Use subagents when only the result matters. Use agent teams when teammates need to share findings, challenge each other, and coordinate on their own.

### Getting started with agent teams

Agent teams are still experimental. Enable them by adding this to `~/.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Creating a team is conversational. Describe what you want: _"Create an agent team to refactor the auth module. Spawn three teammates: one for backend API changes, one for frontend components, one for writing tests."_ Claude sets up the task list, spawns the teammates, and coordinates their work.

You can view the team in-process (single terminal, navigate with Shift+Up/Down) or split across panes (each teammate in a separate tmux or iTerm2 window). Use Shift+Tab to activate delegate mode, which restricts the lead to coordination only.

**Token consumption warning.** Agent teams burn through tokens fast. Each teammate has its own context window, and every message between agents adds up. Start with research and review tasks before moving to implementation. Three teammates exploring in parallel costs roughly 3x. Make sure the parallelism pays for itself.

Teammates load your project context automatically (`CLAUDE.md`, MCP servers, skills) but don't inherit the lead's conversation history. When spawning a teammate, be specific about which files to focus on and what constraints apply. A vague spawn prompt produces vague work.

![blog-middle](/images/blog/2026-02-07/middle.jpg)

### Plan first, execute after

Good teams don't just start coding. They discuss the approach, identify dependencies, agree on a plan. Claude Code's plan mode works the same way.

You describe the problem. The agent explores the codebase, maps dependencies, and proposes an approach before changing anything. You approve, modify, or reject. Think first, code second.

With agent teams, **plan approval** lets you require teammates to design their approach before implementing. The teammate works in read-only mode until the lead approves. You can shape the lead's criteria: _"only approve plans that include test coverage"_ or _"reject plans that modify the database schema."_

**Delegate mode** restricts the lead to coordination only. Without it, the lead sometimes starts implementing instead of waiting for teammates. Delegate mode keeps it focused on orchestration, not execution.

### Competing hypotheses

This is the most compelling agent-team pattern for debugging. When the root cause is unclear, a single agent tends to find one plausible explanation and stop looking. Agent teams fight this by making teammates adversarial. Each one investigates its own theory while actively trying to disprove the others.

Sequential investigation suffers from anchoring: once one theory is explored, subsequent investigation is biased toward it. With multiple independent investigators challenging each other, the theory that survives is much more likely to be the actual root cause.

### Size tasks for parallel work

Not all work benefits from parallelism. The key question: can the teammates work independently?

- **Too small**: coordination overhead exceeds the benefit
- **Too large**: teammates work too long without check-ins, increasing wasted effort
- **Just right**: self-contained units that produce a clear deliverable. A function, a test file, a review

Having 5-6 tasks per teammate keeps everyone productive. Break the work so each teammate owns a different set of files. Two teammates editing the same file leads to overwrites. Clear ownership, no conflicts.

{% deep_dive(title="Backend + Frontend in parallel") %}

Say you're building a new feature that touches both backend and frontend. After planning:

- A **backend agent** scaffolds the domain layer: entities, value objects, repository interfaces, use case handlers. All following hexagonal architecture, all test-first.
- A **frontend agent** builds the React page, components, hooks, and factories. Each follows its own rules, draws from its own skills, and operates independently.

They don't step on each other because the plan already defined the boundaries. Clear ownership. No merge conflicts. No waiting.

{% end %}

### Review after execution

After implementation, review agents take over. Instead of one reviewer catching everything, you have specialists: SOLID violations, component patterns, test quality, module boundaries.

> A single agent is an assistant. Multiple agents working from a shared plan is a team.

## You are still the lead

No matter how well configured, the agents work for you. You set the standards, write the rules, review the plans, and approve the output before it ships. You can message any teammate mid-work to redirect their approach or add constraints. If someone's heading down the wrong path, you intervene directly.

As I wrote in [AI gives you speed, not quality](/blog/ai-gives-you-speed-not-quality/), the code the agent produces is your responsibility. Agents still make mistakes, context windows have limits, and coordination isn't perfect. More parallelism without oversight is just more chaos, faster.

### Quality gates

Hooks and git hooks act as the final safety net. In my setup, nothing gets committed unless the full suite is green and coverage is above 90%. The agent doesn't get to skip this. Neither does anyone else.

Agent teams add their own hooks: `TeammateIdle` keeps idle teammates working, `TaskCompleted` prevents premature task completion. Automated policies no team member can bypass.

{% deep_dive(title="Hooks, permissions, and guardrails") %}

Git hooks run linters, static analysis, and tests before every commit. Claude Code adds its own hooks (`.claude/hooks/`): shell commands that trigger on agent events like tool calls or file writes.

`.claude/settings.json` controls what agents can execute. Whitelist specific tools and commands, deny destructive operations. You control not just what agents know (rules, skills) but what they can do (permissions). Rules set the culture. Permissions set the boundaries.

{% end %}

### The foundation matters

The agents will help you get there faster, but "there" has to be well-defined. If you don't know what hexagonal architecture looks like, agents won't discover it for you.

You don't build all of this on day one. You start with a `CLAUDE.md`. Then you notice you're repeating instructions, so you write a command. An agent breaks a convention, so you add a rule. Reviews take too long, so you create a reviewer agent. The setup grows organically from real friction, not from upfront design. Each addition solves a problem you actually had. Same with agent teams: start with tasks that don't require writing code. Review a PR from multiple angles, research a library, investigate a bug. Learn the coordination model before throwing parallel implementation at it.

If you want a starting point, I put together [laravel-claude-toolkit](https://github.com/Chemaclass/laravel-claude-toolkit): a Laravel starter kit with rules, commands, skills, agents, hooks, and permissions already configured. Use it as a reference or fork it for your own setup.

> You're not just using AI. You're building a team. And like any team, the quality of its output reflects the quality of its leadership.

## Resources

- [Claude Code: Agent Teams](https://code.claude.com/docs/en/agent-teams)
- [Claude Code Tips: Workflow Boosters](https://lacsw.github.io/rfrolov.me/en/blog/claude-code-tips)

![blog-footer](/images/blog/2026-02-07/footer.jpg)
