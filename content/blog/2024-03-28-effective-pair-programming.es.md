+++
title = "Pair programming efectivo"
description = "Primero establezcamos qué es el pair programming: Dos personas trabajando juntas en el mismo problema al mismo tiempo. No se trata de que una persona muestre sus habilidades frente a otra, ni de que una persona tenga miedo de cometer errores debido al síndrome del impostor."
draft = false
[taxonomies]
tags = ["pair-programming", "xp", "tdd", "communication", "clean-code"]
[extra]
subtitle = "Abrazando prácticas de calidad en tu cultura de ingeniería"
static_thumbnail = "/images/blog/2024-03-28/cover.jpg"
pin = false
+++

![blog-cover](/images/blog/2024-03-28/cover.jpg)

¿Qué es el pair programming? Primero establezcamos qué es: Dos personas trabajando juntas en el mismo problema al mismo tiempo.

<!-- more -->

No se trata de que una persona muestre sus habilidades frente a otra, ni de que una persona tenga miedo de cometer errores debido al síndrome del impostor.

Cada persona tendrá un rol:
- Navegador: prestará atención al panorama general; ej: arquitectura, relación entre colaboradores, diseño de objetos, etc.
- Conductor: prestará atención a los pequeños detalles; ej: naming, convenciones de código, sintaxis de escritura, diseño de objetos, etc.

> La pareja podría --y debería-- intercambiar roles ocasionalmente; ej: cada X commits pusheados, cada 10 min,... depende de ellos.

El pair programming no debería considerarse una práctica solo para "seniors" hacia juniors, sino independientemente del nivel de experiencia de los miembros del equipo.

Se trata del **flujo de colaboración**, la comunicación de calidad, la ausencia de sentirse juzgado y la idea de dar la bienvenida a la vulnerabilidad con tus compañeros, sabiendo que te apoyarán y ayudarán.

Se trata de desafiarse constantemente mutuamente, buscando la solución más pragmática mientras se mantiene simple. Siempre buscando **feedback rápido** al hablar entre ustedes, pero también sobre la solución que acordaron implementar y su dirección.

Se trata del bucle de feedback corto, rápido e inmediato mientras hablas con tu compañero, quien **revisa tu código sobre la marcha**. Puedes guiar como navegador o ayudar al conductor a validar sus ideas en un panorama más amplio.

Se trata de la atmósfera constante de **compartir conocimiento** por defecto, reduciendo bus-factors y áreas de conocimiento aislado al máximo. Aumentando el enfoque al tener dos mentes trabajando en la misma tarea simultáneamente.

Se trata de **cohesión de equipo** y afilar el sentimiento de que pertenecemos. Cuando entendemos las fortalezas y debilidades de cada uno, nos daremos cuenta de cuánto podemos ayudarnos a crecer mutuamente.

![cover](/images/blog/2024-03-28/footer.jpg)

## ¿Cómo puedes practicar pair programming?

El pair programming puede hacerse de diferentes maneras:

- Puedes empezar y terminar una tarea con pairing. Puedes limitarlo a 30, 60, 90 minutos. De cualquier manera, se recomienda tener pausas en el medio - Pomodoro.
- Puedes empezar la tarea juntos y parar cuando uno de tus compañeros se sienta lo suficientemente confiado para continuar solo.

> Depende del equipo --y la tarea en contexto-- decidir cuándo y cómo aplicar pairing para sacar lo mejor de ello.

Esto no significa que debas trabajar constantemente "sin importar qué" en pareja. No se trata de crear reglas; por el contrario, se trata de abrazar esta práctica hasta el punto de que te sientas confiado para elegir cuándo y cómo usarla para sacar lo mejor de ella.

El pair programming podría convertirse en una de las mejores herramientas en la caja de herramientas de tu equipo para las interacciones diarias. No porque lo hayas leído en algún lugar, sino por los beneficios que tú y tu equipo encontrarán.

### Patrones Comunes

#### Diferentes estrategias para pairing efectivo

- **Driver-Navigator**: Una persona está conduciendo el código (con el teclado), enfocándose en el aspecto de detalle de la tarea en sí. La otra es navegadora (sin teclado), teniendo una imagen más abstracta de la tarea en mente.
- **Ping-Pong**: Cambio frecuente de roles driver-navigator en pequeñas interacciones, ej: cada N minutos, cada N commits, etc.
- **Backseat driver**: El navegador se involucra activamente con el conductor.
- **Tourist guide**: El navegador aprende pasivamente con el conductor.

![cover](/images/blog/2024-03-28/good-pair-prog.jpg)

#### Anti-patrones mientras haces pairing

- **The silent partner**: El navegador no participa, está en silencio.
- **The solo act**: El conductor ignora todas las aportaciones del navegador.
- **Distracted pair**: La pareja no se enfoca en el problema a resolver.
- **The Dictator**: Una persona está diciendo qué hacer, ignorando las aportaciones del otro.
- **Philosophical pair**: La pareja está haciendo [bikeshedding](/es/blog/bikeshedding/) en temas irrelevantes.
- **The code war**: La pareja no llega a un acuerdo y comienza una guerra innecesaria, que desperdicia tiempo y esfuerzo.

![cover](/images/blog/2024-03-28/anti-pair-prog.jpg)

**¿Quieres más?** Mira esto: [Learning Through KATAS](https://www.figma.com/file/FCmGwRPIO8cLowDRraJhgr/Learning-TDD)

![cover](/images/blog/2024-03-28/learning-through-katas.jpg)

> Gracias a mi amigo [Manu](https://x.com/evrtrabajo), quien me ayudó con este post. Incluso compartimos un [taller](https://phpconference.com/agile-culture/practical-tdd-workshop/) sobre este tema.

---

**Posts relacionados**

- [Test-Driven (Development)](/es/blog/test-driven-development/) <small>¿Qué tiene de desafiante?</small>
- [El camino a la seniority en software](/es/blog/the-path-to-seniority-in-software/) <small>¿Cómo convertirse en un Desarrollador de Software Senior?</small>
- [Entendiendo a las personas](/es/blog/understanding-people) <small>Malentendidos, comunicación efectiva y autorreflexión</small>

**Lecturas relacionadas**

- [The Clean Coder](/es/readings/the-clean-coder/) <small>por Robert C. Martin</small>
- [Extreme Programming Explained](/es/readings/xp-embrace-change/) <small>por Kent Beck</small>
- [Object Design Style Guide](/es/readings/object-design-style-guide) <small>por Matthias Noback</small>
- [Advanced Web Application Architecture](/es/readings/advance-web-application-architecture/) <small>por Matthias Noback</small>
