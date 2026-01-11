+++
title = "MCP: Dándole a tu agente IA el contexto adecuado"
description = "El Model Context Protocol está cambiando cómo los agentes de IA interactúan con tu entorno de desarrollo. Entender por qué importa te ayuda a usar mejor estas herramientas."
draft = false
[taxonomies]
tags = [ "ai", "software-architecture", "developer-tools", "craftsmanship" ]
[extra]
subtitle = "Por qué el contexto es el verdadero superpoder en el desarrollo asistido por IA"
static_thumbnail = "/images/blog/2026-01-11/cover.jpg"
+++

Los asistentes de código con IA modernos son extraordinariamente buenos entendiendo contexto. Modelos como Claude Opus con ventanas de contexto amplias (~200k tokens) pueden mantener porciones sustanciales de tu código en mente, razonar sobre arquitectura, y mantener coherencia en conversaciones largas. No el proyecto entero en codebases grandes, pero sí lo suficiente para trabajar de forma efectiva.

Pero entender no es lo mismo que acceder.

La IA puede razonar sobre el esquema de tu base de datos si lo pegas. Puede sugerir cambios a archivos que compartes. Conoce patrones del código que le muestras. La limitación no es la inteligencia. Es el alcance.

Ahí es donde entra MCP.

<!-- more -->

## Lo que MCP habilita

La IA moderna puede entender tu código cuando lo compartes. Pero entender y actuar son cosas diferentes.

Muchos asistentes integrados en IDEs como VS Code Copilot o Cursor ya acceden a los archivos de tu proyecto a través de su propio indexado. Así que el acceso a archivos en sí no es nuevo. Lo que MCP aporta es estandarización. En lugar de que cada herramienta construya su propia integración, MCP proporciona un protocolo común. Configuras un servidor una vez, y cualquier cliente compatible con MCP puede usarlo. Es portable, configurable, y se extiende más allá de archivos a bases de datos, APIs, y herramientas personalizadas.

> MCP transforma a la IA de un interlocutor a un participante activo en tu entorno de desarrollo.

Con MCP, le das a la IA acceso directo a herramientas y recursos. Puede leer archivos, ejecutar comandos, consultar bases de datos, obtener documentación. La inteligencia siempre estuvo ahí. MCP le da manos.

## Qué es realmente MCP

MCP es un protocolo, no un producto. Es un estándar abierto que define cómo los agentes de IA pueden conectarse a fuentes de datos y herramientas externas. Piensa en ello como un puente entre el modelo de IA y tu entorno de desarrollo.

La arquitectura es simple: los servidores MCP exponen capacidades, y los clientes de IA las consumen. Claude Desktop y Claude Code soportan MCP oficialmente, con más herramientas adoptando el protocolo a medida que madura.

Por ejemplo, en Claude Code puedes añadir servidores a un archivo `.mcp.json` en la raíz de tu proyecto. Claude Code lee este archivo cuando abres el proyecto e inicia los servidores configurados automáticamente:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "tu-token" }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "DATABASE_URL": "postgresql://localhost/mydb" }
    }
  }
}
```

Cada servidor le da a la IA diferentes capacidades:

- **filesystem**: Leer y navegar los archivos de tu proyecto. La IA puede explorar tu código, verificar patrones existentes, y entender la estructura de directorios antes de sugerir cambios.
- **github**: Acceder a issues, pull requests, y metadatos del repositorio. Pídele a la IA que resuma los issues abiertos, revise comentarios de PRs, o entienda en qué está trabajando tu equipo.
- **postgres**: Consultar tu base de datos directamente. La IA puede inspeccionar tu esquema, ejecutar consultas de lectura, y entender tu modelo de datos sin que copies definiciones de tablas.

Diferentes herramientas, mismo protocolo. Configuras una vez, y cualquier cliente compatible con MCP puede usar estos servidores.

## Dónde destaca MCP

### Trabajando con tu código

El beneficio más inmediato es el acceso al sistema de archivos. La IA puede navegar tu proyecto, leer archivos fuente, entender tu estructura de directorios. Cuando sugiere código, puede verificar patrones existentes primero.

La integración con Git va más allá. La IA puede ver tu historial de commits, entender qué cambió recientemente, y sugerir modificaciones que se alinean con cómo evoluciona tu código.

El acceso al esquema de base de datos significa que la IA entiende tu modelo de datos. No más explicar relaciones entre tablas o tipos de columnas. Ve la estructura y genera consultas que realmente funcionan.

### Documentación y conocimiento

Conecta tu documentación interna y la IA se vuelve consciente de las decisiones de tu equipo. Especificaciones de API, documentos de arquitectura, guías de código. Todo disponible como contexto.

Aquí es donde MCP empieza a sentirse diferente. La IA ya no genera código genérico. Genera código que encaja en tu proyecto.

> La mejor asistencia de IA viene de entender no solo qué estás construyendo, sino cómo lo construye tu equipo.

### Integraciones externas

La integración con GitHub significa que la IA puede leer issues, entender discusiones de PRs, y ver el contexto más amplio de en qué está trabajando tu equipo. Slack u otras herramientas de comunicación pueden proporcionar aún más contexto sobre decisiones en curso.

Las integraciones personalizadas te permiten conectar herramientas internas específicas de tu flujo de trabajo. El protocolo es extensible por diseño.

## Usando MCP efectivamente

MCP amplifica lo que sea que conecte. Si tu documentación está desactualizada, la IA usará información desactualizada. Si tu código es desordenado, la IA aprenderá patrones desordenados.

Este es el efecto espejo que mencioné en [La IA te da velocidad, no calidad](/blog/ai-gives-you-speed-not-quality). La IA refleja el contexto que le das. Buen contexto produce resultados útiles. Mal contexto produce basura que suena convincente.

> Darle a la IA acceso a tu código no reemplaza tu responsabilidad de mantenerlo. Hace que la buena higiene sea más valiosa.

Algunas prácticas que ayudan:

- **Conecta solo lo que la IA necesita.** Más contexto no siempre es mejor. Contexto enfocado es mejor.
- **Mantén tu documentación actualizada.** Si la IA lee tus docs, esos docs importan más que antes.
- **Revisa tu configuración MCP periódicamente.** A medida que tu proyecto evoluciona, también debería hacerlo tu configuración de contexto.
- **Empieza pequeño.** Uno o dos servidores. Ve qué funciona. Expande desde ahí.

La seguridad también importa. Sé intencional sobre lo que expones. Los servidores MCP pueden acceder a información sensible. Trátalos como cualquier otra decisión de control de acceso.

## Qué viene después

MCP es la base. Pero el ecosistema está construyendo encima.

**Flujos de trabajo agénticos.** Herramientas como Claude Code y Cursor ahora funcionan en "modo agente" donde la IA planifica y ejecuta tareas de múltiples pasos de forma autónoma. Lee archivos, hace cambios, ejecuta tests, corrige errores. Los servidores MCP son las manos. El bucle del agente es el cerebro que decide qué hacer.

**Skills y comandos personalizados.** Claude Code introdujo skills. Comandos slash personalizados que encadenan herramientas MCP en flujos reutilizables. `/deploy`, `/test`, `/review`. Los defines una vez, y se convierten en parte de tu toolkit de desarrollo.

**Protocolo A2A.** El protocolo Agent-to-Agent de Google. Mientras MCP conecta IA con herramientas, A2A conecta agentes de IA entre sí. Múltiples agentes especializados colaborando en tareas complejas. Un agente escribe código, otro lo revisa, un tercero ejecuta tests.

El patrón es claro: la IA está pasando de asistente a colaborador. De responder preguntas a ejecutar flujos de trabajo. MCP le dio a la IA acceso a tu entorno. Lo que viene es IA que sabe usar ese acceso de forma autónoma.

> La pregunta está cambiando de "¿a qué puede acceder la IA?" a "¿qué debería decidir la IA por su cuenta?"

El juicio humano no desaparece. Se mueve hacia arriba. En lugar de revisar cada línea que escribe la IA, diseñamos el contexto y los límites que moldean lo que produce.

Ese sigue siendo nuestro trabajo. Y es un trabajo que vale la pena hacer bien.

![cover](/images/blog/2026-01-11/footer.jpg)

---

## Relacionado

### Posts relacionados

- [La IA te da velocidad, no calidad](/blog/ai-gives-you-speed-not-quality) <small>El factor humano en la era del vibe-coding</small>
- [Diferentes creencias sobre la calidad del software](/blog/different-beliefs-about-software-quality) <small>Pensamientos sobre la calidad del software en tu equipo</small>
- [Introduciendo un nuevo stack tecnológico](/blog/introducing-a-new-tech-stack) <small>Cómo introducir nuevas tecnologías en tu equipo</small>

### Lecturas relacionadas

- [Clean Architecture](/readings/clean-architecture/) <small>A Craftsman's Guide to Software Structure and Design</small>
- [Extreme Programming Explained](/readings/extreme-programming-explained/) <small>Embrace Change</small>
