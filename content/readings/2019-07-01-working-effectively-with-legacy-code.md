+++
title = "Working Effectively with Legacy Code"
description = "This book offers start-to-finish strategies for working more effectively with large, untested legacy code bases."
authors = [ "Michael Feathers" ]
[taxonomies]
tags = [ "refactoring", "testing", "tdd", "software-design" ]
[extra]
subtitle = "This book offers start-to-finish strategies for working more effectively with large, untested legacy code bases."
pages = "460"
author = "Michael Feathers"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/41Fh9iUog4L._SX376_BO1,204,203,200_.jpg"
+++

<!-- more -->

## What is legacy code?

> Legacy code is simply code without tests.

### Benefits of tests

Behavior is central to understanding the benefits of testing:

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
the implementation using techniques such as dependency injection or mocking interfaces in the case of writing tests.

---

{{ youtube(id="wRtJRkRIa2s") }}
