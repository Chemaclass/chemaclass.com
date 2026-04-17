+++
title = "Skills Over Agents"
description = "Coding agents are general-purpose by design. What makes one excel isn't the model. It's the domain knowledge you give it. Skills encode that."
draft = true
[taxonomies]
tags = [ "ai", "software", "craftsmanship", "productivity", "developer-tools" ]
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

Everyone compares agents. Claude Code vs Codex vs Gemini CLI. Which writes better code, handles bigger codebases, runs faster. Benchmarks refresh monthly. Leaderboards shift quarterly.

Wrong question.

I spent the last year wiring agents into real projects: [context pipelines](/blog/mcp-giving-your-ai-agent-the-right-context/), [multi-agent teams](/blog/build-your-own-team-of-agents/), [project configurations](/blog/inside-the-claude-folder/). Biggest lever wasn't picking the right agent. It was writing the right skills.

<!-- more -->

## Agents are commodities

Every coding agent is the same shape: a language model on a runtime with filesystem access. Claude Code, Codex CLI, Gemini Code Assist. Different brands, same architecture. Read, reason, write.

General purpose is the point. Any codebase, any stack — Python, PHP, TypeScript, Rust. Monolith, microservices, hexagonal. They adapt.

Two teams, same agent, different results. One ships clean, tested code. The other ships confident-looking garbage. Same intelligence. Different teaching.

> The model is the engine. Skills are the map. Without a map, a powerful engine gets you lost faster.

## The tax accountant problem

Who handles your taxes? A 300 IQ genius who never read tax law, or an accountant with 20 years of filings?

Intelligence without expertise is entertainment. Looks right until reality hits. An accountant knows which deductions apply, which filings your business needs, which mistakes get flagged. Not intelligence. Expertise.

AI agents have the same gap. A model reasons about code and writes solutions. It doesn't know your hexagonal layers. It doesn't know domain entities must never import framework code. It doesn't know every feature starts with a failing test.

Skills close that gap.

> Expertise packaged into files is productivity. Intelligence left generic is potential that never converts.

## What skills look like

A skill is a markdown file in `.claude/skills/`. A procedure, a pattern, a slice of domain knowledge. No framework, no SDK. Markdown with frontmatter.

Progressive disclosure. Agent doesn't load every skill at startup. Reads names and descriptions first. Pulls the full skill when a task matches. Follows links to references only when depth is needed. Zero context waste.

Tokens cost money. Context windows are finite. A clear description plus a glob pattern loads the skill only when relevant files are touched. Vague descriptions load noise on every task.

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

Agent sees the description in the skill list. Ask for a review, it loads `SKILL.md`. Needs a SOLID pattern, reads the reference. Two levels, on demand.

{% end %}

In [Inside the .claude Folder](/blog/inside-the-claude-folder/), I compared skills to rules and prompts. Short version: prompts are improvised. Rules constrain. Skills teach.

![blog-middle](/images/blog/placeholder.jpg)

## One agent, many skills

In [Build Your Own Team of Agents](/blog/build-your-own-team-of-agents/), I split agents into roles: explorer, reviewer, TDD coach, architect. Still use it. Agents run work in parallel with the right model per task.

Skills do the work inside each role. A reviewer without skills catches surface issues: unused variables, duplicated logic. A reviewer with your SOLID conventions, architecture boundaries, and test standards catches what matters.

Agents shape the work: who, what, which tools, what cost. Skills shape quality: what "good" means in your context.

> Agents give you speed. Skills give you quality. If you pick one first, pick skills.

A single agent with a rich skill library beats a fleet of specialized agents with none.

## Skills are your moat

Models improve monthly. Today's best is next quarter's baseline. Claude, Codex, Gemini: they converge. As I wrote in [Idealism vs Pragmatism](/blog/idealism-vs-pragmatism/), I have no brand loyalty. Better tool shows up, I switch.

What doesn't change on switch: your skills.

Skills encode your domain, conventions, architecture. Yours, not the provider's. Lives in your repo. Travels with your code. Point a new model at the library, productive day one.

> The agent is replaceable. Your skills are not.

## Start with the first repeated prompt

You don't need 23 skills on day one. Zero. Then one.

Signal is repetition. Second time you type the same context, that's a skill waiting. Extract into a markdown file. Next session, agent knows.

Don't write from scratch. Ask the agent: _"Read this project and draft a minimal code review skill based on what you see."_ It scans, picks up conventions, drafts v1. Then you adjust. Add what it missed. Cut what doesn't apply. Sharpen descriptions. Agent gives the starting point. You shape it.

Second skill usually comes from a mistake. Agent breaks a convention. Write a skill that teaches the correct approach. Won't happen again — any session, any teammate.

Skills compound. Each one raises the floor. A markdown file, maybe 50 lines. Permanent payoff.

Watch the library as it grows. Vague descriptions and untargeted paths burn tokens every session. Keep descriptions specific. Scope with glob patterns. Twenty targeted skills cost less than five broad ones loaded everywhere.

People who don't write skills keep re-explaining what they "really want." Every session from zero. Not a tool problem. Knowledge management problem.

> Write the skill once. Every session after that starts where the last one ended.

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
