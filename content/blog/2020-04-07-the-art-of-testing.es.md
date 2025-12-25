+++
title = "El arte del testing: donde el diseño se encuentra con la calidad"
description = "Por qué deberías considerar el testing como parte de tu hábito diario de desarrollo y cómo está directamente vinculado a la calidad del software."
[taxonomies]
tags = [ "testing", "software-design", "clean-code", "tdd"]
[extra]
subtitle = "Desde el punto de vista de un desarrollador de software"
static_thumbnail = "/images/blog/2020-04-07/cover.jpg"
+++

![blog-cover](/images/blog/2020-04-07/cover.jpg)

Por qué deberías considerar el testing como parte de tu hábito diario de desarrollo y cómo está directamente vinculado a la calidad del software.

<!-- more -->

Este post no pretende explicar las diferentes técnicas de testing que podemos usar. No voy a contarte las diferencias entre testing unitario, de integración, de funcionalidad o end-to-end.

Todavía me sorprende la falta de experiencia con testing en software en general. Una ignorancia común en este mundo sobre las mejores prácticas de testing para nosotros como desarrolladores. Una inexperiencia que puedes ver fácilmente si ya has trabajado en diferentes proyectos y equipos.

### Testing de software

Algunos patrones horribles que he visto (y hecho):

* Testear por testear: testear cada archivo individual, a veces considerado erróneamente una unidad.
* Mockear cada clase que pretendemos testear, anulando la implementación real y creando un comportamiento falso, proporcionando una falsa percepción de cobertura.
* Acoplar el código de producción con los tests en todas partes, haciendo imposible cambiar algo sin romper algunos tests, incluso si la funcionalidad en sí funciona como se esperaba.
* No testear en absoluto porque "¿por qué deberíamos testear algo si la funcionalidad está hecha y funciona? ¿Por qué deberíamos gastar más tiempo en esto si ya está terminado?"

Una de las principales razones del testing de software es verificar un conjunto de pruebas del comportamiento esperado de la pieza final de software. Sin embargo, el testing puede (y debería) ser más que eso.

### Diseño de software

El diseño de software va desde el diseño de algoritmos hasta el diseño de arquitectura. Aunque creo que estos dos niveles de componentes tienen diferentes necesidades y requisitos, todavía comparten algunos patrones comunes. Por ejemplo, el testing, y de esto es de lo que vamos a hablar ahora:

> Si es fácil de testear, probablemente será debido a un buen diseño.

### Calidad del software

¿Es difícil medir la calidad? Sin duda. Hay diferentes claves de medición que deberíamos tener en cuenta al considerar la calidad de cualquier pieza de software. Aún así, estoy seguro de que podríamos estar de acuerdo en esto:

> Si aspiras a la calidad en tu software, mejor busca un buen diseño.

Testear por sí mismo significa "probar", como todos sabemos. Dicho esto... ¿qué difícil resulta a veces probar alguna lógica que finalmente abandonamos debido a su complejidad?

El arte del testing consiste en usar el testing mismo para ayudar y contribuir al resultado final. Para fomentar el buen diseño, supongamos que somos capaces de usar el testing (de cualquier tipo) a nuestro favor, dependiendo del contexto de lo que queremos probar. En ese caso, sin duda nos ayudará a aumentar la calidad final del producto.

Por lo tanto, el testing debería usarse no solo para probar el comportamiento de nuestro software, sino también para guiar nuestro software hacia un mejor diseño.

¿Deberíamos testear todo? Bueno, esa es la pregunta del millón. En mi opinión, todo depende del contexto. Podemos encontrarnos situaciones donde los tests podrían no ser beneficiosos. Incluso en esas situaciones, deberíamos escribir nuestro código como si pudiera ser testeado de todos modos.

![blog-cover](/images/blog/2020-04-07/footer.jpg)

> El código testeable tiende a un mejor diseño y, por lo tanto, a mejor calidad.
