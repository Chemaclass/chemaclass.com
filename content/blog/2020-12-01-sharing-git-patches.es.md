+++
title = "Compartiendo tus parches de git"
description = "Descubre otra forma de compartir sugerencias con tu equipo de desarrollo."
[taxonomies]
tags = [ "git", "code-review", "communication", "pair-programming"]
[extra]
subtitle = "Otra forma de compartir sugerencias rápidas con tu equipo"
static_thumbnail = "/images/blog/2020-12-01/cover.jpg"
+++

![blog-cover](/images/blog/2020-12-01/cover.jpg)

Descubre otra forma de compartir sugerencias con tu equipo de desarrollo.

<!-- more -->

### Imagina esta situación

Estás revisando un Pull Request (PR), y ves algunas mejoras menores o sugerencias que te gustaría compartir con el autor. Podrías escribir algunos comentarios, y normalmente, eso sería suficiente.

Imagina que para transmitir tu "idea completa" necesitarías cambiar algunos archivos porque simplemente comunicar la imagen completa acabará en un comentario enorme que podría no ser tan claro como podría ser.

## ¿Qué posibilidades hay aparte de solo comentarios en un PR?

Bueno, hay múltiples opciones. La clave es ser consciente de ellas y usarlas sabiamente dependiendo de la prioridad de la tarea y los cambios en sí:
- Como ya se mencionó, escribir un comentario como retroalimentación es una buena idea por defecto, pero no la única.
- Siempre podemos hacer algo de pair-thinking, hablar en cualquier momento. La comunicación siempre es buena para aclarar la posible incertidumbre.
- Compartir tus parches de git es otra buena opción.

# ¡Git diff al rescate!

¿Y si tú (como revisor) pudieras compartir tu idea sin ningún commit o comentario en el PR, pero compartiendo tus cambios directamente con el autor?

Bueno, eso es realmente posible y muy fácil. Como ya sabes, el comando git diff te da las diferencias entre dos ramas cualesquiera.

```sh
git diff origin develop > ../my-origin-develop.patch
```

Lo que estamos haciendo aquí es redirigir la salida del comando diff a un archivo (también conocido como: parche), para poder compartir esa salida con cualquier otro compañero de equipo.

## ¿Y ahora qué?

Bueno, teniendo ese archivo de parche, es bastante fácil aplicar esos cambios en tu máquina local sin hacer ningún commit:

```sh
git apply ../my-origin-develop.patch
```

Aplicar este parche simplemente cambiará tu sistema local de la misma manera que se creó el parche.

## "Cómo hacerlo" por pasos

Dividamos las responsabilidades en dos: el creador del parche y su usuario:

### El creador del parche: la persona que creará el parche

```sh
# Cambia a esa rama
$ ~/myProject git:(the-branch) ➜ git pull origin the-branch
# Haz tus sugerencias y cambios en la rama objetivo
# Genera el archivo de parche usando el comando diff
$ ~/myProject git:(the-branch) ➜ git diff > ../your-diff.patch
# Comparte el archivo de parche con el autor del PR
```

### El usuario del parche: la persona que verá el parche

```sh
# Asegúrate de estar en esa rama
$ ~/myProject git:(the-branch) ➜ git pull origin the-branch
# Aplica el archivo de parche
$ ~/myProject git:(the-branch) ➜ git apply ../your-diff.patch
```

---

#### Referencias

- [Documentación oficial de "git apply"](https://git-scm.com/docs/git-apply)
