+++
title = "Open-Source Software"
description = "A practical guide to open-source software: its benefits, how to start contributing, and why sharing code accelerates your career growth."
[taxonomies]
tags = [ "open-source", "git", "career", "productivity" ]
[extra]
subtitle = "The power of contributing to OSS"
static_thumbnail = "/images/blog/2021-05-03/cover.webp"
related_posts = [
  "blog/2021-02-01-phel-first-release.md",
  "blog/2024-04-02-learning-concurrency-in-golang.md",
  "blog/2026-07-14-working-with-the-garage-door-open.md",
]
related_readings = [
  "readings/2016-10-01-the-pragmatic-programmer.md",
  "readings/2022-06-29-modern-software-engineering.md",
]
+++

Every project you ship stands on open-source software. Your framework, your test runner, your compiler, the small library you never think about.

You use it every day. The real question is whether you ever give back.

<!-- more -->

Giving back is not charity. It is one of the fastest ways to grow as a developer.

## What is OSS?

Open-source is not the same as free software. Free software is one kind of open-source, but open-source does not have to be free to use. Two examples draw the line. [PHPUnit](https://github.com/sebastianbergmann/phpunit/blob/master/LICENSE) is open-source and free. [Spryker](https://github.com/spryker/spryker-core/blob/master/LICENSE) is open-source and paid. Both publish their code for anyone to read.

> OSS is software that is public, open to the world.

## Benefits

Two groups win from open-source: the companies that publish it, and the people who contribute.

### For companies

Open access drives adoption. The easier the code is to get, the faster people build on it. Training and tutorials pull in newcomers and grow the ecosystem. The code tends to sit on the cutting edge, because software that stands still goes obsolete. A public project gathers a community around it, and public channels make that community easy to join.

And because anyone can read the source, anyone can check its quality. That is trust you cannot fake.

### For individual contributors

You pick what you work on. You practice real skills without the pressure of a production outage. You get to play with the newest features of your language, or try a language you have never touched.

You also sharpen the soft skills that carry a career: writing clearly, explaining a change, holding your ground when people disagree.

> The code teaches the hard skills. The disagreements teach the rest.

## Contributing to OSS

### Getting started with GitHub

Starting is easy, and you have two doors. Open your own project, or contribute to one that already exists. A pet project fits the first door perfectly.

### Pet projects

A pet project is a playground to build real software and train real skills. Put it on your public GitHub profile and you get every benefit of contributing to OSS, plus one more: you answer to nobody. You set the roadmap. You decide what to build and how. You are your own boss.

> The project is there for you. You are responsible to play, explore, and push past your limits.

### My pet projects

**Active:**
- [agnostic-ai](https://github.com/Chemaclass/agnostic-ai): write AI agents, skills, rules, and hooks once, use them in every AI CLI.
- [bashdep](https://github.com/Chemaclass/bashdep): a simple dependency manager for Bash.
- [phel-snake](https://github.com/Chemaclass/phel-snake): the snake game in your terminal, written in Phel.
- [edifact-parser](https://github.com/Chemaclass/EdifactParser): a parser for a UN/EDIFACT file format in PHP.
- [unspent](https://github.com/Chemaclass/unspent): a PHP library for UTXO-like bookkeeping with unspent entries.

**Inactive:**
- [create-pr](https://github.com/Chemaclass/create-pr): a Bash script to open a pull request from your branch and context.

**Abandoned:**
- [stock-ticker](https://github.com/Chemaclass/stock-ticker): get a notification with the news from your favorite Tickers.
- [jira-status-notifier](https://github.com/Chemaclass/JiraStatusNotifier): Notify when the JIRA tickets don't move along.
- [php-best-practices](https://github.com/Chemaclass/php-best-practices): what I considered best practices for web-dev (archived).
- [php-scaffolding](https://github.com/Chemaclass/php-scaffolding): a basic PHP scaffolding with Docker (archived).
- [knob-mvc](https://github.com/Chemaclass/knob-mvc): a framework to create WordPress templates (2015/2017).

> ... and many more on [github.com/Chemaclass](https://github.com/Chemaclass)

### My OSS organization contributions

**Active:**
- [phel-lang](https://github.com/phel-lang/phel-lang): Phel is a functional programming language that compiles to PHP.
  It is a dialect of Lisp inspired by Clojure and Janet. I already wrote a post about
  this: [Phel: A Lisp that compiles to PHP](/blog/phel-first-release/)
- [gacela-project](https://github.com/gacela-project/gacela): Gacela is a PHP framework that helps you to improve the
  design of your application by splitting the logic into different modules.

**Abandoned:**
- [nm_template](https://github.com/NuevaMetal/nm_template): The base template for NuevaMetal (2013-2016).

## Knowledge Sharing and Impact

Code is only half of it. The other half is what you write down and hand to the next person.

### Blog posts

- [Pull Requests vs Pair Programming](/blog/pull-request-vs-pair-prog/)
- [The Process Itself Is the Goal](/blog/the-process-itself-is-the-goal/)
- [The Art of Refactoring: When, How, and Why](/blog/the-art-of-refactoring/)
- [The Art of Testing: Where Design Meets Quality](/blog/the-art-of-testing/)

> ... and many more on [https://chemaclass.com/blog/](https://chemaclass.com/blog/)

### The beauty of OSS

Contribute in public long enough and you start to see your own growth. The corrections you keep making. The code you wrote last year, already aged. The mistakes, all of them, in the open. And underneath, the slow proof that you are getting better.

You build a sixth sense for patterns you have hit before, the good ones and the painful ones.

**Show your skills. Help the people around you.** That is [working with the garage door open](/blog/working-with-the-garage-door-open/).

> Open-source software offers you one of the best opportunities to start building a career of continuous improvement.

---

This is a (Spanish) talk that I did remotely on April 2021,
for [PHPMad Madrid Community](https://www.meetup.com/phpmad/events/277733306/). I present all these ideas
together with a live demo of how to contribute to a real OSS.

{{ youtube(id="GE5wR_SC_P4") }}

---
