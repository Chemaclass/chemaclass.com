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

#### Communication

Software development is inherently a team sport that relies on communication to transfer knowledge from one team member
to everyone else on the team. XP stresses the importance of the appropriate kind of communication. 
– face to face discussion with the aid of a white board or other drawing mechanism.

#### Simplicity

Simplicity means "what is the simplest thing that will work?" The purpose of this is to avoid waste and do only
absolutely necessary things such as keep the design of the system as simple as possible so that it is easier to
maintain, support, and revise. Simplicity also means address only the requirements that you know about; don't try to
predict the future.

#### Feedback

Through constant feedback about their previous efforts, teams can identify areas for improvement and revise their
practices. Feedback also supports simple design. Your team builds something, gathers feedback on your design and
implementation, and then adjust your product going forward.

#### Courage

Kent Beck defined courage as "effective action in the face of fear". This definition shows a preference for action based
on other principles so that the results aren't harmful to the team. You need courage...

- to raise organizational issues that reduce your team's effectiveness.
- to stop doing something that doesn't work and try something else.
- to accept and act on feedback, even when it's difficult to accept.

#### Respect

The members of your team need to respect each other in order to communicate with each other, provide and accept feedback
that honors your relationship, and to work together to identify simple designs and solutions.

---

## Practices

While it is possible to do these practices in isolation, many teams have found some practices reinforce the others and
should be done in conjunction to fully eliminate the risks you often face in software development.

#### Sit Together

Since communication is one of the five values of XP, have your team sit together in the same space without barriers to
communication, such as cubicle walls.

#### Informative Workspace

Set up your team space to facilitate face to face communication, allow people to have some privacy when they need it,
and make the work of the team transparent to each other and to interested parties outside the team.

#### Energized Work

You are most effective at software development and all knowledge work when you are focused and free from distractions.

#### Pair Programming

Pair Programming means all production software is developed by two people sitting at the same machine. The idea behind
this practice is that two brains and four eyes are better than one brain and two eyes. You effectively get a continuous
code review and quicker response to nagging problems that may stop one person dead in their tracks.

Teams that have used pair programming have found that it improves quality and does not actually take twice as long
because they are able to work through problems quicker and they stay more focused on the task at hand, thereby creating
less code to accomplish the same thing.

#### Stories

Describe what the product should do in terms meaningful to customers and users. These stories are intended to be short
descriptions of things users want to be able to do with the product that can be used for planning and serve as reminders
for more detailed conversations when the team gets around to realizing that particular story.

#### Weekly Cycle

The Weekly Cycle is synonymous to an iteration. In the case of XP, the team meets on the first day of the week to
reflect on progress to date, the customer picks the stories they would like delivered in that week, and the team
determines how they will approach those stories.

The intent behind the time boxed delivery period is to produce something to show to the customer for feedback.

#### Ten-Minute Build

The goal with the Ten-Minute Build is to automatically build the whole system and run all of the tests in ten minutes.

#### Continuous Integration

Continuous Integration is a practice where code changes are immediately tested when they are added to a larger code
base. The benefit of this practice is you can catch and fix integration issues sooner.

This practice requires some extra discipline and is highly dependent on Ten Minute Build and Test First Development.

#### Test-First Programming

Instead of following the normal path of:
- develop code -> write tests -> run tests

The practice of Test-First Programming follows the path of:
- Write failing automated test -> Run failing test -> develop code to make test pass -> run test -> repeat

#### Incremental Design

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

- What should the system do (What features are included and what do they accomplish)?
- How do we know when the system is done (what are our acceptance criteria)?
- How much do we have to spend (what is the available funding, what is the business case)?
- What should we do next (in what order do we deliver these features)?
- The XP Customer is expected to be actively engaged on the project and ideally becomes part of the team.

The XP Customer is assumed to be a single person, however experience has shown that one person cannot adequately provide
all of the business related information about a project.

### The Developer

Because XP does not have much need for role definition, everyone on the team (with the exception of the customer and a
couple of secondary roles listed below) is labeled a developer. Developers are responsible for realizing the stories
identified by the Customer.

### The Tracker

The main purpose of this role is to keep track of relevant metrics that the team feels necessary to track their progress
and to identify areas for improvement. Key metrics that your team may track include velocity, reasons for changes to
velocity, and amount of overtime worked.

### The Coach

This is usually an outside consultant (or someone from elsewhere in your organization) who has used XP before and is
included in your team to help mentor the other team members on the XP Practices and to help your team maintain your self
discipline.

---

A 2 min summary video that I found in Youtube:

{{ youtube(id="hbFOwqYIOcU") }}