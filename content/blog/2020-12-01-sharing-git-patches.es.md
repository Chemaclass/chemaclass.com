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

Estás revisando un Pull Request (PR) y ves mejoras menores que te gustaría sugerir al autor. Podrías dejar comentarios, y normalmente eso basta.

Pero a veces, para transmitir tu idea completa, necesitas tocar varios archivos. Explicarlo todo en un comentario acabaría siendo un texto enorme y poco claro.

## ¿Qué posibilidades hay aparte de solo comentarios en un PR?

Hay varias opciones. La clave es conocerlas y elegir según la prioridad de la tarea:
- Escribir un comentario como feedback suele ser la opción por defecto, pero no la única.
- Hacer pair-thinking o hablar directamente siempre ayuda a aclarar dudas.
- Compartir tus parches de git es otra buena alternativa.

# ¡Git diff al rescate!

Como revisor, puedes compartir tu idea sin hacer commits ni comentarios en el PR. Solo tienes que enviar los cambios directamente al autor.

Es muy fácil. El comando git diff te da las diferencias entre dos ramas.

```sh
git diff origin develop > ../my-origin-develop.patch
```

Redirigimos la salida del diff a un archivo (el parche), que luego podemos compartir con cualquier compañero.

## ¿Y ahora qué?

Con el archivo de parche, aplicar los cambios en tu máquina local es muy sencillo y no requiere ningún commit:

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
