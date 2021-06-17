+++
title = "The Clean Coder"
description = "A Code of Conduct for Professional Programmers"
[taxonomies]
tags = [ "book", "software", "clean-code" ]
[extra]
pages = "250"
author = "Robert C. Martin"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/51lbNIP1YLL._SX381_BO1,204,203,200_.jpg"
+++

<a target="_blank"  href="https://www.amazon.de/gp/product/0137081073/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=0137081073&linkCode=as2&tag=chemaclass-21&linkId=c26a76e9b164910139966c9b19d9a6e2">
    <img border="0" src="https://images-na.ssl-images-amazon.com/images/I/51lbNIP1YLL._SX381_BO1,204,203,200_.jpg" >
</a>

<!-- more -->

### Readers will learn

- What it means to behave as a true software craftsman
- How to deal with conflict, tight schedules, and unreasonable managers
- How to get into the flow of coding, and get past writer's block
- How to handle unrelenting pressure and avoid burnout
- How to combine enduring attitudes with new development paradigms
- How to manage your time, and avoid blind alleys, marshes, bogs, and swamps
- How to foster environments where programmers and teams can thrive
- When to say **No** and how to say it
- When to say **Yes** and what yes really means

---

## Summary

#### Chapter 1: Professionalism

- Being a professional means taking full responsibility for one's actions.
- First rule is not doing harm to the function nor the structure of the software.
- You will always make occasional mistakes, but you must learn from each.
- You should be certain about all code you release and firmly expect QA to find nothing wrong with it.
  - Test it and test it again.
  - Automate your tests.
  - Design your code to be easy to test.
- You should follow the Boy Scout rule and always leave a module a little cleaner than you found it so that it becomes
  easier to change over time, not harder.
- Your career is your responsibility, not your boss nor your employers.
  - Spending 20 hours a week beyond your normal work to improve your knowledge and skills.
  - Read, experiment, practice (kata), talk to other, collaborate, look over the fence, mentor.
  - It should be fun.
- Also, know your domain, identify with your customer (no "us vs. them", ever).

### Chapter 2: Saying No

- Real disaster story about premature deployment of a totally immature distributed system.
- Professionals speak truth to power. Professionals have the courage to say no to their managers.
- Managers and developers have roles that are often adversarial, because on the short term, their goals tend to
  conflict.
- The higher the stakes, the more valuable a "no" becomes, and the harder to say.
- Good teams will successfully work towards a yes, but only a right yes, that will later work out in practice.

### Chapter 3: Saying Yes

- There are three parts to making a commitment:
  - You say you will do it
  - You mean it
  - You actually do it
- Your commitment must respect the limits of what you expect (based on your experience) you can and cannot do.
  - If you recognize you will probably not be able to meet a commitment, you need to raise a red flag immediately.

### Chapter 4: Coding

- Programming requires a level of focus that few other disciplines require.
- "The zone" (flow) is not as good as people think: you will be locally productive, but will often lose the bigger
  picture and possibly product not-so-good designs.
- Interruptions are bad distractions.
  - Pair programming is helpful to cope with them.
  - TDD helps to make the pre-interruption context reproducible.
    - Minimize time spent debugging
- Coding is a marathon, not a sprint, so conserve the energy and creativity.
- Go home when it's time, even in the middle of something important.
- Continuously re-estimate your best/likely/worst completion time and speak up as soon as you recognize you will likely
  be late.
  - Do not allow anyone to rush you.
  - Use a proper definition of "done", with sufficiently high quality requirements.
- Programming is too hard for anyone, so get help and provide help to others, in particular (but not only) in mentoring
  style.
  - Don't be shy from asking.

### Chapter 5: Test-driven Development

- TDD is not a cure-all and is impractical or inappropriate in some (rare) cases.
- Three principles:
  - You are not allowed to write any production code until you have first written a failing unit test.
  - You are not allowed to write more of a unit test than is sufficient to fail, and not compiling is failing.
  - You are not allowed to write more production code than is sufficient to pass the currently failing unit test.

### Chapter 6: Practicing

- A programming Kata is a precise set of choreographed keystrokes and mouse movements that simulates the solving of some
  programming problem.
  - A Kata is about the process, not the solution. 
  - You aren't solving the problem because you already know the solution.

### Chapter 7: Acceptance Testings

- Avoid garbage in, garbage out. Make sure you understand the requirements.
  - Creating this understanding means removing ambiguity.
- The best way to do this is defining acceptance tests:
  - Ask the customer for all conditions they will plausibly want the software behavior to fulfill and turn them into
    automated tests.
  - Success of those tests constitutes the definition of "Done".
- Code implementation should start only when the tests are complete.
- Unlike unit tests (which are only for programmers), the audience of acceptance tests are both: business and developers.
- Run all tests in a continuous integration and immediately fix any failures.

### Chapter 8: Test Strategies

- Consider QA part of the team. They act as specifiers: writing acceptance tests, including the failure cases and corner
  cases, and perform exploratory testing.
- Testing pyramid:
  - Most tests are unit tests. By developer and for developers.
  - Many tests are component or integration tests. By QA or Business assisted by Developers. For Business and Developers.

### Chapter 9: Time management

- Management roles in software development requires good time management.
- Meeting are necessary but are also often huge time wasters, so avoid meeting that have no clear benefit -> this is a
  professional obligation.
- Meeting must have an agenda and a clear goal.
  - Agile stand up meetings can be an efficient format.
  - Iteration planning should take 5% of the iteration.
- Concentration (focus) is a scarce resource.
  - Use it well when present and recharge with simpler tasks (meetings) and breaks in between.
  - How to improve?
    - Sport.
    - Creative input.
    - Short breaks every 45 minutes.

### Chapter 10: Estimation

- Estimation is the source of most distrust between business people and developers, because the latter provide estimate
  which the former treat like commitments.
  - Both are insufficiently aware that the estimate really is a probability distribution, not a fixed number.

### Chapter 11: Pressure

- The professional developer is calm and decisive under pressure, adhering to his training and disciplines, knowing that
  they are the best way to meet the pressing deadlines and commitments.
- Avoid situations that cause pressure via:
  - make only commitments you can fulfill
  - keep your code clean
  - work in such a way that you need not change it when in crisis
- Don't panic. Talk with your team. Don't rush. Trust your disciplines.
- Offer pairing to others in crisis.

### Chapter 12: Collaboration

- Not all but most programmers like working alone. But we need to understand the goals of the surrounding people,
  including business folks.
  - This requires **communication**.
- Likewise, within the development team: only collective code ownership and pairing produce a good level of
  communication.
  - Programming is all about **communication**.

### Chapter 13: Teams and Projects

- Teams need time (months) to gel, to really get to know each other and learn to truly work together.
  - Assigning fractional people to different projects is a bad idea, as is breaking up a good team at the end of a project.
  - Instead, assigning several projects to one team can work well.

### Chapter 14: Mentoring, Apprenticeship and Craftsmanship

- Young programmers need mentoring.
  - Mentoring can be implicit or explicit.
- Given that we entrust software with all aspects of our lives, a reasonable period of training and supervised practice
  would be appropriate.
