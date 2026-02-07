+++
title = "MCP: Giving your AI agent the right context"
description = "Model Context Protocol is reshaping how AI coding agents interact with your development environment. Understanding why it matters helps you use AI tools more effectively."
draft = false
[taxonomies]
tags = [ "ai", "software-architecture", "developer-tools", "craftsmanship" ]
[extra]
subtitle = "Why context is the real superpower"
static_thumbnail = "/images/blog/2026-01-11/cover.jpg"
related_posts = [
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
  "blog/2022-10-08-different-beliefs-about-software-quality.md",
  "blog/2023-04-14-introducing-a-new-tech-stack.md",
]
related_readings = [
  "readings/2018-06-04-clean-architecture.md",
  "readings/2020-03-05-extreme-programming-explained.md",
]
+++

Modern AI coding assistants are remarkably good at understanding context. Models like Claude Opus with large context windows (~200k tokens) can hold substantial portions of your codebase in mind, reason about architecture, and maintain coherence across long conversations. Not the entire project for large codebases, but enough to work effectively.

But understanding isn't the same as access.

The AI can reason about your database schema if you paste it. It can suggest changes to files you share. It knows patterns from code you show it. The limitation isn't intelligence. It's reach.

That's where MCP comes in.

<!-- more -->

## What MCP enables

Modern AI can understand your codebase when you share it. But understanding and acting are different things.

Many IDE-integrated assistants like VS Code Copilot or Cursor already access your project files through their own indexing. So file access itself isn't new. What MCP brings is standardization. Instead of each tool building its own integration, MCP provides a common protocol. You configure a server once, and any MCP-compatible client can use it. It's portable, configurable, and extends beyond just files to databases, APIs, and custom tools.

> MCP turns AI from a conversation partner into an active participant in your development environment.

With MCP, you give the AI direct access to tools and resources. It can read files, run commands, query databases, fetch documentation. The intelligence was always there. MCP gives it hands.

## What MCP actually is

MCP is a protocol, not a product. It's an open standard that defines how AI agents can connect to external data sources and tools. Think of it as a bridge between the AI model and your development environment.

The architecture is simple: MCP servers expose capabilities, and AI clients consume them. Claude Desktop and Claude Code officially support MCP, with more tools adopting the protocol as it matures.

For example, in Claude Code you can add servers to a `.mcp.json` file at your project root. Claude Code reads this file when you open the project and starts the configured servers automatically:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "your-token" }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "DATABASE_URL": "postgresql://localhost/mydb" }
    }
  }
}
```

Each server gives the AI different capabilities:

- **filesystem**: Read and navigate your project files. The AI can explore your codebase, check existing patterns, and understand your directory structure before suggesting changes.
- **github**: Access issues, pull requests, and repository metadata. Ask the AI to summarize open issues, check PR comments, or understand what your team is working on.
- **postgres**: Query your database directly. The AI can inspect your schema, run read queries, and understand your data model without you copying table definitions.

Different tools, same protocol. You configure once, and any MCP-compatible client can use these servers.

## Where MCP shines

### Working with your codebase

The most immediate benefit is filesystem access. The AI can navigate your project, read source files, understand your directory structure. When it suggests code, it can check existing patterns first.

Git integration takes this further. The AI can see your commit history, understand what changed recently, and suggest modifications that align with how your codebase evolves.

Database schema access means the AI understands your data model. No more explaining table relationships or column types. It sees the structure and generates queries that actually work.

### Documentation and knowledge

Connect your internal documentation and the AI becomes aware of your team's decisions. API specifications, architecture documents, coding guidelines. All available as context.

This is where MCP starts feeling different. The AI isn't just generating generic code anymore. It's generating code that fits your project.

> The best AI assistance comes from understanding not just what you're building, but how your team builds it.

### External integrations

GitHub integration means the AI can read issues, understand PR discussions, and see the broader context of what your team is working on. Slack or other communication tools can provide even more context about ongoing decisions.

Custom integrations let you connect internal tools specific to your workflow. The protocol is extensible by design.

## Using MCP effectively

MCP amplifies whatever it connects to. If your documentation is outdated, the AI will use outdated information. If your codebase is messy, the AI will learn messy patterns.

This is the mirror effect I mentioned in [AI gives you speed, not quality](/blog/ai-gives-you-speed-not-quality). The AI reflects the context you give it. Good context produces useful output. Bad context produces confident-sounding garbage.

> Giving AI access to your codebase doesn't replace your responsibility to maintain it. It makes good hygiene more valuable.

A few practices that help:

- **Connect only what the AI needs.** More context isn't always better. Focused context is better.
- **Keep your documentation current.** If the AI reads your docs, those docs matter more than before.
- **Review your MCP configuration periodically.** As your project evolves, so should your context setup.
- **Start small.** One or two servers. See what works. Expand from there.

Security matters too. Be intentional about what you expose. MCP servers can access sensitive information. Treat them like any other access control decision.

## What comes next

MCP is the foundation. But the ecosystem is building on top of it.

**Agentic workflows.** Tools like Claude Code and Cursor now run in "agent mode" where the AI autonomously plans and executes multi-step tasks. It reads files, makes changes, runs tests, fixes errors. MCP servers are the hands. The agent loop is the brain deciding what to do next.

**Skills and custom commands.** Claude Code introduced skills. Custom slash commands that chain MCP tools into reusable workflows. `/deploy`, `/test`, `/review`. You define them once, and they become part of your development toolkit.

**A2A Protocol.** Google's Agent-to-Agent protocol. While MCP connects AI to tools, A2A connects AI agents to each other. Multiple specialized agents collaborating on complex tasks. One agent writes code, another reviews it, a third runs tests.

The pattern is clear: AI is moving from assistant to collaborator. From answering questions to executing workflows. MCP gave AI access to your environment. What's next is AI that knows how to use that access autonomously.

> The question is shifting from "what can AI access?" to "what should AI decide on its own?"

Human judgment doesn't disappear. It moves upstream. Instead of reviewing every line the AI writes, we design the context and boundaries that shape what it produces.

That's still our job. And it's a job worth doing well.

![cover](/images/blog/2026-01-11/footer.jpg)

