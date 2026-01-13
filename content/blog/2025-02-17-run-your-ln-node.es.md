+++
title = "Ejecuta tu nodo LN en una Raspberry Pi"
description = "En esta guía, te mostraré cómo configurar un nodo de Lightning Network (LN) completamente custodial usando Alby Hub en una Raspberry Pi, dándote control total sobre tu nodo. Alby Hub ofrece una versión DIY gratuita para una wallet Lightning auto-custodiada, asegurando la propiedad total de tus fondos siendo 100% open-source."
draft = false
[taxonomies]
tags = [ "bitcoin", "open-source", "privacy", "tutorial" ]
[extra]
subtitle = "Toma el control total de tus pagos Lightning con Alby Hub"
static_thumbnail = "/images/blog/2025-02-17/cover.jpg"
+++

![blog-cover](/images/blog/2025-02-17/cover.jpg)

En esta guía, te mostraré cómo configurar un nodo de Lightning Network (LN) completamente custodial usando Alby Hub en una Raspberry Pi, dándote control total sobre tu nodo. Alby Hub ofrece una versión DIY gratuita para una wallet Lightning auto-custodiada, asegurando la propiedad total de tus fondos siendo 100% open-source.

<!-- more -->

Soporta tanto direcciones Lightning como Nostr, permitiendo conectividad fluida entre ecosistemas, y se integra sin esfuerzo con docenas de aplicaciones Bitcoin. Con servicios integrados de Lightning Service Provider (LSP) y la app móvil Alby Go, gestionar tu nodo sobre la marcha nunca ha sido más fácil.

---

> Importante: Esto NO es un minero de Bitcoin ni un nodo completo. Es simplemente una Raspberry Pi ejecutándose en una tarjeta SD eficiente en energía y de bajo coste.

⚠️ **Aviso** ⚠️
- Asumo que **entiendes los conceptos fundamentales de [Bitcoin](https://bitcoin.org/)**.
- Asumo que sabes **cómo funciona la [Lightning Network](https://lightning.network/) (LN)**.

De todos modos, he incluido un breve repaso de los fundamentos de Lightning Network abajo.

## ¿Qué es la Lightning Network?

La LN es una solución de segunda capa construida sobre Bitcoin para permitir transacciones rápidas, baratas y escalables.

- **¿Por qué?** La capa base de Bitcoin es segura pero lenta y cara para pequeños pagos debido a los límites de tamaño de bloque y las comisiones.
- **¿Cómo?** LN usa canales de pago fuera de la cadena que permiten a los usuarios transaccionar instantáneamente sin esperar confirmaciones de blockchain.

### Conceptos clave

- **Canales de pago**: Los usuarios abren un canal haciendo una transacción on-chain, luego envían pagos instantáneos ilimitados dentro de ese canal.
- **Enrutamiento**: No necesitas un canal directo con todos — los pagos pueden enrutarse a través de múltiples nodos conectados.
- **Comisiones bajas**: Solo abrir/cerrar canales requiere comisiones on-chain; la mayoría de transacciones cuestan fracciones de céntimo.

### Objetivo

LN hace Bitcoin usable para transacciones cotidianas, como comprar café, sin esperar más de 10 minutos por confirmaciones.

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

![tutorial](/images/blog/2025-02-17/requirements.jpg)

### Pasos de instalación

#### 1. Flashear un kernel Linux en la tarjeta SD

> Sugerencia: Puedes usar [RPI imager](https://www.raspberrypi.com/software/) en tu ordenador.
Úsalo para flashear el SO raspi recomendado para ti

![tutorial](/images/blog/2025-02-17/tuto-1.jpg)

En Storage verás tu tarjeta SD después de insertarla en tu portátil.

![tutorial](/images/blog/2025-02-17/tuto-2.jpg)

Una vez hagas clic en "Next", verás diferentes ajustes. Haz clic en **Edit Settings**

![tutorial](/images/blog/2025-02-17/tuto-3.jpg)

En `Settings > General`: establece tu hostname, el nombre de usuario y contraseña para tu usuario admin.
Asegúrate de habilitar tu WIFI, de lo contrario tendrás que conectarla al router con un RJ-45.
<span id="hostname-setup"></span>
> Para este tutorial, estoy usando `testhub` como hostname, puedes usar `albyhub` o lo que prefieras.

![tutorial](/images/blog/2025-02-17/tuto-4.jpg)

<span id="pi-enable-ssh"></span>
En `Settings > Services`: asegúrate de que el acceso vía SSH está habilitado. Lo vamos a necesitar para instalar Alby Hub.

![tutorial](/images/blog/2025-02-17/tuto-5.jpg)

Haz clic en "Save" y haz clic en "Yes" para iniciar la instalación.

![tutorial](/images/blog/2025-02-17/tuto-6.jpg)

Verás una confirmación. Haz clic en "Yes". Tardará ~10 mins...

![tutorial](/images/blog/2025-02-17/tuto-7.jpg)

¡Ahora tenemos la SD con un kernel linux fresco listo para usar!

![tutorial](/images/blog/2025-02-17/tuto-8.jpg)

#### 2. Insertar la SD en la raspi

Extrae la SD del portátil e insértala en la raspi primero.

![tutorial](/images/blog/2025-02-17/tuto-9.jpg)

Una vez insertada la SD, conecta el cable de alimentación. Se encenderá automáticamente en cuanto la conectes.

![tutorial](/images/blog/2025-02-17/tuto-10.jpg)

#### 3. Instalación de Alby Hub

Tardará ~5mins desde que la encendiste para poder acceder a ella. ¿Cómo puedes asegurarte de que está viva? Abre la terminal y haz ping al hostname que definiste mientras flasheabas la SD en [Settings > General](/es/blog/run-your-ln-node/#hostname-setup), recuerda que terminaba con `.local`:
```bash
ping testhub.local
```

Es normal si no obtienes respuesta al principio... hasta que la obtienes.

![tutorial](/images/blog/2025-02-17/tuto-11.jpg)

<span id="pi-install-alby-hub"></span>
Ahora puedes **instalar Alby Hub** en tu raspi **usando la conexión SSH** que [habilitaste antes](/es/blog/run-your-ln-node/#pi-enable-ssh):

```bash
# Código fuente: https://github.com/getAlby/hub/tree/master/scripts/pi-aarch64
ssh testhub@testhub.local '/bin/bash -c "$(curl -fsSL https://getalby.com/install/hub/pi-aarch64-install.sh)"'
```

Se te pedirá que escribas la palabra "yes"; escríbela.

![tutorial](/images/blog/2025-02-17/tuto-12.jpg)

Luego, se te pedirá que introduzcas tu contraseña. Introduce la contraseña que elegiste en [Settings > General](/es/blog/run-your-ln-node/#hostname-setup) para el nombre de usuario.

![tutorial](/images/blog/2025-02-17/tuto-13.jpg)

#### 4. Configuración de Alby Hub

Espera otros 2-3 mins y visita tu host: [http://testhub.local/](http://testhub.local/)

![tutorial](/images/blog/2025-02-17/tuto-14.jpg)

Tu Alby hub ya está funcionando. ¡Vamos a conectarlo a tu cuenta GetAlby!

---

## Crear una cuenta GetAlby
🔗 [getalby.com/users/new](https://getalby.com/auth/users/new)

![tutorial](/images/blog/2025-02-17/tuto-15.jpg)

---

## Conectando GetAlby con Alby Hub
Creé una cuenta llamada testhub.

**Izquierda**: la cuenta GetAlby. **Derecha**: el nodo en la raspi.

![tutorial](/images/blog/2025-02-17/tuto-16.jpg)

Haz clic en "**Connect Now**".

![tutorial](/images/blog/2025-02-17/tuto-17.jpg)

Haz clic en "**Request Authorization Code**".

![tutorial](/images/blog/2025-02-17/tuto-18.jpg)

Obtienes el código de autorización (**izquierda**) que necesitas insertar en tu configuración (**derecha**).

![tutorial](/images/blog/2025-02-17/tuto-19.jpg)

<span id="alby-hub-password"></span>
Crea una **Contraseña** para tu Alby Hub instalado en tu raspi. Puede ser diferente de la contraseña que configuraste para tu usuario root en la raspi misma.

![tutorial](/images/blog/2025-02-17/tuto-20.jpg)

![tutorial](/images/blog/2025-02-17/tuto-21.jpg)

![tutorial](/images/blog/2025-02-17/tuto-22.jpg)

Ahora es momento de **Vincular tu Cuenta Alby**

![tutorial](/images/blog/2025-02-17/tuto-23.jpg)

A menos que especifiques lo contrario, establece el "Budget renewal: _Monthly 1M sats_" por defecto.

![tutorial](/images/blog/2025-02-17/tuto-24.jpg)
![tutorial](/images/blog/2025-02-17/tuto-25.jpg)

---

## Abriendo canales Lightning
Recomiendo seguir los **Pasos Iniciales** para configurar tu Alby Hub.

![tutorial](/images/blog/2025-02-17/tuto-27.jpg)

Abramos el primer canal.

![tutorial](/images/blog/2025-02-17/tuto-28.jpg)

Necesitas pagar ~$20 en sats para abrir un canal de _**liquidez entrante**_ de 1M sats.

![tutorial](/images/blog/2025-02-17/tuto-29.jpg)

Después del pago, verás el canal abierto. Puede tardar un par de minutos hasta que la **_transacción de financiación_** sea minada en el siguiente bloque.

![tutorial](/images/blog/2025-02-17/tuto-30.jpg)

---

## Recibiendo Sats
Puedes recibir sats usando tu Dirección LN.

**Izquierda**: Página pública vinculada a tu [nodo](https://getalby.com/p/chemaclass).
**Derecha**: Página privada de tu Alby Hub.

![tutorial](/images/blog/2025-02-17/tuto-33.jpg)

> Opcional: Puedes añadir fondos ln a tu wallet usando los servicios de terceros de GetAlby: [getalby.com/topup](https://getalby.com/topup) - ten en cuenta el KYC...

---

## Usando tus Sats
Después de eso, podrás usarlos a través de la [Extensión Alby](https://getalby.com/products/browser-extension) o [AlbyGo](https://albygo.com/).

![tutorial](/images/blog/2025-02-17/tuto-31.jpg)

Tu nodo es la fuente definitiva de verdad. Conectar estas apps a él te permitirá usar tus sats sin problemas en diferentes plataformas.

![tutorial](/images/blog/2025-02-17/tuto-32.jpg)

> **Aviso**: la dirección LN testhub fue creada solo para propósitos de testing y tutorial. Mi dirección real es [chemaclass](https://getalby.com/p/chemaclass) ;)

## Mantenimiento y solución de problemas

### Actualizando tu nodo

Similar al proceso de instalación, hay un script disponible para actualizar tu nodo. Puedes encontrarlo en el repositorio fuente: [GitHub - Script de actualización Alby Hub](https://github.com/getAlby/hub/tree/master/scripts/pi-aarch64)

```bash
ssh testhub@testhub.local '/bin/bash -c "$(curl -fsSL https://getalby.com/install/hub/pi-aarch64-update.sh)"'
```

### Manejando cortes de energía

Si se va la luz, la Raspberry Pi se apagará. Una vez se restaure la energía, se reiniciará automáticamente, pero Alby Hub te pedirá que introduzcas la contraseña que configuraste antes.

---

**Enlaces relacionados**

- [GetAlby - Guía de usuario](https://guides.getalby.com/)
- [Instalando Alby Hub en una Raspberry Zero](https://guides.getalby.com/user-guide/alby-account-and-browser-extension/hidden-archives/raspberry-pi-zero)

**Posts relacionados**

- [Dinero programable](/es/blog/programmable-money/) <small>El poder del Script de Bitcoin</small>
