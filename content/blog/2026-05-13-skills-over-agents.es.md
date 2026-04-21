+++
title = "Skills Por Encima de Agents"
description = "Por qué los skills de Claude Code superan a los agentes especializados. El contexto bajo demanda decide la calidad. Librería que viaja con tu código."
draft = true
[taxonomies]
tags = [ "ai", "software", "craftsmanship", "productivity", "developer-tools" ]
[extra]
subtitle = "Inteligencia sin experiencia es entretenimiento"
static_thumbnail = "/images/blog/placeholder.jpg"
series = "ai"
series_order = 6
related_posts = [
  "blog/2026-04-17-inside-the-claude-folder.md",
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2026-01-11-mcp-giving-your-ai-agent-the-right-context.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2018-06-04-clean-architecture.md",
]
+++

![cover](/images/blog/placeholder.jpg)

La gente compara agentes de código. Claude Code, Codex, Gemini CLI. Cuál es más listo, más rápido, más barato. Los benchmarks se renuevan cada mes.

Pregunta equivocada.

Tras un año cableando agentes en proyectos reales, la mayor palanca no fue el agente. Fueron los skills que le escribí.

<!-- more -->

{{ youtube(id="CEvIs9y1uog") }}

## Los agentes son un commodity

Todo agente de código tiene la misma forma. Un modelo de lenguaje, un runtime, acceso al filesystem. Leer, razonar, escribir. Ser genérico es el punto.

Dos equipos usan el mismo agente. Uno entrega código limpio y testado. El otro entrega basura con aspecto convincente. Mismo modelo. Distinta enseñanza.

> El modelo es el motor. Los skills son el mapa. Sin mapa, un motor potente te pierde más rápido.

## Inteligencia no es experiencia

¿Quién lleva tus impuestos? ¿Un genio de 300 de IQ que nunca leyó la ley fiscal, o un asesor con 20 años presentando declaraciones?

El asesor sabe qué deducciones aplican, qué declaraciones necesita tu negocio, qué errores levantan alertas. No es inteligencia. Es experiencia.

Los agentes de IA tienen el mismo vacío. Un modelo razona sobre código y escribe soluciones. No sabe de tus capas hexagonales. No sabe que las entidades de dominio nunca deben importar código de framework. No sabe que cada feature empieza con un test que falla.

Los skills cierran ese vacío.

## Los skills cargan contexto bajo demanda

Un skill es un fichero markdown en `.claude/skills/`. Un procedimiento, un patrón, una porción de conocimiento de dominio. Markdown plano con frontmatter.

La clave está en cómo se cargan. El agente lee solo nombres y descripciones al arrancar. Trae el skill completo cuando una tarea encaja. Sigue enlaces a referencias solo cuando hace falta profundidad.

Esa carga bajo demanda es lo que hace que los skills escalen. Veinte skills casi no cuestan hasta que uno encaja con la tarea. Los agentes especializados, en cambio, cargan sus instrucciones completas cada vez que corren. Más agentes, más coste fijo.

{% deep_dive(title="Un ejemplo real de skill") %}

```
.claude/skills/
  code-review/
    SKILL.md              # instrucciones principales
    reference/
      solid-checklist.md  # ejemplos SOLID detallados
      test-patterns.md    # guías de calidad de tests
```

El `SKILL.md`:

```markdown
---
description: "Revisar cambios de código por violaciones de SOLID, calidad de tests y alineación de arquitectura"
allowed-tools: Read, Grep, Glob
argument-hint: "[fichero o PR]"
---

# Code Review

Revisa cambios de código contra las convenciones del proyecto.

## Pasos

1. Leer el diff o los ficheros indicados
2. Revisar arquitectura: la capa de dominio no importa framework, la infraestructura queda fina
3. Revisar principios SOLID (ver reference/solid-checklist.md para patrones)
4. Revisar calidad de tests: los tests verifican comportamiento, no detalles de implementación
5. Señalar problemas con el principio concreto violado y una propuesta de fix

## Output

Para cada issue encontrado:
- Fichero y línea
- Qué está mal (qué principio o convención)
- Cómo sería el fix
```

El agente ve la descripción en la lista de skills. Pides un review, carga `SKILL.md`. Necesita un patrón SOLID, lee la referencia. Dos niveles, bajo demanda.

{% end %}

![blog-middle](/images/blog/placeholder.jpg)

## Skills vs agentes especializados

Ya cubrí los [agentes especializados](/blog/inside-the-claude-folder/#agents-specialized-roles): workers aislados con su propio prompt y set de herramientas. Buenos para trabajo en paralelo y fronteras de contexto limpias.

Pero los agentes especializados son gruesos. Un agente, un rol, un prompt fijo. Si quieres tres tipos de calidad de review, o escribes tres agentes o metes todo en uno.

Los skills son finos. Un agente, muchos skills. El skill correcto se carga para la tarea. El contexto se mantiene pequeño. La calidad se mantiene alta.

Regla práctica:

- Usa un **skill** cuando necesitas un procedimiento o patrón. Review SOLID, ciclo TDD, checklist de migración.
- Usa un **agente** cuando necesitas aislamiento. Exploraciones largas, tareas en paralelo, trabajos con su propio presupuesto.

La mayoría de necesidades son skills, no agentes.

> Los agentes te dan velocidad. Los skills te dan calidad. Si tienes que elegir primero uno, elige skills.

## Los skills son tu moat

Los modelos mejoran cada mes. El mejor de este año es la base del siguiente. Las familias grandes convergen. Aparece una herramienta mejor, cambias.

Tus skills no cambian con la herramienta. Codifican tu dominio, tus convenciones, tu arquitectura. Viven en tu repo. Viajan con tu código. Apuntas un modelo nuevo a la librería y eres productivo desde el día uno.

> El agente es reemplazable. Tus skills no.

## Empieza con el primer prompt repetido

No necesitas 20 skills el día uno. Cero. Luego uno.

La señal es la repetición. La segunda vez que tecleas el mismo contexto, ahí hay un skill esperando. Extráelo a un fichero markdown. La próxima sesión, el agente ya lo sabe.

No lo escribas desde cero. Pídele al agente: _"Lee este proyecto y redacta un skill mínimo de code review basado en lo que veas."_ Escanea, recoge convenciones, redacta v1. Tú lo ajustas. Añades lo que le faltó. Cortas lo que no aplica. Afinas la descripción.

El segundo skill suele venir de un error. El agente rompe una convención. Escribe un skill que enseñe el camino correcto. No volverá a pasar.

Los skills componen. Cada uno sube el suelo. Un fichero markdown, quizá 50 líneas. Retorno permanente.

Quien no escribe skills se pasa la vida re-explicando lo que "realmente quiere". Cada sesión desde cero. No es problema de herramienta. Es problema de gestión del conocimiento.

> Escribe el skill una vez. Cada sesión a partir de ahí arranca donde acabó la anterior.
