+++
title = "Deployments on Fridays"
description = "I have heard multiple times, from various people, the idea of panic towards deploying on Fridays. How good is that idea of banning the day before weekend from delivering new value to our clients or customers?"
draft = false
[taxonomies]
tags = ["agile", "xp", "leadership", "productivity"]
[extra]
subtitle = "Why \"should we not\" deploy to production on Fridays?"
static_thumbnail = "/images/blog/2024-02-25/cover.jpg"
related_posts = [
  "blog/2022-06-08-the-path-to-seniority-in-software.md",
  "blog/2022-10-08-different-beliefs-about-software-quality.md",
  "blog/2023-05-17-dedicated-qa-teams.md",
]
related_readings = [
  "readings/2020-03-12-clean-agile.md",
  "readings/2021-12-07-the-five-dysfunctions-of-a-team.md",
  "readings/2020-03-05-extreme-programming-explained.md",
]
+++

![blog-cover](/images/blog/2024-02-25/cover.jpg)

I have heard multiple times, from various people, the idea of panic towards deploying on Fridays. How good is that idea of banning the day before weekend from delivering new value to our clients or customers?

<!-- more -->

The main argument in favor of NOT deploying on Friday is based on the idea that we "should be paranoid" with our software and that it could fail when we touch it. So, we "should assume" the worst whenever we deploy a new release version of our system.

However, the critical factor here is Why? Why should we not deploy on Fridays? Is it OK to be afraid of our own software system, that we live in a constant panic of breaking it the day after we have done a deployment? How much impact should our releases have? How can we make sure the deployment won't break the live system?

Your Continuous Integration/Delivery pipelines, end-to-end and other types of tests in place, automated scaling policies, a previous staging sandbox to perform even manual tests if necessary, etc., will determine the security and confidence for any of your releases. However, the quality of these topics is a deal-breaker to have enough confidence on how, when and why would it make sense to release to production.

The goal is build a system where deployments to production should be as often, smooth and easy as possible; any time, any day. Being afraid of your system should not be the aim. On the contrary, it should be something to work towards to fix it.

The team dynamics are also an essential factor here. If we establish fear of deployments on Fridays, and fear of our system, that will end up in lack of accountability by default. This reminds me of [The Five Dysfunctions of a Team](/readings/the-five-dysfunctions-of-a-team/).

![cover](/images/blog/2024-02-25/middle.jpg)

If you deploy small and frequent changes as soon as they can guarantee 100% quality value success, why delay such an incremental improvement to your system?

Coming back to “Why should we not deploy on Fridays?” The only reason I can think of is being afraid that we have to work on Saturday on the broken thing we delivered on Friday. However, I wonder if any option was available, so we could have identified such a broken thing during the working Friday itself.

Monitoring your live system is crucial to guarantee the health after each deployment. This is essential to ensure everything is working fine and smoothly. To build a resilience system, this should trigger alarms to notify someone responsible for addressing the issue, disable or revert the latest “broken” feature… there are many techniques to create awareness and act on them.

In case of doubt, you could use feature flags to disable the feature you will deploy. Still, you prefer not to enable it during the weekend while keeping the option of adding value and deploying anytime always open. 

I believe **frequent** and **small releases** to production **are key**; any time, any date, as far as it makes sense, and there is a clear path to bringing value soon to the customer to get feedback ASAP.

> Deliver quality value in small increments, as frequently as possible.

Being able to deploy on Fridays (if needed or wanted) impacts the team's confidence. Similarly, forbidding deployments on Fridays impacts the team's self-esteem as well.

![cover](/images/blog/2024-02-25/footer.jpg)
