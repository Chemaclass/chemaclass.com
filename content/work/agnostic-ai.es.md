+++
title = "agnostic-ai: Instrucciones Compartidas para Herramientas de IA"
description = "Creé un comando que genera los ficheros de instrucciones de cada herramienta de IA a partir de fuentes compartidas en Markdown y YAML."
template = "page.html"
+++

# agnostic-ai: instrucciones compartidas para herramientas de IA

Creé y mantengo [agnostic-ai](https://github.com/Chemaclass/agnostic-ai). Genera los ficheros que leen las herramientas de IA para programar a partir de instrucciones guardadas en un único lugar.

## El problema

Claude Code lee `CLAUDE.md`. Codex lee `AGENTS.md`. Otras herramientas tienen sus propios ficheros y ajustes. Un proyecto que usa varias herramientas puede acabar con copias de las mismas instrucciones.

Cuando cambia un comando de test o una regla del proyecto, hay que actualizar cada copia. Editarlas a mano deja margen para que las herramientas reciban instrucciones distintas.

## La decisión

Convertí los ficheros de cada herramienta en output generado. El proyecto guarda las instrucciones compartidas en Markdown y YAML dentro de `.agnostic-ai/`. Al ejecutar `agnostic-ai sync`, se generan los ficheros que lee cada herramienta seleccionada.

La fuente se guarda en el repositorio junto al código. Puedes revisar un cambio de instrucciones en una PR y usarlo sin una cuenta ni un servicio alojado.

También añadí una vista previa y una comprobación. `agnostic-ai sync --plan` muestra los cambios propuestos. `agnostic-ai sync --check` comprueba si los ficheros generados coinciden con su fuente.

## El resultado

El [ejemplo de configuración](https://github.com/Chemaclass/agnostic-ai#quickstart) muestra un proyecto que usa Claude Code y Codex. Tras un sync, las instrucciones compartidas están en `AGENTS.md` y `CLAUDE.md` apunta a ese fichero. El desarrollador edita la fuente y ejecuta el mismo comando para las herramientas seleccionadas.

Esta web usa esa configuración para sus reglas de proyecto y guías de escritura. La [configuración fuente](https://github.com/Chemaclass/chemaclass.com/tree/main/.agnostic-ai) forma parte del repositorio.

Los ficheros generados dan a cada herramienta las mismas instrucciones del proyecto. La herramienta y el modelo siguen determinando cómo las cumplen.

[Lee la guía de configuración](https://agnostic-ai.org/docs/getting-started/) o [consulta el código](https://github.com/Chemaclass/agnostic-ai).
