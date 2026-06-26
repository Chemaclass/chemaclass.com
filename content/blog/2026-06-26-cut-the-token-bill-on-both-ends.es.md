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

Estira lo suficiente y chocas con el muro. La calidad cae. Los costes suben.

Dos herramientas arreglaron casi todo. Una recorta lo que el agent dice. La otra recorta lo que vuelve desde la shell.

<!-- more -->

> Mismo modelo. Mismos prompts. Factura más ligera.

## Dos fugas en la misma ventana

Los bloques más grandes en cualquier transcripción de sesión: respuestas del agent y output de herramientas. No tus prompts.

- Respuestas del agent: cortesías, vacilaciones, repeticiones, "Sure! Happy to help...".
- Output de herramientas: logs de `npm install`, muros de texto de `git status`, volcados de `grep` con rutas completas.

Los dos se acumulan. Los dos alejan la señal útil del modelo.

## Caveman recorta la salida

**[Caveman](https://github.com/JuliusBrussee/caveman)** es un skill de Claude Code. Un comando, `/caveman full`, y el agent deja caer artículos, rellenos y cortesías. Los fragmentos son bienvenidos. Los términos técnicos se mantienen exactos.

Instalación:

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
```

Lo que muere:

- Artículos: a, an, the.
- Rellenos: just, really, basically, actually, simply.
- Cortesías: sure, of course, happy to.
- Vacilaciones: might, perhaps, it depends.

Lo que sobrevive:

- Bloques de código, errores exactos, rutas de archivo, comandos.
- Avisos de seguridad y operaciones destructivas (el skill se aclara solo).

Misma respuesta. Una fracción de la prosa.

{% deep_dive(title="Antes y después") %}

Modo normal:

> Sure! I'd be happy to help you with that. The issue you're experiencing is likely caused by an off-by-one error in your token expiry check. The middleware compares the current time using `<` when it should really be using `<=`. Here's the fix:

Modo caveman:

> Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:

Mismo fix. Mismo bloque de código a continuación. Un cuarto de prosa.

{% end %}

Niveles: `lite`, `full`, `ultra`. Empieza en `full`. Ultra se lee como un telegrama.

> El agent no pierde inteligencia cuando le quitas la cháchara.

## RTK recorta la entrada

**[RTK](https://github.com/rtk-ai/rtk)** (Rust Token Killer) envuelve los comandos que ejecuta tu agent. Un hook reescribe `git status` a `rtk git status`. Transparente. Cero overhead.

Instalación:

```bash
brew install rtk
rtk init -g    # instala el hook que reescribe los comandos
```

La versión envuelta quita el ruido antes de llegar al agent. Códigos de color. Separadores repetidos. Banners de `npm install`. Timestamps verbosos.

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

Misma información. La mitad de líneas. En un repo con movimiento la diferencia escala: decenas de untracked files, pistas de branch, líneas de instrucciones, todo colapsa en un bloque.

```bash
rtk gain              # ver cuántos tokens te ha ahorrado
rtk gain --history    # desglose por comando
rtk discover          # escanea tu historial de Claude Code buscando ganancias
```

Ejecuta `rtk gain` tras un uso real para ver tu propio ahorro. RTK reporta [60-90% menos tokens](https://github.com/rtk-ai/rtk) en los comandos de desarrollo habituales.

> El output que tú no lees sigue siendo output que el modelo tiene que leer.

## Por qué la combinación suma

Cada herramienta tapa una fuga. Juntas multiplican.

Un turno: prompt, pensar, ejecutar comando, output de terminal, leer, responder. RTK encoge el output de la herramienta. Caveman encoge la respuesta. Turnos más pequeños, más turnos en la misma ventana.

La compactación llega más tarde. El inicio cacheado de la conversación se mantiene barato. Solo las partes nuevas cuestan.

Prueba real con el plan Claude Max de 100$/mes. Antes de las dos herramientas: llegaba al límite semanal a menudo, a veces con un solo proyecto. Después: varios proyectos en paralelo y el límite casi no aparece.

## Instálalas globalmente y olvídate

Las dos instalaciones son globales y de una sola vez. Las ejecutas una vez y tu forma de trabajar no cambia en nada.

- Caveman se instala en tu configuración global de Claude Code, así que está en todos los proyectos. El skill se activa solo. Nada que cablear, nada que reescribir en cada sesión.
- El `rtk init -g` de RTK planta un hook global. Sigues escribiendo `git status`, `npm install`, `grep` igual que siempre; el hook los reescribe al wrapper de `rtk` al vuelo. Nunca lo ves entrar en acción.

Sin niñera. Sin hábitos nuevos. Las herramientas corren en segundo plano, en cada repo, de forma automática.

> La mejor optimización es la que configuras una vez y no vuelves a pensar en ella.

## Cuándo no comprimir

Las dos herramientas saben cuándo hacerse a un lado.

Caveman vuelve a prosa normal para:

- Avisos de seguridad y operaciones destructivas.
- Secuencias multi-paso donde los fragmentos pueden malinterpretarse.
- Cuando le pides al agent que aclare o repita.

RTK nunca toca el payload. Quita el ruido a su alrededor. Los errores y stack traces se mantienen exactos. Si algún filtro alguna vez se come algo que necesitas, sáltatelo para esa llamada:

```bash
rtk proxy <cmd>   # output crudo, sin filtrar
```

Si una respuesta queda demasiado seca, escribe `normal mode`.

> La compresión es para la cháchara. Nunca para la sustancia.

## Empieza con una, añade la otra

No necesitas las dos el primer día. Elige la fuga que más duela.

¿El agent escribe ensayos largos por cada fix? Instala Caveman primero.

¿Cada `grep` o `npm install` inunda la ventana? Instala RTK primero.

Luego añade la otra. No entran en conflicto.

> Dos herramientas. Dos fugas. Una ventana de contexto que dura el doble.

![blog-footer](/images/blog/2026-06-26/footer.webp)
