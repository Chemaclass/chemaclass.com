+++
title = "Cómo funciona Bitcoin"
description = "Una introducción técnica a Bitcoin: blockchain, criptografía, minería, direcciones y Lightning Network."
draft = true
[taxonomies]
tags = [ "bitcoin", "cryptography", "tutorial" ]
[extra]
subtitle = "Blockchain, criptografía y consenso"
static_thumbnail = "/images/blog/2025-12-21/cover.jpg"
+++

![blog-cover](/images/blog/2025-12-21/cover.jpg)

Este post explica cómo funciona Bitcoin bajo el capó. Si buscas por qué Bitcoin importa, empieza con [Fundamentos de Bitcoin](/es/blog/bitcoin-fundamentals/).

<!-- more -->

<div class="tldr">

**Cómo Bitcoin resuelve el dinero digital:** Las transacciones se firman con claves criptográficas, se agrupan en bloques a través de minería proof-of-work, y se encadenan mediante hashes. La red de nodos hace cumplir las reglas sin ninguna autoridad central. Este post cubre la blockchain, el modelo UTXO, la mecánica de minería, seguridad de wallets, arquitectura de red, profundidad de confirmación, alineación de incentivos y Lightning Network.

</div>

*Para los técnicamente curiosos.*

{{ youtube(id="bBC-nXj3Ng4") }}

## La Blockchain

### El problema del doble gasto

El dinero digital tiene un problema fundamental: ¿cómo evitas que alguien copie sus monedas y las gaste dos veces? Los sistemas tradicionales resuelven esto con una autoridad central (bancos, PayPal) que rastrea quién posee qué. El avance de Bitcoin fue resolver esto sin ninguna parte central.

La solución: un libro mayor compartido que todos pueden verificar pero nadie controla.

### Cómo funciona

Bitcoin usa una blockchain: una cadena de bloques donde cada bloque contiene transacciones y enlaza al bloque anterior a través de hashes criptográficos.

Una **función hash** toma cualquier entrada y produce una huella digital de tamaño fijo. Cambia un bit de la entrada, y la salida cambia completamente. Esto hace obvio el manipuleo. Bitcoin usa SHA-256, que produce una salida de 256 bits.

Cada bloque contiene:
- Una lista de transacciones
- Un hash del encabezado del bloque anterior
- Una solución proof-of-work (más abajo)

Antes de que las transacciones entren en un bloque, esperan en el mempool. Los mineros seleccionan transacciones de este pool, priorizando las que tienen comisiones más altas. Mira esto en tiempo real en [mempool.space](https://mempool.space/).

Cada nodo mantiene una copia completa de la blockchain. Sin un solo servidor que hackear, sin base de datos central que corromper. Para cambiar la historia, necesitarías reescribir bloques en la mayoría de nodos a nivel mundial.

{% deep_dive(title="Estructura del bloque") %}

Un bloque tiene dos partes: el **encabezado** (80 bytes) y el **cuerpo** (transacciones).

El encabezado contiene:
- **Versión**: Versión del protocolo
- **Hash del bloque anterior**: Enlaza a la cadena
- **Raíz Merkle**: Hash de todas las transacciones en el bloque
- **Marca de tiempo**: Cuándo se creó el bloque
- **Objetivo de dificultad**: Qué tan difícil era el puzzle
- **Nonce**: La solución que encontraron los mineros

Los **árboles Merkle** organizan las transacciones eficientemente. Cada transacción se hashea, luego los pares de hashes se combinan y hashean de nuevo, construyendo hasta un único hash raíz. Esto permite probar que una transacción existe en un bloque sin descargar todas las transacciones. Útil para wallets ligeras.

El peso del bloque se mide en bytes virtuales (vB). El límite es 4 millones de unidades de peso, aproximadamente 1-1.5 MB de datos por bloque.

{% end %}

## Transacciones y criptografía

### El modelo UTXO

Bitcoin no usa cuentas con balances. En cambio, rastrea **Salidas de Transacciones No Gastadas (UTXOs)**. Piensa en ellas como monedas digitales de varios tamaños.

Cuando recibes bitcoin, obtienes un UTXO. Cuando gastas, consumes UTXOs completos como entradas y creas nuevos como salidas. Si tienes un UTXO de 1 BTC y quieres enviar 0.3 BTC, gastas el UTXO completo y creas dos salidas: 0.3 BTC para el destinatario y ~0.7 BTC de vuelta para ti (menos comisiones).

Tu "balance" es la suma de todos los UTXOs que puedes gastar.

### Criptografía de clave pública

Las transacciones de Bitcoin usan criptografía de clave pública:

- **Clave privada**: Un número secreto de 256 bits. Esto prueba la propiedad.
- **Clave pública**: Derivada matemáticamente de la clave privada. Compartida públicamente.

Cuando envías bitcoin, firmas la transacción con tu clave privada. Esta firma prueba que posees los UTXOs que se están gastando sin revelar la clave privada. Cualquiera puede verificar la firma usando tu clave pública.

### Dinero programable

Bitcoin no es solo efectivo digital. Tiene su propio lenguaje de programación llamado **Script**. Cada transacción incluye un pequeño programa que define las condiciones para gastar.

La mayoría de transacciones usan scripts simples: "quien pueda probar que posee esta clave pública puede gastar estas monedas." Pero Script permite mucho más: wallets multifirma que requieren múltiples claves, transacciones con bloqueo temporal que no pueden gastarse hasta cierta fecha, y condiciones complejas combinando múltiples requisitos.

Esto hace que Bitcoin sea dinero programable. Para una inmersión más profunda en Script y tipos de direcciones, ve [Dinero Programable](/es/blog/programmable-money/).

{% deep_dive(title="Criptografía de curva elíptica") %}

Bitcoin usa **ECDSA** (Algoritmo de Firma Digital de Curva Elíptica) con la curva **secp256k1**. Esta curva fue elegida por eficiencia y porque no fue diseñada por ninguna agencia gubernamental (a diferencia de las curvas NIST), reduciendo preocupaciones sobre puertas traseras.

Una clave privada es un entero aleatorio de 256 bits. La clave pública se deriva multiplicando este número por un punto generador en la curva. Fácil de computar hacia adelante, prácticamente imposible de revertir.

**La firma de transacciones** implica:
1. Hashear los datos de la transacción
2. Crear una firma usando la clave privada
3. Incluir la firma y clave pública en la transacción

**Las banderas SIGHASH** controlan qué partes de una transacción cubre la firma:
- `SIGHASH_ALL`: Firma todas las entradas y salidas (más común)
- `SIGHASH_NONE`: Firma solo las entradas
- `SIGHASH_SINGLE`: Firma una salida específica
- Estas pueden combinarse con `ANYONECANPAY` para casos de uso avanzados

{% end %}

## Minería y consenso

¿Cómo acuerda una red descentralizada qué transacciones son válidas? A través de minería proof-of-work.

### El puzzle

Los mineros compiten por encontrar un número (el **nonce**) que, combinado con el encabezado del bloque y hasheado, produce un resultado por debajo de un valor objetivo. Es como tirar dados hasta obtener un número menor que 100, excepto con 2^256 resultados posibles.

El trabajo es:
- **Difícil de encontrar**: Requiere billones de intentos
- **Fácil de verificar**: Una comprobación de hash prueba la solución

Esta asimetría es clave. Cualquiera puede verificar un bloque instantáneamente, pero crearlo requiere trabajo computacional real.

### Por qué importa

La minería sirve para tres propósitos:

1. **Asegura la red**: Reescribir la historia significa rehacer todo el trabajo de hash
2. **Emite nuevas monedas**: Siguiendo un calendario predecible (halving cada 210.000 bloques)
3. **Procesa transacciones**: Incluyéndolas en el registro permanente

Cada 2016 bloques (~2 semanas), la red ajusta la dificultad para mantener tiempos de bloque de ~10 minutos. ¿Se une más hashpower? Los puzzles se vuelven más difíciles. ¿El hashpower se va? Los puzzles se vuelven más fáciles.

Explora los pools de minería y hashrate en [mempool.space/mining](https://mempool.space/mining).

{% deep_dive(title="Dificultad y teoría de juegos") %}

**Cálculo de dificultad**: El objetivo es un número de 256 bits. Un hash de bloque válido debe estar por debajo de este objetivo. Objetivo más bajo = puzzle más difícil. La red ajusta cada 2016 bloques basándose en cuánto realmente tomaron esos bloques vs. los 20.160 minutos esperados.

{{ youtube(id="S9JGmA5_unY") }}

**Hashrate y seguridad**: La seguridad de Bitcoin viene del coste de reescribir la historia. Con ~500 EH/s (exahashes por segundo) de hashrate, atacar la red requeriría controlar la mayoría del hashpower. Eso significa miles de millones en hardware y electricidad, más el ataque haría colapsar el valor del activo.

**Incentivos económicos**: Los mineros gastan recursos reales (electricidad, hardware). Solo obtienen beneficio si juegan según las reglas. Un minero que crea bloques inválidos desperdicia su trabajo porque los nodos rechazan bloques inválidos. Esto alinea el motivo de beneficio individual con la seguridad de la red.

**Ataques del 51%**: Si un atacante controlara la mayoría del hashpower, teóricamente podría hacer doble gasto minando una cadena alternativa. Pero la economía hace esto irracional para grandes valores: el ataque destruye el valor de lo que estás robando.

{% end %}

## Direcciones y wallets

Las direcciones de Bitcoin se derivan de las claves públicas. Diferentes formatos han evolucionado:

- **P2PKH**: Direcciones legacy que empiezan con "1"
- **P2SH**: Direcciones script que empiezan con "3"
- **P2WPKH**: Direcciones SegWit nativas que empiezan con "bc1q"
- **P2TR**: Direcciones Taproot que empiezan con "bc1p"

Para detalles técnicos de cada tipo, ve [Dinero Programable](/es/blog/programmable-money/#common-bitcoin-address-types).

### Wallets

Una wallet gestiona tus claves y construye transacciones. No contiene tus monedas. Las monedas existen en la blockchain. La wallet contiene claves que prueban que puedes gastarlas.

**Wallets calientes** se conectan a internet. Convenientes para uso diario, más vulnerables. Ejemplos: apps de móvil, extensiones de navegador.

**Wallets frías** permanecen offline. Más seguras para ahorros. Ejemplos: hardware wallets (Ledger, Trezor), paper wallets.

### Wallets HD y frases semilla

Las wallets modernas son **Deterministas Jerárquicas (HD)**. Una semilla maestra genera claves ilimitadas en una estructura de árbol. Haz backup de la semilla una vez, recupera todo.

**BIP-39** define la frase semilla de 12 o 24 palabras que la mayoría de wallets usan. Estas palabras codifican entropía que deriva todas tus claves. Pierde la frase, pierde el acceso. Cualquiera con la frase controla los fondos.

> Nunca almacenes frases semilla digitalmente. Escríbelas. Guárdalas de forma segura offline.

## La red

Bitcoin es una red peer-to-peer. Sin servidores centrales. Los nodos se conectan entre sí, comparten transacciones y bloques, y hacen cumplir las reglas independientemente.

### Tipos de nodos

**Nodos completos** descargan y validan cada bloque y transacción. Hacen cumplir todas las reglas de consenso y no confían en nadie. Ejecutar un nodo completo significa que verificas todo tú mismo.

**Clientes SPV (ligeros)** solo descargan encabezados de bloque. Confían en que los mineros validaron las transacciones. Menos seguridad, pero funciona en móviles y dispositivos de baja potencia.

**Nodos de minería** son nodos completos que también compiten por crear nuevos bloques.

### Cómo se propagan las transacciones

Cuando transmites una transacción:
1. Tu wallet la envía a los nodos conectados
2. Cada nodo valida y reenvía a sus pares
3. En segundos, la transacción alcanza la mayor parte de la red
4. Los mineros la incluyen en sus bloques candidatos

Los bloques se propagan similarmente. Cuando un minero encuentra un bloque válido, se extiende por la red en segundos.

{% deep_dive(title="Arquitectura de red") %}

**Descubrimiento de pares**: Los nodos se encuentran a través de semillas DNS (direcciones hardcodeadas que devuelven IPs de nodos activos) y compartiendo direcciones de pares con nodos conectados.

**Protocolo gossip**: La información se propaga a través de mensajes "inv" (inventario). Un nodo anuncia que tiene algo nuevo, los pares lo solicitan si están interesados. Esto previene el desperdicio de ancho de banda por datos duplicados.

**Bloques compactos** (BIP-152) aceleran la propagación de bloques. Como los nodos ya tienen la mayoría de transacciones en su mempool, los bloques pueden transmitirse como solo el encabezado más IDs cortos de transacciones.

{% end %}

## Seguridad y confirmaciones

### Por qué importan las confirmaciones

Cuando una transacción se incluye en un bloque, tiene 1 confirmación. Cada bloque subsiguiente añade otra confirmación.

Más confirmaciones = más difícil de revertir. Para deshacer una transacción confirmada, un atacante necesitaría minar una cadena alternativa más rápido que la red honesta. Cada bloque hace esto exponencialmente más difícil.

**Guías generales:**
- 0 confirmaciones: Transacción transmitida pero aún no en un bloque. Puede ser doble gastada.
- 1 confirmación: En un bloque. La reversión requiere hashpower significativo.
- 6 confirmaciones: Estándar para grandes cantidades. Reversión prácticamente imposible.

{% deep_dive(title="Seguridad de confirmaciones") %}

El whitepaper de Satoshi incluye el cálculo de probabilidad. Con un atacante controlando una fracción `q` del hashpower:

- Si `q < 0.5`: La probabilidad de alcanzar disminuye exponencialmente con cada confirmación
- A 6 confirmaciones con `q = 0.1` (10% hashpower): Probabilidad de éxito < 0.1%

La regla de "6 confirmaciones" asume un atacante bien financiado con hashpower sustancial pero minoritario. Para transacciones más pequeñas, menos confirmaciones son a menudo aceptables.

**La finalidad en Bitcoin** es probabilística, no absoluta. Pero después de suficientes confirmaciones, la probabilidad de reversión se acerca a cero para cualquier atacante realista.

{% end %}

## Alineación de incentivos

Bitcoin no es solo tecnología ingeniosa. Es un sistema donde el interés propio de cada participante refuerza la red.

- **Mineros** invierten en hardware y electricidad. Solo obtienen beneficio produciendo bloques válidos. Hacer trampas desperdicia su inversión porque los nodos rechazan bloques inválidos instantáneamente.

- **Nodos** hacen cumplir las reglas para proteger sus propias tenencias. Un operador de nodo que acepta transacciones inválidas devalúa su propio bitcoin. El interés propio los convierte en validadores honestos.

- **Usuarios** pagan comisiones para que sus transacciones se procesen. Comisiones más altas significan confirmación más rápida. Esto crea demanda de espacio de bloque y financia la seguridad de la red.

- **Desarrolladores** contribuyen a software que ellos mismos usan. Los bugs perjudican sus propias tenencias. Las mejoras benefician a todos, incluyéndoles.

- **Holders** se benefician de la seguridad y adopción de la red. Cuanto más seguro y útil se vuelve Bitcoin, más valiosas son sus tenencias. Están incentivados a apoyar el ecosistema.

Sin coordinador central. Sin confianza requerida. Todos actúan en su propio interés, y el sistema beneficia a todos.

> "No confíes, verifica." Cualquiera puede ejecutar un nodo y verificar cada transacción, cada bloque, cada regla. No necesitas confiar en bancos, gobiernos, ni siquiera en otros usuarios de Bitcoin. Las matemáticas se demuestran solas.

## Escalabilidad: Lightning Network

La capa base de Bitcoin procesa unas 7 transacciones por segundo. Eso es por diseño: mantener las cosas descentralizadas requiere bloques lo suficientemente pequeños para que cualquiera pueda verificar. Pero esto limita cuántas transacciones puede manejar.

Lightning Network resuelve esto con una segunda capa construida sobre Bitcoin. Permite:

- **Pagos instantáneos**: Sin esperar confirmaciones de bloque
- **Comisiones casi nulas**: Fracciones de céntimo
- **Alta capacidad**: Millones de transacciones por segundo

Lightning funciona abriendo "canales de pago" entre partes. Las transacciones dentro de un canal ocurren off-chain, instantáneamente. Solo la apertura y cierre de canales requieren transacciones on-chain. Puedes visualizar la topología de la red y estadísticas en [mempool.space/lightning](https://mempool.space/lightning).

> La capa base de Bitcoin proporciona seguridad y liquidación final. Lightning proporciona velocidad y escala. Diferentes herramientas para diferentes trabajos.

Si quieres ejecutar tu propio nodo Lightning y tomar control total de tus pagos, escribí una guía sobre cómo [Ejecutar tu nodo LN en una Raspberry Pi](/es/blog/run-your-ln-node/).

{% deep_dive(title="Cómo funciona Lightning") %}

Los canales de pago usan direcciones **multifirma 2-de-2**. Ambas partes deben firmar para mover fondos. Esto crea una cuenta compartida de la que ninguno puede robar.

**HTLCs (Contratos Hash Time-Locked)** permiten pagos multi-salto. El mecanismo:
1. Alice quiere pagar a Carol a través de Bob
2. Carol genera un secreto y da a Alice el hash
3. Alice crea un HTLC: "Bob recibe el pago si revela el secreto en 24 horas"
4. Bob crea un HTLC similar con Carol
5. Carol revela el secreto a Bob, reclamando el pago
6. Bob usa el mismo secreto para reclamar de Alice

Si alguien no coopera, el timelock expira y los fondos regresan. El secreto viaja hacia atrás, los pagos viajan hacia adelante.

**Watchtowers** monitorean la blockchain por intentos de trampa. Si tu contraparte intenta transmitir un estado antiguo del canal, el watchtower puede penalizarlos, incluso mientras estás offline.

{% end %}

## El panorama general

Lo que hace a Bitcoin notable no es ningún componente individual. Es cómo encajan en un sistema auto-reforzante.

La criptografía prueba la propiedad sin autoridades de confianza. El proof-of-work hace que la historia sea costosa de reescribir. Los incentivos económicos convierten la codicia individual en seguridad colectiva. La descentralización elimina puntos únicos de fallo. Y la oferta fija crea escasez digital por primera vez en la historia.

Cada pieza soporta a cada otra pieza. Quita una, y el sistema se debilita. Juntas, crean algo que nunca ha existido antes: dinero que no puede inflarse, transacciones que no pueden censurarse, y propiedad que no puede confiscarse.

> Sin bancos. Sin gobiernos. Sin terceros de confianza. Solo matemáticas, código, y una red global de nodos todos haciendo cumplir las mismas reglas.

Si eso te importa depende de dónde vivas y cuánto confíes en tus instituciones. Pero la opción existe ahora. Y nadie puede quitártela.

{% deep_dive(title="Madrigueras") %}

La profundidad técnica de Bitcoin va mucho más allá de lo que cabe en un post. Aquí hay temas que vale la pena explorar si quieres ir más profundo:

**[SegWit](https://bitcoinops.org/en/topics/segregated-witness/)** (Testigo Segregado) fue la actualización de Bitcoin de 2017 que movió los datos de firma fuera de la estructura principal de la transacción. Esto arregló la maleabilidad de transacciones (un bug que impedía Lightning), introdujo el peso de bloque para un uso más eficiente del espacio, y lo hizo todo permaneciendo compatible hacia atrás con nodos antiguos.

**[Taproot & Schnorr](https://bitcoinops.org/en/topics/taproot/)** llegaron en 2021, actualizando la criptografía de Bitcoin. Las firmas Schnorr son más pequeñas y permiten agregación (múltiples firmas se convierten en una). Taproot hace que las condiciones de gasto complejas se vean idénticas a los pagos simples on-chain, mejorando tanto la privacidad como la eficiencia.

**[Soft forks vs hard forks](https://bitcoin.stackexchange.com/questions/30817/what-is-a-soft-fork)**: ¿Cómo actualiza Bitcoin sin una autoridad central? Los soft forks añaden nuevas reglas que los nodos antiguos aún aceptan. Los hard forks cambian las reglas de maneras que los nodos antiguos rechazan. Entender esta distinción explica por qué Bitcoin evoluciona lentamente y por qué los cambios controvertidos son raros.

**[Mecánica de comisiones](https://mempool.space/docs/faq#what-is-rbf)**: El mercado de comisiones es más matizado que "paga más, confirma más rápido". Replace-By-Fee (RBF) te permite aumentar la comisión de una transacción atascada. Child-Pays-For-Parent (CPFP) permite a los destinatarios acelerar pagos entrantes gastándolos con altas comisiones.

**[Timelocks](https://bitcoinops.org/en/topics/timelocks/)**: Bitcoin puede bloquear fondos hasta que se cumplan condiciones. `CLTV` (CheckLockTimeVerify) bloquea hasta una altura de bloque o marca de tiempo específica. `CSV` (CheckSequenceVerify) bloquea por un tiempo relativo después de la confirmación. Estas primitivas permiten canales Lightning, esquemas de herencia e intercambios atómicos.

**[Transacciones coinbase](https://learnmeabitcoin.com/technical/mining/coinbase-transaction/)**: La única forma en que nuevo bitcoin entra en circulación. Cada bloque comienza con una transacción especial que paga al minero la recompensa del bloque más todas las comisiones. Estas monedas recién acuñadas no pueden gastarse durante 100 bloques, una regla que protege contra reorganizaciones de la cadena.

Cuanto más profundo vas, más encuentras.

{% end %}

---

**Posts relacionados**

- [Fundamentos de Bitcoin](/es/blog/bitcoin-fundamentals/) <small>Por qué Bitcoin importa: dinero sólido y soberanía financiera</small>
- [Los Cypherpunks](/es/blog/the-cypherpunks/) <small>Pioneros de la privacidad en la era digital</small>
- [Dinero programable](/es/blog/programmable-money/) <small>El poder del Script de Bitcoin</small>
- [Ejecuta tu nodo LN en una Raspberry Pi](/es/blog/run-your-ln-node/) <small>Toma el control total de tus pagos Lightning</small>
- [Pretty Good Privacy](/es/blog/pretty-good-privacy/) <small>Una guía para principiantes sobre cifrado</small>

**Lecturas relacionadas**

- [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf) <small>El paper original de 9 páginas de Satoshi Nakamoto</small>
- [Mastering Bitcoin](/es/readings/mastering-bitcoin/) <small>por Andreas M. Antonopoulos, David A. Harding</small>
- [The Genesis Book](/es/readings/the-genesis-book/) <small>por Aaron van Wirdum</small>
- [The Book Of Satoshi](/es/readings/the-book-of-satoshi/) <small>por Phil Champagne</small>
