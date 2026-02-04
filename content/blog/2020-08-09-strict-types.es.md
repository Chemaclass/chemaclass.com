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

En diciembre de 2015, PHP 7 introdujo las declaraciones de tipos escalares y la bandera strict types. ¿Qué es esto?

<!-- more -->

Lo bueno de declarar un archivo PHP como estricto es que se aplica **solo al archivo actual**. Asegura tipos estrictos en ese archivo, pero no afecta al resto del proyecto. Puedes migrar de código no estricto a estricto paso a paso, especialmente en archivos o proyectos nuevos.

> Para habilitar el modo estricto, coloca una directiva declare al principio del archivo. La estrictez de tipado para escalares se configura por archivo. Esta directiva afecta tanto a los parámetros como al tipo de retorno de las funciones.

## Strict types afecta la coerción de tipos

Usar type hints sin `strict_types` puede causar bugs sutiles.

Sin strict types, `int $x` significa "$x debe ser coercionable a int". Cualquier valor coercionable a int pasaría:

- un `int` (42 -> 42)
- un `float` (13.1459 -> 13)
- un `bool` (true -> 1)
- un `null` (null -> 0)
- un `string` con dígitos al inicio ("15 Trees" -> 15)

Con `strict_types=1`, le dices al motor que `int $x` significa que $x debe ser un int real, sin coerción. Tienes la seguridad de que recibes exactamente lo que se pasó, sin conversiones ni pérdida de datos.

## ¿A quién le importa esta línea?

`declare(strict_types=1);` es más para el lector que para el escritor. Le dice explícitamente:

- Los tipos en este archivo se tratan de forma estricta.

> 'strict_types=1' es más para el lector que para el escritor

El escritor solo necesita mantener esa estrictez mientras escribe. Pero como escritor, deberías preocuparte por tus lectores. Eso incluye a tu yo futuro.

![blog-img](/images/blog/2020-08-09/footer.jpg)

------

## Referencias
- [Declaraciones de tipos escalares](https://www.php.net/manual/en/migration70.new-features.php#migration70.new-features.scalar-type-declarations)
- [Qué hacen los strict types en PHP](https://stackoverflow.com/questions/48723637/what-do-strict-types-do-in-php/48723830#48723830)
