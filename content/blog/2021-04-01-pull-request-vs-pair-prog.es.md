+++
title = "Pull Requests vs Pair Programming"
description = "Hablemos de los beneficios de los Pull Requests y el Pair Programming, y mis reflexiones sobre estos después de algunos años de experiencia con ellos."
[taxonomies]
tags = [ "pair-programming", "code-review", "agile", "communication" ]
[extra]
subtitle = "¿Por qué elegir cuando puedes tener ambos?"
static_thumbnail = "/images/blog/2021-04-01/cover.jpg"
+++

![blog-cover](/images/blog/2021-04-01/cover.jpg)

Hablemos de los beneficios de los Pull Requests y el Pair Programming, y mis reflexiones sobre estos después de algunos años de experiencia con ellos.

<!-- more -->

## Pull Requests

Un Pull Request (PR) es básicamente una forma de mostrar tus cambios de código sugeridos de manera que sean fácilmente comparables con el código fuente existente. Esto es parte de un flujo de trabajo que ayuda a los desarrolladores a compartir conocimiento sobre los cambios que se están haciendo dentro del sistema.

> Un Pull Request es el momento donde pides a tus compañeros que revisen y examinen tus cambios de código.

Normalmente, también se usa:
1. Para discusiones sobre estilo de código.
2. Para detectar bugs potenciales.
3. Para discusiones de arquitectura o diseño una vez que la solución está hecha.

### Los Pull Requests no son la mejor herramienta para todo

El principal problema con estos temas de arriba es que los PR's normalmente están listos cuando la funcionalidad/bug ya se ha trabajado y está en la última etapa de su proceso de desarrollo.
Es [un PR] una "propuesta de cambio ya hecha [ya he trabajado en este cambio, aquí está el código] para fusionar en el sistema actual [alguien por favor revísalo]".

El concepto de "Draft PR" existe para hacer explícito que un PR no está listo para fusionar, así que sigue siendo una "cosa en progreso", pero ese es otro tema.

Los Pull Requests son, de hecho, una de las mejores herramientas que tenemos en nuestra industria para compartir conocimiento sobre los cambios que estamos haciendo en el sistema, pero a veces pueden ser mal utilizados, como por ejemplo:

1. **Discusiones sobre estilo de código**. El estilo de código no debería discutirse en un PR. Ya debería haber un CI ejecutando un comprobador de estilo de código, eso es todo. Si quieres hablar sobre estilo de código, solicita un cambio en tu comprobador de estilo de código, pero no en un PR aleatorio.
2. **Detectar bugs**. Los bugs y el comportamiento deseado deberían estar cubiertos por tests automatizados. El desarrollador es la primera persona responsable de este tema.
3. **Discusiones de arquitectura o diseño**. Una vez que una solución particular está desarrollada y lista para revisión, normalmente es muy difícil "deshacer" esa idea y reescribirla de nuevo. Porque "¿por qué harías eso? ¿Por alguna opinión subjetiva? Ya está hecho. Y parece funcionar bien."

Tener una persona extra mirando los cambios que hemos hecho para "decisiones de diseño" puede ser beneficioso, pero podríamos haber abordado "posibles desacuerdos" en una etapa más temprana.

### ¿Cuál debería ser el propósito de un Pull Request?

1. Compartir conocimiento sobre los cambios propuestos con el equipo.
2. Asegurar que el equipo se alinea y está de acuerdo a través de los múltiples cambios que se envían cada día para mantener una dirección saludable para el proyecto. Sí, esto puede incluir verificar el resultado del diseño, pero... ¿Y si ahora es demasiado tarde? ¿Cómo podríamos resolver todos esos problemas?

## Pair Programming

El concepto de "Pair Programming" puede entenderse desde diferentes puntos de vista. Pair thinking y pair programming, conceptos de roles conductor-navegador, o puro live coding por un lado. En realidad, esto es mucho más fácil de lo que parece a primera instancia:
- O miras y ayudas a la otra persona a escribir código,
- O escribes mientras tienes otro par de ojos mirando y ayudándote.

> El Pair Programming ayuda al equipo a trabajar juntos.

El pair programming es la alegría de trabajar con un cerebro extra y otro par de ojos, donde la clave es **construir un contexto** donde los dos **compartan el mismo objetivo** para encontrar la **mejor solución posible**. Todo esto mientras aprenden el uno del otro cada segundo.
El Pair Programming no se trata de desarrollar la mejor solución desde el principio. Se trata de hacerlo funcionar, compartir ideas y encontrar una mejor solución juntos. Después de eso, puedes refactorizar y limpiar el código.

### El Pair Programming es una revisión de código continua

Los Pull Requests son una forma asíncrona de compartir cambios de código, mientras que el Pair Programming es totalmente **síncrono** porque sucede al mismo tiempo.

Dicho esto, los Pull Requests y el Pair Programming no son mutuamente excluyentes, pueden coexistir. Son herramientas, y deberíamos elegirlas sabiamente para lograr nuestros objetivos.

El miedo más común que vi al animar a hacer Pair Programming es que algunas personas son tímidas y no les gusta tener otros ojos a su alrededor mientras programan debido a:
- Miedo a no saber qué programar o por dónde empezar.
- Miedo a que otros se rían de sus soluciones.
- Miedo a no tener éxito en público.
- Miedo a no poder desarrollar la solución esperada por múltiples razones: malentender la tarea o falta de conocimiento.
- Miedo a cambiar de opinión frente a otros.
- Miedo a discutir y tomar decisiones en voz alta.
- Miedo a estar en desacuerdo con otros.

## Después de varios años de experiencia en este tema

El patrón que rechaza el Pair Programming es básicamente "miedo", y estar fuera de tu zona de confort. Y esto se debe a la incomprensión de las raíces del concepto real del Pair Programming.

El Pair Programming no es "presumir delante de tus colegas" o "ser juzgado por tus compañeros", sino ser transparente (mostrando tus habilidades tal como realmente son) y mejorar como equipo levantándose mutuamente.

Programar es un proceso iterativo que necesita un refactoring continuo de nuestra forma de pensar para lograr mejores soluciones, día a día. Por lo tanto, programar con otra persona a tu lado (con una forma diferente de pensar) ayudará al equipo a sacar lo mejor de cada uno mientras descarta el desperdicio o los malos hábitos si es necesario.

El Pair Programming no necesita estar siempre configurado para todo. Como herramienta, es flexible, y podemos elegir cómo, cuándo y por qué razón.

Una regla personal, antes de empezar tareas que podrían involucrar tocar múltiples módulos o reglas de negocio complejas, piensa en un Pair Thinking/Programming rápido con otro colega más experimentado en ese campo.

> Todo depende de un contexto y personas particulares: los desarrolladores, las parejas, las tareas, el estado de ánimo.

### ¿Todavía incómodo con el Pair Programming?

Si todavía te sientes incómodo teniendo a otra persona a tu lado mientras escribes código, podría ser porque no estás particularmente contento con tu propio código, o el proceso que sigues para lograr algún resultado. Mi forma favorita de trabajar en esto es ejercitando por mi cuenta y trabajando en mejorar mis habilidades como desarrollador de software.
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

---

**Posts relacionados**

- [¿Qué mata la agilidad?](/es/blog/what-kills-agility/) <small>¿Por qué Agile si ya haces Scrum, Kanban, SAFe, o Waterfall?</small>
- [¿Ignorar Scrum para ser más ágil?](/es/blog/ignoring-scrum-to-get-more-agile/) <small>Matando la agilidad con reuniones excesivas</small>
- [Actualiza tu equipo para ser más extremo](/es/blog/update-your-team-to-be-more-extreme/) <small>¿Cómo puedes ayudar a tus compañeros a abrazar el cambio?</small>
- [Pair programming efectivo](/es/blog/effective-pair-programming/) <small>Abrazando prácticas de calidad en tu cultura de ingeniería</small>
- [Test-Driven (Development)](/es/blog/test-driven-development/) <small>¿Qué tiene de desafiante?</small>

**Lecturas relacionadas**

- [Extreme Programming Explained](/es/readings/xp-embrace-change/) <small>de Kent Beck</small>
- [Clean Agile](/es/readings/clean-agile/) <small>de Robert C. Martin</small>
- [Peopleware](/es/readings/peopleware) <small>de Tom DeMarco, Timothy Lister</small>
