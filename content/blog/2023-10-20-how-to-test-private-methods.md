+++
title = "How to test private methods?"
description = "From time to time I have had to face this question: how to test private methods? I have put together in an article the techniques that I usually use."
draft = false
[taxonomies]
tags = ["testing", "tdd", "software-design", "clean-code"]
[extra]
subtitle = "Testing private methods. When and how?"
static_thumbnail = "/images/blog/2023-10-20/cover.jpg"
+++

![blog-cover](/images/blog/2023-10-20/cover.jpg)

This is a question that I have encountered with some frequency for a long time. So I thought I would put together my thoughts on the subject here.

<!-- more -->

## Short answer

Never.

## Long answer

Never ever.

--- 

## What if...?

If you really want to test a private method, consider extracting that private method logic into a separate class, and write a unit test for that class' behavior.

## Related
### Related posts

- [Test-Driven (Development)](/blog/test-driven-development/) <small>What is challenging about it?</small>
- [Different beliefs about software quality](/blog/different-beliefs-about-software-quality/) <small>Some thoughts about software quality</small>
- [The art of testing: where design meets quality](/blog/the-art-of-testing/) <small>From a software developer's point of view</small>
- [The path to seniority in software](/blog/the-path-to-seniority-in-software/) <small>How to become a Senior Software Developer?</small>

> For this one, I was inspired by Fran Iglesias' [original post](https://franiglesias.github.io/test-private-methods/).
