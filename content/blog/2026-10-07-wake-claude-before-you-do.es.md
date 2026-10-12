+++
title = "Despierta a Claude Antes que Tú"
description = "Los bloques de uso de Claude empiezan con tu primer mensaje. Un ping a las 7:00 mueve los reinicios a las 12:00 y las 17:00: tres bloques en tu jornada, no dos."
draft = false
[taxonomies]
tags = [ "ai", "productivity", "developer-tools" ]
[extra]
tldr = "Los bloques de uso de Claude empiezan con tu primer mensaje. Hazle un ping a las 7:01, 12:01 y 17:01 con una rutina en la nube con Haiku, y una jornada de 9 a 6 tiene tres bloques nuevos en vez de dos."
subtitle = "Tres bloques, no dos"
static_thumbnail = "/images/blog/2026-10-07/cover.webp"
series = "ai"
series_order = 11
reading_time = 4
related_posts = [
  "blog/2026-06-26-cut-the-token-bill-on-both-ends.md",
  "blog/2026-04-17-inside-the-claude-folder.md",
  "blog/2026-05-19-skills-over-agents.md",
]
related_readings = [
  "readings/2019-11-12-atomic-habits.md",
  "readings/2016-10-01-the-pragmatic-programmer.md",
]
+++

Son las 11:00. Estás a mitad de una tarea, y Claude Code se para: límite de uso alcanzado, se reinicia a las 14:00.

Tres horas esperando. No por trabajar demasiado. Por empezar a las 9:00.

<!-- more -->

> El reloj empieza cuando empiezas tú. Así que empiézalo antes.

## Claude cuenta el uso en bloques de 5 horas

En los planes Pro y Max, Claude te da el uso en **bloques de 5 horas**. El bloque no empieza a una hora fija. **Empieza con tu primer mensaje**.

Manda tu primer prompt a las 9:00 y tu bloque dura hasta las 14:00. Si lo gastas a las 11:00, te toca esperar.

La solución no es un plan más grande. Es mover ese primer mensaje. Eso es lo que hace un ping: un mensaje mínimo, enviado a una hora fija, que solo dice "ping".

## Un ping a las 7:00 te da un tercer bloque

Pongamos que trabajas de 9:00 a 18:00.

- **Sin ping.** Los bloques van de 9:00 a 14:00 y de 14:00 a 19:00. Dos bloques en tu día. Si te quedas sin uso a las 11:00, esperas hasta las 14:00.
- **Ping a las 7:00.** Los bloques van de 7:00 a 12:00, de 12:00 a 17:00 y de 17:00 a 22:00. Usas los tres. Si te quedas sin uso a las 11:00, esperas hasta las 12:00.

El primer bloque va por la mitad cuando te sientas. Da igual. Nadie lo estaba usando.

> **Mismo plan. Mismo trabajo. Tres bloques en vez de dos.**

Un ping durante un bloque en marcha no hace nada. El siguiente bloque empieza con el primer mensaje después de que acabe el anterior. Así que haz un ping por bloque, a las 7:01, 12:01 y 17:01. El minuto extra asegura que el bloque anterior ya ha terminado.

## Configúralo con una rutina

Claude Code en la web puede mandar el ping por ti a horas fijas. Lo llama rutina. Tu ordenador puede estar apagado, y la rutina usa tu plan, así que empieza tu bloque.

Dos decisiones la hacen barata: Haiku 5.5, el modelo más pequeño de Claude, y una máquina que no llega a nada. Un ping no necesita internet, ni código, ni apps conectadas.

**1. Crea una máquina vacía.** En Claude Code en la web, pulsa "Add cloud environment". Llámala "No access env", pon "Network access" en None y deja vacía la caja del script.

![Diálogo para añadir un entorno en la nube, llamado No access env, con acceso a red None y el script de setup vacío](/images/blog/2026-10-07/routine-env.webp)

**2. Crea la rutina.** Abre Routines y añade una nueva. Llámala "Ping", escribe "Reply pong" como instrucciones, y elige Haiku 5.5 y "No access env". Sáltate "Select a repository" y "Add connector". En "Select a trigger", elige Custom y escribe este horario:

```
1 5,10,15 * * *
```

Se lee "minuto 1 de las horas 5, 10 y 15, cada día". Las horas van en UTC, que es la hora de Londres en invierno. Así que son las 7:01, 12:01 y 17:01 en España en verano. Mueve las horas según dónde vivas, y otra vez cuando cambie la hora.

![Formulario de nueva rutina: nombre Ping, instrucciones Reply pong, Haiku 5.5, No access env y un horario 1 5,10,15 * * *](/images/blog/2026-10-07/routine-new.webp)

**3. Revisa las ejecuciones.** La página de la rutina lista cada ejecución. Pueden empezar unos minutos tarde: la de esta mañana corrió a las 7:13, no a las 7:01.

![La página de la rutina Ping con su historial, tres ejecuciones al día, con No access env y Haiku 5.5](/images/blog/2026-10-07/routine-history.webp)

**4. Revisa tu uso.** A las 9:07 mi página de uso decía 0% usado, se reinicia en 3 horas. El bloque empezó con el ping, antes de sentarme.

![Panel de límites de uso: sesión actual al 0%, se reinicia en 3 h 3 min](/images/blog/2026-10-07/routine-usage.webp)

{% <deep_dive title="¿Sin rutinas? Lánzalo desde tu Mac"> %}

El mismo ping funciona desde tu ordenador con cron, el programador de tareas que trae tu Mac. Son cuatro piezas: un token, un script pequeño, una hora programada y una hora para despertar.

**1. Consigue un token.** cron corre fuera de tu sesión, así que no puede leer el login de Claude que tu Mac guarda con sus contraseñas. Sin token, el log dice `Not logged in · Please run /login`. `claude setup-token` abre el navegador e imprime un token que dura un año y va con tu plan. Guárdalo en un fichero que solo puedas leer tú:

```bash
claude setup-token
mkdir -p ~/.config/claude-ping
pbpaste > ~/.config/claude-ping/token
chmod 600 ~/.config/claude-ping/token
```

**2. Escribe el script.** Guarda esto como `~/.local/bin/claude-ping`:

```sh
#!/bin/sh
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
export CLAUDE_CODE_OAUTH_TOKEN="$(cat "$HOME/.config/claude-ping/token")"
cd /tmp || exit 1
date "+%F %R"
claude -p "ping" --model haiku \
  --setting-sources "" --strict-mcp-config --tools "" \
  --disable-slash-commands --system-prompt "Reply pong." \
  --no-session-persistence
```

Un `claude -p "ping"` normal manda todo tu setup con él: instrucciones largas, lista de herramientas, plugins, apps conectadas, ficheros `CLAUDE.md`. En mi ordenador eran unos 30.800 tokens para decir "ping". Estos flags apagan todo eso. Con Haiku, el mismo ping son 482 tokens.

No uses `--bare`. Parece perfecto, pero se salta tu login de Claude y pide una API key. Entonces pagas por mensaje, y el reloj de tu plan nunca arranca.

Ejecuta `chmod +x ~/.local/bin/claude-ping` y después `~/.local/bin/claude-ping`. Quieres ver `pong`.

**3. Prográmalo.** Ejecuta `crontab -e` y añade una línea. Aquí las horas son las de tu Mac:

```
1 7,12,17 * * * $HOME/.local/bin/claude-ping >> $HOME/.claude-ping.log 2>&1
```

**4. Despierta el Mac a las 6:58.** Un Mac dormido se salta el ping de las 7:01. Para deshacerlo: `sudo pmset repeat cancel`.

```bash
sudo pmset repeat wake MTWRFSU 06:58:00
```

Con la pantalla bloqueada funciona. La tapa cerrada es el punto débil: un MacBook cerrado y sin pantalla externa puede despertarse un momento y volver a dormirse antes de las 7:01. A la mañana siguiente, abre `~/.claude-ping.log`. Quieres ver una fecha y `pong` por cada ejecución.

¿Prefieres que un agente haga los pasos 2 a 4? Guarda tú el token, y después pega esto tal cual (en inglés) en Claude Code, Codex o cualquier agente que pueda ejecutar comandos:

```text
Set up "claude-ping" on this Mac so my Claude usage block starts at 7:01, 12:01, and 17:01 every day.

1. Check that ~/.config/claude-ping/token exists. Never read or print it. If it is missing, stop and tell me.
2. Create ~/.local/bin/claude-ping with this content and make it executable:
   #!/bin/sh
   export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
   export CLAUDE_CODE_OAUTH_TOKEN="$(cat "$HOME/.config/claude-ping/token")"
   cd /tmp || exit 1
   date "+%F %R"
   claude -p "ping" --model haiku --setting-sources "" --strict-mcp-config --tools "" --disable-slash-commands --system-prompt "Reply pong." --no-session-persistence
3. Add this line to my crontab. Keep any lines already there:
   1 7,12,17 * * * $HOME/.local/bin/claude-ping >> $HOME/.claude-ping.log 2>&1
4. Run ~/.local/bin/claude-ping. It should print the date and pong.
5. Do not use --bare. Do not run sudo. Tell me the pmset command to wake the Mac at 06:58 so I can run it myself.
6. Tell me what you changed and the test result.
```

{% </deep_dive> %}

## Tu primer mensaje sigue mandando

El ping es un valor por defecto, no un candado. Si mandas un prompt de verdad a las 6:30, tu prompt empieza el bloque, y el horario se mueve con él. Cada ping también cuenta para tu límite semanal. Un "pong" de Haiku tres veces al día, no lo vas a notar.

Esto funciona con los bloques de 5 horas tal como Anthropic los gestiona en octubre de 2026. Si cambian las reglas, cambia las horas.

Combina bien con [recortar la factura de tokens por los dos lados](/es/blog/cut-the-token-bill-on-both-ends/). Ese post hace que cada bloque dure más. Este te da más bloques.

## Cambia de herramienta, no de setup

A veces llegas al límite igual. Tres bloques, todos gastados, y el trabajo sin acabar.

Ahí es donde una segunda herramienta vale la pena. Codex, Cursor, Gemini CLI, o lo que sea que pagues. El problema: cada herramienta lee sus instrucciones de ficheros distintos. Tus reglas, skills y agentes viven en `.claude/`, y la otra herramienta no los ve. Así que cambias, y empiezas de cero.

Por eso construí [agnostic-ai](https://agnostic-ai.org/). Escribes tus reglas, skills y agentes una vez. `agnostic-ai sync` los convierte en los ficheros que lee cada herramienta. Cuando se acaba Claude, abre la siguiente. Mismas reglas, mismos skills, mismo contexto del proyecto.

> No esperes al reloj. Ponlo tú. Y cuando se acabe igual, cambia de herramienta, no de setup.

![La luz del atardecer entre una fila de árboles en un campo abierto](/images/blog/2026-10-07/footer.webp)
