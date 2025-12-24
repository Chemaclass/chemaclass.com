+++
title = "Nunca uses array_merge en un bucle"
description = "Usar array_merge dentro de un bucle mata el rendimiento. El operador spread te ayudará a mejorar esto aplanando el array."
[taxonomies]
tags = [ "php", "clean-code", "refactoring"]
[extra]
subtitle = "El operador spread al rescate"
static_thumbnail = "/images/blog/2020-11-10/cover.jpg"
+++

![blog-cover](/images/blog/2020-11-10/cover.jpg)

Usar array_merge dentro de un bucle mata el rendimiento.
El operador spread te ayudará a mejorar esto aplanando el array.

<!-- more -->

## Aplanando un array de un nivel

He visto gente usando la función array_merge en un bucle como:

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

¡Esta es una muy mala práctica porque mata el rendimiento (de memoria)!
En su lugar, deberías usar el operador spread (¡en PHP desde 5.6!):

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

En Programación Funcional, esto se conoce como aplanar una lista.
Sin bucles y sin más problemas de rendimiento.

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

En estos casos, podrías querer usar la librería estándar interna:

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

Normalmente, ser consciente de cómo aplanar un array de "2 niveles" puede ser suficiente:
```php
<?php
$flattenList = array_merge(...array_values($lists));
```

De lo contrario, la librería estándar interna te ayudará a lidiar con ello.

---

### Referencias

- [Spread_operator_for_array - Wikipedia](https://wiki.php.net/rfc/spread_operator_for_array)
- [Flatten_a_list - Rosettacode](https://rosettacode.org/wiki/Flatten_a_list)
- [Slow array function used in loop - Kalessil](https://kalessil.github.io/phpinspectionsea/docs/performance.html#slow-array-function-used-in-loop)
