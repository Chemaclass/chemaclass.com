---
marp: true
theme: default
paginate: true
size: 16:9
title: "AI as Your Coding Co-Pilot"
description: "Human-centered AI coding workflows: the adoption ladder from denial (L0) to AI-native teams (L5), plus concrete refactor and test loops with an LLM."
author: "Chemaclass"
keywords: "AI, LLM, Claude Code, developer workflows, PHP, software craftsmanship"
url: "https://chemaclass.com/slides/ai-copilot/"
image: "https://chemaclass.com/slides/ai-copilot/assets/cover.png"
footer: 'AI as Your Coding Co-Pilot · @Chemaclass'
style: |
  /* ============================================================
     Theme mirrors chemaclass.com. Rubik + GitHub-inspired tokens.
     Light mode only, always renders light regardless of OS setting.
     ============================================================ */
  @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,500;0,600;1,400&display=swap');

  :root {                         /* LIGHT - site :root */
    --accent: #2d5a8e; --accent-ov: #3574b8;
    --bg: #f7f8fa;
    --fg: #2a2d32; --heading: #14171a; --muted: #5a6370;
    --panel: #ffffff; --panel-alt: #f5f6f8; --border: #e2e5ea;
    --code-bg: rgba(0,0,0,0.05); --pre-bg: #f5f6f8;
    --sel: rgba(45,90,142,0.15);
    --shadow: 0 2px 8px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
    --on-accent: #ffffff;
  }
  section {
    background-color: var(--bg);
    background-image: url('assets/theme-soft.svg');
    background-repeat: no-repeat; background-position: center; background-size: cover;
    color: var(--fg);
    font-family: "Rubik", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-weight: 400; font-size: 30px; line-height: 1.55; letter-spacing: -0.005em;
    padding: 48px 72px 48px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: stretch;
  }
  h1 { color: var(--heading); font-weight: 500; font-size: 56px; line-height: 1.12; letter-spacing: -0.02em; margin-top: 0; }
  h2 { color: var(--heading); font-weight: 500; font-size: 40px; letter-spacing: -0.015em; margin-top: 0; margin-bottom: .4em; }
  h3 { color: var(--fg); font-weight: 500; }
  strong { color: var(--accent); font-weight: 500; }
  em { opacity: .85; }
  ul { padding-left: 1.1em; }
  li { margin: .44em 0; }
  p { margin: .55em 0; }
  blockquote {
    border: none !important; padding: .15em 0 .15em 0; margin: .85em 0;
    font-style: italic; opacity: .9; color: var(--fg);
    display: flex; align-items: flex-start; gap: .45rem;
  }
  blockquote::before {
    content: '\201C';
    font-size: 2.1em; color: var(--accent); font-style: normal;
    font-weight: 700; line-height: 1; flex-shrink: 0;
    opacity: 1; margin-top: -.05em;
  }
  section.quote blockquote { display: block; }
  section.quote blockquote::before { display: none; }
  a { color: var(--accent); text-decoration: none; }
  code { background: var(--code-bg); padding: .12em .4em; border-radius: 4px; font-size: .9em; color: var(--accent-ov); }
  pre { background: var(--pre-bg); border: 1px solid var(--border); border-radius: 10px;
        box-shadow: var(--shadow); font-size: 22px; padding: 1rem 1.25rem;
        color: var(--fg) !important; text-align: left; white-space: pre; tab-size: 2; }
  pre code { background: none !important; color: var(--fg) !important;
             padding: 0; text-align: left; white-space: pre; }
  ::selection { background: var(--sel); }
  footer { color: var(--muted); font-size: 15px; bottom: 14px; }
  section::after { color: var(--muted); font-weight: 500; }   /* page number */

  /* eyebrow / kicker tag - like the site's pill labels */
  .kicker { display:inline-block; text-transform:uppercase; letter-spacing:.08em;
    font-size:15px; font-weight:600; color:var(--accent);
    border:1px solid var(--border); border-radius:2rem; padding:.28rem .85rem; margin-bottom:.5rem; }

  /* content + image split (title/ladder stay full-width above) */
  .content-img { display:grid; grid-template-columns:3fr 2fr; gap:24px; align-items:start; margin-top:.3rem; }
  .content-img img { width:100%; height:auto; max-height:360px; object-fit:contain; border-radius:8px; box-shadow:var(--shadow); }

  /* two-column contrast panels */
  .two-col { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:.8rem 0 .6rem; }
  .panel-box { background:var(--panel); border:1px solid var(--border); border-radius:10px;
    padding:20px 24px; box-shadow:var(--shadow); }
  .panel-box strong { display:block; font-size:21px; color:var(--muted); margin-bottom:.5rem;
    font-weight:500; letter-spacing:.01em; }

  /* adoption ladder strip - styled like the site's pills + cards */
  /* labels live here once; active step set by parent class .l0../.l5 */
  .ladder { display:flex; gap:10px; margin: 0 0 28px 0; }
  .ladder span {
    flex:1; text-align:center; padding:10px 6px; border-radius:2rem;
    background:var(--panel); color:var(--muted); font-size:16px; font-weight:500;
    border:1px solid var(--border); box-shadow: var(--shadow);
  }
  .ladder span:nth-child(1)::before { content:"L0 Denial"; }
  .ladder span:nth-child(2)::before { content:"L1 Personal"; }
  .ladder span:nth-child(3)::before { content:"L2 Shared"; }
  .ladder span:nth-child(4)::before { content:"L3 Context"; }
  .ladder span:nth-child(5)::before { content:"L4 Teams"; }
  .ladder span:nth-child(6)::before { content:"L5 AI-native"; }
  .ladder.l0 span:nth-child(1),
  .ladder.l1 span:nth-child(2),
  .ladder.l2 span:nth-child(3),
  .ladder.l3 span:nth-child(4),
  .ladder.l4 span:nth-child(5),
  .ladder.l5 span:nth-child(6),
  .ladder.skip span:nth-child(2),
  .ladder.skip span:nth-child(5) {
    background:var(--accent); color:var(--on-accent); border-color:var(--accent);
  }

  /* workflow chip - TL;DR-style badge */
  .chip { position:absolute; top:28px; right:34px; background:var(--accent); color:var(--on-accent);
    padding:.32rem 1rem; border-radius:2rem; font-size:15px; font-weight:600;
    text-transform:uppercase; letter-spacing:.06em; box-shadow:var(--shadow); }

  /* workflow slide layout */
  .wf-problem { background:var(--panel-alt); border:1px solid var(--border);
    border-radius:8px; padding:.55rem 1.1rem; margin:.5rem 0 1rem; font-size:27px; }
  .wf-steps { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-bottom:1rem; }
  .wf-step { background:var(--panel); border:1px solid var(--border); border-radius:10px;
    padding:18px 20px; box-shadow:var(--shadow); font-size:24px; }
  .wf-step .n { display:block; font-size:36px; font-weight:600; color:var(--accent); line-height:1; margin-bottom:.3rem; }
  .wf-rule { background:var(--panel); border:1px solid var(--border);
    border-radius:8px; padding:.55rem 1.1rem; font-size:26px; font-weight:500; color:var(--heading); }

  /* lead (title) + quote slides */
  section.lead, section.quote { justify-content:center !important; }
  section.lead { text-align:center; }
  section.lead h1 { font-size:62px; margin:.2em 0; }
  section.lead h3 { color: var(--accent); font-weight:400; }
  section.lead header, section.quote header,
  section.lead footer, section.quote footer { display:none; }
  section.quote { text-align:center; }
  section.quote blockquote { border:none; font-size:50px; font-style:normal; opacity:1; line-height:1.2; }
  .small { font-size:21px; color:var(--muted); }
  .small.dim { opacity:.8; }
  .small.faint { opacity:.6; }
  .small.thanks { margin-top:.8rem; display:block; }
  .divider { height:1px; background:var(--accent); opacity:.2; margin:1.2rem auto; width:50%; }
---

<!-- _class: lead -->
<!-- _paginate: false -->

![bg](assets/03-speed-not-quality.svg)

<span class="kicker">PHP Conference · Trends & Gen AI</span>

# AI as Your<br>Coding Co-Pilot

### Human-Centered Workflows for Modern Developers

**Chema** · chemaclass.com

<!--
Opening hook (not on slide): a year ago I was wrong about AI. This is the honest version of what I learned. No agenda slide, open with the tension.

═══ ~44-MIN BUDGET ═══
Open+thesis(1-4) 4 · Ladder+poll(5) 3 · L0-L2(6-9) 5 · L3(10-15) 9
L4 teams+Sauron(16-20) 9 · game(21) 2 · L5(22-25) 5
skip+takehome+close(26-27) 2 · Q&A 5

OFFLINE-SAFE: every demo runs from LOCAL files, no internet needed.
- .agnostic-ai/ files (11-15): your own repo, offline.
- Game + Konami (21): static HTML, pre-loaded tab.
- Sauron (20): pre-recorded Telegram screen-capture; go live only if wifi is solid and tested.
Record all three the night before. The 35-min read-through is the hard floor if all media fails.
-->

---

## The promise everyone sells

> AI accelerates your output.

- ChatGPT, Copilot, Cursor, Codex, Claude Code. New benchmark every month.
- The pitch: *describe what you want, get working code in seconds.*
- Most of us felt the rush. Most of us also felt the hangover.

> **AI drives the speed. You drive the direction.**

<!--
The "hangover": fast code that looks right but decays fast, and nobody fully understands it. The cost lands weeks later, not in the demo.
Thesis of the whole talk: AI drives the speed, you drive the direction. Everything after this is how.
-->

---

<!-- _class: quote -->

![bg](assets/03-speed-not-quality.svg)

> AI gives you<br>**speed, not quality.**

<!--
This is the misconception the whole talk disproves: speed and quality look like a trade-off, but they stop being one once you add context and review around the AI.
-->

---

## My journey: skeptic → squad leader

<div class="content-img">
<div>

A decade of clean code, architecture, TDD. Then AI arrived. I resisted.

> I was wrong the way idealists are: I judged the tool against the ideal, not the alternative.

I stopped racing AI. Started directing it.

</div>
<div>

![w:100%](assets/04-skeptic-leader.svg)

</div>
</div>

<!--
The idealist trap: I judged AI against perfect hand-crafted code, not against the realistic alternative (rushed code, copy-paste, no tests). Wrong baseline.
The fear that turned out overblown: AI ships impressive code that decays fast. True only without the discipline the rest of the talk adds.
What changed: I stopped racing AI on output and started directing it, reviewing, constraining, owning the result. The ladder is the framework that came out of that.
-->

---

## The ladder · the spine of this talk

> You don't move up by buying tools. You move up by changing how work is organized and reviewed.

Most companies at **Level 1** in 2026. Every slide = one step up.

![w:780](assets/05-ladder.svg)

<!--
Poll the room on something they can answer now (the levels aren't defined yet): who uses AI in daily work? who's banned from it?
The map: six rungs, denial at the bottom, orchestrating a team of agents at the top. Every slide from here is one rung up.
Self-placement is the payoff: by the close they'll know exactly which rung they're on. We cash that in at the take-home slide, not here.
-->

---

## ▸ Level 0 · Denial

<div class="ladder l0"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<div class="content-img">
<div>

**"No AI here, officially."** Half the team pastes code into ChatGPT on personal laptops anyway.

- Leadership worries about IP leaks, or hasn't prioritized it.
- Risk isn't the technology. It's **time**: every month at L0, competitors grow their lead.

</div>
<div>

![w:100%](assets/06-shadow-it.svg)

</div>
</div>

<!--
Shadow IT is the tell: officially "no AI", but half the team still pastes into ChatGPT on personal laptops. The ban doesn't stop usage, it just hides it and removes any review.
The real cost isn't a leak, it's compounding time: every month at L0, competitors who adopted pull further ahead. Being honest that you're here is step one.
-->

---

## ▸ Level 1 · Personal productivity

<div class="ladder l1"><span></span><span></span><span></span><span></span><span></span><span></span></div>

Same task, two engineers: one gets clean code, one gets garbage. The know-how is trapped in each head.

> The quality of your answer depends on the quality of your question.

Speed without shared direction is just faster chaos.

<!--
Same task, same nominal prompt, two engineers, wildly different output. The difference is know-how trapped in each head, never written down.
Prompting is the descendant of asking a good Stack Overflow question: the quality of the answer tracks the quality of the question. Speed without shared direction is just faster chaos.
-->

---

## ▸ Level 1 · The discipline that travels with you

<div class="ladder l1"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<div class="content-img">
<div>

- **Never accept code you don't understand.** Can't explain it = time bomb.
- Push back: *"Simplify. Remove the boilerplate."*
- **You own every line.** Can't blame Claude at 2am.

> Don't let the co-pilot fly blind.

</div>
<div>

![w:100%](assets/08-2am-pager.svg)

</div>
</div>

<!--
This discipline is the floor that never changes, no matter how high you climb the ladder.
"You own every line" is literal: at 2am on call, "Claude wrote it" is not an explanation. Code you can't explain is a time bomb, so push back and simplify until you can.
-->

---

## ▸ Level 2 · Shared practices

<div class="ladder l2"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<div class="content-img">
<div>

Team writes down *how we use AI*: shared prompts, conventions, when to push back. Reviews catch AI mistakes like human ones.

- First level where AI is a **team skill**, not a personal habit.
- Higher floor and ceiling. New hires ramp faster.

</div>
<div>

![w:100%](assets/09-team-shared-doc.svg)

</div>
</div>

<!--
L1 to L2 is a cultural step, not a technical one, which is why it's the hardest on the ladder.
What to write down: shared prompts, conventions, when to push back. Commit it, review it like code. Now AI is a team skill, not a personal habit, so the floor and ceiling both rise and new hires ramp faster.
The gap it leaves: shared practices still have no memory. That's what context (L3) fixes.
-->

---

## ▸ Level 3 · agnostic-ai: one spec, every tool

<div class="ladder l3"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<style scoped>
  .ag-split { display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:center; margin-top:.3rem; }
  .ag-split pre { font-size: 18px; margin:0; }
</style>

<div class="ag-split">
<div>

Your edge is the **context**, not the vendor. Don't lock it to one tool.

> **agnostic-ai**: write the spec once, sync to 14+ tools.

One source of truth. Switch tools, keep your edge.

<span class="small"><a href="https://github.com/Chemaclass/agnostic-ai">github.com/Chemaclass/agnostic-ai</a></span>

</div>
<div>

```yaml
# agnostic-ai.yaml: one spec, every tool
version: 1

sources:
  agents:  .agnostic-ai/agents
  skills:  .agnostic-ai/skills
  rules:   .agnostic-ai/rules

targets:
  - claude
  - cursor
  - copilot
  - codex
```

</div>
</div>

<!--
The trap this avoids: building your whole setup in one vendor's format, then rewriting it when you switch tools. The tool ships next year; your context shouldn't have to.
agnostic-ai: define agents, skills, rules, hooks once, sync to 14+ tools in their native format. Bet on the context, not the vendor.
DEMO (optional, offline): the WASM playground runs in-browser, pre-load a tab to show a sync.
-->

---

## ▸ Level 3 · The `.agnostic-ai/` folder

<div class="ladder l3"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<style scoped>
  .fld-split { display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:center; margin-top:.3rem; }
  .fld-split pre { font-size:18px; margin:0; }
</style>

<div class="fld-split">
<div>

```
.agnostic-ai/
├── agents/   # specialized roles
├── skills/   # runnable procedures
├── rules/    # scoped conventions
├── hooks/    # event scripts
└── agnostic-ai.yaml
```

One git-committed folder. Clone it, inherit everything.

</div>
<div>

**🫀 The root context: where it all starts**

Read on every boot. *Project:* how the codebase works. *Global:* how you work.

Ships in every prompt: keep it short, overflow to `rules/` and `skills/`.

</div>
</div>

<!--
One folder, committed to git, so everyone who clones inherits the full setup. agnostic-ai syncs it out to each tool's native files (.claude/, .cursor/, copilot, ...).
The heart is the root context: the onboarding doc read on every boot. Project = how this codebase works; global = how you work. Every byte ships in every prompt, so keep it short and push overflow to rules/ and skills/.
DEMO (~2 min, offline): open the editor, show the real files, the project context, one skill.md, a hook firing on save.
-->

---

## ▸ Level 3 · Guardrails: suggest vs enforce

<div class="ladder l3"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<style scoped>
  .gr-split { display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:center; margin-top:.3rem; }
  .gr-split pre { font-size:18px; margin:0; }
</style>

<div class="gr-split">
<div>

- **Rules** *suggest*: scoped conventions, loaded only when a file matches.
- **Hooks** *enforce*: shell on events, run regardless, even if the agent forgets.

A `deny` is a line the agent can't cross, *even when asked politely.*

</div>
<div>

```bash
# hook: keep the domain framework-free
PreToolUse(Edit), path src/Domain/**
  → exit 2 "no framework imports here"  # blocks
```

</div>
</div>

<!--
Rules are advice the agent reads when a file matches its glob, it can still drift. Hooks are shell commands the system runs no matter what: auto-format, protect a file, block a commit. Rules are what it should know; hooks are what the system guarantees.
Detail worth knowing: the snippet blocks with exit code 2. Exit 1 would NOT block, the edit still proceeds. A deny permission is the hardest line, off-limits even when asked politely.
-->

---

## ▸ Level 3 · Skills: your edge that outlasts models

<div class="ladder l3"><span></span><span></span><span></span><span></span><span></span><span></span></div>

> Who does your taxes? A 300-IQ genius who never read tax law, or an accountant with 20 years of filings?

<style scoped>
  .sk-split { display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:center; margin-top:.2rem; }
  .sk-split ul { margin:0; font-size:25px; }
  .sk-split li { margin:.3em 0; }
  .sk-split pre { font-size:18px; margin:0 0 .4rem; }
</style>

<div class="sk-split">
<div>

- **Intelligence ≠ expertise.** A skill = a markdown file, loaded **on demand**.
- **Agent is replaceable. Skills are not.** New model, productive day one.
- Start at the **second repeated prompt**.

</div>
<div>

```
.agnostic-ai/skills/
├── commit/
├── refactor/
├── test/
└── … 15 total
```

<span class="small"><a href="https://github.com/phel-lang/phel-lang/tree/main/.agnostic-ai/skills">github.com/phel-lang/.../.agnostic-ai/skills</a></span>

</div>
</div>

<!--
The accountant beats the genius because expertise is not intelligence. A skill is a markdown file loaded on demand: it costs nothing until one matches.
Why they outlast models: the agent is replaceable, your skills are not. New model, productive day one. They encode your domain, conventions, architecture.
Where to start: the second time you type the same prompt, that's a skill waiting to be written.
-->

---

## ▸ Level 3 · MCP: reach beyond the repo

<div class="ladder l3"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<style scoped>
  .mcp-split { display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:center; margin-top:.3rem; }
  .mcp-split pre { font-size:18px; margin:0; }
</style>

<div class="mcp-split">
<div>

**MCP** gives the agent hands beyond your code: `filesystem` · `github` · `postgres` · your own tools.

Context says **what**. MCP lets it **act** on the world outside the repo.

</div>
<div>

```
You: "which users churned last week?"
 →  agent queries prod Postgres (read-only)
 →  answers in plain English
```

</div>
</div>

<!--
MCP (Model Context Protocol) gives the agent hands beyond your code: filesystem, github, postgres, your own tools. It turns a conversation partner into an active participant.
Concrete: ask "which users churned last week", it runs a read-only query and answers, no copy-paste, no leaving the chat. Context says what; MCP lets it act.
-->

---

## ▸ Level 4 · Agentic teams

<div class="ladder l4"><span></span><span></span><span></span><span></span><span></span><span></span></div>

> A single agent is an assistant. Multiple agents from a shared plan is a **team**.

- Specialists, not generalists: explorer, reviewer, TDD coach, architect.
- Right model for the right job: cheap to explore, capable for architecture.
- Humans stop racing AI on speed and start **directing** it.

<span class="small"><a href="https://github.com/phel-lang/phel-lang/tree/main/.agnostic-ai/agents">github.com/phel-lang/.../.agnostic-ai/agents</a></span>

<!--
The L3 specialist roles (explorer, reviewer, TDD coach, architect) become standing teammates. Org chart unchanged, each person produces more.
Right model for the right job: a cheap model to explore, a capable one for architecture. Humans stop racing AI on speed and start directing it.
-->

---

## ▸ Level 4 · Subagents vs agent teams

<div class="ladder l4"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<style scoped>
  .vs-rule { margin-top:1rem; }
</style>

<div class="two-col">
<div class="panel-box"><strong>🔹 Subagents</strong>One session, focused work, report back. Can't talk to each other.</div>
<div class="panel-box"><strong>🔸 Agent teams</strong>Independent sessions, own context. Coordinate via mailbox.</div>
</div>

<div class="wf-rule vs-rule"><strong>Where a team wins:</strong> rival theories debate until one survives.</div>

<!--
Start with subagents: simpler, cheaper, easier to debug. One session, focused work, they can't talk to each other.
Upgrade to teams when work must run in parallel and share findings, independent sessions coordinating via a mailbox. Teams cost roughly 3x the tokens, so make the parallelism earn it.
-->

---

## ▸ Level 4 · A team with names

<div class="ladder l4"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<style scoped>
  .tm-split { display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:start; margin-top:.4rem; }
  .tm-split ul { margin:0; font-size:25px; }
  .tm-split li { margin:.32em 0; }
  .tm-split img { box-shadow:var(--shadow); border-radius:8px;
    width:100%; height:425px; object-fit:cover; object-position:left center; }
</style>

<div class="tm-split">
<div>

Approve the plan, three agents split the work in parallel:

- **Arwen** rewrites the DB query.
- **Elrond** updates the handler limits.
- **Galadriel** changes paging, finds a failing test.

Each reports back. I merge.

</div>
<div>

![w:100%](assets/21-agent-team.png)

</div>
</div>

<!--
Names make coordination legible. Approve the plan once, three background agents launch, each owns a slice: Arwen the DB window function, Elrond the handler limits, Galadriel paging plus tests.
They report back as they finish, Galadriel even flagged a failing test before I asked. Independent sessions, shared task list: a team, not a tool. I review and merge.
-->

---

## ▸ Level 4 · Seven agents, one command

<div class="ladder l4"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<style scoped>
  .wt-split { display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:start; margin-top:.4rem; }
  .wt-split ul { margin:0; font-size:25px; }
  .wt-split li { margin:.32em 0; }
  .wt-split img { box-shadow:var(--shadow); border-radius:8px;
    width:100%; height:425px; object-fit:cover; object-position:left center; }
</style>

<div class="wt-split">
<div>

Same shape, more agents. One command, each grabs an issue in its own **git worktree**. No collisions.

- Reads the architecture rules first.
- Follows TDD: red → green → refactor.
- Commits, opens a PR, reports back.

</div>
<div>

![w:100%](assets/21-parallel-worktrees.png)

</div>
</div>

<!--
Same shape as the named team, just more of it. Each agent picks an issue off the task list and runs in its own git worktree: isolated branch, isolated directory, no stepping on each other.
Each reads the architecture rules first, follows TDD (red, green, refactor), commits, opens a PR, reports back. I monitor and merge. The parallelism is real, not a demo trick.
-->

---

## ▸ Level 4 · Sauron: an agent with its own home

<div class="ladder l4"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<style scoped>
  section .content-img img { max-height:430px; height:430px; object-fit:cover; object-position:center top; }
</style>

<div class="content-img">
<div>

A coding agent lives in one repo. 
**Sauron lives in my life.**

- Its own hardware via **OpenClaw**.
- I talk to him over **Telegram**.
- <a href="https://sauronbot.github.io">sauronbot.github.io</a>

</div>
<div>

![w:100%](assets/20-sauron-telegram.png)

</div>
</div>

<!--
A coding agent lives in one repo for one task. Sauron lives in my life: not a tool I open, a place I work. Runs on my own hardware via OpenClaw, always on, no tab to open.
I talk to him over Telegram: he reviews PRs, opens issues, ships OSS, and pushes back when I tunnel-vision. More at sauronbot.github.io.
DEMO (~4 min, offline default): play a pre-recorded Telegram screen-capture, a real pushback, then Sauron opens an issue/PR. Live only if wifi is solid and tested beforehand; the recording lands the same beat.
-->

---

## ▸ Level 4 · Proof: a game built in two days

<div class="ladder l4"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<style scoped>
  section .content-img img { max-height:380px; height:380px; object-fit:cover; object-position:center center; }
</style>

<div class="content-img">
<div>

Hidden in Sauron's blog. A 9-level Lord of the Rings game.<br>**+5k lines. Two days. I wrote zero code.**

> I brought the creativity: lore & vision.<br>Sauron brought the craft: every line of code.

Neither of us could have built it alone.<br>**That's a co-pilot at its best.**

</div>
<div>

![w:100%](assets/22-carry-the-ring.png)

<span class="small faint" style="display:block; text-align:center; margin-top:.45rem;">sauronbot.github.io</span>

</div>
</div>

<!--
Hidden in Sauron's blog: a 9-level Lord of the Rings game. I brought the vision and lore; Sauron brought the craft, rendering, physics, Web Audio, mobile input. 5k lines, two days, I wrote zero code, but every creative decision was mine.
Neither of us could have built it alone, that's a co-pilot at its best.
DEMO (~2 min, offline): static HTML game, pre-load a browser tab before the talk. Clear a level, trigger the Konami easter egg. Fallback: a local screen-recording.
-->

---

## ▸ Level 5 · AI-native workflows

<div class="ladder l5"><span></span><span></span><span></span><span></span><span></span><span></span></div>

**The work itself is reshaped around agents:**

- Tickets written so an agent can act on them.
- Reviews assume part was machine-written.
- Architecture accounts for what agents do well.

L4 multiplies output inside the existing structure. **L5 changes the structure.**

> Few companies fully here in 2026. Ignoring the direction is its own decision.

<!--
L4 multiplies output inside the existing structure; L5 changes the structure itself: tickets written so an agent can act on them, reviews that assume part was machine-written, architecture that accounts for what agents do well.
A senior IC starts to look more like a tech lead, leading people and agents. Few companies are fully here in 2026, but ignoring the direction is its own decision.
-->

---

## ▸ Level 5 · The human bottleneck

<div class="ladder l5"><span></span><span></span><span></span><span></span><span></span><span></span></div>

We spent decades making machines faster.<br>Now the slowest part of the system is **us**.

> If you review everything with the same depth,<br>you review nothing with real depth.

Agents ship 10 PRs while you drink your coffee.<br>You can add more agents. You can't add more of yourself.

<!--
We spent decades making machines faster; now the slowest part of the system is us. Review everything with the same depth and you review nothing with real depth.
The asymmetry that forces a new way of working: you can add more agents, you can't add more of yourself. Agents ship 10 PRs while you drink your coffee.
-->

---

## ▸ Level 5 · Human-on-the-loop

<div class="ladder l5"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<div class="content-img">
<div>

Pilot & autopilot. Plane flies itself; pilot watches and steps in when something looks wrong.

- **Ship** without review, **Show** what you did, **Ask** before big decisions.
- Beware **automation complacency**: read diffs you don't have to.

</div>
<div>

![w:100%](assets/24-cockpit.svg)

</div>
</div>

<!--
Aviation framing: the plane flies itself, the pilot watches and steps in when something looks wrong. Human-on-the-loop, not hands-on every control.
The decision rule, Ship / Show / Ask: ship without review when it's safe, show what you did, ask before big decisions. The danger is automation complacency, so deliberately read diffs you don't strictly have to.
-->

---

## ▸ Level 5 · Where full attention still wins

<div class="ladder l5"><span></span><span></span><span></span><span></span><span></span><span></span></div>

Spend full review, on purpose, on:

- **Security**: auth, keys, permissions.
- **Irreversible**: migrations, money, deletions.
- **A new codebase**: still learning it.
- **Regulated systems**: the auditor.
- **Everything else**: pair-buddy agent.

<!--
Human-on-the-loop is not a rubber stamp. Spend full review, on purpose, on: security (auth, keys, permissions); irreversible actions (migrations, deletions, money, messages to users); a codebase you're still learning; regulated systems, where "the AI approved it" is not an answer for an auditor.
Everything else: a pair-buddy agent as a thinking partner, not a replacement for review.
-->

---

## Don't skip steps

<div class="ladder skip"><span></span><span></span><span></span><span></span><span></span><span></span></div>

<div class="content-img">
<div>

**Anti-pattern:** Team jumps L1 → L4. Agents produce mountains of low-quality code. Nobody agreed what *quality* means.

> Shared practices before context. Context before teams. Teams before AI-native.

The agents aren't the problem. The **missing foundation** is.

</div>
<div>

![w:100%](assets/26-broken-step.svg)

</div>
</div>

<!--
The most common failure: a team jumps L1 straight to L4. Agents produce mountains of low-quality code because nobody agreed what "quality" means.
The agents aren't the problem, the missing foundation is. Order matters: shared practices → context → teams → AI-native. You can't buy your way past the cultural steps.
-->

---

## Take home: simple, repeatable techniques

<style scoped>
  section { font-size: 28px; line-height: 1.45; }
  ol li, ul li { margin: .34em 0; }
  ol { margin: .3em 0 0; }
  p { margin: .45em 0; }
  .divider { margin: 1rem auto !important; }
</style>

1. **Locate yourself on the ladder.** Next step, not the top.
2. **Write down how your team uses AI** (L2). Commit it.
3. **Extract a skill** on the second repeated prompt.

<div class="divider"></div>

**Bonus · tools worth stealing**

<span class="small dim">Same context window, twice the room.</span>

- [**Caveman**](https://github.com/JuliusBrussee/caveman): trims what the agent says back.
- [**RTK**](https://github.com/rtk-ai/rtk): trims what the terminal pipes in.
- [**agnostic-ai**](https://github.com/Chemaclass/agnostic-ai): write context once, sync to 14+ tools.

<!--
Three concrete actions, each one move not a concept: (1) locate yourself on the ladder and pick the next step, not the top; (2) write down how your team uses AI (L2) and commit it; (3) extract a skill on the second repeated prompt. Pick one.
Bonus tools worth stealing: Caveman trims what the agent says back; RTK trims what the terminal pipes in (same context window, twice the room); agnostic-ai writes your context once and syncs it to 14+ tools.
Callback to the slide-5 poll: who'll be one step higher by Monday? Leave this slide up during Q&A (~5 min).
-->

---

<!-- _class: quote -->
<!-- _paginate: false -->

> Speed is a gift.<br>**Direction is a responsibility.**

<span class="small dim">The human supervises, understands, gives meaning. The machine does the rest.</span>

<div class="divider"></div>

<span class="small">When the hype settles, the question won't be "did you use AI?"<br>It'll be "at what level, and with what direction?"</span>

<span class="small thanks"><strong>Thanks</strong> · chemaclass.com/tags/ai</span>

<!--
Closing frame: when the hype settles, the question won't be "did you use AI?" but "at what level, and with what direction?" Speed is a gift; direction is a responsibility.
More on these ideas: chemaclass.com/tags/ai
-->
