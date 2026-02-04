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

El pair programming no es solo para que los seniors ensenyen a los juniors. Funciona independientemente del nivel de experiencia de los miembros del equipo.

Se trata del **flujo de colaboracion**, de comunicarse bien, de no sentirse juzgado y de aceptar la vulnerabilidad con tus companeros, sabiendo que te apoyaran y ayudaran.

Se trata de desafiarse mutuamente, buscando la solucion mas pragmatica y simple. Siempre buscando **feedback rapido** al hablar entre vosotros, tanto sobre la solucion acordada como sobre su direccion.

Se trata del bucle de feedback corto e inmediato mientras hablas con tu companero, quien **revisa tu codigo sobre la marcha**. Puedes guiar como navegador o ayudar al conductor a validar sus ideas en un contexto mas amplio.

Se trata de **compartir conocimiento** por defecto, reduciendo bus-factors y areas de conocimiento aislado. Tener dos mentes en la misma tarea aumenta el enfoque.

Se trata de **cohesion de equipo** y del sentimiento de pertenencia. Al entender las fortalezas y debilidades de cada uno, vemos cuanto podemos ayudarnos a crecer.

![cover](/images/blog/2024-03-28/footer.jpg)

## ¿Cómo puedes practicar pair programming?

El pair programming puede hacerse de diferentes maneras:

- Puedes empezar y terminar una tarea en pareja. Limitalo a 30, 60, 90 minutos. En cualquier caso, haz pausas: usa Pomodoro.
- Puedes empezar la tarea juntos y parar cuando uno se sienta seguro para continuar solo.

> Depende del equipo --y la tarea en contexto-- decidir cuándo y cómo aplicar pairing para sacar lo mejor de ello.

No significa que debas trabajar siempre en pareja "pase lo que pase". No se trata de crear reglas, sino de adoptar esta practica hasta que te sientas seguro para elegir cuando y como usarla mejor.

El pair programming puede convertirse en una de las mejores herramientas de tu equipo para el dia a dia. No porque lo hayas leido en algun sitio, sino por los beneficios que tu y tu equipo descubrireis.

### Patrones Comunes

#### Diferentes estrategias para pairing efectivo

- **Driver-Navigator**: Una persona conduce el codigo (con el teclado), enfocada en los detalles. La otra navega (sin teclado), con una vision mas abstracta de la tarea.
- **Ping-Pong**: Cambio frecuente de roles driver-navigator en intervalos cortos: cada N minutos, cada N commits, etc.
- **Backseat driver**: El navegador se involucra activamente con el conductor.
- **Tourist guide**: El navegador aprende pasivamente con el conductor.

![cover](/images/blog/2024-03-28/good-pair-prog.jpg)

#### Anti-patrones mientras haces pairing

- **The silent partner**: El navegador no participa, está en silencio.
- **The solo act**: El conductor ignora todas las aportaciones del navegador.
- **Distracted pair**: La pareja no se enfoca en el problema a resolver.
- **The Dictator**: Una persona está diciendo qué hacer, ignorando las aportaciones del otro.
- **Philosophical pair**: La pareja hace [bikeshedding](/es/blog/bikeshedding/) sobre temas irrelevantes.
- **The code war**: La pareja no llega a un acuerdo y entra en una guerra innecesaria que desperdicia tiempo y esfuerzo.

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
