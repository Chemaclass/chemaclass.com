+++
title = "Introduciendo un nuevo stack tecnológico"
description = "Para introducir un nuevo stack tecnológico para todo el equipo, es importante traer el \"¿por qué?\" y una estrategia para hacerlo realidad entre el equipo porque afectará a todos."
draft = false
[taxonomies]
tags = [ "software-design", "architecture", "team-management", "communication" ]
[extra]
subtitle = "Cómo introducir nuevas tecnologías en tu equipo"
static_thumbnail = "/images/blog/2023-04-14/cover.jpg"
+++

![blog-cover](/images/blog/2023-04-14/cover.jpg)

Para introducir un nuevo stack tecnológico para todo el equipo, es importante traer el "¿por qué?" y una estrategia para hacerlo realidad entre el equipo porque afectará a todos.

<!-- more -->

## ¿Por qué ese nuevo stack tecnológico?

Para decidir si usar un nuevo stack tecnológico o no, recuerda que es una decisión de equipo, según la estandarización y mantenibilidad del proyecto al introducir dicho nuevo stack tecnológico. Pero, lo más importante, ¿qué problema quieres resolver al introducirlo? ¿Es porque es "cool"? ¿O hay una "necesidad" real con la que esta tecnología te ayuda?

### La dirección de la tecnología

Al proponer adoptar una nueva biblioteca, framework o tecnología completamente nueva, un aspecto importante a considerar es ser consciente de su trasfondo y la dirección hacia donde se están moviendo.

¿Cuál es la motivación de esa tecnología, y por qué estás considerando introducirla en tu stack actual?

### Acoplamiento y dependencias

Al adoptar nuevas tecnologías en nuestro negocio diario, no es raro que tendamos a acoplarnos con ellas. Esto hace más difícil después retroceder si, después de un tiempo, nos arrepentimos de esa decisión.

No me malinterpretes, aprender y experimentar con nuevas tecnologías es genial, pero introducirla en tu trabajo diario es otra historia porque afectará a todo el equipo. Así que necesitamos ser más cuidadosos con esto.

![blog-middle](/images/blog/2023-04-14/middle.jpg)

## El enfoque de la conversación

- ¿Qué aporta esta nueva tecnología al proyecto?
- ¿Qué problema queremos resolver al introducirla?
- ¿Podemos resolver ese problema con nuestra tecnología actual?
- Si ya tenemos una tecnología similar, ¿queremos tener una mezcla de ambas?
- ¿Cuáles son los trade-offs al usarla vs. no usarla?
- ¿Vale la pena la complejidad incremental con el tiempo?
- ¿Cuál es la estrategia del equipo para incorporar a todos si apuntamos a usarla?

### Architectural Decision Records (ADRs)

Sea cual sea el resultado, deberías escribirlo como un [ADR](https://adr.github.io/) para revisarlo con el paso del tiempo. Un ADR registrará las decisiones de tu equipo respecto a los pros y contras, entre cualquier otro argumento que hayan encontrado juntos, para decidir qué hacer y por qué.

Los ADRs son útiles para entender decisiones antiguas y mantenerlas en el control de versiones -- en el mismo proyecto si es posible. Son útiles para el equipo actual, pero también para los nuevos integrantes.

![blog-footer](/images/blog/2023-04-14/footer.jpg)

> Gracias a mis amigos [Manu](https://x.com/evrtrabajo), [Antonio](https://x.com/Tito_Kati) y [Jesus](https://x.com/JesusValera96), quienes me ayudaron a crear este resumen de ideas después de hacer brainstorming juntos.
