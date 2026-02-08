+++
title = "Mockear o No Mockear"
description = "Mockear es útil, pero 'qué mockear' suele resultar más complicado de lo esperado si no tratas esto con cuidado."
[taxonomies]
tags = [ "testing", "tdd", "software-design", "clean-code", "php" ]
[extra]
subtitle = "Cómo escapar del infierno del mocking"
static_thumbnail = "/images/blog/2021-01-11/cover.jpg"
related_posts = [
  "blog/2020-04-07-the-art-of-testing.md",
  "blog/2021-08-01-test-driven-development.md",
  "blog/2021-09-25-tdd-vs-bdd.md",
  "blog/2023-10-20-how-to-test-private-methods.md",
]
related_readings = [
  "readings/2022-07-11-clean-craftsmanship.md",
  "readings/2022-06-29-modern-software-engineering.md",
]
+++

![blog-cover](/images/blog/2021-01-11/cover.jpg)

Mockear es útil, pero "qué mockear" suele resultar más complicado de lo esperado si no tratas esto con cuidado.

<!-- more -->

#### Cómo escapar del infierno del mocking

¿Qué pasa realmente cuando creamos un mock? ¿Qué tipos hay? ¿Es bueno o malo mockear? Como siempre, depende del contexto. Aquí veremos las situaciones principales: cuándo mockear, cuándo no hacerlo, y sobre todo por qué.

## ¿Qué pasa cuando mockeas algo?

Primero, deberíamos definir qué es un mock:

> En un test unitario, los objetos mock pueden simular el comportamiento de objetos reales complejos y por lo tanto son útiles cuando es impracticable o imposible incorporar un objeto real en un test unitario.

Mockear tiene sentido en *testing unitario*. Un test de integración pasa por la implementación real, verificando cómo interactúan varias unidades. Estos tests sí pueden hablar con la BD o el sistema de archivos.
Partimos de esta base: *un test unitario es rápido, determinista, no depende de recursos externos y no requiere contexto especial para ejecutarse*.

Los mocks cumplen el contrato de la *interfaz*. Nos permiten testear funcionalidad sin invocar clases colaboradoras complejas.

Un mock es un doble de test que sustituye la implementación real. Además, puede verificar cómo el código bajo test lo utilizó durante la ejecución.

> Recomiendo encarecidamente que leas este post si quieres entrar en los detalles de por qué [Mockear es un code smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a) (Temas como estos: ¿Qué es un mock? ¿Qué es un test unitario? ¿Qué es la cobertura de tests? ¿Qué es el acoplamiento fuerte? ¿Qué causa el acoplamiento fuerte? ¿Qué tiene que ver la composición con el mocking? ¿Cómo eliminamos el acoplamiento? ¡y más!)

## El problema con mockear

Cuando mockeas, anulas la lógica de la clase mockeada. La lógica real queda oculta, y ahí es donde los bugs se esconden. Ten en cuenta que:

* El mock puede tener atributos, métodos o argumentos que el objeto real no tiene.

* Los *valores de retorno del mock pueden diferir de los reales*. Por ejemplo, puede devolver un tipo distinto con atributos diferentes.

* Los *efectos secundarios y comportamiento del mock pueden diferir del objeto real*. Quizás el mock no lanza una excepcion que el objeto real sí lanzaría.

## Alternativas a mockear

"¿Estás diciendo que mockear es malo y no deberíamos mockear?" No.

Depende de lo que estés "anulando".

* ¿Es tu lógica de dominio de negocio lo que estás mockeando? Entonces está mal.
* ¿Es la conexión a la BD lo que estás mockeando? Entonces está bien.

> Depende del contexto de la lógica y dónde pertenece esa lógica.

¿Es parte de tu lógica de dominio de negocio? Entonces no deberías mockearla sino instanciarla.

¿Es una dependencia de infraestructura como conexión a BD, sistema de archivos, red, o cualquier servicio externo que no tiene que ver con tu dominio de negocio? Entonces *mockéala usando abstracciones/interfaces*.

La interfaz es el *contrato entre tu lógica de dominio y sus dependencias de infraestructura*.
Imagina lo fácil que es testear tu dominio instanciándolo y llamando a sus métodos con diferentes argumentos, todo bajo tu control total.

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

- [Mocking is a code smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a) — Eric Elliott
- [When to mock](https://blog.cleancoder.com/uncle-bob/2014/05/10/WhenToMock.html) & [Test Definitions](https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html) — Uncle Bob
- [Final classes by default](https://matthiasnoback.nl/2018/09/final-classes-by-default-why/) — Matthias Noback
- [The problem with mocks](https://www.seanh.cc/2017/03/17/the-problem-with-mocks/) — Sean Hammond
- [A Set of Unit Testing Rules](https://www.artima.com/weblogs/viewpost.jsp?thread=126923) — Michael Feathers
