+++
title = "¿Equipos de QA dedicados en software?"
description = "Esto va a ser controvertido, pero hablemos del rol de QA. La verdad detrás de la falta de calidad del software y por qué debería importarte si escribes código."
draft = false
[taxonomies]
tags = [ "testing", "tdd", "agile", "clean-code" ]
[extra]
subtitle = "¿Cómo encaja una persona QA dedicada en tu equipo agile?"
static_thumbnail = "/images/blog/2023-05-17/cover.jpg"
+++

![blog-cover](/images/blog/2023-05-17/cover.jpg)

Esto va a ser controvertido, pero hablemos del rol de QA. La verdad detrás de la falta de calidad del software y por qué debería importarte si escribes código.

<!-- more -->

## QA es un rol, no un puesto

Cuando escribes software, eres responsable de su calidad. Si alguien de QA encuentra que tu solución no funciona como debería... ¿cómo es posible? Dirás que podrían encontrar casos límite, pero ¿cómo, si el software ya estaba testeado?

El objetivo de un equipo de software debería ser hacer que el puesto de QA sea innecesario. Que no encuentren nada más que software funcionando bien. Pero ¿cómo llegas ahí? ¿Cómo aseguras que lo que escribes funciona como esperas sin necesitar a alguien de QA en tu equipo?

## La verdad detrás de la falta de calidad

Por desgracia, en nuestra industria la demanda de proyectos "rápido, rápido y sucio" ha terminado en MVPs mal desarrollados. Parches sobre parches, código sobre código, con testing manual que solo comprueba caminos felices. A veces ni siquiera se miran los casos límite.

> "La fecha límite es en una semana, asi que mejor termínalo a tiempo!"

No aprendemos lo que el testing automatizado puede aportar a nuestro día a día. No lo tomamos en serio y no lo practicamos lo suficiente. Y precisamente porque no lo practicamos, no sabemos hacerlo bien. Sí, hablo de escribir tests automatizados que prueban el comportamiento de tu software.

Nuestra incapacidad para escribir código testeable produce software difícil de testear. Y entonces delegamos el testing a terceros, pasándoles la responsabilidad de la calidad final.

## La práctica hace al maestro

Hay que aprender y aplicar técnicas de testing cuando tengan sentido. ¿Cómo y cuándo usar dobles de test? ¿Tests solitarios o sociables? ¿Qué compromisos hay detrás de cada decisión en tu estrategia de testing?

Eres el principal responsable de tu conocimiento. Invierte en ti mismo porque nadie lo hará por ti.

Mira todo lo que haces como una oportunidad de aprender. Practica y mejora en todo lo que hagas.

Si no sabes cómo empezar, aquí va mi consejo favorito: practica tus habilidades de testing con katas de código. Lee más sobre esto [aquí](/es/blog/test-driven-development/).

## Buena teoría, pero... ¿para qué molestarse?

El testing manual es necesario, claro. Es otra estrategia de testing que no estoy atacando. Puede que necesitemos a alguien dedicado a descubrir qué funcionalidades nuevas queremos para satisfacer a nuestros clientes. Pero este post no va de eso.

Va de acortar el bucle de feedback. Si puedes escribir software que funcione de formas específicas, ¿no puedes escribir tests automatizados que prueben que se comporta como esperas?

Si has cubierto el comportamiento de tu software con tests automatizados a cualquier nivel que tenga sentido, ¿qué queda para una persona QA dedicada?

La próxima vez que pienses "Necesitamos a alguien de QA para testear esto", prueba a pensar: "¿Cómo puedo escribir un test automatizado que verifique lo que esperaría si alguien de QA lo estuviera comprobando?"

Así es como pasas de "puesto de QA a tiempo completo" a "mentalidad de calidad para todos los que escriben software".

El código nunca miente y nunca olvida. Una vez escrito y automatizado en tu pipeline, puedes ejecutarlo cuando quieras sin coste.

![blog-footer](/images/blog/2023-05-17/footer.jpg)


---

**Posts relacionados**

- [TDD vs BDD](/es/blog/tdd-vs-bdd/) <small>¿Diseño o Flujo de trabajo?</small>
- [Test-Driven (Development)](/es/blog/test-driven-development/) <small>¿Qué tiene de desafiante?</small>
- [Donde el diseño se encuentra con la calidad](/es/blog/the-art-of-testing/) <small>Desde el punto de vista de un desarrollador de software</small>
