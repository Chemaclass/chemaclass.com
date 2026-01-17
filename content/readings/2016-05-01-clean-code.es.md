+++
title = "Clean Code"
description = "Incluso el código malo puede funcionar. Pero si el código no está limpio, puede llevar a una organización de desarrollo a la ruina. Cada año, se pierden incontables horas y recursos significativos debido a código mal escrito. Pero no tiene que ser así."
authors = [ "Robert C. Martin" ]
[taxonomies]
tags = [ "clean-code", "software-design", "testing", "tdd", "refactoring" ]
[extra]
subtitle = "Manual de artesanía ágil de software"
pages = "460"
author = "Robert C. Martin"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/41yafGMO+rL._SX376_BO1,204,203,200_.jpg"
expand_preview = true
+++

Incluso el código malo puede funcionar. Pero si el código no está limpio, puede llevar a una organización de desarrollo a la ruina. Cada año, se pierden incontables horas y recursos significativos debido a código mal escrito. Pero no tiene que ser así.

<!-- more -->

---

## Resumen

### Capítulo 1: ¿Qué es el código limpio?

- El código puede medirse con "bueno" o "malo" en la revisión de código o por cuántos minutos te lleva hablar de él.
- Un código limpio debe ser elegante, eficiente, legible, simple, sin duplicaciones y bien escrito.
- Deberías añadir valor al negocio con tu código.
- El código limpio ofrece calidad y comprensión cuando abrimos el archivo fuente.
- Es necesario que tu código sea limpio y legible para que cualquiera lo encuentre y entienda fácilmente. Evita hacer perder tiempo a otros.

### Capítulo 2: Nombres significativos

- Los nombres de las clases, variables y métodos deben ser significativos e indicar claramente lo que hace un método o lo que es un atributo.
- Crea nombres pronunciables para facilitar la comunicación.
- Evita acrónimos y nombres confusos, que pueden llevar a conclusiones erróneas a cualquiera que lea el código.
- Usa nombres que reflejen el dominio del sistema, el contexto y los problemas que deben resolverse.

### Capítulo 3: Funciones

- Los métodos deben ser fáciles de leer y entender.
- Los métodos deben transmitir su intención.
- Los métodos deben ser pequeños.
- Deben tener hasta 20 líneas.
- Los métodos deben hacer solo una cosa.
- Deberías usar nombres con palabras que digan lo que realmente hace.
- El número óptimo de parámetros de un método es cero, después uno y dos.
- Tres debe evitarse, pero si crees que debe usarse, ten una justificación.
- `Boolean` como parámetro ya indica que hace más de una cosa.
- Evita la duplicación.

### Capítulo 4: Comentarios

- Una de las razones comunes para los comentarios es porque el código es malo.
- Si estás pensando en escribir un comentario, entonces el código debería ser refactorizado.
- Los comentarios no salvan un código malo.
- Intenta explicar qué causa el código que suceda.
- Los comentarios pueden ser útiles cuando se colocan en ciertos lugares.
- No expliques tu código con comentarios. Usa nombres informativos de variables/métodos.
- Los comentarios pueden usarse para expresar la importancia de ciertos puntos.
- No escribas comentarios con información redundante, inútil o falsa.
- No deberían usarse para indicar quién cambió o por qué, usa versionado.
- No comentes código que no se usará. Elimínalo en su lugar.

### Capítulo 5: Formato

- El formato debería indicar cosas importantes ya que es una forma de comunicación del desarrollador.
- Un código desordenado es difícil de leer.
- La legibilidad del código tendrá efecto en todos los cambios que se hagan.
- Las clases más pequeñas son más fáciles de entender.
- Establece un límite de caracteres por línea de código. Por ejemplo 120.
- Intenta mantener los conceptos más relacionados verticalmente cercanos para crear un flujo de código.
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

- El manejo de errores debe planificarse cuidadosamente por todos los programadores.
- Cuando ocurren cosas incorrectas, tenemos que hacer que haga las cosas correctas.
- Da preferencia a lanzar una excepción que a tratarla solo para ocultarla.
- Crea mensajes con información sobre el error.
- Menciona que falló. ¿Dónde fue este fallo? Si es posible, menciona por qué falló.
- Mira las reglas de negocio separadas para errores y manejo de errores.
- Evita devolver `NULL` en métodos, preferiblemente devuelve un objeto vacío.
- Evita pasar `NULL` a los métodos; esto puede generar `NullPointerExceptions`.

### Capítulo 8: Límites

- En código de terceros, para evitar pasar objetos, las APIs miran hacia adelante para mantener las cosas en la misma clase.
- Realiza tests en las APIs de terceros.
- Estudia la documentación y prueba la API de terceros antes de empezar a usarla.
- Revisa bien las características que usarás.

### Capítulo 9: Tests unitarios

- Asegúrate de que cada pieza de código hace lo que esperas que haga.
- Sigue las [leyes de TDD](https://en.wikipedia.org/wiki/Test-driven_development):
  - No crees código antes de tener un test que falle.
  - No crees más tests de los necesarios para fallar.
  - No puedes escribir más código del suficiente para pasar el test que está fallando.
- Mantén tus tests limpios.
- Los tests deben sufrir cambios de la misma manera que el código.
- Cuanto más sucio el código, más difícil será mantener el test.
- Usa la regla F.I.R.S.T para testing:
  - El test es de ejecución rápida.
  - Los tests son independientes de otros.
  - El test es repetible en varios entornos.
  - El test es auto-validante.
  - El test es oportuno.
- El test es tan importante como el código de producción.

### Capítulo 10: Clases

- Por defecto, las clases deberían empezar con las variables:
  - Estáticas y constantes públicas.
  - Estáticas y variables privadas.
  - Instancias y variables privadas.
  - Luego vienen las funciones.
  - El nombre de la clase debe representar su responsabilidad.
- La clase debe tener solo [una responsabilidad](https://en.wikipedia.org/wiki/Single-responsibility_principle): una razón para cambiar.
- Deberías intentar hacer una breve descripción de la clase.
- Los métodos deben ser pequeños y de una sola responsabilidad.

---

Esta entrevista está basada en el libro de Uncle Bob "Clean Code". Cubren algunas guías existentes que pueden ayudarte a convertirte en un mejor programador y exploran cómo los libros y las tendencias actuales están moldeando el panorama del software.

{{ youtube(id="QnmRpHFoYLk") }}
