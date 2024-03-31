+++
title = "Effective pair programming"
description = "Let's first establish what pair programming is: Two people working together on the same problem at the same time. It is not about one person showing off their skills in front of another, nor one person afraid of making mistakes due to an impostor syndrome."
draft = false
aliases = [ "/pair-programming" ]
[taxonomies]
tags = [ "software", "team-work" ]
[extra]
subtitle = "Embracing quality practices in your engineering culture"
static_thumbnail = "/images/blog/2024-03-28/cover.jpg"
+++

![blog-cover](/images/blog/2024-03-28/cover.jpg)

What is pair programming? Let's first establish what pair programming is: Two people working together on the same problem at the same time. It is not about one person showing off their skills in front of another, nor one person afraid of making mistakes due to an impostor syndrome.

<!-- more -->

Each person will have a role: 
- Navigator: he will pay attention to the bigger picture; eg: architecture, relation between collaborators, object design, etc.
- Driver: she will pay attention to the small details; eg: naming, code conventions, writing syntax, object design, etc.

> The pair could --and should-- switch roles occasionally; eg: every X commits pushed, every 10 mins, … up to them.

Pair programming should not be considered a practice only for "seniors" to juniors, but regardless of the team members' experience level.

It is about the **collaboration flow**, the quality communication, the absence of feeling judged, and the idea of welcoming vulnerability with your peers, knowing they will support and help you.

It is about constantly challenging each other, seeking the most pragmatic solution while keeping it simple. Always looking for **quick feedback** when speaking to each other, but also on the solution you agreed to implement and its direction.

It is about the short, quick, and immediate feedback loop while talking to your partner, who **reviews your code on the fly**. You can guide as a navigator or help the driver validate their ideas in a broader picture.

It is about the constant **sharing** of **knowledge** atmosphere by default, reducing bus-factors and silo-knowledge areas to the maximum. Increasing the focus by having two minds working on the same task simultaneously.

It is about **team cohesion** and sharpening the feeling that we belong. When we understand each other's strengths and weaknesses, we will realize how much we can help each other grow.

![cover](/images/blog/2024-03-28/footer.jpg)

## How can you practice pair programming?

Pair programming can be done in different ways:

- You can start and finish a task with pairing. You can time-box it to 30, 60, 90 minutes. Either way, it is recommended to have pauses in the middle - Pomodoro. 
- You can start the task together and stop when one of your peers feels confident enough to continue alone. 

> It is up to the team --and the task in context-- to decide when and how to apply pairing to get the best out of it.

This does not mean you must constantly work "no matter what" in pair. This is not about creating rules; on the contrary, it is about embracing this practice to the point you feel confident to choose when and how to use it to get the best out of it.

Pair programming might become one of the best tools in your team toolbox for daily interactions. Not because you read it somewhere but because of the benefits you and your team will find.

### Common Patterns

#### Different strategies for effective pairing

- **Driver-Navigator**: One person is driving the code (with the keyboard), focusing on the detail aspect of the task itself. The other is a navigator (no keyboard), having a more abstract picture of the task in mind.
- **Ping-Pong**: Frequent switching driver-navigator roles in small interactions, e.g., every N minutes, every N commits, etc.
- **Backseat driver**: The navigator engages actively with the driver.
- **Tourist guide**: The navigator passively learns with the driver.

![cover](/images/blog/2024-03-28/good-pair-prog.jpg)

#### Anti-patterns while pairing

- **The silent partner**: The navigator is not participating, and they are being silent.
- **The solo act**: The driver ignores all inputs from the navigator.
- **Distracted pair**: The pair does not focus on the problem to solve.
- **The Dictator**: One person is telling what to do, ignoring the input from the other.
- **Philosophical pair**: The pair is [bikeshedding](/blog/bikeshedding/) into irrelevant topics.
- **The code war**: The pair does not reach an agreement and starts an unnecessary war, which wastes time and effort.

![cover](/images/blog/2024-03-28/anti-pair-prog.jpg)

**Want more?** Check this out: [Learning Through KATAS](https://www.figma.com/file/FCmGwRPIO8cLowDRraJhgr/Learning-TDD)

![cover](/images/blog/2024-03-28/learning-through-katas.jpg)

> Thanks to my friend [Manu](https://twitter.com/evrtrabajo), who helped me with this post. We even share a [workshop](https://phpconference.com/agile-culture/practical-tdd-workshop/) on this topic.

---

### Related posts

- [Test-Driven (Development)](/blog/test-driven-development/) <small>What is challenging about it?</small>
- [The path to seniority in software](/blog/the-path-to-seniority-in-software/) <small>How to become a Senior Software Developer?</small>
- [Understanding people](/blog/understanding-people) <small>Misunderstandings, effective communication, and self-reflection</small>

### Recommended readings

- [The Clean Coder](/readings/the-clean-coder/) <small>by Robert C. Martin</small>
- [Extreme Programming Explained](/readings/xp-embrace-change/) <small>by Kent Beck</small>
- [Object Design Style Guide](/readings/object-design-style-guide) <small>by Matthias Noback</small>
- [Advanced Web Application Architecture](/readings/advance-web-application-architecture/) <small>by Matthias Noback</small>
