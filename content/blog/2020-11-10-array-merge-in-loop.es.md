+++
title = "Nunca Uses array_merge en un Bucle"
description = "Usar array_merge dentro de un bucle mata el rendimiento. El operador spread te ayudará a mejorar esto aplanando el array."
[taxonomies]
tags = [ "php", "clean-code", "refactoring"]
[extra]
subtitle = "El operador spread al rescate"
static_thumbnail = "/images/blog/2020-11-10/cover.jpg"
related_posts = [
  "blog/2020-10-13-typed-arrays-php.md",
  "blog/2020-06-28-the-art-of-refactoring.md",
  "blog/2021-01-11-to-mock-or-not-to-mock.md",
]
related_readings = [
  "readings/2016-05-01-clean-code.md",
  "readings/2016-10-01-the-pragmatic-programmer.md",
]
+++

![blog-cover](/images/blog/2020-11-10/cover.jpg)

Usar array_merge dentro de un bucle mata el rendimiento.
El operador spread te ayudará a mejorar esto aplanando el array.

<!-- more -->

## Aplanando un array de un nivel

He visto a gente usar array_merge dentro de un bucle así:

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

Esto es mala práctica porque destroza el rendimiento de memoria.
Mejor usa el operador spread (disponible desde PHP 5.6):

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

## Desempaquetando un array asociativo

¿Y si tuvieras un array asociativo como este?

```php
<?php
$lists = [
  'key-1' => [1, 2],
  'key-2' => [3, 4],
  'key-3' => [5, 6],
];
```

En ese caso, necesitarás desempaquetar sus valores:

```php
<?php
$merged = array_merge(...array_values($lists));
// === [1, 2, 3, 4, 5, 6];
```

En programación funcional, esto se conoce como aplanar una lista.
Sin bucles ni problemas de rendimiento.

## Aplanando un array multinivel

¿Y si quisieras aplanar un array multinivel como este?
```php
<?php
$lists = [[1], 2, [[3, 4], 5], [[[]]], [[[6]]], 7, 8, []];
```

¿O como este, incluso con clave-valores?

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

Para estos casos, puedes usar la librería estándar de PHP:

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

## Conclusión

Normalmente, saber aplanar un array de dos niveles suele ser suficiente:
```php
<?php
$flattenList = array_merge(...array_values($lists));
```

Para casos más complejos, la librería estándar de PHP te saca del apuro.

---

### Referencias

- [Spread_operator_for_array - Wikipedia](https://wiki.php.net/rfc/spread_operator_for_array)
- [Flatten_a_list - Rosettacode](https://rosettacode.org/wiki/Flatten_a_list)
