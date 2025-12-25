+++
title = "Team Topologies"
description = "Team Topologies se enfoca en cómo configurar estructuras de equipo dinámicas y modos de interacción que pueden ayudar a los equipos a adaptarse rápidamente a nuevas condiciones, y lograr una entrega de software rápida y segura."
authors = [ "Matthew Skelton", "Manuel Pais" ]
[taxonomies]
tags = [ "team-management", "architecture", "devops", "agile" ]
[extra]
subtitle = "Organizando equipos de negocio y tecnología para flujo rápido"
pages = "240"
author = "Matthew Skelton, Manuel Pais"
static_thumbnail = "https://m.media-amazon.com/images/I/81vdbXuZ0NL._AC_UL640_FMwebp_QL65_.jpg"
expand_preview = false
+++

<img border="0" src="https://m.media-amazon.com/images/I/81vdbXuZ0NL._AC_UL640_FMwebp_QL65_.jpg" >

<!-- more -->

Team Topologies se enfoca en cómo configurar estructuras de equipo dinámicas y modos de interacción que pueden ayudar a los equipos a adaptarse rápidamente a nuevas condiciones, y lograr una entrega de software rápida y segura.

## Estructura de equipo

- Alta cohesión: Agrupa las cosas relacionadas.
- Bajo acoplamiento: Debe haber límites claros entre los equipos.
- Carga cognitiva: Es como la RAM del equipo. El equipo puede quemarse si lo cargas con más de lo que puede manejar.

> Para evitar equipos cuello de botella, necesitas asegurarte de que su carga cognitiva no sea muy alta.

## Ley de Conway

- La estructura organizacional influenciará la arquitectura del equipo.
- La Ley de Conway dice que las organizaciones diseñarán sistemas que copian su estructura de comunicación.
- En otras palabras, no habrá enfoque en la arquitectura óptima para el proyecto.
- Primero necesitas definir la arquitectura del proyecto, y luego formar los equipos.

## Pensamiento primero el equipo

- Quién está en el equipo importa menos que la dinámica del equipo.
- Al medir el rendimiento, los equipos importan más que los individuos.
- Equipo = grupo de 5-9 que trabajan hacia metas compartidas como una unidad.
  - Revisa el [número de Dunbar](/es/blog/dunbar-number/).
- Formar un equipo toma de 2 semanas a 3 meses.
- La carga cognitiva es la cantidad total de esfuerzo mental que se usa en la memoria de trabajo.
- 3 Tipos de carga cognitiva:
    - Intrínseca: Fundamentos del espacio del problema. Ejemplo: lenguaje de programación.
    - Extrínseca: Relacionada con el entorno. Ejemplo: cómo desplegar.
    - Germane: Se requiere atención especial. Ejemplo: dominio de negocio.
- Heurísticas:
    - 3 tipos de dominio: Simple, complicado, complejo.
    - Si el dominio es demasiado grande, divídelo en subdominios.
    - Un equipo, ya sea:
        - 2-3 dominios simples.
        - 1 dominio complejo.
        - Evita 2 dominios complicados, mejor divide el equipo.
- Define una API de equipo:
    - Código: endpoints, librerías, clientes, ...
    - Versionado.
    - Documentación.
    - Prácticas y principios.
    - Herramientas de comunicación.

## Topologías de equipo

> En lugar de estructurar equipos según el know-how o actividades, organiza equipos según áreas de dominio de negocio.

- El éxito de la topología depende tanto de los miembros del equipo como del entorno circundante, equipos e interacciones.
- Divide las responsabilidades para romper los silos.
- Tipos de dependencias: Conocimiento, tarea y recurso.
- Cuatro tipos de equipos:
    - Stream-aligned: entregar funcionalidades, proyectos, productos al mercado lo antes posible.
    - Enabling: hacer crecer las capacidades para el/los equipo(s) stream-aligned.
    - Complicated-subsystem: reducir la carga cognitiva del/los equipo(s) stream-aligned.
    - Platform: hacer autónomos al/los equipo(s) stream-aligned.

## Interacciones de equipo

- Colaboración. Trabajar estrechamente entre equipos con diferentes conjuntos de habilidades.
- X-as-a-Service. Propiedad clara, baja carga cognitiva.
- Facilitación. Ayudar a eliminar impedimentos, enfocarse en interacciones de calidad entre otros equipos.
