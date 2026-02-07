+++
title = "Construye tu propio equipo de agentes"
description = "La mayoría usa la IA como un solo asistente. La verdadera ventaja viene cuando la organizas como un equipo: documentación de onboarding, procedimientos estándar, especialistas y ejecución en paralelo."
draft = false
[taxonomies]
tags = [ "ai", "developer-tools", "craftsmanship" ]
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

Pero `CLAUDE.md` es solo el punto de entrada. Puedes dividir las reglas en archivos enfocados bajo `.claude/rules/`, cada uno apuntando a partes específicas de tu código mediante patrones glob. El agente no solo conoce tus convenciones, está limitado por ellas. Límites de capas, patrones de nomenclatura, dirección de dependencias. Todo versionado junto al código que protegen.

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

### Primero planificar, después ejecutar

Los buenos equipos no se ponen a programar directamente. Discuten el enfoque, identifican dependencias, acuerdan un plan. El modo plan de Claude Code funciona igual: describes el problema, el agente explora el código, mapea dependencias y propone un enfoque antes de cambiar nada. Lo apruebas, modificas o rechazas. Pensar primero, programar después.

### Ejecución en paralelo

Una vez hay plan, las tareas independientes pueden ejecutarse en paralelo. Dividir el trabajo, asignarlo y dejar que los agentes trabajen sin bloquearse mutuamente.

{% deep_dive(title="Backend + Frontend en paralelo") %}

Imagina que estás construyendo una funcionalidad que toca tanto backend como frontend. Después de planificar:

- Un **agente de backend** genera la capa de dominio: entidades, value objects, interfaces de repositorio, handlers de casos de uso. Todo siguiendo arquitectura hexagonal, todo test-first.
- Un **agente de frontend** construye la página React, componentes, hooks y factories. Cada uno sigue sus propias reglas, usa sus propios skills y opera de forma independiente.

No se pisan porque el plan ya definió los límites. El agente de backend trabaja dentro de `modules/*/Domain/` y `modules/*/Application/`. El agente de frontend dentro de `resources/js/pages/`. Propiedad clara. Sin conflictos de merge. Sin esperas.

{% end %}

### Revisión tras la ejecución

Tras la implementación, los agentes de revisión toman el relevo. En lugar de un revisor que lo pilla todo, tienes especialistas: revisor de código limpio para violaciones SOLID, revisor de React para patrones de componentes, coach de TDD para calidad de tests, arquitecto de dominio para límites de módulos.

> Un solo agente es un asistente. Múltiples agentes trabajando desde un plan compartido es un equipo.

## Tú sigues siendo el lead

Por muy bien configurados que estén, los agentes trabajan para ti. Tú estableces los estándares, defines los procedimientos, escribes las reglas, revisas los planes y apruebas el resultado antes de que salga.

Como escribí en [La IA te da velocidad, no calidad](/blog/ai-gives-you-speed-not-quality/), el código que produce el agente es tu responsabilidad. Más paralelismo sin supervisión es solo más caos, más rápido.

### Puertas de calidad

Los hooks y git hooks actúan como la última red de seguridad. En mi setup, nada se commitea a menos que los linters pasen, el análisis estático esté limpio, los tests sean verdes y la cobertura supere el 90%. El agente no puede saltarse esto. Nadie puede.

### La base importa

Los agentes te ayudarán a llegar más rápido, pero ese "allí" tiene que estar bien definido. Si no sabes cómo es la arquitectura hexagonal, los agentes no la van a descubrir por ti. La inversión está en la base: define tu arquitectura, escribe tus reglas, codifica tus estándares. Después deja que los agentes ejecuten a velocidad sin comprometer la calidad que definiste.

> No solo estás usando IA. Estás construyendo un equipo. Y como cualquier equipo, la calidad de su resultado refleja la calidad de su liderazgo.
