+++
title = "La IA te Da Velocidad, No Calidad"
description = "La IA acelera tu producción pero no garantiza calidad. Eres responsable de cada línea que commiteas. Velocidad sin dirección es caos."
draft = false
[taxonomies]
tags = [ "ai", "architecture", "craftsmanship", "leadership" ]
[extra]
tldr = "La IA multiplica tu producción, no tu criterio. Sigues siendo dueño de cada línea que commiteas, así que velocidad sin dirección solo te lleva antes al sitio equivocado."
subtitle = "El factor humano en la era del vibe-coding"
static_thumbnail = "/images/blog/2025-10-10/cover.webp"
series = "ai"
series_order = 1
related_posts = [
  "blog/2020-04-07-the-art-of-testing.md",
  "blog/2022-10-08-different-beliefs-about-software-quality.md",
  "blog/2024-03-28-effective-pair-programming.md",
]
related_readings = [
  "readings/2016-05-01-clean-code.md",
  "readings/2018-06-04-clean-architecture.md",
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2020-08-16-advance-web-application-architecture.md",
  "readings/2020-09-10-domain-driven-design-distilled.md",
  "readings/2020-10-10-object-design-style-guide.md",
]
faq = [
  { q = "¿La IA te hace más rápido programando?", a = "Sí, y la velocidad no es calidad. La IA generará código sucio sin pestañear si es lo que completa la tarea: no le importa la mantenibilidad ni lo que pase cuando los requisitos cambien el mes que viene." },
  { q = "¿Deberías aceptar código de la IA que no entiendes?", a = "No. Una respuesta rápida que no sabes explicar es peor que una lenta que sí. Cuando se rompa a las 2am estarás depurando código que no escribiste, sin ningún modelo mental de por qué existe." },
  { q = "¿Cómo se consiguen mejores respuestas de un asistente de IA?", a = "Igual que se conseguían mejores respuestas en Stack Overflow: preguntando mejor. Da contexto, restricciones y ejemplos, y luego cuestiona lo que vuelve. Pídele que simplifique, porque por defecto añade en vez de mejorar." },
  { q = "¿Qué no puede hacer la IA con tu código?", a = "No ve la arquitectura, no sabe por qué se tomó una decisión hace meses ni hacia dónde va el producto. Toma decisiones locales con el contexto que le das. Sostener la forma del sistema es trabajo humano." },
  { q = "¿De quién es el código que genera la IA?", a = "Tuyo. En cuanto lo revisas, lo apruebas, lo mergeas y lo despliegas, es tu código, y ningún asistente va a responder por él cuando se rompa en producción." },
]
+++

He estado usando asistentes de codificación IA extensivamente: ChatGPT, Codex, Claude con Sonnet y Opus. Son increíblemente útiles. Te dan velocidad como nada más.

Pero la velocidad no es calidad.

<!-- more -->

## La trampa del vibe-coding

Los modelos de IA son excelentes imitando su entorno. Dales contexto, y harán lo que sea necesario para completar la tarea. Esto se ha conocido como _"vibe-coding"_: describes lo que quieres, y la IA produce algo que funciona. Rápido.

¿El problema? La IA felizmente generará código desordenado si eso es lo que hace el trabajo. No le importa la mantenibilidad. No piensa en qué pasa cuando los requisitos cambien el próximo mes. Solo produce output.

> La IA es un espejo que refleja el contexto que le das. Si tu codebase está desordenado, generará más desorden. Si tus prompts son vagos, hará suposiciones.

Sin guía cuidadosa, terminas con parches sobre parches. Código legacy recién creado. Una codebase donde cada cambio se siente arriesgado y el equipo pasa más tiempo luchando contra el código que construyendo features.

## El arte de preguntar

¿Recuerdas Stack Overflow? ¿Las búsquedas en Google que te llevaban a hilos de foros de 2011 donde alguien tenía exactamente el mismo problema?

Hace diez años, ser desarrollador significaba aprender a hacer buenas preguntas. Elaborabas tu post de Stack Overflow cuidadosamente: describe el problema, muestra lo que intentaste, explica lo que esperabas versus lo que pasó. Si tu pregunta era vaga o perezosa, la comunidad te lo hacía saber. A veces duramente.

Pero esa fricción nos enseñó algo valioso: **la calidad de tu respuesta depende de la calidad de tu pregunta**.

El mismo principio aplica a la IA. Un prompt vago obtiene una respuesta vaga. Un prompt bien estructurado con contexto claro, restricciones y ejemplos obtiene algo útil. La habilidad de formular buenas preguntas no se volvió obsoleta. Se volvió más importante.

> Aprender a hacer prompts a la IA efectivamente es el equivalente moderno de aprender a buscar en Google y preguntar en Stack Overflow. Los desarrolladores que dominen esto obtendrán mejores resultados.

Incluso cuando la IA te da una respuesta rápida e impresionante, **nunca aceptes código que no entiendas completamente**. Es tentador. La respuesta aparece en segundos, se ve profesional, incluso podría funcionar. Pero si no puedes explicar qué hace y por qué, estás plantando una bomba de tiempo en tu codebase. Y cuando explote a las 2am, estarás debuggeando código que no escribiste sin modelo mental de por qué existe.

Cuestiona el resultado. Pregunta: _"¿Puedes simplificar esto?"_ o _"¿Hay código repetitivo aquí que podamos eliminar?"_ La IA por defecto añade, no mejora. Generará abstracciones, funciones auxiliares y patrones que no pediste. No refactorizará a menos que se lo digas. Cuestiónala.

Esto es especialmente crítico con los tests. Pide a la IA que genere tests y a menudo obtendrás tests que reflejan detalles de implementación en lugar de comportamiento. Se romperán en el momento que refactorices, incluso si la lógica permanece igual. Si quieres tests que verifiquen comportamiento, necesitas decirlo explícitamente. La IA no hará esa elección por ti.

> No te dejes seducir por la velocidad. A veces, una respuesta rápida que no entiendes es peor que una respuesta lenta que sí entiendes.

## El factor humano

La IA puede escribir código rápido, pero no puede entender la arquitectura general. No sabe por qué ciertas decisiones se tomaron hace meses. No puede ver el panorama general de hacia dónde va el producto. Solo ve lo que le muestras, tomando decisiones locales sin entender las implicaciones globales. Ese es nuestro trabajo.

Como exploré en [diferentes creencias sobre la calidad del software](/es/blog/different-beliefs-about-software-quality), los equipos a menudo tienen estándares variables sobre qué significa _"suficientemente bueno"_. Cuando añades IA a la mezcla, mantener ese entendimiento compartido se vuelve aún más crítico. La IA no comparte los valores de tu equipo. Solo genera código.

> La disciplina para mantener arquitectura limpia, para decir _"no"_ a hacks rápidos, para refactorizar antes de que las cosas empeoren. Eso es únicamente humano.

Libros como [Clean Code](/es/readings/clean-code/) y [Clean Architecture](/es/readings/clean-architecture/) no son menos relevantes en la era de la IA. Son más relevantes. Te ayudan a detectar cuando la IA va en la dirección equivocada.

## Colaboración sobre automatización

Hay algo más que la IA no puede reemplazar: el equipo.

Una conversación con un colega sobre _"¿deberíamos extraer esto en un servicio?"_ a menudo lleva a insights que ningún prompt de IA sacaría a la luz. Ese ida y vuelta, el cuestionar, el _"¿qué si intentamos esto en su lugar?"_. Ahí es donde ocurre el entendimiento real.

[Extreme Programming Explained](/es/readings/extreme-programming-explained/) enfatiza prácticas como pair programming y propiedad colectiva del código por buenas razones. Estas no son ineficiencias para automatizar. Son cómo los equipos construyen calidad en su proceso.

Cuando saltas la discusión humana y solo dejas que la IA genere soluciones, pierdes la oportunidad de aprender, de desafiar suposiciones y de crecer como equipo.

## Tú eres dueño del código

Cuando la IA escribe código y tú lo commiteas, lo revisas, lo apruebas, lo mergeas y lo deployeas, **es tu código**. No puedes culpar a la IA cuando algo se rompe en producción. No puedes señalar a Claude o Copilot cuando la arquitectura se vuelve imposible de mantener.

Como escribí sobre [el arte del testing](/es/blog/the-art-of-testing/), la calidad es una elección que hacemos en cada paso. Cada commit es una decisión. Cada revisión es una oportunidad de detectar problemas. Cada merge es un respaldo de la calidad del código.

> Somos la última parte responsable del código que la IA escribe. El commit, la revisión, la aprobación, el merge, el deploy. Todo eso somos nosotros.

Moverse rápido en la dirección equivocada solo te lleva a perderte más rápido. Las líneas de código apareciendo en pantalla no es progreso. El valor que aportamos como desarrolladores no es la velocidad tecleando. Nuestro valor está en entender hacia dónde vamos, mantener disciplina sobre el caos, y asegurar que el código que entregamos hoy no se convierta en la pesadilla de mañana.

Usa la IA. Abraza la velocidad. Pero nunca olvides: **tú eres quien conduce**. Si sueltas el volante, terminarás en una pila de código imposible de mantener más rápido de lo que esperabas.

Y cuando eso pase, no hay nadie más a quien culpar.

![tú eres quien conduce](/images/blog/2025-10-10/footer.webp)
