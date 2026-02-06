+++
title = "Dominando Bitcoin"
description = "Este libro cubre desde los conceptos básicos hasta los aspectos técnicos más profundos de Bitcoin. Una guía excelente para entender este mundo y participar en el Internet del Dinero."
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
related_posts = ["blog/2024-07-06-programmable-money.md"]+++

Este libro cubre desde los conceptos básicos hasta los aspectos técnicos más profundos de Bitcoin. Una guía excelente para entender este mundo y participar en el Internet del dinero.

<!-- more -->

La primera edición se publicó en diciembre de 2014. Diez años después, ya tenemos una tercera edición actualizada. Muy recomendable para cualquier persona interesada en este tema y la tecnología que hay detrás.

- Introducción amplia a Bitcoin y su blockchain, ideal para usuarios no técnicos, inversores y ejecutivos.
- Explicación técnica para desarrolladores, ingenieros y arquitectos de software.
- Detalles sobre la red descentralizada, arquitectura P2P, ciclo de vida de transacciones y seguridad.
- Novedades como Taproot, Tapscript, firmas Schnorr y Lightning Network.
- Inmersión profunda en aplicaciones de Bitcoin: cómo combinar sus bloques de construcción en herramientas nuevas.
- Historias, analogías, ejemplos y fragmentos de código que explican los conceptos clave.

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

1. Tu wallet no almacena bitcoins, solo las claves para acceder a ellos. Las monedas están en la blockchain.
1. Entender los **UTXOs** es clave para entender las transacciones.
   - Son outputs de transacciones anteriores que aún no se han gastado.
1. Una transacción necesita:
   - **inputs**: UTXOs y un script de desbloqueo (scriptSig) que prueba la propiedad.
   - **outputs**: dirección del destinatario y cantidad a enviar.
1. El script de desbloqueo usa un lenguaje llamado [**Script**](https://en.bitcoin.it/wiki/Script).
   - La validación se hace ejecutando el script.
   - Permite expresar una variedad casi infinita de condiciones.
   - Script es un lenguaje basado en pila, procesado de izquierda a derecha.
1. Bitcoin se conoce como "**dinero programable**" porque permite multifirma, bloqueo temporal y gasto condicional.
   - Va más allá de simples transferencias de valor.
1. [**Tipos de direcciones**](/es/blog/programmable-money#common-bitcoin-address-types) comunes:
   - P2PKH: Empieza con `1`. Transacciones estándar con hashes de clave pública.
   - P2SH: Empieza con `3`. Encapsula scripts complejos como multisig.
   - P2WPKH: Empieza con `bc1`. SegWit nativo, más eficiente.
   - P2WSH: Empieza con `bc1`. SegWit para scripts complejos.
   - P2TR: Empieza con `bc1p`. Taproot, mejor privacidad y eficiencia.
   - Bech32: Empieza con `bc1`. Legible por humanos, para SegWit y Taproot.
1. Las firmas digitales cumplen tres funciones en Bitcoin:
   - Prueban que quien controla la clave privada ha **autorizado** el gasto.
   - La prueba de autorización es **innegable**.
   - La transacción autorizada **no puede cambiarse** por terceros no autenticados.
1. Las [firmas de Schnorr](https://en.wikipedia.org/wiki/Schnorr_signature) no son exclusivas de la [criptografía de curva elíptica](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) (ECC) de Bitcoin, aunque hoy se asocian mucho con ella. Tienen propiedades interesantes:
   - **Seguridad demostrable**: garantías fuertes basadas en el problema del logaritmo discreto, con pruebas formales de robustez.
   - **Linealidad**: permite agregar múltiples firmas en una sola firma compacta, simplificando la verificación.
   - **Verificación por lotes**: verificar múltiples firmas a la vez de forma más eficiente.
1. El algoritmo más conocido para compartir secretos de forma segura es [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir's_secret_sharing).
1. Ejecutar un **nodo completo** te da la experiencia pura de Bitcoin: verificas todas las transacciones de forma independiente, sin confiar en nadie.
1. Los **árboles Merkle** resumen todas las transacciones de un bloque, creando un compromiso con el conjunto completo y permitiendo verificar de forma muy eficiente si una transacción está incluida.
1. La minería es una de las invenciones que hacen especial a Bitcoin: un mecanismo de **consenso descentralizado** que es la base del efectivo digital P2P.
   - Asegura el sistema y permite que emerja consenso a nivel de red sin autoridad central.
1. Un **soft-fork** es un cambio compatible hacia adelante en las reglas de consenso. Los clientes no actualizados pueden seguir operando con las nuevas reglas.

