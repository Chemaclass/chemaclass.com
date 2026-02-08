+++
title = "Clases Final en PHP | Java | Cualquiera"
description = "Contratos claros, efectos secundarios aislados, testeabilidad, baja complejidad y carga cognitiva, fluidez del código y confianza en ti mismo."
[taxonomies]
tags = [ "php", "software-design", "clean-code", "testing"]
[extra]
subtitle = "Final, o no final, esa es la cuestión"
static_thumbnail = "/images/blog/2020-06-06/cover.jpg"
related_posts = [
  "blog/2020-08-09-strict-types.md",
  "blog/2020-04-07-the-art-of-testing.md",
]
related_readings = [
  "readings/2016-05-01-clean-code.md",
  "readings/2020-10-10-object-design-style-guide.md",
]
+++

![blog-cover](/images/blog/2020-06-06/cover.jpg)

Contratos claros, efectos secundarios aislados, testeabilidad, baja complejidad y carga cognitiva, fluidez del código y confianza en ti mismo.

<!-- more -->

## Motivación

### Reduce la visibilidad al mínimo

Cuando una clase es `final`, no puede ser extendida. Esto la hace más legible y te asegura que la lógica está limitada a esa clase.

### Fomenta "composición sobre herencia"

El Principio Abierto-Cerrado dice: abierto para extensión, cerrado para modificación.

Si decides crear una herencia (por una buena razón, de la que deberías ser consciente), simplemente quita `final` y listo.

Cuando por defecto no puedes extender una clase, te fuerzas a pensar en composición en lugar de herencia.

## ¿Por qué esta clase no es final?

Si preferimos composición sobre herencia, deberíamos evitar la herencia tanto como sea posible. La herencia se usa mal a menudo en POO.

### Un concepto mal entendido

Cuando nos enseñaron POO, normalmente empezamos con el ejemplo clásico de herencia.

Pero cuando Alan Kay creó Smalltalk, la herencia no era el concepto principal. Lo principal era el paso de mensajes: enviar mensajes a objetos que encapsulan datos y lógica, cambiando comportamiento mediante diferentes objetos. Eso es composición. La herencia se hizo tan popular que terminó eclipsando a la composición.

### Beneficios

* **Contratos claros.** Usar interfaces te obliga a pensar en comunicación entre objetos.
* **Código aislado, sin efectos secundarios.** Inyectar solo interfaces elimina efectos secundarios molestos.
* **Testeabilidad.** Mockear interfaces es muy fácil.
* **Complejidad manejable.** Todo aislado significa menos cambios en cascada.
* **Baja carga cognitiva.** Menos complejidad, más foco en lo importante.
* **Flexibilidad.** Sin acoplamiento innecesario, mover código es más fácil.
* **Confianza.** Testear código aislado te da seguridad para cambiarlo.


## Composición sobre herencia

Si necesitas reconfigurar un objeto, cambiar partes de un algoritmo o reescribir parte de la implementación, considera crear una nueva clase en lugar de sobreescribir una existente.

¿Necesitas representar una jerarquía donde las subclases sustituyen a las clases padre? Esta sería la situación clásica donde podrías usar herencia. Aun así, el resultado suele ser mejor si heredas de interfaces abstractas, no de clases concretas.

### Qué hacer en su lugar

* Usa interfaces para definir contratos entre clases.
* Usa clases finales para implementar esas interfaces.
* Usa composición (inyección de dependencias por constructor) para unir las piezas.

> Interfaces -> Clases finales -> Composición

![blog-cover](/images/blog/2020-06-06/footer.jpg)
