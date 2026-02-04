+++
title = "Dinero Programable"
description = "Bitcoin se conoce como dinero programable porque permite ejecutar transacciones con condiciones mediante su lenguaje de scripting."
draft = false
[taxonomies]
tags = [ "bitcoin", "programming", "cryptography", "security" ]
[extra]
subtitle = "El poder del Script de Bitcoin"
static_thumbnail = "/images/blog/2024-07-06/cover.jpg"
+++

![blog-cover](/images/blog/2024-07-06/cover.jpg)

A Bitcoin se le llama "dinero programable" porque permite ejecutar transacciones con condiciones mediante su lenguaje de scripting.

<!-- more -->

## Qué es el dinero programable

Dinero programable significa poder meter lógica y condiciones dentro de las transacciones financieras. Las transacciones se ejecutan solas siguiendo reglas predefinidas, sin intermediarios ni intervención manual. El dinero deja de ser algo estático y se convierte en una herramienta capaz de ejecutar acuerdos y automatizar operaciones.

## El lenguaje Script

La programabilidad de Bitcoin viene de su lenguaje incorporado: [**Script**](https://en.bitcoin.it/wiki/Script). Es un lenguaje basado en pila, parecido a Forth, creado específicamente para transacciones de Bitcoin.

Soporta multi-firma, transferencias bloqueadas por tiempo y otras transferencias condicionales. Es intencionalmente limitado: no es Turing-completo y no tiene bucles.

Este video muestra ejemplos de los scripts de bloqueo/desbloqueo más comunes.

{{ youtube(id="6Fa04MnURhw") }}

## Características clave del Script de Bitcoin

### Ejecución basada en pila

Script funciona con un modelo de pila: los comandos y datos se apilan y se procesan en orden Last-In-First-Out ([LIFO](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))).

### Gasto condicional

Una transaccion que solo se puede gastar si se cumplen ciertos criterios o se proporcionan datos especificos. Sirve para:
  - servicios de custodia
  - intercambios atomicos
  - otros arreglos financieros

### Multifirma

Puedes configurar transacciones que requieran varias firmas de diferentes claves privadas. Util para:
  - cuentas conjuntas
  - fondos corporativos
  - mayor seguridad (nadie puede gastar los fondos por su cuenta)

### Bloqueo temporal

Las transacciones pueden tener condiciones de tiempo: no se pueden gastar hasta cierta fecha o altura de bloque. Util para:
  - pagos diferidos
  - contratos inteligentes
  - evitar gastos prematuros (ej: [Lightning Network](https://en.bitcoin.it/wiki/Lightning_Network))

### Codigos de operacion

El Script de Bitcoin usa [OP_Codes](https://en.bitcoin.it/wiki/Script#Opcodes) para realizar operaciones especificas. Algunos ejemplos:

- `OP_DUP`: <small>Duplica el elemento superior de la pila.</small>
- `OP_HASH160`: <small>Hashea el elemento superior de la pila dos veces (SHA-256 seguido de RIPEMD-160).</small>
- `OP_EQUALVERIFY`: <small>Verifica que los dos elementos superiores son iguales y los elimina.</small>
- `OP_CHECKSIG`: <small>Verifica una firma contra una clave pública.</small>
- [`OP_RETURN`](https://en.bitcoin.it/wiki/OP_RETURN): <small>Marca la salida de la transacción como inválida, a menudo usado para almacenar datos.</small>

---

## Tipos comunes de direcciones Bitcoin

Cada tipo de direccion corresponde a una forma distinta de hacer scripts. Veamos ejemplos para cada tipo principal.

- **P2PK**: Las primeras transacciones legacy usando claves públicas completas directamente.
- **P2PKH**: Comienza con `1`. Transacciones **Legacy** usando hashes de claves públicas.
- **P2SH**: Comienza con `3`. **Legacy**, encapsula scripts complejos como multisig.
- **P2MS**: Típicamente es un tipo de dirección P2SH o P2WSH.
- **P2WPKH**: Comienza con `bc1`. **SegWit** nativo, transacciones más eficientes.
- **P2WSH**: Comienza con `bc1`. **SegWit** para scripts complejos.
- **P2TR**: Comienza con `bc1p`. Direcciones **Taproot** SegWit, mejorando privacidad y eficiencia para transacciones complejas.

> Usar SegWit nativo (P2WPKH y P2WSH) es preferible cuando es posible, ya que maximiza los beneficios de la actualización SegWit, pero P2SH-SegWit puede ser útil para compatibilidad con sistemas más antiguos.

### P2PK (Pay-to-PubKey) - Direccion Legacy antigua <small>[arriba](#tipos-comunes-de-direcciones-bitcoin)</small>

<div class="status info">
Comienza con "1" (ej., 1A1zP1eP5QGefi2DMPTf...v7DivfNa)
</div>

Antes de P2PKH y P2SH, las direcciones de Bitcoin eran mas limitadas:

- Empiezan con 1 pero sin hashear la clave publica.
- Poco usadas hoy por falta de privacidad y eficiencia.
- Formato **obsoleto** en favor de P2PKH como minimo.

---

### P2PKH (Pay-to-PubKey-Hash) - Dirección Legacy <small>[arriba](#tipos-comunes-de-direcciones-bitcoin)</small>

<div class="status info">
Comienza con "1" (ej., 1A1zP1eP5QGefi2DMPTf...v7DivfNa)
</div>

Un script P2PKH típico consiste en dos partes principales:
1. **ScriptPubKey**: El script de bloqueo (también conocido como script de salida) que especifica cómo pueden gastarse los fondos.
1. **ScriptSig**: El script de desbloqueo (también conocido como script de entrada) que proporciona los datos necesarios para desbloquear los fondos.

### ScriptPubKey (Script de Bloqueo)
```php
OP_DUP OP_HASH160 <PubKHash> OP_EQUALVERIFY OP_CHECKSIG
```

- `OP_DUP`: Duplica el elemento superior de la pila (la clave pública).
- `OP_HASH160`: Hashea la clave pública con SHA-256 seguido de RIPEMD-160.
- `<PubKHash>`: La clave pública hasheada (un valor de 20 bytes).
- `OP_EQUALVERIFY`: Verifica si la clave pública hasheada coincide con el hash en el script.
- `OP_CHECKSIG`: Verifica la firma proporcionada contra la clave pública.

### ScriptSig (Script de Desbloqueo)
```php
<sig> <PubK>
```

- `<sig>`: La firma digital generada por la clave privada.
- `<PubK>`: La clave pública correspondiente a la dirección.

### Flujo de Ejecución

1. El `ScriptSig` (script de desbloqueo) se empuja a la pila.
2. El `ScriptPubKey` (script de bloqueo) se ejecuta.

![cover](https://raw.githubusercontent.com/bitcoinbook/bitcoinbook/develop/images/mbc3_0703.png)
![cover](https://raw.githubusercontent.com/bitcoinbook/bitcoinbook/develop/images/mbc3_0704.png)

---

### P2SH (Pay-to-Script-Hash) <small>[arriba](#tipos-comunes-de-direcciones-bitcoin)</small>

<div class="status info">
Comienza con "3" (ej., 3J2BtwzN2GEr6FCP.....81T2eiX8PVHh)
</div>

Los scripts P2SH se usan para scripts más complejos. La característica principal es que la dirección misma codifica un hash de un script, que se usará en la transacción.

### ScriptPubKey (Script de Bloqueo)

```php
OP_HASH160 <ScriptHash> OP_EQUAL
```

- `OP_HASH160`: Hashea el script con SHA-256 seguido de RIPEMD-160.
- `<ScriptHash>`: El script hasheado (un valor de 20 bytes).
- `OP_EQUAL`: Verifica si el hash coincide con el hash del script proporcionado.

### ScriptSig (Script de Desbloqueo)

```php
<sig> <PubK> ... <ScriptSig>
```
- `<sig>`: La firma digital.
- `<PubK>`: La clave pública.
- `<ScriptSig>`: El script real que coincide con el hash del script, que será ejecutado por la red Bitcoin.

---

### P2MS (Pay-to-Multisig) <small>[arriba](#tipos-comunes-de-direcciones-bitcoin)</small>

### Formato del Script

```php
OP_M <M> <PubK1> <PubK2> ... <PubKN> OP_N OP_CHECKMULTISIG
```

- `OP_M`: El número mínimo de firmas requeridas.
- `<PubK1>, <PubK2>, ..., <PubKN>`: Las claves públicas involucradas en el esquema multifirma.
- `OP_N`: El número total de claves públicas proporcionadas.
- `OP_CHECKMULTISIG`: El opcode que verifica las firmas contra las claves públicas proporcionadas.

### ScriptPubKey (Script de Bloqueo)

```php
OP_2 <PubK1> <PubK2> <PubK3> OP_3 OP_CHECKMULTISIG
```

Este script significa que se requieren 2 de 3 claves públicas proporcionadas para firmar la transacción para que sea válida.

### ScriptSig (Script de Desbloqueo)
```php
<sig1> <sig2> ... <sigN> <SerializedScript>
```

- `<sig1>, <sig2>, ..., <sigN>`: Las claves públicas.
- `<SerializedScript>`: El script serializado (lo mismo que el script de bloqueo pero sin el `OP_M` y `OP_N`).

<div class="status warning-orange">
<b>NOTA</b>: Hay una rareza en la ejecución de CHECKMULTISIG.
<small><a href="#hay-una-rareza-en-la-ejecución-de-checkmultisig-arriba">Ver nota al final.</a></small>
</div>

---

### P2WPKH (Pay-to-Witness-Public-Key-Hash) - Segwit <small>[arriba](#tipos-comunes-de-direcciones-bitcoin)</small>

<div class="status info">
Comienza con "bc1q" (ej., bc1qf0r2m0ck4psv6yrk9w.....kw8v5rj7ph3)
</div>

P2WPKH es una direccion Segregated Witness (SegWit) con un formato de scripting distinto. Simplifica las transacciones: menos datos y menos comisiones que los formatos legacy.

### ScriptPubKey (Script de Bloqueo)

```php
OP_0 OP_PUSHBYTES_20 <PubKHash>
```

- `OP_0`: Un solo byte (0x00) indicando la versión del script.
- `OP_PUSHBYTES_20`: Empuja 20 bytes (el hash de la clave pública) a la pila.
- `<PubKHash>`: El hash de 20 bytes de la clave pública.

### Datos del Testigo

En P2WPKH no hace falta un script de desbloqueo tradicional. La informacion de desbloqueo va como parte de los datos del testigo en el formato SegWit.

```php
<sig> <PubK>
```

- `<sig>`: Firma digital para la transacción.
- `<PubK>`: Clave pública usada para generar el hash de la clave pública.

---

### P2WSH (Pay-to-Witness-Script-Hash) - Segwit <small>[arriba](#tipos-comunes-de-direcciones-bitcoin)</small>

<div class="status info">
Comienza con bc1q (ej.: bc1q4a3h5sdg4cfkhftgd24tj9g2sg...yj57jmfckhkrw5gslr9g59)
</div>

### ScriptPubKey (Script de Bloqueo)

```php
OP_0 OP_PUSHBYTES_32 <ScriptHash>
```

- `OP_0`: Indica una versión de testigo 0 (SegWit).
- `OP_PUSHBYTES_32`: Empuja los siguientes 32 bytes (el hash del script) a la pila.
- `<ScriptHash>`: Hash de 32 bytes del script de redención.

### Datos del Testigo

```php
<sig1> <sig2> ... <RedeemScript>
```

- `<sig1>, <sig2>`: Firmas requeridas para desbloquear la transacción.
- `<RedeemScript>`: El script real que coincide con el hash del script. Este script será ejecutado como parte de los datos del testigo.

---

### P2TR (Pay-to-Taproot) - Taproot <small>[arriba](#tipos-comunes-de-direcciones-bitcoin)</small>

<div class="status info">
Comienza con bc1p (ej.: bc1pl9dfv7kvj4hj9s3a8l.....gjstmrpjl09g8ks3ukds70q4r2j5h)
</div>

Taproot combina firmas [Schnorr](https://en.bitcoin.it/wiki/Schnorr) con [MAST](https://en.bitcoin.it/wiki/BIP_0114#Merkelized_Abstract_Syntax_Tree). Permite condiciones de gasto privadas y eficientes. Las transacciones complejas **_parecen estandar_** a menos que se revelen las condiciones.

### ScriptPubKey (Script de Bloqueo)

```php
OP_1 <x-only PubK>
```

- `OP_1`: Indica una versión de testigo 1 (Taproot).
- `<x-only PubK>`: Una clave pública Schnorr de 32 bytes (sin la coordenada y).

### Datos del Testigo

```php
<sig>
```

- `<sig>`: Una firma Schnorr probando posesión de la clave privada correspondiente a la pubkey x-only.

---

{{ youtube(id="yU3Sr07Qnxg") }}

---

### *Hay una rareza en la ejecución de CHECKMULTISIG <small>[arriba](#scriptsig-script-de-desbloqueo-2)</small>

`OP_CHECKMULTISIG` saca un elemento de mas de la pila. Ese elemento extra se ignora al verificar firmas, asi que no afecta directamente. Pero tiene que estar porque si intenta sacar de una pila vacia, el script falla.

```php
OP_0 <sig2> <sig3> 2 <PubK1> <PubK2> <PubK3> 3 OP_CHECKMULTISIG
```

El script de entrada en este multisig no es `<sig2> <sig3>` sino `OP_0 <sig2> <sig3>`.

Al principio se usaba `OP_0` por convencion. Luego se convirtio en regla de relay y finalmente en regla de consenso ([BIP147](https://github.com/bitcoin/bips/blob/master/bip-0147.mediawiki)).

Puede que el desarrollador original lo pusiera pensando en anadir una funcion de mapa en un soft fork futuro (por rendimiento). Esa funcion nunca se implemento, y BIP147 en 2017 lo hace imposible ya.

Solo el creador de Bitcoin podria decir si fue un bug o un plan. Si ves un script multisig, espera encontrar un `OP_0` extra al principio. Es un parche para esta rareza del consenso.

---

## Para seguir aprendiendo

- Documentacion oficial de [Script](https://en.bitcoin.it/wiki/Script) en el Bitcoin Wiki.
- [Bitcoin IDE](https://siminchen.github.io/bitcoinIDE/build/editor.html): emulador visual de Script online, genial para aprender.
- [Script Editor](https://coins.github.io/bitcoin-scripts/script-editor/): investigacion sobre escalabilidad y usabilidad de Bitcoin.
- [Miniscript](https://bitcoin.sipa.be/miniscript/): lenguaje para escribir Scripts de Bitcoin de forma estructurada, con analisis, composicion y firma generica.

**Lecturas relacionadas**

- [Mastering Bitcoin](/es/readings/mastering-bitcoin/) <small>por Andreas M. Antonopoulos, David A. Harding</small>
