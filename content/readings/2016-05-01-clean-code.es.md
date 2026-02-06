+++
title = "Código Limpio"
description = "El código malo funciona, pero puede hundir a una empresa. Cada año se pierden horas y recursos por código mal escrito. Este libro te enseña a evitarlo."
authors = [ "Robert C. Martin" ]
[taxonomies]
tags = [ "clean-code", "software-design", "testing", "tdd", "refactoring" ]
[extra]
subtitle = "Manual de artesanía ágil de software"
pages = "460"
author = "Robert C. Martin"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/41yafGMO+rL._SX376_BO1,204,203,200_.jpg"
expand_preview = true
related_posts = [
  "blog/2020-06-28-the-art-of-refactoring.md",
  "blog/2020-04-07-the-art-of-testing.md",
  "blog/2025-10-10-ai-gives-you-speed-not-quality.md",
]
related_readings = [
  "readings/2016-08-01-the-clean-coder.md",
  "readings/2018-06-04-clean-architecture.md",
  "readings/2022-07-11-clean-craftsmanship.md",
]
+++

El código malo puede funcionar, pero si no está limpio, puede hundir a una empresa. Cada año se pierden horas y recursos por culpa de código mal escrito. No tiene por qué ser así.

<!-- more -->

---

## Resumen

### Capítulo 1: ¿Qué es el código limpio?

- El código se puede medir como "bueno" o "malo" en una revisión, o por cuánto tiempo tardas en explicarlo.
- El código limpio es elegante, eficiente, legible, simple, sin duplicaciones y bien escrito.
- Tu código debe añadir valor al negocio.
- Al abrir un archivo fuente, el código limpio transmite calidad y se entiende fácilmente.
- Haz tu código limpio y legible para que cualquiera pueda entenderlo rápido. No hagas perder tiempo a otros.

### Capítulo 2: Nombres significativos

- Los nombres de las clases, variables y métodos deben ser significativos e indicar claramente lo que hace un método o lo que es un atributo.
- Crea nombres pronunciables para facilitar la comunicación.
- Evita acrónimos y nombres confusos, que pueden llevar a conclusiones erróneas a cualquiera que lea el código.
- Usa nombres que reflejen el dominio del sistema, el contexto y los problemas que deben resolverse.

### Capítulo 3: Funciones

- Los métodos deben ser fáciles de leer y entender.
- Deben transmitir su intención.
- Deben ser pequeños: hasta 20 líneas.
- Deben hacer solo una cosa.
- Usa nombres que digan claramente qué hace el método.
- El número ideal de parámetros es cero, luego uno, luego dos.
- Evita tres parámetros; si los usas, justifícalo.
- Un `Boolean` como parámetro indica que el método hace más de una cosa.
- Evita la duplicación.

### Capítulo 4: Comentarios

- Cuando necesitas comentarios suele ser porque el código es malo.
- Si piensas escribir un comentario, mejor refactoriza el código.
- Los comentarios no salvan el código malo.
- El código debe explicarse por sí mismo.
- A veces los comentarios son útiles en ciertos lugares específicos.
- No expliques el código con comentarios. Usa nombres descriptivos de variables y métodos.
- Los comentarios pueden destacar la importancia de ciertos puntos.
- No escribas comentarios redundantes, inútiles o falsos.
- Para saber quién cambió qué y por qué, usa control de versiones.
- No comentes código sin usar. Elimínalo.

### Capítulo 5: Formato

- El formato es una forma de comunicación entre desarrolladores.
- El código desordenado es difícil de leer.
- La legibilidad afecta a todos los cambios futuros.
- Las clases pequeñas son más fáciles de entender.
- Pon un límite de caracteres por línea (por ejemplo, 120).
- Mantén los conceptos relacionados cerca verticalmente para crear un flujo natural.
- Usa espacios entre operadores, parámetros y comas.

### Capítulo 6: Objetos y estructuras de datos

- Sigue la [Ley de Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter):
  - Cada unidad debe tener solo conocimiento limitado sobre otras unidades: solo unidades "estrechamente" relacionadas con la unidad actual.
  - Cada unidad solo debe hablar con sus amigos; no hables con extraños.
  - Solo habla con tus amigos inmediatos.
- No hagas objetos tontos.
- Los objetos ocultan la abstracción de datos y exponen métodos que operan los datos.
- Las estructuras de datos exponen sus datos y no tienen métodos significativos.

### Capítulo 7: Manejo de errores

- Planifica el manejo de errores con cuidado.
- Cuando algo falla, hay que hacer que el sistema responda correctamente.
- Lanza excepciones en lugar de ocultarlas.
- Crea mensajes de error informativos: qué falló, dónde y, si es posible, por qué.
- Separa las reglas de negocio del manejo de errores.
- Evita devolver `NULL`; devuelve un objeto vacío.
- Evita pasar `NULL` a los métodos; puede causar `NullPointerExceptions`.

### Capítulo 8: Límites

- Al usar código de terceros, encapsula las APIs para no exponer objetos externos.
- Haz tests de las APIs de terceros.
- Estudia la documentación y prueba la API antes de usarla.
- Conoce bien las características que vas a usar.

### Capítulo 9: Tests unitarios

- Asegúrate de que cada pieza de código hace lo que esperas.
- Sigue las [leyes de TDD](https://en.wikipedia.org/wiki/Test-driven_development):
  - No escribas código sin tener primero un test que falle.
  - No escribas más tests de los necesarios para fallar.
  - No escribas más código del necesario para pasar el test.
- Mantén tus tests limpios.
- Los tests evolucionan junto con el código.
- Código sucio = tests difíciles de mantener.
- Usa la regla F.I.R.S.T:
  - **F**ast: ejecución rápida.
  - **I**ndependent: independientes entre sí.
  - **R**epeatable: repetibles en cualquier entorno.
  - **S**elf-validating: auto-validantes.
  - **T**imely: escritos a tiempo.
- Los tests son tan importantes como el código de producción.

### Capítulo 10: Clases

- Organiza las clases así:
  - Constantes públicas estáticas.
  - Variables privadas estáticas.
  - Variables de instancia privadas.
  - Luego los métodos.
- El nombre de la clase debe reflejar su responsabilidad.
- Cada clase debe tener [una sola responsabilidad](https://en.wikipedia.org/wiki/Single-responsibility_principle): una razón para cambiar.
- Intenta describir la clase en una frase breve.
- Los métodos deben ser pequeños y con una sola responsabilidad.

---

Esta entrevista se basa en el libro de Uncle Bob "Código Limpio". Repasan algunas guías que te ayudarán a ser mejor programador y exploran cómo los libros y tendencias actuales están moldeando el mundo del software.

{{ youtube(id="QnmRpHFoYLk") }}
