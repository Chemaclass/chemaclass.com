+++
title = "Idealismo vs Pragmatismo"
description = "La tensión entre hacer las cosas bien y sacar las cosas adelante marca cada decisión en el software y en la vida. TDD, pair programming, adopción de IA: los mejores resultados vienen de sostener ambos extremos de la cuerda."
draft = true
[taxonomies]
tags = [ "ai", "software", "craftsmanship", "leadership" ]
[extra]
subtitle = "Sosteniendo ambos extremos de la cuerda"
static_thumbnail = "/images/blog/2026-02-21/cover.jpg"
related_posts = [
  "blog/2021-08-01-test-driven-development.md",
  "blog/2024-03-28-effective-pair-programming.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2020-08-16-advance-web-application-architecture.md",
  "readings/2018-06-04-clean-architecture.md",
  "readings/2016-05-01-clean-code.md",
]
+++

Crees en la arquitectura limpia, los tests exhaustivos, los procesos disciplinados. También subiste un fix feo a las 11 de la noche el mes pasado porque el sistema estaba caído y los usuarios esperaban.

Ambas cosas eres tú. La tensión entre ellas no es una contradicción. Es cómo se hace este trabajo en realidad.

<!-- more -->

## Dos fuerzas, una decisión

El **idealismo** es la brújula. Código limpio, comportamiento testeado, entendimiento compartido, diseño con principios. Sin él, te desvías. Cada atajo se acumula, cada hack engendra otro hack, y al final mantienes un sistema que nadie quiere tocar. La mala calidad del software costó a las empresas estadounidenses [$2.41 billones en 2022](https://www.it-cisq.org/the-cost-of-poor-quality-software-in-the-us-a-2022-report/), con la deuda técnica como factor principal. Así se ve "ya lo arreglaremos después" a escala.

El **pragmatismo** es el motor. Deadlines, información incompleta, recursos limitados, requisitos cambiantes. Sin él, nunca entregas. Pasas semanas perfeccionando una abstracción que el negocio abandonó hace dos sprints.

> El objetivo no es elegir un bando. Es saber cuándo debe liderar cada uno.

El idealismo sin pragmatismo produce código bonito que nadie usa. El pragmatismo sin idealismo produce un producto que funciona hoy y se desmorona mañana.

## TDD: el beneficio y el coste

Creo en el [desarrollo guiado por tests](/blog/test-driven-development/). Red, green, refactor. El ritmo te obliga a pensar antes de programar, a especificar lo que quieres antes de construirlo. Produce mejores diseños, ciclos de feedback más cortos y código que puedes refactorizar con confianza.

Ese es el ideal. Y no es solo una sensación. Un [estudio en cuatro equipos de Microsoft e IBM](https://www.microsoft.com/en-us/research/wp-content/uploads/2009/10/Realizing-Quality-Improvement-Through-Test-Driven-Development-Results-and-Experiences-of-Four-Industrial-Teams-nagappan_tdd.pdf) encontró que TDD redujo la densidad de defectos entre un 40% y un 90%, con un incremento del 15-35% en tiempo de desarrollo. Ambos lados de la tensión, medidos.

{% deep_dive(title="Más sobre el estudio") %}

El [estudio](https://www.microsoft.com/en-us/research/wp-content/uploads/2009/10/Realizing-Quality-Improvement-Through-Test-Driven-Development-Results-and-Experiences-of-Four-Industrial-Teams-nagappan_tdd.pdf) cubrió cuatro equipos: tres en Microsoft (Windows, MSN, Visual Studio) y uno en IBM trabajando en drivers de dispositivo. Cada equipo TDD fue comparado con un equipo similar en el mismo producto, usando los mismos lenguajes y herramientas, bajo el mismo manager senior. La única diferencia era TDD.

El equipo de IBM vio una reducción del 40% en densidad de defectos. Los equipos de Microsoft oscilaron entre el 60% y el 90%. Como señaló Nagappan, "en un ciclo de desarrollo de 12 meses, un 35 por ciento son otros cuatro meses, lo cual es enorme." Todos los managers lo consideraron rentable porque la reducción en costes de mantenimiento post-lanzamiento compensaba de sobra.

Nadie fue forzado a usar TDD. Los equipos lo adoptaron voluntariamente, lo cual probablemente importa: las personas que eligen una práctica tienden a aplicarla mejor que quienes reciben la orden.

{% end %}

TDD es una disciplina, y la disciplina cuesta algo. Cuando estás explorando un dominio nuevo y aún no sabes cuáles son las abstracciones correctas, escribir tests primero puede parecer como dibujar un mapa sin haber visto el territorio. A veces necesitas escribir código desechable, probar una solución, tantear el espacio del problema. El descubrimiento no siempre sigue un ritmo red-green-refactor.

{% deep_dive(title="Cuando test-first se encuentra con lo desconocido") %}

Hay una diferencia entre _"sé lo que esto debe hacer y lo especificaré primero"_ y _"aún no estoy seguro de lo que debe hacer."_ TDD brilla en el primer escenario. En el segundo, un enfoque test-last (o incluso sin tests durante la exploración) puede ser más honesto.

La clave es lo que pasa después del descubrimiento. Una vez que entiendes el problema, vuelve y escribe los tests. Codifica lo que aprendiste. El desvío pragmático no significa abandonar el ideal; significa llegar a él por otro camino.

Como comenté en [TDD vs BDD](/blog/tdd-vs-bdd/), el poder de TDD es su ciclo de feedback. Pero un ciclo de feedback requiere saber qué feedback estás buscando. Cuando aún lo estás averiguando, forzar el ciclo puede frenarte más de lo que ayuda.

{% end %}

El error no es elegir test-first o test-last. El error es convertirlo en una decisión religiosa en lugar de contextual. El idealista dice _"siempre tests primero."_ El pragmático dice _"testea cuando tenga sentido."_ Yo digo: tests primero cuando puedo, tests después cuando debo, pero siempre tests.

> TDD es una brújula, no una jaula. Síguelo cuando puedas ver el camino. Cuando no, encuentra el camino primero y márcalo después.

## Pair programming: el ideal y el overhead

El [pair programming efectivo](/blog/effective-pair-programming/) es una de las mejores prácticas que un equipo puede adoptar. Dos personas, un problema, revisión de código continua. El conocimiento se propaga, el diseño mejora, los puntos ciegos se reducen.

Ese es el ideal. Y en muchos contextos, es la decisión correcta.

Pero el pairing tiene un coste. Exige tiempo sincrónico, foco compartido y niveles de energía compatibles. En un equipo distribuido con distintas zonas horarias, encontrar ventanas de solapamiento ya es difícil. Llenarlas con sesiones de pairing deja poco espacio para trabajo individual profundo. Algunos problemas se benefician de una persona profundizando tres horas, no de dos a medio gas durante seis.

{% deep_dive(title="Patrones de pairing y sus trade-offs") %}

Existen múltiples patrones de pairing: Driver-Navigator, Ping-Pong, Tourist Guide. Cada uno encaja en contextos diferentes.

Los anti-patrones también importan. El Socio Silencioso que deja que el otro haga todo el trabajo. El Dictador que no suelta el teclado. El Par Filosófico que pasa toda la sesión debatiendo convenciones de nombres en lugar de escribir código.

El pairing funciona mejor cuando ambas personas están involucradas, el problema se beneficia de dos perspectivas y la sesión tiene un alcance claro. Cuando falta alguna de esas condiciones, el pairing se convierte en un ritual en lugar de una práctica. Y los rituales sin propósito son solo overhead.

Las [pull requests y el pair programming](/blog/pull-request-vs-pair-prog/) no son excluyentes. Sirven necesidades diferentes. A veces la revisión asíncrona es suficiente. A veces necesitas el ida y vuelta en tiempo real. La elección pragmática depende del problema, las personas y el momento.

{% end %}

> El objetivo del pairing no es hacer pairing. Es construir entendimiento compartido y detectar errores pronto. Si otro enfoque lo consigue en tu contexto, úsalo.

![blog-middle](/images/blog/2026-02-21/middle.jpg)

## IA: de escéptico a líder de escuadrón

Hace un año, era escéptico con los asistentes de código con IA. Mi preocupación: una IA que no entiende la arquitectura, no le importa la mantenibilidad y prioriza velocidad por encima de calidad producirá código que impresiona pero se deteriora rápido. Escribí sobre esto en [La IA te da velocidad, no calidad](/blog/ai-gives-you-speed-not-quality/), y mantengo el mensaje central.

Mi preocupación no cambió. Lo que cambió es cómo los uso, y de lo que son capaces ahora.

### La resistencia

Las reacciones de otros ingenieros me sorprenden más que la tecnología. Miedo, escepticismo, rechazo total. Lo entiendo. Yo estuve ahí. Algo en lo que invertiste años de repente lo hace una máquina, al menos en parte. Se siente personal. Pero aferrarse a cómo eran las cosas no protege el oficio. Solo retrasa tu propio crecimiento.

### Un equipo, no un asistente

La mayoría de los ingenieros tratan a los agentes de IA como autocompletado con esteroides. Un asistente, un chat, un flujo de código generado. Yo empecé a tratarlos como un equipo. No un asistente parlanchín. Un escuadrón real. Uno piensa arquitectura. Otro escribe el primer borrador. Otro revisa y detecta bugs. Otro escribe tests. Cuando [colaboran](/blog/build-your-own-team-of-agents/), el resultado no es solo más rápido. Es estructuralmente mejor.

La velocidad es la parte fácil, y todo el mundo está obsesionado con ella. La IA puede escupir toneladas de código en segundos. Sigue sin importarle la legibilidad, los casos borde o cómo se verá el código en seis meses. Tú sigues siendo quien tiene que apropiárselo, entenderlo y sentirse bien al subirlo a producción.

Antes pensaba que la IA no podía escribir código limpio. Luego lo probé en mis términos: [contexto adecuado](/blog/mcp-giving-your-ai-agent-the-right-context/), reglas, convenciones, roles especializados, puertas de calidad. Con la configuración correcta, la IA puede escribir código realmente bueno. A veces necesita varias iteraciones, pero nosotros también.

La diferencia es que la IA llega más rápido y no se cansa entre iteraciones. Con buen contexto y restricciones claras, los resultados han sido mejores de lo que esperaba. A menudo mejores que lo que yo produciría solo bajo presión de tiempo.

Pero nada de esto funciona si no sabes cómo es una buena arquitectura. Tienes que haber leído los libros, experimentado, fallado, aprendido. Necesitas entender qué significan las decisiones de diseño de alto y bajo nivel para tu proyecto. La IA amplifica lo que tú aportas. Si traes fundamentos sólidos, obtienes resultados sólidos. Si no, obtienes basura con aspecto convincente que ni siquiera reconocerás como basura.

Seguimos siendo los responsables de mantener el sistema en buen estado. La IA nos ayuda a llegar. Pero solo si ponemos de nuestra parte.

### Donde el idealismo se encuentra con la IA

La IA me hizo más idealista, no menos. Las prácticas que describí antes, TDD y pair programming, solían competir con los deadlines. Ahora ya no tienen por qué.

Me gusta practicar TDD, pero recientemente experimenté con un agente dedicado para ayudarme con tests, y es sorprendentemente bueno. Un [coach de TDD](/blog/build-your-own-team-of-agents/) que guía el ciclo red-green-refactor. Un explorer que lee el código antes de que yo lo toque. Un revisor de código limpio, un arquitecto de dominio, un revisor de React, un mantenedor de documentación. Cada uno especializado, cada uno apoyando mi forma de pensar y mi ritmo. Si se añade lógica nueva sin cobertura, el agente de TDD lo detecta. 100% de cobertura de código solía ser el tipo de objetivo que pondrías en una retro y abandonarías silenciosamente para el tercer sprint. Con un agente dedicado aplicándolo, es simplemente cómo funciona el proyecto.

Sigo practicando pair programming con personas reales para temas complejos. El ida y vuelta humano tiene una profundidad que la IA no alcanza, especialmente cuando navegas trade-offs que requieren experiencia y juicio. Pero en el día a día, siempre tengo un agente pair buddy conmigo. Le lanzo ideas, cuestiono un enfoque, discuto casos borde, exploro un diseño antes de comprometerme con él. Apoya mis pensamientos, acelera el progreso y mantiene el listón de calidad donde yo lo quiero.

El pragmático en mí solía abandonar TDD cuando los deadlines apretaban. El pragmático en mí con la configuración de IA adecuada lo mantiene funcionando.

{% deep_dive(title="Mi setup") %}

Uso Claude para todo. Claude Code con Opus o Sonnet como programador agéntico: flujos de desarrollo completos, lectura del código, seguimiento de convenciones, ejecución de tests, creación de PRs. Claude app y Claude como coworker para la parte conversacional: brainstorming, discusiones de arquitectura, explicar código, redactar documentación. Para asistencia inline, los plugins que ya tengo en mi IDE son suficientes. Probé Copilot y Cursor, no son para mí. Claude cubre lo que necesito.

Diferentes modos para diferentes tareas. Un asistente agéntico siguiendo mis comandos de TDD es un flujo diferente a chatear sobre patrones de diseño. Ambos son útiles. Ninguno reemplaza al otro.

El mercado ahora mismo es intenso. Claude, Codex, Gemini y otros son jugadores fuertes con productos similares, y todos mejoran mes a mes. Los resultados son impresionantes y solo se aceleran. Esa es la belleza de la competencia: obliga a todos a mejorar o volverse irrelevantes, y el consumidor gana de cualquier forma. A día de hoy, Claude Code parece la opción más fuerte para cómo trabajo. Pero no tengo lealtad a una marca. Si Anthropic dejara de avanzar y un competidor fuera claramente mejor, cambiaría sin dudar. Lo que importa es la capacidad, no el logo.

{% end %}

> Me equivoqué con la IA de la forma en que los idealistas se equivocan a menudo: medí la herramienta contra el resultado ideal y la encontré insuficiente, en lugar de medirla contra la alternativa realista.

La alternativa al desarrollo asistido por IA no es un equipo de arquitectos senior escribiendo código perfecto. Es el mismo equipo escribiendo el mismo código imperfecto, solo que más lento.

Los ingenieros que aprendan a liderar agentes en lugar de competir contra ellos tendrán una ventaja real. Y esto todavía es el principio.

> La pregunta nunca fue _"¿puede la IA escribir código perfecto?"_ Fue _"¿puedo liderar a la IA para escribir mejor código, más rápido?"_ Y la respuesta, con la configuración adecuada, es sí.

## El juego completo

Cada práctica en este post sigue el mismo patrón. La versión ideal existe en los libros. La versión pragmática existe en tu código bajo presión. Necesitas ambas.

> La próxima vez que estés subiendo ese fix a las 11 de la noche, sabrás qué atajos tomaste y por qué. Ese es el juego completo. No la perfección. No la velocidad. Saber cuál debe liderar.

![blog-footer](/images/blog/2026-02-21/footer.jpg)
