+++
title = "Commits de git verificados"
description = "Firma tus commits de Git con GPG para demostrar que son tuyos. Sin firmas, cualquiera puede falsificar commits con tu email. Se configura en 5 minutos."
draft = false
[taxonomies]
tags = [ "git", "security", "cryptography", "open-source" ]
[extra]
subtitle = "Aumentando la confianza y seguridad en tu código"
static_thumbnail = "/images/blog/2024-11-17/cover.jpg"
+++

![blog-cover](/images/blog/2024-11-17/cover.jpg)

En desarrollo de software, la confianza y la seguridad son clave. Una forma facil de mejorar ambas: usar commits verificados.

<!-- more -->

Ya trabajes en open-source o en una empresa privada, los commits verificados aseguran que tus contribuciones son legitimas. Veamos que son, por que importan y como empezar a usarlos.

## ¿Que son los commits verificados?

Un commit verificado es un commit de Git firmado digitalmente por su autor. La firma demuestra que el commit viene de quien dice haberlo hecho. Herramientas como [GPG (GNU Privacy Guard)](https://gnupg.org/) permiten adjuntar esta firma.

En plataformas como GitHub veras una insignia "Verified" junto a los commits firmados. Es una forma rapida de mostrar que el commit es autentico.

![blog-cover](/images/blog/2024-11-17/verified-commit-example.jpg)

## ¿Por que son importantes?

Los commits firmados mantienen tus contribuciones autenticas y confiables. La firma criptografica demuestra que los cambios vinieron de ti. En entornos colaborativos, donde la confianza y la responsabilidad importan mucho, esto es clave.

Sin firmar, cualquiera puede falsificar un commit usando tu email. GitHub lo vincularia a tu perfil, pareciendo que hiciste los cambios aunque no fuera asi. Nada bueno.

![blog-cover](/images/blog/2024-11-17/impersonating-commit.jpg)

![blog-cover](/images/blog/2024-11-17/impersonating-commit4.jpg)

Al firmar tus commits, demuestras que el trabajo es tuyo. Evitas la suplantacion, generas confianza y mantienes todo transparente.

> <small>Nota: Para esta demo, use un email publico de Linus Torvalds. Al hacer push, GitHub reconocio el email y lo vinculo a su perfil. Suplantacion solo con fines de demo para mostrar los riesgos. Usa siempre tu propio email para commits.</small>

---

## Como empezar con commits verificados

### Configura una clave GPG

Primero necesitas una clave GPG. Asi se hace:

Genera una clave GPG:
```bash
gpg --full-generate-key
```
Encuentra tu ID de clave:
```bash
gpg --list-secret-keys --keyid-format=long
```
Dile a Git que use tu clave:
```bash
git config --global user.signingkey <tu-id-de-clave>
```
Haz que firmar commits sea el valor por defecto:
```bash
git config --global commit.gpgsign true
```

### Añade tu clave a [GitHub](https://github.com/settings/keys)/[GitLab](https://docs.gitlab.com/user/project/repository/signed_commits/gpg/)

Exporta tu clave pública:
```bash
gpg --armor --export <tu-id-de-clave>
```
Navega a "Settings > SSH and GPG keys," y pega tu clave.

![blog-cover](/images/blog/2024-11-17/gpg-keys.jpg)

### Empieza a firmar commits

A partir de ahora, Git firmara tus commits automaticamente.

Si quieres firmar un commit a mano, usa la bandera `-S`:
```bash
git commit -S -m "Tu mensaje de commit"
```
Puedes **verificar** la firma del commit con:
```bash
git log --show-signature
```

Tambien puedes hacer clic en la insignia "Verified" en GitHub.

![blog-cover](/images/blog/2024-11-17/gpg-verify.jpg)

Los commits verificados parecen un paso pequeno, pero hacen tu codigo mas confiable. Una capa extra de proteccion facil de anadir. Pruebalo.

---

### Extra: Configuración completa en español

{{ youtube(id="0DzQBu7U2f4") }}

---

**Enlaces relacionados**

- Aprende más: [¿Qué es el cifrado PGP?](/pgp) <small>Un tutorial de 3 minutos para principiantes</small>
