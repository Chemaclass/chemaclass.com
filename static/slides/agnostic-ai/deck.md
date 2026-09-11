---
marp: true
theme: default
paginate: true
size: 16:9
title: "One spec, every AI CLI"
description: "Your AI rules can stop being read without anything failing, and a second tool is enough to cause it. How agnostic-ai keeps one spec in sync across 25 AI coding tools."
author: "Chemaclass"
keywords: "agnostic-ai, Claude Code, Codex, Cursor, Copilot, Zed, AGENTS.md, developer tools"
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
---

<!-- _class: lead -->
<!-- _paginate: false -->

<div class="brand"><span class="mark">a</span><span class="name">agnostic-ai</span></div>

# One spec,<br><span class="g">every AI CLI.</span>

### One source of truth for 25 AI coding tools

<p class="lede">Keeping rules, skills, agents, hooks and MCP servers in sync across 25 AI coding tools.</p>

<div class="meta">
  <span>Chema · chemaclass.com</span>
  <span>github.com/Chemaclass/agnostic-ai</span>
  <span>MIT · Go · 25 targets</span>
</div>

<!--
0:30 · Name yourself and the tool in one breath. Ask for hands: who uses more than one AI coding tool in the same repo? Do not comment on the count, just move.
-->

---

<div class="kicker">A true story</div>

## A teammate turns on Copilot.

<div class="split">
<div>
  <div class="beat"><i>01</i><span>You use Zed. Your rules live in AGENTS.md and they work.</span></div>
  <div class="beat"><i>02</i><span>A teammate commits .github/copilot-instructions.md. Harmless.</span></div>
  <div class="beat hot"><i>03</i><span class="warn">Zed reads the first file it matches, then stops looking.</span></div>
</div>
<div class="card">
  <div class="label">Zed lookup order</div>
  <div class="rank"><i>1</i><span>.rules</span><em>absent</em></div>
  <div class="rank"><i>2</i><span>.cursorrules</span><em>absent</em></div>
  <div class="rank"><i>3</i><span>.windsurfrules</span><em>absent</em></div>
  <div class="rank"><i>4</i><span>.clinerules</span><em>absent</em></div>
  <div class="rank hit"><i>5</i><span>.github/copilot-instructions.md</span><em>match, stop here</em></div>
  <div class="rank"><i>6</i><span>AGENT.md</span><em>never reached</em></div>
  <div class="rank dead"><i>7</i><span>AGENTS.md</span><em>your rules, never read</em></div>
  <div class="rank"><i>8·9</i><span>CLAUDE.md · GEMINI.md</span><em>also never reached</em></div>
</div>
</div>

<p class="lede">No error. No warning. The agent keeps answering, now with none of your conventions.</p>

<!--
2:00 · Tell it as a story about a colleague, not about a tool. Beat 1: your rules work. Beat 2: the teammate commits a harmless file. Beat 3: Zed stops at the first match. Walk the rank list top to bottom, pause on rank 5. Land on: no error, no warning.
-->

---

<!-- _class: lead -->

# Your rules<br>did not break.<br><span class="g warn">They stopped being read.</span>

<p class="lede">One tool is fine. A second tool is enough to cause this.</p>

<!--
0:30 · Say the line, then stop talking for two seconds. This is the sentence they repeat tomorrow. Do not add to it.
-->

---

<div class="kicker">Why it happens</div>

## Every tool decides for itself<br>where to look.

<div class="grid2">
<div>
  <div class="map"><b>Claude Code</b><span>CLAUDE.md</span></div>
  <div class="map"><b>Codex, Amp, Warp, Kiro, +13</b><span>AGENTS.md</span></div>
  <div class="map"><b>Gemini CLI</b><span>GEMINI.md</span></div>
  <div class="map"><b>Aider</b><span>CONVENTIONS.md</span></div>
</div>
<div>
  <div class="map"><b>Cursor</b><span>.cursor/rules/*.mdc</span></div>
  <div class="map"><b>Copilot</b><span>.github/instructions/</span></div>
  <div class="map"><b>Zed</b><span>.rules</span></div>
  <div class="map"><b>Antigravity</b><span>.agent/AGENTS.md</span></div>
</div>
</div>

<p class="lede">Seventeen of twenty-five write that same root AGENTS.md. They agree on nothing else: not the format, not the precedence, not scoping, hooks, skills or MCP config.</p>

<p class="small">Copilot also carries a root pointer at .github/copilot-instructions.md. That is the file from the story.</p>

<!--
1:30 · The table is evidence, not inventory. Point out that agreeing on a filename still leaves format, precedence, scoping, hooks and MCP wide open. Do not read the table aloud, let them scan it.
-->

---

<div class="kicker">The idea</div>

## One spec. One command. Native files.

<div class="flow">
<div class="card">
  <div class="g">.agnostic-ai/</div>
  <div class="stack" style="margin-top:14px; font-size:18px; color:var(--soft);">
    <div>rules/</div><div>skills/</div><div>agents/</div><div>hooks/</div><div>mcps/</div><div>commands/</div>
  </div>
</div>
<div class="arrow">agnostic-ai<br>sync<b>&#8594;</b></div>
<div class="stack">
  <div class="out"><i>ok</i>CLAUDE.md</div>
  <div class="out"><i>ok</i>AGENTS.md</div>
  <div class="out"><i>ok</i>.rules</div>
  <div class="out"><i>ok</i>.cursor/rules/</div>
  <div class="out"><i>ok</i>.github/instructions/</div>
  <div class="out accent">25 targets in total</div>
</div>
</div>

<!--
1:00 · One sentence per column. Left is what you write, right is what every tool actually reads. Say .rules out loud, it closes the Zed loop before the demo.
-->

---

<!-- _class: lead -->

<div class="kicker">Live</div>

# Demo

<div class="prompt"><i>$</i>agnostic-ai sync</div>

<div class="chips">
  <div class="chip">init</div>
  <div class="chip">write one rule</div>
  <div class="chip">sync</div>
  <div class="chip">add Copilot, .rules still wins</div>
  <div class="chip">hand-edit an output</div>
  <div class="chip accent">sync --check fails the build</div>
</div>

<!--
6:00 · Order: init, write one rule, sync, add Copilot and re-sync to show .rules still written, hand-edit an output, sync --check fails, fix, green. Font 20pt or larger. If anything hangs past ten seconds, skip to the --check beat, it is the one that matters. Say once: this is the part symlinks cannot do.
-->

---

<!-- _class: lead -->

# That was the easy half.

<p class="lede" style="font-size:34px; color:var(--accent); margin-top:26px;">The hard half is knowing where each tool actually looks.</p>

<!--
0:20 · Breathe here. It resets the room after the terminal and buys you the vendor stories.
-->

---

<div class="kicker">Vendor reality</div>

## Warp reads WARP.md first.

<div class="cards">
  <div class="card"><div class="label">Assumption</div><div class="body">Warp is an AGENTS.md tool, so writing AGENTS.md is enough.</div></div>
  <div class="card"><div class="label">Reality, from its own docs</div><div class="body">If both WARP.md and AGENTS.md exist in the same directory, WARP.md takes priority.</div></div>
  <div class="card"><div class="label">Silent failure</div><div class="body warn">An old WARP.md in the same directory shadows everything you just wrote.</div></div>
</div>

<p class="small good">sync renames a generated WARP.md to .bak, and warns when you wrote one by hand.</p>

<!--
1:00 · Read the three rows in order. Frame it first: this knowledge is the product, not the code generator.
-->

---

<div class="kicker">Vendor reality</div>

## Same shape, different tool.

<div class="cards">
  <div class="card"><div class="row"><span class="name">Junie</span><span class="body">Strict tier precedence. sync always writes .junie/AGENTS.md, so tier one always matches and the root AGENTS.md, .junie/playbook.md and .junie/rules/ below it are all unreachable.</span></div></div>
  <div class="card"><div class="row"><span class="name">OpenCode</span><span class="body">We wrote .opencode/AGENTS.md for nearly four months. No OpenCode doc and no OpenCode code path ever named that file.</span></div></div>
  <div class="card"><div class="row"><span class="name g">Windsurf</span><span class="body">Rules reached it through .devin/rules/, but never through the root AGENTS.md. A windsurf-only repo had no entry-point file at all.</span></div></div>
</div>

<p class="small">Every target gets re-read against its vendor docs, again and again. Six audits in the last five weeks. Each fix above came out of one of them.</p>

<!--
1:20 · Faster than the Warp slide, they have the shape now. Land on the audit line: each of these came from a re-read of the vendor docs.
-->

---

<!-- _class: lead -->

# A shared filename<br>is not a standard.

<p class="lede" style="font-size:36px; color:var(--accent); margin-top:26px;">Someone has to keep chasing the targets.</p>

<p class="small">That chase is the product, as much as the generator is.</p>

<!--
0:40 · The generalisation. Say it once, do not explain it.
-->

---

<div class="kicker">Should you use it</div>

## One tool, working alone?<br>You do not need this.

<p class="lede">Write CLAUDE.md and go home. You need this the day a second person or a second tool touches the repo.</p>

<div class="split" style="grid-template-columns:1fr 1fr; margin-top:22px;">
<div class="card">
  <div class="label">Then the setup is</div>
  <div class="stack" style="margin-top:12px; font-family:var(--sans); font-size:20px; color:var(--soft);">
    <div>Commit .agnostic-ai/, review specs like code</div>
    <div>Outputs committed? CI runs sync --check</div>
    <div class="good">Outputs gitignored? CI runs validate and sync</div>
  </div>
</div>
<div class="card">
  <div class="label">And the limits are</div>
  <div class="stack" style="margin-top:12px; font-family:var(--sans); font-size:20px; color:var(--soft);">
    <div>Support varies by target and spec kind</div>
    <div>Outputs are overwritten, edit the spec</div>
    <div class="warn">Bad rules reach every tool just as fast</div>
  </div>
</div>
</div>

<!--
1:30 · Lead with the disqualifier, loudly: one tool, working alone, you do not need this. That is what makes the rest credible. Then the setup and the limits, quickly.
-->

---

<!-- _class: lead -->
<!-- _paginate: false -->

<div class="brand"><span class="mark">a</span><span class="name">agnostic-ai</span></div>

# Pick your tools freely.<br><span class="g">Keep one set of conventions.</span>

<div class="meta" style="font-size:20px; color:var(--soft);">
  <span>github.com/Chemaclass/agnostic-ai</span>
  <span>chemaclass.github.io/agnostic-ai/playground/</span>
</div>

<p class="small">Questions.</p>

<!--
0:40 · Tagline, links, QR up. Take questions with this slide on screen. Likely questions: why not just AGENTS.md, what about drift in the spec itself, how do you keep up with vendors.
-->
