+++
title = "Mockear o no mockear"
description = "Mockear es útil, pero 'qué mockear' suele resultar más complicado de lo esperado si no tratas esto con cuidado."
[taxonomies]
tags = [ "testing", "tdd", "software-design", "clean-code", "php" ]
[extra]
subtitle = "Cómo escapar del infierno del mocking"
static_thumbnail = "/images/blog/2021-01-11/cover.jpg"
+++

![blog-cover](/images/blog/2021-01-11/cover.jpg)

Mockear es útil, pero "qué mockear" suele resultar más complicado de lo esperado si no tratas esto con cuidado.

<!-- more -->

#### Cómo escapar del infierno del mocking

¿Qué está pasando realmente cuando creamos un mock? ¿Qué tipos de mocks hay? ¿Mockear es bueno o malo? Bueno, como
siempre, todo depende del contexto. Y aquí consideraremos algunas de las principales situaciones sobre cuándo mockear y
cuándo no mockear, pero especialmente por qué.

## ¿Qué pasa cuando mockeas algo?

Primero, deberíamos definir qué es un mock:

> En un test unitario, los objetos mock pueden simular el comportamiento de objetos reales complejos y por lo tanto son útiles cuando es impracticable o imposible incorporar un objeto real en un test unitario.

Mockear tiene sentido en un contexto de *testing unitario*. Un test de integración debería pasar por la implementación real comprobando
la integración entre múltiples unidades, que incluso tienen permitido hablar con la BD o File IO: código de infraestructura.
Por lo tanto deberíamos estar de acuerdo en que *un test unitario es un test rápido y determinista que no depende de dependencias externas
y no requiere ningún contexto especial para ejecutarse*.

Los objetos mock cumplen los requisitos de la *interfaz*. En consecuencia, nos permiten escribir y testear unitariamente funcionalidad
sin llamar a clases subyacentes o colaboradoras complejas.

Un mock es un doble de test que sustituye al código de implementación real durante el proceso de testing unitario. También es capaz
de producir aserciones sobre cómo fue manipulado por el sujeto de test durante la ejecución del test.

> Recomiendo encarecidamente que leas este post si quieres entrar en los detalles de por qué [Mockear es un code smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a) (Temas como estos: ¿Qué es un mock? ¿Qué es un test unitario? ¿Qué es la cobertura de tests? ¿Qué es el acoplamiento fuerte? ¿Qué causa el acoplamiento fuerte? ¿Qué tiene que ver la composición con el mocking? ¿Cómo eliminamos el acoplamiento? ¡y más!)

## El problema con mockear

Cuando mockeas estás anulando la lógica de la clase mockeada. La lógica real se oculta tras bambalinas y
ahí es precisamente donde los bugs les encanta vivir. Considera que:

* El mock puede tener atributos, métodos o argumentos que el objeto real no tiene.

* Los *valores de retorno del mock pueden diferir de los valores de retorno de los objetos reales*. Por ejemplo, puede devolver un tipo diferente
  de objeto que tiene diferentes atributos.

* Los *efectos secundarios y el comportamiento del mock pueden diferir de los de los objetos reales*. Por ejemplo, quizás el mock no
  lanza una excepción cuando el objeto real la lanzaría.

## Alternativas a mockear

"¿Estás diciendo que mockear es malo y no deberíamos mockear?" No.

Depende de lo que estés "anulando".

* ¿Es tu lógica de dominio de negocio lo que estás mockeando? Entonces está mal.
* ¿Es la conexión a la BD lo que estás mockeando? Entonces está bien.

> Depende del contexto de la lógica y dónde pertenece esa lógica.

¿Es parte de tu lógica de dominio de negocio? Entonces no deberías mockearla sino instanciarla.

¿Es parte de alguna dependencia de infraestructura como conexión a BD, sistema de archivos IO, Red, o cualquier servicio externo que
no tiene nada que ver directamente con tu dominio de negocio? Entonces *mockéala usando abstracciones/interfaces*.

La interfaz debería ser el *contrato entre tu lógica de dominio de negocio y sus dependencias de infraestructura externas*.
Imagina qué fácil sería testear unitariamente tu lógica de dominio instanciándola y llamando a sus métodos con diferentes
argumentos esperando diferentes entradas bajo tu control total.

## Algunos trucos

Cuando estés escribiendo un test unitario:

* Intenta instanciar tus clases primero.
* Evita mockear clases concretas. Escribí un artículo exclusivamente sobre esto:
  fomentando [clases finales](https://medium.com/swlh/final-classes-in-php-9174e3e2747e) e interfaces.

> Mockea interfaces. Instancia clases concretas.

{{ youtube(id="RbSqXFUfRMU") }}

"El uso excesivo de mocks lleva a código legacy." — Philippe Boargau

### ¿Cómo podemos evitar el mocking excesivo?

* Favorece el estado inmutable sobre el estado mutable.
* Haz las dependencias explícitas.
* Programa hacia una interfaz, no hacia una implementación.

![blog-img](/images/blog/2021-01-11/footer.jpg)

---

#### Referencias

- [Testing with Test Doubles?](https://jesusvalerareales.medium.com/testing-with-test-doubles-7c3abb9eb3f2) — Jesus Valera
- [Mocking is a code smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a) — Eric Elliott
- [When to mock](https://blog.cleancoder.com/uncle-bob/2014/05/10/WhenToMock.html) & [Test Definitions](https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html) — Uncle Bob
- [Final classes by default](https://matthiasnoback.nl/2018/09/final-classes-by-default-why/) — Matthias Noback
- [The problem with mocks](https://www.seanh.cc/2017/03/17/the-problem-with-mocks/) — Sean Hammond
- [A Set of Unit Testing Rules](https://www.artima.com/weblogs/viewpost.jsp?thread=126923) — Michael Feathers
