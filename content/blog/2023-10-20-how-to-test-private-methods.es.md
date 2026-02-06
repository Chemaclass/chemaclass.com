+++
title = "¿Cómo testear métodos privados?"
description = "De vez en cuando he tenido que enfrentar esta pregunta: ¿cómo testear métodos privados? He recopilado en un artículo las técnicas que suelo usar."
draft = false
[taxonomies]
tags = ["testing", "tdd", "software-design", "clean-code"]
[extra]
subtitle = "Testeando métodos privados. ¿Cuándo y cómo?"
static_thumbnail = "/images/blog/2023-10-20/cover.jpg"
related_posts = [
  "blog/2020-04-07-the-art-of-testing.md",
  "blog/2021-08-01-test-driven-development.md",
  "blog/2022-06-08-the-path-to-seniority-in-software.md",
  "blog/2022-10-08-different-beliefs-about-software-quality.md",
]
related_readings = [
  "readings/2016-05-01-clean-code.md",
  "readings/2022-07-11-clean-craftsmanship.md",
]
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
> Para este, me inspiré en el [post original](https://franiglesias.github.io/test-private-methods/) de Fran Iglesias.
