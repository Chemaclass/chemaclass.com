+++
title = "El Cuello de Botella Humano"
description = "Los agentes de IA entregan más rápido de lo que puedes revisar. La respuesta no es ir más rápido. Es elegir dónde importa de verdad tu atención."
draft = true
[taxonomies]
tags = [ "ai", "software", "leadership" ]
[extra]
subtitle = "Cuando te conviertes en la parte más lenta del sistema"
static_thumbnail = "/images/blog/placeholder.jpg"
series = "ai"
series_order = 8
related_posts = [
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2025-04-12-ship-show-ask.md",
]
+++

![cover](/images/blog/placeholder.jpg)

Los agentes de IA pueden escribir código, revisarlo, testearlo y desplegarlo. Pasamos décadas haciendo las máquinas más rápidas. Ahora la parte más lenta del sistema ha cambiado.

Somos nosotros.

<!-- more -->

Un equipo pequeño que trabaja en [OpenClaw](https://sauronbot.github.io/) corre varios agentes en paralelo. Uno para calidad de código. Uno para integraciones. Uno para tests. Producen PRs, se revisan entre ellos, marcan lo que necesita decisión humana. El sistema funciona. Toda decisión importante sigue pasando por una persona.

Puedes añadir más agentes. No puedes añadir más de ti.

## La trampa de la aprobación

La mayoría de equipos trata la revisión humana como una puerta. Nada avanza sin sello humano. Tenía sentido cuando los humanos escribían el código. Tiene menos cuando los agentes producen diez PRs mientras te tomas el café de la mañana.

Tu instinto es revisar todo. Cuando lo intentas, empiezas a leer por encima. Dejas de detectar problemas reales. Clicas "approve" en piloto automático.

> Si revisas todo con la misma profundidad, no revisas nada con profundidad real.

Escribí sobre un problema relacionado en [La IA Te Da Velocidad, No Calidad](/blog/ai-gives-you-speed-not-quality/). El marrón se movió de escribir código a revisarlo.

## Human-on-the-loop

En vez de bloquear cada acción con aprobación, deja que los agentes actúen. Dale al humano la capacidad de observar e intervenir.

Piensa en piloto y autopilot. El avión vuela solo la mayor parte del tiempo. El piloto mira los instrumentos y toma el control cuando algo no cuadra. Nadie pilota cada segundo.

La aviación llama a la trampa _complacencia por automatización_: si el autopilot lo hace todo demasiado tiempo, el piloto pierde la destreza para emergencias. Igual con desarrolladores. Si los agentes hacen todo el trabajo, pierdes el instinto que detecta problemas.

La solución: practica a propósito. Lee diffs que no tienes que leer. Camina los cambios en la terminal. Pídele al agente que explique su razonamiento antes de mergear.

## Cuándo la revisión completa sigue ganando

Hay trabajo que aún necesita ojos humanos en cada cambio:

- **Código de seguridad.** Flujos de login, API keys, checks de permisos. Cualquier sitio donde un error da acceso a quien no debería tenerlo.
- **Acciones que no se pueden deshacer.** Migraciones de base de datos, borrado de datos, transferencias de dinero, mensajes enviados a usuarios.
- **Un codebase nuevo.** En tu primer mes estás aprendiendo el terreno. Leer diez PRs por encima no construye ese conocimiento.
- **Sistemas regulados.** Si un auditor pregunta "¿quién aprobó este cambio?", la respuesta no puede ser "la IA".

En estas áreas, gastas toda tu atención. A propósito.

![blog-middle](/images/blog/placeholder.jpg)

## Reducir lo que necesita revisión

La respuesta no son humanos más rápidos. Es menos cosas que necesiten atención humana en primer lugar.

**Haz las operaciones seguras de reintentar.** Si un job de sync puede correr dos veces sin romper nada, aprobar deja de ser un ritual. Sin daño, sin estrés.

**Haz los cambios fáciles de deshacer.** Feature flags. Canary deploys. Rollback en segundos. No estás aprobando una decisión permanente. Estás aprobando un experimento.

**Deja que el build cace los errores.** Tipos antes que comentarios. Tests de contrato entre servicios. No necesitas pruebas perfectas. Necesitas que el build falle antes de que el código malo llegue a producción.

**Muestra mejor contexto para revisar.** No entregues un diff en crudo. Muestra qué cambió, por qué, qué se probó, qué podría salir mal. Marca riesgos honestos. "Sin breaking changes" es una afirmación. Un buen resumen también dice "...pero este fichero tocó una interfaz pública".

> El objetivo no es quitar humanos. Es hacer que cada momento de atención humana cuente.

## Autonomía ganada

No todos los agentes merecen la misma confianza. No todas las tareas tienen el mismo riesgo. Onboardea agentes como a developers junior: revisa todo al principio, revisa menos según demuestren buen criterio.

La confianza necesita datos. Métrica útil: **¿cuántas veces se revierten los cambios de un agente o causan un bug, por área de código?** Si sus updates de dependencias siempre están bien pero sus cambios de auth dan problemas, ajusta las reglas por dominio. Confía donde hay track record. Sigue revisando donde no.

Los agentes pueden revisarse entre ellos antes de que un humano vea el código. El humano pasa a ser el último check, no el único.

## Responsabilidad y crecimiento

Dos preguntas que este enfoque no resuelve por sí solo.

**¿A quién avisan a las 3am?** Cuando un agente entrega un bug, la alerta va a un humano. Eres dueño del sistema. Tú pones las reglas que dejan al código llegar a producción. Los agentes no cambian quién es responsable.

**¿Cómo crecen los developers junior?** Arreglar lint, actualizar dependencias, añadir cobertura de tests: así aprendían los junior el codebase. Ese trabajo repetitivo construía los instintos que los seniors usan hoy para diseñar sistemas con agentes. Si los agentes se comen ese trabajo, reemplázalo con algo deliberado. Mentoría. Walkthroughs de arquitectura. Exposición guiada a incidentes de producción.

## Diseña para reversibilidad

La atención que ahorras tiene un sitio mejor donde ir. Decisiones de arquitectura. Dirección de producto. Confianza del cliente. Respuesta a incidentes. No son ineficiencias esperando automatización. Son donde el juicio humano crea más valor.

[Ship, Show, Ask](/blog/ship-show-ask/) siempre fue sobre ajustar la atención al riesgo. Era opcional cuando el volumen de revisión era pequeño. No lo es cuando los agentes producen diez PRs por hora.

La pregunta no es _"¿cómo reviso más rápido?"_ Es _"¿dónde importa de verdad mi revisión?"_

> El futuro no va de sacar humanos del loop. Va de ponerlos en el loop correcto.

Los agentes no crearon este cuello de botella. Lo hicieron imposible de ignorar.
