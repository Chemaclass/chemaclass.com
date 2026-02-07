+++
title = "Pull requests vs pair programming"
description = "Hablemos de los beneficios de los Pull Requests y el Pair Programming, y mis reflexiones sobre estos después de algunos años de experiencia con ellos."
[taxonomies]
tags = [ "pair-programming", "code-review", "agile", "communication" ]
[extra]
subtitle = "¿Por qué elegir cuando puedes tener ambos?"
static_thumbnail = "/images/blog/2021-04-01/cover.jpg"
related_posts = [
  "blog/2021-08-01-test-driven-development.md",
  "blog/2022-02-26-update-your-team-to-be-more-extreme.md",
  "blog/2022-12-06-ignoring-scrum-to-get-more-agile.md",
  "blog/2024-03-28-effective-pair-programming.md",
  "blog/2024-05-30-what-kills-agility.md",
]
related_readings = [
  "readings/2020-03-12-clean-agile.md",
  "readings/2021-05-28-peopleware.md",
  "readings/2020-03-05-extreme-programming-explained.md",
]
+++

![blog-cover](/images/blog/2021-04-01/cover.jpg)

Hablemos de los beneficios de los Pull Requests y el Pair Programming, y mis reflexiones sobre estos después de algunos años de experiencia con ellos.

<!-- more -->

## Pull Requests

Un Pull Request (PR) es una forma de mostrar tus cambios de código para que se comparen fácilmente con el código existente. Es parte de un flujo de trabajo que ayuda a compartir conocimiento sobre los cambios que se hacen en el sistema.

> Un Pull Request es el momento donde pides a tus compañeros que revisen y examinen tus cambios de código.

Normalmente, también se usa:
1. Para discusiones sobre estilo de código.
2. Para detectar bugs potenciales.
3. Para discusiones de arquitectura o diseño una vez que la solución está hecha.

### Los Pull Requests no son la mejor herramienta para todo

El problema es que los PRs suelen estar listos cuando la funcionalidad o bug ya está terminado, en la última etapa del desarrollo.
Un PR es una "propuesta de cambio ya hecha para fusionar en el sistema actual".

El concepto de "Draft PR" existe para indicar que el PR aún no está listo para fusionar, pero ese es otro tema.

Los Pull Requests son una de las mejores herramientas para compartir conocimiento sobre cambios en el sistema, pero a veces se usan mal:

1. **Discusiones sobre estilo de codigo**. El estilo no debería discutirse en un PR. Ya debería haber un CI ejecutando un linter. Si quieres cambiar algo, proponlo en el linter, no en un PR aleatorio.
2. **Detectar bugs**. Los bugs y comportamiento esperado deberían cubrirse con tests automatizados. El desarrollador es el primer responsable.
3. **Discusiones de arquitectura o diseno**. Cuando una solución está desarrollada y lista para revisión, es difícil "deshacerla" y reescribirla. "¿Por qué lo harías? Ya está hecho y funciona."

Tener a alguien extra revisando decisiones de diseño puede ayudar, pero podríamos haber resuelto posibles desacuerdos antes.

### ¿Cuál debería ser el propósito de un Pull Request?

1. Compartir conocimiento sobre los cambios propuestos con el equipo.
2. Asegurar que el equipo está alineado con los múltiples cambios que se envían cada día. Sí, puede incluir verificar el diseño, pero... ¿y si ya es demasiado tarde?

## Pair Programming

El "Pair Programming" puede entenderse de varias formas: pair thinking, roles conductor-navegador, live coding... En realidad es más sencillo de lo que parece:
- Miras y ayudas a la otra persona a escribir código, o
- Escribes mientras tienes otro par de ojos mirándote y ayudándote.

> El Pair Programming ayuda al equipo a trabajar juntos.

El pair programming es trabajar con un cerebro extra y otro par de ojos. La clave es **construir un contexto** donde ambos **compartan el mismo objetivo** para encontrar la **mejor solución posible**, aprendiendo el uno del otro.
No se trata de dar con la mejor solución desde el principio. Se trata de hacerlo funcionar, compartir ideas y mejorar juntos. Luego ya refactorizas y limpias el código.

### El Pair Programming es una revisión de código continua

Los Pull Requests son una forma asíncrona de compartir cambios de código, mientras que el Pair Programming es totalmente **síncrono** porque sucede al mismo tiempo.

Los Pull Requests y el Pair Programming no son excluyentes, pueden coexistir. Son herramientas, y hay que elegirlas con criterio según nuestros objetivos.

El miedo más común que he visto al animar a hacer Pair Programming es la timidez. A algunas personas no les gusta tener ojos encima mientras programan:
- Miedo a no saber qué programar o por dónde empezar.
- Miedo a que otros se rían de sus soluciones.
- Miedo a no tener éxito en público.
- Miedo a no poder desarrollar la solución esperada por múltiples razones: malentender la tarea o falta de conocimiento.
- Miedo a cambiar de opinión frente a otros.
- Miedo a discutir y tomar decisiones en voz alta.
- Miedo a estar en desacuerdo con otros.

## Después de varios años de experiencia en este tema

El patrón que rechaza el Pair Programming es básicamente el miedo a salir de tu zona de confort. Y viene de no entender qué es realmente el Pair Programming.

No se trata de presumir ni de ser juzgado, sino de ser transparente (mostrar tus habilidades tal como son) y mejorar como equipo.

Programar es un proceso iterativo que requiere refactorizar continuamente nuestra forma de pensar. Programar con otra persona (con otra forma de pensar) ayuda al equipo a sacar lo mejor de cada uno y a descartar malos hábitos.

El Pair Programming no tiene que usarse siempre ni para todo. Es una herramienta flexible: puedes elegir cómo, cuándo y por qué.

Una regla personal: antes de empezar tareas que tocan múltiples módulos o reglas de negocio complejas, haz un Pair Thinking rápido con un colega más experimentado en ese área.

> Todo depende de un contexto y personas particulares: los desarrolladores, las parejas, las tareas, el estado de ánimo.

### ¿Todavía incómodo con el Pair Programming?

Si aún te sientes incómodo con alguien a tu lado mientras programas, quizás no estés contento con tu propio código o con el proceso que sigues. Mi forma favorita de trabajar esto es practicar por mi cuenta y mejorar mis habilidades como desarrollador.
- Crea y juega con tus propios proyectos personales.
- Trabaja en katas de código por tu cuenta y con otros.

> La práctica hace al maestro.

## Resumen

- No me malinterpretes, los Pull Requests son geniales. Sigue haciéndolos.
- La colaboración en equipo es esencial. El Pair Programming apunta a esto.
- El Pair Programming anima al equipo a trabajar juntos proactivamente.
- No tengas miedo de programar mientras tienes ojos a tu alrededor. Haz preguntas cuando algo no esté claro. Pide ayuda cuando no sepas cómo resolver algo.

> Está totalmente bien no saber todo. Lo más importante es saber cómo trabajar juntos.

![blog-img](/images/blog/2021-04-01/footer.jpg)
