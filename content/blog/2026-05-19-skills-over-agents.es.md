+++
title = "Skills por Encima de Agents"
description = "Por qué los skills de Claude Code superan a los agentes especializados. El contexto bajo demanda decide la calidad. Librería que viaja con tu código."
draft = false
[taxonomies]
tags = [ "ai", "software", "craftsmanship", "productivity", "developer-tools" ]
[extra]
subtitle = "Inteligencia sin experiencia es entretenimiento"
static_thumbnail = "/images/blog/2026-05-19/cover.jpg"
series = "ai"
series_order = 7
reading_time = 4
related_posts = [
  "blog/2026-04-17-inside-the-claude-folder.md",
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2018-06-04-clean-architecture.md",
]
+++

La gente compara agentes de código. Claude Code, Codex, Gemini CLI. Cuál es más listo, más rápido, más barato. Los benchmarks salen nuevos cada mes.

Pregunta equivocada.

Tras un año metiendo agentes en proyectos reales, lo que más cambió las cosas no fue el agente. Fueron los skills que le escribí.

<!-- more -->

## Los agentes son un commodity

Todo agente de código tiene la misma forma. Un modelo de lenguaje, un runtime, acceso al filesystem. Leer, razonar, escribir. Generalista por diseño.

Dos equipos usan el mismo agente. Uno entrega código limpio y testado. El otro entrega basura que parece buena. Mismo modelo. Distinta enseñanza.

> El modelo es el motor. Los skills son el mapa. Sin mapa, con un motor potente te pierdes antes.

## Inteligencia no es experiencia

¿Quién lleva tus impuestos? ¿Un genio con 300 de IQ que nunca leyó una ley fiscal, o un asesor con 20 años presentando declaraciones?

El asesor sabe qué deducciones aplican, qué declaraciones necesita tu negocio, qué errores te marcan. No es inteligencia. Es experiencia.

Los agentes de IA tienen el mismo hueco. Un modelo razona sobre código y escribe soluciones. No conoce tus capas hexagonales. No sabe que las entidades de dominio nunca deben importar código de framework. No sabe que cada feature empieza con un test que falla.

Los skills cierran ese hueco.

## Los skills cargan contexto bajo demanda

Un skill es un fichero markdown en `.claude/skills/`. Un procedimiento, un patrón, un trozo de conocimiento del dominio. Markdown con frontmatter.

La clave está en cómo se cargan. El agente lee solo nombres y descripciones al arrancar. Carga el skill entero cuando la tarea encaja. Sigue los enlaces a las referencias solo cuando necesita profundizar.

Esa carga bajo demanda es lo que hace que los skills escalen. Veinte skills casi no cuestan hasta que uno encaja con la tarea. Los agentes especializados, en cambio, cargan sus instrucciones enteras cada vez que arrancan. Más agentes, más coste fijo.

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
2. Revisar arquitectura: la capa de dominio no importa framework, la infraestructura se mantiene delgada
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

![blog-middle](/images/blog/2026-05-19/middle.jpg)

## Skills vs agentes especializados

Ya cubrí los [agentes especializados](/es/blog/inside-the-claude-folder/#agents-specialized-roles): workers aislados con su propio prompt y conjunto de herramientas. Buenos para trabajo en paralelo y fronteras de contexto limpias.

Los agentes especializados son toscos. Un agente, un rol, un prompt fijo. Si quieres tres tipos de calidad de review, o escribes tres agentes o metes todo en uno.

Los skills son finos. Un agente, muchos skills. El skill correcto se carga para la tarea. El contexto se mantiene pequeño. La calidad se mantiene alta.

Regla práctica:

- Usa un **skill** cuando necesitas un procedimiento o patrón. De `phel-lang`: `/gh-issue` (de issue a PR), `/commit` (commit convencional), `/refactor-check` (review SOLID).
- Usa un **agente** cuando necesitas aislamiento. De `phel-lang`: `tdd-coach` (pairing de TDD), `clean-code-reviewer` (review de PR), `domain-architect` (exploración de arquitectura).

La mayoría de necesidades son skills, no agentes.

> Los agentes te dan velocidad. Los skills te dan calidad. Si tienes que elegir uno primero, elige skills.

## Los skills son tu ventaja

Los modelos mejoran cada mes. El mejor de este año es la base del siguiente. Las familias grandes convergen. Aparece una herramienta mejor, cambias.

Tus skills no cambian con la herramienta. Codifican tu dominio, tus convenciones, tu arquitectura. Viven en tu repo. Viajan con tu código. Apuntas un modelo nuevo a la librería y eres productivo desde el día uno.

> El agente es reemplazable. Tus skills no.

## Empieza con el primer prompt repetido

No necesitas 20 skills el día uno.

Cero. Luego uno.

La señal es la repetición. La segunda vez que tecleas el mismo contexto, ahí tienes un skill esperando. Sácalo a un fichero markdown. La próxima sesión, el agente ya lo sabe.

Ejemplo concreto. En [`phel-lang`](https://github.com/phel-lang/phel-lang), cada sesión pegaba el mismo brief: lee la issue #N, crea la rama según las etiquetas, TDD, abre el PR. A la tercera lo saqué a un skill `/gh-issue`. Ahora tecleo `/gh-issue 142` y el agente coge la issue, crea `fix/...` o `feat/...` según las etiquetas, escribe primero el test que falla, implementa, abre el PR. Un fichero markdown. La sesión ya no empieza desde cero.

No lo escribas desde cero. Pídele al agente: _"Lee este proyecto y escribe un skill mínimo de code review basado en lo que veas."_ Escanea, recoge convenciones, redacta v1. Tú lo ajustas. Añades lo que le faltó. Cortas lo que no aplica. Afinas la descripción.

El segundo skill suele venir de un error. El agente rompe una convención. Escribe un skill que enseñe el camino correcto. No volverá a pasar.

Los skills se acumulan. Cada uno sube el listón. Un fichero markdown, quizá 50 líneas. Beneficio para siempre.

Quien no escribe skills se pasa la vida re-explicando lo que "realmente quiere". Cada sesión desde cero. No es problema de herramienta. Es problema de gestión del conocimiento.

El agente sale el año que viene. El skill se queda para siempre.

> Escribe el skill una vez. Cada sesión a partir de ahí empieza donde acabó la anterior.

![blog-footer](/images/blog/2026-05-19/footer.jpg)

---

{{ youtube(id="CEvIs9y1uog") }}
