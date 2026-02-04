+++
title = "Topologías de Equipos"
description = "Cómo estructurar equipos dinámicos e interacciones que permitan adaptarse rápido a nuevas condiciones y entregar software de forma ágil y segura."
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

<!-- more -->

El libro explica cómo estructurar equipos dinámicos y sus interacciones para adaptarse rápido a nuevas condiciones y entregar software de forma ágil y segura.

## Estructura de equipo

- Alta cohesión: agrupa las cosas relacionadas.
- Bajo acoplamiento: límites claros entre equipos.
- Carga cognitiva: es como la RAM del equipo. Si lo sobrecargas, se quema.

> Para evitar cuellos de botella, asegúrate de que la carga cognitiva del equipo no sea excesiva.

## Ley de Conway

- La estructura organizacional influye en la arquitectura del software.
- Las organizaciones diseñan sistemas que copian su estructura de comunicación.
- Resultado: nadie se enfoca en la arquitectura óptima para el proyecto.
- Primero define la arquitectura, luego forma los equipos.

## El equipo primero

- Quién está en el equipo importa menos que su dinámica.
- Al medir rendimiento, el equipo importa más que las personas individuales.
- Equipo = grupo de 5-9 personas trabajando hacia metas compartidas.
  - Ver el [número de Dunbar](/es/blog/dunbar-number/).
- Formar un equipo toma de 2 semanas a 3 meses.
- La carga cognitiva es el esfuerzo mental total usado en la memoria de trabajo.
- 3 tipos de carga cognitiva:
    - Intrínseca: fundamentos del problema. Ej: lenguaje de programación.
    - Extrínseca: relacionada con el entorno. Ej: cómo desplegar.
    - Germane: requiere atención especial. Ej: dominio de negocio.
- Heurísticas:
    - 3 tipos de dominio: simple, complicado, complejo.
    - Si el dominio es muy grande, divídelo en subdominios.
    - Un equipo puede manejar:
        - 2-3 dominios simples.
        - 1 dominio complejo.
        - Evita 2 dominios complicados; mejor divide el equipo.
- Define una API de equipo:
    - Código: endpoints, librerías, clientes...
    - Versionado.
    - Documentación.
    - Prácticas y principios.
    - Herramientas de comunicación.

## Topologías de equipo

> Organiza equipos por áreas de dominio de negocio, no por conocimiento técnico o actividades.

- El éxito depende tanto de los miembros como del entorno, otros equipos e interacciones.
- Divide responsabilidades para romper silos.
- Tipos de dependencias: conocimiento, tarea y recurso.
- Cuatro tipos de equipos:
    - Stream-aligned: entregar funcionalidades y productos al mercado cuanto antes.
    - Enabling: desarrollar capacidades para los equipos stream-aligned.
    - Complicated-subsystem: reducir la carga cognitiva de los equipos stream-aligned.
    - Platform: dar autonomía a los equipos stream-aligned.

## Interacciones de equipo

- Colaboración: trabajo cercano entre equipos con distintas habilidades.
- X-as-a-Service: propiedad clara, baja carga cognitiva.
- Facilitación: eliminar impedimentos y mejorar la calidad de las interacciones entre equipos.
