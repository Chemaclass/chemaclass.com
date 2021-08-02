+++
title = "Test-Driven (Development)"
description = "Why is it so complicated?"
draft = false
[taxonomies]
tags = [ "tdd", "testing", "software" ]
[extra]
static_thumbnail = "/images/blog/2021-08-01/cover.jpg"
+++

![blog-cover](/images/blog/2021-08-01/cover.jpg)

The complexity here is not about writing tests itself, but the habits that the developers have to change to create
software that is easy to be tested.

<!-- more -->

## The root of the problem

Without (a solid) experience in testing, developers can have a hard time while trying to apply testing in general as
part of their daily job. It's not simply because of the topic's complexity, but **because they are used to write
code that is hard to test.**

Writing tests for already working software (mainly when it was done without considering testing at all) translates as
something boring, next to useless, usually accompanied by a lack of motivation, blaming the wrong subject in this
context: "the tests itself are reducing my speed".

> In a domain context, if a piece of software logic is hard to be tested, the problem is not the test, but the code which wasn't well written.

There are already hundreds of tutorials, books, and documentation about testing, but I can share my experience and how I
do apply this great (and must) philosophy in my daily work.

### Test-Driven is based on this simple rule

- Instead of: design code -> develop code -> write tests.

![non-tdd-style](/images/blog/2021-08-01/non-tdd-style.png)

- It's about: write failing automated test -> run failing test -> develop code to make test pass -> run test -> repeat.

![tdd-style](/images/blog/2021-08-01/tdd-style.png)

The idea of driving your code by testing can be understood depending on the abstraction level of what you're writing at
the moment. You don't want to create a wrong coupling between the tests and the code being tested. You want to test the
behavior of your logic.

TDD is based on a loop of baby steps that helps you find **patterns** and guide your software design every little iteration
with **constant refactorings**. It's the best choice if you want to ensure the expected behavior of all possible paths of
your logic.

The beauty of this is that you don't need to know the full algorithm from the very beginning. Instead, you are
**discovering** how your logic should be by expressing the desired implementation, step by step, on automated tests.

Considering writing tests for your software at the same time you're writing it, will **irremediably force you to write
better software**. Because you want to write software which has to be easy to be tested, and therefore it will end up with
higher quality.

> I already wrote another post about the relation between software **quality and testing**: [The Art of Testing: where design meets quality](/blog/the-art-of-testing/).

## Improve your Test-Driven skills

![tdd-style](/images/blog/2021-08-01/tdd-style-with-git.png)

The best way to learn Test-Driven is doing software katas. Try them alone and with others. Both are equally important.

- Alone: to challenge your inner self without any distraction but yourself.
- With others: pair-programming is essential in our job. Katas are the best tools to train our communication skills and
  learn together from each other.

### What's a Code Kata?

Software developers don't practice enough. Most of our learning takes place on the job, which means that most of our
mistakes get made there as well.

Other creative professions practice: musicians play technical pieces, poets constantly rewrite works. In karate, most of
a student's time is spent learning and refining basic moves. These are katas.

### What is the goal of a kata? What should we have at the end?

Katas exist to help developers get the same benefits as practicing in any other profession. There are simple, artificial
exercises that let you experiment and learn without the pressure of a production environment.

> There are no right or wrong answers in any software kata: the benefit comes from the process, not from the result.

### Tips

- Once you have resolved a kata, try it again in a few weeks or months.
- Try to explore new solutions. Be creative in the process and do not rush.
- When doing them in groups, they are not a competition to see who will accomplish more of the exercise.
- The focus should be on the process, never on the result.
- The true valuable outcome of any kata is the learnings that you (and your team) will get after talking about it and
  sharing your experiences.

You can find a lot of katas on the Internet. For example:

- [http://codekata.com](http://codekata.com)
- [https://codingdojo.org/kata](https://codingdojo.org/kata)
- [https://katalyst.codurance.com/browse](https://katalyst.codurance.com/browse)
- [https://github.com/gamontal/awesome-katas](https://github.com/gamontal/awesome-katas)

---

### TDD is more as a workflow than a design

> "TDD is a design tool." That’s what Sandro has said for years. But not anymore. After working with different teams and in different organisations, and also carefully inspecting how he works, Sandro changed his mind about the role of TDD in software design.

{{ youtube(id="KyFVA4Spcgg") }}

TDD in a nutshell; it's about the rhythm.

1) Specify what you want.
2) Make it work.
3) Make it better.

---

All graphics images in this post are originals from [Emmanuel Valverde Ramos](https://twitter.com/evrtrabajo).
