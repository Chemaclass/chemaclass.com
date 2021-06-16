+++
title = "Sharing your git patches"
description = "Another way of sharing quick suggestions with your team"
[taxonomies]
tags = [ "software", "sharing", "git", "team" ]
[extra]
static_thumbnail = "/images/blog/2020-12-01/cover.jpg"
+++

![blog-cover](/images/blog/2020-12-01/cover.jpg)

Discover another way of sharing suggestions with your development team.

<!-- more -->

### Imagine this situation

You are reviewing a Pull Request (PR), and you see some minor improvements or suggestions that you would like to share with the author. You might write some comments, and usually, that would be sufficient.

Imagine that in order to transmit your "whole idea" you would need to change some files because just communicating the full picture will end up in a huge comment which might be not as clear as it could be.

## What possibilities are there apart from just comments in a PR?

Well, there are multiple options. The key is to be aware of them and use them wisely depending on the priority of the task and the changes themselves:
- As already mentioned, writing a comment as feedback is a good idea by default, but not the only one.
- We can always do some pair-thinking, talk at any time. Communication is always good in order to clarify the possible uncertainty.
- Sharing your git patches is another good option.

# Git diff to the rescue!

What if you (as a reviewer) could share your idea without any single commit or comment in the PR, but sharing your changes directly with the author?

Well, that's actually possible and really easy. As you already know, the git diff command gives you the differences between any two branches.

> git diff origin develop > ../my-origin-develop.patch

What we are doing here is redirecting the output of the diff command into a file (aka: patch), so we can share that output with any other peer-team.

## What now?

Well, having that patch file, it's pretty easy to apply those changes in your local machine without doing any commit:

> git apply ../my-origin-develop.patch

Applying this patch will simply change your local system in the same way the patch was created.

## "How to" by steps

Let's divide the responsibilities into two: the creator of the patch and its user:

### The patch creator: the person who will create the patch

```
# Checkout that branch
$ ~/myProject git:(the-branch) ➜ git pull origin the-branch
# Do your suggestions and changes in the targeted branch
# Generate the patch file using the diff command
$ ~/myProject git:(the-branch) ➜ git diff > ../your-diff.patch
# Share the patch file with the author of the PR
```

### The patch user: the person who will see the patch

```
# Ensure you are in that branch
$ ~/myProject git:(the-branch) ➜ git pull origin the-branch
# Apply the patch file
$ ~/myProject git:(the-branch) ➜ git apply ../your-diff.patch
```

---

#### References

- [docs/git-apply](https://git-scm.com/docs/git-apply)
