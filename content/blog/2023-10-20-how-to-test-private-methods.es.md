+++
title = "¿Cómo testear métodos privados?"
description = "De vez en cuando he tenido que enfrentar esta pregunta: ¿cómo testear métodos privados? He recopilado en un artículo las técnicas que suelo usar."
draft = false
[taxonomies]
tags = ["testing", "tdd", "software-design", "clean-code"]
[extra]
subtitle = "Testeando métodos privados. ¿Cuándo y cómo?"
static_thumbnail = "/images/blog/2023-10-20/cover.jpg"
+++

![blog-cover](/images/blog/2023-10-20/cover.jpg)

Esta pregunta me la han hecho muchas veces a lo largo de los años. Aquí recopilo mis ideas al respecto.

<!-- more -->

## Respuesta corta

Nunca.

## Respuesta larga

Nunca jamás.

---

## ¿Y si...?

Si realmente quieres testear un método privado, considera extraer esa lógica del método privado en una clase separada, y escribe un test unitario para el comportamiento de esa clase.

**Posts relacionados**

- [Test-Driven (Development)](/es/blog/test-driven-development/) <small>¿Qué tiene de desafiante?</small>
- [Diferentes creencias sobre la calidad del software](/es/blog/different-beliefs-about-software-quality/) <small>Algunas reflexiones sobre la calidad del software</small>
- [El arte del testing: donde el diseño se encuentra con la calidad](/es/blog/the-art-of-testing/) <small>Desde el punto de vista de un desarrollador de software</small>
- [El camino a la seniority en software](/es/blog/the-path-to-seniority-in-software/) <small>¿Cómo convertirse en un Desarrollador de Software Senior?</small>

> Para este, me inspiré en el [post original](https://franiglesias.github.io/test-private-methods/) de Fran Iglesias.
