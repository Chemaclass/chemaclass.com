+++
title = "How to Test Private Methods?"
description = "From time to time I have had to face this question: how to test private methods? I have put together in an article the techniques that I usually use."
draft = false
[taxonomies]
tags = ["testing", "tdd", "software-design", "clean-code"]
[extra]
subtitle = "Testing private methods. When and how?"
static_thumbnail = "/images/blog/2023-10-20/cover.jpg"
related_posts = [
  "blog/2020-04-07-the-art-of-testing.md",
  "blog/2021-08-01-test-driven-development.md",
  "blog/2022-06-08-the-path-to-seniority-in-software.md",
  "blog/2022-10-08-different-beliefs-about-software-quality.md",
]
related_readings = [
  "readings/2016-05-01-clean-code.md",
  "readings/2022-07-11-clean-craftsmanship.md",
]
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
> For this one, I was inspired by Fran Iglesias' [original post](https://franiglesias.github.io/test-private-methods/).
