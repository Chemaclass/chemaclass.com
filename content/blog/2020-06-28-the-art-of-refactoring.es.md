+++
title = "El arte del refactoring"
description = "Si ves algo, en el ámbito de tu tarea actual, que puede mejorarse fácilmente, mejóralo. Y si tienes alguna pregunta al respecto, pregunta."
[taxonomies]
tags = [ "refactoring", "clean-code", "testing", "software-design"]
[extra]
subtitle = "Cuándo, cómo y por qué"
static_thumbnail = "/images/blog/2020-06-28/cover.jpg"
+++

![blog-cover](/images/blog/2020-06-28/cover.jpg)

Si ves algo, en el ámbito de tu tarea actual, que puede mejorarse fácilmente, mejóralo. Y si tienes alguna pregunta al respecto, pregunta.

<!-- more -->

## ¿Qué es el refactoring?

Refactoring significa mejorar tu código. Puede ir desde hacer un nombre de variable más legible, extraer algunas líneas de código en un método privado, o separar las responsabilidades de una clase en subclases, por ejemplo.

El refactoring es la acción de demostrar que te importa lo que haces como profesional. Puede ser un tema controvertido; de hecho es uno de los principales temas controvertidos desde hace mucho tiempo. Pero no deberíamos dejar de hacer lo mejor que podemos para mejorar la calidad del sistema solo por esa controversia.

## ¿Cuándo y cómo deberíamos refactorizar?

Siempre. En el ámbito de tu tarea actual, a menos que sea una tarea ya planificada, algo como "refactoring de arquitectura" o similar, donde el ámbito de la tarea es precisamente hacer refactoring.

> El refactoring debería ser parte de nuestro trabajo diario, no una tarea separada por defecto.

No necesitamos pedir permiso para refactorizar. ¿O acaso pedimos permiso a nuestros managers para hacer nuestro mejor trabajo?

Para hacer un refactoring adecuado, la intención de dicho refactoring necesita estar clara. ¿Qué se pretende lograr y cómo? El pair programming (¡o incluso el pair thinking!) ciertamente ayuda en este tema porque sincroniza dos cerebros en el mismo tema y eso fomenta la construcción de equipo y una mejor comprensión mutua.

Aplicar refactoring de forma colaborativa, en un "canal bidireccional", es fundamental cuando se trabaja en equipo. El refactoring no debería ser un tema tabú, al contrario: será útil para unificar los objetivos y la dirección de la calidad del código del equipo.

### Algunos consejos personales sobre el "cómo"

La mejora continua es lo que buscamos en este tema, pero…
* Si te das cuenta de que tus cambios están generando más ruido que ayuda, detente inmediatamente y piensa de nuevo si tus cambios valen la pena en el estado actual del sistema.

Quizás no es el momento adecuado para ese refactoring.

Quizás estás contaminando tu diff actual con cambios fuera del ámbito.

O quizás tu idea de refactoring es demasiado grande para aplicarla en tu tarea actual. En tal caso, una tarea de seguimiento (para aplicar el refactoring) sería una mejor idea.

* Si ves que el refactoring quizás es necesario incluso antes de empezar tu tarea actual, haz el refactoring primero.

Normalmente refactorizamos para aumentar nuestra productividad, haciendo el código más legible y por tanto más fácil de entender.

### Testing

Ten en cuenta que deberías tener un conjunto bastante bueno de tests cubriendo la lógica que podrías haber cambiado. Sin tests, el refactoring puede ser realmente arriesgado. Normalmente, cuanto más fácil es testear algo, más fácil es reemplazarlo o eliminarlo.

Puedes leer más sobre cómo el testing está relacionado con la calidad aquí.

## ¿Por qué deberíamos hacerlo?

¿No querrías tener un sistema mejor con el paso del tiempo?

El software no es como el vino: no mejora con el tiempo. Por lo tanto, si quieres tener un sistema mejor, debes trabajar para conseguirlo.

![blog-img](/images/blog/2020-06-28/footer.jpg)
