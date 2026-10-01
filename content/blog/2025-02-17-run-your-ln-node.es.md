+++
title = "Ejecuta tu Nodo LN en una Raspberry Pi"
description = "Cómo montar un nodo Lightning auto-custodiado con Alby Hub en una Raspberry Pi. Control total sobre tus fondos, 100% open source."
draft = false
[taxonomies]
tags = [ "bitcoin", "open-source", "privacy", "tutorial" ]
[extra]
subtitle = "Toma el control total de tus pagos Lightning con Alby Hub"
static_thumbnail = "/images/blog/2025-02-17/cover.webp"
related_posts = [
  "blog/2024-07-06-programmable-money.md",
  "blog/2025-11-21-bitcoin-fundamentals.md",
  "blog/2024-12-11-the-cypherpunks.md",
]
related_readings = [
  "readings/2024-07-05-mastering-bitcoin.md",
  "readings/2021-09-20-the-bitcoin-standard.md",
  "readings/2023-07-10-the-book-of-satoshi.md",
]
+++


En esta guía te muestro cómo configurar un nodo de Lightning Network (LN) con Alby Hub en una Raspberry Pi. Tendrás control total sobre tu nodo. Alby Hub ofrece una versión DIY gratuita para una wallet Lightning auto-custodiada: tus fondos son tuyos, y el código es 100% open-source.

<!-- more -->

Soporta direcciones Lightning y Nostr, conectando ambos ecosistemas sin problemas. Se integra con docenas de aplicaciones [Bitcoin](/es/blog/bitcoin-fundamentals/). Con los servicios LSP (Lightning Service Provider) integrados y la app Alby Go, gestionar tu nodo desde el móvil es muy fácil.

---

> Importante: Esto NO es un minero de Bitcoin ni un nodo completo. Es simplemente una Raspberry Pi ejecutándose en una tarjeta SD eficiente en energía y de bajo coste.

⚠️ **Aviso** ⚠️
- Asumo que **entiendes los conceptos fundamentales de [Bitcoin](https://bitcoin.org/)**.
- Asumo que sabes **cómo funciona la [Lightning Network](https://lightning.network/) (LN)**.

De todos modos, he incluido un breve repaso de los fundamentos de Lightning Network abajo.

## ¿Qué es la Lightning Network?

La LN es una capa construida sobre Bitcoin que permite transacciones rápidas, baratas y escalables.

- **¿Por qué?** La capa base de Bitcoin es segura pero lenta y cara para pagos pequeños, por los límites de bloque y las comisiones.
- **¿Cómo?** LN usa canales de pago fuera de la cadena. Puedes enviar pagos al instante sin esperar confirmaciones en la [blockchain](/es/blog/how-bitcoin-works/).

### Conceptos clave

- **Canales de pago**: Abres un canal con una transacción on-chain. Después puedes enviar pagos instantáneos e ilimitados dentro de ese canal.
- **Enrutamiento**: No necesitas canal directo con todos. Los pagos se enrutan a través de múltiples nodos conectados.
- **Comisiones bajas**: Solo abrir y cerrar canales requiere comisiones on-chain. El resto cuesta fracciones de céntimo.

### Objetivo

LN hace Bitcoin usable para el día a día. Puedes comprar un café sin esperar 10 minutos por confirmaciones.

> En resumen: Lightning Network = Pagos Bitcoin instantáneos + baratos, asegurados por la blockchain de Bitcoin.

---

## Configurando Alby Hub

[Alby Hub](https://albyhub.com/) es un nodo de Lightning Network gratuito, open-source ([idealmente privado](https://guides.getalby.com/user-guide/alby-account-and-browser-extension/alby-hub/faq-alby-hub/should-i-open-a-private-or-public-channel)).

### Requisitos

Antes de empezar, vas a necesitar las siguientes cosas:

- Un ordenador con windows, mac o linux
- **Raspberry Pi 4** o **5** (Para [**Zero 2W** mira este tutorial!](https://guides.getalby.com/user-guide/alby-account-and-browser-extension/hidden-archives/raspberry-pi-zero))
  - _En este tutorial, estoy usando una raspi-4b (~60€)_
- El cargador para tu raspi _(~10€)_
- Tarjeta de memoria SD (32/64gb) _(~10€)_
- Adaptador de tarjeta SD a USB (para flashear el SO en la raspi) _(~10€)_

![Raspberry Pi en su carcasa negra junto a su cable de alimentación USB-C, una tarjeta microSD de 64GB y un lector de tarjetas](/images/blog/2025-02-17/requirements.webp)

### Pasos de instalación

#### 1. Flashear un kernel Linux en la tarjeta SD

> Sugerencia: Puedes usar [RPI imager](https://www.raspberrypi.com/software/) en tu ordenador.
Úsalo para flashear el SO raspi recomendado para ti

![Raspberry Pi Imager con Raspberry Pi 4, Raspberry Pi OS (64-bit) y la tarjeta SD seleccionados](/images/blog/2025-02-17/tuto-1.webp)

En Storage verás tu tarjeta SD después de insertarla en tu portátil.

![Lista de almacenamiento de Raspberry Pi Imager con la tarjeta SD insertada, 63.3 GB](/images/blog/2025-02-17/tuto-2.webp)

Una vez hagas clic en "Next", verás diferentes ajustes. Haz clic en **Edit Settings**

![Raspberry Pi Imager preguntando si aplicar los ajustes de personalización del sistema, con el botón Edit Settings](/images/blog/2025-02-17/tuto-3.webp)

En `Settings > General`: establece tu hostname, el nombre de usuario y contraseña para tu usuario admin.
Asegúrate de habilitar tu WIFI, de lo contrario tendrás que conectarla al router con un RJ-45.
<span id="hostname-setup"></span>
> Para este tutorial, estoy usando `testhub` como hostname, puedes usar `albyhub` o lo que prefieras.

![OS Customisation, pestaña General: hostname testhub, usuario, contraseña y red WiFi](/images/blog/2025-02-17/tuto-4.webp)

<span id="pi-enable-ssh"></span>
En `Settings > Services`: asegúrate de que el acceso vía SSH está habilitado. Lo vamos a necesitar para instalar Alby Hub.

![OS Customisation, pestaña Services: Enable SSH con autenticación por contraseña](/images/blog/2025-02-17/tuto-5.webp)

Haz clic en "Save" y haz clic en "Yes" para iniciar la instalación.

![Raspberry Pi Imager avisando de que se borrarán todos los datos de la tarjeta SD](/images/blog/2025-02-17/tuto-6.webp)

Verás una confirmación. Haz clic en "Yes". Tardará ~10 mins...

![Aviso de macOS pidiendo Touch ID o contraseña mientras Raspberry Pi Imager empieza a escribir](/images/blog/2025-02-17/tuto-7.webp)

¡Ahora tenemos la SD con un kernel linux fresco listo para usar!

![Mensaje Write Successful: Raspberry Pi OS ya está en la tarjeta SD y se puede extraer](/images/blog/2025-02-17/tuto-8.webp)

#### 2. Insertar la SD en la raspi

Extrae la SD del portátil e insértala en la raspi primero.

![Mano insertando la tarjeta microSD en la ranura de la carcasa de la Raspberry Pi](/images/blog/2025-02-17/tuto-9.webp)

Una vez insertada la SD, conecta el cable de alimentación. Se encenderá automáticamente en cuanto la conectes.

![Raspberry Pi encendida con el cable de alimentación conectado y los LEDs rojo y verde iluminados](/images/blog/2025-02-17/tuto-10.webp)

#### 3. Instalación de Alby Hub

Tardará ~5mins desde que la encendiste para poder acceder a ella. ¿Cómo puedes asegurarte de que está viva? Abre la terminal y haz ping al hostname que definiste mientras flasheabas la SD en [Settings > General](/es/blog/run-your-ln-node/#hostname-setup), recuerda que terminaba con `.local`:
```bash
ping testhub.local
```

Es normal si no obtienes respuesta al principio... hasta que la obtienes.

![Salida del terminal con ping a testhub.local respondiendo, así que la Raspberry Pi es accesible](/images/blog/2025-02-17/tuto-11.webp)

<span id="pi-install-alby-hub"></span>
Ahora puedes **instalar Alby Hub** en tu raspi **usando la conexión SSH** que [habilitaste antes](/es/blog/run-your-ln-node/#pi-enable-ssh):

```bash
# Código fuente: https://github.com/getAlby/hub/tree/master/scripts/pi-aarch64
ssh testhub@testhub.local '/bin/bash -c "$(curl -fsSL https://getalby.com/install/hub/pi-aarch64-install.sh)"'
```

Se te pedirá que escribas la palabra "yes"; escríbela.

![Terminal ejecutando el script de instalación de Alby Hub por SSH y pidiendo confirmar la huella del host](/images/blog/2025-02-17/tuto-12.webp)

Luego, se te pedirá que introduzcas tu contraseña. Introduce la contraseña que elegiste en [Settings > General](/es/blog/run-your-ln-node/#hostname-setup) para el nombre de usuario.

![Salida del terminal que termina con Installation finished y la URL http://testhub.local](/images/blog/2025-02-17/tuto-13.webp)

#### 4. Configuración de Alby Hub

Espera otros 2-3 mins y visita tu host: `http://testhub.local/`

![Pantalla de bienvenida de Alby Hub servida desde testhub.local en el navegador](/images/blog/2025-02-17/tuto-14.webp)

Tu Alby hub ya está funcionando. ¡Vamos a conectarlo a tu cuenta GetAlby!

---

## Crear una cuenta GetAlby
🔗 [getalby.com](https://getalby.com/)

![Formulario de registro de GetAlby pidiendo nombre y email](/images/blog/2025-02-17/tuto-15.webp)

---

## Conectando GetAlby con Alby Hub
Creé una cuenta llamada testhub.

**Izquierda**: la cuenta GetAlby. **Derecha**: el nodo en la raspi.

![Panel de GetAlby con 0 sats a la izquierda y la pantalla de bienvenida de Alby Hub a la derecha](/images/blog/2025-02-17/tuto-16.webp)

Haz clic en "**Connect Now**".

![Paso de Alby Hub Connect Your Alby Account, con la lista de ventajas y el botón Connect now](/images/blog/2025-02-17/tuto-17.webp)

Haz clic en "**Request Authorization Code**".

![Paso de Alby Hub con el botón Request Authorization Code](/images/blog/2025-02-17/tuto-18.webp)

Obtienes el código de autorización (**izquierda**) que necesitas insertar en tu configuración (**derecha**).

![Página de GetAlby con el código de autorización, junto al campo de Alby Hub donde se pega](/images/blog/2025-02-17/tuto-19.webp)

<span id="alby-hub-password"></span>
Crea una **Contraseña** para tu Alby Hub instalado en tu raspi. Puede ser diferente de la contraseña que configuraste para tu usuario root en la raspi misma.

![Pantalla Create Password de Alby Hub con dos campos de contraseña y dos casillas de confirmación](/images/blog/2025-02-17/tuto-20.webp)

![Alby Hub mostrando Setting up your Hub mientras arranca el nodo](/images/blog/2025-02-17/tuto-21.webp)

![Página de inicio de Alby Hub con los cinco pasos iniciales, empezando por Open your first channel](/images/blog/2025-02-17/tuto-22.webp)

Ahora es momento de **Vincular tu Cuenta Alby**

![Página Link Alby Account to Wallet de GetAlby junto a la página Connections de Alby Hub](/images/blog/2025-02-17/tuto-23.webp)

A menos que especifiques lo contrario, establece el "Budget renewal: _Monthly 1M sats_" por defecto.

![Diálogo Link to Alby Account de Alby Hub con renovación mensual y 1M sats de presupuesto seleccionados](/images/blog/2025-02-17/tuto-24.webp)
![Alby Hub mostrando Alby Account Linked con un presupuesto de 1.000.000 sats, y GetAlby con la wallet enlazada](/images/blog/2025-02-17/tuto-25.webp)

---

## Abriendo canales Lightning
Recomiendo seguir los **Pasos Iniciales** para configurar tu Alby Hub.

![Página de inicio de Alby Hub con el paso Link to your Alby Account hecho y Open your first channel pendiente](/images/blog/2025-02-17/tuto-27.webp)

Abramos el primer canal.

![Página Open Your First Channel con el botón Open Channel](/images/blog/2025-02-17/tuto-28.webp)

Necesitas pagar ~$20 en sats para abrir un canal de _**liquidez entrante**_ de 1M sats.

![Código QR de la factura Lightning de 19.897 sats (unos 19 USD) para pagar un canal con 1M sats de liquidez entrante](/images/blog/2025-02-17/tuto-29.webp)

Después del pago, verás el canal abierto. Puede tardar un par de minutos hasta que la **_transacción de financiación_** sea minada en el siguiente bloque.

![Página Node de Alby Hub con el nuevo canal online y un menú para ver la funding transaction](/images/blog/2025-02-17/tuto-30.webp)

---

## Recibiendo Sats
Puedes recibir sats usando tu Dirección LN.

**Izquierda**: Página pública vinculada a tu [nodo](https://getalby.com/p/chemaclass).
**Derecha**: Página privada de tu Alby Hub.

![Página pública de propinas de GetAlby a la izquierda y página privada Receive de Alby Hub con la dirección LN a la derecha](/images/blog/2025-02-17/tuto-33.webp)

> Opcional: Puedes añadir fondos ln a tu wallet usando los servicios de terceros de GetAlby: [getalby.com/topup](https://getalby.com/topup) - ten en cuenta el KYC...

---

## Usando tus Sats
Después de eso, podrás usarlos a través de la [Extensión Alby](https://getalby.com/) o [AlbyGo](https://albygo.com/).

![App Store de Alby Hub con Alby Extension y Alby Go, cada una con su botón Connect](/images/blog/2025-02-17/tuto-31.webp)

Tu nodo es la fuente de verdad. Conecta estas apps y podrás usar tus sats en cualquier plataforma sin problemas.

![Wallet de GetAlby y wallet de Alby Hub lado a lado mostrando la misma lista de pagos enviados y recibidos](/images/blog/2025-02-17/tuto-32.webp)

> **Aviso**: la dirección LN testhub fue creada solo para propósitos de testing y tutorial. Mi dirección real es [chemaclass](https://getalby.com/p/chemaclass) ;)

## Mantenimiento y solución de problemas

### Actualizando tu nodo

Como en la instalación, hay un script para actualizar tu nodo. Lo encuentras en el repositorio: [GitHub - Script de actualización Alby Hub](https://github.com/getAlby/hub/tree/master/scripts/pi-aarch64)

```bash
ssh testhub@testhub.local '/bin/bash -c "$(curl -fsSL https://getalby.com/install/hub/pi-aarch64-update.sh)"'
```

### Manejando cortes de energía

Si se va la luz, la Raspberry Pi se apaga. Cuando vuelva, se reinicia sola. Alby Hub te pedirá la contraseña que configuraste antes.

---

**Enlaces relacionados**

- [GetAlby - Guía de usuario](https://guides.getalby.com/)
- [Instalando Alby Hub en una Raspberry Zero](https://guides.getalby.com/user-guide/alby-account-and-browser-extension/hidden-archives/raspberry-pi-zero)
