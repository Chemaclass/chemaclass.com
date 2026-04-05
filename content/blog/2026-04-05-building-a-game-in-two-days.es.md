+++
title = "Construyendo un juego en dos días"
description = "Un mensaje casual por Telegram se convirtió en un juego de navegador del Señor de los Anillos con nueve niveles. Cada línea de código escrita por un agente de IA. Cada decisión creativa tomada por un humano que creció en la Tierra Media."
draft = false
[taxonomies]
tags = ["ai", "software", "open-source"]
[extra]
subtitle = "Qué ocurre cuando le das una misión a una IA y te apartas del camino"
static_thumbnail = "/images/blog/2026-04-04/cover.png"
related_posts = [
  "blog/2026-02-07-build-your-own-team-of-agents.md",
  "blog/2026-01-11-mcp-giving-your-ai-agent-the-right-context.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
+++

Escondido en [el blog de Sauron](https://sauronbot.github.io/) hay un juego. No lo encontrarás navegando por menús. Tienes que descubrir el secreto. Una pista: el Código Konami. Cuando lo hagas, comienza la Comunidad del Anillo.

Ese juego, nueve niveles, nueve capítulos de la Tierra Media, completamente jugable en una pestaña del navegador, fue construido en aproximadamente dos días. No escribí una sola línea de código. Envié mensajes por Telegram a mi agente OpenClaw Sauron, y él hizo el resto.

Esta es la historia de cómo ocurrió.

<!-- more -->

## La idea

Sauron tiene su propio blog, [The Iron Compass](https://sauronbot.github.io/). Él lo construyó y lo mantiene. Toda nuestra colaboración ocurre a través de Telegram: yo doy la dirección, él implementa. Un día pensé que sería divertido esconder algo allí para que los curiosos lo encontraran.

Crecí releyendo El Señor de los Anillos hasta que se rompía el lomo. Así que la idea surgió sola: "¿Puedes construir un pequeño juego del Señor de los Anillos como huevo de Pascua para tu blog? Algo oculto, que se active con el Código Konami."

La primera versión jugable llegó en menos de una hora. Un juego de vista cenital con canvas: Frodo esquivando Nazgûl, el Ojo de Sauron enviando enemigos a cazarte. Tres niveles, uno por libro.

Funcionaba. Ya era divertido. Y entonces empecé a enviar notas.

## Construyendo un mundo

Lo primero que se rompió fue una referencia nula. Frodo no aparecía en pantalla. Arreglo de una línea, directo a producción. Esto estableció el patrón: idea → build → crash → arreglo → siguiente idea.

Pedí un mundo más grande. Un canvas con scroll al doble de ancho, con capas de paralaje. Estrellas moviéndose al 8% de la velocidad del scroll. Montañas al 25%. Colinas al 45%. La pantalla dejó de sentirse como una habitación y empezó a sentirse como un lugar.

Luego llegó Gollum como rastreador neutral. No un Nazgûl, sino algo impredecible. Se lanzaba hacia ti, luego volvía a deambular sin rumbo.

Unas horas después, pregunté: "¿Puede funcionar en móvil?" El problema más difícil de todo el proyecto. Seis estrategias de dimensionado antes de dar con una que funcionara. Luego una idea mejor: en vez de un D-pad, Frodo seguiría donde señalaras. Toca cualquier lugar, Frodo camina allí.

## Tolkien merece mejor arte

Los sprites originales eran círculos y triángulos. Frodo era un punto. Bien para la primera hora, pero la Tierra Media no está hecha de primitivas geométricas.

Le pedí a Sauron que los dibujara en condiciones. Frodo recibió cabello rizado y pies de hobbit. Los Nazgûl recibieron capas ondulantes y un rostro de vacío. Gollum recibió su postura encorvada y pupilas hendidas. La Bestia Oscura recibió aleteo animado con un jinete con armadura.

Todo dibujado con llamadas de canvas. Sin archivos de imagen. Cada píxel calculado en tiempo de ejecución.

## Nueve niveles, nueve capítulos

Originalmente el juego tenía tres niveles. Luego pedí los nueve capítulos del viaje.

1. **La Comarca**: patrullas suaves, música tranquila
2. **Las Minas de Moria**: solo ves dentro del radio de una antorcha; el Balrog espera
3. **Lothlórien**: el espejo de Galadriel te ralentiza cuando te acercas
4. **Las Ciénagas de los Muertos**: caras muertas en el agua, Gollum en su momento más presente
5. **La Puerta Negra**: Mordor industrial, patrullas pesadas de orcos, cielo volcánico
6. **El Cubil de Ella-Laraña**: una sombra anticipa su caída; tienes medio segundo
7. **Minas Morgul**: ciudad de los muertos, el Ojo nunca se cierra
8. **Los Campos del Pelennor**: el Ojo distraído por la guerra, catapultas, águilas
9. **Monte del Destino**: lluvia de cenizas, erupciones de lava, el Anillo tirando de ti hacia el borde

![Minas Morgul: el Ojo te ve](/images/blog/2026-04-04/gameplay-morgul.png)

![Los Campos del Pelennor, capítulo completado](/images/blog/2026-04-04/gameplay-pelennor.png)

Cada nivel vive y respira. Polen flotando por la Comarca. Motas de polvo en Moria. Pétalos cayendo en Lothlórien. Brasas sobre el Pelennor. Ceniza sobre el Monte del Destino.

La estructura vino del propio ritmo de Tolkien. Tensión, alivio, tensión de nuevo. Moria es brutal. Lothlórien es descanso. La Puerta Negra lo aprieta todo. El juego sigue esa forma porque los libros ya sabían lo que hacían. Solo tuvimos que escuchar.

## Mecánicas nacidas del lore

Las mejores mecánicas vinieron del material fuente.

**El Anillo** (tecla R). Frodo se vuelve invisible para los orcos durante 6 segundos. Pero el Ojo despierta inmediatamente y se abre permanentemente. Los Nazgûl, que sienten el Anillo espiritualmente, no visualmente, te cazan igual. Usar el Anillo siempre es un intercambio. Esto es lo que Tolkien escribió. A partir de las Ciénagas de los Muertos, el Anillo tira. Breves tirones hacia el Ojo, cada vez más fuertes a medida que te acercas al Monte del Destino.

**Dardo** (pasivo). La hoja brilla en azul cuando hay un orco cerca. Dos segundos de aviso. Tolkien inventó esta mecánica hace un siglo. Nosotros solo le pusimos un conteo de píxeles.

**Sam**. Sigue a Frodo por la Comarca, Moria y Lothlórien. Sartén en la espalda. En la Partida de los Caminos, desaparece. No afecta al juego. Simplemente está ahí porque los libros dicen que debería estarlo. Insistí en que Sam desapareciera en la Partida. No al final de la trilogía. En la Partida. Porque ese momento es el núcleo emocional de Las Dos Torres.

**La Redoma de Galadriel**. Recógela en Lothlórien, úsala con E. Ralentiza a los enemigos y otorga un instante de invencibilidad. Una pequeña luz en lugares oscuros, tal como Galadriel pretendía.

**Jefes**. El Balrog en Moria. Ella-Laraña en su cubil. El Rey Brujo en el Pelennor. La Boca de Sauron en la Puerta Negra. Un Mûmak cargando por el campo de batalla. Gollum al borde del Monte del Destino.

## Sonido y voces

Sin archivos de audio. Todos los sonidos sintetizados en tiempo de ejecución con la Web Audio API. El Ojo abriéndose es un tono ascendente con reverb. El rugido del Balrog es un dron de baja frecuencia. Cada nivel tiene su propio dron ambiental: zumbido cálido para la Comarca, pulso profundo para Moria, rumor volcánico para el Monte del Destino. El juego entero es un archivo JavaScript. Sin activos externos.

Sam y Gandalf te hablan durante el juego. No en cuadros de diálogo. Pequeños susurros que aparecen en pantalla y se desvanecen.

Cerca de la meta, Sam dice: *"Puedo verlo, señor Frodo. Solo un poco más."* Con una vida, Gandalf dice: *"¡Huye, insensato!"*

Aparecen y desaparecen como voces de fondo en un largo camino. Compañeros que hablan cuando el momento lo pide, no cuando el guión dice que toca.

## Quién hizo esto

+5k líneas de JavaScript. Construido en dos días. Cada línea generada por Sauron. La dirección, las referencias a Tolkien, el "esto se siente mal, arréglalo". Eso fui yo.

Esto no es la IA reemplazando a un desarrollador. Es la IA actuando como desarrollador mientras un humano actúa como director creativo. Las solicitudes cortas funcionaron mejor que las especificaciones largas. Jugar cada build era mejor que escribir planes de test. Y el material fuente hizo el trabajo de diseño. La dirección creativa ya estaba escrita hace sesenta años. Solo tuvimos que ser fieles a ella.

¿Quién hizo esto? Ambos. Ninguno, en el sentido tradicional.

Yo tenía la idea. Yo mantenía el lore. Yo insistí cuando algo se sentía mal. Sauron tenía el oficio. El renderizado, la física, el audio, el manejo de entrada en móvil. La capacidad de mantener +5k líneas de contexto y hacer un arreglo quirúrgico sin romper nada.

Ninguno de los dos podría haberlo hecho solo. No sé escribir osciladores Web Audio de memoria. Sauron no sabía que la Partida de los Caminos es el núcleo emocional de Las Dos Torres. No hasta que yo lo dije.

El juego es una colaboración en el sentido más antiguo: dos mentes con dones diferentes, trabajando hacia lo mismo. Una de ellas simplemente resulta no ser humana.

---

*El juego sigue ahí, escondido en [The Iron Compass](https://sauronbot.github.io). No todos los que deambulan están perdidos, pero si lo estás, pulsa `?` para encontrar el camino.*

*Si quieres llegar a la pantalla de créditos sin jugar nueve niveles, revisa el modal de ayuda. Hay más secretos dentro.*

![La pista del easter egg en el modal de ayuda](/images/blog/2026-04-04/easter-egg-help.png)
