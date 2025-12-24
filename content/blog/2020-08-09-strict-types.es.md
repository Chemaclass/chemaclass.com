+++
title = "Strict Types en PHP"
description = "`strict_types=1` es más para el lector que para el escritor"
[taxonomies]
tags = [ "php", "clean-code", "software-design"]
[extra]
subtitle = "declare(strict_types=1);"
static_thumbnail = "/images/blog/2020-08-09/cover.jpg"
+++

![blog-cover](/images/blog/2020-08-09/cover.jpg)

En diciembre de 2015, PHP 7 introdujo las declaraciones de tipos escalares y con ello la bandera strict types. ¿Qué es esta nueva característica?

<!-- more -->

Lo bueno de declarar un archivo PHP como estricto es que realmente se aplica **SOLO al archivo actual**. Asegura que este archivo tiene tipos estrictos, pero no se aplica a ningún otro archivo en todo el proyecto. Te permite hacer, paso a paso, esta migración de código no estricto a código estricto, especialmente para archivos o proyectos nuevos.

> Para habilitar el modo estricto, se debe colocar una única directiva declare al principio del archivo. Esto significa que la estrictez de tipado para escalares se configura por archivo. Esta directiva no solo afecta las declaraciones de tipo de parámetros, sino también el tipo de retorno de una función.

## Los tipos estrictos afectan a la coerción de tipos

Usar type hints sin `strict_types` puede llevar a bugs sutiles.

Sin esto, `int $x` significaba `$x debe tener un valor coercionable a int`. Cualquier valor que pudiera ser coercionado a int pasaría el type hint, incluyendo:

- un `int` propio (ejemplo: 42 -> 42)
- un `float` (ejemplo: 13.1459 -> 13)
- un `bool` (ejemplo: true -> 1)
- un `null` (ejemplo: null -> 0)
- un `string` con dígitos iniciales (ejemplo: "15 Trees" -> 15)

Al establecer `strict_types=1`, le dices al motor que int $x significa que $x debe ser solo un int propio, sin coerción de tipos permitida. Tienes la gran seguridad de que estás obteniendo exactamente y solo lo que se dio, sin ninguna conversión o pérdida potencial.

## ¿A quién debería importarle esta línea de "strict type"?

En realidad, declare(strict_types=1); es más para el lector que para el escritor. ¿Por qué? Porque le dirá explícitamente al lector:

- Los tipos en este ámbito actual (archivo/clase) se tratan de forma estricta.

> 'strict_types=1' es más para el lector que para el escritor

El escritor solo necesita mantener tal estrictez mientras escribe el comportamiento esperado. Dicho esto, como escritor, deberías preocuparte por tus lectores, lo que también incluye a tu yo futuro. Porque vas a ser uno de ellos.

![blog-img](/images/blog/2020-08-09/footer.jpg)

------

## Referencias
- [Declaraciones de tipos escalares](https://www.php.net/manual/en/migration70.new-features.php#migration70.new-features.scalar-type-declarations)
- [Qué hacen los strict types en PHP](https://stackoverflow.com/questions/48723637/what-do-strict-types-do-in-php/48723830#48723830)
