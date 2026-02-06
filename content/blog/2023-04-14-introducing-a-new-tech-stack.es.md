+++
title = "Introduciendo un nuevo stack tecnológico"
description = "Cuando introduces una nueva tecnología en tu equipo, necesitas explicar el porqué y tener una estrategia clara. Va a afectar a todos."
draft = false
[taxonomies]
tags = [ "software-design", "architecture", "team-management", "communication" ]
[extra]
subtitle = "Cómo introducir nuevas tecnologías en tu equipo"
static_thumbnail = "/images/blog/2023-04-14/cover.jpg"
related_posts = [
  "blog/2022-08-22-understanding-people.md",
  "blog/2022-11-11-working-agile-with-non-agile-teams.md",
  "blog/2023-12-30-great-engineering.md",
]
related_readings = [
  "readings/2018-06-04-clean-architecture.md",
  "readings/2022-11-28-recipes-for-decoupling.md",
]
+++

![blog-cover](/images/blog/2023-04-14/cover.jpg)

Cuando introduces una nueva tecnología en tu equipo, necesitas explicar el porqué y tener una estrategia clara. Va a afectar a todos.

<!-- more -->

## ¿Por qué ese nuevo stack tecnológico?

Antes de decidir, recuerda que es una decisión de equipo. Piensa en la estandarización y mantenibilidad del proyecto. Pero lo más importante: ¿qué problema quieres resolver? ¿Es porque mola? ¿O hay una necesidad real que esta tecnología resuelve?

### La dirección de la tecnología

Cuando propones adoptar una nueva biblioteca, framework o tecnología, hay que conocer su trasfondo y hacia dónde se dirige.

¿Cuál es la motivación detrás de esa tecnología? ¿Por qué quieres añadirla a tu stack actual?

### Acoplamiento y dependencias

Al adoptar nuevas tecnologías en el día a día, es fácil acoplarse a ellas. Eso hace más difícil dar marcha atrás si después nos arrepentimos.

No me malinterpretes: aprender y experimentar con nuevas tecnologías está genial. Pero introducirlas en tu trabajo diario es otra historia. Afecta a todo el equipo, así que hay que ser cuidadosos.

![blog-middle](/images/blog/2023-04-14/middle.jpg)

## El enfoque de la conversación

- ¿Qué aporta esta nueva tecnología al proyecto?
- ¿Qué problema queremos resolver?
- ¿Podemos resolverlo con nuestra tecnología actual?
- Si ya tenemos algo similar, ¿queremos mezclar ambas?
- ¿Cuáles son los trade-offs de usarla vs. no usarla?
- ¿Vale la pena la complejidad extra a largo plazo?
- ¿Cuál es la estrategia para que todos se suban al carro?

### Architectural Decision Records (ADRs)

Sea cual sea el resultado, escríbelo como un [ADR](https://adr.github.io/) para poder revisarlo con el tiempo. Un ADR documenta las decisiones del equipo: pros, contras y los argumentos que encontrasteis juntos para decidir qué hacer y por qué.

Los ADRs ayudan a entender decisiones antiguas. Guárdalos en el control de versiones, en el mismo proyecto si es posible. Son útiles para el equipo actual y para los nuevos que lleguen.

![blog-footer](/images/blog/2023-04-14/footer.jpg)

> Gracias a mis amigos [Manu](https://x.com/evrtrabajo), [Antonio](https://x.com/Tito_Kati) y [Jesus](https://x.com/JesusValera96), que me ayudaron a crear este resumen de ideas haciendo brainstorming juntos.
