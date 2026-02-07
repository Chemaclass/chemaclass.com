+++
title = "Dedicated QA teams in software?"
description = "This will be controversial, but let's talk about the QA position. The hidden truth behind the lack of software quality and why this should concern you if you write software."
draft = false
[taxonomies]
tags = [ "testing", "tdd", "agile", "clean-code" ]
[extra]
subtitle = "How does it fit a dedicated QA person in your agile team?"
static_thumbnail = "/images/blog/2023-05-17/cover.jpg"
related_posts = [
  "blog/2020-04-07-the-art-of-testing.md",
  "blog/2021-08-01-test-driven-development.md",
  "blog/2021-09-25-tdd-vs-bdd.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2020-03-12-clean-agile.md",
  "readings/2022-07-11-clean-craftsmanship.md",
]
+++

![blog-cover](/images/blog/2023-05-17/cover.jpg)

This will be controversial, but let's talk about the QA position. The hidden truth behind the lack of software quality and why this should concern you if you write software.

<!-- more -->

## QA is a role, not a position

As a software developer, when you write software, you are responsible for the quality of whatever you're writing. A third person acting like QA could find that your solution doesn't work like expected, but how come? You might argue they might catch edge cases, but how could that be possible if the software was already tested previously?

A software team's final goal is to make the QA position useless because they should find nothing but well-working software. But how do you get to that point? How can we ensure that the software we write is working as expected and there is no need for a QA person in our team?

## The hidden truth behind the lack of software quality

Unfortunately, in our software industry, the demand for "fast, quick and dirty" projects ended up in poorly developed MVPs by simply applying patches and code over code with just manual testing checking happy paths - sometimes even ignoring edge cases.

> "The deadline is in one week, so you better finish it on time!"

We don't learn the importance of what automated testing can bring to our daily job, so we don't take it seriously, and therefore, we don't practice it enough. And, for that exact reason, because we don't practice it, we don't know how to perform it properly - yes, I am talking about writing automated tests that prove the behavior of your software!

Our inability to write testable code results in software that is hard to test, and thus we delegate testing to other third parties shifting the responsibility for the overall end quality of the product or service we write.

## Practice makes the master

You must learn and apply proper testing techniques when they make sense. How and when effectively use test doubles, prepare solitary or sociable tests, which compromises and reasons backup your mind when choosing one or other paths toward your testing strategies?

You are the latest and main responsible person in charge of your knowledge, so you better invest in yourself because no one else will do it for you.

Look at everything you do as an opportunity for learning. Practice and get better by default at everything you do.

If you don't know how to start, here is my favourite tip: you can always practice and improve your testing skills using code-katas. Read more about this topic [here](/blog/test-driven-development/).

## Nice theory, but… why bother?

Manual testing is, of course, necessary. It is another testing strategy that I am not blaming or attacking. We might still need a dedicated person in charge of discovering what new features we want to build to satisfy our clients. But this blog-post is not about that position.

It is all about shortening the feedback loop. If you can write software to work in specific ways, can't you write automated tests to prove that the software you wrote behaves the way you expect?

If you have covered with automated tests the behavior of your software at any level that makes sense, what's left for a dedicated QA person?

Next time you think about "We need a QA person to test this," try the exercise of thinking instead, "How can I write an automated test that verifies what I would expect if a QA person were checking this?"

And that's how you change the "full-time QA position" into a "role mentality for everyone that writes software."

Code never lies and never forgets; once it's written and automated in your pipeline, you can run it anytime at zero cost.

![blog-footer](/images/blog/2023-05-17/footer.jpg)
