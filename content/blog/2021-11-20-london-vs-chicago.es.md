+++
title = "London vs Chicago"
description = "Hay dos escuelas conocidas en TDD: la escuela mockista (también conocida como Outside-in) y la escuela clasicista (también conocida como Inside-out)."
[taxonomies]
tags = [ "tdd", "testing", "software-design", "refactoring" ]
[extra]
subtitle = "Es una integración, no una elección"
static_thumbnail = "/images/blog/2021-11-20/cover.jpg"
+++

![blog-cover](/images/blog/2021-11-20/cover.jpg)

Hay dos escuelas conocidas en TDD: la escuela mockista (también conocida como Outside-in) y la escuela clasicista (también conocida como Inside-out).

<!-- more -->

### ¿Por qué London y Chicago?

Dos empresas, una de Londres y otra de Chicago, afirmaban hacer TDD, pero se enfocaban en aspectos diferentes. La empresa de Londres construía software de afuera hacia adentro, mientras que la de Chicago de adentro hacia afuera. Veámoslas en más detalle.

## Outside-in: Escuela de Londres

Proporciona un enfoque guiado por comportamiento para TDD. Comenzando desde el exterior de la aplicación y trabajando hacia adentro moviéndose a capas inferiores. Por ejemplo, comenzando desde la API/Controladores hacia abajo hasta las capas de aplicación o dominio.

### PROS

- **Enfocado en Comportamiento**: esto requiere muchos dobles de test porque testearás muchas abstracciones que aún no existen ya que estás creando lógica de alto nivel primero. No escribirás código muerto pero será fácil crear tests altamente acoplados a la lógica y por lo tanto hacer del refactoring una tarea difícil.
- **Separación Comando-Consulta**: es una disciplina para gestionar efectos secundarios. O realizas una acción (comando) o pides un valor (consulta).

### CONTRAS

- **Tests Frágiles**: tiende a crear tests que se rompen fácilmente porque usualmente están demasiado acoplados al código de producción.
- **Refactoring Difícil**: por la misma razón que "Tests Frágiles", tener tests acoplados al código de producción hace el refactoring continuo muy difícil y consume mucho tiempo.

## Inside-out: Escuela de Chicago

Es un enfoque informal, exploratorio, basado en estado de TDD. Comenzando desde el interior de la aplicación (usualmente el dominio) y trabajando hacia afuera hacia las APIs.

### PROS

- **Red de Seguridad Fuerte**: tiende a producir tests que están desacoplados de la implementación. Permitiéndote adoptar un estilo más experimental de cambiar software sin miedo a romperlo. Esto es deseable para el refactoring continuo.
- **Alta Cohesión**: a medida que los tests se vuelven más generales, el código de producción se vuelve más específico. Esto promueve alta cohesión, y con alta cohesión viene bajo acoplamiento. Algo que promueve alta calidad de código: extensibilidad, mantenibilidad y testeabilidad.
- **Minimiza Dobles de Test**: construir de adentro hacia afuera requiere menos dobles de test ya que estás construyendo sobre los tests previamente escritos. Esto ayuda a desarrollar tests menos frágiles.

### CONTRAS

- **YAGNI**: a menudo sobre-diseña soluciones, con código que realmente no se necesita (¡o ni siquiera se usa!) al final.

## Conclusión

No se trata de elegir uno sobre el otro. Se trata de entender tu contexto e impulsar la optimización hacia esas cualidades que necesitan ser optimizadas. London y Chicago tienen cada una sus pros y contras. El mejor enfoque para TDD es una adopción integrada de estas dos escuelas.

{{ youtube(id="rbSDGr-_UwY") }}

---

### Referencias

- [Test-Driven (Development)](/es/blog/test-driven-development/)
- [TDD vs BDD](/es/blog/tdd-vs-bdd/)
- [Notes about "London vs Chicago TDD styles"](https://gist.github.com/xpepper/2e3519d2cb8568a0b13739d9ae497f21)
