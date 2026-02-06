+++
title = "Arquitectura Limpia"
description = "Cómo estructurar y diseñar software de forma profesional. Principios SOLID, componentes y capas explicados con claridad."
authors = [ "Robert C. Martin" ]
[taxonomies]
tags = [ "architecture", "software-design", "clean-code", "ddd" ]
[extra]
subtitle = "Guía del artesano para la estructura y diseño de software"
pages = "400"
author = "Robert C. Martin"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/41TPrNDI50L._SX387_BO1,204,203,200_.jpg"
related_posts = [
  "blog/2023-12-30-great-engineering.md",
  "blog/2021-08-01-test-driven-development.md",
  "blog/2023-04-14-introducing-a-new-tech-stack.md",
]
related_readings = [
  "readings/2020-09-10-domain-driven-design-distilled.md",
  "readings/2022-11-28-recipes-for-decoupling.md",
  "readings/2020-08-16-advance-web-application-architecture.md",
]
+++

<!-- more -->

### Principios de diseño de código (SOLID)

- **Responsabilidad Única**: una clase debe tener una sola razón para cambiar. O en su versión nueva: un módulo responde ante un solo actor.
- **Abierto-cerrado**: abierta para extensión, cerrada para modificación.
- **Sustitución de Liskov**: puedes reemplazar objetos por instancias de sus subtipos sin romper el programa.
- **Segregación de Interfaces**: mejor muchas interfaces específicas que una general.
- **Inversión de Dependencias**: depende de abstracciones, no de implementaciones concretas.

### Principios de componentes

#### Cohesión de componentes

- **Equivalencia Reutilización/Liberación**: las clases reutilizadas juntas deben liberarse juntas. Mismo número de versión y changelog adecuado.
- **Cierre Común**: las clases que cambian juntas van juntas. Es el principio de responsabilidad única a nivel de componente.
- **Reutilización Común**: no obligues a los usuarios a depender de lo que no necesitan. Segregación de interfaces a nivel de componente.

#### Acoplamiento de componentes

- **Dependencias Acíclicas**: sin ciclos en el grafo de dependencias. Los ciclos fuerzan a liberar componentes juntos. Usa inversión de dependencias para romperlos.
- **Dependencia Estable**: los componentes menos estables dependen de los más estables. Depende en dirección de la estabilidad.
- **Abstracciones Estables**: los componentes estables deben ser abstractos. Ejemplo: una política de alto nivel que se extiende siguiendo abierto-cerrado.

### Principios de arquitectura

#### Estableciendo límites

Los límites separan elementos de software: lo que importa de lo que no, lo de alto nivel de lo de bajo nivel. Si el código de alto nivel depende del de bajo nivel, los cambios se propagan hacia arriba. Ponemos un límite usando polimorfismo para invertir el flujo. Esto es el Principio de Inversión de Dependencias de SOLID.

#### Separando capas

Cuatro capas principales (aunque puede variar):

- **Entidades**: objetos con lógica de negocio crítica. Ejemplo: un banco que no da préstamos a clientes sin cierta puntuación crediticia. Se comparten entre aplicaciones de la empresa.
- **Casos de uso**: reglas de negocio específicas de la aplicación. Ejemplo: la secuencia de pantallas para hacer una transferencia.
- **Adaptadores de interfaz**: gateways, presenters, controllers. Aquí va la arquitectura MVC de la GUI y la transformación de datos entre base de datos y casos de uso.
- **Frameworks y drivers**: frameworks web, base de datos, la vista de MVC.
