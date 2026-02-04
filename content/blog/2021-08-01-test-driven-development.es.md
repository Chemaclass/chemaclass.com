+++
title = "Test-Driven (Development)"
description = "La complejidad aquí no está en escribir tests en sí, sino en los hábitos que tenemos que cambiar para crear software que sea fácil de testear."
draft = false
[taxonomies]
tags = [ "tdd", "testing", "software-design", "refactoring" ]
[extra]
subtitle = "¿Qué tiene de desafiante?"
static_thumbnail = "/images/blog/2021-08-01/cover.jpg"
+++

![blog-cover](/images/blog/2021-08-01/cover.jpg)

La complejidad aquí no está en escribir tests en sí, sino en los hábitos que tenemos que cambiar para crear software que sea fácil de testear.

<!-- more -->

## La raíz del problema

Sin experiencia sólida en testing, los desarrolladores lo pasan mal al intentar aplicar tests en su trabajo diario. No es solo por la complejidad del tema, sino **porque están acostumbrados a escribir código difícil de testear.**

Escribir tests para software que ya funciona (sobre todo cuando se hizo sin pensar en testing) se siente aburrido y casi inútil. Viene acompañado de falta de motivación, culpando al sujeto equivocado: "los tests me hacen ir más lento".

> En un contexto de dominio, si una pieza de lógica de software es difícil de testear, el problema no es el test, sino el código que no estaba bien escrito.

Ya hay cientos de tutoriales, libros y documentación sobre testing. Aquí comparto mi experiencia y cómo aplico esta filosofía en mi trabajo diario.

### Test-Driven se basa en esta simple regla

- En lugar de: diseñar código -> desarrollar código -> escribir tests.

![non-tdd-style](/images/blog/2021-08-01/non-tdd-style.png)

- Se trata de: escribir test automatizado que falla -> ejecutar test que falla -> desarrollar código para hacer pasar el test -> ejecutar test -> repetir.

![tdd-style](/images/blog/2021-08-01/tdd-style.png)

La idea de guiar tu código con tests depende del nivel de abstracción de lo que estés escribiendo. No quieres acoplar mal los tests con el código testeado. Quieres testear el comportamiento de tu lógica.

TDD se basa en un bucle de pequeños pasos que te ayuda a encontrar **patrones** y guiar tu diseño de software con **refactorizaciones constantes**. Es la mejor opción si quieres asegurar el comportamiento esperado de todos los caminos posibles de tu lógica.

Lo bonito es que no necesitas conocer el algoritmo completo desde el principio. Vas **descubriendo** cómo debería ser tu lógica expresando la implementación deseada, paso a paso, en tests automatizados.

Escribir tests al mismo tiempo que escribes el código te **obliga a escribir mejor software**. Porque quieres que sea fácil de testear, y eso lleva a mayor calidad.

> Ya escribí otro post sobre la relación entre **calidad y testing** del software: [El Arte del Testing: donde el diseño se encuentra con la calidad](/es/blog/the-art-of-testing/).

## Mejora tus habilidades de Test-Driven

![tdd-style](/images/blog/2021-08-01/tdd-style-with-git.png)

La mejor manera de aprender Test-Driven es haciendo katas de software. Pruébalas solo y con otros. Ambas son igualmente importantes.

- Solo: para desafiar tu yo interior sin ninguna distracción excepto tú mismo.
- Con otros: el pair-programming es esencial en nuestro trabajo. Las katas son las mejores herramientas para entrenar nuestras habilidades de comunicación y aprender juntos unos de otros.

### ¿Qué es una Code Kata?

Los desarrolladores no practicamos lo suficiente. La mayor parte de nuestro aprendizaje ocurre en el trabajo, y ahí es donde cometemos la mayoría de nuestros errores.

Otras profesiones creativas sí practican: los músicos tocan piezas técnicas, los poetas reescriben obras constantemente. En karate, un estudiante dedica la mayor parte del tiempo a aprender y perfeccionar movimientos básicos. Esas son las katas.

### ¿Cuál es el objetivo de una kata? ¿Qué deberíamos tener al final?

Las katas existen para que los desarrolladores obtengamos los mismos beneficios que practicar en otras profesiones. Son ejercicios simples y artificiales que permiten experimentar y aprender sin la presión de producción.

> No hay respuestas correctas o incorrectas en ninguna kata de software: el beneficio viene del proceso, no del resultado.

### Consejos

- Cuando resuelvas una kata, vuelve a intentarla en unas semanas o meses.
- Explora nuevas soluciones. Sé creativo y no te apresures.
- En grupo, no es una competición para ver quién logra más.
- El foco debe estar en el proceso, nunca en el resultado.
- El verdadero valor de cualquier kata son los aprendizajes que obtendréis después de hablar y compartir experiencias.

Puedes encontrar muchas katas en Internet. Por ejemplo:

- [http://codekata.com](http://codekata.com)
- [https://codingdojo.org/kata](https://codingdojo.org/kata)
- [https://katalyst.codurance.com/browse](https://katalyst.codurance.com/browse)
- [https://github.com/gamontal/awesome-katas](https://github.com/gamontal/awesome-katas)

---

### TDD es más un flujo de trabajo que un diseño

> "TDD es una herramienta de diseño." Eso es lo que Sandro dijo durante años. Pero ya no. Tras trabajar con diferentes equipos y organizaciones, y observar cómo trabaja él mismo, Sandro cambió de opinión sobre el rol de TDD en el diseño de software.

{{ youtube(id="KyFVA4Spcgg") }}

TDD en pocas palabras; se trata del ritmo.

1) Especifica lo que quieres.
2) Hazlo funcionar.
3) Hazlo mejor.

---

## Kent Beck

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">1. Change the code as usual<br>2. Write a test that only passes after the change<br>3. Revert to before 1<br>4. Type the test again (copy/paste is cheating &amp; invalidates the warranty of the exercise)<br>5. Make it compile by changing the code<br>6. See it fail<br>7. Change the code to make it pass</p>&mdash; Kent Beck 🌻 (@KentBeck) <a href="https://twitter.com/KentBeck/status/1421257650113634304?ref_src=twsrc%5Etfw">July 30, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

---

Imágenes originales de [Emmanuel Valverde Ramos](https://x.com/evrtrabajo).
