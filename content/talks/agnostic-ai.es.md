+++
title = "agnostic-ai"
description = "Una spec, todas las CLI de IA. Escribe tus reglas, skills, agentes, hooks y servidores MCP una vez, y sincronízalos con los ficheros nativos que leen 25 herramientas de IA."
weight = 1
[taxonomies]
tags = [ "agnostic-ai", "developer-tools", "ai", "open-source" ]
[extra]
subtitle = "Una spec, todas las CLI de IA"
project_url = "https://github.com/Chemaclass/agnostic-ai"
slides = "/slides/agnostic-ai/"
+++

Tu equipo usa Claude Code, un compañero prefiere Cursor y el nuevo abre Codex. Mismo repositorio, mismas convenciones, tres copias de las reglas que se desincronizan en una semana. Y hay algo peor: tus reglas pueden dejar de leerse sin que nada falle. La mayoría de las herramientas buscan el primer fichero que reconocen y paran ahí, así que basta con que un compañero añada una segunda herramienta para silenciar todo lo que escribiste.

agnostic-ai mantiene una sola fuente de verdad. Escribes reglas, skills, agentes, hooks, servidores MCP y comandos una vez en `.agnostic-ai/`, y un único comando de sync genera los ficheros nativos que cada herramienta lee de verdad. Pasamos en directo de un repositorio vacío a un setup sincronizado, y después vemos en qué se equivocan los propios vendors: listas de precedencia que tapan tus reglas en silencio, nombres de fichero antiguos que siguen ganando a los nuevos, y rutas que ningún documento oficial mencionó jamás.

<!-- more -->

---
