+++
title = "Los Niveles de Adopción de la IA"
description = "Una escalera de seis niveles para la adopción de la IA, de prompts copiados a equipos de agentes y flujos nativos de IA. Dónde se atascan las empresas y cómo subir."
draft = false
[taxonomies]
tags = [ "ai", "software", "leadership", "craftsmanship", "productivity", "developer-tools" ]
[extra]
subtitle = "De prompts copiados a equipos de agentes"
static_thumbnail = "/images/blog/2026-05-01/cover.jpg"
series = "ai"
series_order = 6
related_posts = [
  "blog/2026-04-17-inside-the-claude-folder.md",
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
    "readings/2018-06-04-clean-architecture.md",
    "readings/2020-03-05-extreme-programming-explained.md",
]
+++

La mayoría de empresas ya usa IA, pero pocas saben en qué punto están de la escalera de adopción. En un extremo, copias código a ChatGPT. En el otro, los agentes abren PRs mientras duermes. Más allá, la IA llega a gente que nunca tocó una terminal. Este post mapea el camino.

<!-- more -->

## De dónde venimos

Usar IA para programar era tener una segunda pestaña. Escribes una función, te atascas, pegas el error en el chat, pegas la respuesta de vuelta y rezas para que funcione. Lento, torpe, desconectado de tu código.

[GitHub Copilot](https://github.com/features/copilot), sobre el Codex inicial de OpenAI, metió sugerencias dentro del editor, y a menudo se equivocaba con mucha seguridad. Estaba entrenado con código público, y el código público medio no es gran cosa. Tampoco sabía nada de *tu* dominio, *tus* convenciones ni *tu* arquitectura. Era autocompletado que a veces acertaba.

> La primera generación de herramientas de IA para programar te daba un loro entrenado con todo internet. Fluido, seguro, y diciendo cosas que no tenían sentido en tu código.

Esto era *vibe-coding* en su primera forma: tú ponías el *vibe* pegando contexto y la IA rellenaba código que parecía correcto. Compilaba lo suficiente para parecer útil, y se rompía lo suficiente para parecer peligroso.

## La generación de los IDEs

El siguiente paso era obvio: si la IA necesita contexto, dale el editor entero.

[Cursor](https://cursor.com), [Windsurf](https://windsurf.com) y otros IDEs parecidos metieron el modelo dentro de tu flujo de programación. El asistente podía leer archivos, seguir imports y ver más de una función a la vez. El *vibe-coding* pasó a ser una conversación con tu proyecto, y la productividad subió. Por un momento pareció el final del juego.

No lo era. Editar archivos es solo una parte del trabajo. El resto es correr tests, leer logs, abrir ramas, revisar diffs y entender qué hace ya el código. Los asistentes que solo vivían en el editor te ayudaban a escribir más rápido, pero no sabían llevar una tarea de *"arregla este bug"* a *"PR listo para revisar."*

## El salto agéntico

OpenAI lanzó [Codex](https://openai.com/index/introducing-codex/) como agente en la nube: le das una tarea, trabaja en una rama y tú vuelves a un PR. Anthropic sacó [Claude Code](https://claude.com/product/claude-code), un agente de CLI en tu terminal, sobre tu repo, con tus herramientas.

Este fue el gran salto, y no porque los modelos fueran más listos. Lo que cambió fue la unidad de trabajo. Dejaste de promptear línea a línea y empezaste a delegar tareas: lee el ticket, escribe el cambio, corre los tests, explica lo que hiciste. Un agente no necesita que lo lleves de la mano. Necesita un objetivo y el contexto adecuado.

> El salto de asistente a agente no es una mejora de velocidad. Es un cambio en la descripción del puesto. Pasas de escribir código a dirigir trabajo.

Claude Code casi no necesita setup. Sin *lock-in* de editor. Apúntalo a tu repo, suelta una carpeta `.claude` con reglas y convenciones, y se adapta. Lo conté en [Dentro de la Carpeta .claude](https://chemaclass.com/blog/inside-the-claude-folder/).

El modelo que eliges importa más que antes. Los modelos frontera de hoy están muy por delante de los de hace un año. La distancia entre *"puede esbozar una función"* y *"puede refactorizar un módulo con criterio"* se cerró más rápido de lo esperado, y sigue cerrándose mientras Claude, Codex y Gemini se empujan mutuamente cada mes. Los precios también se están acercando, lo cual es una forma educada de decir que todos copian al primero que acierta con la versión sostenible.

## Agentes con casa propia

El siguiente salto no fueron modelos más listos, fueron agentes con su propia máquina.

[OpenClaw](https://openclaw.ai) es el ejemplo más claro. Es un gateway open source que corres en tu propio hardware (Mac Mini, portátil viejo, VPS), un agente siempre encendido conectado a tus apps de mensajería, archivos y calendario. Tú pones el cerebro: Opus, GPT o un modelo local vía [Ollama](https://ollama.com). Cuando un proveedor aprieta límites o sube precios, cambias. El setup es tuyo.

Un agente de programación vive dentro de un repo durante una tarea. Un agente estilo OpenClaw vive en *tu vida*, a lo largo de días y herramientas. [Sauron](https://sauronbot.github.io/about/) es el mío. Revisa mis PRs, abre issues, escribe código, saca contribuciones a open source y me lleva la contraria cuando estoy a punto de obsesionarme con algo. Cualquier cosa que yo pueda hacer en un ordenador, él también la hace, solo que más rápido. Deja de ser una herramienta que abres y pasa a ser un sitio donde trabajas.

> Un agente de programación es un compañero al que invitas a una tarea. Un agente *gateway* es un compañero que vive en una máquina y aparece cada día.

Los proveedores cambian planes y límites más rápido de lo que nadie puede seguir, así que la gente monta setups que no dependen de un solo proveedor. El logo del modelo importa menos cada trimestre, y la arquitectura alrededor importa más.

## IA más allá de los desarrolladores

La IA para programar fue la historia más ruidosa porque los desarrolladores hablamos alto. La historia más grande es que las herramientas agénticas están llegando a gente que nunca escribió una línea de código.

[El modo agente de ChatGPT](https://openai.com/index/introducing-chatgpt-agent/) y [Cowork de Claude](https://claude.com/product/cowork) son los ejemplos obvios: una IA que lee tus documentos, rellena tus hojas de cálculo, redacta tus slides y corre código por ti en segundo plano. [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs) salió el 17 de abril y [tumbó la acción de Figma más de un 7% el día del lanzamiento](https://sherwood.news/tech/anthropic-launches-claude-design-sending-shares-of-figma-down/). El pitch es sencillo: describe lo que quieres, consigue un prototipo que funciona y pásaselo a Claude Code para llevarlo a producción. Un flujo que antes necesitaba un diseñador, un PM, un ingeniero de frontend y tres rondas de revisión queda comprimido en una conversación.

Lovable, v0, Canva y la propia Figma están bajo presión para repensar su posicionamiento. Si Claude Design "mata" a alguno es la pregunta equivocada. La correcta es qué pasa cuando hacer un prototipo usable baja de *"contrata un diseñador"* a *"descríbelo en voz alta."*

Las empresas que lo sienten primero no son las herramientas de diseño. Son los negocios pequeños que no podían pagar diseño, los *founders* montando un *pitch deck* a las tantas de la noche, los PMs probando una idea antes de convocar una reunión. Habrá una minoría de casos donde alguien sí hubiera pagado a un diseñador y ahora no lo hace, y ese coste es real. Pero en la mayoría, la IA no reemplazó a nadie: rellenó un hueco donde nunca iba a haber uno.

![Pequeña biblioteca con estanterías de madera y pilas de libros](/images/blog/2026-05-01/middle.jpg)

## Los niveles de adopción de la IA

Cada empresa con la que hablo está en algún punto de esta escalera. Los niveles no van de cuánto pagas en licencias, sino de cuán metida está la IA en cómo se hace el trabajo, y no solo en ingeniería.

### Nivel 0: Negación

*Postura a nivel empresa.* Nada de IA, oficialmente. Algunas personas usan ChatGPT en su portátil personal y no lo mencionan. A la dirección le preocupan las fugas de propiedad intelectual, o no lo ha puesto como prioridad. La conversación se queda en *"deberíamos mirarlo algún día."*

El riesgo aquí no es la tecnología, es el tiempo. Cada mes en el Nivel 0 es un mes en el que tu competencia aumenta su ventaja.

### Nivel 1: Productividad personal

*Adopción individual.* La IA se tolera, quizá hasta se anima. Cada uno la usa a su manera: ChatGPT en una pestaña, Copilot en el IDE, Claude para lo más peliagudo, una herramienta de diseño para los mockups. La producción sube, pero el *know-how* se queda dentro de cada cabeza. Dos ingenieros, dos PMs o dos diseñadores del mismo equipo sacan resultados muy distintos porque promptean distinto.

La mayoría de empresas están aquí a principios de 2026. Es una mejora real frente al Nivel 0, y es donde nace el mito de *"la IA te da velocidad"*. Como ya [defendí antes](https://chemaclass.com/blog/ai-gives-you-speed-not-quality/), velocidad sin dirección compartida es caos más rápido.

### Nivel 2: Prácticas compartidas

El equipo acuerda cómo usar la IA: convenciones compartidas, prompts que la gente reutiliza, reglas en el repo, un criterio común sobre cuándo fiarse del output y cuándo discutirlo. Las *code reviews* pillan los errores de IA igual que pillan los humanos, y las *design reviews* también. Se exigen tests tanto si escribió el código una persona como si lo escribió un modelo.

Este es el primer nivel en el que la IA pasa a ser una capacidad de equipo en vez de un hábito personal. Techo más alto, suelo más alto. La gente nueva se pone al día más rápido porque los prompts y las reglas capturan cómo trabaja el equipo.

### Nivel 3: Herramientas con contexto

El equipo invierte en contexto: archivos de reglas, convenciones, docs de arquitectura que los agentes pueden leer y [servidores MCP](https://chemaclass.com/blog/mcp-giving-your-ai-agent-the-right-context/) que conectan a los agentes con las bases de datos, APIs y herramientas internas que necesitan. La IA deja de ser un asistente genérico y se parece más a un compañero que se ha leído los docs de onboarding.

A este nivel, la calidad depende menos del modelo y más del contexto que lo rodea. Un modelo más flojo con buen contexto le gana a un modelo frontera sin él. Una buena documentación y una arquitectura limpia rinden el doble: ayudan tanto a humanos como a agentes.

### Nivel 4: Equipos de agentes

En vez de un asistente, tienes un escuadrón: un *coach* de TDD, un revisor de *clean code*, un arquitecto de dominio, alguien que mantiene la documentación. Fuera de ingeniería, la misma idea aplica con agentes de *research*, diseño y *ops*. Cubrí el lado de desarrollo en [Construye tu Propio Equipo de Agentes](https://chemaclass.com/blog/build-your-own-team-of-agents/), y el *leverage* es real.

Los humanos dejan de competir con la IA en velocidad y empiezan a dirigirla. Revisas, decides y marcas el listón. Los agentes se encargan de teclear, y cada vez más de pensar. El *pair programming* con una persona sigue ganando en los *trade-offs* complejos, pero siempre tienes un agente disponible para el resto.

A nivel empresa, el organigrama, los roles y los procesos siguen siendo los de antes. Lo que cambia es que cada persona produce mucho más, y eso se nota en los resultados del equipo. El Nivel 4 multiplica el *output* dentro de la estructura existente. El Nivel 5 cambia la estructura.

### Nivel 5: Flujos nativos de IA

El cambio final es sobre cómo funciona la empresa. Los procesos se diseñan *alrededor* de los agentes en vez de encajarlos a la fuerza. Los tickets se redactan para que un agente pueda actuar sobre ellos, y las revisiones asumen que parte del trabajo lo escribió una máquina. Las decisiones de arquitectura tienen en cuenta lo que los agentes hacen bien y lo que no. Incluso cambia la contratación: un IC senior en el Nivel 5 se parece más a un *tech lead* orquestando un equipo mixto de personas y agentes que a un contribuidor individual clásico.

Pocas empresas están del todo aquí en 2026, pero la dirección es lo bastante evidente como para que ignorarla sea, en sí misma, una decisión.

> No subes de nivel comprando mejores herramientas. Subes cambiando cómo se organiza y se revisa el trabajo.

## La IA no te está robando el trabajo

Sigo oyendo a gente contar esto como una historia de despidos. Ese encuadre es vago.

La revolución industrial no acabó con el trabajo. Acabó con tipos concretos de trabajo y creó otros. Los que más perdieron se negaron a reciclarse. Los que más ganaron aprendieron a manejar las máquinas nuevas en lugar de competir con ellas.

El patrón es el mismo. La IA no te quita el trabajo, está cambiando en qué consiste tu trabajo. Un desarrollador que aprende a dirigir agentes entrega más que uno que se niega. Una diseñadora que hace diez versiones antes de comer con Claude Design diseña más que una que sigue abriendo Figma desde cero. Un PM que envía prototipos prioriza mejor que uno que escribe *specs* que nadie lee.

> La IA no reemplaza al trabajador con habilidades. Reemplaza al trabajador que cree que la habilidad es un activo fijo en vez de un objetivo móvil.

Con la formación, el modelo y el setup adecuados para tu contexto, la IA te da 10x de velocidad sin perder calidad. Lo he visto, y no es marketing. Pero el 10x solo aparece cuando ya sabes qué es "bueno". Sin esa base, la IA produce encantada 10x más de trabajo mediocre.

Esa es la versión honesta de la promesa: la IA puede producir basura diez veces más rápido, *y* trabajo excelente diez veces más rápido. Cuál te toca depende de ti.

## A dónde cambia tu atención

Dejas de pensar primero en los detalles y empiezas a pensar en la dirección: qué estamos construyendo, para quién, con qué forma y con qué *trade-offs*. Los agentes hacen luego la mayor parte de la implementación mientras tú proteges la calidad y la coherencia.

Esto suena a buenas noticias para quien prefiera la arquitectura a teclear, y lo es. Pero hay una trampa: solo puedes trabajar en el nivel alto si conoces el nivel bajo lo bastante bien como para pillar las desviaciones. Cuando el agente produce algo sutilmente mal (un test que pasa por la razón equivocada, un refactor que cambia el comportamiento bajo carga, un diseño que se rompe en móvil), necesitas verlo al instante. Si no puedes, no estás dirigiendo. Estás dando el visto bueno a lo que aparezca.

> La IA te deja dedicar más tiempo a la dirección, pero solo si ya te ganaste el derecho a ignorar los detalles. Ese derecho se gana dominándolos antes.

## Por qué importa la escalera

Veo equipos que se saltan niveles y fracasan. Un equipo salta del Nivel 1 al Nivel 4 porque la dirección leyó un post sobre escuadrones de agentes, y los agentes producen montañas de código malo porque nadie acordó qué significa calidad. Los agentes no son el problema. Lo es la base que falta.

La escalera es un orden que importa. Prácticas compartidas antes que *context engineering*, *context engineering* antes que equipos de agentes, y equipos de agentes antes que flujos nativos de IA. Cada nivel se construye sobre el anterior, igual que el *clean code* se construye sobre el *naming* y el *naming* sobre saber qué estás modelando.

Las empresas que van a ganar los próximos años no son las que tienen el mayor presupuesto en IA. Son las que suben esta escalera con intención, un nivel cada vez, sin saltarse las partes que parecen aburridas.

## Por dónde empezar

En Nivel 0 o 1, el siguiente paso no es comprar más licencias. Es decidir, como equipo, cómo usar estas herramientas. Escríbelo, commitéalo al repo y revísalo cada pocos meses a medida que las herramientas cambian.

En Nivel 2 o 3, mira dónde falta contexto. ¿Qué no sabe tu IA de tu *codebase*, tu producto o tu marca que una persona recién contratada aprendería la primera semana? Escríbelo. Una tarde de reglas y docs te rinde durante meses.

Más arriba, la pregunta se invierte. Dejas de preguntarte *"¿cómo uso mejor la IA?"* y empiezas a preguntarte *"¿cómo tiene que cambiar mi equipo para que la IA amplifique lo que ya hacemos bien?"* Esa es una pregunta de liderazgo, no de *tooling*.

> La IA va rápido, pero el trabajo de adoptarla sigue siendo lento y humano. Las herramientas son la parte fácil. La parte difícil es decidir qué es "bueno", escribirlo y sostener la línea.

La IA puede ejecutar, pero no sabe a dónde vas. Puede producir, pero no sabe qué vale la pena producir. Esa parte sigue siendo nuestra. La velocidad es un regalo, la dirección es una responsabilidad. Del ingeniero en solitario del Nivel 1 a la organización nativa de IA del Nivel 5, la misma verdad se mantiene: el humano supervisa, entiende y da sentido. La máquina hace el resto.

Cuando se relaje el *hype* (y se relajará), la pregunta no va a ser *"¿usaste IA?"*, todo el mundo lo habrá hecho. La pregunta va a ser *"¿a qué nivel, y con qué dirección?"*

![Sala de lectura con un libro abierto sobre una mesa de madera](/images/blog/2026-05-01/footer.jpg)
