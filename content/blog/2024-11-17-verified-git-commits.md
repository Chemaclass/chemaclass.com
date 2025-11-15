+++
title = "Verified git commits"
description = "Learn why verified Git commits are essential for secure software development and how to set them up step by step."
draft = false
aliases = [ "/blog/verified-commits" ]
[taxonomies]
tags = [ "software", "open-source", "git" ]
[extra]
subtitle = "Boosting trust and security in your codebase"
static_thumbnail = "/images/blog/2024-11-17/cover.jpg"
+++

![blog-cover](/images/blog/2024-11-17/cover.jpg)

When it comes to software development, trust and security are very important. One easy way to level up both is by using verified commits. 

<!-- more -->

Whether you're working on an open-source project or in a private company, verified commits can make sure your contributions are legit. Let's break down what they are, why they're important, and how to start using them.

## What are verified commits?

A verified commit is basically a Git commit that is signed by the author using a digital signature. This signature proves that the commit actually came from the person who says they made it. Tools like [GPG (GNU Privacy Guard)](https://gnupg.org/) let you attach this signature to your commits.

If you're using platforms like GitHub, you'll notice a little "Verified" badge next to commits that are signed properly. It's a quick way to show that the commit is authentic.

![blog-cover](/images/blog/2024-11-17/verified-commit-example.jpg)

## Why Are They Important?

Signed commits help keep your contributions authentic and trustworthy. By adding a cryptographic signature to your commits, you prove that the changes came from you. This is especially important in collaborative environments, where maintaining trust and accountability is key.

Without signed commits, anyone could fake a commit using someone else's email. For example, they could use your email, and platforms like GitHub would link it to your profile, making it look like you made the changes —even if you didn't... not good!

![blog-cover](/images/blog/2024-11-17/impersonating-commit.jpg)

![blog-cover](/images/blog/2024-11-17/impersonating-commit4.jpg)

By signing your commits, you show that the work is genuinely yours. It stops impersonation, builds trust in what you've done, and keeps everything transparent and accountable.

> <small>Note: For this demo, I used a public email address belonging to Linus Torvalds. After pushing the commit to this repository, GitHub recognized the email and linked it to his profile. This impersonation is purely for demo purposes to highlight potential risks. Always use your own email for commits.</small>

---

## How to get started with verified commits

### Set up a GPG key

First, you'll need a GPG key to start signing commits. Here's how:

Generate a GPG key:
```bash
gpg --full-generate-key
```
Find your key ID:
```bash
gpg --list-secret-keys --keyid-format=long
```
Tell Git to use your key:
```bash
git config --global user.signingkey <your-key-id>
```
Make signing commits the default:
```bash
git config --global commit.gpgsign true
```

### Add your key to [GitHub](https://github.com/settings/keys)/[GitLab](https://gitlab.com/-/user_settings/gpg_keys)

Export your public key:
```bash
gpg --armor --export <your-key-id>
```
Navigate to "Settings > SSH and GPG keys," and paste your key.

![blog-cover](/images/blog/2024-11-17/gpg-keys.jpg)

### Start signing commits

From now on, Git will automatically sign your commits. 

If you want to sign a commit manually, just use the `-S` flag:
```bash
git commit -S -m "Your commit message"
```
You can **verify** the commit signature with:
```bash
git log --show-signature
```

And also when clicking on the "Verified" badge on GitHub directly.

![blog-cover](/images/blog/2024-11-17/gpg-verify.jpg)

Verified commits might seem like a small step, but they make your code more trustworthy. It's an easy way to add an extra layer of protection to your work—and it's worth it. Give it a try!

---

### Extra: Full setup in Spanish 🇪🇸

{{ youtube(id="0DzQBu7U2f4") }}

---

## Related
### Related links

- Learn more: [What is PGP encryption?](/pgp) <small>A 3-minute tutorial for beginners</small>
