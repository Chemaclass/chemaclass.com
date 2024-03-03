+++
title = "Deployments on Fridays"
description = "I have heard multiple times, from various people, the idea of panic towards deploying on Fridays. How good is that idea of banning the day before weekend from delivering new value to our clients or customers?"
draft = false
[taxonomies]
tags = [ "software", "team-work" ]
[extra]
subtitle = "Why \"should we not\" deploy to production on Fridays?"
static_thumbnail = "/images/blog/2024-03-03/cover.jpg"
+++

![cover](/images/blog/2024-03-03/cover.jpg)

I have heard multiple times, from various people, the idea of panic towards deploying on Fridays. How good is that idea of banning the day before weekend from delivering new value to our clients or customers?

<!-- more -->

The main argument in favor of NOT deploying on Friday is based on the idea that we "should be paranoid" with our software and that it could fail when we touch it. So, we "should assume" the worst whenever we deploy a new release version of our system.

However, the critical factor here is Why? Why should we not deploy on Fridays? Is it OK to be afraid of our own software system, that we live in a constant panic of breaking it the day after we have done a deployment? How much impact should our releases have? How can we make sure the deployment won't break the live system?

Your Continuous Integration/Delivery pipelines, end-to-end and other types of tests in place, automated scaling policies, a previous staging sandbox to perform even manual tests if necessary, etc., will determine the security and confidence for any of your releases. However, the quality of these topics is a deal-breaker to have enough confidence on how, when and why would it make sense to release to production.

The goal is build a system where deployments to production should be as often, smooth and easy as possible; any time, any day. Being afraid of your system should not be the aim. On the contrary, it should be something to work towards to fix it.

![cover](/images/blog/2024-03-03/middle.jpg)

If you deploy small and frequent changes as soon as they can guarantee 100% quality value success, why delay such an incremental improvement to your system?

Coming back to “Why should we not deploy on Fridays?” The only reason I can think of is being afraid that we have to work on Saturday on the broken thing we delivered on Friday. However, I wonder if any option was available, so we could have identified such a broken thing during the working Friday itself.

Monitoring your live system is crucial to guarantee the health after each deployment. This is essential to ensure everything is working fine and smoothly. To build a resilience system, this should trigger alarms to notify someone responsible for addressing the issue, disable or revert the latest “broken” feature… there are many techniques to create awareness and act on them.

In case of doubt, you could use feature flags to disable the feature you will deploy. Still, you prefer not to enable it during the weekend while keeping the option of adding value and deploying anytime always open.

I believe frequent and small releases to production are key. Any time, any date, as far as it makes sense and there is a clear path to bringing value soon to the customer to get feedback as soon as possible.

![cover](/images/blog/2024-03-03/footer.jpg)

---

### Related posts

- [The path to seniority in software](/blog/the-path-to-seniority-in-software/) <small>How to become a Senior Software Developer?</small>
- [Different beliefs about software quality](/blog/different-beliefs-about-software-quality/) <small>Some thoughts about software quality</small>
- [Dedicated QA Teams in software?](/blog/dedicated-qa-teams/) <small>How does it fit a dedicated QA person in your agile team?</small>
