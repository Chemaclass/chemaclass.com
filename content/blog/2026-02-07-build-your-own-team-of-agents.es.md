+++
title = "Construye tu Propio Equipo de Agentes"
description = "La mayoría usa la IA como un solo asistente. La verdadera ventaja viene cuando la organizas como un equipo: documentación de onboarding, procedimientos estándar, especialistas y ejecución en paralelo."
draft = false
[taxonomies]
tags = [ "ai", "software", "craftsmanship", "leadership" ]
[extra]
subtitle = "De asistente individual a equipo coordinado"
static_thumbnail = "/images/blog/2026-02-07/cover.jpg"
related_posts = [
  "blog/2026-01-11-mcp-giving-your-ai-agent-the-right-context.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2018-06-04-clean-architecture.md",
]
+++

La mayoría usa asistentes de código con IA como un único interlocutor. Abres un chat, describes lo que necesitas y obtienes una respuesta. Funciona. Pero es como contratar a un generalista para que haga de todo. Ningún equipo real funciona así.

La verdadera ventaja viene cuando organizas la IA como un equipo: onboarding, procedimientos estándar, especialistas y ejecución en paralelo.

En el [post sobre MCP](/blog/mcp-giving-your-ai-agent-the-right-context/) cubrí cómo darle acceso a tu entorno. En [La IA te da velocidad, no calidad](/blog/ai-gives-you-speed-not-quality/), por qué el juicio humano sigue siendo esencial. Este post cubre la pieza que falta: organizar ese acceso en un flujo coordinado.

<!-- more -->

## El documento de onboarding

Todo buen equipo empieza con onboarding. Los agentes de IA necesitan lo mismo.

### Reglas del proyecto

En Claude Code, el archivo `CLAUDE.md` en la raíz de tu proyecto es el documento de onboarding. El agente lo lee cada vez que empieza a trabajar: estructura, convenciones, guías de estilo, herramientas.

Pero `CLAUDE.md` es solo el punto de entrada. Puedes dividir las reglas en archivos enfocados bajo `.claude/rules/`, cada uno apuntando a partes específicas de tu código mediante patrones glob. El agente no solo conoce tus convenciones, está limitado por ellas. Límites de capas, patrones de nomenclatura, dirección de dependencias. Todo versionado junto al código que protegen.

{% deep_dive(title="Reglas con glob en la práctica") %}

- **`modules/*/Domain/**/*.php`**: Sin imports de framework, sin dependencias de infraestructura, solo PHP plano.
- **`modules/*/Infrastructure/**/*.php`**: Los controladores se mantienen delgados, los modelos Eloquent en su sitio.
- **`resources/js/**/*.tsx`**: Convenciones de componentes, estrictez TypeScript, patrones de estilos.

Cada archivo de reglas tiene un scope limitado a los archivos que le importan. Las reglas de dominio no se activan cuando se edita un controlador.

{% end %}

### Preferencias personales

También existe un `~/.claude/CLAUDE.md` global que aplica en todos tus proyectos. El archivo del proyecto dice _cómo funciona este código_. El global dice _cómo trabajo yo_.

> Un buen CLAUDE.md es como un buen documento de onboarding. Cuanto mejor sea, menos te repites.

## Procedimientos operativos estándar

Todos los equipos tienen flujos recurrentes que viven en wikis, runbooks, o en la cabeza de alguien. Cuando viven en la cabeza de alguien, son frágiles.

Los comandos slash personalizados en `.claude/commands/` convierten estos flujos en instrucciones ejecutables. Cada comando es un archivo markdown que describe un procedimiento de varios pasos. En uno de mis proyectos, cada comando de creación empieza con tests. TDD incorporado al procedimiento, no dejado a la disciplina.

{% deep_dive(title="Comandos de un proyecto real") %}

**Creación (TDD-first):**
- **`/create-module`**: Genera un módulo hexagonal con capas de dominio, aplicación e infraestructura.
- **`/create-entity`**: Entidades de dominio con value objects y archivos de test.
- **`/create-use-case`**: Handlers de command/query con tests mockeados.
- **`/create-page`**: Páginas React con factories y smoke tests.

**Calidad y flujo de trabajo:**
- **`/refactor-check`**: Analiza código contra principios SOLID.
- **`/test`**: Ejecuta la suite con filtrado por módulo.
- **`/fix`**: Auto-aplica correcciones de linting y análisis estático.
- **`/gh-issue`**: De issue de GitHub a implementación y PR en un solo comando.

{% end %}

Los comandos convierten conocimiento tribal en instrucciones ejecutables. Lo que antes era "pregúntale a Sara cómo creamos un módulo nuevo" se convierte en un comando que cualquiera puede ejecutar.

## Especialistas, no generalistas

Los comandos codifican cómo hace las cosas tu equipo. Pero hay otra capa: skills y agentes.

### Skills como bases de conocimiento

Los skills son conocimiento estructurado del que el agente se nutre. En uno de mis proyectos, tengo skills para principios SOLID, arquitectura hexagonal, flujos TDD y patrones React/Inertia.

Las reglas restringen: "no hagas esto, haz siempre aquello." Los skills enseñan: "este es el patrón, estos son los errores comunes." Las reglas son barandillas. Los skills son experiencia.

### Agentes como roles especializados

En lugar de un generalista, defines agentes especializados con un rol claro, herramientas específicas, e incluso un modelo diferente según la complejidad del trabajo. No necesitas a tu arquitecto más senior para renombrar una variable.

{% deep_dive(title="Roles de agentes en un proyecto real") %}

- **Explorer** (modelo ligero): Solo lectura. Busca en el código, encuentra archivos, entiende la estructura.
- **Revisor de código limpio** (modelo intermedio): Violaciones SOLID, code smells, inconsistencias de nomenclatura.
- **Coach de TDD** (modelo intermedio): Guía el ciclo red-green-refactor. Edita archivos y ejecuta tests.
- **Revisor de React** (modelo intermedio): Estructura de componentes, estrictez TypeScript, accesibilidad.
- **Arquitecto de dominio** (modelo más capaz): Decisiones de arquitectura, límites de módulos, patrones DDD.

{% end %}

> El modelo adecuado para el trabajo adecuado. Rápido y barato para exploración. Capaz y riguroso para arquitectura.

## Hazlos trabajar juntos

Aquí la metáfora del equipo se vuelve literal. Un solo agente es útil. Múltiples agentes desde un plan compartido es un equipo.

### Subagentes vs equipos de agentes

Hay dos modelos de coordinación distintos, y elegir el correcto importa.

Los **subagentes** se ejecutan dentro de una misma sesión. Hacen trabajo enfocado y devuelven resultados al agente principal. No pueden hablar entre sí. El agente principal lo gestiona todo.

Los **equipos de agentes** son diferentes. Cada miembro es una sesión de Claude Code independiente con su propia ventana de contexto. Se comunican a través de un buzón compartido, reclaman tareas de una lista compartida y se coordinan sin pasar por un cuello de botella central.

La arquitectura tiene cuatro componentes:

- **Team lead**: la sesión principal que crea el equipo y orquesta el trabajo
- **Teammates**: instancias separadas de Claude Code, cada una con tareas específicas
- **Lista de tareas**: elementos de trabajo compartidos con seguimiento de dependencias. Las tareas bloqueadas se desbloquean automáticamente cuando sus dependencias se completan
- **Buzón**: mensajería directa entre agentes, incluyendo broadcasts a todo el equipo

> Los subagentes son trabajadores que reportan. Los equipos de agentes son colaboradores que piensan juntos.

Usa subagentes cuando solo importa el resultado. Usa equipos de agentes cuando los miembros necesitan compartir hallazgos, cuestionar al resto y coordinarse por su cuenta.

### Empezando con equipos de agentes

Los equipos de agentes son aún experimentales. Actívalos añadiendo esto a `~/.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Crear un equipo es conversacional. Describes lo que quieres: _"Crea un equipo de agentes para refactorizar el módulo de auth. Genera tres miembros: uno para cambios de API backend, uno para componentes frontend, uno para escribir tests."_ Claude configura la lista de tareas, genera los miembros y coordina el trabajo.

Puedes ver el equipo en un mismo proceso (un terminal, navega con Shift+Up/Down) o dividido en paneles (cada miembro en una ventana tmux o iTerm2 separada). Usa Shift+Tab para activar el modo delegado, que restringe al lead a solo coordinación.

**Advertencia sobre consumo de tokens.** Los equipos de agentes queman tokens rápidamente. Cada miembro tiene su propia ventana de contexto, y cada mensaje entre agentes suma. Empieza con tareas de investigación y revisión antes de pasar a implementación. Tres miembros explorando en paralelo cuesta aproximadamente 3x. Asegúrate de que el paralelismo se paga a sí mismo.

Los miembros cargan automáticamente el contexto del proyecto (`CLAUDE.md`, servidores MCP, skills) pero no heredan el historial de conversación del lead. Al crear un miembro, sé específico sobre qué archivos revisar y qué restricciones aplican. Un prompt de creación vago produce trabajo vago.

![blog-middle](/images/blog/2026-02-07/middle.jpg)

### Primero planificar, después ejecutar

Describes el problema. El agente explora el código, mapea dependencias y propone un enfoque antes de cambiar nada. Lo apruebas, modificas o rechazas. Pensar primero, programar después.

Con equipos de agentes, la **aprobación de plan** permite exigir que los miembros diseñen su enfoque antes de implementar. El agente trabaja en modo solo lectura hasta que el lead aprueba. Puedes moldear el criterio del lead: _"solo aprueba planes que incluyan cobertura de tests"_ o _"rechaza planes que modifiquen el esquema de base de datos."_

El **modo delegado** restringe al lead a solo coordinación. Sin él, el lead a veces empieza a implementar en lugar de esperar a los miembros. El modo delegado lo mantiene centrado en la orquestación, no en la ejecución.

### Hipótesis competitivas

Cuando la causa raíz no está clara, un solo agente tiende a encontrar una explicación plausible y dejar de buscar. Los equipos de agentes combaten esto haciendo que los miembros sean adversarios. Cada uno investiga su propia teoría mientras intenta refutar las de los demás.

La investigación secuencial sufre de anclaje: una vez que se explora una teoría, todo lo posterior está sesgado hacia ella. Con múltiples investigadores cuestionándose mutuamente, la teoría que sobrevive tiene más probabilidades de ser la causa raíz real.

### Dimensiona las tareas para trabajo en paralelo

No todo el trabajo se beneficia del paralelismo. La pregunta clave: ¿pueden los miembros trabajar de forma independiente?

- **Demasiado pequeñas**: el overhead de coordinación supera el beneficio
- **Demasiado grandes**: los miembros trabajan demasiado tiempo sin revisión, aumentando el esfuerzo desperdiciado
- **El punto justo**: unidades autocontenidas que producen un entregable claro. Una función, un archivo de tests, una revisión

Tener 5-6 tareas por miembro mantiene a todos productivos. Que cada miembro sea dueño de archivos diferentes. Dos editando el mismo archivo lleva a sobreescrituras.

{% deep_dive(title="Backend + Frontend en paralelo") %}

Imagina una funcionalidad que toca backend y frontend. Después de planificar:

- Un **agente de backend** genera la capa de dominio: entidades, value objects, interfaces de repositorio, handlers. Todo hexagonal, todo test-first.
- Un **agente de frontend** construye la página React, componentes, hooks y factories. Cada uno sigue sus propias reglas y opera de forma independiente.

No se pisan porque el plan ya definió los límites. Propiedad clara. Sin conflictos de merge. Sin esperas.

{% end %}

### Revisión tras la ejecución

Tras la implementación, los agentes de revisión toman el relevo. En lugar de un revisor que lo pille todo, tienes especialistas: violaciones SOLID, patrones de componentes, calidad de tests, límites de módulos.

> Un solo agente es un asistente. Múltiples agentes trabajando desde un plan compartido es un equipo.

## Tú sigues siendo el lead

Por muy bien configurados que estén, los agentes trabajan para ti. Tú estableces los estándares, escribes las reglas, revisas los planes y apruebas el resultado antes de que salga. Puedes enviar un mensaje a cualquier miembro mientras trabaja para redirigir su enfoque o añadir restricciones. Si alguien va por mal camino, intervienes directamente.

Como escribí en [La IA te da velocidad, no calidad](/blog/ai-gives-you-speed-not-quality/), el código que produce el agente es tu responsabilidad. Más paralelismo sin supervisión es solo más caos, más rápido.

### Puertas de calidad

Los hooks y git hooks actúan como la última red de seguridad. En mi setup, nada se commitea a menos que los linters pasen, el análisis estático esté limpio, los tests sean verdes y la cobertura supere el 90%. El agente no puede saltarse esto. Nadie puede.

Los equipos de agentes añaden sus propios hooks: `TeammateIdle` mantiene activos a los miembros inactivos, `TaskCompleted` impide completar tareas prematuramente. Políticas automatizadas que nadie puede saltarse.

{% deep_dive(title="Hooks, permisos y barandillas") %}

Los git hooks ejecutan linters, análisis estático y tests antes de cada commit. Claude Code añade sus propios hooks (`.claude/hooks/`): comandos shell que se disparan ante eventos del agente como llamadas a herramientas o escritura de archivos.

`.claude/settings.json` controla lo que los agentes pueden ejecutar. Autoriza herramientas y comandos específicos, deniega operaciones destructivas. Controlas no solo lo que los agentes saben (reglas, skills) sino lo que pueden hacer (permisos). Las reglas definen la cultura. Los permisos definen los límites.

{% end %}

### La base importa

Los agentes te ayudan a llegar más rápido, pero ese "allí" tiene que estar bien definido. Si no sabes cómo es la arquitectura hexagonal, los agentes no la van a descubrir por ti.

No construyes todo esto el primer día. Empiezas con un `CLAUDE.md`. Luego notas que repites instrucciones, y escribes un comando. Un agente rompe una convención, y añades una regla. El setup crece orgánicamente a partir de fricción real. Cada adición resuelve un problema que realmente tuviste. Lo mismo con los equipos de agentes: empieza con tareas que no requieran escribir código. Revisa un PR, investiga una librería, analiza un bug. Aprende el modelo de coordinación antes de implementar en paralelo.

Si quieres un punto de partida, preparé [laravel-claude-toolkit](https://github.com/Chemaclass/laravel-claude-toolkit): un starter kit de Laravel con reglas, comandos, skills, agentes, hooks y permisos ya configurados.

> No solo estás usando IA. Estás construyendo un equipo. Y como cualquier equipo, la calidad de su resultado refleja la calidad de su liderazgo.

## Recursos

- [Claude Code: Agent Teams](https://code.claude.com/docs/en/agent-teams) | claude.com
- [Claude Code Tips: Workflow Boosters](https://rfrolov.me/en/blog/claude-code-tips) | rfrolov.me

![blog-footer](/images/blog/2026-02-07/footer.jpg)
