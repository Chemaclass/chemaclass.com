+++
title = "Trabajar con la Puerta del Garaje Abierta"
description = "Trabajar en abierto deja que la gente ayude mientras el trabajo aún se puede moldear. Pero una puerta abierta es pasiva. El verdadero skill es empujar la señal correcta a la sala correcta."
draft = false
[taxonomies]
tags = [ "communication", "leadership", "career", "mentoring" ]
[extra]
subtitle = "La visibilidad es pasiva, la señal no"
static_thumbnail = "/images/blog/2026-07-14/cover.webp"
series = "leadership"
series_order = 8
related_posts = [
  "blog/2026-04-17-inside-the-claude-folder.md",
  "blog/2025-04-12-ship-show-ask.md",
  "blog/2024-03-28-effective-pair-programming.md",
]
related_readings = [
  "readings/2022-09-30-dare-to-lead.md",
  "readings/2024-04-17-radical-candor.md",
]
+++

La mayoría trabaja con la puerta del garaje cerrada. Bajan la puerta, trabajan en privado y solo la levantan cuando el coche está pulido y aparcado. Los vecinos ven algo terminado. Nunca ven el trabajo.

La frase viene del escritor Robin Sloan. El investigador [Andy Matuschak](https://notes.andymatuschak.org/Work_with_the_garage_door_up) la convirtió en una forma de trabajar: notas e ideas a medio hacer visibles para cualquiera que pase por delante.

Abre la puerta.

<!-- more -->

Trabajar con la puerta del garaje abierta significa mostrar el trabajo cuando todavía está en marcha. El borrador con los nombres de variables feos. El plan del que no estás seguro. El experimento que llevas a medias. No la demo. El proceso.

## Por qué la mantenemos cerrada

Miedo, sobre todo. Una puerta cerrada te protege. Nadie juzga un desorden que no puede ver.

Así que escondemos los borradores. Ensayamos qué decir antes de la reunión. Solo subimos código cuando está lo bastante limpio como para sobrevivir a la revisión. Para cuando alguien ve el trabajo, cada decisión interesante ya se ha tomado en privado.

Ese instinto parece seguro. Te cuesta justo los momentos en los que la ayuda todavía era posible.

> Un resultado terminado solo se puede admirar. Un trabajo en marcha se puede moldear.

## Lo que te da la puerta abierta

Cuando la gente ve el proceso, puede cambiarlo. Un compañero detecta el enfoque sin salida antes de que le dediques otro día. Un junior hace la pregunta "tonta" que resulta ser el problema de verdad. El [pair programming](/es/blog/effective-pair-programming/) es esto en estado puro: la puerta abierta en tiempo real.

La puerta abierta también mata el mito de que los seniors no sufren. Cuando un junior te ve atascarte, renombrar las cosas tres veces y buscar en Google un error que "deberías" saber, aprende cómo es el trabajo real. No los mejores momentos.

Yo viví esto con [bashunit](/es/blog/bashunit/), una librería de testing para bash. La publiqué imperfecta. El feedback llegó con los primeros usuarios: bugs reportados, peticiones de features, pull requests. Dejé que ese interés decidiera qué construir después. La librería que existe hoy la moldeó todo el que miró dentro del garaje. Igual con [Phel](/es/blog/phel-first-release/), y con [mi carpeta `.claude` pública](/es/blog/inside-the-claude-folder/). [El espíritu del open source](/es/blog/open-source-software/).

## Pero una puerta abierta no basta

Aquí está la trampa. Dejas la puerta subida, creas una PR, escribes tus notas en un documento compartido y esperas a que llegue la ayuda.

No llega. Nadie se pasea por tu garaje.

La visibilidad es pasiva. "Público por defecto" es el suelo, no la meta. Que el trabajo se pueda encontrar no es lo mismo que se vea.

> Dejar la puerta abierta no es lo mismo que invitar a alguien a entrar.

El skill no es la apertura. Es empujar la señal correcta a la gente correcta, a propósito.

## Empuja la señal a la sala correcta

Cada canal viene con una expectativa de quién lo lee. Ajustar tu update a esa expectativa es todo el juego. Publica en la sala equivocada y serás ruido o invisible.

- **Toda la empresa lo lee.** `#general`. Publica solo lo que le importa a todo el mundo.
- **El equipo técnico lo lee.** `#engineering`. Aquí es donde va un update de trabajo en marcha.
- **Quien tiene interés se apunta.** `#insights`: novedades del sector, señales de clientes. Útil, pero nadie tiene que leerlo.
- **Nadie tiene que leerlo.** `#random`. Di lo que quieras.

Mismo update, cuatro resultados muy distintos según dónde caiga. Aprende el mapa antes de emitir.

## Cómo es una buena señal

Un buen update no es _"eh, he subido algo"_. Lleva suficiente contexto para que quien lo lee pueda engancharse sin hacerte ni una sola pregunta.

Digamos que voy por la mitad de un piloto: una nueva forma de trocear y [revisar pull requests](/es/blog/pull-request-vs-pair-prog/), probada primero en un equipo. No espero al final. Un update corto va a `#engineering` (o al canal de tu equipo, si hay varios equipos técnicos): dónde estoy atascado, más una petición explícita. _"¿Alguien ha probado esto con un monorepo?"_ recibe respuestas.

Cuando el piloto termina, el resultado va a la misma sala:

- **Qué probé** y por qué importaba.
- **Qué funcionó**, con un antes y un después concretos.
- **Qué no**, con honestidad. La parte que falló es la más útil.
- **Qué harías tú** para probarlo por tu cuenta.

Ambas son señales, no estados. Convierten el experimento de un equipo en algo que toda la organización puede copiar o tumbar. Esto es [Ship, Show, Ask](/es/blog/ship-show-ask/) aplicado más allá del pull request: ajusta la visibilidad a la audiencia.

## Empieza poco a poco

Elige una cosa esta semana. Un experimento, un borrador, un momento de atasco. Haz dos cosas con ello: deja la puerta abierta y luego sal y dile a la sala correcta que está ahí.

Recibirás ayuda que no esperabas. Enseñarás a alguien sin pretenderlo. Y el miedo que mantenía la puerta bajada se verá mucho más pequeño desde el otro lado.

El resultado pulido impresiona a la gente. La señal empujada es lo que de verdad mejora el trabajo.

Abre la puerta. Y luego señálala.

{% kudos() %}
Gracias a mi compañero Aike, que inspiró este post en una de nuestras conversaciones sobre hacer visible el trabajo.
{% end %}

![blog-footer](/images/blog/2026-07-14/footer.webp)
