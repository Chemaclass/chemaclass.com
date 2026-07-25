+++
title = "Recorta la Factura de Tokens"
description = "Dos herramientas pequeñas que se suman: Caveman recorta lo que el agent te responde, RTK recorta lo que la terminal manda de vuelta. Más espacio en el mismo context window, mismo modelo, mismos prompts."
draft = false
[taxonomies]
tags = [ "ai", "productivity", "developer-tools", "agentic-coding" ]
[extra]
subtitle = "Dos fugas, dos parches"
static_thumbnail = "/images/blog/2026-06-26/cover.webp"
series = "ai"
series_order = 8
reading_time = 4
related_posts = [
  "blog/2026-05-19-skills-over-agents.md",
  "blog/2026-04-17-inside-the-claude-folder.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2016-10-01-the-pragmatic-programmer.md",
]
+++

Toda sesión agéntica quema tokens en dos direcciones a la vez. El agent te responde, y la terminal escupe su output. Las dos cosas pasan por el mismo context window, y las dos tienen fugas.

Estira la sesión lo suficiente y chocas con el muro. Las respuestas empeoran y la factura sube.

<!-- more -->

> Mismo modelo. Mismos prompts. Factura más ligera.

Abre cualquier transcripción de sesión y los bloques más grandes no son tus prompts:

- Respuestas del agent: cháchara, vacilaciones, repeticiones, "Sure! Happy to help...".
- Output de herramientas: logs de `npm install`, muros de texto de `git status`, volcados de `grep` con rutas completas.

Las dos herramientas de abajo atacan una de esas cosas cada una. Caveman se ocupa de lo que el agent responde. RTK se ocupa de lo que la shell manda de vuelta.

## Caveman recorta la salida

**[Caveman](https://github.com/JuliusBrussee/caveman)** es un Agent Skill. Ejecuta `/caveman full` una vez y el agent deja de rellenar sus respuestas: sin artículos, sin relleno, sin cháchara. Los fragmentos están bien, y los términos técnicos se mantienen exactos.

Instalación:

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
```

Lo que muere:

- Artículos: a, an, the.
- Rellenos: just, really, basically, actually, simply.
- Cháchara: sure, of course, happy to.
- Vacilaciones: might, perhaps, it depends.

Lo que sobrevive:

- Bloques de código, errores exactos, rutas de archivo, comandos.
- Avisos de seguridad y operaciones destructivas (el skill se aclara solo).

{% deep_dive(title="Antes y después") %}

Modo normal:

> Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by an off-by-one error in your token expiry check. The middleware compares the current time using `<` when it should really be using `<=`. Here's the fix:

Modo caveman:

> Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:

Mismo fix, y el bloque de código que viene después es idéntico. Lo único que encoge es la prosa de alrededor, hasta más o menos un cuarto.

{% end %}

Hay tres niveles: `lite`, `full` y `ultra`. Empieza en `full`, porque `ultra` se lee como un telegrama. Si una respuesta te queda demasiado seca, escribe `normal mode` y se relaja.

> El agent no pierde inteligencia cuando le quitas la cháchara.

## RTK recorta la entrada

**[RTK](https://github.com/rtk-ai/rtk)** (Rust Token Killer) envuelve los comandos que ejecuta tu agent. Un hook reescribe `git status` como `rtk git status` por detrás, así que no hay nada extra que teclear ni overhead que notar.

Instalación:

```bash
brew install rtk
rtk init -g    # instala el hook que reescribe los comandos
```

Si más tarde `rtk gain` da error, se ha colado otra herramienta con el mismo nombre; instala desde el [repo](https://github.com/rtk-ai/rtk).

La versión envuelta quita el ruido antes de que llegue al agent: códigos de color, separadores repetidos, banners de `npm install`, timestamps verbosos.

Aquí tienes el mismo `git status`, en crudo y luego envuelto:

```
$ rtk proxy git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	content/blog/new-draft.md

nothing added to commit but untracked files present (use "git add" to track)
```

```
$ rtk git status
* main...origin/main
? Untracked: 1 file
   content/blog/new-draft.md
```

La misma información en la mitad de líneas. En un repo con movimiento la diferencia solo crece, porque decenas de untracked files, pistas de rama y líneas de instrucciones colapsan en un solo bloque pequeño.

```bash
rtk gain              # ver cuántos tokens te ha ahorrado
rtk gain --history    # desglose por comando
rtk discover          # escanea tu historial de agente buscando ganancias
```

RTK reporta [60-90% menos tokens](https://github.com/rtk-ai/rtk) en los comandos de desarrollo habituales. Ejecuta `rtk gain` tras un uso real para ver tu propio número.

Nunca toca el payload, solo el ruido a su alrededor, así que los errores y los stack traces salen exactamente como son. Si algún filtro alguna vez se come algo que de verdad necesitas, sáltatelo en esa llamada con `rtk proxy <cmd>`.

> El output que tú no lees sigue siendo output que el modelo tiene que leer.

## Por qué la combinación suma

Por separado, cada herramienta ayuda un poco. Júntalas y el efecto se multiplica, porque atacan mitades distintas del mismo bucle. Un turno va así: tú escribes el prompt, el agent piensa, ejecuta un comando, la terminal responde, el agent lo lee y luego te contesta. RTK encoge la mitad de la terminal y Caveman encoge la respuesta, así que cada turno sale más barato y caben más en una misma ventana.

Aquí está la prueba real, en un plan de 100 $/mes. Antes de añadirlas llegaba al límite semanal continuamente, a veces con un solo proyecto. Ahora corro varios proyectos en paralelo y el límite casi no aparece. El plan no se hizo más grande; las sesiones se hicieron más pequeñas.

## Instálalas una vez y olvídate

Las dos instalaciones son globales, y las haces una sola vez. A partir de ahí sigues escribiendo `git status`, `grep` y `npm install` igual que siempre. El hook los reescribe por ti y Caveman se activa solo, así que no hay hábitos nuevos que aprender.

¿No sabes por dónde empezar? Elige la fuga que más te duela ahora mismo. Si el problema son las respuestas largas en cada arreglo, empieza por Caveman. Si son las inundaciones de output de `grep` y `npm install`, empieza por RTK. Añade la otra cuando te apetezca, que no se estorban entre sí.

> No mejoraste el modelo. Dejaste de malgastar su atención.

![blog-footer](/images/blog/2026-06-26/footer.webp)
