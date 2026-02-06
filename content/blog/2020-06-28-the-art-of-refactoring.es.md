+++
title = "El arte del refactoring"
description = "Si ves algo, en el ámbito de tu tarea actual, que puede mejorarse fácilmente, mejóralo. Y si tienes alguna pregunta al respecto, pregunta."
[taxonomies]
tags = [ "refactoring", "clean-code", "testing", "software-design"]
[extra]
subtitle = "Cuándo, cómo y por qué"
static_thumbnail = "/images/blog/2020-06-28/cover.jpg"
related_posts = [
  "blog/2020-04-07-the-art-of-testing.md",
  "blog/2020-08-17-testing-effectively-legacy-code.md",
  "blog/2021-08-01-test-driven-development.md",
]
related_readings = [
  "readings/2016-05-01-clean-code.md",
  "readings/2019-07-01-working-effectively-with-legacy-code.md",
  "readings/2022-07-11-clean-craftsmanship.md",
]
+++

![blog-cover](/images/blog/2020-06-28/cover.jpg)

Si ves algo, en el ámbito de tu tarea actual, que puede mejorarse fácilmente, mejóralo. Y si tienes alguna pregunta al respecto, pregunta.

<!-- more -->

## ¿Qué es el refactoring?

Refactoring significa mejorar tu código. Puede ser renombrar una variable, extraer líneas en un método privado, o separar responsabilidades de una clase en varias.

El refactoring demuestra que te importa lo que haces como profesional. Es un tema controvertido desde hace tiempo. Pero eso no debería frenarnos de mejorar la calidad del sistema.

## ¿Cuándo y cómo refactorizar?

Siempre. Dentro del ámbito de tu tarea actual, a menos que sea una tarea planificada específicamente para refactoring de arquitectura.

> El refactoring debería ser parte del trabajo diario, no una tarea separada.

No necesitamos pedir permiso para refactorizar. ¿Acaso pedimos permiso para hacer nuestro mejor trabajo?

Para refactorizar bien, la intención debe estar clara. ¿Qué queremos lograr y cómo? El pair programming (o incluso el "pair thinking") ayuda porque sincroniza dos cerebros y fomenta mejor comprensión mutua.

Refactorizar de forma colaborativa es fundamental en equipo. No debería ser tabú. Al contrario: ayuda a unificar objetivos y dirección de calidad del código.

### Algunos consejos sobre el "cómo"

Buscamos mejora continua, pero...

* Si tus cambios generan más ruido que ayuda, para. Piensa si valen la pena en el estado actual del sistema. Quizás no es el momento. Quizás estás contaminando el diff con cambios fuera del ámbito. O quizás es demasiado grande para tu tarea actual. En ese caso, mejor crear una tarea de seguimiento.

* Si el refactoring es necesario antes de empezar tu tarea, hazlo primero.

Refactorizamos para aumentar productividad: código más legible es código más fácil de entender.

### Testing

Necesitas un buen conjunto de tests cubriendo la lógica que vas a cambiar. Sin tests, refactorizar es arriesgado. Por lo general, cuanto más fácil es testear algo, más fácil es reemplazarlo o eliminarlo.

Puedes leer más sobre cómo el testing está relacionado con la calidad aquí.

## ¿Por qué hacerlo?

¿No querrías un sistema mejor con el tiempo?

El software no es como el vino: no mejora solo. Si quieres un sistema mejor, tienes que trabajar para conseguirlo.

![blog-img](/images/blog/2020-06-28/footer.jpg)
