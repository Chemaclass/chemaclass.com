+++
title = "Phel: the Lisp that compiles to PHP"
description = "The new functional language. Fully interoperability with PHP 🚀"
[taxonomies]
tags = [ "software", "functional-programming", "lisp", "php" ]
[extra]
static_thumbnail = "/images/blog/2021-02-01/cover.jpg"
+++

![blog-cover](/images/blog/2021-02-01/cover.jpg)

The new FP language build-in PHP. Check it out!

<!-- more -->

# The Phel Language

Phel is a Functional Programming ([FP](https://en.wikipedia.org/wiki/Functional_programming)) language that compiles to PHP. It is a dialect of [Lisp](https://en.wikipedia.org/wiki/Lisp_(programming_language)) inspired by Clojure and Janet.

## Features

- Built on PHP's ecosystem
- Good error reporting
- Different Datastructures (Arrays, Tables, and Tuples)
- Macros
- Recursive functions
- Powerful but simple Syntax
- REPL

## Why Phel?

Phel is a creation of Jens Haase, and as he mentions on the website, "it is the result of many [failed attempts to do functional programming in PHP](https://phel-lang.org/blog/functional-programming-in-php)". He was looking for something with these characteristics:

- A LISP-inspired
- Functional Programming language
- That runs on cheap hosting providers
- It is easy to write and debug

From my point, it was ending May 2020 when I finished the
book [Seven Languages in Seven Weeks](/readings/7-languages-in-7-weeks/), in which I learned a bit of Prolog, Erlang,
Clojure, Haskell… I even created a [repository in GitHub](https://github.com/Chemaclass/7LangIn7Weeks) to store my
progress over the weeks with these learnings.

Suddenly, one day beginning of June 2020, I saw a post in Reddit's PHP official channel, with a message of someone
mentioning this "**Phel**" project, claiming to be a **"functional programming language" written in PHP**!

I work with PHP for around 8 years so far, and I always try to combine OOP with FP as much as possible (because I
believe both paradigms are better combined; they are not necessarily exclusive), and a new dialect of Lisp fully written
in native **PHP 7.4** sounded really exciting. I decided to take a look at it. I wanted to see the code.

The fresh readings from [Mathias NoBack](https://twitter.com/matthiasnoback) books such
as [Object Design Style Guide](/readings/object-design-style-guide),
and [Advanced Web Application Architecture](/readings/advance-web-application-architecture/), gave me the courage to try
out what I learned and put it for real in a project. This was (and still is) a beautiful challenge, which helps me to
test myself and grow professionally at the same time.

My first commit was done on 6 June 2020, and since then I work on this project a bit (almost) every day in my free time.
It helps me to learn more about FP, languages internal design, and best practices on testing and software design
architecture in general.

I started applying minor changes until I ended refactoring the whole compiler structure (among other things) in order to
make the modules easier to read and understand. Psalm, strict types, good test coverage, unifying code style… These were
some of my favorite topics.

## Example of Phel code

The following example gives a short impression of how Phel looks like:
```phel
# Define a namespace
(ns my\example)
# Define a variable with name "my-name" and value "world"
(def my-name "world")
# Define a func with name "print-name" and one argument
(defn print-name [your-name]
  (print "hello" your-name))
# Call the function
(print-name my-name)
```

## Current status of Phel
- We have an open [Gitter Community](https://gitter.im/phel-lang/community) where we help each other
- We prepared an easy [Getting Started Guide](https://phel-lang.org/documentation/getting-started/)
- We prepared an easy GitHub Repository with a [Phel Scaffolding Template](https://github.com/phel-lang/phel-scaffolding)
- We just released the first official version: [0.1.0](https://github.com/phel-lang/phel-lang/tags)

Check out the official website with all documentation: [https://phel-lang.org/](https://phel-lang.org/)

---

### Also recommended

- [Functional Programming with Phel - JesusValera](https://jesusvalerareales.medium.com/functional-programming-with-phel-5f32145eddb7)
