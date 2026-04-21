+++
title = "Skills Over Agents"
description = "Why Claude Code skills beat specialized agents. On-demand context, not the model, decides quality. Build a skill library that travels with your code."
draft = true
[taxonomies]
tags = [ "ai", "software", "craftsmanship", "productivity", "developer-tools" ]
[extra]
subtitle = "Intelligence without expertise is entertainment"
static_thumbnail = "/images/blog/placeholder.jpg"
series = "ai"
series_order = 6
related_posts = [
  "blog/2026-04-17-inside-the-claude-folder.md",
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

People compare coding agents. Claude Code, Codex, Gemini CLI. Which one is smarter, faster, cheaper. Benchmarks refresh every month.

Wrong question.

After a year wiring agents into real projects, the biggest lever wasn't the agent. It was the skills I wrote for it.

<!-- more -->

{{ youtube(id="CEvIs9y1uog") }}

## Agents are commodities

Every coding agent has the same shape. A language model, a runtime, filesystem access. Read, reason, write. General purpose is the point.

Two teams use the same agent. One ships clean, tested code. The other ships confident-looking garbage. Same model. Different teaching.

> The model is the engine. Skills are the map. Without a map, a powerful engine gets you lost faster.

## Intelligence is not expertise

Who handles your taxes? A 300 IQ genius who never read tax law, or an accountant with 20 years of filings?

An accountant knows which deductions apply, which filings your business needs, which mistakes get flagged. Not intelligence. Expertise.

AI agents have the same gap. A model reasons about code and writes solutions. It doesn't know your hexagonal layers. It doesn't know domain entities must never import framework code. It doesn't know every feature starts with a failing test.

Skills close that gap.

## Skills load context on demand

A skill is a markdown file in `.claude/skills/`. A procedure, a pattern, a slice of domain knowledge. Plain markdown with frontmatter.

The key is how they load. The agent reads only names and descriptions at startup. Pulls the full skill when a task matches. Follows links to references only when depth is needed.

That on-demand loading is what makes skills scale. Twenty skills cost almost nothing until one fits the task. Specialized agents, by contrast, carry their full instructions every time they run. More agents, more fixed cost.

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

![blog-middle](/images/blog/placeholder.jpg)

## Skills vs specialized agents

I covered [specialized agents](/blog/inside-the-claude-folder/#agents-specialized-roles) already: isolated workers with their own prompt and tool set. Great for parallel work and clean context boundaries.

But specialized agents are coarse. One agent, one role, one fixed prompt. If you want three kinds of review quality, you either write three agents or stuff one agent with everything.

Skills are finer. One agent, many skills. The right skill loads for the task. Context stays small. Quality stays high.

Rule of thumb:

- Use a **skill** when you need a procedure or pattern. SOLID review, TDD loop, migration checklist.
- Use an **agent** when you need isolation. Long explorations, parallel tasks, jobs with their own budget.

Most needs are skills, not agents.

> Agents give you speed. Skills give you quality. If you must pick one first, pick skills.

## Skills are your moat

Models improve every month. This year's best is next year's baseline. The major families converge. Better tool shows up, you switch.

Your skills don't switch with the tool. They encode your domain, conventions, architecture. They live in your repo. They travel with your code. Point a new model at the library, productive day one.

> The agent is replaceable. Your skills are not.

## Start with the first repeated prompt

You don't need 20 skills on day one. Zero. Then one.

The signal is repetition. The second time you type the same context, that's a skill waiting. Extract it into a markdown file. Next session, the agent knows.

Don't write from scratch. Ask the agent: _"Read this project and draft a minimal code review skill based on what you see."_ It scans, picks up conventions, drafts v1. Then you adjust. Add what it missed. Cut what doesn't apply. Sharpen the description.

The second skill usually comes from a mistake. Agent breaks a convention. Write a skill that teaches the correct approach. It won't happen again.

Skills compound. Each one raises the floor. A markdown file, maybe 50 lines. Permanent payoff.

People who don't write skills keep re-explaining what they "really want." Every session from zero. Not a tool problem. A knowledge management problem.

> Write the skill once. Every session after that starts where the last one ended.
