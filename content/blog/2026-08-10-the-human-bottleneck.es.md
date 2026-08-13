+++
title = "El Cuello de Botella Humano"
description = "Los agentes de IA entregan más rápido de lo que puedes revisar. La respuesta no es ir más rápido. Es elegir dónde importa de verdad tu atención."
draft = false
[taxonomies]
tags = [ "ai", "software", "leadership", "agile" ]
[extra]
tldr = "Cuando los agentes entregan más rápido de lo que revisas, la solución no es revisar más rápido. Decide dónde importa tu atención y da autonomía donde se ha ganado."
subtitle = "La atención es lo único que no puedes escalar"
static_thumbnail = "/images/blog/2026-08-10/cover.webp"
series = "ai"
series_order = 9
related_posts = [
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2025-04-12-ship-show-ask.md",
]
related_readings = [
  "readings/2021-05-28-peopleware.md",
  "readings/2020-04-03-high-output-management.md",
  "readings/2021-09-12-turn-the-ship-around.md",
]
+++

Los [agentes de IA](/es/blog/build-your-own-team-of-agents/) pueden escribir código, revisarlo, testearlo y desplegarlo. Pasamos décadas haciendo las máquinas más rápidas. Ahora la parte más lenta del sistema ha cambiado.

Somos nosotros.

<!-- more -->

Mi agente [OpenClaw](https://openclaw.ai), [Sauron](https://sauronbot.github.io/about/), corre varios agentes de programación en paralelo. Uno revisa la calidad del código. Uno se encarga de las integraciones. Uno escribe tests. Producen PRs, se revisan entre ellos, me avisan cuando una decisión necesita mi atención. Toda decisión importante sigue pasando por mí.

Puedes añadir más agentes. No puedes añadir más de ti.

## La trampa de la aprobación

La mayoría de equipos trata la revisión humana como una puerta. Nada avanza sin sello humano. Tenía sentido cuando los humanos escribían el código. Tiene menos cuando los agentes producen diez PRs mientras te tomas el café de la mañana.

Tu instinto es revisar todo. Cuando lo intentas, empiezas a leer por encima. Dejas de detectar problemas reales. Clicas "approve" en piloto automático.

> Si revisas todo con la misma profundidad, no revisas nada con profundidad real.

Escribí sobre un problema relacionado en [La IA Te Da Velocidad, No Calidad](/es/blog/ai-gives-you-speed-not-quality/). El marrón se movió de escribir código a revisarlo.

## Human-on-the-loop

En vez de bloquear cada acción con aprobación, deja que los agentes actúen. Dale al humano la capacidad de observar e intervenir.

Piensa en piloto y autopilot. El avión vuela solo la mayor parte del tiempo. El piloto mira los instrumentos y toma el control cuando algo no cuadra. Nadie pilota cada segundo.

Eso funciona porque los instrumentos le dicen al piloto cuándo mirar. Sin alertas propias, miras un panel vacío. Human-on-the-loop se convierte en human-out-of-the-loop.

La FAA llama a esto [dependencia de la automatización](https://www.faa.gov/sites/faa.gov/files/MayJun2025.pdf): los pilotos que dependen de la automatización durante demasiado tiempo pueden perder las destrezas manuales que necesitan en una emergencia. Igual con los desarrolladores.

La solución: practica a propósito. Lee diffs que no tienes que leer. Repasa los cambios en la terminal. Pídele al agente que explique su razonamiento antes de mergear.

## Cuándo la revisión completa sigue ganando

Cuatro excepciones:

- **Código de seguridad.** Flujos de login, API keys, checks de permisos. Cualquier sitio donde un error da acceso a quien no debería tenerlo.
- **Acciones que no se pueden deshacer.** Migraciones de base de datos, borrado de datos, transferencias de dinero, mensajes enviados a usuarios.
- **Un codebase nuevo.** En tu primer mes estás aprendiendo el terreno. Leer por encima diez PRs al día no construye ese conocimiento.
- **Cambios que exigen un responsable.** Si una política o regulación exige que una persona apruebe el cambio, un agente no puede asumir esa responsabilidad.

En estas áreas, gastas toda tu atención. A propósito.

## Reducir lo que necesita revisión

La respuesta no son humanos más rápidos. Son menos cosas que necesiten atención humana desde el principio.

**Haz que reintentar una operación sea seguro.** Si un job de sync puede correr dos veces sin romper nada, aprobar deja de ser un ritual. Sin daño, sin estrés.

**Haz los cambios fáciles de deshacer.** Feature flags. Despliega primero para un grupo pequeño. Rollback en segundos. No estás aprobando una decisión permanente. Estás aprobando un experimento.

**Deja que el build cace los errores.** Automatiza los checks que puede hacer una máquina. En este sitio, `check-assets.py` rompe el build cuando una página apunta a un fichero que no existe. Sin él, renombrar `search.js` dejaría que todas las páginas llegasen a producción con la búsqueda rota. Una revisión puede pasarlo por alto. El build no debería.

**Muestra mejor contexto para revisar.** No entregues un diff en crudo. Muestra qué cambió, por qué, qué se probó, qué podría salir mal. Nombra los riesgos reales. "Sin breaking changes" es una afirmación. Un buen resumen también dice "...pero este fichero tocó una interfaz pública".

> El objetivo no es quitar humanos. Es hacer que cada momento de atención humana cuente.

## Corta por valor, no por capa

Los agentes no discuten el alcance. Pides un buscador y te llega una capa de caché, un sistema de configuración y tres interfaces que nadie pidió.

Escriben el código que pediste y luego el que suponen que necesitarás más adelante. [YAGNI](/es/blog/london-vs-chicago/) a velocidad de máquina. Cada línea plausible. Cada línea tuya para revisar y mantener.

Jina Yoon [señala la causa](https://newsletter.posthog.com/p/software-factories): un agente al que le pasas un ticket recibe las restricciones técnicas y nada del problema. Supone porque nadie le dio el contexto para decidir. En PostHog, los ingenieros deciden qué construir, no los PMs. Yo defiendo lo mismo. **No puedes diseñar bien un sistema sin entender el problema que resuelve.**

La solución es vieja. Corta el trabajo en _vertical slices_: un camino fino de la pantalla a la base de datos que un usuario pueda usar de verdad. No la capa de repositorios esta semana y los controladores el mes que viene.

Un plan por capas no entrega nada hasta que se mergea el último PR gordo, y entonces te pide revisar un mes de suposiciones de golpe. Eso es [waterfall](/es/blog/what-is-waterfall/) en una caja más pequeña.

> El agente decide cómo. Tú decides qué, y cuánto.

## Autonomía ganada

No todos los agentes merecen la misma confianza. No todas las tareas tienen el mismo riesgo. Onboardea agentes como a desarrolladores junior: revisa todo al principio, revisa menos según demuestren buen criterio.

La confianza necesita datos. Cuenta cuántas veces el cambio de un agente se revierte o causa un bug, por área de código. Si sus actualizaciones de dependencias siempre están bien pero sus cambios de auth dan problemas, ajusta las reglas por dominio. Confía donde hay track record. Sigue revisando donde no.

Los agentes pueden revisarse entre ellos antes de que un humano vea el código. El humano pasa a ser el último check, no el único.

## La responsabilidad y el aprendizaje siguen siendo humanos

Dos preguntas que este enfoque no resuelve por sí solo.

**¿A quién avisan a las 3am?** Cuando un agente entrega un bug, la alerta va a un humano. Eres dueño del sistema. Tú pones las reglas que dejan que el código llegue a producción. Los agentes no cambian quién es responsable.

**¿Cómo crecen los desarrolladores junior?** Arreglar lint, actualizar dependencias, añadir cobertura de tests: ese trabajo repetitivo daba a los junior una forma segura de aprender el codebase. Si los agentes se comen ese trabajo, reemplázalo con algo deliberado. Mentoría. Walkthroughs de arquitectura. Exposición guiada a incidentes de producción.

## Dónde importa tu atención

La atención que ahorras tiene un sitio mejor donde ir. Decisiones de arquitectura. Dirección de producto. Confianza del cliente. Respuesta a incidentes. No son ineficiencias esperando automatización.

[Ship, Show, Ask](/es/blog/ship-show-ask/) siempre fue sobre ajustar la atención al riesgo. Era opcional cuando el volumen de revisión era pequeño. No lo es cuando los agentes producen diez PRs por hora.

La pregunta no es _"¿cómo reviso más rápido?"_ Es _"¿dónde importa de verdad mi revisión?"_

Los agentes no crearon este cuello de botella. Lo hicieron imposible de ignorar.

![Un camino de grava que se adentra en el bosque, junto a una valla metálica](/images/blog/2026-08-10/footer.webp)
