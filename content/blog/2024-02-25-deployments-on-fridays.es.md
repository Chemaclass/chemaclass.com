+++
title = "Despliegues los viernes"
description = "He escuchado múltiples veces, de varias personas, la idea de pánico hacia desplegar los viernes. ¿Qué tan buena es esa idea de prohibir el día antes del fin de semana entregar nuevo valor a nuestros clientes?"
draft = false
[taxonomies]
tags = ["agile", "xp", "leadership", "productivity"]
[extra]
subtitle = "¿Por qué \"no deberíamos\" desplegar a producción los viernes?"
static_thumbnail = "/images/blog/2024-02-25/cover.jpg"
related_posts = [
  "blog/2022-06-08-the-path-to-seniority-in-software.md",
  "blog/2022-10-08-different-beliefs-about-software-quality.md",
  "blog/2023-05-17-dedicated-qa-teams.md",
]
related_readings = [
  "readings/2020-03-12-clean-agile.md",
  "readings/2021-12-07-the-five-dysfunctions-of-a-team.md",
  "readings/2020-03-05-extreme-programming-explained.md",
]
+++

![blog-cover](/images/blog/2024-02-25/cover.jpg)

He escuchado múltiples veces, de varias personas, la idea de pánico hacia desplegar los viernes. ¿Qué tan buena es esa idea de prohibir el día antes del fin de semana entregar nuevo valor a nuestros clientes?

<!-- more -->

El argumento principal a favor de NO desplegar el viernes se basa en la idea de que "deberíamos ser paranoicos" con nuestro software y que podría fallar cuando lo tocamos. Entonces, "deberíamos asumir" lo peor cada vez que desplegamos una nueva versión de nuestro sistema.

Sin embargo, el factor crítico aquí es ¿Por qué? ¿Por qué no deberíamos desplegar los viernes? ¿Está bien tener miedo de nuestro propio sistema de software, que vivimos en un pánico constante de romperlo el día después de haber hecho un despliegue? ¿Cuánto impacto deberían tener nuestras releases? ¿Cómo podemos asegurar que el despliegue no romperá el sistema en vivo?

Tus pipelines de Integración Continua/Entrega Continua, pruebas end-to-end y otros tipos de tests implementados, políticas de escalado automático, un sandbox de staging previo para realizar incluso pruebas manuales si es necesario, etc., determinarán la seguridad y confianza para cualquiera de tus releases. Sin embargo, la calidad de estos temas es un factor decisivo para tener suficiente confianza sobre cómo, cuándo y por qué tendría sentido hacer release a producción.

El objetivo es construir un sistema donde los despliegues a producción sean tan frecuentes, suaves y fáciles como sea posible; en cualquier momento, cualquier día. Tener miedo de tu sistema no debería ser el objetivo. Por el contrario, debería ser algo hacia lo que trabajar para solucionarlo.

Las dinámicas del equipo también son un factor esencial aquí. Si establecemos miedo a los despliegues los viernes, y miedo a nuestro sistema, eso terminará en falta de responsabilidad por defecto. Esto me recuerda a [The Five Dysfunctions of a Team](/es/readings/the-five-dysfunctions-of-a-team/).

![cover](/images/blog/2024-02-25/middle.jpg)

Si despliegas cambios pequeños y frecuentes tan pronto como pueden garantizar 100% de calidad y éxito de valor, ¿por qué retrasar tal mejora incremental a tu sistema?

Volviendo a "¿Por qué no deberíamos desplegar los viernes?" La única razón que se me ocurre es tener miedo de que tengamos que trabajar el sábado en la cosa rota que entregamos el viernes. Sin embargo, me pregunto si había alguna opción disponible, para que pudiéramos haber identificado tal cosa rota durante el propio viernes laborable.

Monitorear tu sistema en vivo es crucial para garantizar la salud después de cada despliegue. Esto es esencial para asegurar que todo funciona bien y sin problemas. Para construir un sistema resistente, esto debería activar alarmas para notificar a alguien responsable de abordar el problema, deshabilitar o revertir la última característica "rota"... hay muchas técnicas para crear conciencia y actuar sobre ellas.

En caso de duda, podrías usar feature flags para deshabilitar la característica que desplegarás. Aún así, prefieres no habilitarla durante el fin de semana mientras mantienes la opción de agregar valor y desplegar en cualquier momento siempre abierta.

Creo que las **releases frecuentes** y **pequeñas** a producción **son clave**; en cualquier momento, cualquier fecha, mientras tenga sentido, y haya un camino claro para traer valor pronto al cliente para obtener retroalimentación lo antes posible.

> Entrega valor de calidad en pequeños incrementos, tan frecuentemente como sea posible.

Poder desplegar los viernes (si es necesario o deseado) impacta la confianza del equipo. De manera similar, prohibir los despliegues los viernes impacta la autoestima del equipo también.

![cover](/images/blog/2024-02-25/footer.jpg)
