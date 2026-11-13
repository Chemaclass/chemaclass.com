+++
title = "bashunit: Tests for Shell Scripts"
description = "I extracted tests from a Git hook into a Bash testing library that runs on macOS and Linux."
template = "page.html"
+++

# bashunit: tests for shell scripts

I created and maintain [bashunit](https://bashunit.com/), a testing library for Bash scripts. It began with a Git hook I needed to change without breaking its existing behavior.

## The problem

My team included a ticket number in each commit message. I wrote a Git hook to read it from the branch name and insert it. As I added features, checking every case by hand took more time and left room for mistakes.

I added an assertion function to compare the hook's output with the expected message. The tests needed different branch names and their own setup.

## The decision

I separated the assertions from the hook's tests. Then I added a runner that could find and execute test functions. That made the testing code reusable outside the original project.

I kept compatibility with Bash 3.2, the version shipped with macOS. A developer could run tests with the shell already on their machine. The library also needed to work on Linux.

## The result

The [first release](https://github.com/TypedDevs/bashunit/commit/fc9aac40eb8e5ad4483f08d79eb678a3650dcf78) had a runner and one assertion. In [version 0.2](https://github.com/TypedDevs/bashunit/releases/tag/0.2.0), bashunit became a standalone executable that could run from another folder.

Friends joined the project and helped with documentation, assertions and snapshot tests, which compare output with a saved example. We moved bashunit into the TypedDevs organization to share ownership. The library uses its own test runner to test changes, with checks on macOS and Linux.

The result is a separate tool you can use to test your own shell scripts. The [full development story](/blog/bashunit/) includes the original code and the steps between the hook and the library.

[Try bashunit](https://bashunit.com/installation) or [read the source](https://github.com/TypedDevs/bashunit).
