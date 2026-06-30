+++
title = "Recorta la Factura de Tokens"
description = "Dos herramientas pequeñas que se suman: Caveman recorta lo que el agent te responde, RTK recorta lo que la terminal manda de vuelta. Mismo context window, el doble de espacio."
draft = false
[taxonomies]
tags = [ "ai", "productivity", "developer-tools", "agentic-coding" ]
[extra]
subtitle = "Dos fugas, dos parches"
static_thumbnail = "/images/blog/2026-06-26/cover.webp"
series = "ai"
series_order = 8
related_posts = [
  "blog/2026-05-19-skills-over-agents.md",
  "blog/2026-04-17-inside-the-claude-folder.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2016-10-01-the-pragmatic-programmer.md",
]
+++

Toda sesión agéntica quema tokens en dos direcciones. El agent te responde. La terminal escupe output. Mismo context window, fugas por los dos lados.

Estíralo lo suficiente y chocas con el muro: la calidad cae, los costes suben.

<!-- more -->

> Mismo modelo. Mismos prompts. Factura más ligera.

Los bloques más grandes en cualquier transcripción de sesión no son tus prompts:

- Respuestas del agent: cháchara, vacilaciones, repeticiones, "Sure! Happy to help...".
- Output de herramientas: logs de `npm install`, muros de texto de `git status`, volcados de `grep` con rutas completas.

Dos herramientas, una fuga cada una. Una recorta lo que el agent dice. La otra recorta lo que vuelve desde la shell.

## Caveman recorta la salida

**[Caveman](https://github.com/JuliusBrussee/caveman)** es un Agent Skill. Un comando, `/caveman full`, y el agent deja caer artículos, rellenos y cháchara. Los fragmentos son bienvenidos. Los términos técnicos se mantienen exactos.

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

Mismo fix. Mismo bloque de código a continuación. Un cuarto de prosa.

{% end %}

Niveles: `lite`, `full`, `ultra`. Empieza en `full`; ultra se lee como un telegrama. Si una respuesta queda demasiado seca, escribe `normal mode`.

> El agent no pierde inteligencia cuando le quitas la cháchara.

## RTK recorta la entrada

**[RTK](https://github.com/rtk-ai/rtk)** (Rust Token Killer) envuelve los comandos que ejecuta tu agent. Un hook reescribe `git status` a `rtk git status`. Transparente. Cero overhead.

Instalación:

```bash
brew install rtk
rtk init -g    # instala el hook que reescribe los comandos
```

Si más tarde `rtk gain` da error, se ha colado otra herramienta con el mismo nombre; instala desde el [repo](https://github.com/rtk-ai/rtk).

La versión envuelta quita el ruido antes de llegar al agent: códigos de color, separadores repetidos, banners de `npm install`, timestamps verbosos.

El mismo `git status`, en crudo vs envuelto:

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

Misma información. La mitad de líneas. En un repo con movimiento la diferencia escala: decenas de untracked files, pistas de rama, líneas de instrucciones, todo colapsa en un bloque.

```bash
rtk gain              # ver cuántos tokens te ha ahorrado
rtk gain --history    # desglose por comando
rtk discover          # escanea tu historial de agente buscando ganancias
```

RTK reporta [60-90% menos tokens](https://github.com/rtk-ai/rtk) en los comandos de desarrollo habituales. Ejecuta `rtk gain` tras un uso real para ver tu propio ahorro.

Nunca toca el payload, solo el ruido a su alrededor. Los errores y stack traces se mantienen exactos. Si algún filtro alguna vez se come algo que necesitas, sáltatelo para esa llamada: `rtk proxy <cmd>`.

> El output que tú no lees sigue siendo output que el modelo tiene que leer.

## Por qué la combinación suma

Cada herramienta tapa una fuga. Juntas multiplican. Un turno va: prompt, pensar, ejecutar comando, output de terminal, leer, responder. RTK encoge el output de la herramienta. Caveman encoge la respuesta. Turnos más pequeños, más turnos en la misma ventana.

Prueba real con un plan de 100 $/mes. Antes de las dos herramientas: llegaba al límite semanal a menudo, a veces con un solo proyecto. Después: varios proyectos en paralelo y el límite casi no aparece.

> El plan no se hizo más grande. Las sesiones se hicieron más pequeñas.

## Instálalas una vez y olvídate

Las dos instalaciones son globales y de una sola vez. Sigues escribiendo `git status`, `grep` y `npm install` igual que siempre: el hook los reescribe, y Caveman se activa solo. Sin niñera, sin hábitos nuevos.

¿No sabes por dónde empezar? Elige la fuga que más duela. Respuestas largas por cada fix, Caveman primero. Inundaciones de output de `grep` y `npm install`, RTK primero. Luego añade la otra; no entran en conflicto.

> Dos herramientas. Dos fugas. Una ventana de contexto que dura el doble.

![blog-footer](/images/blog/2026-06-26/footer.webp)
