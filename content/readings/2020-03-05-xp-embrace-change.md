+++
title = "Extreme Programming Explained"
description = "Embrace Change"
[taxonomies]
tags = [ "software", "team-work" ]
[extra]
pages = "160"
author = "Kent Beck"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/41b11Tipy0L._SX396_BO1,204,203,200_.jpg"
+++

<a target="_blank"  href="https://www.amazon.de/gp/product/0321278658/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=0321278658&linkCode=as2&tag=chemaclass-21&linkId=52a60a4fcb77efaf67943eaba7f7b52f">
    <img border="0" src="https://images-na.ssl-images-amazon.com/images/I/41b11Tipy0L._SX396_BO1,204,203,200_.jpg" >
</a>

<!-- more -->

## Definition

Extreme Programming (XP) is an agile software development framework that aims to produce higher quality software, and
higher quality of life for the development team. XP is the most specific of the agile frameworks regarding appropriate
engineering practices for software development.

---

## Values

The five values of XP are communication, simplicity, feedback, courage, and respect and are described in more detail
below.

### Communication

Software development is inherently a team sport that relies on communication to transfer knowledge from one team member
to everyone else on the team. XP stresses the importance of the appropriate kind of communication. – face to face
discussion with the aid of a white board or other drawing mechanism.

### Simplicity

Simplicity means "what is the simplest thing that will work?" The purpose of this is to avoid waste and do only
absolutely necessary things such as keep the design of the system as simple as possible so that it is easier to
maintain, support, and revise. Simplicity also means address only the requirements that you know about; don't try to
predict the future.

### Feedback

Through constant feedback about their previous efforts, teams can identify areas for improvement and revise their
practices. Feedback also supports simple design. Your team builds something, gathers feedback on your design and
implementation, and then adjust your product going forward.

### Courage

Kent Beck defined courage as "effective action in the face of fear". This definition shows a preference for action based
on other principles so that the results aren't harmful to the team. You need courage...

- to raise organizational issues that reduce your team's effectiveness.
- to stop doing something that doesn't work and try something else.
- to accept and act on feedback, even when it's difficult to accept.

### Respect

The members of your team need to respect each other in order to communicate with each other, provide and accept feedback
that honors your relationship, and to work together to identify simple designs and solutions.

---

## Principles

### Humanity

Human beings are the ones developing software. It is a fact. The book mentions 5 points that are needed for developers
to become good: basic safety, accomplishment, belonging, growth, and intimacy.

The magic of great teams is that after the team members develop trust they find that they are free to be more themselves
as a result of their work together.

### Economics

Software costs. Someone or multiple people paid or invested in it.

Make sure what you are doing has business value, meets business goals, and serves business needs. For example, solving
the highest priority business need first maximizes the value of the project.

The earlier software makes money, the sooner the development is valuable.

### Mutual Benefit

Mutual benefit in XP is about activities benefitting all concerned. This principle is about finding practices that
benefit me now, me later, and the customers as well.

The book brings up 3 points how XP mutually deals with communication-with-the-future problems:

- I write automated tests that help me design and implement better today. I leave these tests for future programmers to
  use as well. This practice benefits me now and maintainers down the road.
- I carefully refactor to remove accidental complexity, giving me both satisfaction and fewer defects and making the
  code easier to understand for those who encounter it later.
- I choose names from a coherent and explicit set of metaphors which speeds my development and makes the code clearer to
  new programmers.

### Self-Similarity

This principle is about copying the structure of one solution into a new context.

For example, the basic structure of development is that you write a failing test and then make it work. This structure
operates at all different scales. Take into account, this principle is a good start, but it may not always work.

### Improvement

Do your best today but strive to do better tomorrow, strive to have a deeper understanding tomorrow. XP shines in this
aspect, it is about always improving.

> Put improvement to work by not waiting for perfection. Find a starting place, get started, and improve from there.

### Diversity

Teams need to bring in people from different backgrounds, with different experiences, attitudes, etc. In order for the
team to have different ways of thinking and solving a problem.

The principle of diversity suggests that the programmers should work together on the problem and both opinions should be valued.

### Reflection

Good teams reflect after action, regularly. They think about why and how they are working.

- Why did we succeed? What should we continue doing?
- Why did we fail? What can we do better or differently?

Reflect and strive to improve. Even if everything seems perfect, know that there is always room for improvement and
throw in the question:

- Why do things seem perfect? What are we doing well? What can we do better in order to succeed even more?

### Flow

Flow in software development is delivering a steady flow of valuable software by engaging in all the activities of
development simultaneously. Don't deliver software in big portions. Deploy smaller increments of value more frequently.

### Opportunity

Learn to see problems as opportunities for learning and improving.

> Part of being extreme is consciously choosing to transform each problem into an opportunity:
> an opportunity for personal growth, deepening relationships, and improved software.

### Redundancy

The difficult problems in software development should be solved in multiple ways.

> The cost of the redundancy is more than paid for by the savings from not having a disaster.

### Failure

Sometimes it is extremely difficult to implement something, we don't know which way or approach to take, try the ideas
you have, even if they fail! Failure isn't a waste, rather a learning experience.

Be aware of falling into the trap of discussing or thinking forever and not getting things done.

> When you don't know what to do though, risking failure can be the shortest, surest road to success.

### Quality

Projects don't go faster by lowering the quality. Actually it's often the other way around (if not always). It results
in later and less predictable delivery, especially due to the amount of time spent on fixing bugs for example.

Pushing quality higher often results in faster delivery.

> A concern for quality is no excuse for inaction. If you don't know a clean way to do a job that has to be done,
> do it the best way you can. If you know a clean way but it would take too long, do the job as well as you have time
> for now. Resolve to finish doing it the clean way later.

### Baby Steps

Take baby steps. Making big changes in big steps is dangerous. People and teams can take many small steps so they appear
to be moving forward rapidly.

> Baby steps acknowledge that the overhead of small steps is much less than when a team wastefully recoils from aborted big changes.

### Accepted Responsibility

> Responsibility cannot be assigned; it can only be accepted. If someone tries to give you responsibility, only you can decide if you are responsible or if you aren't.

---

## Practices

While it is possible to do these practices in isolation, many teams have found some practices reinforce the others and
should be done in conjunction to fully eliminate the risks you often face in software development.

### Sit Together

Since communication is one of the five values of XP, have your team sit together in the same space without barriers to
communication, such as cubicle walls.

### Whole Team

Include on the team people with all the skills and perspectives necessary for the project to succeed.

### Informative Workspace

Set up your team space to facilitate face to face communication, allow people to have some privacy when they need it,
and make the work of the team transparent to each other and to interested parties outside the team.

### Energized Work

You are most effective at software development and all knowledge work when you are focused and free from distractions.

### Pair Programming

Pair Programming means all production software is developed by two people sitting at the same machine. The idea behind
this practice is that two brains and four eyes are better than one brain and two eyes. You effectively get a continuous
code review and quicker response to nagging problems that may stop one person dead in their tracks.

Teams that have used pair programming have found that it improves quality and does not actually take twice as long
because they are able to work through problems quicker, and they stay more focused on the task at hand, thereby creating
less code to accomplish the same thing.

Pair programmers:

- Keep each other on task.
- Brainstorm refinements to the system.
- Clarify ideas.
- Take initiative when their partner is stuck, thus lowering frustration.
- Hold each other accountable to the team's practices.

> Pair programming is a dialog between two people simultaneously programming (and analyzing and designing and testing)
> and trying to program better.

Though, if you need privacy and time to work on an idea, go ahead and do it. We need both companionship and privacy.
Make sure to rotate pairs frequently and take frequent breaks, pairing can be tiring, but surely is rewarding.

### Stories

Describe what the product should do in terms meaningful to customers and users. These stories are intended to be short
descriptions of things users want to be able to do with the product that can be used for planning and serve as reminders
for more detailed conversations when the team gets around to realizing that particular story.

Give the stories a short title and a description. Write them on cards and put them on a wall that is often being passed.

In XP stories are estimated extremely early, which gets the team thinking about how to get the largest return from the
tiny investment.

### Weekly Cycle

The Weekly Cycle is synonymous to an iteration. In the case of XP, the team meets on the first day of the week to
reflect on progress to date, the customer picks the stories they would like delivered in that week, and the team
determines how they will approach those stories.

The intent behind the time boxed delivery period is to produce something to show to the customer for feedback.

### Ten-Minute Build

The goal with the Ten-Minute Build is to automatically build the whole system and run all of the tests in ten minutes.

### Continuous Integration

Continuous Integration is a practice where code changes are immediately tested when they are added to a larger code
base. The benefit of this practice is you can catch and fix integration issues sooner.

This practice requires some extra discipline and is highly dependent on Ten Minute Build and Test First Development.

### Test-First Programming

> Write a failing automated test before changing any code.

The book mentions 4 problem Test-First Programming addresses at once:

- Scope creep: It's easy to get carried away programming and put in code "just in case." By stating explicitly and
  objectively what the program is supposed to do, you give yourself a focus for your coding. If you really want to put
  that other code in, write another test after you've made this one work.

- Coupling and cohesion: If it's hard to write a test, it's a signal that you have a design problem, not a testing
  problem. Loosely coupled, highly cohesive code is easy to test.

- Trust: It's hard to trust the author of code that doesn't work. By writing clean code that works and demonstrating
  your intentions with automated tests, you give your teammates a reason to trust you.

- Rhythm: It's easy to get lost for hours when you are coding. When programming test-first, it's clearer what to do
  next: either write another test or make the broken test work. Soon this develops into a natural and efficient rhythm:
  test, code, refactor, test, code, refactor.

### Incremental Design

> Invest in the design of the system every day.

You do a little bit of work up front to understand the proper breadth-wise perspective of the system design, and then
dive into the details of a particular aspect of that design when you deliver specific features.

This approach reduces the cost of changes and allows you to make design decisions when necessary based on the most
current information available.

---

## Roles

Although XP specifies particular practices for your team to follow, it doesn't really establish specific roles for the
people on your team.

Depending on which source you read, there is either no guidance, or there is a description of how roles typically found
in more traditional projects behave on XP projects.

### The Customer

The Customer role is responsible for making all of the business decisions regarding the project including:

The XP Customer is assumed to be a single person, however experience has shown that one person cannot adequately provide
all of the business related information about a project.

### The Developer

Because XP does not have much need for role definition, everyone on the team (with the exception of the customer and a
couple of secondary roles listed below) is labeled a developer. Developers are responsible for realizing the stories
identified by the Customer.

### The Tracker

The main purpose of this role is to keep track of relevant metrics that the team feels necessary to track their progress
and to identify areas for improvement.

### The Coach

This is usually an outside consultant (or someone from elsewhere in your organization) who has used XP before and is
included in your team to help mentor the other team members on the XP Practices and to help your team maintain your
self-discipline.

---

#### What is XP? (in 2 min)

{{ youtube(id="hbFOwqYIOcU") }}

#### Tech Talk by kent Beck: XP 20 years later

{{ youtube(id="cGuTmOUdFbo") }}
