+++
title = "Never use array_merge in a loop"
[taxonomies]
tags = [ "software", "php", "array", "performance" ]
[extra]
subtitle = "The spread operator to the rescue"
+++

> Using array_merge inside a loop is a performance killer.
> The spread operator will help you to improve this by flatting the array.

<!-- more -->

# Flattening a one-level array

I have seen people using the array_merge function in a loop like:

```php
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
$lists = [
  'key-1' => [1, 2],
  'key-2' => [3, 4],
  'key-3' => [5, 6],
];
```

In that case, you will need to unpack its values:

```php
$merged = array_merge(...array_values($lists));
// === [1, 2, 3, 4, 5, 6];
```

In Functional Programming, this is known as flatting a list.
No loops & no more performance problem.

# Flatting a multilevel array

What if you wanted to flat a multilevel array like this one?
```php
$lists = [[1], 2, [[3, 4], 5], [[[]]], [[[6]]], 7, 8, []];
```

Or like this one, even with key-values?

```php
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
$merged = iterator_to_array(
    new RecursiveIteratorIterator(
        new RecursiveArrayIterator($lists)
    ),
    $use_keys = false
);
// $merged === [1, 2, 3, 4, 5, 6, 7, 8];
```

# Conclusion

Usually, being aware of how to flat a "2 level" array might be sufficient:
```php
$flattenList = array_merge(...array_values($lists));
```

Otherwise, the internal standard library will help you deal with it.
