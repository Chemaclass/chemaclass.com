+++
title = "agnostic-ai: Shared Instructions for Coding Tools"
description = "I built a command that generates each coding tool's instruction files from shared Markdown and YAML sources."
template = "page.html"
+++

# agnostic-ai: shared instructions for coding tools

I created and maintain [agnostic-ai](https://github.com/Chemaclass/agnostic-ai). It generates the files AI coding tools read from instructions kept in one place.

## The problem

Claude Code reads `CLAUDE.md`. Codex reads `AGENTS.md`. Other tools have their own files and settings. A project using several tools can end up with copies of the same instructions.

When a test command or project rule changes, each copy needs an update. Editing those copies by hand leaves room for tools to receive different instructions.

## The decision

I made the tool-specific files generated output. The project keeps its shared instructions in Markdown and YAML under `.agnostic-ai/`. Running `agnostic-ai sync` writes the files each selected tool reads.

The source stays in the repository alongside the code. You can review an instruction change in a PR and use it without an account or a hosted service.

I also added a preview and a check. `agnostic-ai sync --plan` shows the proposed changes. `agnostic-ai sync --check` checks whether the generated files match their source.

## The result

The [documented setup](https://github.com/Chemaclass/agnostic-ai#quickstart) shows a project using Claude Code and Codex. After a sync, the shared instructions are in `AGENTS.md`, and `CLAUDE.md` points to it. A developer edits the source and runs the same command for the selected tools.

This website uses that setup for its project rules and writing guides. The [source configuration](https://github.com/Chemaclass/chemaclass.com/tree/main/.agnostic-ai) is part of the repository.

The generated files give each tool the same project instructions. The tool and model still determine how they follow them.

[Read the setup guide](https://agnostic-ai.org/docs/getting-started/) or [browse the source](https://github.com/Chemaclass/agnostic-ai).
