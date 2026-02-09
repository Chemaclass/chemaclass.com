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

La mayoría usa asistentes de código con IA como un único interlocutor. Abres un chat, describes lo que necesitas y obtienes una respuesta. Funciona. Pero es como contratar a un generalista para que haga de todo: frontend, backend, testing, documentación, despliegue. Ningún equipo real funciona así.

La verdadera ventaja viene cuando organizas la IA como un equipo: onboarding, procedimientos estándar, especialistas, y ejecución en paralelo.

En el [post sobre MCP](/blog/mcp-giving-your-ai-agent-the-right-context/) cubrí cómo darle acceso a tu entorno. En [La IA te da velocidad, no calidad](/blog/ai-gives-you-speed-not-quality/), por qué el juicio humano sigue siendo esencial. Este post cubre la pieza que falta: cómo organizar ese acceso en un flujo de trabajo coordinado.

<!-- more -->

## El documento de onboarding

Todo buen equipo empieza con onboarding. Los agentes de IA necesitan lo mismo.

### Reglas del proyecto

En Claude Code, el archivo `CLAUDE.md` en la raíz de tu proyecto es el documento de onboarding. El agente lo lee cada vez que empieza a trabajar: estructura del proyecto, convenciones de código, guías de estilo, configuración de herramientas.

Pero `CLAUDE.md` es solo el punto de entrada. Puedes dividir las reglas en archivos enfocados bajo `.claude/rules/`, cada uno apuntando a partes específicas de tu código mediante patrones glob. El agente no solo conoce tus convenciones, está limitado por ellas. Límites de capas, patrones de nomenclatura, dirección de dependencias. Todo versionado junto al código que protegen. Y como `.claude/` vive en el repo, cada nuevo miembro del equipo humano recibe el mismo setup al incorporarse al proyecto.

{% deep_dive(title="Reglas con glob en la práctica") %}

- **`modules/*/Domain/**/*.php`**: La capa de dominio se mantiene pura: sin imports de framework, sin dependencias de infraestructura, solo PHP plano.
- **`modules/*/Infrastructure/**/*.php`**: Los controladores se mantienen delgados, los modelos Eloquent en su sitio.
- **`resources/js/**/*.tsx`**: Convenciones de componentes React, estrictez TypeScript, patrones de estilos.

Cada archivo de reglas tiene un scope limitado a los archivos que le importan. Las reglas de dominio no se activan cuando se edita un controlador. Las reglas de frontend no se activan cuando se escribe un handler de caso de uso.

{% end %}

### Preferencias personales

También existe un `~/.claude/CLAUDE.md` global que aplica en todos tus proyectos. Convenciones de commits, estilo de comunicación, hábitos de formato. El archivo del proyecto dice _cómo funciona este código_. El archivo global dice _cómo trabajo yo_.

> Un buen CLAUDE.md es como un buen documento de onboarding. Cuanto mejor sea, menos te repites.

## Procedimientos operativos estándar

Todos los equipos tienen flujos de trabajo recurrentes que viven en wikis, runbooks, o en la cabeza de alguien. Cuando viven en la cabeza de alguien, son frágiles.

Los comandos slash personalizados en `.claude/commands/` convierten estos flujos en instrucciones ejecutables. Cada comando es un archivo markdown que describe un procedimiento de varios pasos. En uno de mis proyectos, cada comando de creación empieza con tests. TDD incorporado al procedimiento, no dejado a la disciplina. El flujo completo, de ticket a PR, puede ocurrir en un solo comando.

{% deep_dive(title="Comandos de un proyecto real") %}

**Creación (TDD-first):**
- **`/create-module`**: Genera un módulo hexagonal completo con capas de dominio, aplicación e infraestructura.
- **`/create-entity`**: Genera entidades de dominio con sus value objects y archivos de test.
- **`/create-use-case`**: Construye handlers de command/query con tests mockeados.
- **`/create-page`**: Crea páginas React con factories y smoke tests co-ubicados.

**Calidad y flujo de trabajo:**
- **`/refactor-check`**: Analiza código contra principios SOLID y patrones de código limpio.
- **`/test`**: Ejecuta la suite con filtrado por módulo.
- **`/fix`**: Auto-aplica correcciones de linting y análisis estático.
- **`/gh-issue`**: Obtiene un issue de GitHub, planifica la implementación, la ejecuta y mueve la tarjeta por el tablero del proyecto.

{% end %}

La idea clave: los comandos convierten conocimiento tribal en instrucciones ejecutables. Lo que antes era "pregúntale a Sara cómo creamos un módulo nuevo" se convierte en un comando que cualquiera puede ejecutar, humano o agente.

## Especialistas, no generalistas

Los comandos son _tus_ procedimientos. Codifican cómo hace las cosas tu equipo. Pero hay otra capa: skills y agentes.

### Skills como bases de conocimiento

Los skills son conocimiento estructurado del que el agente puede nutrirse. En uno de mis proyectos, tengo skills para principios SOLID, arquitectura hexagonal, flujos TDD y patrones React/Inertia.

Las reglas restringen: "no hagas esto, haz siempre aquello." Los skills enseñan: "este es el patrón, estos son los errores comunes." Las reglas son barandillas. Los skills son experiencia.

### Agentes como roles especializados

Aquí es donde la metáfora del equipo se concreta. En lugar de un generalista, defines agentes especializados con un rol claro, herramientas específicas, e incluso un modelo diferente según la complejidad del trabajo. No necesitas a tu arquitecto más senior para renombrar una variable.

{% deep_dive(title="Roles de agentes en un proyecto real") %}

- **Explorer** (modelo ligero): Reconocimiento de solo lectura. Busca en el código, encuentra archivos, entiende la estructura. Acceso a herramientas de lectura y búsqueda, nada más.
- **Revisor de código limpio** (modelo intermedio): Comprueba violaciones SOLID, code smells e inconsistencias de nomenclatura. Solo acceso a lectura y grep.
- **Coach de TDD** (modelo intermedio): Guía el ciclo red-green-refactor. Puede editar archivos y ejecutar tests.
- **Revisor de React** (modelo intermedio): Patrones frontend: estructura de componentes, estrictez TypeScript, soporte de dark mode, accesibilidad.
- **Arquitecto de dominio** (modelo más capaz): Decisiones de arquitectura complejas, límites de módulos y patrones DDD.

{% end %}

> El modelo adecuado para el trabajo adecuado. Rápido y barato para exploración. Capaz y riguroso para arquitectura.

## Hazlos trabajar juntos

Aquí la metáfora del equipo se vuelve literal. Un solo agente es útil. Múltiples agentes desde un plan compartido es un equipo.

### Subagentes vs equipos de agentes

No todas las configuraciones multi-agente son iguales. Hay dos modelos de coordinación distintos, y elegir el correcto importa.

Los **subagentes** se ejecutan dentro de una misma sesión. Hacen trabajo enfocado y devuelven resultados al agente principal. Piensa en ellos como trabajadores que despachas para una tarea concreta: investigar una librería, verificar un patrón, ejecutar una comprobación. No pueden hablar entre sí. El agente principal lo gestiona todo.

Los **equipos de agentes** son fundamentalmente diferentes. Cada miembro es una sesión de Claude Code totalmente independiente con su propia ventana de contexto. Se comunican directamente a través de un buzón compartido, reclaman tareas de una lista compartida y se coordinan sin pasar por un cuello de botella central.

La arquitectura tiene cuatro componentes:

- **Team lead**: la sesión principal que crea el equipo y orquesta el trabajo
- **Teammates**: instancias separadas de Claude Code, cada una con tareas específicas
- **Lista de tareas**: elementos de trabajo compartidos con seguimiento de dependencias — las tareas bloqueadas se desbloquean automáticamente cuando sus dependencias se completan
- **Buzón**: mensajería directa entre agentes, incluyendo broadcasts a todo el equipo

> Los subagentes son trabajadores que reportan. Los equipos de agentes son colaboradores que piensan juntos.

Usa subagentes cuando solo importa el resultado. Usa equipos de agentes cuando los miembros necesitan compartir hallazgos, cuestionar al resto y coordinarse por su cuenta. Los equipos consumen más tokens, así que solo merecen la pena cuando la exploración en paralelo aporta valor real.

![blog-middle](/images/blog/2026-02-07/middle.jpg)

### Primero planificar, después ejecutar

Los buenos equipos no se ponen a programar directamente. Discuten el enfoque, identifican dependencias, acuerdan un plan. El modo plan de Claude Code funciona igual: describes el problema, el agente explora el código, mapea dependencias y propone un enfoque antes de cambiar nada. Lo apruebas, modificas o rechazas. Pensar primero, programar después.

Con equipos de agentes, esto se vuelve más potente. La **aprobación de plan** permite exigir que los miembros diseñen su enfoque antes de implementar. El agente trabaja en modo solo lectura hasta que el lead aprueba su plan. Si lo rechaza, el agente revisa según el feedback y reenvía. Puedes moldear el criterio del lead con instrucciones como _"solo aprueba planes que incluyan cobertura de tests"_ o _"rechaza planes que modifiquen el esquema de base de datos."_

El **modo delegado** va un paso más allá: restringe al lead a solo coordinación — crear agentes, enviar mensajes, cerrar sesiones y gestionar tareas. Sin él, el lead a veces empieza a implementar tareas en lugar de esperar a los miembros. El modo delegado mantiene al lead centrado en la orquestación, no en la ejecución.

### Hipótesis competitivas

Este es el patrón más potente de los equipos de agentes para debugging. Cuando la causa raíz no está clara, un solo agente tiende a encontrar una explicación plausible y dejar de buscar. Los equipos de agentes combaten esto haciendo que los miembros sean adversarios — cada uno investiga su propia teoría mientras intenta activamente refutar las de los demás.

La investigación secuencial sufre de anclaje: una vez que se explora una teoría, la investigación posterior está sesgada hacia ella. Con múltiples investigadores independientes cuestionándose mutuamente, la teoría que sobrevive tiene muchas más probabilidades de ser la causa raíz real.

### Dimensiona las tareas para trabajo en paralelo

No todo el trabajo se beneficia del paralelismo. La pregunta clave: ¿pueden los miembros trabajar de forma independiente?

- **Demasiado pequeñas**: el overhead de coordinación supera el beneficio
- **Demasiado grandes**: los miembros trabajan demasiado tiempo sin revisión, aumentando el esfuerzo desperdiciado
- **El punto justo**: unidades autocontenidas que producen un entregable claro — una función, un archivo de tests, una revisión

Tener 5-6 tareas por miembro mantiene a todos productivos. Divide el trabajo para que cada miembro sea dueño de un conjunto diferente de archivos — dos miembros editando el mismo archivo lleva a sobreescrituras. Propiedad clara, sin conflictos.

{% deep_dive(title="Backend + Frontend en paralelo") %}

Imagina que estás construyendo una funcionalidad que toca tanto backend como frontend. Después de planificar:

- Un **agente de backend** genera la capa de dominio: entidades, value objects, interfaces de repositorio, handlers de casos de uso. Todo siguiendo arquitectura hexagonal, todo test-first.
- Un **agente de frontend** construye la página React, componentes, hooks y factories. Cada uno sigue sus propias reglas, usa sus propios skills y opera de forma independiente.

No se pisan porque el plan ya definió los límites. El agente de backend trabaja dentro de `modules/*/Domain/` y `modules/*/Application/`. El agente de frontend dentro de `resources/js/pages/`. Propiedad clara. Sin conflictos de merge. Sin esperas.

{% end %}

### Revisión tras la ejecución

Tras la implementación, los agentes de revisión toman el relevo. En lugar de un revisor que lo pille todo, tienes especialistas: revisor de código limpio para violaciones SOLID, revisor de React para patrones de componentes, coach de TDD para calidad de tests, arquitecto de dominio para límites de módulos.

> Un solo agente es un asistente. Múltiples agentes trabajando desde un plan compartido es un equipo.

## Tú sigues siendo el lead

Por muy bien configurados que estén, los agentes trabajan para ti. Tú estableces los estándares, defines los procedimientos, escribes las reglas, revisas los planes y apruebas el resultado antes de que salga.

Como escribí en [La IA te da velocidad, no calidad](/blog/ai-gives-you-speed-not-quality/), el código que produce el agente es tu responsabilidad. Los agentes siguen cometiendo errores, las ventanas de contexto tienen límites y la coordinación no es perfecta. Más paralelismo sin supervisión es solo más caos, más rápido.

### Puertas de calidad

Los hooks y git hooks actúan como la última red de seguridad. En mi setup, nada se commitea a menos que los linters pasen, el análisis estático esté limpio, los tests sean verdes y la cobertura supere el 90%. El agente no puede saltarse esto. Nadie puede.

Los equipos de agentes añaden sus propios hooks de calidad: `TeammateIdle` se ejecuta cuando un miembro está a punto de quedarse inactivo (salir con código 2 para enviar feedback y mantenerlo trabajando), y `TaskCompleted` se ejecuta cuando una tarea se marca como completada (salir con código 2 para impedir la finalización y enviar feedback). Son políticas automatizadas que ningún miembro del equipo puede saltarse.

{% deep_dive(title="Hooks, permisos y barandillas") %}

Los git hooks ejecutan linters, análisis estático y tests antes de cada commit. Pero Claude Code también tiene sus propios hooks (`.claude/hooks/`): comandos shell que se disparan ante eventos del agente como llamadas a herramientas o escritura de archivos. Son las políticas automatizadas que todo miembro del equipo debe cumplir.

Además, `.claude/settings.json` controla lo que los agentes _pueden_ hacer. Puedes autorizar herramientas y comandos específicos, y denegar operaciones destructivas como `rm -rf` o `sudo`. Esto significa que controlas no solo lo que los agentes saben (reglas, skills) sino lo que pueden ejecutar (permisos). Las reglas definen la cultura. Los permisos definen los límites.

{% end %}

### La base importa

Los agentes te ayudarán a llegar más rápido, pero ese "allí" tiene que estar bien definido. Si no sabes cómo es la arquitectura hexagonal, los agentes no la van a descubrir por ti.

No construyes todo esto el primer día. Empiezas con un `CLAUDE.md`. Luego notas que repites instrucciones, y escribes un comando. Un agente rompe una convención, y añades una regla. Las revisiones tardan demasiado, y creas un agente revisor. El setup crece orgánicamente a partir de fricción real, no de diseño anticipado. Cada adición resuelve un problema que realmente tuviste.

Si quieres un punto de partida, preparé [laravel-claude-toolkit](https://github.com/Chemaclass/laravel-claude-toolkit): un starter kit de Laravel con reglas, comandos, skills, agentes, hooks y permisos ya configurados. Úsalo como referencia o haz fork para tu propio setup.

> No solo estás usando IA. Estás construyendo un equipo. Y como cualquier equipo, la calidad de su resultado refleja la calidad de su liderazgo.

## Recursos

- [Claude Code: Agent Teams](https://code.claude.com/docs/en/agent-teams) — la documentación oficial sobre orquestación de equipos de sesiones Claude Code con tareas compartidas, mensajería entre agentes y gestión centralizada

![blog-footer](/images/blog/2026-02-07/footer.jpg)
