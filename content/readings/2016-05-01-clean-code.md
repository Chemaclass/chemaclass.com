+++
title = "Clean Code"
description = "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way."
authors = [ "Robert C. Martin" ]
[taxonomies]
tags = [ "software", "clean-code" ]
[extra]
subtitle = "A Handbook of Agile Software Craftsmanship"
pages = "460"
author = "Robert C. Martin"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/41yafGMO+rL._SX376_BO1,204,203,200_.jpg"
expand_preview = true
+++

<img border="0" src="https://images-na.ssl-images-amazon.com/images/I/41yafGMO+rL._SX376_BO1,204,203,200_.jpg" >

Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year,
countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way.

<!-- more -->

---

## Summary

### Chapter 1:  What Is Clean Code?

- The code can be measured with either "good" or "bad" in the code review or by how many minutes it takes you to talk
  about it.
- A clean code should be elegant, efficient, readable, simple, without duplications, and well-written.
- You should add value to the business with your code.
- Clean code offers quality and understanding when we open the source file.
- It is necessary that your code is clean and readable for anyone to find and easily understand. Avoid wasting others'
  time.

### Chapter 2: Meaningful Names

- Names of the classes, variables, and methods must be meaningful and clearly indicate what a method does or what an
  attribute is.
- Create pronounceable names to facilitate communication.
- Avoid acronyms and avoid confusing names, which may bring anyone who reads the code to the wrong conclusions.
- Use names that reflect the system domain, the context, and the problems that must be solved.

### Chapter 3: Functions

- Methods should be easy to read and understand.
- Methods should convey its intention.
- Methods should be small.
- They must have up to 20 lines.
- Methods should only do one thing.
- You should use names with words that say what it really does.
- The optimal number of parameters of a method is zero, after one and two.
- Three should be avoided, but if you think it should be used, have a justification.
- `Boolean` type as a parameter already states that it does more than one thing.
- Avoid duplication.

### Chapter 4: Comments

- One of the common reasons for comments is because the code is bad.
- If you're thinking about writing a comment, then the code should be refactored.
- Comments do not save a bad code.
- Try to explain what the code causes happening.
- Comments can be useful when placed in certain places.
- Don't explain your code with comments. Use informative vars/method names.
- Comments can be used to express the importance of certain points.
- Do not write comments with redundant, useless, or false information.
- They shouldn't be used to indicate who changed or why, use versioning.
- Don't comment code that will not be used. Remove it instead.

### Chapter 5: Formatting

- Formatting should indicate things of importance since it is a developer of communication form.
- A messy code is hard to read.
- The readability of the code will take effect on all the changes that will be made.
- Smaller classes are easier to understand.
- Set a limit of characters per line of code. For example 120.
- Try to keep more next related concepts vertically to create a code stream.
- Use spaces between operators, parameters, and commas.

### Chapter 6: Objects and Data Structure

- Follow the [Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter):
  - Each unit should have only limited knowledge about other units: only units "closely" related to the current unit.
  - Each unit should only talk to its friends; don't talk to strangers.
  - Only talk to your immediate friends.
- Do not make dumb objects.
- Objects hide the data abstraction and expose methods that operate the data.
- Data structures expose your data and do not have significant methods.

### Chapter 7: Error Handling

- Error handling should be planned carefully by all programmers.
- When wrong things occur, we have to get it to do the right things.
- Give preference to launching an exception than treating it just to hide.
- Create messages with information about the error.
- Mention that it failed. Where was this failure? If possible, mention why it failed.
- Look at separate business rules for errors and error handling.
- Avoid returning a `NULL` in methods, preferably to return an empty object.
- Avoid passing `NULL` to the methods; this can generate `NullPointerExceptions`.

### Chapter 8: Boundary

- In third-party code, to avoid passing objects, APIs look forward in order to keep things in the same class.
- Perform tests on the API's third party.
- Study the documentation and test the third API before you start using it.
- Check well the features you will use.

### Chapter 9: Unit Tests

- Make sure each piece of code is doing what you expect it to do.
- Follow the [TDDs law](https://en.wikipedia.org/wiki/Test-driven_development):
  - Don't create code before you have a failing test.
  - Don't create more tests than necessary to fail.
  - You cannot write more code than enough to pass the test that is failing.
- Keep your test clean.
- The tests must undergo changes in the same way that the code.
- The dirtier the code, the more difficult test will be to maintain.
- Use the F.I.R.S.T rule for testing:
  - The test is fast-running.
  - The tests are independent of others.
  - The test is repeatable in various environments.
  - The test is self-validating.
  - The test is timely.
- The test is as important as the production code.

### Chapter 10: Classes

- By default, classes should start with the variables:
  - Static and constants public.
  - Static and variable private.
  - Instances and variables privates.
  - Soon after comes the functions.
  - The class name should represent its responsibility.
- The class must have only [one responsibility](https://en.wikipedia.org/wiki/Single-responsibility_principle): one reason to change.
- You should try to make a brief description of the class.
- The methods should be small and one responsibility.

---


This interview is based on Uncle Bob's book "Clean Code". They cover some existing guides that can help you become a
better programmer and explore how books and current trends are shaping the software landscape.

{{ youtube(id="QnmRpHFoYLk") }}
