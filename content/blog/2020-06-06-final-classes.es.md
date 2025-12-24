+++
title = "Clases final en PHP | Java | Cualquiera"
description = "Contratos claros, efectos secundarios aislados, testeabilidad, baja complejidad y carga cognitiva, fluidez del código y confianza en ti mismo."
[taxonomies]
tags = [ "php", "software-design", "clean-code", "testing"]
[extra]
subtitle = "Final, o no final, esa es la cuestión"
static_thumbnail = "/images/blog/2020-06-06/cover.jpg"
+++

![blog-cover](/images/blog/2020-06-06/cover.jpg)

Contratos claros, efectos secundarios aislados, testeabilidad, baja complejidad y carga cognitiva, fluidez del código y confianza en ti mismo.

<!-- more -->

## Motivación

### Reduce la visibilidad del ámbito al mínimo

Cuando ves una clase prefijada con final, evitarás que esa clase particular sea extendida por cualquier otra, lo que no solo la hace más legible sino que también te asegura que el ámbito de la lógica donde estás está limitado a esa clase particular.

### Fomenta la mentalidad de "composición sobre herencia"

El Principio Abierto-Cerrado establece: abierto para extensión pero cerrado para modificación.

Si por alguna razón, una buena de la que deberías ser completamente consciente, decides crear una herencia ahí, bueno, entonces simplemente quita la palabra clave final y listo.

Cuando "por defecto" no puedes extender de una clase (porque es final), te ayudarás a ti mismo a pensar en usar composición en lugar de herencia.

## ¿Por qué esta clase no es final?

Si aspiramos a la composición sobre la herencia, entonces deberíamos intentar evitar la herencia tanto como sea posible, y usarla solo cuando sea realmente necesario. La herencia a menudo se usa mal en POO.

### Concepto erróneo

Cuando nos enseñaron POO por primera vez, normalmente nos introdujeron el ejemplo clásico de herencia.

No obstante, cuando Alan Kay creó Smalltalk, la herencia nunca fue el concepto principal. El concepto principal era el paso de mensajes, que consiste en que puedes enviar mensajes a objetos y ellos encapsulan los datos y la lógica en ellos, y puedes cambiar su comportamiento usando diferentes objetos, que es realmente composición. Pero el concepto de herencia es tan popular que eventualmente eclipsa a la composición.

### Beneficios

* Contratos claros. Usar interfaces te obligará a pensar en términos de comunicación entre objetos.
* Unidades de código aisladas, libres de efectos secundarios. Inyectar solo interfaces como dependencias eliminará todos los molestos efectos secundarios alrededor del código en el que estás trabajando.
* Testeabilidad. Mockear dependencias es extremadamente fácil cuando son interfaces.
* Complejidad baja y manejable. Como todo está aislado, no tendrás que preocuparte por cambios en cascada. Esto disminuye dramáticamente la complejidad de tu código.
* Baja carga cognitiva. Con la complejidad reducida, tu cerebro estará libre para enfocarse en lo que importa.
* Fluidez del código. Al eliminar cualquier acoplamiento innecesario, podrás mover las cosas mucho más fácilmente que antes.
* Confianza en ti mismo. Ser capaz de testear tu código de forma tan aislada te dará una maravillosa sensación de confianza para cambiarlo.


## Composición sobre herencia

Si sientes la necesidad de reconfigurar un objeto, cambiar partes de un algoritmo, o reescribir parte de la implementación, considera crear una nueva clase en lugar de sobreescribir una clase existente.
Si necesitas representar una jerarquía de clases, donde las subclases son sustitutos apropiados para sus clases padre. Esta sería la situación clásica donde aún podrías considerar la herencia. Sin embargo, el resultado puede ser incluso mejor si no heredas de clases padre concretas sino de interfaces abstractas.

### Lo que deberías empezar a hacer en su lugar

* Usa interfaces para definir los contratos entre tus clases.
* Usa clases finales para implementar el comportamiento de esas interfaces.
* Usa composición (usando inyección de dependencias a través del constructor) para unir las cosas y prevenir la complejidad.

> Interfaces -> Clases finales -> Composición

![blog-cover](/images/blog/2020-06-06/footer.jpg)
