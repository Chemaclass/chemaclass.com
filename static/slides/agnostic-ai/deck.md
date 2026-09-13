---
marp: true
theme: default
paginate: true
size: 16:9
title: "One spec, every AI CLI"
description: "What an AI coding agent setup is for, why it drifts when you switch tools, and how one spec keeps the workflow across 25 AI CLIs."
author: "Chemaclass"
keywords: "agnostic-ai, Claude Code, Codex, Gemini CLI, Copilot, AGENTS.md, skills, developer tools"
url: "https://chemaclass.com/slides/agnostic-ai/"
footer: 'One spec, every AI CLI · @Chemaclass'
style: |
  /* ============================================================
     Theme mirrors the agnostic-ai project site (dark, warm).
     Tokens lifted from docs/site/index.html dark mode.
     ============================================================ */
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

  :root {
    --paper: #14120f; --surface: #1c1917;
    --ink: #f2ede5; --soft: #cec6ba; --muted: #9c9082;
    --line: #302a24; --accent: #f0a35e; --warn: #ef8f74; --good: #a9c77e;
    --mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
    --sans: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, sans-serif;
  }
  section {
    background-color: var(--paper);
    background-image:
      radial-gradient(880px 420px at 4% -16%, rgba(168,72,26,.34), rgba(20,18,15,0) 64%),
      linear-gradient(to right, rgba(240,163,94,.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(240,163,94,.04) 1px, transparent 1px);
    background-size: 100% 100%, 80px 80px, 80px 80px;
    color: var(--ink);
    font-family: var(--mono);
    font-size: 24px; line-height: 1.5; letter-spacing: -.005em;
    padding: 56px 70px !important;
    display: flex !important; flex-direction: column !important;
    justify-content: flex-start !important; align-items: stretch;
  }
  h1 { color: var(--ink); font-weight: 700; font-size: 76px; line-height: 1.04; letter-spacing: -.035em; margin: 0; }
  h2 { color: var(--ink); font-weight: 700; font-size: 46px; line-height: 1.08; letter-spacing: -.03em; margin: 0 0 .35em; }
  h1 .g, h2 .g, .g { color: var(--accent); }
  p { margin: .5em 0; font-family: var(--sans); color: var(--soft); }
  strong { color: var(--ink); font-weight: 600; }
  a { color: var(--accent); text-decoration: none; }
  code { background: rgba(240,163,94,.1); color: var(--accent); padding: .1em .35em; border-radius: 4px; font-size: .9em; }
  footer { color: var(--muted); font-size: 14px; bottom: 16px; font-family: var(--mono); }
  section::after { color: var(--muted); font-weight: 500; font-family: var(--mono); }
  section.lead { justify-content: center !important; }

  .kicker { display: inline-flex; align-items: center; gap: 10px; text-transform: uppercase;
    letter-spacing: .18em; font-size: 14px; color: var(--muted); margin-bottom: 26px; }
  .kicker::before { content: ''; width: 8px; height: 8px; border-radius: 999px; background: var(--accent); }
  .lede { font-family: var(--sans); font-size: 22px; color: var(--soft); margin-top: 22px; }
  .small { font-family: var(--sans); font-size: 18px; color: var(--muted); margin-top: 14px; }
  .good { color: var(--good); } .warn { color: var(--warn); }

  .card { background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 18px 22px; }
  .cards { display: flex; flex-direction: column; gap: 12px; }
  .cards .label { font-size: 13px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); }
  .cards .body { font-family: var(--sans); font-size: 21px; line-height: 1.4; color: var(--ink); margin-top: 6px; }
  .cards .name { font-size: 22px; font-weight: 700; min-width: 160px; }
  .row { display: flex; gap: 20px; align-items: baseline; }

  .grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 44px; }
  .split { display: grid; grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr); gap: 32px; align-items: start; }
  .beat { display: flex; gap: 18px; align-items: baseline; padding: 12px 0; border-bottom: 1px solid var(--line); }
  .beat i { font-style: normal; color: var(--muted); min-width: 34px; font-size: 18px; }
  .beat span { font-family: var(--sans); font-size: 21px; color: var(--soft); }
  .beat.hot span { color: var(--ink); } .beat.hot i { color: var(--accent); }
  .map { display: flex; align-items: baseline; gap: 16px; padding: 10px 0; border-bottom: 1px solid var(--line); }
  .map b { font-family: var(--sans); font-weight: 400; font-size: 19px; color: var(--soft); min-width: 240px; }
  .map span { font-size: 18px; color: var(--ink); }
  .rank { display: flex; align-items: baseline; gap: 14px; padding: 7px 0; border-bottom: 1px solid var(--line); font-size: 17px; }
  .rank i { font-style: normal; color: var(--muted); min-width: 20px; }
  .rank em { font-style: normal; margin-left: auto; font-family: var(--sans); font-size: 17px; color: var(--soft); }
  .rank.hit span, .rank.hit em { color: var(--accent); }
  .rank.dead span, .rank.dead em { color: var(--warn); }

  .flow { display: grid; grid-template-columns: minmax(0,1fr) 130px minmax(0,1fr); gap: 16px; align-items: center; }
  .flow .arrow { text-align: center; color: var(--muted); font-size: 15px; }
  .flow .arrow b { display: block; color: var(--accent); font-size: 32px; font-weight: 400; margin-top: 6px; }
  .out { display: flex; align-items: center; gap: 10px; padding: 9px 14px; border: 1px solid var(--line);
    border-radius: 9px; background: var(--surface); font-size: 17px; color: var(--soft); }
  .out i { font-style: normal; color: var(--good); }
  .out.accent { border-color: var(--accent); color: var(--accent); }
  .stack { display: flex; flex-direction: column; gap: 9px; }

  .chips { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-top: 26px; }
  .chip { padding: 10px 14px; border: 1px solid var(--line); border-radius: 999px; text-align: center;
    font-family: var(--sans); font-size: 17px; color: var(--soft); }
  .chip.accent { border-color: var(--accent); color: var(--accent); }
  .prompt { display: inline-flex; align-items: center; gap: 14px; padding: 14px 26px; border: 1px solid var(--line);
    border-radius: 12px; background: var(--surface); font-size: 26px; margin-top: 22px; }
  .prompt i { font-style: normal; color: var(--accent); }
  .brand { display: flex; align-items: center; gap: 13px; margin-bottom: 30px; }
  .brand .mark { width: 42px; height: 42px; border-radius: 11px; background: var(--accent); color: #14120f;
    display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 23px; }
  .brand .name { font-weight: 700; font-size: 21px; }
  .meta { display: flex; gap: 34px; margin-top: 34px; font-size: 17px; color: var(--muted); }
  .tree { font-family: var(--mono); font-size: 18px; line-height: 1.6; color: var(--soft); white-space: pre; }
  .tree b { color: var(--accent); font-weight: 500; }
  .tree em { font-style: normal; color: var(--muted); }
  .port { display: grid; grid-template-columns: minmax(0,1fr) 44px minmax(0,1fr); align-items: baseline;
    padding: 11px 0; border-bottom: 1px solid var(--line); font-size: 19px; }
  .port span { color: var(--soft); }
  .port span.g { color: var(--accent); }
  .port b { color: var(--muted); font-weight: 400; text-align: center; }
  .port em { display: inline-block; min-width: 150px; font-style: normal; font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); }
  .beat span strong { font-weight: 600; }
  .vs { display: grid; grid-template-columns: minmax(0,1.35fr) minmax(0,1fr) minmax(0,1fr); padding: 6px 22px; }
  .vs > div { padding: 6px 10px; border-bottom: 1px solid var(--line); font-size: 18px; }
  .vs > div:nth-last-child(-n+3) { border-bottom: 0; }
  .vs .h { font-size: 13px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); }
  .vs .k { font-family: var(--sans); color: var(--soft); }
  .closing { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; gap: 40px; }
  .qa { font-size: 150px; font-weight: 700; line-height: 1; letter-spacing: .02em;
    color: transparent; -webkit-text-stroke: 2px var(--accent); padding-right: 10px; }
  pre { background: var(--surface) !important; border: 1px solid var(--line); border-radius: 12px;
    padding: 16px 22px !important; margin: 14px 0 !important; font-size: 19px; line-height: 1.5; }
  pre code, pre code * { background: none !important; color: var(--ink) !important; padding: 0; font-size: 1em; }
  pre code .hljs-comment, pre code .hljs-meta { color: var(--muted) !important; }
  pre code .hljs-attr, pre code .hljs-string, pre code .hljs-built_in { color: var(--accent) !important; }
---

<!-- _class: lead -->
<!-- _paginate: false -->

<div class="brand"><span class="mark">a</span><span class="name">agnostic-ai</span></div>

# One spec,<br><span class="g">every AI CLI.</span>

<p class="lede">What your AI setup is for, why it drifts, and how to keep the workflow when you change the tool.</p>

<div class="meta">
  <span>github.com/Chemaclass/agnostic-ai</span>
</div>

<!--
0:30 · Name yourself, not the tool. The tool comes much later. Ask for hands: who used more than one AI coding tool this year? Keep your hand up if it was in the same repo. Do not comment, move on.
-->

---

<div class="kicker">Part 1 · The workflow</div>

## What do you want<br>from an agent?

<div class="beat"><i>01</i><span>It follows <strong>our conventions</strong>, not the internet's.</span></div>
<div class="beat"><i>02</i><span>It <strong>never does the dangerous thing</strong>. Not even once.</span></div>
<div class="beat"><i>03</i><span>It runs <strong>the boring checks</strong>. Every time.</span></div>
<div class="beat"><i>04</i><span>It repeats <strong>a workflow</strong> the same way we do.</span></div>
<div class="beat hot"><i>05</i><span>It <strong>reaches our systems</strong>: tickets, docs, databases.</span></div>

<!--
1:00 · Ask the question to the room before showing the list. Take two or three answers. Then reveal: most of what they said is here. This is the frame for the whole talk. We care about outcomes. The files come second.
-->

---

<div class="kicker">Part 1 · The workflow</div>

## Every outcome has a part.

<div class="card">
  <div class="map"><b>Follow our conventions</b><span>instructions · CLAUDE.md, AGENTS.md</span></div>
  <div class="map"><b>Respect the guardrails</b><span>rules · scoped by path</span></div>
  <div class="map"><b>Never the dangerous thing</b><span>permissions · allow and deny</span></div>
  <div class="map"><b>Run the checks, always</b><span>hooks · commands on events</span></div>
  <div class="map"><b>Repeat a workflow</b><span>skills · procedures on demand</span></div>
  <div class="map"><b>Take a focused role</b><span>agents · their own context</span></div>
  <div class="map" style="border-bottom:0;"><b>Reach our systems</b><span>MCP servers · tools and data</span></div>
</div>

<!--
1:00 · Read the left column, then the right. Seven parts, and every AI coding tool has some version of each. Names differ, the jobs do not. Next three slides: what each part is good at, in one sentence.
-->

---

<div class="kicker">Part 1 · The workflow</div>

## Instructions and rules<br>are <span class="g">hints</span>.

<div class="split">
<div class="card tree"><b>AGENTS.md</b>
<em>always loaded</em>
We use conventional commits.
Tests live next to the code.
&nbsp;
<b>rules/payments.md</b>
<em>loaded in services/payments/</em>
Money is integer cents. Never floats.</div>
<div>
  <p class="lede" style="margin-top:0;">The model reads them. It follows them most of the time.</p>
  <p class="lede">Keep them short. Every line competes for attention with the task itself.</p>
</div>
</div>

<!--
1:00 · Instructions are the always-on context. Rules are the same idea, loaded only where they matter, so the payments rules stay out of the frontend work. The key word is hints. The model can ignore them, and on a long session it sometimes does.
-->

---

<div class="kicker">Part 1 · The workflow</div>

## Hooks and permissions<br>are <span class="g">not suggestions</span>.

<div class="split" style="grid-template-columns:1fr 1fr;">
<div class="card">
  <div class="label">A hint</div>
  <div class="stack" style="margin-top:12px; font-family:var(--sans); font-size:21px; color:var(--soft);">
    <div>"Please run the formatter after editing."</div>
    <div>"Do not read the .env file."</div>
    <div class="warn">Followed most of the time.</div>
  </div>
</div>
<div class="card">
  <div class="label">A hook, a permission</div>
  <div class="stack" style="margin-top:12px; font-family:var(--sans); font-size:21px; color:var(--soft);">
    <div>After every edit, the formatter runs.</div>
    <div>Reading .env is denied.</div>
    <div class="good">Every time. No model involved.</div>
  </div>
</div>
</div>

<p class="lede">If it must happen, do not ask for it. Make it a hook.</p>

<!--
1:00 · The most important slide of part 1. Hooks are commands the tool runs on events: before a tool call, after an edit, at the end of a session. Permissions decide what the agent may touch at all. Neither depends on the model paying attention. Remember this, it comes back when we talk about drift.
-->

---

<div class="kicker">Part 1 · The workflow</div>

## Skills get things done.<br>Agents take a role.

<div class="cards">
  <div class="card row"><div class="name g">skills</div><div class="body" style="margin-top:0;">A procedure the agent loads when the task matches. <em>Write the release notes. Add a migration.</em></div></div>
  <div class="card row"><div class="name g">agents</div><div class="body" style="margin-top:0;">A role with its own context and tools. A reviewer that only reads. A researcher that only searches.</div></div>
  <div class="card row"><div class="name g">MCP</div><div class="body" style="margin-top:0;">The door to your systems. Tickets, docs, the staging database.</div></div>
</div>

<p class="small">The whole Claude version, explained: chemaclass.com/blog/inside-the-claude-folder</p>

<!--
1:00 · Skills are how the team's way of working becomes repeatable. Agents keep a side task out of the main context. MCP gives both of them reach. This is where most of the real investment goes: weeks of skills tuned to your codebase.
-->

---

<div class="kicker">Part 1 · The workflow</div>

## Yours, or the team's?

<div class="split" style="grid-template-columns:1fr 1fr;">
<div class="card">
  <div class="label">Global · your home folder</div>
  <div class="stack" style="margin-top:12px; font-family:var(--sans); font-size:21px; color:var(--soft);">
    <div>How you like your commits</div>
    <div>Your personal skills</div>
    <div>Follows you into every repo</div>
  </div>
</div>
<div class="card">
  <div class="label">Repo · committed</div>
  <div class="stack" style="margin-top:12px; font-family:var(--sans); font-size:21px; color:var(--soft);">
    <div>Team conventions and guardrails</div>
    <div>Hooks everyone must run</div>
    <div class="g">Reviewed in PRs, like code</div>
  </div>
</div>
</div>

<p class="lede">Anything the team depends on belongs in the repo.</p>

<!--
0:40 · Last piece of the map. Two levels. A hook that lives only in your home folder protects only you. Now we have the words. Let's see what happens to all of this when you change tools.
-->

---

<div class="kicker">Part 2 · The drift</div>

## One file became a folder.

<div class="split">
<div>
  <div class="beat"><i>01</i><span>Copilot first. One instructions file. Easy.</span></div>
  <div class="beat"><i>02</i><span>Then Claude Code. Rules, skills, agents, hooks, MCP.</span></div>
  <div class="beat hot"><i>03</i><span>Claude's layout. Claude's names. Claude's formats.</span></div>
</div>
<div class="card tree"><b>CLAUDE.md</b>
.mcp.json
<b>.claude/</b>
├── rules/
├── skills/
├── agents/
└── settings.json  <em>hooks, permissions</em></div>
</div>

<!--
0:50 · Everyone in the room has lived this. Part 1's seven parts, now in one tool's folder. The point to land: all that value lives in a folder only one tool reads.
-->

---

<!-- _class: lead -->

<div class="kicker">Part 2 · The drift</div>

# Then Claude<br><span class="g warn">gets expensive.</span>

<p class="lede">So you move to Gemini CLI. It ignores CLAUDE.md and your .claude/ folder. You start again with GEMINI.md.</p>

<!--
0:30 · No numbers. Everyone has their own pricing story, let them fill it in. Land the loss: weeks of skills and hooks, and the new tool reads none of it.
-->

---

<div class="kicker">Part 2 · The drift</div>

## A colleague tries Codex.<br>So you port everything.

<div class="card" style="margin-top:14px;">
  <div class="port"><span><em>instructions</em> CLAUDE.md</span><b>&#8594;</b><span class="g">AGENTS.md</span></div>
  <div class="port"><span><em>skills</em> .claude/skills/</span><b>&#8594;</b><span class="g">.agents/skills/</span></div>
  <div class="port"><span><em>agents</em> .claude/agents/</span><b>&#8594;</b><span class="g">.codex/agents/*.toml</span></div>
  <div class="port"><span><em>hooks</em> settings.json</span><b>&#8594;</b><span class="g">.codex/hooks.json</span></div>
  <div class="port" style="border-bottom:0;"><span><em>MCP</em> .mcp.json</span><b>&#8594;</b><span class="g">.codex/config.toml</span></div>
</div>

<p class="small">Not a copy. A translation. Agents become TOML. Hooks change shape.</p>

<!--
1:00 · Walk two rows, not five. Point at the labels: these are the parts from part 1. Instructions and skills copy over. Agents and hooks need translating. An afternoon of careful work, correct on the day you finish it.
-->

---

<div class="kicker">Part 2 · A month later</div>

## Keep both copies.<br>Then they drift.

<div class="beat"><i>01</i><span>Claude gets cheaper again. Half the team goes back.</span></div>
<div class="beat"><i>02</i><span>New skills land in .agents/skills/. Only there.</span></div>
<div class="beat"><i>03</i><span>A new formatter hook lands in .codex/hooks.json. Only there.</span></div>
<div class="beat hot"><i>04</i><span class="warn">Claude has never seen a month of skills, and never runs the hook.</span></div>

<p class="lede">No error. No warning. Same repo, different agents, different outcomes.</p>

<!--
1:00 · Nobody wants to throw away the work, so both copies stay. Read the beats as a timeline. Pause on 04 and call back to the hooks slide: a hook was the thing that must happen. On half the team it silently stopped happening. That is what drift costs. Not files. Outcomes.
-->

---

<div class="kicker">Part 2 · Today</div>

## Nobody designed this.<br><span class="g">It piled up.</span>

<div class="split">
<div class="card tree">CLAUDE.md
AGENTS.md
GEMINI.md
.github/copilot-instructions.md
<b>.claude/</b>   <em>rules, skills, agents, hooks</em>
<b>.agents/</b>   <em>skills</em>
<b>.codex/</b>    <em>agents, hooks, MCP</em>
<b>.gemini/</b>   <em>settings, commands</em></div>
<div>
  <p class="lede" style="margin-top:0;">Four tools. Eight places. Every copy is one more place to forget an update.</p>
  <p class="lede">And next month someone tries Cursor. Or whatever ships on Tuesday.</p>
</div>
</div>

<!--
0:50 · Let them scan the tree. Everyone recognises their own repo. No tool made a bad choice. Each picked its own layout, and your repo collected all of them.
-->

---

<!-- _class: lead -->

<div class="kicker">Part 3 · One source</div>

# What if you kept<br><span class="g">one directory</span><br>for every tool?

<p class="lede">Written once. Owned by no tool. Each CLI still gets the files it expects.</p>

<!--
0:30 · The question part 3 answers. Say it slowly, then stop for two seconds. Someone in the room is already thinking: symlinks.
-->

---

<div class="kicker">Part 3 · The obvious fix</div>

## Keep .agents/ as the source.<br>Symlink the rest.

```bash
ln -s AGENTS.md CLAUDE.md
ln -s ../.agents/skills .claude/skills
```

<div class="split" style="grid-template-columns:1fr 1fr;">
<div class="card">
  <div class="label">Works for</div>
  <div class="stack" style="margin-top:12px; font-family:var(--sans); font-size:20px; color:var(--soft);">
    <div class="good">Instructions: same Markdown, other name</div>
    <div class="good">Skills: same SKILL.md</div>
    <div class="good">Nothing to install, nothing to run</div>
  </div>
</div>
<div class="card">
  <div class="label">Breaks on</div>
  <div class="stack" style="margin-top:12px; font-family:var(--sans); font-size:20px; color:var(--soft);">
    <div class="warn">Agents: Markdown for Claude, TOML for Codex</div>
    <div class="warn">Hooks and MCP: other files, other schemas</div>
    <div class="warn">Windows, where links check out as text</div>
  </div>
</div>
</div>

<p class="small">The hints link fine. The guarantees need translation.</p>

<!--
0:50 · Take the idea seriously, most teams try it first, and it is half right. Notice which half breaks: agents and hooks, the parts that do the work. A link cannot translate. Windows: git with core.symlinks=false checks a link out as a text file holding the path.
-->

---

<div class="kicker">Part 3 · The trade-off</div>

## Symlinks share bytes.<br><span class="g">Sync writes the right ones.</span>

<div class="card vs">
  <div class="h"></div><div class="h">symlinks</div><div class="h">sync</div>
  <div class="k">Same format in two tools</div><div class="good">yes</div><div class="good">yes</div>
  <div class="k">Agents, hooks, MCP per tool</div><div class="warn">no</div><div class="good">translated</div>
  <div class="k">Drift check in CI</div><div class="warn">no</div><div class="good">sync --check</div>
  <div class="k">Windows</div><div class="warn">plain text files</div><div class="good">real files</div>
  <div class="k">Setup</div><div class="good">nothing to install</div><div class="warn">one binary</div>
  <div class="k">Fresh clone</div><div class="good">ready</div><div class="warn">needs sync, or a hook</div>
</div>

<p class="small">If all your tools read the same format, use symlinks. Sync uses them too, where they are safe.</p>

<!--
1:00 · Be fair. Symlinks win the last two rows. They lose the moment a second format shows up, and a broken link never tells you. sync.shared-skills links skill folders whose bytes match.
-->

---

<div class="kicker">Part 3 · How it works</div>

## One spec. One command. Native files.

<div class="flow">
<div class="card">
  <div class="g">.agnostic-ai/</div>
  <div class="stack" style="margin-top:14px; font-size:18px; color:var(--soft);">
    <div>AGNOSTIC_AI.md</div><div>rules/ · skills/ · agents/</div><div>hooks/ · settings/</div><div>mcps/</div>
  </div>
</div>
<div class="arrow">agnostic-ai<br>sync<b>&#8594;</b></div>
<div class="stack">
  <div class="out"><i>ok</i>CLAUDE.md · .claude/</div>
  <div class="out"><i>ok</i>AGENTS.md · .agents/ · .codex/</div>
  <div class="out"><i>ok</i>GEMINI.md · .gemini/</div>
  <div class="out"><i>ok</i>.github/instructions/</div>
  <div class="out accent">25 targets in total</div>
</div>
</div>

<p class="small">Left: the parts from part 1, written once. Right: what each tool reads, generated.</p>

<!--
0:50 · One sentence per column. The left side is the map from part 1. The right side is every folder from part 2. You edit the left. Then: let me show you, two minutes.
-->

---

<!-- _class: lead -->

<div class="kicker">Part 3 · Live</div>

# Demo

<div class="prompt"><i>$</i>agnostic-ai sync</div>

<div class="chips">
  <div class="chip">init: claude, codex</div>
  <div class="chip">sync, walk the tree</div>
  <div class="chip accent">hand-edit, --check fails</div>
</div>

<!--
2:30 · Terminal font 20pt or larger. Prepare the repo before the talk: git init, agnostic-ai init (claude, codex), one rule, one skill already written. Live:
agnostic-ai sync
tree -a -I .git   (point at .claude/ and .agents/, same skill, both tools)
echo "hand edit" >> AGENTS.md
agnostic-ai sync --check   (exit 1, drift)
agnostic-ai sync && agnostic-ai sync --check   (green)
If anything hangs past ten seconds, skip to the backup recap slide. The check is the beat that matters.
-->

---

<div class="kicker">Part 3 · Should you use it</div>

## One tool, working alone?<br>You do not need this.

<div class="split" style="grid-template-columns:1fr 1fr; margin-top:10px;">
<div class="card">
  <div class="label">Pays off when</div>
  <div class="stack" style="margin-top:12px; font-family:var(--sans); font-size:20px; color:var(--soft);">
    <div class="good">A second tool or person joins the repo</div>
    <div class="good">Hooks and agents must work in every tool</div>
    <div class="good">You review AI config in one place</div>
    <div class="good">The next switch is one line in targets:</div>
  </div>
</div>
<div class="card">
  <div class="label">Costs you</div>
  <div class="stack" style="margin-top:12px; font-family:var(--sans); font-size:20px; color:var(--soft);">
    <div class="warn">One more binary and one more step</div>
    <div class="warn">Outputs are overwritten, edit the spec</div>
    <div class="warn">Support varies by tool and part</div>
    <div class="warn">Bad rules reach every tool just as fast</div>
  </div>
</div>
</div>

<!--
1:10 · Lead with the disqualifier, loudly. That is what makes the rest credible. Write CLAUDE.md and go home. Then both columns, quickly. The last con matters most: sync spreads a bad rule as fast as a good one. The spec still needs review.
-->

---

<div class="kicker">Before Q&amp;A</div>

## Questions for you.

<div class="beat"><i>01</i><span>Which of your rules <strong>should be a hook</strong>?</span></div>
<div class="beat"><i>02</i><span>What belongs in <strong>your home folder</strong>, and what in the repo?</span></div>
<div class="beat"><i>03</i><span>Which of your skills would <strong>survive a tool switch</strong>?</span></div>
<div class="beat hot"><i>04</i><span>What should <strong>never be shared</strong> across tools?</span></div>

<!--
1:00 · Read them, do not answer them. These are the questions I want back from the room. Every answer tells me what the spec should cover next. Leave this up for a few seconds before the closing slide.
-->

---

<!-- _class: lead -->
<!-- _paginate: false -->

<div class="closing">
<div>
  <div class="brand"><span class="mark">a</span><span class="name">agnostic-ai</span></div>
  <h1>Change the tool.<br><span class="g">Keep the workflow.</span></h1>
  <div class="meta"><span>github.com/Chemaclass/agnostic-ai</span></div>
</div>
<div class="qa">Q&amp;A</div>
</div>

<!--
0:20 · Call back to the first question: what do you want from an agent? That does not change when the tool does. Say the playground is linked from the repo, no install needed. Then ask for questions and leave this slide up. Backup slides follow for CI, monorepos, imports and hooks.
-->

---

<!-- _class: lead -->
<!-- _paginate: false -->

<div class="kicker">Backup</div>

# For the questions.

<p class="lede">Import, scope, global, CI, git hooks, day to day.</p>

<!--
Only shown when a question needs it. Jump straight to the matching slide.
-->

---

<div class="kicker">Backup · Demo recap</div>

## Two specs in. Ten native files out.

<div class="split">
<div class="card tree"><em>you write</em>
<b>.agnostic-ai/</b>
├── AGNOSTIC_AI.md
├── rules/conventional-commits.md
└── skills/write-tests.md
agnostic-ai.yaml</div>
<div class="card tree" style="font-size:15px;"><em>sync writes</em>
CLAUDE.md · AGENTS.md · GEMINI.md
.claude/rules/conventional-commits.md
.claude/skills/write-tests/SKILL.md
.agents/skills/write-tests/SKILL.md
.gemini/skills/write-tests/SKILL.md
.github/copilot-instructions.md
.github/instructions/conventional-commits.instructions.md
.github/skills/write-tests/SKILL.md</div>
</div>

<p class="small">Codex and Gemini have no rules folder. The rule goes inside AGENTS.md and GEMINI.md instead.</p>

<!--
Fallback if the demo failed. The shared .agents/skills/ tree is the one Codex reads. Same folder from the story, now generated.
-->

---

<div class="kicker">Backup · Best practices</div>

## Treat the spec like code.

<div class="beat"><i>01</i><span><strong>Commit the source.</strong> .agnostic-ai/ and agnostic-ai.yaml. Review specs in PRs.</span></div>
<div class="beat"><i>02</i><span><strong>Edit the spec, never the output.</strong> The next sync overwrites it.</span></div>
<div class="beat"><i>03</i><span><strong>Pick only the tools you use.</strong> The targets: list in agnostic-ai.yaml.</span></div>
<div class="beat"><i>04</i><span><strong>Preview first.</strong> sync --dry-run before the first real sync.</span></div>
<div class="beat hot"><i>05</i><span><strong>Choose where outputs live.</strong> Ignored by default, so a fresh clone runs sync.</span></div>

<!--
The last one is a real choice: ignored outputs keep the repo clean, committed outputs work for people without the CLI. The CI setup depends on it.
-->

---

<div class="kicker">Backup · Already have .claude/?</div>

## Import it. Do not start over.

```bash
agnostic-ai init --from claude     # or codex, gemini, all
agnostic-ai sync --dry-run
agnostic-ai sync --backup          # .bak before overwriting
agnostic-ai revert                 # changed your mind
```

<p class="lede">The Codex port from part 2, done in four commands. Your skills, agents and hooks move into .agnostic-ai/ once.</p>

<p class="small">Review the imported specs before the first sync. Import from several tools, and the last one wins the shared instructions.</p>

<!--
That afternoon of translation is now one import. Say the review warning out loud, it is the one people skip.
-->

---

<div class="kicker">Backup · Scope</div>

## Rules that live next to the code.

```bash
agnostic-ai new rule payments-context --scope services/payments
```

<div class="card">
  <div class="map"><b>Claude Code</b><span>.claude/rules/services/payments/payments-context.md</span></div>
  <div class="map"><b>Codex</b><span>services/payments/AGENTS.md</span></div>
  <div class="map"><b>Gemini CLI</b><span>services/payments/GEMINI.md</span></div>
  <div class="map" style="border-bottom:0;"><b>Copilot</b><span>applyTo: "services/payments/**"</span></div>
</div>

<p class="small">Claude and Gemini load it when they touch those files. Codex loads it when launched there.</p>

<!--
One spec, four scoping mechanisms. Be honest about Codex: it walks from the repo root down to the directory you launched it in, once per run. Start it at the root and the payments AGENTS.md never loads. Copilot applies applyTo in VS Code, JetBrains, the cloud agent and Copilot CLI, not in github.com chat. Aider, Zed, Junie, Crush, Jules and Antigravity skip scoped rules; their root rules still work. Worth it in monorepos, skip it in small repos.
-->

---

<div class="kicker">Backup · Global</div>

## Your personal rules, on every project.

<div class="split">
<div class="card tree"><b>~/.agnostic-ai/</b>
├── AGNOSTIC_AI.md
├── rules/
├── hooks/
└── skills/</div>
<div>

```bash
agnostic-ai sync --global
```

<p class="lede" style="margin-top:8px;">User-level files for 22 of the 25 tools. Works from any directory.</p>
</div>
</div>

<p class="small">Instructions, rules, hooks and skills only. Team conventions stay in the repo.</p>

<!--
The "yours or the team's" slide, as a command.
-->

---

<div class="kicker">Backup · CI</div>

## Drift fails the build.

<div class="split" style="grid-template-columns:1fr 1fr;">
<div class="card">
  <div class="label">Outputs committed</div>
  <div class="stack" style="margin-top:12px; font-size:19px;">
    <div class="g">agnostic-ai sync --check</div>
    <div style="font-family:var(--sans); color:var(--soft);">Non-zero exit on any missing or edited file.</div>
  </div>
</div>
<div class="card">
  <div class="label">Outputs ignored</div>
  <div class="stack" style="margin-top:12px; font-size:19px;">
    <div class="g">agnostic-ai validate<br>agnostic-ai sync</div>
    <div style="font-family:var(--sans); color:var(--soft);">A fresh checkout has nothing to compare.</div>
  </div>
</div>
</div>

```yaml
- uses: chemaclass/agnostic-ai-action@v1
  with:
    command: check
```

<!--
Committed outputs: check, never sync right before it, that would erase the evidence. Ignored outputs: validate and generate. The action installs the binary for you. Add --format=github for inline annotations.
-->

---

<div class="kicker">Backup · Git hooks</div>

## Sync on every branch switch.

```bash
agnostic-ai install-hook --shared   # pre-commit runs sync --check
```

```sh
#!/bin/sh
# .git/hooks/post-checkout
[ "$3" = "1" ] || exit 0   # branch switch, not a file checkout
agnostic-ai sync
```

<p class="lede">post-checkout fires on checkout, clone and worktree add. A new worktree opens with its AI config ready.</p>

<!--
Two hooks, two jobs. pre-commit catches drift before CI does. post-checkout matters when outputs are ignored: switch branches and the files follow. It saves agents running in fresh worktrees.
-->

---

<div class="kicker">Backup · Day to day</div>

## Know where every file came from.

<div class="card">
  <div class="map"><b>sync --watch</b><span>re-syncs while you edit specs</span></div>
  <div class="map"><b>status</b><span>specs, targets, last sync</span></div>
  <div class="map"><b>why &lt;file&gt;</b><span>the spec and adapter behind any output</span></div>
  <div class="map"><b>doctor</b><span>missing and stale files, MCP binaries on PATH</span></div>
  <div class="map" style="border-bottom:0;"><b>packs add</b><span>share specs across repos, pinned by version</span></div>
</div>

<!--
why is the favourite: point at any generated file and get the spec that wrote it.
-->
