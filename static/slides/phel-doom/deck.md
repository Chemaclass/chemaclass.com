---
marp: true
title: "Running DOOM with Phel"
description: "We learn Phel (a Lisp that compiles to PHP) by building a DOOM clone, exploring persistent data structures, macros, and the REPL."
author: "Chemaclass"
keywords: "Phel, Lisp, PHP, functional programming, macros, REPL, DOOM"
url: "https://chemaclass.com/slides/phel-doom/"
image: "https://chemaclass.com/slides/phel-doom/assets/screenshot.png"
theme: uncover
paginate: true
footer: "Running DOOM with Phel · Chemaclass"
backgroundColor: #f8fafc
color: #1e293b
style: |
  /* === phel-lang.org look & feel - light mode ===
     bg          #f8fafc   slate-50
     surface     #f1f5f9   slate-100 (code blocks)
     base text   #1e293b   slate-800
     muted       #64748b   slate-500
     accent      #512da8   logo violet (unchanged)
     syntax: keyword #6d28d9 · string #0f766e · php/interop #be185d
             keysym #0369a1 · number #b45309 · comment #94a3b8 */
  @import url("https://fonts.bunny.net/css?family=fira-code:400,500,600&display=swap");
  section {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 30px;
    line-height: 1.6;
    justify-content: flex-start !important;
    align-content: flex-start !important;
    padding: 52px 72px 40px;
    background: #f8fafc;
    color: #1e293b;
  }
  section.lead { justify-content: center; text-align: center; padding: 48px; }
  h1 { color: #512da8; font-size: 62px; font-weight: 800; letter-spacing: -0.02em; margin: 0 0 16px; }
  h2 { color: #512da8; font-weight: 700; font-size: 40px; margin: 0 0 20px; }
  h3 { color: #6d28d9; font-weight: 700; font-size: inherit; margin: 0 0 12px; }
  p { margin: 0 0 12px; }
  ul, ol { margin: 4px 0 12px; padding-left: 1.4em; }
  li { margin-bottom: 6px; }
  code { font-family: "Fira Code", ui-monospace, "JetBrains Mono", Consolas, Monaco, monospace; background: #f1f5f9; color: #1e293b; border-radius: 4px; padding: 0.1em 0.35em; font-size: 0.88em; }
  pre { font-size: 22px; line-height: 1.55; border-radius: 10px; background: #f1f5f9; border: 1px solid #cbd5e1; margin: 0 0 14px; padding: 14px 18px; }
  pre code { background: transparent; padding: 0; font-size: inherit; font-variant-ligatures: contextual; }
  strong { color: #512da8; }
  a { color: #512da8; text-decoration: none; border-bottom: 1px solid #512da8; }
  blockquote {
    border: none;
    border-left: 3px solid #7c5cc4;
    color: #374151;
    font-style: italic;
    text-align: left;
    padding: 8px 16px;
    margin: 10px 0 14px;
  }
  blockquote::before { content: none; }
  blockquote::after { content: none; }
  table { font-size: 20px; border-collapse: collapse; width: 100%; margin: 0 0 12px; }
  table th { color: #512da8; padding: 8px 14px; }
  table td { padding: 7px 14px; }
  table td, table th { border-color: #cbd5e1; }
  ul li::marker { color: #7c5cc4; }
  /* Lead/divider slides */
  section.lead { background: linear-gradient(135deg, #2a1f52 0%, #3b1d8a 100%) !important; color: #f8fafc; justify-content: center !important; align-content: center !important; }
  section.lead h1 { font-size: 62px; margin-bottom: 12px; }
  section.lead h2 { font-size: 32px; margin-bottom: 8px; }
  section.lead h3 { margin-bottom: 20px; }
  section.lead h1, section.lead h2, section.lead h3 { color: #f1f5f9; }
  section.lead p, section.lead li { color: #e2e8f0; }
  section.lead strong { color: #c4b5fd; }
  section.lead a { color: #c4b5fd; border-bottom-color: #7c5cc4; }
  section.lead .small { color: #e2e8f0; }
  section.lead blockquote { color: #e2e8f0; border-left-color: #c4b5fd; }
  section.lead blockquote::before { color: #c4b5fd; }
  .small { font-size: 21px; color: #64748b; margin-top: 4px; }
  .reflex { color: #0f766e; font-size: 20px; line-height: 1.4; margin-top: 6px; }
  .wf-step { font-size: 24px; }
  .chip { font-size: 15px; display: inline-block; background: #ede9fe; color: #512da8; border-radius: 999px; padding: 2px 10px; font-weight: 600; }
  /* Two-column split: full-width header above, text-left + image-right below */
  .split { display: flex; gap: 28px; align-items: center; margin-top: 6px; }
  .split > .col-text { flex: 1; }
  .split > .col-img { flex: 1; }
  .split > .col-img img { width: 100%; border-radius: 8px; box-shadow: 0 2px 12px rgba(15,23,42,.18); }
  .ray-demo { width: 100%; max-height: 420px; height: auto; display: block; margin: 6px auto 10px; }
  .shot { display: block; margin: 18px auto 0; height: 210px; width: auto; max-width: 70%; border-radius: 10px; box-shadow: 0 2px 12px rgba(15,23,42,.18); }
  .formula { font-family: "Fira Code", ui-monospace, monospace; font-size: 40px; font-weight: 600; color: #512da8; text-align: center; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 12px; padding: 22px 18px; margin: 22px auto; }
  .formula .den { color: #be185d; }
  @keyframes raysweep { 0% { opacity: 0 } 2% { opacity: 1 } 7% { opacity: 1 } 12% { opacity: 0 } 100% { opacity: 0 } }
  @media (prefers-reduced-motion: reduce) { .ray-demo [style*="raysweep"] { animation: none !important } }
  footer { color: #94a3b8; }
  section::after { color: #94a3b8; }
  /* === code-token colours - light syntax theme === */
  .hljs-keyword, .hljs-selector-tag       { color: #6d28d9; }  /* defn def if cond let ns recur */
  .hljs-string, .hljs-meta-string         { color: #0f766e; }  /* "strings" */
  .hljs-built_in, .hljs-title.function_, .hljs-name { color: #be185d; }  /* php/... interop, fn names */
  .hljs-symbol, .hljs-literal             { color: #0369a1; }  /* :keywords, true/false/nil */
  .hljs-number                            { color: #b45309; }  /* numbers */
  .hljs-comment, .hljs-quote              { color: #94a3b8; font-style: italic; }  /* ; comments */
  .hljs-attr, .hljs-attribute             { color: #0369a1; }
  .hljs-title, .hljs-title.class_         { color: #374151; }
  .hljs-variable, .hljs-params            { color: #374151; }
  /* Audience toggle (PHP default / TS via ?for=ts). Pre-paint flash guard only;
     the real toggle rules are injected unscoped at runtime, since Marp scopes
     everything here under `section` and would break html[data-aud] selectors. */
  .aud-ts { display: none; }
---

<!--
PRESENTER DECK, Marp.
  npx @marp-team/marp-cli deck.marp.md -o deck.html --allow-local-files   (interactive, press p for notes)
  npx @marp-team/marp-cli deck.marp.md -o deck.pdf --allow-local-files    (clean PDF)
  npx @marp-team/marp-cli -p -w deck.marp.md --allow-local-files          (live preview)
  (--allow-local-files is REQUIRED: the deck embeds assets/screenshot.png)

STRUCTURE: simple → complex. Slides 1-18 = pure Phel basics (no game code).
Slides 19+ = real phel-doom code.
-->

<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _footer: "" -->

# Running DOOM with Phel

### Building a raycasting engine with functional Phel

**Chemaclass**

---

<!-- _paginate: false -->
<!-- _backgroundColor: #0a0a0a -->
<!-- _footer: "" -->

![bg fit](assets/screenshot.png)

---

<!-- _class: lead -->

![bg brightness:0.35](assets/screenshot.png)

# Wait, what?

This is **DOOM**. In a **terminal**.
Written in a **Lisp**. That compiles to **PHP 8.4**.

## Write Lisp. Ship PHP. Even DOOM.

<span class="small">~11,700 lines of Phel · same raycasting idea as id Software's 1993 original · ~5 ms/frame</span>

---

## What you'll leave with

1. **Why** Phel exists and what makes it different
2. **How** to write it from zero: syntax, data, state
3. **How** it plugs into PHP: all of PHP, the REPL, one CLI
4. **How** immutability shapes a real project: DOOM

> We learn by **building the game**. No spec-reading.

---

## What is Phel?

- A **functional Lisp** that compiles to PHP
- `Clojure -> JVM :: Phel -> PHP`
- Immutability, macros, clean pipelines. 
- All within the PHP ecosystem.
- Just a **Composer package.** No new runtime, no new server.

```bash
composer require phel-lang/phel-lang
```

<span class="reflex aud-php">🧠 "New language = new runtime + new hires"? No. It's a Composer package.</span><span class="reflex aud-ts">🧠 "New language = new runtime + new hires"? No. It installs like any dependency, into a PHP stack.</span>

---

## It's still PHP under the hood

```bash
vendor/bin/phel build    # compiles .phel → out/*.php
```

- **Ahead-of-time compiled.** Not interpreted at runtime.
- Output is **plain PHP 8.4.** Any host, zero Phel in production.
- **OPcache + JIT** apply for free.
- Ships as `vendor/bin/phel`. One CLI for everything.

> Write Lisp. Ship PHP. Server needs nothing new.

---

<!-- _class: lead -->
# ACT 1
## Phel basics, for <span class="aud-php">PHP</span><span class="aud-ts">TS</span> developers

*Ten minutes. Zero Lisp needed.*

---

## The whole syntax, in 30 seconds

```clojure
; operator comes FIRST, no precedence rules
(+ 1 2 3)              ; =>  6 (PHP: 1 + 2 + 3)
(str "Hello " "Phel")  ; =>  "Hello Phel"
(> 5 3)                ; =>  true (PHP: 5 > 3)
```

```clojure
; every form is: ( operator  arg1  arg2 ... )
(+ 1 (* 2 3))  ; =>  7
(= "a" "a")    ; =>  true
(not false)    ; =>  true
```

That's the entire syntax. Everything else is just functions.

<span class="reflex">🧠 `1 + 2 * 3` has precedence rules. In Phel: always `(op args)`, no exceptions.</span>

---

## Variables

**`def`**: immutable top-level binding (PHP: `$x = 5`)

```clojure
(def x 5)
(def greeting "Hello!")
(def active? true)  ; ? suffix = boolean convention
```

**`let`**: local bindings, scoped to the block

```clojure
(let [a 10
      b 20
      total (+ a b)]
  total)  ; =>  30   (a, b, total don't exist outside)
```

<span class="reflex aud-php">🧠 PHP: any var is reassignable from anywhere. `def` says "this never changes."</span><span class="reflex aud-ts">🧠 TS: `let` reassigns from anywhere. `def` is like a module-level `const`: this never changes.</span>

---

## Functions

```clojure
;; defn name args body  (last expression = return value, no `return`)
(defn greet [name]
  (str "Hello, " name))

(greet "PHP Conf")  ; =>  "Hello, PHP Conf"
```

- `defn` = public · `defn-` = private (unexported)
- Shorthand: `#(* % 2)` = `(fn [x] (* x 2))`  - like `fn($x) => $x * 2`

```clojure
(map #(* % 2) [1 2 3])  ; =>  [2 4 6]
```

<span class="reflex aud-php">🧠 PHP: `function greet($n) { return "Hello, ".$n; }` · `fn($x) => $x * 2`</span><span class="reflex aud-ts">🧠 TS: `function greet(n) { return "Hello, " + n; }` · `(x) => x * 2`</span>

---

## Data structures

```clojure
{:name "Chema" :age 33}  ; map   (PHP: ["name" => "Chema", "age" => 33])
[:a :b :c]               ; vector, PHP: [0 => "a", 1 => "b", 2 => "c"]
#{:red :green :blue}     ; set   , unique values only
```

**Access** with `get`:

```clojure
(get {:name "Chema"} :name)  ; =>  "Chema"
(get [:a :b :c] 1)           ; =>  :b
```

**Keywords** (`:name`, `:active?`): typed constants, 
like PHP string keys but faster to compare

<span class="reflex aud-php">🧠 PHP arrays do everything. Phel separates the concept: map / vector / set.</span><span class="reflex aud-ts">🧠 TS splits object / array / `Set` already. Phel makes the split first-class and immutable.</span>

---

## Working with collections

```clojure
(def nums [1 2 3 4 5])

(map #(* % 2) nums)  ; =>  [2 4 6 8 10]
(filter even? nums)  ; =>  [2 4]
(reduce + 0 nums)    ; =>  15
```

```clojure
;; for comprehension: build a new vector with conditions
(for [x :in nums :when (odd? x)] (* x x))  ; =>  [1 9 25]
```

<span class="reflex aud-php">🧠 `array_map` / `array_filter` / `array_reduce` - same patterns, first-class in Phel.</span><span class="reflex aud-ts">🧠 `.map` / `.filter` / `.reduce` - same patterns, first-class in Phel.</span>

---

## Branching

```clojure
;; if is an expression, it returns a value
(if true "yes" "no")      ; =>  "yes"
(if (> 5 3) :big :small)  ; =>  :big
```

```clojure
;; cond = multi-branch, also an expression
(defn grade [score]
  (cond
    (>= score 90) :A
    (>= score 75) :B
    :else         :C))

(grade 82)  ; =>  :B
```

<span class="reflex aud-php">🧠 PHP `switch` is a statement. `cond` IS the value, assign it directly.</span><span class="reflex aud-ts">🧠 TS: `switch` is a statement, `cond` IS the value. No nested ternaries.</span>

---

## Threading: pipelines, not nesting

```clojure
; PHP: strtoupper(trim("  hello  "))
; nested = read inside-out. -> = read top-to-bottom:
(-> "  hello  "
    php/trim           ; =>  "hello"
    php/strtoupper)    ; =>  "HELLO"
```

```clojure
; -> passes the value as the FIRST arg of the next call
(-> 10
    (+ 5)     ; (+ 10 5)  =>  15
    (* 2)     ; (* 15 2)  =>  30
    str)      ; (str 30)  =>  "30"
```

<span class="reflex aud-php">🧠 `$obj->method()->chain()` needs fluent objects. `->` works on any value.</span><span class="reflex aud-ts">🧠 `obj.method().chain()` needs fluent objects. `->` works on any value.</span>

---

## Loops without mutation

No `while`. No `$i++`. No mutable variables.

```clojure
; loop declares the bindings, recur restarts with new values
(loop [i 0, sum 0]
  (if (= i 5)
    sum                           ; done, return sum
    (recur (inc i) (+ sum i))))   ; =>  10  (0+1+2+3+4)
```

- `loop [i 0, sum 0]`: initial state
- `recur (inc i) (+ sum i)`: next iteration, no stack growth
- Last branch with no `recur`: the return value

<span class="reflex">🧠 `loop` = "start here". `recur` = "next iteration, no new stack frame."</span>

---

<!-- _class: lead -->
# ACT 2
## PHP interop and tooling

*But can it touch real PHP?*

---

## No wall. All of PHP is your stdlib

```clojure
; prefix any PHP function with php/
(php/strtoupper "hello")      ; =>  "HELLO"
(php/strlen "doom")           ; =>  4
(php/date "Y-m-d")            ; =>  "YYYY-MM-DD"
```

```clojure
; PHP objects and methods work too
(def dt (php/new DateTime "2024-01-01"))
(.format dt "Y-m-d")          ; =>  "2024-01-01"   ($dt->format("Y-m-d"))
DateTime/ATOM                  ; =>  "Y-m-d\TH:i:sP"  (::ATOM static const)
```

Any Composer package works.
**Symfony Console** powers this game's CLI.

<span class="reflex">🧠 "But does it have a library for X?" Yes. All of them. It's PHP.</span>

---

## The REPL: try everything live

```bash
vendor/bin/phel repl
```

```clojure
phel:> (+ 1 2 3)
6
phel:> (defn greet [n] (str "Hello, " n))
phel:> (greet "PHP Conf")
"Hello, PHP Conf"
phel:> {:x 10 :y 20}
{:x 10 :y 20}
phel:> (-> "  hello  " php/trim php/strtoupper)
"HELLO"
```

Load any namespace. Probe any function. No rebuild, no restart.

---

<!-- _class: lead -->
# ACT 3
## Now let's build a game

*Does immutability survive a real project?*

---

## The entry point

```clojure
(ns phel-doom.main                ; namespace, dot mirrors the path
  (:require phel.cli :as cli)     ; Symfony Console, wrapped in Phel
  (:require phel-doom.commands.play :refer [play-command]))

(def app
  (cli/application
   {:name "phel-doom" :default "play"
    :commands [play-command]}))

(when-not *build-mode*            ; skip side-effects during phel build
  (php/exit (cli/run app (cli/argv argv))))
```

<span class="small">src/main.phel: the bootstrap (version wiring trimmed)</span>

<span class="reflex aud-php">🧠 `ns` = namespace. `:require … :as` = `use X as Y`. `:refer` = `use function X`. Same idea, Lisp syntax.</span><span class="reflex aud-ts">🧠 `ns` = module. `:require :as` = `import * as Y`. `:refer` = `import {x}`.</span>

---

## ...and `play-command` is one loop, forever

`main` just wires the CLI. The whole game is a loop, ~60×/second:

```
  input  ──→  tick-world  ──→  render!  ──┐
  keys        world→world     world→ANSI  │
  held        (pure)          (io)        │
    ▲                                     │
    └─────────── new world ───────────────┘
```

Each frame: `world' = (tick-world world keys dt)`. Draw, discard, repeat.

<span class="reflex">🧠 The whole game is a **fold over keystrokes** - a fresh world each frame.</span>

---

## The whole game is one immutable value

```clojure
(defn new-world [grid player]
  {:grid    grid
   :player  player       ; {:x :y :angle}
   :enemies []
   :lives   max-lives
   :weapon  :pistol
   :kills   0})          ; ...ammo, armor, doors, etc.
```

This single map **IS the game**.
- diff it to find what changed
- save it to disk for quick-save
- replay it from a seed for deterministic demos

---

## Functions create data, not objects

<div class="aud-php">

```php
class Player { // PHP - class + mutation
    public function __construct(
        public float $x, public float $y, public float $angle
    ) {}
}
$p = new Player(2.5, 3.5, 0.0);
$p->angle = 1.57;   // mutates in-place
```

</div>
<div class="aud-ts">

```typescript
class Player { // TS - class + mutation
  constructor(
    public x: number, public y: number, public angle: number,
  ) {}
}
const p = new Player(2.5, 3.5, 0.0);
p.angle = 1.57;   // mutates in-place
```

</div>

```clojure
; Phel - function + immutable update
(defn new-player [x y angle] {:x x :y y :angle angle})
(new-player 2.5 3.5 0.0)         ; => {:x 2.5 :y 3.5 :angle 0.0}
(assoc player :angle 1.57)        ; => new map, original unchanged
```

<span class="reflex">🧠 Same semantics, half the code. `assoc` returns a new map - original never touched.</span>

---

## One pure frame: `tick-world`

```clojure
(defn tick-world [world keys dt edges]
  (-> world
      (apply-physics dt)     ; movement + collision
      (pickup-hearts)        ; items on the floor
      (tick-enemies dt)      ; enemy AI
      (tick-projectiles dt)  ; fireballs in flight
      (tick-shooting edges)  ; your weapon
      (damage-step dt)))     ; resolve damage
```

Every subsystem is `world -> world`. Old world discarded.
A bug stays **trapped in its subsystem** - it can't corrupt the rest.

<span class="reflex aud-php">🧠 PHP: subsystems mutate shared state. Here: one in, one out. Nothing else can touch it.</span><span class="reflex aud-ts">🧠 TS: shared mutable state drifts. Here: one in, one out. Nothing else can touch it.</span>

---

## Architecture: effects in exactly one place

```
io/  →  glue/  →  core/        (dependencies go one way only)
```

- **`core/`:** pure logic (engine, combat, physics). No print, time, or rand.
- **`glue/`:** pure wiring (controls, input parsing).
- **`io/`:** side effects only (render!, audio, files).

```bash
tree src/
# src/core/   src/glue/   src/io/   src/commands/
```

> Purity is not mere taste. Structure enforces it.

---

## Fake 3D: a flat 2D map

The world is really a **maze on graph paper**:

<div class="split">
<div class="col-text">

```
#######
#.@...#
#.....#
#######
```

You move on a **flat grid, top-down.** The 3D is an illusion.

So how does a flat map become *that* view? →

</div>
<div class="col-img">

![](assets/screenshot.png)

</div>
</div>

<!-- DEMO: phel run phel-doom.main demo --phase 1  (bare raycaster: 3D left, 2D map right, walls only) -->

---

## DOOM (1993): Carmack's math

**id Software, John Carmack.** A 486. No GPU. 11 months.

One ray per column, marched to the first wall → distance `d`.

<div class="formula">strip height = screen height <span class="den">/ d</span></div>

Small `d` = **tall strip.** One division per ray. No 3D engine.

<span class="reflex aud-php">🧠 PHP instinct: reach for a 3D rendering library. Carmack: constrain the world, trust the math.</span><span class="reflex aud-ts">🧠 JS instinct: reach for WebGL or three.js. Carmack: constrain the world, trust the math.</span>

---

## See it: rays in, walls out

<svg viewBox="0 0 700 360" xmlns="http://www.w3.org/2000/svg" class="ray-demo" role="img" aria-label="raycasting animation">
<rect x="24" y="28" width="300" height="300" rx="8" fill="#eef2f7" stroke="#cbd5e1"/>
<rect x="372" y="28" width="300" height="150.0" fill="#dfe6ef"/>
<rect x="372" y="178.0" width="300" height="150.0" fill="#c3ccd8"/>
<rect x="372" y="28" width="300" height="300" rx="8" fill="none" stroke="#cbd5e1"/>
<line x1="174.0" y1="328.0" x2="204.6" y2="238.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="199.5" y2="238.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="194.8" y2="238.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="191.6" y2="230.7" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="191.6" y2="196.6" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="191.6" y2="129.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="185.9" y2="58.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="174.0" y2="58.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="162.1" y2="58.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="150.1" y2="58.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="137.7" y2="58.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="125.0" y2="58.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="111.7" y2="58.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="97.5" y2="58.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<line x1="174.0" y1="328.0" x2="82.3" y2="58.0" stroke="#c7b8ea" stroke-width="1" opacity="0.55"/>
<rect x="652.0" y="48.0" width="20.6" height="260.0" fill="rgb(116,85,184)"/>
<rect x="632.0" y="48.0" width="20.6" height="260.0" fill="rgb(116,85,184)"/>
<rect x="612.0" y="48.0" width="20.6" height="260.0" fill="rgb(116,85,184)"/>
<rect x="592.0" y="57.7" width="20.6" height="240.6" fill="rgb(114,83,182)"/>
<rect x="572.0" y="89.0" width="20.6" height="178.0" fill="rgb(106,75,169)"/>
<rect x="552.0" y="119.2" width="20.6" height="117.6" fill="rgb(89,60,143)"/>
<rect x="532.0" y="134.7" width="20.6" height="86.7" fill="rgb(71,43,117)"/>
<rect x="512.0" y="134.7" width="20.6" height="86.7" fill="rgb(71,43,117)"/>
<rect x="492.0" y="134.7" width="20.6" height="86.7" fill="rgb(71,43,117)"/>
<rect x="472.0" y="134.7" width="20.6" height="86.7" fill="rgb(71,43,117)"/>
<rect x="452.0" y="134.7" width="20.6" height="86.7" fill="rgb(71,43,117)"/>
<rect x="432.0" y="134.7" width="20.6" height="86.7" fill="rgb(71,43,117)"/>
<rect x="412.0" y="134.7" width="20.6" height="86.7" fill="rgb(71,43,117)"/>
<rect x="392.0" y="134.7" width="20.6" height="86.7" fill="rgb(71,43,117)"/>
<rect x="372.0" y="134.7" width="20.6" height="86.7" fill="rgb(71,43,117)"/>
<line x1="174.0" y1="328.0" x2="204.6" y2="238.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:4.2s"/>
<circle cx="204.6" cy="238.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:4.2s"/>
<rect x="652.0" y="48.0" width="20.6" height="260.0" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:4.2s"/>
<rect x="652.0" y="48.0" width="20.6" height="260.0" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:4.2s"/>
<line x1="174.0" y1="328.0" x2="199.5" y2="238.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.9s"/>
<circle cx="199.5" cy="238.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.9s"/>
<rect x="632.0" y="48.0" width="20.6" height="260.0" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.9s"/>
<rect x="632.0" y="48.0" width="20.6" height="260.0" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.9s"/>
<line x1="174.0" y1="328.0" x2="194.8" y2="238.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.6s"/>
<circle cx="194.8" cy="238.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.6s"/>
<rect x="612.0" y="48.0" width="20.6" height="260.0" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.6s"/>
<rect x="612.0" y="48.0" width="20.6" height="260.0" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.6s"/>
<line x1="174.0" y1="328.0" x2="191.6" y2="230.7" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.3s"/>
<circle cx="191.6" cy="230.7" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.3s"/>
<rect x="592.0" y="57.7" width="20.6" height="240.6" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.3s"/>
<rect x="592.0" y="57.7" width="20.6" height="240.6" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.3s"/>
<line x1="174.0" y1="328.0" x2="191.6" y2="196.6" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.0s"/>
<circle cx="191.6" cy="196.6" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.0s"/>
<rect x="572.0" y="89.0" width="20.6" height="178.0" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.0s"/>
<rect x="572.0" y="89.0" width="20.6" height="178.0" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:3.0s"/>
<line x1="174.0" y1="328.0" x2="191.6" y2="129.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:2.7s"/>
<circle cx="191.6" cy="129.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:2.7s"/>
<rect x="552.0" y="119.2" width="20.6" height="117.6" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:2.7s"/>
<rect x="552.0" y="119.2" width="20.6" height="117.6" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:2.7s"/>
<line x1="174.0" y1="328.0" x2="185.9" y2="58.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:2.4s"/>
<circle cx="185.9" cy="58.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:2.4s"/>
<rect x="532.0" y="134.7" width="20.6" height="86.7" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:2.4s"/>
<rect x="532.0" y="134.7" width="20.6" height="86.7" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:2.4s"/>
<line x1="174.0" y1="328.0" x2="174.0" y2="58.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:2.1s"/>
<circle cx="174.0" cy="58.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:2.1s"/>
<rect x="512.0" y="134.7" width="20.6" height="86.7" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:2.1s"/>
<rect x="512.0" y="134.7" width="20.6" height="86.7" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:2.1s"/>
<line x1="174.0" y1="328.0" x2="162.1" y2="58.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:1.8s"/>
<circle cx="162.1" cy="58.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:1.8s"/>
<rect x="492.0" y="134.7" width="20.6" height="86.7" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:1.8s"/>
<rect x="492.0" y="134.7" width="20.6" height="86.7" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:1.8s"/>
<line x1="174.0" y1="328.0" x2="150.1" y2="58.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:1.5s"/>
<circle cx="150.1" cy="58.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:1.5s"/>
<rect x="472.0" y="134.7" width="20.6" height="86.7" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:1.5s"/>
<rect x="472.0" y="134.7" width="20.6" height="86.7" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:1.5s"/>
<line x1="174.0" y1="328.0" x2="137.7" y2="58.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:1.2s"/>
<circle cx="137.7" cy="58.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:1.2s"/>
<rect x="452.0" y="134.7" width="20.6" height="86.7" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:1.2s"/>
<rect x="452.0" y="134.7" width="20.6" height="86.7" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:1.2s"/>
<line x1="174.0" y1="328.0" x2="125.0" y2="58.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.9s"/>
<circle cx="125.0" cy="58.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.9s"/>
<rect x="432.0" y="134.7" width="20.6" height="86.7" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.9s"/>
<rect x="432.0" y="134.7" width="20.6" height="86.7" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.9s"/>
<line x1="174.0" y1="328.0" x2="111.7" y2="58.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.6s"/>
<circle cx="111.7" cy="58.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.6s"/>
<rect x="412.0" y="134.7" width="20.6" height="86.7" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.6s"/>
<rect x="412.0" y="134.7" width="20.6" height="86.7" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.6s"/>
<line x1="174.0" y1="328.0" x2="97.5" y2="58.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.3s"/>
<circle cx="97.5" cy="58.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.3s"/>
<rect x="392.0" y="134.7" width="20.6" height="86.7" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.3s"/>
<rect x="392.0" y="134.7" width="20.6" height="86.7" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.3s"/>
<line x1="174.0" y1="328.0" x2="82.3" y2="58.0" stroke="#6d28d9" stroke-width="3" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.0s"/>
<circle cx="82.3" cy="58.0" r="4.5" fill="#be185d" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.0s"/>
<rect x="372.0" y="134.7" width="20.6" height="86.7" fill="#ede9fe" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.0s"/>
<rect x="372.0" y="134.7" width="20.6" height="86.7" fill="none" stroke="#7c3aed" stroke-width="2.5" opacity="0" style="animation:raysweep 4.5s linear infinite;animation-delay:0.0s"/>
<line x1="32.8" y1="58.0" x2="191.6" y2="58.0" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
<line x1="191.6" y1="58.0" x2="191.6" y2="238.0" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
<line x1="191.6" y1="238.0" x2="315.2" y2="238.0" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
<circle cx="174.0" cy="328.0" r="6" fill="#be185d"/>
<text x="174.0" y="350.0" text-anchor="middle" font-size="14" fill="#64748b">player</text>
<text x="174" y="18" text-anchor="middle" font-size="15" font-weight="700" fill="#512da8">top-down map</text>
<text x="522" y="18" text-anchor="middle" font-size="15" font-weight="700" fill="#512da8">rendered screen</text>
<text x="350" y="195" text-anchor="middle" font-size="22" fill="#7c5cc4">&#8594;</text>
</svg>

Left: one ray per column, distance to the wall.
Right: each distance becomes a strip. **Near = tall, far = short.**

<!-- Curved/bulging walls? We use perpendicular distance, not raw, which kills the fisheye. -->

---

## `loop/recur`: the heart of DOOM

```clojure
; march a ray forward until it hits a wall
(defn cast-ray [grid x y angle]
  (let [dx (php/cos angle)
        dy (php/sin angle)]
    (loop [dist 0.0]
      (cond
        (> dist max-depth)              max-depth   ; nothing hit
        (wall? grid (+ x (* dist dx))
                    (+ y (* dist dy))) dist         ; hit!
        :else (recur (+ dist 0.05))))))             ; keep stepping
```

No mutable counter. **Even the renderer is pure** - unit-test in one line.
**Once per screen column - ~120-180 rays a frame.**
<!--
Simplified step-march; the real engine uses DDA.
DEMO: phel run phel-doom.main demo --phase 2 (+pistol) / --phase 3 (+enemies) / --phase 4 (+cover walls)
-->

---

## Testing: pure = no mocks

```clojure
(deftest cast-ray-hits-wall
  (is (= 1.0 (cast-ray simple-grid 1.5 1.5 0.0))))

(deftest pickup-heart-grants-life
  (is (= (+ start-lives 2) (:lives (pickup-hearts world-on-heart)))))  ; one heart = 2 HP
```

```bash
composer test     # 1716 tests, green the whole way
```

No mocks. No fake terminal. No DI container.
Pure functions: call with input, check output. Done.

<!-- Nothing to mock: no clock, RNG, or renderer to fake. -->

---

## Dividend: pure is fast

Target **< 5 ms** per frame · measured **0.2 - 0.5 ms**

- **Memoize** paused frames: one-line cache, safe because pure.
- Precompute view angles: **-60%** cast time.
- Hot loop: raw arrays over persistent vectors: **~680x**.

<span class="reflex">🧠 Pure: same input, same output. Cache can't be wrong.</span>
<!-- Persistent vectors are ~680x slower in the 7,000-cell hot loop; raw arrays there. -->

---

## Read the receipts: Phel → PHP

```clojure
(defn new-player [x y angle] {:x x :y y :angle angle})
```

`phel build` → `out/phel_doom/core/state.php`

```php
\Phel::addDefinition("phel_doom.core.state", "new-player",
  new class() extends \Phel\Lang\AbstractFn {
    public function __invoke($x, $y, $angle) {
      static $__phel_const_0, $__phel_const_1, $__phel_const_2;
      return \Phel::map(
        ($__phel_const_0 ??= \Phel\Lang\Keyword::create("x")), $x,
        ($__phel_const_1 ??= \Phel\Lang\Keyword::create("y")), $y,
        ($__phel_const_2 ??= \Phel\Lang\Keyword::create("angle")), $angle);
    }
  });
```

<!--
Live: less out/phel_doom/core/state.php  (run `phel build` first).
??= interns each keyword once; defn compiles to AbstractFn + __invoke.
-->

---

<!-- _class: lead -->
# ACT 4
## Story and verdict

*So… should you use it?*

---

## Built in days, shipped in small steps

- **May 22:** first playable: raycaster + FPS combat
- **May 24:** sprint, 3 weapons, locked doors, boss
- **May 25:** enemy AI state machine + Docker
- **May 27:** 60% faster cast, secret walls, chainsaw
- **Jun 1:** BFG, quick-save, record + replay
- **Jun 2:** super shotgun, rocket, incinerator
- **Jun 3:** distributable PHAR + checksums
- **Jun 8:** real Freedoom sprites: enemies, guns, pickups + OST loop

**+400 commits.** Tiny PRs, each closing one issue.

---

## The full picture

- **Engine:** raycaster + Freedoom sprites, ~5 ms/frame
- **Levels:** 10, locked doors, secret walls
- **Combat:** 7 weapons, berserk, fire resists
- **Enemies:** 10 types → cyberdemon boss
- **Systems:** quick-save, record/replay, audio

<img class="shot" src="assets/screenshot.png" alt="phel-doom gameplay">

---

<!-- _class: lead -->
# ACT 5
## Live demo

*Enough slides.*

---

## Demo: `phel run phel-doom.main play`

1. Level 1: move (WASD), turn, strafe, sprint. Walls + minimap.
2. Fire: pistol → shotgun → chaingun. Muzzle flash + hit-stop.
3. Take a hit: damage-direction HUD, armor, lives.
4. Secret wall (`F`), pickup, door → next level.
5. *(if time)* `--god --armory -l 10` → **cyberdemon boss**
6. **`F3` debug overlay** → live ~5 ms frame budget

<!-- Prep: big terminal font, boss command in shell history, fallback video ready. -->

---

<!-- _class: lead -->

# Thank you

## Write Lisp. Ship PHP. Even DOOM.

Reach for it when immutability + a REPL pay off.

### https://chemaclass.com/phel-doom

**Questions?** The REPL is open.

<script>
(function () {
  if (window.__audInit) return;
  window.__audInit = true;
  var KEY = "phel-doom-aud";
  var css = document.createElement("style");
  css.textContent =
    /* !important beats Marp's ID-scoped `.aud-ts{display:none}` flash guard */
    'html[data-aud="ts"] .aud-php{display:none!important}' +
    'html[data-aud="ts"] .aud-ts{display:revert!important}' +
    '.aud-toggle{position:fixed;top:12px;right:12px;z-index:99999;display:flex;' +
    'font-family:"Fira Code",ui-monospace,monospace;font-size:13px;font-weight:600;' +
    'border:1px solid #cbd5e1;border-radius:999px;overflow:hidden;background:#f1f5f9;' +
    'box-shadow:0 2px 8px rgba(15,23,42,.18);user-select:none}' +
    '.aud-toggle button{border:0;background:transparent;color:#64748b;padding:6px 15px;' +
    'cursor:pointer;font:inherit;line-height:1}' +
    '.aud-toggle button.on{background:#512da8;color:#fff}' +
    '@media print{.aud-toggle{display:none!important}}';
  document.head.appendChild(css);
  function read() {
    var p = new URLSearchParams(location.search).get("for");
    if (p === "ts" || p === "php") return p;
    try { var s = localStorage.getItem(KEY); if (s) return s; } catch (e) {}
    return "php";
  }
  function apply(aud) {
    document.documentElement.setAttribute("data-aud", aud);
    try { localStorage.setItem(KEY, aud); } catch (e) {}
    var u = new URL(location.href);
    if (aud === "ts") u.searchParams.set("for", "ts"); else u.searchParams.delete("for");
    history.replaceState(null, "", u);
    var t = document.querySelector(".aud-toggle");
    if (t) t.querySelectorAll("button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.aud === aud);
    });
  }
  function build() {
    if (document.querySelector(".aud-toggle")) return;
    var wrap = document.createElement("div");
    wrap.className = "aud-toggle";
    ["php", "ts"].forEach(function (a) {
      var b = document.createElement("button");
      b.dataset.aud = a;
      b.textContent = a.toUpperCase();
      b.addEventListener("click", function () { apply(a); });
      wrap.appendChild(b);
    });
    document.body.appendChild(wrap);
    apply(read());
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", build);
  else build();
})();
</script>

