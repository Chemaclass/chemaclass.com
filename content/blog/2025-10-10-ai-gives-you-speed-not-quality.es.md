+++
title = "La IA te da velocidad, no calidad"
description = "La IA escribe código rápido pero no le importa la calidad. Aprende a hacer buenos prompts, nunca aceptes código que no entiendas, y recuerda: eres dueño de cada línea que commiteas. La velocidad sin dirección es solo caos."
draft = false
[taxonomies]
tags = [ "ai", "software-architecture", "craftsmanship", "leadership" ]
[extra]
subtitle = "El factor humano en la era del vibe-coding"
static_thumbnail = "/images/blog/2025-12-02/cover.jpg"
+++

Llevo tiempo usando asistentes de codificación con IA: ChatGPT, Codex, Claude con Sonnet y Opus. Son muy útiles. Te dan una velocidad que no consigues de otra forma.

Pero la velocidad no es calidad.

<!-- more -->

## La trampa del vibe-coding

Los modelos de IA son excelentes imitando su entorno. Dales contexto y harán lo necesario para completar la tarea. A esto lo llaman _"vibe-coding"_: describes lo que quieres y la IA produce algo que funciona. Rápido.

¿El problema? La IA genera código desordenado sin pestañear si eso cumple la tarea. No le importa la mantenibilidad. No piensa en qué pasa cuando cambien los requisitos el mes que viene. Solo produce output.

> La IA es un espejo que refleja el contexto que le das. Si tu codebase está desordenado, generará más desorden. Si tus prompts son vagos, hará suposiciones.

Sin guía cuidadosa, acabas con parches sobre parches. Código legacy recién creado. Una codebase donde cada cambio se siente arriesgado y el equipo pasa más tiempo luchando contra el código que construyendo funcionalidades.

## El arte de preguntar

¿Recuerdas Stack Overflow? ¿Las búsquedas en Google que te llevaban a hilos de foros de 2011 donde alguien tenía exactamente el mismo problema?

Hace diez años, ser desarrollador significaba aprender a hacer buenas preguntas. Elaborabas tu post de Stack Overflow con cuidado: describe el problema, muestra lo que intentaste, explica lo que esperabas versus lo que pasó. Si tu pregunta era vaga o perezosa, la comunidad te lo hacía saber. A veces con dureza.

Pero esa fricción nos enseñó algo valioso: **la calidad de la respuesta depende de la calidad de la pregunta**.

Lo mismo pasa con la IA. Un prompt vago da una respuesta vaga. Un prompt bien estructurado con contexto claro, restricciones y ejemplos da algo útil. Saber formular buenas preguntas no quedó obsoleto. Se volvió más importante.

> Aprender a hacer buenos prompts es el equivalente moderno de aprender a buscar en Google y preguntar en Stack Overflow. Quien lo domine, obtendrá mejores resultados.

Aunque la IA te dé una respuesta rápida e impresionante, **nunca aceptes código que no entiendas del todo**. Es tentador. La respuesta aparece en segundos, parece profesional, puede que hasta funcione. Pero si no puedes explicar qué hace y por qué, estás plantando una bomba de tiempo en tu codebase. Y cuando explote a las 2am, estarás debuggeando código que no escribiste, sin modelo mental de por qué existe.

Cuestiona el output. Pregunta: _"¿Puedes simplificar esto?"_ o _"¿Hay boilerplate aquí que podamos eliminar?"_ La IA tiende a añadir, no a mejorar. Generará abstracciones, funciones helper y patrones que no pediste. No refactorizará a menos que se lo digas. Empuja de vuelta.

Con los tests es crítico. Pide a la IA que genere tests y muchas veces obtendrás tests que reflejan detalles de implementación, no comportamiento. Se romperán en cuanto refactorices, aunque la lógica siga igual. Si quieres tests que verifiquen comportamiento, tienes que pedirlo explícitamente. La IA no hará esa elección por ti.

> No te dejes seducir por la velocidad. A veces, una respuesta rápida que no entiendes es peor que una respuesta lenta que sí entiendes.

## El factor humano

La IA escribe código rápido, pero no entiende la arquitectura general. No sabe por qué se tomaron ciertas decisiones hace meses. No ve hacia dónde va el producto. Solo ve lo que le muestras, toma decisiones locales sin entender las implicaciones globales. Ese es nuestro trabajo.

Como exploré en [diferentes creencias sobre la calidad del software](/es/blog/different-beliefs-about-software-quality), los equipos suelen tener estándares distintos sobre qué significa _"suficientemente bueno"_. Al añadir IA a la ecuación, mantener ese entendimiento compartido se vuelve aún más crítico. La IA no comparte los valores de tu equipo. Solo genera código.

> La disciplina para mantener arquitectura limpia, para decir _"no"_ a hacks rápidos, para refactorizar antes de que las cosas empeoren. Eso es únicamente humano.

Libros como [Código limpio](/es/readings/clean-code/) y [Arquitectura limpia](/es/readings/clean-architecture/) no son menos relevantes en la era de la IA. Son más relevantes. Te ayudan a detectar cuándo la IA va en la dirección equivocada.

## Colaboración sobre automatización

Hay algo más que la IA no puede reemplazar: el equipo.

Una conversación con un colega sobre _"¿deberíamos extraer esto en un servicio?"_ a menudo lleva a conclusiones que ningún prompt de IA descubriría. Ese ida y vuelta, el empujar de vuelta, el _"¿y si probamos esto otro?"_. Ahí es donde ocurre el entendimiento real.

[Extreme Programming Explained](/es/readings/extreme-programming-explained/) enfatiza prácticas como pair programming y propiedad colectiva del código por buenas razones. No son ineficiencias a automatizar. Son la forma en que los equipos construyen calidad en su proceso.

Cuando te saltas la discusión humana y solo dejas que la IA genere soluciones, pierdes la oportunidad de aprender, de cuestionar suposiciones y de crecer como equipo.

## Tú eres dueño del código

Cuando la IA escribe código y tú lo commiteas, revisas, apruebas, mergeas y deployeas, **es tu código**. No puedes culpar a la IA cuando algo se rompe en producción. No puedes señalar a Claude o Copilot cuando la arquitectura se vuelve imposible de mantener.

Como escribí sobre [el arte del testing](/es/blog/the-art-of-testing/), la calidad es una elección que hacemos en cada paso. Cada commit es una decisión. Cada revisión es una oportunidad de detectar problemas. Cada merge es un respaldo de la calidad del código.

> Somos la última parte responsable del código que la IA escribe. El commit, la revisión, la aprobación, el merge, el deploy. Todo eso somos nosotros.

Moverse rápido en la dirección equivocada solo te lleva a perderte antes. Ver líneas de código aparecer en pantalla no es progreso. El valor que aportamos como desarrolladores no es velocidad de tipeo. Nuestro valor está en entender hacia dónde vamos, mantener disciplina sobre el caos y asegurar que el código de hoy no se convierta en la pesadilla de mañana.

Usa la IA. Aprovecha la velocidad. Pero nunca olvides: **tú conduces**. Si sueltas el volante, acabarás con una pila de código imposible de mantener antes de lo que crees.

Y cuando eso pase, no hay nadie más a quien culpar.

![cover](/images/blog/2025-12-02/footer.jpg)

---

**Posts relacionados**

- [Diferentes creencias sobre la calidad del software](/es/blog/different-beliefs-about-software-quality) <small>Reflexiones sobre la calidad del software en tu equipo</small>
- [El arte del testing](/es/blog/the-art-of-testing/) <small>Donde el diseño se encuentra con la calidad</small>
- [Pair programming efectivo](/es/blog/effective-pair-programming/) <small>Abrazando prácticas de calidad en tu cultura de ingeniería</small>

**Lecturas relacionadas**

- [Clean Code](/es/readings/clean-code/) <small>Manual de artesanía ágil de software</small>
- [Clean Architecture](/es/readings/clean-architecture/) <small>Guía del artesano para estructura y diseño de software</small>
- [Object Design Style Guide](/es/readings/object-design-style-guide/) <small>Técnicas poderosas para crear código flexible y mantenible</small>
- [Advanced Web Application Architecture](/es/readings/advance-web-application-architecture/) <small>Domain-Driven Design en PHP</small>
- [Extreme Programming Explained](/es/readings/extreme-programming-explained/) <small>Abraza el cambio</small>
- [Domain-Driven Design Distilled](/es/readings/domain-driven-design-distilled/) <small>Patrones estratégicos y tácticos para dominios complejos</small>
