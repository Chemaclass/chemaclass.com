+++
title = "bashunit: Tests para Scripts de Shell"
description = "Extraje los tests de un hook de Git para crear una librería de testing en Bash que funciona en macOS y Linux."
template = "page.html"
+++

# bashunit: tests para scripts de shell

Creé y mantengo [bashunit](https://bashunit.com/), una librería de testing para scripts Bash. Empezó con un hook de Git que necesitaba modificar sin romper su comportamiento.

## El problema

Mi equipo incluía un número de ticket en cada mensaje de commit. Escribí un hook de Git que lo leía del nombre de la rama y lo insertaba. Al añadir funciones, comprobar cada caso a mano llevaba más tiempo y dejaba margen para errores.

Añadí una función de aserción para comparar el output del hook con el mensaje esperado. Los tests necesitaban distintos nombres de rama y su propio setup.

## La decisión

Separé las aserciones de los tests del hook. Después añadí un runner capaz de encontrar y ejecutar funciones de test. Así podía reutilizar el código de testing fuera del proyecto original.

Mantuve la compatibilidad con Bash 3.2, la versión incluida en macOS. Cualquier desarrollador podía ejecutar los tests con la shell que ya tenía en su ordenador. La librería también tenía que funcionar en Linux.

## El resultado

La [primera versión](https://github.com/TypedDevs/bashunit/commit/fc9aac40eb8e5ad4483f08d79eb678a3650dcf78) tenía un runner y una aserción. En la [versión 0.2](https://github.com/TypedDevs/bashunit/releases/tag/0.2.0), bashunit pasó a ser un ejecutable independiente que podía ejecutarse desde otra carpeta.

Varios amigos se unieron al proyecto y ayudaron con la documentación, las aserciones y los snapshot tests, que comparan el output con un ejemplo guardado. Movimos bashunit a la organización TypedDevs para compartir su mantenimiento. La librería usa su propio runner para testear los cambios, con comprobaciones en macOS y Linux.

El resultado es una herramienta independiente que puedes usar para testear tus scripts de shell. La [historia completa del desarrollo](/es/blog/bashunit/) incluye el código original y los pasos entre el hook y la librería.

[Prueba bashunit](https://bashunit.com/installation) o [lee el código](https://github.com/TypedDevs/bashunit).
