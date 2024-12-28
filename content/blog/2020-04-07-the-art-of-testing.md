+++
title = "The art of testing: where design meets quality"
description = "Why you should consider testing as part of your daily development habit and how it's directly linked to the software quality."
[taxonomies]
tags = [ "software", "design", "testing", "quality"]
[extra]
subtitle = "From a software developer's point of view"
static_thumbnail = "/images/blog/2020-04-07/cover.jpg"
+++

![blog-cover](/images/blog/2020-04-07/cover.jpg)

Discover why testing should be an essential part of your daily development routine and how it directly impacts the quality, reliability, and maintainability of your software.

<!-- more -->

This post intends not to explain the different testing techniques that we can use. I'm not going to tell you the differences between unit, integration, feature, or end-to-end testing.

I'm still amazed by the lack of experience with testing in software in general. Common ignorance in this world about
best testing practices for us as developers. Inexperience that you can easily see if you have already worked on
different projects and teams.

### Software testing

Some horrible patterns I've seen (and done):

* Testing for the sake of testing: testing every single file, sometimes wrongly considered a unit.
* Mocking every class we intend to test, overriding the actual implementation, and creating a fake behavior,
  providing a false coverage perception.
* Coupling production code with tests everywhere, so it's impossible to change anything without breaking some tests,
  even if the feature itself it's working as intended.
* Not testing at all because "why should we even test anything if the feature is done, and it works? Why should we
  spend more time on this if it's done?."

One of the main reasons for software testing is actually verifying a suite of proofs for the expected behavior of the
final software piece. However, testing can (and should) be more than that.

### Software design

Software design goes from algorithm to architecture design. Even when I believe these two levels of components have
different needs and requirements, they still share some common patterns. For example, testing, and this is what we are
going to talk about right now:

> If it's easy to test, it will likely be because of good design.

### Software quality

Is quality hard to measure out? Indeed. There are different measurement keys that we should take while considering
quality for any piece of software. Still, I'm sure we could agree on this:

> If you aim for quality in your software, you better seek a good design.

Testing by itself means "proving," as we all know. That said... how difficult it sometimes turns to prove some logic
that we finally give up because of its complexity itself?

The art of testing is about using testing itself to help and contribute to the final result. To encourage good design,
suppose we're able to use testing (of any kind) in our favor, depending on the context of what we want to prove. In that
case, it will undoubtedly help us increase the product's end quality.

Therefore, testing should be used not only to prove the behavior of our software but also to guide our software to a better design.

Should we test everything? Well, that's the million-dollar question. In my opinion, everything depends on the context. We
might encounter situations where tests might not be beneficial. Even in those situations, we should write our code as if
it could be tested anyway.

![blog-cover](/images/blog/2020-04-07/footer.jpg)

> Testable code tends to better design and, therefore, better quality.
