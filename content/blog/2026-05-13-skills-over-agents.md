+++
title = "Skills Over Agents"
description = "Coding agents are general-purpose by design. What makes an agent excel isn't intelligence. It's the domain knowledge you give it. Skills are that knowledge."
draft = true
[taxonomies]
tags = [ "ai", "software", "craftsmanship" ]
[extra]
subtitle = "Intelligence without expertise is entertainment"
static_thumbnail = "/images/blog/placeholder.jpg"
series = "ai"
series_order = 6
related_posts = [
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2026-01-11-mcp-giving-your-ai-agent-the-right-context.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2018-06-04-clean-architecture.md",
]
+++

![cover](/images/blog/placeholder.jpg)

Everyone is comparing agents. Claude Code vs Codex vs Gemini CLI. Which one writes better code, which one understands larger codebases, which one is faster. Benchmarks refresh every month and leaderboards shift every quarter.

It's the wrong question.

I've spent the last year building agent setups for real projects: [context pipelines](/blog/mcp-giving-your-ai-agent-the-right-context/), [multi-agent teams](/blog/build-your-own-team-of-agents/), [project configurations](/blog/inside-the-claude-folder/). The single most impactful thing I've done isn't choosing the right agent. It's building the right skills.

<!-- more -->

## Agents are commodities

Every coding agent follows the same pattern: a language model coupled to a runtime with filesystem access. Claude Code, Codex CLI, Gemini Code Assist. Different brands, same architecture. A model that reads your code, reasons about it, and writes changes.

General purpose is the whole point. You can throw any codebase at any of these agents and they'll adapt. Python, PHP, TypeScript, Rust. Monolith, microservices, hexagonal architecture. They'll figure it out.

Two teams using the same agent get wildly different results. One produces clean, tested, well-structured code. The other produces confident-looking garbage that breaks under pressure. The difference isn't intelligence. Both agents are equally capable. The difference is what each team taught their agent about how they work.

> The model is the engine. Skills are the map. Without a map, a powerful engine just gets you lost faster.

## The tax accountant problem

Who would you trust with your taxes? Someone with a 300 IQ who has never seen tax legislation, or an experienced accountant who has been doing it for 20 years?

Intelligence without expertise is entertainment. It might produce something that looks right. But it won't survive contact with reality. An accountant doesn't just know math. They know which deductions apply to your situation, which filings your business type requires, which mistakes the tax office flags. That's not general intelligence. It's domain expertise.

AI agents have the same gap. A model can reason about code structure and generate solutions. But it doesn't know your team uses hexagonal architecture with strict layer boundaries. It doesn't know your domain entities must never import framework code. It doesn't know every new feature starts with a failing test.

Skills close that gap.

> Expertise packaged into files is productivity. Intelligence left generic is potential that never converts.

## What skills look like

A skill is a markdown file inside `.claude/skills/`. It describes a procedure, a set of patterns, or a body of domain knowledge. No framework, no SDK. Markdown with frontmatter.

The key mechanism is progressive disclosure. The agent doesn't load every skill into memory at startup. It reads names and descriptions first. When a task is relevant, it pulls the full skill. When it needs more depth, it follows links to reference files. Zero context waste.

This matters because every token costs money. Context windows are finite and every extra token loaded is time and budget spent. A skill with a clear description and a proper glob pattern means the agent reads it only when working on matching files. Twenty skills with vague descriptions and no targeting means the agent loads context it doesn't need, on every task.

> Good descriptions and targeted paths aren't polish. They're cost control.

{% deep_dive(title="A real-world skill example") %}

```
.claude/skills/
  code-review/
    SKILL.md              # main instructions
    reference/
      solid-checklist.md  # detailed SOLID examples
      test-patterns.md    # test quality guidelines
```

The `SKILL.md`:

```markdown
---
description: "Review code changes for SOLID violations, test quality, and architecture alignment"
allowed-tools: Read, Grep, Glob
argument-hint: "[file or PR]"
---

# Code Review

Review code changes against project conventions.

## Steps

1. Read the diff or specified files
2. Check architecture: domain layer has no framework imports, infrastructure stays thin
3. Check SOLID principles (see reference/solid-checklist.md for patterns)
4. Check test quality: tests verify behavior, not implementation details
5. Flag issues with the specific principle violated and a suggested fix

## Output

For each issue found:
- File and line
- What's wrong (which principle or convention)
- What the fix looks like
```

The agent sees `"Review code changes for SOLID violations..."` in the skill list. When you ask for a review, it loads `SKILL.md`. If it needs to check a specific SOLID pattern, it reads the reference file. Two levels of knowledge, loaded on demand.

{% end %}

In [Inside the .claude Folder](/blog/inside-the-claude-folder/), I covered how skills compare to rules and raw prompting. The short version: raw prompts are improvised every time. Rules constrain what the agent must not do. Skills teach what the agent should know.

![blog-middle](/images/blog/placeholder.jpg)

## One agent, many skills

In [Build Your Own Team of Agents](/blog/build-your-own-team-of-agents/), I wrote about organizing agents into specialized roles: an explorer, a reviewer, a TDD coach, an architect. I still use that pattern. Agents multiply speed by running work in parallel with the right model for each task.

But within each role, skills are what make the agent effective. A reviewer agent without skills catches surface-level issues: unused variables, duplicated logic. A reviewer agent with your SOLID conventions, your architecture boundaries, and your test quality standards catches what matters in your project.

Agents control the shape of the work: who does what, with which tools, at which cost. Skills control the quality: what "good" looks like in your specific context.

> Agents give you speed. Skills give you quality. If you had to invest in one first, pick skills.

A single agent with a rich skill library will outperform a fleet of specialized agents that have no domain knowledge.

## Skills are your moat

Models improve every month. Today's best model is next quarter's baseline. Claude, Codex, Gemini: they converge. As I wrote in [Idealism vs Pragmatism](/blog/idealism-vs-pragmatism/), I have no loyalty to a brand. If something better shows up, I switch.

What doesn't change when you switch: your skills.

Skills encode your domain knowledge, your conventions, your architectural decisions. That belongs to you, not to any model provider. It lives in your repo. It travels with your code. When a new model comes out, you point it at the same skill library and it's immediately productive.

> The agent is replaceable. Your skills are not.

## Start with the first repeated prompt

You don't need 23 skills on day one. You need zero. Then you need one.

The signal is repetition. The moment you type the same context for the second time, that's a skill waiting to be written. Extract it into a markdown file. Next session, the agent already knows.

You don't even need to write it from scratch. Ask the agent itself: _"Read this project and create a minimal code review skill based on what you see."_ It will scan your codebase, pick up conventions, and draft a first version. From there, you adjust. Add what it missed. Remove what doesn't apply. Sharpen the descriptions. The agent gives you the starting point. You shape it into something that reflects how your team actually works.

The second skill often comes from a mistake. The agent breaks a convention or generates code that doesn't match your patterns. Write a skill that teaches the correct approach. Now it won't happen again, in any future session, for any teammate.

Skills compound. Each one raises the floor for every future interaction. A markdown file, maybe 50 lines. The payoff is permanent.

But be mindful as the library grows. Every skill with a vague description or no file targeting adds noise. The agent has to read through more metadata to decide what's relevant, burning tokens on every session. Keep descriptions specific. Use glob patterns to scope skills to the files they apply to. A well-organized skill library of 20 targeted skills costs less per session than 5 broad ones that load everywhere.

People who don't write skills keep explaining what they "really want" over and over. Every new session starts from zero. That's not a tool problem. It's a knowledge management problem.

> Write the skill once. Every agent session after that starts where the last one ended.

## Related

### Related posts

- [Inside the .claude Folder](/blog/inside-the-claude-folder/)
- [@internal-link Build Your Own Team of Agents](@/blog/2026-02-07-build-your-own-team-of-agents.md)
- [@internal-link MCP: Giving Your AI Agent the Right Context](@/blog/2026-01-11-mcp-giving-your-ai-agent-the-right-context.md)
- [@internal-link AI Gives You Speed, Not Quality](@/blog/2025-10-10-ai-gives-you-speed-not-quality.md)
- [@internal-link Idealism vs Pragmatism](@/blog/2026-03-01-idealism-vs-pragmatism.md)

### Related readings

- [@internal-link Extreme Programming Explained](@/readings/2020-03-05-extreme-programming-explained.md)
- [@internal-link Clean Architecture](@/readings/2018-06-04-clean-architecture.md)

![blog-footer](/images/blog/placeholder.jpg)
