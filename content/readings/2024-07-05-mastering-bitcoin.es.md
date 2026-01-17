+++
title = "Mastering Bitcoin"
description = "Este libro cubre todo desde los conceptos básicos hasta los aspectos técnicos más profundos de cómo funciona Bitcoin. Es una excelente guía a través del complejo mundo de Bitcoin, proporcionando el conocimiento que necesitas para participar en el Internet del Dinero."
draft = false
authors = [ "Andreas M. Antonopoulos", "David A. Harding" ]
[taxonomies]
tags = [ "bitcoin", "architecture", "software-design", "privacy" ]
[extra]
subtitle = "Programando la Blockchain Abierta"
pages = "400"
author = "Andreas M. Antonopoulos, David A. Harding"
static_thumbnail = "https://m.media-amazon.com/images/I/71JEv9rs7xL.jpg"
expand_preview = true
+++

Este libro cubre todo desde los conceptos básicos hasta los aspectos técnicos más profundos de Bitcoin. Es una excelente guía a través de este complejo mundo, proporcionando el conocimiento que necesitas para participar en el Internet del dinero.

<!-- more -->

La primera edición de este libro se publicó en diciembre de 2014. Diez años después, acaba de salir una tercera edición con conocimientos actualizados. Es altamente recomendable para todas las personas interesadas en este tema extraordinario y la tecnología detrás de él.

- Una amplia introducción a Bitcoin y su blockchain subyacente—ideal para usuarios no técnicos, inversores y ejecutivos de negocios.
- Una explicación de la base técnica de Bitcoin y la criptomoneda para desarrolladores, ingenieros y arquitectos de software y sistemas.
- Detalles de la red descentralizada de Bitcoin, arquitectura peer-to-peer, ciclo de vida de transacciones y principios de seguridad.
- Nuevos desarrollos como Taproot, Tapscript, firmas Schnorr y Lightning Network.
- Una inmersión profunda en las aplicaciones de Bitcoin, incluyendo cómo combinar los bloques de construcción que ofrece esta plataforma en nuevas herramientas poderosas.
- Historias de usuarios, analogías, ejemplos y fragmentos de código que ilustran conceptos técnicos clave.

---

## Contenidos

1. Introducción
2. Cómo Funciona Bitcoin
3. Bitcoin Core: La Implementación de Referencia
4. Claves y Direcciones
5. Recuperación de Wallet
6. Transacciones
7. Autorización y Autenticación
8. Firmas Digitales
9. Comisiones de Transacción
10. La Red Bitcoin
11. La Blockchain
12. Minería y Consenso
13. Seguridad de Bitcoin
14. Aplicaciones de Segunda Capa

![blog-footer](/images/readings/2024-07-05/footer.jpg)

> Libro completo también en [GitHub](https://github.com/bitcoinbook/bitcoinbook).

### Puntos clave

1. Tu wallet no almacena bitcoins, solo las claves para acceder a ellos. Las monedas se almacenan en la blockchain.
1. Entender los **UTXOs** es crucial para entender cómo funcionan las transacciones.
   - Estos son outputs de transacciones anteriores que aún no se han gastado
1. Una transacción necesita:
   - **inputs**: UTXOs y un script de desbloqueo (scriptSig) que prueba la propiedad.
   - **outputs**: la dirección del destinatario y la cantidad a enviar.
1. El script de desbloqueo está escrito en un lenguaje personalizado llamado [**Script**](https://en.bitcoin.it/wiki/Script).
   - La validación de transacciones se logra mediante la ejecución de un script.
   - Esto permite una variedad casi infinita de condiciones a expresar.
   - Script es un lenguaje basado en pila, procesado de izquierda a derecha.
1. Bitcoin a menudo se conoce como "**dinero programable**" porque permite: Multifirma, bloqueo temporal y gasto condicional.
   - Extiende la funcionalidad de Bitcoin más allá de simples transferencias de valor.
1. [**Tipos de direcciones**](/es/blog/programmable-money#common-bitcoin-address-types) comunes de Bitcoin:
   - P2PKH: Comienza con `1`. Transacciones estándar usando hashes de clave pública.
   - P2SH: Comienza con `3`. Encapsula scripts complejos como multisig.
   - P2WPKH: Comienza con `bc1`. SegWit nativo, transacciones más eficientes.
   - P2WSH: Comienza con `bc1`. SegWit para scripts complejos.
   - P2TR: Comienza con `bc1p`. Taproot, privacidad y eficiencia mejoradas.
   - Bech32: Comienza con `bc1`. Legible por humanos, diseñado para SegWit y Taproot.
1. Las firmas digitales sirven tres propósitos en las transacciones Bitcoin:
   - Primero, prueban que el controlador de una clave privada ha **autorizado** el gasto de esos fondos.
   - Segundo, la prueba de autorización es **innegable**.
   - Tercero, la transacción autorizada **no puede ser cambiada** por terceros no autenticados.
1. Las [firmas de Schnorr](https://en.wikipedia.org/wiki/Schnorr_signature) no son específicas de la [criptografía de curva elíptica](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) (ECC) que usa Bitcoin, aunque es lo más asociado con ECC hoy. Tienen varias propiedades agradables:
   - **Seguridad demostrable**: fuertes garantías de seguridad basadas en la dificultad del problema del logaritmo discreto, con pruebas formales que aseguran su robustez contra ataques.
   - **Linealidad**: permite la agregación eficiente de múltiples firmas en una sola firma compacta, simplificando los procesos de verificación.
   - **Verificación por lotes**: permitiendo verificar múltiples firmas simultáneamente de manera más eficiente computacionalmente.
1. El algoritmo de compartición de secretos seguro más conocido es [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir's_secret_sharing).
1. Ejecutar un **nodo completo** te da la experiencia pura de Bitcoin: verificación independiente de todas las transacciones sin confiar en ningún otro sistema.
1. Los **árboles Merkle** se usan para resumir todas las transacciones en un bloque, produciendo un compromiso general con todo el conjunto de transacciones y permitiendo un proceso muy eficiente para verificar si una transacción está incluida en un bloque.
1. La minería es una de las invenciones que hacen a Bitcoin especial, un mecanismo de **consenso descentralizado** que es la base para el efectivo digital P2P.
   - Asegura el sistema Bitcoin y permite la emergencia de consenso a nivel de red sin una autoridad central.
1. Un **soft-fork** es un cambio compatible hacia adelante en las reglas de consenso que permite a los clientes no actualizados continuar operando en consenso con las nuevas reglas.

---

**Artículos relacionados**

- [Dinero Programable](/es/blog/programmable-money) <small>El poder del Script de Bitcoin</small>

**Lecturas relacionadas**

- [The Genesis Book](/es/readings/the-genesis-book/) <small>por Aaron van Wirdum</small>
- [The Blocksize War](/es/readings/the-blocksize-war/) <small>por Jonathan Bier</small>
- [The Bitcoin Standard](/es/readings/the-bitcoin-standard/) <small>por Saifedean Ammous</small>
- [The Book Of Satoshi](/es/readings/the-book-of-satoshi/) <small>por Phil Champagne</small>
