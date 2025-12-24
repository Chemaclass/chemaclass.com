+++
title = "Working Effectively with Legacy Code"
description = "Este libro ofrece estrategias de principio a fin para trabajar más efectivamente con grandes bases de código legacy sin tests."
authors = [ "Michael Feathers" ]
[taxonomies]
tags = [ "refactoring", "testing", "tdd", "software-design" ]
[extra]
subtitle = "Este libro ofrece estrategias de principio a fin para trabajar más efectivamente con grandes bases de código legacy sin tests."
pages = "460"
author = "Michael Feathers"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/41Fh9iUog4L._SX376_BO1,204,203,200_.jpg"
+++

<img border="0" src="https://images-na.ssl-images-amazon.com/images/I/41Fh9iUog4L._SX376_BO1,204,203,200_.jpg" >

<!-- more -->

## ¿Qué es código legacy?

> El código legacy es simplemente código sin tests.

### Beneficios de los tests

El comportamiento es fundamental para entender los beneficios del testing:

> El comportamiento es lo más importante del software. Es de lo que dependen los usuarios. A los usuarios les gusta cuando añadimos comportamiento (siempre que sea lo que realmente querían), pero si cambiamos o eliminamos comportamiento del que dependen (introducimos bugs), dejan de confiar en nosotros.

### Cómo implementar tests en bases de código legacy

Cuando cambiamos código, deberíamos tener tests en su lugar. Para poner los tests en su lugar, a menudo tenemos que cambiar código.

El enfoque sugerido:
1. Identificar puntos de cambio.
2. Encontrar puntos de test.
3. Romper dependencias.
4. Escribir tests.
5. Hacer cambios y refactorizar.

Otro término útil es "**costura**" (seam). Una costura, en este contexto, es "**un lugar donde puedes alterar el comportamiento en tu programa
sin editar en ese lugar**". La analogía es una costura en la ropa, el lugar donde dos partes están unidas.
En software, **estos lugares son generalmente lugares donde hay interfaces bien definidas**. Esto puede aprovecharse para cambiar
la implementación usando técnicas como inyección de dependencias o mocking de interfaces en el caso de escribir tests.

---

{{ youtube(id="wRtJRkRIa2s") }}
