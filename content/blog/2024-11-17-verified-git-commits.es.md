+++
title = "Commits de git verificados"
description = "Firma tus commits de Git con GPG para demostrar que realmente son tuyos. Sin firmas, cualquiera puede falsificar commits usando tu email. Toma 5 minutos configurarlo y añade confianza real a tu código."
draft = false
[taxonomies]
tags = [ "git", "security", "cryptography", "open-source" ]
[extra]
subtitle = "Aumentando la confianza y seguridad en tu código"
static_thumbnail = "/images/blog/2024-11-17/cover.jpg"
+++

![blog-cover](/images/blog/2024-11-17/cover.jpg)

Cuando se trata de desarrollo de software, la confianza y la seguridad son muy importantes. Una forma fácil de mejorar ambas es usando commits verificados.

<!-- more -->

Ya sea que estés trabajando en un proyecto open-source o en una empresa privada, los commits verificados pueden asegurar que tus contribuciones son legítimas. Vamos a desglosar qué son, por qué son importantes y cómo empezar a usarlos.

## ¿Qué son los commits verificados?

Un commit verificado es básicamente un commit de Git que está firmado por el autor usando una firma digital. Esta firma demuestra que el commit realmente vino de la persona que dice haberlo hecho. Herramientas como [GPG (GNU Privacy Guard)](https://gnupg.org/) te permiten adjuntar esta firma a tus commits.

Si usas plataformas como GitHub, notarás una pequeña insignia de "Verified" junto a los commits que están firmados correctamente. Es una forma rápida de mostrar que el commit es auténtico.

![blog-cover](/images/blog/2024-11-17/verified-commit-example.jpg)

## ¿Por qué son importantes?

Los commits firmados ayudan a mantener tus contribuciones auténticas y confiables. Al añadir una firma criptográfica a tus commits, demuestras que los cambios vinieron de ti. Esto es especialmente importante en entornos colaborativos, donde mantener la confianza y la responsabilidad es clave.

Sin commits firmados, cualquiera podría falsificar un commit usando el email de otra persona. Por ejemplo, podrían usar tu email, y plataformas como GitHub lo vincularían a tu perfil, haciendo que parezca que tú hiciste los cambios — aunque no lo hicieras... ¡nada bueno!

![blog-cover](/images/blog/2024-11-17/impersonating-commit.jpg)

![blog-cover](/images/blog/2024-11-17/impersonating-commit4.jpg)

Al firmar tus commits, demuestras que el trabajo es genuinamente tuyo. Detiene la suplantación, construye confianza en lo que has hecho, y mantiene todo transparente y responsable.

> <small>Nota: Para esta demo, usé una dirección de email pública perteneciente a Linus Torvalds. Después de hacer push del commit a este repositorio, GitHub reconoció el email y lo vinculó a su perfil. Esta suplantación es puramente con fines de demo para resaltar riesgos potenciales. Siempre usa tu propio email para commits.</small>

---

## Cómo empezar con commits verificados

### Configura una clave GPG

Primero, necesitarás una clave GPG para empezar a firmar commits. Así es cómo:

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

### Añade tu clave a [GitHub](https://github.com/settings/keys)/[GitLab](https://gitlab.com/-/user_settings/gpg_keys)

Exporta tu clave pública:
```bash
gpg --armor --export <tu-id-de-clave>
```
Navega a "Settings > SSH and GPG keys," y pega tu clave.

![blog-cover](/images/blog/2024-11-17/gpg-keys.jpg)

### Empieza a firmar commits

A partir de ahora, Git firmará automáticamente tus commits.

Si quieres firmar un commit manualmente, simplemente usa la bandera `-S`:
```bash
git commit -S -m "Tu mensaje de commit"
```
Puedes **verificar** la firma del commit con:
```bash
git log --show-signature
```

Y también al hacer clic en la insignia "Verified" directamente en GitHub.

![blog-cover](/images/blog/2024-11-17/gpg-verify.jpg)

Los commits verificados pueden parecer un paso pequeño, pero hacen tu código más confiable. Es una forma fácil de añadir una capa extra de protección a tu trabajo — y vale la pena. ¡Pruébalo!

---

### Extra: Configuración completa en español

{{ youtube(id="0DzQBu7U2f4") }}

---

**Enlaces relacionados**

- Aprende más: [¿Qué es el cifrado PGP?](/pgp) <small>Un tutorial de 3 minutos para principiantes</small>
