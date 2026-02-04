+++
title = "Ship, Show, Ask"
description = "En equipos que se mueven rápido, una de las mayores tensiones que enfrentamos es esta: ¿Cómo seguimos entregando sin comprometer la calidad o la colaboración? El enfoque tradicional de pull requests a menudo ralentiza las cosas. Esperamos horas—o días—por aprobaciones, incluso para cambios triviales. Pero la alternativa—simplemente mergear directamente—puede sentirse imprudente o invisible para el resto del equipo. Ahí es donde entra la estrategia Ship-Show-Ask."
draft = false
[taxonomies]
tags = [ "agile", "code-review", "team-management", "productivity" ]
[extra]
subtitle = "Colaboración impulsada por la cultura a la velocidad del código"
static_thumbnail = "/images/blog/2025-04-12/cover.jpg"
+++

![blog-cover](/images/blog/2025-04-12/cover.jpg)

En equipos que se mueven rápido, una de las mayores tensiones que enfrentamos es esta: ¿Cómo seguimos entregando sin comprometer la calidad o la colaboración?

El enfoque tradicional de pull requests a menudo ralentiza las cosas. Esperamos horas—o días—por aprobaciones, incluso para cambios triviales. Pero la alternativa—simplemente mergear directamente—puede sentirse imprudente o invisible para el resto del equipo.

<!-- more -->

Ahí entra Ship-Show-Ask. [Rouan Wilsenach](https://martinfowler.com/articles/ship-show-ask.html) describió este modelo que ofrece una forma más flexible de manejar cambios de código. No es solo una estrategia de branching. Es un cambio en cómo los equipos colaboran, confían y asumen responsabilidad.

## ¿Qué es Ship, Show, Ask?

Es un modelo que clasifica los cambios basándose en cuánta revisión requieren:

- **Ship** – Mergear directamente a main (sin PR)
- **Show** – Abrir un pull request, pero mergearlo inmediatamente
- **Ask** – Abrir un pull request y esperar revisión

La idea es usar Ask por defecto para la mayoría del trabajo, recurrir a Show cuando el contexto lo permite, y evitar Ship (o reservarlo para casos triviales).

## Por qué prefiero Ask y Show

Por experiencia, ayuda tratar cada cambio como algo que vale la pena compartir, incluso los pequeños. Siempre creo una rama y abro un PR. Da visibilidad, construye un historial compartido y crea espacio para feedback opcional o asíncrono.

Pero no todos los PRs necesitan seguir el mismo proceso de revisión.

### Por defecto uso Ask

Prefiero esperar una revisión de un compañero cuando:

- El cambio involucra lógica arriesgada o compleja
- Podría impactar a otros desarrolladores o equipos
- Introduce decisiones arquitectónicas o estructurales que no se han acordado aún
- Se beneficia de input compartido o un segundo par de ojos

Eso sí, **Ask no significa complicar el proceso**. Muchas veces basta un revisor que conozca el dominio. Si el cambio toca un área específica, pido feedback a la persona que mejor la conoce. No hace falta involucrar a todos.

> En equipos pequeños, exigir dos aprobaciones en cada PR se convierte rápido en un cuello de botella. El objetivo es alineamiento y calidad, no ceremonia por sí misma.

### Uso Show para cambios seguros y de bajo impacto

Podría mergear inmediatamente cuando:

- Practico pair programming (la revisión ya ocurrió en vivo)
- Corrijo erratas o enlaces rotos
- Actualizo documentación o changelogs
- Refactorizo dentro de un módulo que poseo
- Añado tests para comportamiento existente
- Hago ajustes no funcionales (formato, logs, comentarios)
- Aplico ajustes de UI o estilo sin cambio de lógica

El principio clave: **Show es opcional, nunca obligatorio**. Lo uso solo si el cambio es de bajo riesgo y encaja con las expectativas del equipo. Cuando hago Show, asumo la responsabilidad del resultado.

## Por qué este enfoque funciona para mí

Este modelo me ayuda a:

- Entregar más rápido sin sacrificar calidad
- Trabajar con más autonomía
- Evitar cuellos de botella, sobre todo en equipos pequeños o asíncronos
- Fomentar confianza, responsabilidad y decisiones reflexivas

> El objetivo deja de ser obtener aprobación. Pasa a compartir intención y hacerte dueño del resultado.

## ¿Qué hace un buen "Show"?

Un PR Show puede ser buena opción cuando:

- El cambio es trivial y está en mi área de responsabilidad
- Nadie puede revisar y esperar bloquearía el progreso
- El PR incluye contexto y razonamiento claro
- Estoy abierto a feedback después del merge
- Puedo hacer ajustes de seguimiento si hace falta

## Consejos para que funcione

Algunos consejos prácticos:

- Aclara con el equipo cuándo usar Show vs Ask
- Siempre da contexto en tu PR, aunque lo mergees de inmediato
- Escribe tests para lógica o comportamiento nuevo
- Acepta feedback después del merge. La revisión no termina ahí
- Revisa periódicamente como equipo y ajusta el enfoque

---

Ship, Show, Ask es más que higiene de branching.

Para mí, se trata de construir una cultura de claridad, responsabilidad y confianza. Los desarrolladores pueden moverse rápido sin dejar de pensar bien las cosas.

Si estás harto de colas lentas de PR y procesos de aprobación excesivos, quizá valga la pena probarlo.

> ¿Curioso por profundizar? Mira el [post de Rouan Wilsenach](https://martinfowler.com/articles/ship-show-ask.html).

![footer](/images/blog/2025-04-12/footer.jpg)

---

**Posts relacionados**

- [Pair programming efectivo](/es/blog/effective-pair-programming/) <small>Abrazando prácticas de calidad en tu cultura de ingeniería</small>
- [El camino a la seniority en software](/es/blog/the-path-to-seniority-in-software/) <small>¿Cómo convertirse en un Desarrollador de Software Senior?</small>
- [Deploys en viernes](/es/blog/deployments-on-fridays/) <small>¿Por qué "no deberíamos" deployar a producción los viernes?</small>
- [Gran ingeniería](/es/blog/great-engineering/) <small>Un gran ingeniero no es solo un gran programador</small>
- [Habilidades interpersonales](/es/blog/people-skills/) <small>Del código a la colaboración</small>
