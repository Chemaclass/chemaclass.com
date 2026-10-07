+++
title = "Despierta a Claude Antes que Tú"
description = "Los bloques de uso de Claude empiezan con tu primer mensaje. Un ping a las 7:00 mueve los reinicios a las 12:00 y las 17:00: tres bloques en tu jornada, no dos."
draft = false
[taxonomies]
tags = [ "ai", "productivity", "developer-tools" ]
[extra]
tldr = "Los bloques de uso de Claude empiezan con tu primer mensaje. Hazle un ping a las 7:00, 12:00 y 17:00 con una llamada de 500 tokens y una jornada de 9 a 6 tiene tres bloques nuevos en vez de dos."
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

La solución no es un plan más grande. Es mover ese primer mensaje.

Eso es lo que hace un ping. Un mensaje mínimo, enviado a una hora fija, que solo dice "ping".

## Un ping a las 7:00 te da un tercer bloque

Pongamos que trabajas de 9:00 a 18:00.

- **Sin ping.** Los bloques van de 9:00 a 14:00 y de 14:00 a 19:00. Dos bloques en tu día. Si te quedas sin uso a las 11:00, esperas hasta las 14:00.
- **Ping a las 7:00.** Los bloques van de 7:00 a 12:00, de 12:00 a 17:00 y de 17:00 a 22:00. Usas los tres. Si te quedas sin uso a las 11:00, esperas hasta las 12:00.

El primer bloque va por la mitad cuando te sientas. Da igual. Nadie lo estaba usando.

> **Mismo plan. Mismo trabajo. Tres bloques en vez de dos.**

Si nunca llegas al límite, sáltate este post. Si llegas casi cada día, sigue leyendo.

## Ping cada 5 horas, no cada 2

Mi primera idea fue hacer ping cada 2 o 3 horas, para tener a Claude "caliente" todo el día. Mala idea.

No hay nada que calentar. Un ping no hace a Claude más rápido. Solo decide cuándo empieza un bloque. Y **un ping durante un bloque en marcha no hace nada**. El siguiente bloque empieza con el primer mensaje después de que acabe el anterior.

Con pings a las 7, 9, 11 y 13, el reinicio de las 12:00 espera a tu ping de las 13:00. Pierdes una hora en cada reinicio.

Así que las horas del ping tienen que cuadrar con los bloques: 7:01, 12:01, 17:01. El minuto extra asegura que el bloque anterior ya ha terminado.

## Haz que el ping no cueste casi nada

Un `claude -p "ping"` normal no es pequeño. Claude Code manda todo tu setup en cada llamada: sus instrucciones largas, su lista de herramientas, tus plugins, tus apps conectadas, tus ficheros `CLAUDE.md`. En mi ordenador eran **unos 30.800 tokens** (las unidades con las que Claude cuenta tu uso) para decir "ping".

Apaga todo eso y usa Haiku, el modelo más pequeño y barato de Claude. La misma comprobación, **482 tokens**. Unas 60 veces menos.

> Un ping solo tiene que llegar. No necesita todo tu setup.

{% <deep_dive title="Los flags que lo hacen pequeño"> %}

```bash
claude -p "ping" --model haiku \
  --setting-sources "" \
  --strict-mcp-config \
  --tools "" \
  --disable-slash-commands \
  --system-prompt "Reply pong." \
  --no-session-persistence
```

- `--setting-sources ""` ignora tus settings y plugins.
- `--strict-mcp-config` ignora tus apps conectadas (servidores MCP).
- `--tools ""` no manda la lista de tools.
- `--disable-slash-commands` ignora tus skills.
- `--system-prompt "Reply pong."` sustituye las instrucciones largas por defecto.
- `--no-session-persistence` no guarda el chat.

Una trampa: **no uses `--bare`**. Parece perfecto, pero se salta tu login de Claude y pide una API key. Entonces pagas por mensaje, y el reloj de tu plan nunca arranca.

{% </deep_dive> %}

## Configúralo una vez

En un Mac son cuatro piezas: un token, un script pequeño, una hora programada y una hora para despertar.

El token me pilló por sorpresa. Mi primera versión se lanzaba a su hora y no hacía nada. El log decía por qué: `Not logged in · Please run /login`. El programador de tareas corre fuera de tu sesión, así que no puede leer el login de Claude que tu Mac guarda con sus contraseñas. `claude setup-token` te da un token que dura un año y va con tu plan.

La hora de despertar también importa. Un Mac dormido se salta el ping de las 7:01, y un ping a las 10:00 empieza tu bloque a las 10:00. Adiós ventaja. Así que el Mac se despierta solo a las 6:58.

Con la pantalla bloqueada funciona. El ping no necesita tu contraseña. La tapa cerrada es el punto débil: un MacBook cerrado y sin pantalla externa puede despertarse un momento y volver a dormirse antes de las 7:01. Un Mac apagado no se despierta.

{% <deep_dive title="Paso a paso"> %}

**1. Consigue un token.** `claude setup-token` abre el navegador e imprime un token. Cópialo y guárdalo en un fichero que solo puedas leer tú:

```bash
claude setup-token
mkdir -p ~/.config/claude-ping
pbpaste > ~/.config/claude-ping/token
chmod 600 ~/.config/claude-ping/token
```

**2. Escribe el script.** Guarda esto como `~/.local/bin/claude-ping`. Cambia `/path/to/claude` por lo que te dé `which claude`:

```sh
#!/bin/sh
export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
export CLAUDE_CODE_OAUTH_TOKEN="$(cat "$HOME/.config/claude-ping/token")"
cd /tmp || exit 1
date "+%F %R"
/path/to/claude -p "ping" --model haiku \
  --setting-sources "" --strict-mcp-config --tools "" \
  --disable-slash-commands --system-prompt "Reply pong." \
  --no-session-persistence
```

Ejecuta `chmod +x ~/.local/bin/claude-ping` y después `~/.local/bin/claude-ping`. Quieres ver `pong`.

**3. Prográmalo.** cron es el programador de tareas que trae tu Mac. Ejecuta `crontab -e` y añade una línea:

```
1 7,12,17 * * * $HOME/.local/bin/claude-ping >> $HOME/.claude-ping.log 2>&1
```

**4. Despierta el Mac a las 6:58.** Para deshacerlo: `sudo pmset repeat cancel`.

```bash
sudo pmset repeat wake MTWRFSU 06:58:00
```

A la mañana siguiente, abre `~/.claude-ping.log`. Quieres ver una fecha y `pong` por cada ejecución. Si tu portátil duerme cerrado, pruébalo una noche con la tapa bajada.

{% </deep_dive> %}

{% <deep_dive title="Un prompt para que tu agente lo configure"> %}

Ejecuta tú `claude setup-token` y guarda el token como en el paso 1. Después pega esto tal cual (en inglés) en Claude Code, Codex o cualquier agente que pueda ejecutar comandos:

```text
Set up "claude-ping" on this Mac so my Claude usage block starts at 7:01, 12:01, and 17:01 every day.

1. Check that ~/.config/claude-ping/token exists. Never read or print it. If it is missing, stop and tell me.
2. Run `which claude` and use that full path as <CLAUDE_PATH>.
3. Create ~/.local/bin/claude-ping with this content and make it executable:
   #!/bin/sh
   export PATH="$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
   export CLAUDE_CODE_OAUTH_TOKEN="$(cat "$HOME/.config/claude-ping/token")"
   cd /tmp || exit 1
   date "+%F %R"
   <CLAUDE_PATH> -p "ping" --model haiku --setting-sources "" --strict-mcp-config --tools "" --disable-slash-commands --system-prompt "Reply pong." --no-session-persistence
4. Add this line to my crontab. Keep any lines already there:
   1 7,12,17 * * * $HOME/.local/bin/claude-ping >> $HOME/.claude-ping.log 2>&1
5. Run ~/.local/bin/claude-ping. It should print the date and pong.
6. Do not use --bare. Do not run sudo. Tell me the pmset command to wake the Mac at 06:58 so I can run it myself.
7. Tell me what you changed and the test result.
```

{% </deep_dive> %}

## Tu primer mensaje sigue mandando

El ping es un valor por defecto, no un candado. Si mandas un prompt de verdad a las 6:30, tu prompt empieza el bloque, y el horario se mueve con él. Cada ping también cuenta para tu límite semanal. Con 482 tokens en Haiku, tres veces al día, no lo vas a notar.

Esto funciona con los bloques de 5 horas tal como Anthropic los gestiona en octubre de 2026. Si cambian las reglas, cambia las horas.

Combina bien con [recortar la factura de tokens por los dos lados](/es/blog/cut-the-token-bill-on-both-ends/). Ese post hace que cada bloque dure más. Este te da más bloques.

## Cambia de herramienta, no de setup

A veces llegas al límite igual. Tres bloques, todos gastados, y el trabajo sin acabar.

Ahí es donde una segunda herramienta vale la pena. Codex, Cursor, Gemini CLI, o lo que sea que pagues. El problema: cada herramienta lee sus instrucciones de ficheros distintos. Tus reglas, skills y agentes viven en `.claude/`, y la otra herramienta no los ve. Así que cambias, y empiezas de cero.

Por eso construí [agnostic-ai](https://agnostic-ai.org/). Escribes tus reglas, skills y agentes una vez. `agnostic-ai sync` los convierte en los ficheros que lee cada herramienta. Cuando se acaba Claude, abre la siguiente. Mismas reglas, mismos skills, mismo contexto del proyecto.

> No esperes al reloj. Ponlo tú. Y cuando se acabe igual, cambia de herramienta, no de setup.

![La luz del atardecer entre una fila de árboles en un campo abierto](/images/blog/2026-10-07/footer.webp)
