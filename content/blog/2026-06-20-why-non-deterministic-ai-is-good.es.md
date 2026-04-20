+++
title = "Por qué que la IA no sea determinista es bueno"
description = "Mismo prompt, respuesta distinta. Esa impredecibilidad es lo que hace útil a la IA generativa."
draft = true
[taxonomies]
tags = [ "ai", "engineering", "mindset" ]
[extra]
subtitle = "La aleatoriedad es el precio de la creatividad"
static_thumbnail = "/images/blog/placeholder.jpg"
series = "ai"
series_order = 7
related_posts = [
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
  "blog/2026-03-01-idealism-vs-pragmatism.md",
]
+++

Lancé el mismo prompt dos veces y obtuve dos respuestas distintas. Mi primer instinto fue pensar que estaba roto. Me llevó un rato darme cuenta de lo contrario: esa diferencia es donde vive casi todo el valor.

<!-- more -->

> El no-determinismo es el precio de la creatividad, y vale la pena pagarlo.

## El instinto de esperar determinismo

Como programadores nos enseñan a confiar en la repetibilidad. Misma entrada, misma salida. Los tests inestables fallan. Los builds no reproducibles fallan. Así que cuando un LLM devuelve una frase distinta en la segunda llamada, el reflejo es decir que está roto.

No lo está. Es la forma de la herramienta.

> Si querías una tabla de lookup, la habrías escrito.

## La creatividad exige una tirada de dados

Un modelo que siempre elige el token más probable produce texto plano y repetitivo. El muestreo introduce aleatoriedad, y esa aleatoriedad es lo que le permite explorar completados plausibles. Baja la temperatura a cero y cambias rango por fiabilidad.

Pregúntate: ¿quieres una herramienta que siempre te dé la misma respuesta, o una que pueda sorprenderte de forma útil?

## No-determinismo como búsqueda

Cuando lanzo el mismo prompt tres veces, obtengo tres ángulos del problema. Tres formas de estructurar una función. Tres tonos. Tres encuadres. Eso no es ruido. Es exploración paralela barata.

Un modelo determinista me da una opción. Uno no-determinista me da una distribución de la que elegir.

> Mi flujo pasó de "pregunta y acepta" a "muestrea y elige."

## Dónde duele y qué hacer

El no-determinismo rompe tareas con una única respuesta correcta: matemáticas, extracción, formato estricto, llamadas a herramientas. La solución no es pelear contra él, sino acotarlo.

- Temperatura baja.
- Salidas estructuradas y schemas.
- Reintentos con validación.
- Evals en lugar de asserts.

Saber qué partes del pipeline necesitan control y cuáles se benefician de la varianza.

## El contexto es cómo guías los dados

Si la salida es una distribución, mi trabajo es darle forma. No puedo elegir la semilla, pero sí el setup. En el agentic coding, el resultado depende menos del modelo y más de lo que el modelo ve: `CLAUDE.md`, convenciones del proyecto, skills, slash commands, plantillas, ejemplos, herramientas conectadas, barandillas en `settings.json`.

Setup flojo, distribución ancha y ruidosa. Setup cuidado, distribución estrecha centrada en lo que significa "bueno" en este repo. La misma aleatoriedad, mejores muestras.

> No elimino el no-determinismo. Hago que cada tirada caiga dentro de la diana.

Por eso sigo invirtiendo en la carpeta `.claude/`, en guías de estilo, en ficheros de memoria, en skills bien acotadas. Los retornos son compuestos.

## Dejar de tratar la IA como una función

Una función da una salida por entrada. Un colaborador me da un borrador distinto cada mañana. Un LLM es lo segundo. Juzgarlo con las reglas de lo primero es cómo los equipos acaban bloqueados en la "reproducibilidad," persiguiendo seeds que nunca van a necesitar.

Abraza la varianza donde ayuda. Acótala donde estorba. Ese es el juego entero.
