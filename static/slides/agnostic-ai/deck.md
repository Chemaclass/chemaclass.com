---
marp: true
theme: default
paginate: true
size: 16:9
title: "One spec, every AI CLI"
description: "You start on Copilot, move to Claude Code, try Gemini and Codex, and end up with the same AI config in four places. How agnostic-ai keeps one spec for 25 AI coding tools."
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
  .beat span strong { font-weight: 600; }
  .vs { display: grid; grid-template-columns: minmax(0,1.35fr) minmax(0,1fr) minmax(0,1fr); padding: 6px 22px; }
  .vs > div { padding: 6px 10px; border-bottom: 1px solid var(--line); font-size: 18px; }
  .vs > div:nth-last-child(-n+3) { border-bottom: 0; }
  .vs .h { font-size: 13px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); }
  .vs .k { font-family: var(--sans); color: var(--soft); }
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

<p class="lede">A story about switching AI tools, and the config you leave behind.</p>

<div class="meta">
  <span>github.com/Chemaclass/agnostic-ai</span>
</div>

<!--
0:30 · Name yourself, not the tool. The tool comes later. Ask for hands: who used more than one AI coding tool this year? Keep your hand up if it was in the same repo. Do not comment, move on.
-->

---

<div class="kicker">Part 1 · The story</div>

## It starts with Copilot.

<div class="split">
<div>
  <div class="beat"><i>01</i><span>Autocomplete in the editor. It feels like magic.</span></div>
  <div class="beat"><i>02</i><span>You write down a few team conventions for it.</span></div>
  <div class="beat hot"><i>03</i><span>One file. Easy to keep up to date.</span></div>
</div>
<div class="card tree"><em>your-repo/</em>
└── .github/
    └── <b>copilot-instructions.md</b></div>
</div>

<!--
0:40 · Everyone in the room has lived this part. Keep it short and warm. One file, one tool, no problem yet.
-->

---

<div class="kicker">Part 1 · The story</div>

## Then you find Claude Code.

<p class="lede">An agent in the terminal. It reads the repo, runs the tests, opens the PR.</p>

<div class="split">
<div>
  <div class="beat"><i>01</i><span>The one file grows into a folder.</span></div>
  <div class="beat"><i>02</i><span>Rules, skills, agents, hooks, MCP servers.</span></div>
  <div class="beat hot"><i>03</i><span>Claude's layout. Claude's names. Claude's formats.</span></div>
</div>
<div class="card tree"><b>CLAUDE.md</b>
.mcp.json
<b>.claude/</b>
├── rules/
├── skills/
├── agents/
├── commands/
└── settings.json  <em>hooks</em></div>
</div>

<p class="small">The whole folder, explained: chemaclass.com/blog/inside-the-claude-folder</p>

<!--
1:00 · This is where you invest. Weeks of skills and agents, tuned to your codebase. Mention the post once for anyone who wants the details. The point to land: all of that value now lives in a folder only one tool reads.
-->

---

<!-- _class: lead -->

<div class="kicker">Part 1 · The story</div>

# Then Claude<br><span class="g warn">gets expensive.</span>

<p class="lede">So you move to Gemini CLI. It ignores CLAUDE.md and your .claude/ folder. You start again with GEMINI.md.</p>

<!--
0:30 · No numbers. Everyone has their own pricing story, let them fill it in. Land the loss: weeks of rules, skills and agents, and the new tool reads none of it.
-->

---

<div class="kicker">Part 1 · The story</div>

## A colleague tries Codex.<br>Same level as Claude.

<p class="lede">One problem. Codex does not read .claude/. So you port everything by hand.</p>

<div class="card" style="margin-top:14px;">
  <div class="port"><span>CLAUDE.md</span><b>&#8594;</b><span class="g">AGENTS.md</span></div>
  <div class="port"><span>.claude/skills/</span><b>&#8594;</b><span class="g">.agents/skills/</span></div>
  <div class="port"><span>.claude/agents/*.md</span><b>&#8594;</b><span class="g">.codex/agents/*.toml</span></div>
  <div class="port"><span>.claude/settings.json hooks</span><b>&#8594;</b><span class="g">.codex/hooks.json</span></div>
  <div class="port" style="border-bottom:0;"><span>.mcp.json</span><b>&#8594;</b><span class="g">.codex/config.toml</span></div>
</div>

<p class="small">Not a copy. A translation. Markdown agents become TOML. Hooks change shape.</p>

<!--
1:00 · Walk two rows, not five. Agents go from Markdown to TOML. Hooks move out of settings.json into their own file. This is an afternoon of careful work, and it is correct on the day you finish it.
-->

---

<!-- _class: lead -->

# What if we go<br>back to Claude?

<p class="lede">Nobody wants to throw away weeks of work. So you keep both copies.</p>

<!--
0:20 · Ask it as a real question to the room. Pause. Then the answer everyone picks: keep both.
-->

---

<div class="kicker">A month later</div>

## The two copies drift apart.

<div class="beat"><i>01</i><span>New skills land in .agents/skills/. Only there.</span></div>
<div class="beat"><i>02</i><span>The Claude plan gets cheaper again.</span></div>
<div class="beat"><i>03</i><span>Half the team prefers Claude. You allow both.</span></div>
<div class="beat hot"><i>04</i><span class="warn">Claude has never seen a month of new skills.</span></div>

<p class="lede">No error. No warning. Each agent answers with its own half of your conventions.</p>

<!--
1:00 · Read the four beats as a timeline. Pause on 04. The failure is silent: nothing breaks, the answers are just worse on one side of the team, and nobody knows why.
-->

---

<div class="kicker">Today</div>

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
  <p class="lede">And next month someone tries Grok. Or Cursor. Or whatever ships on Tuesday.</p>
</div>
</div>

<!--
0:50 · Let them scan the tree. Everyone recognises their own repo in it. No tool made a bad choice here. Each one picked its own layout, and your repo collected all of them.
-->

---

<!-- _class: lead -->

# What if you kept<br><span class="g">one directory</span><br>for every tool?

<p class="lede">Written once. Owned by no tool. Each CLI still gets the files it expects.</p>

<!--
0:30 · This is the question the whole talk answers. Say it slowly, then stop for two seconds. Someone in the room is already thinking: symlinks.
-->

---

<div class="kicker">The obvious fix</div>

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
    <div class="good">Skills: same SKILL.md, until a tool needs its own keys</div>
    <div class="good">Nothing to install, no step to run</div>
  </div>
</div>
<div class="card">
  <div class="label">Breaks on</div>
  <div class="stack" style="margin-top:12px; font-family:var(--sans); font-size:20px; color:var(--soft);">
    <div class="warn">Agents: Markdown for Claude, TOML for Codex</div>
    <div class="warn">Hooks and MCP: other files, other schemas</div>
    <div class="warn">Windows, where links check out as plain text</div>
  </div>
</div>
</div>

<p class="small">Half the problem, solved. The other half needs translation.</p>

<!--
0:50 · Take the idea seriously, it is what most teams try first, and it is half right. Instructions and skills link fine. Then point back at the Codex port slide: agents and hooks were a translation, not a copy. A link cannot translate. Windows: git with core.symlinks=false checks a link out as a text file holding the path.
-->

---

<div class="kicker">Symlinks or agnostic-ai</div>

## Symlinks share bytes.<br><span class="g">Sync writes the right ones.</span>

<div class="card vs">
  <div class="h"></div><div class="h">symlinks</div><div class="h">agnostic-ai</div>
  <div class="k">Same format in two tools</div><div class="good">yes</div><div class="good">yes</div>
  <div class="k">Agents, hooks, MCP per tool</div><div class="warn">no</div><div class="good">translated</div>
  <div class="k">Scoped rules</div><div class="warn">no</div><div class="good">native per tool</div>
  <div class="k">Drift check in CI</div><div class="warn">no</div><div class="good">sync --check</div>
  <div class="k">Windows, core.symlinks=false</div><div class="warn">plain text files</div><div class="good">real files</div>
  <div class="k">Lookup order (Zed, WARP.md)</div><div class="warn">your problem</div><div class="good">tracked per target</div>
  <div class="k">Setup</div><div class="good">nothing to install</div><div class="warn">one binary to install</div>
  <div class="k">Fresh clone</div><div class="good">ready</div><div class="warn">needs sync, or a hook</div>
</div>

<p class="small">Sync uses symlinks too, where they are safe: sync.shared-skills links skill folders whose bytes match.</p>

<!--
1:10 · Follow-up to the symlinks slide, and the first look at the tool. Do not explain scope or sync --check here, part 3 covers both. Be fair. Symlinks win the last two rows: nothing to install, nothing to run. If all your tools read the same format, use them. They lose the moment a second format shows up, and a broken link never tells you. Zed callback: the Copilot file from the story sits above AGENTS.md in Zed's lookup list and hides it, no error. A link cannot know that. sync writes .rules for Zed, first in that list.
-->

---

<div class="kicker">agnostic-ai</div>

## One spec. One command. Native files.

<div class="flow">
<div class="card">
  <div class="g">.agnostic-ai/</div>
  <div class="stack" style="margin-top:14px; font-size:18px; color:var(--soft);">
    <div>AGNOSTIC_AI.md</div><div>rules/</div><div>skills/</div><div>agents/</div><div>hooks/</div><div>mcps/</div>
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

<p class="small">You edit the left side. Every tool reads the right side. The right side is generated.</p>

<!--
0:50 · One sentence per column. Left is what you maintain. Right is what each tool already knows how to read. Every folder from the story is on the right. Then: let me show you.
-->

---

<!-- _class: lead -->

<div class="kicker">Part 2 · Live</div>

# Demo

<div class="prompt"><i>$</i>agnostic-ai sync</div>

<div class="chips">
  <div class="chip">init: claude, codex, gemini, copilot</div>
  <div class="chip">one rule, one skill</div>
  <div class="chip">sync --dry-run</div>
  <div class="chip">sync, walk the tree</div>
  <div class="chip">hand-edit an output</div>
  <div class="chip accent">sync --check fails</div>
</div>

<!--
6:00 · Terminal font 20pt or larger. Commands, in order:
mkdir demo && cd demo && git init
agnostic-ai init   (pick claude, codex, gemini, copilot)
agnostic-ai new rule conventional-commits   (write two lines in it)
agnostic-ai new skill write-tests
agnostic-ai sync --dry-run
agnostic-ai sync
tree -a -I .git   (point at .claude/, .agents/, .gemini/, .github/)
cat .gitignore   (outputs are ignored by default)
echo "hand edit" >> AGENTS.md
agnostic-ai sync --check   (exit 1, drift)
agnostic-ai sync && agnostic-ai sync --check   (green)
If anything hangs past ten seconds, skip to the check. It is the beat that matters.
-->

---

<div class="kicker">What you just saw</div>

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
0:40 · Backup slide if the demo failed, recap if it worked. The shared .agents/skills/ tree is the one Codex reads. Same folder from the story, now generated.
-->

---

<div class="kicker">Best practices</div>

## Treat the spec like code.

<div class="beat"><i>01</i><span><strong>Commit the source.</strong> .agnostic-ai/ and agnostic-ai.yaml. Review specs in PRs.</span></div>
<div class="beat"><i>02</i><span><strong>Edit the spec, never the output.</strong> The next sync overwrites it.</span></div>
<div class="beat"><i>03</i><span><strong>Pick only the tools you use.</strong> The targets: list in agnostic-ai.yaml.</span></div>
<div class="beat"><i>04</i><span><strong>Preview first.</strong> sync --dry-run before the first real sync.</span></div>
<div class="beat hot"><i>05</i><span><strong>Choose where outputs live.</strong> Ignored by default, so a fresh clone runs sync.</span></div>

<!--
1:00 · Five habits. The last one is a real choice: ignored outputs keep the repo clean, committed outputs work for people without the CLI. Both are fine. The CI setup depends on it, coming up.
-->

---

<!-- _class: lead -->

<div class="kicker">Part 3</div>

# The extra mile.

<p class="lede">For when it lives in a real team, on a real repo.</p>

<!--
0:15 · Pace change. Each slide from here is one feature, one command, one reason.
-->

---

<div class="kicker">Already have .claude/?</div>

## Import it. Do not start over.

```bash
agnostic-ai init --from claude     # or codex, gemini, all
agnostic-ai sync --dry-run
agnostic-ai sync --backup          # .bak before overwriting
agnostic-ai revert                 # changed your mind
```

<p class="lede">This is the story from part 1, fixed in four commands. Your skills, agents and hooks move into .agnostic-ai/ once.</p>

<p class="small">Review the imported specs before the first sync. Import from several tools, and the last one wins the shared instructions.</p>

<!--
0:50 · Call back to the Codex port slide. That afternoon of translation is now one import. Say the review warning out loud, it is the one people skip.
-->

---

<div class="kicker">Scope</div>

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
0:50 · One spec, four different scoping mechanisms: a paths filter, a nested AGENTS.md, a nested GEMINI.md, an applyTo glob. Nobody wants to remember those. Payment rules stay out of the root files, so context stays small and the agent stays focused. Be honest about the Codex line: it walks from the repo root down to the directory you launched it in, once per run. Start it at the root and the payments AGENTS.md never loads. Copilot applies applyTo in VS Code, JetBrains, the cloud agent and Copilot CLI, not in github.com chat. Aider, Zed, Junie, Crush, Jules and Antigravity skip scoped rules; their root rules still work. Worth it in monorepos, skip it in small repos.
-->

---

<div class="kicker">Global</div>

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
0:40 · Your own habits: how you like commits, your personal skills. They follow you into every repo and every tool. Anything the team must share belongs in the repo, not here.
-->

---

<div class="kicker">CI</div>

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
0:50 · The choice from best practices decides the gate. Committed outputs: check, never sync right before it, that would erase the evidence. Ignored outputs: validate and generate. The action installs the binary for you. Add --format=github for inline annotations.
-->

---

<div class="kicker">Git hooks</div>

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
0:50 · Two hooks, two jobs. pre-commit catches drift before CI does. post-checkout matters when outputs are ignored: switch branches and the files follow. This is the one that saves agents running in fresh worktrees.
-->

---

<div class="kicker">Day to day</div>

## Know where every file came from.

<div class="card">
  <div class="map"><b>sync --watch</b><span>re-syncs while you edit specs</span></div>
  <div class="map"><b>status</b><span>specs, targets, last sync</span></div>
  <div class="map"><b>why &lt;file&gt;</b><span>the spec and adapter behind any output</span></div>
  <div class="map"><b>doctor</b><span>missing and stale files, MCP binaries on PATH</span></div>
  <div class="map" style="border-bottom:0;"><b>packs add</b><span>share specs across repos, pinned by version</span></div>
</div>

<!--
0:40 · Quick tour, no demo. why is the favourite: point at any generated file and get the spec that wrote it.
-->

---

<div class="kicker">Should you use it</div>

## One tool, working alone?<br>You do not need this.

<p class="lede">Write CLAUDE.md and go home. You need this the day a second tool or a second person touches the repo.</p>

<div class="card" style="margin-top:22px;">
  <div class="label">The limits</div>
  <div class="stack" style="margin-top:12px; font-family:var(--sans); font-size:20px; color:var(--soft);">
    <div>Support varies by target and spec kind</div>
    <div>Outputs are overwritten, so edits belong in the spec</div>
    <div class="warn">Bad rules reach every tool just as fast</div>
  </div>
</div>

<!--
0:50 · Lead with the disqualifier, loudly. That is what makes the rest credible. Then the limits, quickly.
-->

---

<!-- _class: lead -->
<!-- _paginate: false -->

<div class="brand"><span class="mark">a</span><span class="name">agnostic-ai</span></div>

# Change the tool.<br><span class="g">Keep the spec.</span>

<div class="meta" style="font-size:20px; color:var(--soft);">
  <span>github.com/Chemaclass/agnostic-ai</span>
  <span>chemaclass.github.io/agnostic-ai/playground/</span>
</div>

<p class="small">Questions.</p>

<!--
0:40 · Call back to the story: Copilot, Claude, Gemini, Codex, back to Claude. The next switch costs one line in targets:. Take questions on this slide. Likely: why not only AGENTS.md, how do you keep up with vendors, what about drift inside the spec itself.
-->
