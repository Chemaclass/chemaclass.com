+++
title = "To mock or not to mock"
description = "Mocking is useful, but 'what to mock' usually turns out to be a more complicated than expected if you don't treat this carefully."
[taxonomies]
tags = [ "testing", "tdd", "software-design", "clean-code", "php" ]
[extra]
subtitle = "How to escape the mocking hell"
static_thumbnail = "/images/blog/2021-01-11/cover.jpg"
+++

![blog-cover](/images/blog/2021-01-11/cover.jpg)

Mocking is useful, but "what to mock" usually turns out to be more complicated than expected if you don't treat
this carefully.

<!-- more -->

#### How to escape the mocking hell

What is actually happening when we create a mock? Which types of mocks are there? Is mocking good or bad? Well, as
always, everything depends on the context. And here we will consider some of the main situations about when to mock and
when not to mock, but especially why.

## What happens when you mock something?

First, we should define what is a mock:

> In a unit test, mock objects can simulate the behavior of complex, real objects and are therefore useful when it is impractical or impossible to incorporate a real object into a unit test.

Mocking makes sense in a *unit testing* context. An integration test should go through the real implementation checking
the integration between multiple units, which are even allowed to talk to the DB or File IO: infrastructure code.
Therefore we should agree that *a unit test is a fast and deterministic test that doesn't rely on external dependencies
and doesn't require any special context to run*.

Mock objects meet the *interface* requirements. In consequence, they allow us to write and unit-test functionality
without calling complex underlying or collaborating classes.

A mock is a test double that stands in for real implementation code during the unit testing process. It is also capable
of producing assertions about how it was manipulated by the test subject during the test run.

> I strongly recommend you to read this post if you want to get into the details of why [Mocking is a code smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a) (Topics like these: What is a mock? What is a unit test? What is test coverage? What is tight coupling? What causes tight coupling? What does composition have to do with mocking? How do we remove coupling? and more!)

## The problem with mocking

When you mock you are overriding the logic of the mocked class. The real logic is getting hidden behind the scenes and
there is actually where bugs love to live. Consider that:

* The mock may have attributes, methods, or arguments that the real object doesn't.

* The mock's *return values may differ from the real objects' return values*. For example, it may return a different
  type of object that has different attributes.

* The mock's *side effects and behavior may differ from the real objects' ones*. For example, maybe the mock fails to
  raise an exception when the real object would raise it.

## Alternatives to mocking

"Are you saying that mocking is bad and we shouldn't mock?!" No.

It depends on what you are "overriding".

* Is your business domain logic what you are mocking? Then it's wrong.
* Is the connection to the DB what you are mocking? Then it's right.

> It depends on the context of the logic and where that logic belongs.

Is it part of your business domain logic? Then you shouldn't mock it but instantiate it.

Is it part of any infrastructure dependency like DB connection, IO file system, Network, or any external service that
has nothing to do directly with your business domain? Then *mock it using abstractions/interfaces*.

The interface should be the *contract between your business domain logic and its external infrastructure dependencies*.
Imagine how easy it would be to unit test your domain logic by instantiating it and calling their methods with different
arguments expecting different inputs under your entire control. 

## Some tricks

When you are writing a unit test:

* Try to instantiate your classes first.
* Avoid mocking concrete classes. I wrote an article exclusively about this exclusively:
  encouraging [final classes](https://medium.com/swlh/final-classes-in-php-9174e3e2747e) and interfaces.

> Mock interfaces. Instantiate concrete classes.

{{ youtube(id="RbSqXFUfRMU") }}

"Excessive use of mocks leads to legacy code." — Philippe Boargau

### How can we avoid excessive mocking?

* Favor immutable state over a mutable state.
* Make dependencies explicit.
* Program to an interface, not to an implementation.

![blog-img](/images/blog/2021-01-11/footer.jpg)

---

#### References

- [Mocking is a code smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a) — Eric Elliott
- [When to mock](https://blog.cleancoder.com/uncle-bob/2014/05/10/WhenToMock.html) & [Test Definitions](https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html) — Uncle Bob 
- [Final classes by default](https://matthiasnoback.nl/2018/09/final-classes-by-default-why/) — Matthias Noback
- [The problem with mocks](https://www.seanh.cc/2017/03/17/the-problem-with-mocks/) — Sean Hammond
- [A Set of Unit Testing Rules](https://www.artima.com/weblogs/viewpost.jsp?thread=126923) — Michael Feathers
