+++
title = "Trabajando con código legado"
description = "Estrategias prácticas para lidiar con grandes bases de código sin tests. Cómo añadir tests, romper dependencias y refactorizar con seguridad."
authors = [ "Michael Feathers" ]
[taxonomies]
tags = [ "refactoring", "testing", "tdd", "software-design" ]
[extra]
subtitle = "Estrategias para trabajar con código heredado"
pages = "460"
author = "Michael Feathers"
static_thumbnail = "/images/readings/working-effectively-with-legacy-code.webp"
related_readings = [
  "readings/2016-05-01-clean-code.md",
  "readings/2022-07-11-clean-craftsmanship.md",
  "readings/2016-10-01-the-pragmatic-programmer.md",
]
+++

<!-- more -->

## ¿Qué es código legacy?

> El [código legacy](/es/blog/testing-effectively-legacy-code/) es simplemente código sin tests.

### Beneficios de los tests

El comportamiento es clave para entender los beneficios del [testing](/es/blog/the-art-of-testing/):

> El comportamiento es lo más importante del software. Los usuarios dependen de él. Les gusta que añadamos funcionalidad (si es lo que querían), pero si cambiamos o rompemos comportamiento del que dependen, pierden la confianza.

### Cómo implementar tests en bases de código legacy

Para cambiar código necesitas tests. Pero para añadir tests muchas veces tienes que cambiar código.

El enfoque sugerido:
1. Identificar puntos de cambio.
2. Encontrar puntos de test.
3. Romper dependencias.
4. Escribir tests.
5. Hacer cambios y refactorizar.

Un término útil es "**costura**" (seam): **un lugar donde puedes cambiar el comportamiento sin editar ese código directamente**. Como la costura en la ropa, donde dos partes se unen.
En software, **estos lugares suelen tener interfaces bien definidas**. Puedes aprovecharlos para cambiar implementaciones con inyección de dependencias o [mocking](/es/blog/to-mock-or-not-to-mock/) en tests.

---

{{ youtube(id="wRtJRkRIa2s") }}
