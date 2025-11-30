+++
title = "London vs Chicago"
description = "There are two known schools in TDD: the mockist school (aka Outside-in) and the classicist school (aka Inside-out)."
[taxonomies]
tags = [ "tdd", "testing", "software-design", "refactoring" ]
[extra]
subtitle = "It's an integration, not a choice"
static_thumbnail = "/images/blog/2021-11-20/cover.jpg"
+++

![blog-cover](/images/blog/2021-11-20/cover.jpg)

There are two known schools in TDD: the mockist school (aka Outside-in) and the classicist school (aka Inside-out).

<!-- more -->

### Why London and Chicago?

Two companies, one from London and another from Chicago, claimed to do TDD, but they were focused on different aspects.
The London company was building software from outside-in, while the Chicago company from inside-out. Let's see them in more detail.

## Outside-in: London School

It provides a behavior-driven approach to TDD. Starting from the outside of the application and working in moving to
lower layers. For example, starting from the API/Controllers down to the application or domain layers.

### PROS

- **Behavioral Focused**: this requires a lot of test doubles because you will test a lot of abstractions that don't exist
  yet as you are creating a high level of logic first. You aren't going to write dead-code but it will be easy to create
  tests highly coupled to the logic and therefore making refactoring a difficult task.
- **Command-Query separation**: is a discipline for managing side effects. Either you perform an action (command) or you ask
  for a value (query).

### CONS

- **Fragile Tests**: it tends to create tests that break easily because they are usually too coupled to the production code.
- **Difficult Refactoring**: for the same reason as "Fragile Tests", having tests coupled to production code make continuous
  refactoring very difficult and time-consuming.

## Inside-out: Chicago School

It's an informal, exploratory, state-based approach of TDD. Starting from the inside of the application (usually the
domain) and works out towards the APIs.

### PROS

- **Strong Safety Net**: it tends to produce tests that are decoupled from the implementation. Enabling you to adopt a more
  experimental style of changing software without fear of breaking it. This is desired for continuous refactoring.
- **High Cohesion**: as tests become more general, the production code becomes more specific. This promotes high cohesion,
  and with high cohesion comes loose coupling. Something that promotes high code quality: extensibility,
  maintainability, and testability.
- **Minimizes Test Doubles**: building from the inside out requires fewer test doubles since you are building on top of the
  previously written tests. This helps to develop less fragile tests.

### CONS

- **YAGNI**: it's often over-engineering solutions, with code that is not really needed (or even used!) in the end.

## Conclusion

It's not about choosing one over the other. It's about understanding your context and driving optimization towards those
qualities that need to be optimized. London and Chicago each have their pros and cons. The best approach to TDD is an
integrated adoption of these two schools.

{{ youtube(id="rbSDGr-_UwY") }}

---

### References

- [Test-Driven (Development)](/blog/test-driven-development/)
- [TDD vs BDD](/blog/tdd-vs-bdd/)
- [Notes about "London vs Chicago TDD styles"](https://gist.github.com/xpepper/2e3519d2cb8568a0b13739d9ae497f21)
