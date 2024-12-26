+++
title = "Final classes in PHP | Java | Any"
description = "Clear contracts, isolated side effects, testability, low complexity and cognitive load, code fluidity, and confidence in yourself."
[taxonomies]
tags = [ "software", "php", "java" ]
[extra]
subtitle = "Final, or not final, that's the question"
static_thumbnail = "/images/blog/2020-06-06/cover.jpg"
+++

![blog-cover](/images/blog/2020-06-06/cover.jpg)

Clear contracts, isolated side effects, testability, low complexity and cognitive load, code fluidity, and confidence in yourself.

<!-- more -->

## Motivation

### Reduce the scope visibility to the minimum

When you see a class prefix with final you will prevent a particular class to be extended by any other, which not only makes it more readable but also makes you be sure that the scope of the logic where you are is limited to that particular class.

### Encourage "composition over inheritance" mentality

The Open-Close Principle states: open for extension but close for modification.

If for any reason, a good one you should be completely aware of, you decide to create an inheritance there, well, then just drop the final keyword and you are good to go.

When you "by default" can't extends from a class (because it's final), you will help yourself by thinking about using composition instead of inheritance.

## Why isn't this class final?

If we aim for composition over inheritance, then we should try to avoid inheritance as much as possible, and use it only when it's really necessary. Inheritance is often misused in OOP.

### Misconception

When we first taught OOP, we usually introduced the classic inheritance example.

Nonetheless, when Alan Kay created Smalltalk, the inheritance was never the main concept of it. The main concept was messaging, which is that you can send messages to objects and they encapsulate the data and logic in it, and you can change their behavior by using different objects, which is actually composition. But the concept of inheritance is too popular that eventually overshadows composition.

### Benefits

* Clear contracts. Using interfaces will force you to think in terms of communication between objects.
* Isolated, side effect free code units. Injecting interfaces only as dependencies will remove every nasty side effect around the code you are working on.
* Testability. Mocking dependencies is extremely easy when they are interfaces.
* Low, manageable complexity. Since everything is isolated, you won't need to worry about rippling changes. This dramatically decreases the complexity of your code.
* Low cognitive load. With decreased complexity, your brain will be free to focus on what matters.
* Code fluidity. By removing any unnecessary coupling, you will be able to move things around way more easily than before.
* Confidence in yourself. Being able to test your code in isolation so well will give you a wonderful sense of confidence in changing it.


## Composition over inheritance

If you feel the need to reconfigure an object, to change parts of an algorithm, or to rewrite part of the implementation, consider creating a new class instead of overriding an existing class.
If you need to represent a hierarchy of classes, where subclasses are proper substitutes for their parent classes. This would be the classic situation where you may still consider inheritance. However, the result may even be better if you don't inherit from concrete parent classes but from abstract interfaces.

### What you should start doing instead

* Use interfaces to define the contracts between your classes.
* Use final classes to implement behavior for those interfaces.
* Use composition (using dependency injection through constructor) to put things together and prevent complexity.

> Interfaces -> Final classes -> Composition

![blog-cover](/images/blog/2020-06-06/footer.jpg)
