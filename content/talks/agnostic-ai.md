+++
title = "agnostic-ai"
description = "One spec, every AI CLI. Write your rules, skills, agents, hooks and MCP servers once, and sync them to the native files that 25 AI coding tools actually read."
weight = 1
[taxonomies]
tags = [ "agnostic-ai", "developer-tools", "ai", "open-source" ]
[extra]
subtitle = "One spec, every AI CLI"
project_url = "https://github.com/Chemaclass/agnostic-ai"
slides = "/slides/agnostic-ai/"
+++

Your team uses Claude Code, a colleague prefers Cursor, and the new hire opens Codex. Same repository, same conventions, three copies of the rules that drift apart within a week. Worse, your rules can stop being read without anything failing: most tools look for the first file they recognise and stop there, so a teammate adding a second tool is enough to silence everything you wrote.

agnostic-ai keeps one source of truth instead. You write rules, skills, agents, hooks, MCP servers and commands once under `.agnostic-ai/`, and one sync command writes the native files each tool actually reads. We go from an empty repository to a synced setup live, and then we look at what the vendors get wrong: precedence lists that silently shadow your rules, legacy filenames that still win over the new ones, and paths that no vendor document ever named.

<!-- more -->

---

- 2026-09-15 | ACT Berlin #14 [**Berlin, Germany**] (EN)
  - [One spec, every AI CLI](https://luma.com/act14)
