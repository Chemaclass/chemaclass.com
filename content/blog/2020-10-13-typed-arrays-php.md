+++
title = "Typed arrays in PHP"
[taxonomies]
tags = [ "software", "php", "array", "generics" ]
[extra]
subtitle = "An alternative to the missing feature in PHP: Generics"
+++

## An alternative to the missing feature in PHP: Generics

### The perfect combination
- Argument unpacking: Instead of passing the argument itself to the function, the elements it contains will be passed (as individual arguments).
- Function variable argument list: The arguments will be passed into the given variable as an array.
- Variadics function: Types can be checked with a type-hint.

We will use this snipped for our examples
Having a class, `Customer`:

```php
/** 
 * @psalm-immutable 
 */
final class Customer
{
    // Using PHP 8 constructor property promotion
    public function __construct(
        public string $name,
    ) {}
}
// We create a list of 6 customers
$customers = array_map(
    fn(int $i): Customer => new Customer("name-{$i}"),
    range(1, 6)
);
```

Whenever we want to manipulate a list of Customers, we can pass as an argument: `…$customers`.

## How we use to do it

We define the array type using the PHPDoc param comment block above. But we cannot define the real type of the item. The code will still run without any problem passing any type on that argument `array $customers`:

```php
/** 
 * @param Customer[] 
 */
function createInvoiceForCustomers(array $customers): void
{
    foreach ($customers as $customer) {
        // ... some irrelevant logic for this example
    }
}
```

The code below would work at "compile-time". But it might fail at "runtime".
```php
createInvoiceForCustomers($customers);
createInvoiceForCustomers([new Customer('any name')]);
createInvoiceForCustomers([new AnyOtherType()]);
```

An alternative (recommended!) might be to extract that logic and ask for the particular type in order to "check it" at runtime in that particular moment, failing if one of the items wasn't really a Customer:

```php
/** 
 * @param Customer[] 
 */
function createInvoiceForCustomers(array $customers): void
{
    foreach ($customers as $customer) {
        createInvoice($customer);
    }
}
function createInvoice(Customer $customer): void
{
    // ... some irrelevant logic for this example
}
```

Everything here below would work at "compile-time". It will for sure break during "runtime" if the `createInvoice(Customer $customer)` receives something different than a Customer.

```php
createInvoiceForCustomers($customers);
createInvoiceForCustomers([new Customer('any name')]);
createInvoiceForCustomers([new AnyOtherType()]); // won't work
```

By doing that `createInvoice(Customer $customer)` we are ensuring the type of the argument, which is good! But, what about going one step further. Could we check the types of the elements when calling the function `createInvoiceForCustomers(array $customers)`, even making the IDE complain when the types are not right?

Well, that's actually what Generics are for, but sadly, they are not yet in PHP. Not even in the upcoming PHP 8. Hopefully in a near future, but we cannot predict that for now.
Luckily, we have currently an alternative nowadays, but it's not that popular. It has its own "pros" and "cons", so let's take a look at an example first:

```php
function createInvoiceForCustomers(Customer ...$customers): void
{
    foreach ($customers as $customer) {
        createInvoice($customer);
    }
}
```

Everything here below would work at "compile-time". It will for sure break during "runtime" if the `createInvoice()` receives something different than a Customer.

```php
createInvoiceForCustomers(...$customers); // OK
createInvoiceForCustomers(
    new Customer('any name'), 
    new Customer('any name'),
); // OK
// This is not even possible to write. The IDE will yeld at you. 
// It's expecting a `Customer`, but `AnyOtherType` is given:
createInvoiceForCustomers(new AnyOtherType());
```

### PROS
- We can easily type a list of any concrete type.

### CONS
- We better define our functions with one or two arguments max. Otherwise, it would be too complicated to read.

### Important remarks
- It needs to be the last taken argument of a function.
- It helps to minimize the number of arguments that we use in a function.


## Conclusions

Argument unpacking is a great feature that, in combination with variadic functions, can help us to simulate typed arrays. With great power comes great responsibility, and this is no exception.
We need to learn about our toolbox in order to use it wisely.

---

References
- [Argument unpacking](https://wiki.php.net/rfc/argument_unpacking)
- [Function variable argument list](https://www.php.net/manual/en/functions.arguments.php#functions.variable-arg-list)
- [Variadics function](https://wiki.php.net/rfc/variadics)
