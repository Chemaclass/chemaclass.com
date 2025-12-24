+++
title = "Dinero Programable"
description = "Bitcoin a menudo se denomina dinero programable porque permite la ejecución de transacciones programables a través de su lenguaje de scripting, aprovechando cada bit para precisión y funcionalidad."
draft = false
[taxonomies]
tags = [ "bitcoin", "programming", "cryptography", "security" ]
[extra]
subtitle = "El poder del Script de Bitcoin"
static_thumbnail = "/images/blog/2024-07-06/cover.jpg"
+++

![blog-cover](/images/blog/2024-07-06/cover.jpg)

Bitcoin a menudo se denomina "dinero programable" porque permite la ejecución de transacciones programables a través de su lenguaje de scripting.

<!-- more -->

## Entendiendo el Dinero Programable

El dinero programable es la capacidad de incrustar lógica y condiciones en las transacciones financieras. Esta programabilidad permite que las transacciones se ejecuten automáticamente basándose en reglas predefinidas sin intermediarios o intervención manual. Transforma el dinero de un medio de intercambio estático en una herramienta dinámica capaz de ejecutar acuerdos complejos y automatizar operaciones financieras.

## El Lenguaje Script

La programabilidad de Bitcoin está impulsada por su lenguaje de scripting incorporado, [**Script**](https://en.bitcoin.it/wiki/Script). A diferencia de los lenguajes de programación tradicionales, Script es un lenguaje basado en pila, similar a Forth, diseñado explícitamente para transacciones de Bitcoin.

Soporta multi-firma, transferencias bloqueadas por tiempo y otras transferencias condicionales que pueden programarse en transacciones de Bitcoin. Es intencionalmente no Turing-completo, sin bucles.

Este video incluye ejemplos de los scripts de bloqueo/desbloqueo más comúnmente usados.

{{ youtube(id="6Fa04MnURhw") }}

## Características Clave del Script de Bitcoin

### Ejecución Basada en Pila

Script opera en un modelo de ejecución basado en pila donde los comandos y datos se empujan a una pila y se procesan de manera Last-In-First-Out ([LIFO](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))).

### Gasto Condicional

Una transacción que solo puede gastarse si se proporcionan ciertos datos o se cumplen criterios específicos. Esto puede usarse para:
  - servicios de custodia
  - intercambios atómicos
  - y otros arreglos financieros complejos

### Multifirma

Las transacciones pueden configurarse para requerir múltiples firmas de diferentes claves privadas antes de poder gastarse. Útil para:
  - cuentas conjuntas
  - fondos corporativos
  - y mejorar la seguridad, ya que ninguna parte puede gastar los fondos unilateralmente

### Bloqueo Temporal

Las transacciones pueden incluir condiciones basadas en tiempo que previenen que se gasten hasta que se alcance cierto tiempo o altura de bloque. Esta característica es útil para varios propósitos:
  - pagos diferidos
  - contratos inteligentes
  - y asegurar que los fondos no se gasten prematuramente (ej: con [Lightning Network](https://en.bitcoin.it/wiki/Lightning_Network))

### Códigos de Operación

El Script de Bitcoin realiza operaciones específicas dentro de las transacciones con sus [OP_Codes](https://en.bitcoin.it/wiki/Script#Opcodes). Aquí hay algunos de ellos:

- `OP_DUP`: <small>Duplica el elemento superior de la pila.</small>
- `OP_HASH160`: <small>Hashea el elemento superior de la pila dos veces (SHA-256 seguido de RIPEMD-160).</small>
- `OP_EQUALVERIFY`: <small>Verifica que los dos elementos superiores son iguales y los elimina.</small>
- `OP_CHECKSIG`: <small>Verifica una firma contra una clave pública.</small>
- [`OP_RETURN`](https://en.bitcoin.it/wiki/OP_RETURN): <small>Marca la salida de la transacción como inválida, a menudo usado para almacenar datos.</small>

---

## Tipos comunes de direcciones Bitcoin

En Bitcoin, diferentes tipos de direcciones corresponden a varias formas de hacer scripts de transacciones. Aquí, exploraremos ejemplos de Script de Bitcoin para cada tipo de dirección principal. Cada tipo de dirección tiene su propio formato de script específico.

- **P2PK**: Las primeras transacciones legacy usando claves públicas completas directamente.
- **P2PKH**: Comienza con `1`. Transacciones **Legacy** usando hashes de claves públicas.
- **P2SH**: Comienza con `3`. **Legacy**, encapsula scripts complejos como multisig.
- **P2MS**: Típicamente es un tipo de dirección P2SH o P2WSH.
- **P2WPKH**: Comienza con `bc1`. **SegWit** nativo, transacciones más eficientes.
- **P2WSH**: Comienza con `bc1`. **SegWit** para scripts complejos.
- **P2TR**: Comienza con `bc1p`. Direcciones **Taproot** SegWit, mejorando privacidad y eficiencia para transacciones complejas.

> Usar SegWit nativo (P2WPKH y P2WSH) es preferible cuando es posible, ya que maximiza los beneficios de la actualización SegWit, pero P2SH-SegWit puede ser útil para compatibilidad con sistemas más antiguos.

### P2PK (Pay-to-PubKey) - Dirección Legacy más antigua <small>[arriba](#tipos-comunes-de-direcciones-bitcoin)</small>

<div class="status info">
Comienza con "1" (ej., 1A1zP1eP5QGefi2DMPTf...v7DivfNa)
</div>

Antes de que P2PKH y P2SH se convirtieran en estándar, las direcciones de Bitcoin no eran tan flexibles o ricas en características. Aquí hay algunas consideraciones:

- Direcciones que comienzan con 1 pero sin hashear la clave pública.
- No común en la práctica moderna debido a falta de privacidad y eficiencia.
- El formato P2PK está en gran parte **obsoleto** en favor de (como mínimo) P2PKH.

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

P2WPKH es un tipo de dirección Segregated Witness (SegWit) que usa un formato de scripting diferente comparado con direcciones legacy y P2SH. Simplifica las transacciones reduciendo el tamaño de datos y las comisiones comparado con formatos legacy.

### ScriptPubKey (Script de Bloqueo)

```php
OP_0 OP_PUSHBYTES_20 <PubKHash>
```

- `OP_0`: Un solo byte (0x00) indicando la versión del script.
- `OP_PUSHBYTES_20`: Empuja 20 bytes (el hash de la clave pública) a la pila.
- `<PubKHash>`: El hash de 20 bytes de la clave pública.

### Datos del Testigo

Para P2WPKH, el script de desbloqueo no es requerido en el sentido tradicional (es decir, dentro del script de desbloqueo explícitamente incluido en la entrada de la transacción). En cambio, la información de desbloqueo se proporciona como parte de los datos del testigo en el formato de transacción SegWit.

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

Taproot combina firmas [Schnorr](https://en.bitcoin.it/wiki/Schnorr) con [MAST](https://en.bitcoin.it/wiki/BIP_0114#Merkelized_Abstract_Syntax_Tree), permitiendo condiciones de gasto privadas y eficientes y haciendo que transacciones complejas **_parezcan estándar_** a menos que se revelen las condiciones. Permite la ejecución eficiente de transacciones complejas mientras oculta sus detalles.

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

La implementación de `OP_CHECKMULTISIG` saca un elemento más de lo que debería. El elemento extra es ignorado al verificar las firmas, así que no tiene efecto directo en el OP mismo. Debe estar presente porque si `OP_CHECKMULTISIG` intenta sacar de una pila vacía, causará un error de pila y fallo del script.

```php
OP_0 <sig2> <sig3> 2 <PubK1> <PubK2> <PubK3> 3 OP_CHECKMULTISIG
```

El script de entrada en este multisig no es `<sig2> <sig3>` sino `OP_0 <sig2> <sig3>`.

Es porque la costumbre al principio era usar `OP_0` que luego se convirtió en una regla de política de relay y eventualmente una regla de consenso ([BIP147](https://github.com/bitcoin/bips/blob/master/bip-0147.mediawiki)).

Es posible que el desarrollador original agregara el elemento extra en la versión original de Bitcoin, para poder agregar una característica para permitir pasar un mapa en un soft fork posterior (por razones de rendimiento). Sin embargo, esa característica nunca se implementó, y la actualización BIP147 a las reglas de consenso en 2017 hace imposible agregar esa característica en el futuro.

Solo el desarrollador original de Bitcoin podría decir si el elemento ficticio de la pila fue el resultado de un bug o un plan para una actualización futura. De ahora en adelante, si ves un script multisig, deberías esperar ver un `OP_O` extra al principio, cuyo único propósito es como solución alternativa a una rareza en las reglas de consenso.

---

## Seguimientos

- Documentación oficial de [Script](https://en.bitcoin.it/wiki/Script) en el Bitcoin Wiki.
- [Bitcoin IDE](https://siminchen.github.io/bitcoinIDE/build/editor.html) es un emulador visual de Script de Bitcoin online. Genial para propósitos de aprendizaje.
- [Script Editor](https://coins.github.io/bitcoin-scripts/script-editor/) es investigación orientada a producto sobre escalabilidad y usabilidad de Bitcoin.
- [Miniscript](https://bitcoin.sipa.be/miniscript/) es un lenguaje para escribir (un subconjunto de) Scripts de Bitcoin de manera estructurada, permitiendo análisis, composición, firma genérica, y más.

**Lecturas relacionadas**

- [Mastering Bitcoin](/es/readings/mastering-bitcoin/) <small>por Andreas M. Antonopoulos, David A. Harding</small>
