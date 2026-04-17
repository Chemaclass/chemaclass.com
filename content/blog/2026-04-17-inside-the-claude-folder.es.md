+++
title = "Dentro de la Carpeta .claude"
description = "Un recorrido práctico por la carpeta de proyecto de Claude Code. Qué hacen rules, skills, agents, hooks y settings, y cómo encajan entre sí."
draft = false
[taxonomies]
tags = [ "ai", "software", "tutorial", "craftsmanship" ]
[extra]
subtitle = "Un tutorial sobre rules, skills, agents, hooks y settings"
static_thumbnail = "/images/blog/2026-04-17/cover.jpg"
series = "ai"
series_order = 5
related_posts = [
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2026-01-11-mcp-giving-your-ai-agent-the-right-context.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2016-10-01-the-pragmatic-programmer.md",
  "readings/2023-03-19-accelerate.md",
]
+++

Cada proyecto en el que trabajo tiene una carpeta `.claude/` en la raíz. Commiteada en git, como el resto del código.

Esa carpeta convierte Claude Code de un asistente genérico en un compañero que conoce tu proyecto. Quien clone el repo hereda el mismo setup.

El agentic coding es tan bueno como el contexto que le das al agente. La carpeta `.claude/` es donde vive ese contexto.

<!-- more -->

## La carpeta .claude, de un vistazo

```
.claude/
├── CLAUDE.md         # onboarding del proyecto
├── settings.json     # permisos, hooks, env
├── skills/           # procedimientos reutilizables (slash commands)
├── rules/            # convenciones por glob
├── hooks/            # scripts que reaccionan a eventos
└── agents/           # roles especializados
```

Seis capas, una carpeta. Contexto, seguridad, procedimientos, barandillas, automatización, especialistas.

## Los cimientos

### CLAUDE.md: donde todo empieza

Claude Code lee `CLAUDE.md` en cada arranque. El doc de onboarding.

En [Phel](https://github.com/phel-lang/phel-lang), el mío cubre el pipeline del compilador (Lexer → Parser → Analyzer → Emitter), la estructura de módulos, convenciones y comandos clave.

Un `~/.claude/CLAUDE.md` global aplica a _todos_ tus proyectos. El archivo de proyecto dice _cómo funciona este código_. El global dice _cómo trabajo yo_.

Cada byte viaja en cada prompt. Mantenlo corto. Si pasa de una pantalla, mueve el detalle a `rules/` o `skills/`.

> Un buen `CLAUDE.md` es un buen doc de onboarding. Cuanto mejor sea, menos te repites.

### settings.json: seguridad antes que potencia

Antes de darle más poder al agente, bloquea lo que nunca debe hacer.

`.claude/settings.json` contiene tres cosas: **permissions** (allow/deny), **hooks** (comandos por evento) y **env** (variables). Un `settings.local.json` gitignoreado mantiene las configuraciones personales aparte.

{% deep_dive(title="Ejemplo de permisos en Phel") %}

```json
{
  "permissions": {
    "allow": [
      "Bash(composer:*)",
      "Bash(./bin/phel:*)",
      "Bash(git:*)",
      "Bash(gh:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)"
    ]
  }
}
```

{% end %}

Allow desbloquea el flujo. Deny marca la línea que el agente no puede cruzar, aunque se lo pidas con buena cara.

> Los permisos son el suelo. Todo lo demás se construye sobre una base segura.

## Procedimientos y barandillas

### Skills: procedimientos que puedes ejecutar

Siguiente dolor tras onboarding: la repetición. Los skills lo resuelven.

Un skill es un archivo markdown en `.claude/skills/`, un procedimiento que invocas con una barra:

- **`/gh-issue <número>`**: de issue a rama, plan TDD, PR.
- **`/commit`**: fix, análisis, tests, commit convencional.
- **`/refactor-check`**: SOLID, naming, olores de arquitectura.
- **`/release [version]`**: changelog, PHAR, tag, release.

{% deep_dive(title="Skills vs rules vs prompt directo") %}

- **Prompt directo**: _"arregla el issue #42"_. El agente improvisa. Distinto cada vez.
- **Rule**: _"usa conventional commits"_. Da forma al resultado, no al procedimiento.
- **Skill**: _"`/gh-issue 42`"_. El procedimiento _es_ la instrucción.

Los skills convierten conocimiento tribal en pasos ejecutables por cualquiera.

{% end %}

> Los skills capturan qué hacer. Las rules capturan qué no hacer.

### Rules: las barandillas

`CLAUDE.md` se lee en cada sesión. Las rules solo cuando aplican. Los archivos en `.claude/rules/` apuntan a áreas del código con patrones glob: el agente carga solo lo que corresponde, manteniendo el contexto ligero.

{% deep_dive(title="Rules con glob en la práctica") %}

Archivos de rules en Phel:

- **`compiler.md`**: pipeline estricto de 4 fases, sin atajos.
- **`php.md`**: PER 3.0, clases `final`, `readonly`, patrón Gacela.
- **`phel.md`**: kebab-case, `defn-` privadas, `:doc`/`:example` obligatorios.
- **`integration-tests.md`**: secciones `--PHEL--` / `--PHP--` en fixtures.

Las rules del compilador no se activan al editar código Phel. Las rules de Phel no se activan al editar infraestructura PHP.

{% end %}

Las rules no son sugerencias. Viajan con el código: un cambio de convención y su rule viajan en el mismo commit. Sin drift, sin wikis desactualizadas.

![blog-middle](/images/blog/2026-04-17/middle.jpg)

## Automatización y delegación

### Hooks: automatización en los bordes

Las rules dicen al agente qué hacer. Los hooks se aseguran de que ocurra aunque el agente olvide.

Comandos shell disparados por eventos de Claude Code (`PreToolUse`, `PostToolUse`, `Stop`), conectados vía `settings.json`. En Phel, `PreToolUse` bloquea ediciones a archivos críticos (`build/release.sh`, `.github/*`, `composer.lock`). `PostToolUse` auto-formatea PHP vía `php-cs-fixer`.

{% deep_dive(title="Conexión de hooks") %}

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{ "type": "command", "command": ".claude/hooks/protect-files.sh" }]
    }],
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{ "type": "command", "command": ".claude/hooks/format-php.sh" }]
    }]
  }
}
```

{% end %}

> Las rules son lo que el agente debe saber. Los hooks son lo que el sistema impone de todas formas.

### Agents: roles especializados

Todo lo anterior da forma a un solo agente. Los agents añaden especialistas a los que el agente principal puede delegar, cada uno con sus propias herramientas, permisos y modelo. La pieza más avanzada. La recomiendo de última.

Algunos de Phel:

- **Explorer** (Sonnet, solo lectura): archivos, mapeo de estructura.
- **Clean Code Reviewer**: SOLID y naming en diffs.
- **TDD Coach**: imposición red-green-refactor.
- **Domain Architect**: límites de módulos, pipeline del compilador.
- **Debugger**: errores del compilador en todas las fases.

Cada agente corre en su propia ventana de contexto: la sesión principal se mantiene limpia mientras el especialista profundiza. La ganancia no es solo coste, es foco. Un agente con solo read y grep no puede reescribir tu código por error.

> El modelo correcto para el trabajo correcto. Rápido y barato para explorar. Profundo y cuidadoso para arquitectura.

## Empieza pequeño, crece con la fricción

No construyas todo esto el primer día.

El orden, guiado por fricción real:

1. Empieza con [`CLAUDE.md`](#claude-md-donde-todo-empieza).
2. Bloquea permisos en [`settings.json`](#settings-json-seguridad-antes-que-potencia).
3. La primera vez que te repitas, escribe un [skill](#skills-procedimientos-que-puedes-ejecutar).
4. La primera vez que el agente rompa una convención, añade una [rule](#rules-las-barandillas).
5. La primera vez que algo malo casi se commitee, añade un [hook](#hooks-automatizacion-en-los-bordes).
6. La primera vez que un generalista no encaje, define un [especialista](#agents-roles-especializados).

Cada paso soluciona un problema que realmente tuviste. No uno que imaginaste.

> El setup crece desde la fricción real, no desde el diseño anticipado.

Commitea la carpeta. Compártela. Cuando alguien se una, su sesión hereda todo.

Trata `.claude/` como infraestructura. Versiónala. Revísala. Hazla evolucionar con el código.

![blog-footer](/images/blog/2026-04-17/footer.jpg)
