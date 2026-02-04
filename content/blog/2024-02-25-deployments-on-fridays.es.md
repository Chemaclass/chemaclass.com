+++
title = "Despliegues los viernes"
description = "He escuchado múltiples veces, de varias personas, la idea de pánico hacia desplegar los viernes. ¿Qué tan buena es esa idea de prohibir el día antes del fin de semana entregar nuevo valor a nuestros clientes?"
draft = false
[taxonomies]
tags = ["agile", "xp", "leadership", "productivity"]
[extra]
subtitle = "¿Por qué \"no deberíamos\" desplegar a producción los viernes?"
static_thumbnail = "/images/blog/2024-02-25/cover.jpg"
+++

![blog-cover](/images/blog/2024-02-25/cover.jpg)

He escuchado múltiples veces, de varias personas, la idea de pánico hacia desplegar los viernes. ¿Qué tan buena es esa idea de prohibir el día antes del fin de semana entregar nuevo valor a nuestros clientes?

<!-- more -->

El argumento principal para NO desplegar el viernes se basa en que "hay que ser paranoicos" con nuestro software porque podria fallar al tocarlo. Segun esta logica, hay que asumir lo peor cada vez que desplegamos una nueva version.

Pero la pregunta clave es: ¿por que? ¿Esta bien tener miedo de nuestro propio sistema, viviendo en panico constante de romperlo tras cada despliegue? ¿Cuanto impacto deberian tener nuestras releases? ¿Como aseguramos que un despliegue no rompa el sistema en produccion?

Tus pipelines de CI/CD, pruebas end-to-end, tests automatizados, politicas de escalado automatico, un entorno de staging para pruebas manuales... todo esto determina la seguridad y confianza de tus releases. La calidad de estas practicas define cuanta confianza tienes para decidir como, cuando y por que desplegar a produccion.

El objetivo es construir un sistema donde los despliegues a produccion sean frecuentes, suaves y faciles; en cualquier momento, cualquier dia. Tener miedo de tu sistema no es el objetivo. Al contrario: si lo tienes, hay que trabajar para solucionarlo.

Las dinamicas del equipo tambien importan. Si establecemos miedo a los despliegues los viernes y miedo al sistema, acabaremos con falta de responsabilidad por defecto. Me recuerda a [Las cinco disfunciones de un equipo](/es/readings/the-five-dysfunctions-of-a-team/).

![cover](/images/blog/2024-02-25/middle.jpg)

Si despliegas cambios pequenos y frecuentes que garantizan calidad y valor, ¿por que retrasar esa mejora incremental?

Volviendo a "¿Por que no desplegar los viernes?": la unica razon que se me ocurre es el miedo a trabajar el sabado arreglando lo que rompimos el viernes. Pero me pregunto si no habia forma de detectar ese problema durante el propio viernes laboral.

Monitorear tu sistema en produccion es clave tras cada despliegue. Un sistema resistente debe activar alarmas que notifiquen al responsable para actuar: deshabilitar o revertir la ultima funcionalidad rota. Hay muchas tecnicas para detectar problemas y actuar rapido.

En caso de duda, puedes usar feature flags para deshabilitar la funcionalidad que vas a desplegar. Asi, no la habilitas durante el fin de semana pero mantienes la opcion de agregar valor y desplegar en cualquier momento.

Las **releases frecuentes** y **pequenas** a produccion **son clave**: cualquier momento, cualquier dia, siempre que tenga sentido y haya un camino claro para entregar valor al cliente y obtener feedback cuanto antes.

> Entrega valor de calidad en pequeños incrementos, tan frecuentemente como sea posible.

Poder desplegar los viernes (si es necesario o deseado) refuerza la confianza del equipo. Prohibirlo tambien impacta la autoestima del equipo.

![cover](/images/blog/2024-02-25/footer.jpg)

---

**Posts relacionados**

- [El camino a la seniority en software](/es/blog/the-path-to-seniority-in-software/) <small>¿Cómo convertirse en un Desarrollador de Software Senior?</small>
- [Diferentes creencias sobre la calidad del software](/es/blog/different-beliefs-about-software-quality/) <small>Algunas reflexiones sobre la calidad del software</small>
- [¿Equipos de QA dedicados en software?](/es/blog/dedicated-qa-teams/) <small>¿Cómo encaja una persona QA dedicada en tu equipo agile?</small>

**Lecturas relacionadas**

- [Clean Agile](/es/readings/clean-agile/) <small>por Robert C. Martin</small>
- [Extreme Programming Explained](/es/readings/xp-embrace-change/) <small>por Kent Beck</small>
- [The Five Dysfunctions of a Team](/es/readings/the-five-dysfunctions-of-a-team/) <small>por Patrick M. Lencioni</small>
