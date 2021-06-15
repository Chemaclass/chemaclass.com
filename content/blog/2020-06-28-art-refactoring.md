+++
title = "The art of refactoring"
[taxonomies]
tags = [ "software", "refactoring", "testing" ]
[extra]
subtitle = "When, how, and why"
+++

![blog-cover](/images/blog/2020-06-28/cover.jpg)

If you see something, in the scope of your current task, that can be easily improved, improve it. And if you have any questions about it, ask.

<!-- more -->

## What is refactoring?

Refactoring means improving your code. It can go from making a variable name more readable, extract some lines of code into a private method, or separate the responsibilities of a class into subclasses, for example.

Refactoring is the action of showing that you care about what you do as a professional. It can be a controversial topic; it is indeed one of the major controversial topics since a long time ago. But we shouldn't stop trying our best in order to improve the quality of the system just because of that controversiality.

## When and how should we refactor?

Always. In the scope of your current task unless it is an already planned task, something like "architecture refactoring" or similar, where the scope of the task is actually to do refactoring.

> Refactoring should be part of our daily job, not a separate task by default.

We do not need to ask permission to refactor. Or do we ask our managers for permission to do our best job?

In order to do proper refactoring, the intention of such refactoring needs to be clear. What is intended to achieve and how? Pair programming (or even pair thinking!) certainly helps in this topic because it syncs two brains on the same topic and that encourages team building and a better understanding of them.

Applying refactoring in a collaborative way, in a "bidirectional channel", is fundamental when working within a team. Refactoring shouldn't be a tabu topic, on the contrary: it will be helpful in order to unify the goals and the direction of the team code quality.

### Some personal advice about the "how"

Continuous improvement is what we're looking for within this topic, but…
* If you realize your changes are generating more noise than help, stop immediately and think again if your changes are worth in the current system status.

Maybe it's not the right moment for that refactoring.

Maybe you are polluting your current diff with out-scoped changes.

Or, maybe, your refactoring idea is too big to be applied in your current task. In such a case, a follow-up task (in order to apply the refactoring) would be a better idea.

* If you see that refactoring is perhaps needed even before starting your current task, do the refactoring first.

We usually refactor in order to increase our productivity, making the code more readable and therefore easier to understand.

### Testing

Be aware that you should have a pretty well suite of tests covering the logic that you might have changed. Without tests, refactoring can be really risky. Usually, the easier something is to be tested, the easier it is to be replaced or removed.

You can read more about how testing is related to quality here.

## Why should we do it?

Wouldn't you want to have a better system as time goes by?

Software isn't like wine: it doesn't get better as time passes by. Therefore, if you want to have a better system you must work for it.

![blog-img](/images/blog/2020-06-28/footer.jpg)
