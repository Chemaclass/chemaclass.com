+++
title = "Testing Effectively Legacy Code"
description = "These tests are also known as Characterization tests."
[taxonomies]
tags = [ "testing", "refactoring", "clean-code", "tdd"]
[extra]
subtitle = "How to write proper tests to already written code"
static_thumbnail = "/images/blog/2021-01-11/cover.jpg"
related_posts = [
  "blog/2020-06-06-final-classes.md",
  "blog/2020-06-28-the-art-of-refactoring.md",
  "blog/2020-04-07-the-art-of-testing.md",
]
related_readings = [
  "readings/2019-07-01-working-effectively-with-legacy-code.md",
  "readings/2016-05-01-clean-code.md",
]
+++

![blog-cover](/images/blog/2020-08-17/cover.jpg)

These tests are also known as Characterization tests.

<!-- more -->

> A characterization test describes the actual behavior of an existing piece of software, and therefore protects existing
> behavior of legacy code against unintended changes via automated testing. This term was coined by [Michael Feathers](/readings/working-effectively-with-legacy-code/).

They enable and provide a safety net for extending and refactoring code that does not have adequate tests. A test can be
written that asserts that the output of the legacy code matches the observed result for the given inputs.

## How to start?

These are my learnings one year after
reading [Working Effectively with Legacy Code](/readings/working-effectively-with-legacy-code/) and applying it to the
different projects I've been working on since then.

### 1. What do you want to test?

Find out the assertions. Create a test file for your class, and a testing method for the function that you want to test.
Hint:

- If you have the following method `applySomeLogic(): ReturnType`,
- the test you could write is `test_apply_some_logic(): void`.

```php
final class MyBusinessLogic
{
    private DependencyInterface dependencyInterface;
    private ConcreteDependency concrete;

    public function __construct(
        DependencyInterface dependencyInterface,
        ConcreteDependency concrete
    ) {
        this.dependencyInterface = dependencyInterface;
        this.concrete = concrete;
    }

    public function applySomeLogic(Input input): ReturnType
    {
        // black box responsible to create a ReturnType
        // based on the given Input
        return returnType;
    }
}

final class MyBusinessLogicTest extends TestCase
{
    public function test_apply_some_logic(): void
    {
        // I want to assert that "applying some logic"
        // from MyBusinessLogic with the given Input
        // I will receive a concrete ReturnType with a 
        // certain value as its property. Something like:
        
        returnType = myBusinessLogic.applySomeLogic(input);
        assertEquals('expected', returnType.getProperty());
    }
}
```

### 2. Instantiate the concrete/final class that you want to test.

Do not mock your concrete classes. Especially your business domain. Mock only interfaces. Otherwise, you can be hiding
bugs unintentionally (with green/passing tests!). Treat your [business domain classes as final](/blog/final-classes).

Either mock the interface or instantiate an anonymous class if you want to create a Stub:

> Stubs provide answers to calls made during the test, usually not responding to anything outside what's programmed in for the test.

```php
final class MyBusinessLogicTest extends TestCase
{
    public function test_apply_some_logic(): void
    {
        myBusinessLogic = new MyBusinessLogic(
            this.createMock(DependencyInterface.class),
            new ConcreteDependency(/* ... */)
        );
        // OR
        myBusinessLogic = new MyBusinessLogic(
            new FakeDependency(),
            new ConcreteDependency(/* ... */)
        );
        // ...
    }
}
```

> Where `FakeDependency` is a concrete implementation of `DependencyInterface` with already "fake data/implementation" that it's useful only for testing purposes.

### 3. Call the method from that class providing the desired input.

The output will be determined by the initial state of the business logic class that we want to test PLUS the input
arguments that we are using.

```php
input = new Input(/* ... */);
returnType = myBusinessLogic.applySomeLogic(input);
```

### 4. Assert the output with the expected value.

From step-1 you need to know what you want. Apply the assertion(s) now.

```php
final class MyBusinessLogicTest extends TestCase
{
    public function test_apply_some_logic(): void
    {
        myBusinessLogic = new MyBusinessLogic(
            this.createMock(DependencyInterface::class),
            new ConcreteDependency(/* ... */)
        );

        input = new Input(/* ... */);
        returnType = myBusinessLogic.applySomeLogic(input);
        assertEquals('expected', returnType.getProperty());
    }
}
```

### 5. You might want to assert different expected values.

You can easily provide different arguments to your business logic either via the logic construction or different given
arguments. To do so, use the @dataProvider annotation. The “dataProvider” method must be public and return any iterable.


```php
final class MyBusinessLogicTest extends TestCase
{
    /** @dataProvider providerApplySomeLogic */
    public function test_apply_some_logic(
        array concreteMapping,
        string argInput,
        string expectedValue
    ): void {
        myBusinessLogic = new MyBusinessLogic(
            this.createMock(DependencyInterface.class),
            new ConcreteDependency(concreteMapping),
            /* ... */
        );

        input = new Input(argInput, /* ... */);

        actual = myBusinessLogic.applySomeLogic(input);
        assertEquals($expectedValue, actual.getProperty());
    }

    public function providerApplySomeLogic(): Generator
    {
        yield [
            'concreteMapping' => ['key' => 'value'],
            'argInput' => 'something',
            'expectedValue' => 'expected-value-A',
        ];

        yield [
            'concreteMapping' => ['key2' => 'value2'],
            'argInput' => 'something-else',
            'expectedValue' => 'expected-value-B',
        ];
    }
}
```

### Lastly: clean what you did.

Yes, clean the tests. They deserve to be as clean as your production code. Otherwise, they will rot as time pass by and
remain dirty for your colleagues and your future self!

For example, you can apply extract method refactoring to move out the implementation details (of the creation of the
different objects) and keep the same abstraction level while reading the test code.

```php
myBusinessLogic = this.createBusinessLogic(concreteMapping);
input = this.createInput(argInput);
actual = myBusinessLogic.applySomeLogic(input);
assertEquals(expectedValue, actual.getProperty());
```

Of course, everything depends on the context. Does it really make sense to extract into a private method the
createBusinessLogic() or even createInput()? Well, that's up to you. It depends on the number of lines and, most
importantly, the abstraction level that belongs to that context.

> Just remember: keep your methods small.

Now you can refactor the production code that you covered with tests without that fear of breaking it.

---

### All together

{{ gist(url="Chemaclass/07704606fcb337dbb0881c94197c329e") }}

{{ gist(url="Chemaclass/9f7f96242153b696b3f8da5c7fa80461") }}

---

## Legacy Code is code without tests

![blog-cover](/images/blog/2020-08-17/footer.jpg)

Of course, there is way more to learn
about [testing and working with legacy code](/readings/working-effectively-with-legacy-code/). In fact, especially when
dealing with legacy code, you will encounter situations where the code is coupled somehow that you might want to mock
your concrete classes because there is no interface (yet) for it.

This book presents to you a lot of techniques about when, why, where, and how you can apply these changes.

> When working with code you need **feedback**. Automated feedback is the best. Thus, this is the first thing you need to do: write the tests.

### First, add tests, then do your changes.

#### Change as little code as possible to get tests in place with the recipe:

1. Identify “change points” to break your code dependencies.
1. Break dependencies.
1. Write the tests.
1. Make your changes.
1. Refactor.

---

{{ youtube(id="wRtJRkRIa2s") }}
