+++
title = "Test-driven (development)"
description = "The complexity here is not about writing tests itself, but the habits that we have to change to create software that is easy to be tested."
draft = false
aliases = [ "tdd", "/inner-peace-katas", "blog/inner-peace-katas" ]
[taxonomies]
tags = [ "tdd", "testing", "software-design", "refactoring" ]
[extra]
subtitle = "What is challenging about it?"
static_thumbnail = "/images/blog/2021-08-01/cover.jpg"
related_posts = [
  "blog/2020-04-07-the-art-of-testing.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2022-07-11-clean-craftsmanship.md",
  "readings/2016-05-01-clean-code.md",
]
+++

![blog-cover](/images/blog/2021-08-01/cover.jpg)

The complexity here is not about writing tests itself, but the habits that we have to change to create software that is
easy to be tested.

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
do apply this great (and mandatory) philosophy in my daily work.

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

## Kent Beck

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">1. Change the code as usual<br>2. Write a test that only passes after the change<br>3. Revert to before 1<br>4. Type the test again (copy/paste is cheating &amp; invalidates the warranty of the exercise)<br>5. Make it compile by changing the code<br>6. See it fail<br>7. Change the code to make it pass</p>&mdash; Kent Beck 🌻 (@KentBeck) <a href="https://twitter.com/KentBeck/status/1421257650113634304?ref_src=twsrc%5Etfw">July 30, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

---

Images original by [Emmanuel Valverde Ramos](https://x.com/evrtrabajo).
