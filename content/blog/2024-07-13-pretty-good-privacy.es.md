+++
title = "Pretty Good Privacy"
description = "PGP te permite cifrar mensajes para que solo el destinatario pueda leerlos, y firmarlos para demostrar que son tuyos. Creado en 1991 por Phil Zimmermann."
draft = false
[taxonomies]
tags = [ "security", "privacy", "cryptography" ]
[extra]
subtitle = "Cómo PGP protege tu comunicación digital"
static_thumbnail = "/images/blog/2024-07-13/cover.jpg"
series = "bitcoin"
series_order = 1
related_posts = [
  "blog/2024-12-11-the-cypherpunks.md",
  "blog/2025-11-21-bitcoin-fundamentals.md",
]
related_readings = [
  "readings/2024-07-05-mastering-bitcoin.md",
]
+++

![blog-cover](/images/blog/2024-07-13/cover.jpg)

PGP (_Pretty Good Privacy_) es un programa de cifrado para proteger tu privacidad y autenticar comunicaciones. Sirve para firmar, cifrar y descifrar textos, correos, archivos, directorios y particiones de disco.

<!-- more -->

## Historia

[Phil Zimmermann](https://en.wikipedia.org/wiki/Phil_Zimmermann) creó PGP porque le preocupaba la falta de privacidad en las comunicaciones digitales. Quería dar a la gente herramientas de cifrado potentes. En 1991 lanzó PGP gratis, abriendo una nueva era en la seguridad digital.

### Desafíos legales

A principios de los 90, el cifrado fuerte estaba clasificado como arma según la ley de exportación de EE.UU. Cuando PGP se extendió por internet, Zimmermann fue investigado por "exportar municiones".

Su defensa fue ingeniosa: publicó el código fuente de PGP en un libro. Los libros son libertad de expresión protegida. El caso se archivó en 1996 y las restricciones de exportación se relajaron en 2000.

---

{{ youtube(id="1-MPcUHhXoc") }}

## Características principales

- Cifra y descifra datos para comunicación segura
- Verifica la identidad de quien envía y recibe
- Genera pares de claves pública/privada para intercambio seguro
- Soporta varios algoritmos de cifrado y funciones hash

Hoy PGP sigue vivo como **OpenPGP** (el estándar) y **GPG** (GNU Privacy Guard, la implementación libre). Cuando verificas una descarga de software o firmas un commit de git, probablemente estás usando GPG.

## Cómo funciona

PGP combina [criptografía de clave pública](https://en.wikipedia.org/wiki/Public-key_cryptography) y [criptografía de clave simétrica](https://en.wikipedia.org/wiki/Symmetric-key_algorithm). Genera un par de claves: una pública que compartes y una privada que guardas en secreto. Los datos se cifran con la clave pública y solo la privada puede descifrarlos.

- **Cifrado simétrico**: PGP genera una clave de sesión única para cifrar el mensaje. Es rápido y eficiente, pero necesita que ambas partes compartan la clave de forma segura.

- **Cifrado asimétrico**: Resuelve el problema del intercambio de claves. Cada usuario tiene su par de claves. La clave de sesión se cifra con la clave pública del destinatario, y solo su clave privada puede descifrarla.

- **Firmas digitales**: El remitente firma el mensaje con su clave privada. El destinatario verifica la firma con la clave pública del remitente, confirmando quién lo envió y que el mensaje no se ha alterado.

{{ youtube(id="Lq-yKJFHJpk") }}

---

## Mi clave pública

### Huella digital

```
56D5 D60B 0934 0999 199C  3750 E51B 5BF4 5F85 D160
```

### Importar directamente

```bash
curl https://chemaclass.com/pgp.asc | gpg --import
```

### Descargar el archivo .asc

<a href="/pgp.asc" id="download-link">Descargar clave PGP pública</a>
