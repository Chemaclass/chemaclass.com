+++
title = "agnostic-ai"
description = "Una spec, todas las CLI de IA. Escribe reglas, skills, agentes, hooks y servidores MCP una vez, y sincronízalos con los ficheros de 25 herramientas de IA."
weight = 1
[taxonomies]
tags = [ "agnostic-ai", "developer-tools", "ai", "open-source" ]
[extra]
subtitle = "Una spec, todas las CLI de IA"
project_url = "https://github.com/Chemaclass/agnostic-ai"
slides = "/slides/agnostic-ai/"
+++

Tu equipo usa Claude Code, un compañero prefiere Codex y alguien sigue con Copilot abierto. Cada herramienta quiere sus propios ficheros, así que las mismas convenciones, skills y hooks acaban copiados en varios sitios, y las copias se desincronizan sin un solo error. Lo interesante aquí no son las herramientas. Es el flujo de trabajo.

Empezamos por lo que queremos de un agente y qué parte de su setup consigue cada resultado: instrucciones y reglas como pistas, hooks y permisos como garantías, y skills, agentes y servidores MCP para sacar el trabajo adelante. Después seguimos ese setup a través de varios cambios de herramienta, vemos dónde se desincroniza y comparamos dos soluciones: symlinks, y agnostic-ai, que mantiene una sola spec y genera los ficheros nativos que leen 25 herramientas de IA. Cerramos con los trade-offs y con preguntas para la sala sobre qué debería ir en un setup de agentes compartido.

<!-- more -->

---

- 2026-09-15 | ACT Berlin #14 [**Berlín, Alemania**] (EN)
  - [Una spec, todas las CLI de IA](https://luma.com/act14)
