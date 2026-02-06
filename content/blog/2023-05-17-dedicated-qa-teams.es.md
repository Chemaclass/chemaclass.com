+++
title = "¿Equipos de QA dedicados en software?"
description = "Esto será controvertido, pero hablemos de la posición de QA. La verdad oculta detrás de la falta de calidad del software y por qué esto debería preocuparte si escribes software."
draft = false
[taxonomies]
tags = [ "testing", "tdd", "agile", "clean-code" ]
[extra]
subtitle = "¿Cómo encaja una persona QA dedicada en tu equipo agile?"
static_thumbnail = "/images/blog/2023-05-17/cover.jpg"
related_posts = [
  "blog/2020-04-07-the-art-of-testing.md",
  "blog/2021-08-01-test-driven-development.md",
  "blog/2021-09-25-tdd-vs-bdd.md",
]
+++

![blog-cover](/images/blog/2023-05-17/cover.jpg)

Esto será controvertido, pero hablemos de la posición de QA. La verdad oculta detrás de la falta de calidad del software y por qué esto debería preocuparte si escribes software.

<!-- more -->

## QA es un rol, no una posición

Como desarrollador de software, cuando escribes software, eres responsable de la calidad de lo que sea que estés escribiendo. Una tercera persona actuando como QA podría encontrar que tu solución no funciona como se esperaba, pero ¿cómo es posible? Podrías argumentar que podrían encontrar casos límite, pero ¿cómo podría ser posible si el software ya fue testeado previamente?

El objetivo final de un equipo de software es hacer la posición de QA inútil porque no deberían encontrar nada más que software bien funcionando. Pero ¿cómo llegas a ese punto? ¿Cómo podemos asegurar que el software que escribimos funciona como se espera y no hay necesidad de una persona QA en nuestro equipo?

## La verdad oculta detrás de la falta de calidad del software

Desafortunadamente, en nuestra industria del software, la demanda de proyectos "rápidos, rápidos y sucios" terminó en MVPs pobremente desarrollados simplemente aplicando parches y código sobre código con solo testing manual comprobando caminos felices - a veces incluso ignorando casos límite.

> "La fecha límite es en una semana, ¡así que mejor termínalo a tiempo!"

No aprendemos la importancia de lo que el testing automatizado puede aportar a nuestro trabajo diario, así que no lo tomamos en serio, y por lo tanto, no lo practicamos lo suficiente. Y, por esa misma razón, porque no lo practicamos, no sabemos cómo realizarlo correctamente - ¡sí, estoy hablando de escribir tests automatizados que prueban el comportamiento de tu software!

Nuestra incapacidad para escribir código testeable resulta en software que es difícil de testear, y por lo tanto delegamos el testing a terceros trasladando la responsabilidad de la calidad final general del producto o servicio que escribimos.

## La práctica hace al maestro

Debes aprender y aplicar técnicas de testing apropiadas cuando tengan sentido. ¿Cómo y cuándo usar efectivamente dobles de test, preparar tests solitarios o sociables, qué compromisos y razones respaldan tu mente al elegir uno u otro camino hacia tus estrategias de testing?

Eres la última y principal persona responsable de tu conocimiento, así que mejor invierte en ti mismo porque nadie más lo hará por ti.

Mira todo lo que haces como una oportunidad de aprendizaje. Practica y mejora por defecto en todo lo que haces.

Si no sabes cómo empezar, aquí está mi consejo favorito: siempre puedes practicar y mejorar tus habilidades de testing usando katas de código. Lee más sobre este tema [aquí](/es/blog/test-driven-development/).

## Buena teoría, pero... ¿para qué molestarse?

El testing manual es, por supuesto, necesario. Es otra estrategia de testing que no estoy culpando o atacando. Aún podríamos necesitar una persona dedicada a cargo de descubrir qué nuevas funcionalidades queremos construir para satisfacer a nuestros clientes. Pero este post no es sobre esa posición.

Se trata de acortar el bucle de retroalimentación. Si puedes escribir software para que funcione de maneras específicas, ¿no puedes escribir tests automatizados para probar que el software que escribiste se comporta de la manera que esperas?

Si has cubierto con tests automatizados el comportamiento de tu software a cualquier nivel que tenga sentido, ¿qué queda para una persona QA dedicada?

La próxima vez que pienses "Necesitamos una persona QA para testear esto", intenta el ejercicio de pensar en cambio, "¿Cómo puedo escribir un test automatizado que verifique lo que esperaría si una persona QA estuviera comprobando esto?"

Y así es como cambias la "posición de QA a tiempo completo" en una "mentalidad de rol para todos los que escriben software."

El código nunca miente y nunca olvida; una vez que está escrito y automatizado en tu pipeline, puedes ejecutarlo en cualquier momento sin coste.

![blog-footer](/images/blog/2023-05-17/footer.jpg)
