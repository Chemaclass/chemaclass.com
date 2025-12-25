+++
title = "Phel: el Lisp que compila a PHP"
description = "El nuevo lenguaje de Programación Funcional construido para PHP."
[taxonomies]
tags = [ "php", "open-source", "software-design" ]
[extra]
subtitle = "Un nuevo lenguaje funcional con interoperabilidad total con PHP"
static_thumbnail = "/images/blog/2021-02-01/cover.jpg"
+++

![blog-cover](/images/blog/2021-02-01/cover.jpg)

Un nuevo lenguaje de Programación Funcional construido sobre el ecosistema de PHP.

<!-- more -->

# El Lenguaje Phel

Phel es un lenguaje de Programación Funcional ([FP](https://en.wikipedia.org/wiki/Functional_programming)) que compila a PHP. Es un dialecto de [Lisp](https://en.wikipedia.org/wiki/Lisp_(programming_language)) inspirado en Clojure y Janet.

## Características

- Construido sobre el ecosistema de PHP
- Buenos reportes de errores
- Diferentes estructuras de datos (Arrays, Tables y Tuples)
- Macros
- Funciones recursivas
- Sintaxis potente pero simple
- REPL

## ¿Por qué Phel?

Phel es una creación de Jens Haase, y como menciona en el sitio web, "es el resultado de muchos [intentos fallidos de hacer programación funcional en PHP](https://phel-lang.org/blog/functional-programming-in-php)". Estaba buscando algo con estas características:

- Inspirado en LISP
- Lenguaje de Programación Funcional
- Que funcione en proveedores de hosting baratos
- Sea fácil de escribir y depurar

Desde mi punto de vista, fue a finales de mayo de 2020 cuando terminé el
libro [Seven Languages in Seven Weeks](/readings/7-languages-in-7-weeks/), en el que aprendí los fundamentos de Prolog, Erlang,
Clojure, Haskell… Incluso creé un [repositorio en GitHub](https://github.com/Chemaclass/7LangIn7Weeks) para almacenar mi
progreso durante las semanas con estos aprendizajes.

De repente, un día a principios de junio de 2020, vi un post en el canal oficial de PHP de Reddit, con un mensaje de alguien
mencionando este proyecto "**Phel**", afirmando ser un **"lenguaje de programación funcional" escrito en PHP**!

Trabajo con PHP desde hace unos 8 años, y siempre intento combinar OOP con FP tanto como sea posible (porque creo que
ambos paradigmas son mejores combinados; no son necesariamente excluyentes), y un nuevo dialecto de Lisp completamente escrito
en **PHP 7.4** nativo sonaba realmente emocionante. Decidí echarle un vistazo. Quería ver el código.

Las lecturas frescas de los libros de [Mathias NoBack](https://x.com/matthiasnoback) como
[Object Design Style Guide](/readings/object-design-style-guide),
y [Advanced Web Application Architecture](/readings/advance-web-application-architecture/), me dieron el valor para probar
lo que aprendí y ponerlo de verdad en un proyecto. Este fue (y sigue siendo) un hermoso desafío, que me ayuda a
probarme a mí mismo y crecer profesionalmente al mismo tiempo.

Mi primer commit fue hecho el 6 de junio de 2020, y desde entonces he estado dedicando un poco de tiempo cada día durante mis horas
libres a su desarrollo.
Me ayuda a aprender más sobre FP, diseño interno de lenguajes, y mejores prácticas en testing y arquitectura de diseño de software
en general.

Empecé aplicando cambios menores hasta que acabé refactorizando toda la estructura del compilador (entre otras cosas) para
hacer los módulos más fáciles de leer y entender. Psalm, tipos estrictos, buena cobertura de tests, unificando el estilo de código… Estos fueron
algunos de mis temas favoritos.

## Ejemplo de código Phel

El siguiente ejemplo da una breve impresión de cómo se ve Phel:
```phel
# Define un namespace
(ns my\example)
# Define una variable con nombre "my-name" y valor "world"
(def my-name "world")
# Define una función con nombre "print-name" y un argumento
(defn print-name [your-name]
  (print "hello" your-name))
# Llama a la función
(print-name my-name)
```

## Estado actual de Phel
- Tenemos una [Comunidad Gitter](https://gitter.im/phel-lang/community) abierta donde nos ayudamos mutuamente
- Preparamos una fácil [Guía de Inicio](https://phel-lang.org/documentation/getting-started/)
- Preparamos un Repositorio GitHub fácil con una [Plantilla de Scaffolding de Phel](https://github.com/phel-lang/phel-scaffolding)
- Acabamos de lanzar la primera versión oficial: [0.1.0](https://github.com/phel-lang/phel-lang/tags)

Consulta el sitio web oficial con toda la documentación: [https://phel-lang.org/](https://phel-lang.org/)

---

### También recomendado



- [Functional Programming with Phel - JesusValera](https://jesusvalera.dev/functional-programming-with-phel/)
