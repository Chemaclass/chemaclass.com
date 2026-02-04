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

¿Por qué considerar el testing parte de tu desarrollo diario? Porque está directamente vinculado a la calidad del software.

<!-- more -->

No voy a explicar las diferentes técnicas de testing ni las diferencias entre tests unitarios, de integración, funcionales o end-to-end.

Me sigue sorprendiendo la falta de experiencia con testing en el mundo del software. Hay una ignorancia generalizada sobre buenas prácticas. Si has trabajado en varios proyectos y equipos, seguro que lo has visto.

### Testing de software

Algunos patrones horribles que he visto (y hecho):

* Testear por testear: testear cada archivo individual, confundiéndolo con una "unidad".
* Mockear cada clase, anulando la implementación real y creando comportamiento falso. Esto da una falsa sensación de cobertura.
* Acoplar código de producción con tests por todas partes. Imposible cambiar nada sin romper tests, aunque la funcionalidad siga funcionando.
* No testear nada porque "ya funciona, ¿para qué perder más tiempo?"

Una razón principal del testing es verificar el comportamiento esperado del software. Pero el testing puede (y debería) ser mucho más que eso.

### Diseño de software

El diseño de software abarca desde algoritmos hasta arquitectura. Aunque estos dos niveles tienen necesidades distintas, comparten patrones comunes. Por ejemplo, el testing:

> Si es fácil de testear, probablemente será debido a un buen diseño.

### Calidad del software

Medir la calidad es difícil. Hay muchas métricas a considerar. Aun así, seguro que podemos estar de acuerdo en esto:

> Si aspiras a la calidad en tu software, mejor busca un buen diseño.

Testear significa "probar". ¿Cuántas veces hemos abandonado tests por la complejidad de probar cierta lógica?

El arte del testing consiste en usar los tests para contribuir al resultado final. Si usamos el testing a nuestro favor, según el contexto, mejoraremos la calidad del producto.

Por tanto, el testing no solo verifica comportamiento. También guía el software hacia un mejor diseño.

¿Deberíamos testear todo? Depende del contexto. Habrá situaciones donde los tests no aporten beneficio. Aun así, escribe código como si fuera a ser testeado.

![blog-cover](/images/blog/2020-04-07/footer.jpg)

> El código testeable tiende a un mejor diseño y, por lo tanto, a mejor calidad.
