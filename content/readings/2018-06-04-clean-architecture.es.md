+++
title = "Clean Architecture"
description = "Guía del artesano para la estructura y diseño de software"
authors = [ "Robert C. Martin" ]
[taxonomies]
tags = [ "architecture", "software-design", "clean-code", "ddd" ]
[extra]
subtitle = "Guía del artesano para la estructura y diseño de software"
pages = "400"
author = "Robert C. Martin"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/41TPrNDI50L._SX387_BO1,204,203,200_.jpg"
+++

<!-- more -->

### Principios de diseño de código (SOLID)

- **Responsabilidad Única**: una clase debe tener una, y solo una, razón para cambiar. O la nueva versión: un módulo
  debe ser responsable ante uno, y solo uno, actor.
- **Abierto-cerrado**: una clase debe estar abierta para extensión pero cerrada para modificación.
- **Sustitución de Liskov**: los objetos en un programa deben ser reemplazables por instancias de sus subtipos sin
  alterar la corrección de ese programa.
- **Segregación de Interfaces**: muchas interfaces específicas para el cliente son mejores que una interfaz de propósito general.
- **Inversión de Dependencias**: uno debe depender de abstracciones, no de concreciones.

### Principios de componentes

#### Cohesión de componentes

- Principio de **Equivalencia Reutilización/Liberación**: las clases y módulos (es decir, un componente) reutilizados juntos deben liberarse
  juntos. Deben tener el mismo número de versión y debe haber documentación apropiada como changelogs.
- Principio de **Cierre Común**: las clases que cambian juntas deben agruparse juntas, y viceversa. El principio de
  responsabilidad única a nivel de componente.
- Principio de **Reutilización Común**: no obligues a los usuarios de un componente a depender de cosas que no necesitan. El Principio de
  Segregación de Interfaces a nivel de componente.

#### Acoplamiento de componentes

- Principio de **Dependencias Acíclicas**: sin ciclos en el grafo de dependencias. Los ciclos acoplan componentes y, entre otras
  cosas, los fuerzan a liberarse juntos. Usa el principio de inversión de dependencias para romper ciclos.
- Principio de **Dependencia Estable**: los componentes menos estables deben depender de componentes más estables. Depende en la
  dirección de la estabilidad.
- Principio de **Abstracciones Estables**: los componentes estables deben ser abstractos, y viceversa. Un ejemplo de un componente
  estable abstracto es una política de alto nivel que se cambia por extensión siguiendo el principio abierto-cerrado.

### Principios de arquitectura

#### Estableciendo límites

Los límites son líneas que separan elementos de software. Separan las cosas que importan de las que no, es decir,
componentes de alto nivel de componentes de bajo nivel. Si un componente de alto nivel depende de uno de bajo nivel a nivel
de código fuente, los cambios en los componentes de bajo nivel se propagarán al componente de alto nivel. Por lo tanto, colocamos un
límite entre los dos, usando polimorfismo para invertir el flujo lógico. Este es el Principio de Inversión de Dependencias en los
principios SOLID.

#### Separando capas

Podemos identificar cuatro capas principales, aunque el número puede variar:

- **Entidades**: objetos que contienen lógica de negocio crítica. Por ejemplo, un banco podría establecer que no se otorgan préstamos
  a clientes que no satisfagan ciertos requisitos de puntuación crediticia. Las entidades pueden compartirse entre aplicaciones en la misma
  empresa.
- **Casos de uso**: reglas de negocio específicas de la aplicación. Por ejemplo, la secuencia de pantallas para ejecutar una transferencia bancaria.
- **Adaptadores de interfaz**: Gateways, presenters y controllers. Por ejemplo, esta capa contendrá la arquitectura MVC
  de la GUI y también objetos que transforman datos entre el formato de la base de datos y los casos de uso.
- **Frameworks y drivers**: frameworks web, base de datos, la vista de MVC.
