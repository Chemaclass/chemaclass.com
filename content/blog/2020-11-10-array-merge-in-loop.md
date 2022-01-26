+++
title = "Never use array_merge in a loop"
description = "Using array_merge inside a loop is a performance killer. The spread operator will help you to improve this by flatting the array."
[taxonomies]
tags = [ "software", "php", "array", "performance" ]
[extra]
subtitle = "The spread operator to the rescue"
static_thumbnail = "/images/blog/2020-11-10/cover.jpg"
+++

![blog-cover](/images/blog/2020-11-10/cover.jpg)

Using array_merge inside a loop is a performance killer.
The spread operator will help you to improve this by flatting the array.

<!-- more -->

## Flattening a one-level array

I have seen people using the array_merge function in a loop like:

```php
<?php
$lists = [
  [1, 2],
  [3, 4],
  [5, 6],
];
$merged = [];
foreach($lists as $list) {
    $merged = array_merge($merged, $list);
}
// $merged === [1, 2, 3, 4, 5, 6];
```

This is a very bad practice because it's a (memory) performance killer!
Instead, you should use the spread operator (in PHP since 5.6!):

```php
<?php
$lists = [
  [1, 2],
  [3, 4],
  [5, 6],
];
$merged = array_merge(...$lists);
// === [1, 2, 3, 4, 5, 6];
```

## Unpacking an assoc-array

What if you had an assoc-array instead like this one?

```php
<?php
$lists = [
  'key-1' => [1, 2],
  'key-2' => [3, 4],
  'key-3' => [5, 6],
];
```

In that case, you will need to unpack its values:

```php
<?php
$merged = array_merge(...array_values($lists));
// === [1, 2, 3, 4, 5, 6];
```

In Functional Programming, this is known as flatting a list.
No loops & no more performance problem.

## Flatting a multilevel array

What if you wanted to flat a multilevel array like this one?
```php
<?php
$lists = [[1], 2, [[3, 4], 5], [[[]]], [[[6]]], 7, 8, []];
```

Or like this one, even with key-values?

```php
<?php
$lists = [
    'key-1' => [
        1,
        [2],
        'key-2' => [
            3,
            [
                'key-3' => [4, 5],
            ],
        ],
    ],
    6,
    'key-4' => [7, 8],
];
```

In these cases, you might want to use the internal standard library:

```php
<?php
$merged = iterator_to_array(
    new RecursiveIteratorIterator(
        new RecursiveArrayIterator($lists)
    ),
    $use_keys = false
);
// $merged === [1, 2, 3, 4, 5, 6, 7, 8];
```

## Conclusion

Usually, being aware of how to flat a "2 level" array might be sufficient:
```php
<?php
$flattenList = array_merge(...array_values($lists));
```

Otherwise, the internal standard library will help you deal with it.

---

### References

- [Spread_operator_for_array - Wikipedia](https://wiki.php.net/rfc/spread_operator_for_array)
- [Flatten_a_list - Rosettacode](https://rosettacode.org/wiki/Flatten_a_list)
- [Slow array function used in loop - Kalessil](https://kalessil.github.io/phpinspectionsea/docs/performance.html#slow-array-function-used-in-loop)