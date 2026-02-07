+++
title = "Build Your Own Team of Agents"
description = "Most people use AI as a single assistant. The real leverage comes when you organize it into a team: onboarding docs, standard procedures, specialists, and parallel execution."
draft = false
[taxonomies]
tags = [ "ai", "developer-tools", "craftsmanship" ]
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

The real leverage comes when you stop treating AI as one assistant and start organizing it as a team. A team with an onboarding doc that sets expectations, standard procedures for recurring tasks, specialists for different domains, and the ability to work on multiple things in parallel.

In the [MCP post](/blog/mcp-giving-your-ai-agent-the-right-context/), I covered how to give your AI agent access to your environment. In [AI gives you speed, not quality](/blog/ai-gives-you-speed-not-quality/), I covered why human judgment still matters. This post covers the missing piece: how to organize that access into a coordinated workflow.

<!-- more -->

## The onboarding doc

Every good team starts with onboarding. AI agents need the same.

### Project rules

In Claude Code, the `CLAUDE.md` file at the root of your project is the onboarding doc. The agent reads it every time it starts working: project structure, coding conventions, style guides, tool configurations.

But `CLAUDE.md` is just the entry point. You can split rules into focused files under `.claude/rules/`, each targeting specific parts of your codebase via glob patterns. The agent doesn't just know your conventions, it's constrained by them. Layer boundaries, naming patterns, dependency directions. All versioned alongside the code they protect.

{% deep_dive(title="Glob-targeted rules in practice") %}

- **`modules/*/Domain/**/*.php`**: Domain layer stays pure: no framework imports, no infrastructure dependencies, only plain PHP.
- **`modules/*/Infrastructure/**/*.php`**: Controllers stay thin, Eloquent models stay in their place.
- **`resources/js/**/*.tsx`**: React component conventions, TypeScript strictness, styling patterns.

Each rule file is scoped to the files it cares about. Domain rules don't fire when editing a controller. Frontend rules don't fire when writing a use case handler.

{% end %}

### Personal preferences

There's also a global `~/.claude/CLAUDE.md` that applies across all your projects. Commit message conventions, communication style, formatting habits. The project file says _how this codebase works_. The global file says _how I work_.

> A well-written CLAUDE.md is like a good onboarding doc. The better it is, the less you repeat yourself.

## Standard operating procedures

Every team has recurring workflows that live in wikis, runbooks, or someone's head. When they live in someone's head, they're fragile.

Custom slash commands in `.claude/commands/` turn these workflows into executable instructions. Each command is a markdown file describing a multi-step procedure the agent follows. In one of my projects, every creation command starts with tests. TDD is baked into the procedure, not left to discipline. The full workflow, from ticket to PR, can happen in a single command.

{% deep_dive(title="Commands from a real project") %}

**Creation (TDD-first):**
- **`/create-module`**: Scaffolds a full hexagonal module with domain, application, and infrastructure layers.
- **`/create-entity`**: Generates domain entities with their value objects and test files.
- **`/create-use-case`**: Builds command/query handlers with proper mocked tests.
- **`/create-page`**: Creates React pages with factories and co-located smoke tests.

**Quality & workflow:**
- **`/refactor-check`**: Analyzes code against SOLID principles and clean code patterns.
- **`/test`**: Runs the suite with module filtering.
- **`/fix`**: Auto-applies linting and static analysis corrections.
- **`/gh-issue`**: Fetches an issue from GitHub, plans the implementation, executes it, and moves the card through the project board.

{% end %}

The key insight: commands turn tribal knowledge into executable instructions. What used to be "ask Sarah how we set up a new module" becomes a command anyone can run, human or agent.

![blog-middle](/images/blog/2026-02-07/middle.jpg)

## Specialists, not generalists

Commands are _your_ procedures. They encode how your team does things. But there's another layer: skills and agents.

### Skills as knowledge bases

Skills are structured knowledge the agent can draw from. The reference documentation a specialist carries in their head. In one of my projects, I have skills for SOLID principles, hexagonal architecture, TDD workflows, and React/Inertia patterns.

Rules constrain: "don't do this, always do that." Skills teach: "here's the pattern, here's why, here are the common mistakes." Rules are guardrails. Skills are expertise.

### Agents as specialized roles

This is where the team metaphor gets concrete. Instead of one generalist, you define specialized agents, each with a clear role, specific tools, and even a different model based on the complexity of their job. You don't need your most senior architect to rename a variable. And you don't want an intern designing your module boundaries.

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

### Plan first, execute after

Good teams don't just start coding. They discuss the approach, identify dependencies, agree on a plan. Claude Code's plan mode works the same way.

Think of it as a technical refinement session. You describe the feature or the problem. The agent explores the codebase, reads relevant files, maps dependencies, and proposes an approach before changing anything. You approve, modify, or reject it. Think first, code second. No more "I changed 15 files and hope it works."

### Parallel execution

Once there's a plan, independent tasks can run in parallel. Break the work down, assign it, let agents work without blocking each other.

{% deep_dive(title="Backend + Frontend in parallel") %}

Say you're building a new feature that touches both backend and frontend. After planning:

- A **backend agent** scaffolds the domain layer: entities, value objects, repository interfaces, use case handlers. All following hexagonal architecture, all test-first.
- A **frontend agent** builds the React page, components, hooks, and factories. Each follows its own rules, draws from its own skills, and operates independently.

They don't step on each other because the plan already defined the boundaries. The backend agent works within `modules/*/Domain/` and `modules/*/Application/`. The frontend agent works within `resources/js/pages/`. Clear ownership. No merge conflicts. No waiting.

{% end %}

### Review after execution

After implementation, the review agents take over. Instead of one reviewer catching everything, you have specialists: clean code reviewer for SOLID violations, React reviewer for component patterns, TDD coach for test quality, domain architect for module boundaries.

> A single agent is an assistant. Multiple agents working from a shared plan is a team.

## You are still the lead

No matter how well configured, the agents work for you. You set the standards, define the procedures, write the rules, review the plans, and approve the output before it ships.

The code the agent produces is your responsibility. More parallelism without oversight is just more chaos, faster.

### Quality gates

Hooks and git hooks act as the final safety net. Before any commit goes through, linters run, static analysis checks pass, tests execute, and code coverage stays above your threshold. In my setup, nothing gets committed unless the full suite is green and coverage is above 90%. The agent doesn't get to skip this. Neither does anyone else. All automated, all enforced, all reporting back to you.

### The foundation matters

The agents will help you get there faster, but "there" has to be well-defined. If you don't know what hexagonal architecture looks like, agents won't discover it for you. If you don't understand TDD, no command will make your tests meaningful. The investment is in the foundation: define your architecture, write your rules, encode your standards, build your commands. Then let the agents execute at speed without compromising the quality you defined.

> You're not just using AI. You're building a team. And like any team, the quality of its output reflects the quality of its leadership.

![blog-footer](/images/blog/2026-02-07/footer.jpg)
