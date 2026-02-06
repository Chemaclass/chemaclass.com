+++
title = "London vs Chicago"
description = "Hay dos escuelas conocidas en TDD: la escuela mockista (también conocida como Outside-in) y la escuela clasicista (también conocida como Inside-out)."
[taxonomies]
tags = [ "tdd", "testing", "software-design", "refactoring" ]
[extra]
subtitle = "Es una integración, no una elección"
static_thumbnail = "/images/blog/2021-11-20/cover.jpg"
related_posts = [
  "blog/2021-08-01-test-driven-development.md",
  "blog/2021-09-25-tdd-vs-bdd.md",
]
+++

![blog-cover](/images/blog/2021-11-20/cover.jpg)

Hay dos escuelas conocidas en TDD: la escuela mockista (también conocida como Outside-in) y la escuela clasicista (también conocida como Inside-out).

<!-- more -->

### ¿Por qué London y Chicago?

Dos empresas, una de Londres y otra de Chicago, afirmaban hacer TDD pero con enfoques diferentes. La de Londres construía software de afuera hacia adentro; la de Chicago, de adentro hacia afuera. Veamos cada una.

## Outside-in: Escuela de Londres

Un enfoque guiado por comportamiento para TDD. Empiezas desde el exterior de la aplicación y vas hacia adentro, bajando a capas inferiores. Por ejemplo, desde la API/Controladores hacia las capas de aplicación o dominio.

### PROS

- **Enfocado en Comportamiento**: requiere muchos dobles de test porque testeas abstracciones que aún no existen (creas lógica de alto nivel primero). No escribirás código muerto, pero es fácil crear tests muy acoplados a la lógica, lo que dificulta el refactoring.
- **Separación Comando-Consulta**: es una disciplina para gestionar efectos secundarios. O realizas una acción (comando) o pides un valor (consulta).

### CONTRAS

- **Tests Frágiles**: tiende a crear tests que se rompen fácilmente porque suelen estar muy acoplados al código de producción.
- **Refactoring Difícil**: por la misma razón, tener tests acoplados hace que el refactoring continuo sea lento y complicado.

## Inside-out: Escuela de Chicago

Un enfoque informal, exploratorio, basado en estado. Empiezas desde el interior de la aplicación (normalmente el dominio) y vas hacia afuera, hacia las APIs.

### PROS

- **Red de Seguridad Fuerte**: produce tests desacoplados de la implementación. Puedes cambiar el software sin miedo a romperlo, ideal para el refactoring continuo.
- **Alta Cohesión**: a medida que los tests se vuelven más generales, el código de producción se vuelve más específico. Alta cohesión lleva a bajo acoplamiento, lo que mejora extensibilidad, mantenibilidad y testeabilidad.
- **Minimiza Dobles de Test**: construir de adentro hacia afuera requiere menos dobles porque construyes sobre tests previamente escritos. Esto ayuda a tener tests menos frágiles.

### CONTRAS

- **YAGNI**: a menudo sobre-diseña soluciones, con código que realmente no se necesita (¡o ni siquiera se usa!) al final.

## Conclusión

No se trata de elegir uno u otro. Se trata de entender tu contexto y optimizar las cualidades que lo necesitan. London y Chicago tienen sus pros y contras. El mejor enfoque para TDD es integrar ambas escuelas.

{{ youtube(id="rbSDGr-_UwY") }}

---

### Referencias

- [Test-Driven (Development)](/es/blog/test-driven-development/)
- [TDD vs BDD](/es/blog/tdd-vs-bdd/)
- [Notes about "London vs Chicago TDD styles"](https://gist.github.com/xpepper/2e3519d2cb8568a0b13739d9ae497f21)
