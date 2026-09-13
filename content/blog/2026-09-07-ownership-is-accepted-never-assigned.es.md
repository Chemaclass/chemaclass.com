+++
title = "El Ownership Se Acepta, Nunca Se Asigna"
description = "El ownership significa hacerse cargo de un problema hasta que la solución funcione. Requiere iniciativa, apoyo y autoridad para tomar decisiones."
draft = false
[taxonomies]
tags = [ "leadership", "career", "team-management", "communication" ]
[extra]
tldr = "Puedes asignar una tarea, pero el ownership hay que aceptarlo. Entiende el problema, comprueba que la solución funciona y mantén informadas a las personas implicadas. Los líderes deben darles la autoridad y el apoyo necesarios para hacerlo."
subtitle = "Puedes repartir tareas, no ownership"
static_thumbnail = "/images/blog/2026-09-20/cover.webp"
series = "leadership"
series_order = 9
related_posts = [
  "blog/2022-06-08-the-path-to-seniority-in-software.md",
  "blog/2023-05-17-dedicated-qa-teams.md",
  "blog/2025-04-12-ship-show-ask.md",
]
related_readings = [
  "readings/2020-03-05-extreme-programming-explained.md",
  "readings/2016-08-01-the-clean-coder.md",
  "readings/2021-09-12-turn-the-ship-around.md",
]
+++

Thorsten Ball [compartió un mensaje de Slack](https://x.com/thorstenball/status/2066907538499506349) sobre ownership. Usa la palabra a menudo con su equipo, pero llevaba tiempo sin explicar qué quería decir con ella.

Eso me hizo pensar. Yo también la he usado en posts sobre [seniority](/es/blog/the-path-to-seniority-in-software/), [calidad](/es/blog/dedicated-qa-teams/) y [liderazgo](/es/blog/the-beauty-of-leadership/). Pero ¿qué significa en la práctica?

Para mí, significa hacerse cargo de un problema hasta que la solución funcione para quienes la necesitan.

<!-- more -->

## Tienes que aceptarlo

Kent Beck lo explica con claridad en [Extreme Programming Explained](/es/readings/extreme-programming-explained/): la responsabilidad no se puede asignar, solo se puede aceptar.

Un manager puede poner tu nombre en un ticket. El ownership empieza cuando acuerdas el resultado y te comprometes a llevarlo hasta el final, incluso cuando falta algo en el ticket.

"Nadie me dijo nada" puede explicar por qué se pasó algo por alto. Una vez que lo ves, puedes preguntar, señalar el problema o ayudar a resolverlo.

## Entiende primero el problema

"Necesitamos pasar de X a Y."

¿Por qué? ¿El sistema actual es lento? ¿Falla para algunos clientes? ¿Es difícil de modificar?

La respuesta importa. Una migración puede ser lo adecuado, pero quizá un cambio más pequeño resuelva el mismo problema. Antes de elegir una solución, explica qué falla y a quién afecta.

Escribí sobre esto en [El Camino hacia la Seniority](/es/blog/the-path-to-seniority-in-software/): si no lo puedes explicar, todavía no tienes el ownership.

## Sigue hasta el final, también después del merge

Imagina que un cliente avisa de que una exportación falla. Corriges el código, añades un test y haces merge del PR. Todavía queda trabajo.

Comprueba que el cambio ha llegado a producción y que la exportación funciona para el cliente afectado. Avísale de que está solucionado. Revisa los logs más adelante para ver si el error vuelve a aparecer.

Lo mismo ocurre con una funcionalidad nueva. ¿Está activada? ¿La gente puede usarla? ¿Resuelve el problema inicial?

Los tests te ayudan a publicar con confianza. Usar la funcionalidad y comprobar cómo se comporta en producción te ayuda a detectar lo que se te pasó por alto.

## Mantén informadas a las personas implicadas

Tu trabajo afecta a otras personas. Un cambio de comportamiento, una convención nueva o un bug que has encontrado pueden importar para el trabajo de alguien más.

Compártelo con quienes necesitan saberlo. Si te atascas, explica dónde y qué ayuda necesitas. Si el plan cambia, explica por qué.

A esto me refiero con [trabajar con la puerta del garaje abierta](/es/blog/working-with-the-garage-door-open/). Da a los demás suficiente contexto para ayudar mientras el trabajo aún puede cambiar.

## Da espacio para decidir

Los líderes también tienen trabajo que hacer aquí. No puedes esperar que alguien se haga cargo de un resultado si tiene que pedir permiso para cada decisión.

[Turn the Ship Around](/es/readings/turn-the-ship-around/), de David Marquet, conecta tres cosas: autoridad para decidir, competencia para decidir bien y claridad sobre el objetivo.

Eso significa compartir contexto, ayudar a las personas a desarrollar las habilidades que necesitan y dejarles tomar decisiones. También significa escuchar cuando dicen que el alcance es demasiado grande o que necesitan más apoyo.

Pedir ownership no resuelve la falta de personal. La gente necesita tiempo y apoyo para llevar el trabajo hasta el final.

## Pide ayuda

El ownership no significa hacerlo todo tú solo. Trabaja en pareja con un compañero. Pide una revisión. Cuenta con alguien que conozca mejor el sistema.

Puedes delegar partes del trabajo y acordar quién se encarga de qué. Lo mismo ocurre al trabajar con agentes: [sigues siendo responsable de lo que llega a producción](/es/blog/the-human-bottleneck/).

Si traspasas el ownership, asegúrate de que la otra persona lo acepta y tiene el contexto necesario para continuar.

Lo importante es dejar esos acuerdos claros. Si no has comprobado quién se encarga de algo, no des por hecho que está cubierto.

En tu próxima tarea, mira más allá del merge. ¿Qué tiene que pasar para que la persona que avisó del problema pueda darlo por resuelto? Ocúpate de que ocurra.

{% <kudos> %}
Gracias a [Thorsten Ball](https://x.com/thorstenball/status/2066907538499506349) por el mensaje de Slack que dio origen a este post.
{% </kudos> %}

![blog-footer](/images/blog/2026-09-20/footer.webp)
