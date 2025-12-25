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

Sin experiencia (sólida) en testing, los desarrolladores pueden tenerlo difícil al intentar aplicar testing en general como parte de su trabajo diario. No es simplemente por la complejidad del tema, sino **porque están acostumbrados a escribir código que es difícil de testear.**

Escribir tests para software que ya funciona (principalmente cuando se hizo sin considerar el testing en absoluto) se traduce como algo aburrido, casi inútil, normalmente acompañado de falta de motivación, culpando al sujeto equivocado en este contexto: "los tests en sí están reduciendo mi velocidad".

> En un contexto de dominio, si una pieza de lógica de software es difícil de testear, el problema no es el test, sino el código que no estaba bien escrito.

Ya hay cientos de tutoriales, libros y documentación sobre testing, pero puedo compartir mi experiencia y cómo aplico esta gran (y obligatoria) filosofía en mi trabajo diario.

### Test-Driven se basa en esta simple regla

- En lugar de: diseñar código -> desarrollar código -> escribir tests.

![non-tdd-style](/images/blog/2021-08-01/non-tdd-style.png)

- Se trata de: escribir test automatizado que falla -> ejecutar test que falla -> desarrollar código para hacer pasar el test -> ejecutar test -> repetir.

![tdd-style](/images/blog/2021-08-01/tdd-style.png)

La idea de guiar tu código por testing puede entenderse dependiendo del nivel de abstracción de lo que estás escribiendo en el momento. No quieres crear un acoplamiento incorrecto entre los tests y el código testeado. Quieres testear el comportamiento de tu lógica.

TDD se basa en un bucle de pequeños pasos que te ayuda a encontrar **patrones** y guiar tu diseño de software cada pequeña iteración con **refactorizaciones constantes**. Es la mejor opción si quieres asegurar el comportamiento esperado de todos los caminos posibles de tu lógica.

La belleza de esto es que no necesitas conocer el algoritmo completo desde el principio. En cambio, estás **descubriendo** cómo debería ser tu lógica expresando la implementación deseada, paso a paso, en tests automatizados.

Considerar escribir tests para tu software al mismo tiempo que lo escribes, te **obligará irremediablemente a escribir mejor software**. Porque quieres escribir software que sea fácil de testear, y por lo tanto acabará con mayor calidad.

> Ya escribí otro post sobre la relación entre **calidad y testing** del software: [El Arte del Testing: donde el diseño se encuentra con la calidad](/es/blog/the-art-of-testing/).

## Mejora tus habilidades de Test-Driven

![tdd-style](/images/blog/2021-08-01/tdd-style-with-git.png)

La mejor manera de aprender Test-Driven es haciendo katas de software. Pruébalas solo y con otros. Ambas son igualmente importantes.

- Solo: para desafiar tu yo interior sin ninguna distracción excepto tú mismo.
- Con otros: el pair-programming es esencial en nuestro trabajo. Las katas son las mejores herramientas para entrenar nuestras habilidades de comunicación y aprender juntos unos de otros.

### ¿Qué es una Code Kata?

Los desarrolladores de software no practican lo suficiente. La mayor parte de nuestro aprendizaje tiene lugar en el trabajo, lo que significa que la mayoría de nuestros errores también se cometen allí.

Otras profesiones creativas practican: los músicos tocan piezas técnicas, los poetas constantemente reescriben obras. En karate, la mayor parte del tiempo de un estudiante se dedica a aprender y perfeccionar movimientos básicos. Estas son las katas.

### ¿Cuál es el objetivo de una kata? ¿Qué deberíamos tener al final?

Las katas existen para ayudar a los desarrolladores a obtener los mismos beneficios que practicar en cualquier otra profesión. Son ejercicios simples y artificiales que te permiten experimentar y aprender sin la presión de un entorno de producción.

> No hay respuestas correctas o incorrectas en ninguna kata de software: el beneficio viene del proceso, no del resultado.

### Consejos

- Una vez que has resuelto una kata, inténtala de nuevo en unas semanas o meses.
- Intenta explorar nuevas soluciones. Sé creativo en el proceso y no te apresures.
- Cuando las hagas en grupos, no son una competición para ver quién logrará más del ejercicio.
- El enfoque debería estar en el proceso, nunca en el resultado.
- El verdadero resultado valioso de cualquier kata son los aprendizajes que tú (y tu equipo) obtendréis después de hablar sobre ello y compartir vuestras experiencias.

Puedes encontrar muchas katas en Internet. Por ejemplo:

- [http://codekata.com](http://codekata.com)
- [https://codingdojo.org/kata](https://codingdojo.org/kata)
- [https://katalyst.codurance.com/browse](https://katalyst.codurance.com/browse)
- [https://github.com/gamontal/awesome-katas](https://github.com/gamontal/awesome-katas)

---

### TDD es más un flujo de trabajo que un diseño

> "TDD es una herramienta de diseño." Eso es lo que Sandro ha dicho durante años. Pero ya no. Después de trabajar con diferentes equipos y en diferentes organizaciones, y también inspeccionando cuidadosamente cómo trabaja, Sandro cambió de opinión sobre el rol de TDD en el diseño de software.

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
