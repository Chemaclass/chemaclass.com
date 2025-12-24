+++
title = "Pretty Good Privacy"
description = "PGP es un programa de cifrado que garantiza la privacidad y autenticación para la comunicación de datos. Se utiliza para firmar, cifrar y descifrar textos, correos electrónicos, archivos, directorios y particiones de disco completas, mejorando la seguridad de las comunicaciones por correo electrónico."
draft = false
[taxonomies]
tags = [ "security", "privacy", "cryptography", "encryption" ]
[extra]
subtitle = "Cómo PGP protege tu comunicación digital"
static_thumbnail = "/images/blog/2024-07-13/cover.jpg"
+++

![blog-cover](/images/blog/2024-07-13/cover.jpg)

PGP (_Pretty Good Privacy_) es un programa de cifrado que garantiza la privacidad y autenticación para la comunicación de datos. Se utiliza para firmar, cifrar y descifrar textos, correos electrónicos, archivos, directorios y particiones de disco completas.

<!-- more -->

<div class="tldr">

PGP te permite cifrar mensajes para que solo el destinatario previsto pueda leerlos, y firmar mensajes para demostrar que provienen de ti. Creado en 1991 por Phil Zimmermann, se convirtió en un símbolo de la lucha por la privacidad digital durante las [Crypto Wars](/es/blog/the-cypherpunks/#legal-and-policy-influence-the-crypto-wars).

</div>

## Historia

PGP fue desarrollado por [Phil Zimmermann](https://en.wikipedia.org/wiki/Phil_Zimmermann) debido a su preocupación por la falta de privacidad en las comunicaciones digitales. Su objetivo era proporcionar a las personas herramientas de cifrado fuertes. En 1991, PGP fue lanzado al público de forma gratuita, marcando el comienzo de una nueva era en la seguridad digital.

### Desafíos legales

A principios de los años 90, el cifrado fuerte estaba clasificado como arma bajo la ley de exportación de EE.UU. Cuando PGP se extendió globalmente a través de internet, Zimmermann enfrentó una investigación criminal por "exportar municiones".

Su defensa fue ingeniosa: publicó el código fuente de PGP en un libro. Los libros son discurso protegido. El caso fue archivado en 1996, y las restricciones de exportación de cifrado finalmente se relajaron en 2000.

---

{{ youtube(id="1-MPcUHhXoc") }}

## Características principales

- Cifra y descifra datos para garantizar comunicación segura
- Proporciona autenticación para verificar la identidad de remitentes y receptores
- Genera claves públicas y privadas para intercambio seguro de claves
- Soporta varios algoritmos de cifrado y funciones hash

Hoy, PGP continúa como **OpenPGP** (el estándar) y **GPG** (GNU Privacy Guard, la implementación libre). Cuando verificas una descarga de software o firmas un commit de git, a menudo estás usando GPG.

## Cómo funciona

PGP utiliza una combinación de [criptografía de clave pública](https://en.wikipedia.org/wiki/Public-key_cryptography) y [criptografía de clave simétrica](https://en.wikipedia.org/wiki/Symmetric-key_algorithm) para garantizar la transmisión segura de datos. Genera un par de claves que consiste en una clave pública y una clave privada. La clave pública se comparte con otros, mientras que la clave privada se mantiene en secreto. Cuando los datos se cifran, se cifran con la clave pública, y solo la clave privada correspondiente puede descifrarlos.

- **Cifrado de clave simétrica**: PGP genera una clave de sesión única de un solo uso para cifrar el mensaje. Este método es rápido y eficiente pero requiere que el remitente y el destinatario compartan la misma clave de forma segura.

- **Cifrado de clave asimétrica**: PGP resuelve el problema del intercambio de claves con cifrado asimétrico. Cada usuario tiene una clave pública y una clave privada. La clave de sesión se cifra con la clave pública del destinatario y solo puede ser descifrada por la clave privada del destinatario.

- **Firmas digitales**: PGP proporciona autenticación a través de firmas digitales. El remitente firma el mensaje con su clave privada, permitiendo al destinatario verificar la identidad del remitente usando la clave pública del remitente, asegurando que el mensaje no ha sido manipulado.

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

---

**Posts relacionados**

- [Los Cypherpunks](/es/blog/the-cypherpunks/) <small>Pioneros de la privacidad en la era digital</small>
- [Fundamentos de Bitcoin](/es/blog/bitcoin-fundamentals/) <small>Del dinero sólido a la prueba criptográfica</small>

**Lecturas relacionadas**

- [Mastering Bitcoin](/es/readings/mastering-bitcoin/) <small>por Andreas M. Antonopoulos, David A. Harding</small>
