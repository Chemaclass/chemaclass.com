+++
title = "MCP: Giving Your AI Agent the Right Context"
description = "Model Context Protocol is reshaping how AI coding agents interact with your development environment. Understanding why it matters helps you use AI tools more effectively."
draft = false
[taxonomies]
tags = [ "ai", "software-architecture", "developer-tools", "craftsmanship" ]
[extra]
subtitle = "Why context is the real superpower in AI-assisted development"
static_thumbnail = "/images/blog/2026-01-11/cover.jpg"
+++

Modern AI coding assistants are remarkably good at understanding context. Models like Claude Opus can hold your entire project in mind, reason about architecture, and maintain coherence across long conversations.

But understanding isn't the same as access.

The AI can reason about your database schema if you paste it. It can suggest changes to files you share. It knows patterns from code you show it. The limitation isn't intelligence. It's reach.

That's where MCP comes in.

<!-- more -->

## What MCP enables

Modern AI can understand your codebase when you share it. But understanding and acting are different things.

Without MCP, the AI can only work with what you paste into the conversation. It can reason about your database schema, but it can't query it. It can suggest file changes, but it can't read the current state of your project. It can discuss your git history, but it can't see it.

> MCP turns AI from a conversation partner into an active participant in your development environment.

With MCP, you give the AI direct access to tools and resources. It can read files, run commands, query databases, fetch documentation. The intelligence was always there. MCP gives it hands.

## What MCP actually is

MCP is a protocol, not a product. It's an open standard that defines how AI agents can connect to external data sources and tools. Think of it as a bridge between the AI model and your development environment.

The architecture is simple: MCP servers expose capabilities, and AI clients consume them. Many tools already support MCP. Claude Desktop, Claude Code, Cursor, and others can connect to MCP servers you configure.

For example, in Claude Code you can add servers to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
    }
  }
}
```

This tells Claude Code to spawn a filesystem server pointing to your project root. Now the AI can read and navigate your files directly.

Different tools, same protocol. That's the point. You configure once, and any MCP-compatible client can use it.

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

MCP is still evolving. New servers appear regularly. Capabilities expand. The ecosystem is young but growing.

What interests me is the shift in thinking. We've spent years learning to prompt well. Now we're learning to provide context well. It's a different skill.

> We've moved from asking "how do I phrase this prompt?" to "what does the AI need to know?" That's progress.

As AI agents become more autonomous, context becomes even more critical. It's not just about giving information, it's about setting boundaries. What should the AI see? What should it ignore? What patterns should it follow?

Human judgment doesn't disappear. It moves upstream. Instead of reviewing every line the AI writes, we design the context that shapes what it produces.

That's still our job. And it's a job worth doing well.

![cover](/images/blog/2026-01-11/footer.jpg)

---

## Related

### Related posts

- [AI gives you speed, not quality](/blog/ai-gives-you-speed-not-quality) <small>The human factor in the age of vibe-coding</small>
- [Different beliefs about software quality](/blog/different-beliefs-about-software-quality) <small>Thoughts about software quality among your team</small>
- [Introducing a new tech stack](/blog/introducing-a-new-tech-stack) <small>How to introduce new technologies in your team</small>

### Related readings

- [Clean Architecture](/readings/clean-architecture/) <small>A Craftsman's Guide to Software Structure and Design</small>
- [Extreme Programming Explained](/readings/extreme-programming-explained/) <small>Embrace Change</small>
