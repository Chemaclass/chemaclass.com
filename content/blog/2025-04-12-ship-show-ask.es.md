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

<div class="tldr">

Ship-Show-Ask te permite elegir cuánta revisión necesita cada cambio. Por defecto Ask para trabajo arriesgado, usa Show para cambios seguros que puedes mergear inmediatamente. Se trata de confianza, propiedad y moverse rápido sin comprometer la calidad.

</div>

Ahí es donde entra la estrategia Ship-Show-Ask. Originalmente descrita por [Rouan Wilsenach](https://martinfowler.com/articles/ship-show-ask.html), este modelo ofrece una forma más flexible y reflexiva de manejar cambios de código. No es solo una estrategia de branching—es un cambio en cómo los equipos colaboran, confían y toman propiedad.

## ¿Qué es Ship, Show, Ask?

Es un modelo que clasifica los cambios basándose en cuánta revisión requieren:

- **Ship** – Mergear directamente a main (sin PR)
- **Show** – Abrir un pull request, pero mergearlo inmediatamente
- **Ask** – Abrir un pull request y esperar revisión

La idea clave es usar Ask como el default para la mayoría del trabajo, recurrir a Show cuando el contexto lo hace seguro, y evitar Ship (o reservarlo para casos extremadamente triviales, si se usa).

## Por qué prefiero Ask y Show

En mi experiencia, ayuda tratar cada cambio—incluso los pequeños—como algo que vale la pena compartir. Siempre creo una rama y abro un PR. Proporciona visibilidad, construye un historial compartido, y crea un espacio para feedback opcional o asíncrono.

Pero no todos los PRs necesitan seguir el mismo proceso de revisión.

### Por defecto uso Ask

Prefiero esperar una revisión de un compañero cuando:

- El cambio involucra lógica arriesgada o compleja
- Podría impactar a otros desarrolladores o equipos
- Introduce decisiones arquitectónicas o estructurales que no se han acordado aún
- Se beneficia de input compartido o un segundo par de ojos

Dicho esto, **Ask no significa sobre-ingeniar el proceso**. A menudo, un revisor reflexivo es suficiente—especialmente si está familiarizado con el dominio. Si el cambio toca un área específica, pediré feedback de la persona que posee (o mejor entiende) esa parte del código. No necesita involucrar a todos.

> En equipos pequeños, requerir dos aprobaciones en cada PR puede convertirse rápidamente en un cuello de botella y ralentizar la entrega de valor. El objetivo es alineamiento y calidad, no ceremonia por sí misma.

### Uso Show para cambios seguros y de bajo impacto

Podría mergear inmediatamente cuando:

- Practico pair programming (la revisión ya ocurrió en vivo)
- Corrijo erratas o enlaces rotos
- Actualizo documentación o changelogs
- Refactorizo dentro de un módulo que poseo
- Añado tests para comportamiento existente
- Hago ajustes no funcionales (formato, logs, comentarios)
- Aplico ajustes de UI o estilo sin cambio de lógica

El principio clave: **Show es opcional—nunca obligatorio**. Elijo Show solo si el cambio es de bajo riesgo y encaja con las expectativas del equipo. Cuando uso Show, me hago responsable del resultado. La responsabilidad es mía.

## Por qué este enfoque funciona para mí

Este modelo me ayuda a:

- Entregar más rápido sin comprometer la calidad
- Trabajar con mayor autonomía y propiedad
- Evitar cuellos de botella, especialmente en equipos pequeños o async
- Fomentar una mentalidad de confianza, responsabilidad y toma de decisiones reflexiva

> Cambia el objetivo de simplemente obtener aprobación a compartir intención y ser dueño del resultado.

## ¿Qué hace un buen "Show"?

Un PR Show podría ser la elección correcta cuando:

- El cambio es trivial y dentro de mi área de responsabilidad
- Nadie está disponible para revisar, y esperar bloquearía el progreso
- El PR incluye contexto y razonamiento claro
- Estoy abierto a feedback post-merge
- Estoy listo para hacer ajustes de seguimiento si es necesario

## Consejos para que funcione

Algunos consejos prácticos de la experiencia:

- Clarifica las expectativas del equipo sobre cuándo usar Show vs Ask
- Siempre proporciona contexto en tu PR—incluso si mergeas inmediatamente
- Escribe tests para cualquier lógica o comportamiento nuevo
- Da la bienvenida al feedback post-merge—la revisión no termina en el merge
- Reflexiona regularmente como equipo y ajusta el enfoque según sea necesario

---

Ship, Show, Ask es más que higiene de branching.

Para mí, se trata de construir una cultura de claridad, responsabilidad y confianza—donde los desarrolladores están empoderados para moverse rápido mientras permanecen reflexivos.

Si estás cansado de colas lentas de PR y aprobaciones sobre-ingeniadas, esto podría valer la pena intentarlo.

> ¿Curioso por profundizar? Mira el [post de Rouan Wilsenach](https://martinfowler.com/articles/ship-show-ask.html).

![footer](/images/blog/2025-04-12/footer.jpg)

---

**Posts relacionados**

- [Pair programming efectivo](/es/blog/effective-pair-programming/) <small>Abrazando prácticas de calidad en tu cultura de ingeniería</small>
- [El camino a la seniority en software](/es/blog/the-path-to-seniority-in-software/) <small>¿Cómo convertirse en un Desarrollador de Software Senior?</small>
- [Deploys en viernes](/es/blog/deployments-on-fridays/) <small>¿Por qué "no deberíamos" deployar a producción los viernes?</small>
- [Gran ingeniería](/es/blog/great-engineering/) <small>Un gran ingeniero no es solo un gran programador</small>
- [Habilidades interpersonales](/es/blog/people-skills/) <small>Del código a la colaboración</small>
