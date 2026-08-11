+++
title = "Working Effectively with Legacy Code"
description = "Michael Feathers on adding tests to untested code, breaking dependencies, and refactoring legacy systems safely."
authors = [ "Michael Feathers" ]
[taxonomies]
tags = [ "refactoring", "testing", "tdd", "software-design" ]
[extra]
subtitle = "Start-to-finish strategies for working with large, untested legacy code bases"
pages = "460"
author = "Michael Feathers"
static_thumbnail = "/images/readings/working-effectively-with-legacy-code.webp"
related_posts = [
  "blog/2020-08-17-testing-effectively-legacy-code.md",
  "blog/2020-06-28-the-art-of-refactoring.md",
  "blog/2020-04-07-the-art-of-testing.md",
]
related_readings = [
  "readings/2016-05-01-clean-code.md",
  "readings/2022-07-11-clean-craftsmanship.md",
  "readings/2016-10-01-the-pragmatic-programmer.md",
]
+++

<!-- more -->

## What is legacy code?

> Legacy code is simply code without tests.

### Benefits of tests

Behavior is central to understanding the benefits of [testing](/blog/the-art-of-testing/):

> Behavior is the most important thing about software. It is what users depend on. Users like it when we add behavior (provided it is what they really wanted), but if we change or remove behavior they depend on (introduce bugs), they stop trusting us.

### How to get tests in place in legacy codebases

When we change code, we should have tests in place. To put the tests in place, we often have to change code.

The suggested approach:
1. Identify change points.
2. Find test points.
3. Break dependencies.
4. Write tests.
5. Make changes and refactor.

Another useful term is a "**seam**." A seam, in this context, is "**a place where you can alter behavior in your program
without editing in that place**". The analogy is to a seam in clothing, the place where two parts are stitched together.
In software, **these places are generally places where there are well-defined interfaces**. This can be leveraged to change
the implementation using techniques such as dependency injection or [mocking](/blog/to-mock-or-not-to-mock/) interfaces in the case of writing tests.

---

{{ youtube(id="wRtJRkRIa2s") }}
