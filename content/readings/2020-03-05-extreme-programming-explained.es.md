+++
title = "Extreme Programming Explained"
description = "Extreme Programming (XP) es un framework de desarrollo de software ágil que tiene como objetivo producir software de mayor calidad y mayor calidad de vida para el equipo de desarrollo. XP es el más específico de los frameworks ágiles en cuanto a prácticas de ingeniería apropiadas para el desarrollo de software."
authors = [ "Kent Beck" ]
[taxonomies]
tags = [ "xp", "agile", "tdd", "pair-programming", "communication" ]
[extra]
subtitle = "Abraza el Cambio"
pages = "160"
author = "Kent Beck"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/41b11Tipy0L._SX396_BO1,204,203,200_.jpg"
+++

<!-- more -->

## Definición

Extreme Programming (XP) es un framework de desarrollo de software ágil que tiene como objetivo producir software de mayor calidad y
mayor calidad de vida para el equipo de desarrollo. XP es el más específico de los frameworks ágiles en cuanto a prácticas de
ingeniería apropiadas para el desarrollo de software.

---

## Valores

Los cinco valores de XP son comunicación, simplicidad, retroalimentación, coraje y respeto, y se describen con más detalle
a continuación.

### Comunicación

El desarrollo de software es inherentemente un deporte de equipo que depende de la comunicación para transferir conocimiento de un miembro del equipo
a todos los demás en el equipo. XP enfatiza la importancia del tipo apropiado de comunicación – discusión cara a cara
con la ayuda de una pizarra u otro mecanismo de dibujo.

### Simplicidad

Simplicidad significa "¿cuál es lo más simple que funcionará?" El propósito de esto es evitar el desperdicio y hacer solo
lo absolutamente necesario, como mantener el diseño del sistema lo más simple posible para que sea más fácil de
mantener, soportar y revisar. Simplicidad también significa abordar solo los requisitos que conoces; no intentes
predecir el futuro.

### Retroalimentación

A través de retroalimentación constante sobre sus esfuerzos anteriores, los equipos pueden identificar áreas de mejora y revisar sus
prácticas. La retroalimentación también apoya el diseño simple. Tu equipo construye algo, recopila retroalimentación sobre tu diseño e
implementación, y luego ajusta tu producto en adelante.

### Coraje

Kent Beck definió el coraje como "acción efectiva ante el miedo". Esta definición muestra una preferencia por la acción basada
en otros principios para que los resultados no sean dañinos para el equipo. Necesitas coraje...

- para plantear problemas organizacionales que reducen la efectividad de tu equipo.
- para dejar de hacer algo que no funciona e intentar algo diferente.
- para aceptar y actuar según la retroalimentación, incluso cuando es difícil de aceptar.

### Respeto

Los miembros de tu equipo necesitan respetarse mutuamente para comunicarse entre sí, proporcionar y aceptar retroalimentación
que honre su relación, y trabajar juntos para identificar diseños y soluciones simples.

---

## Principios

### Humanidad

Los seres humanos son los que desarrollan software. Es un hecho. El libro menciona 5 puntos que se necesitan para que los desarrolladores
se conviertan en buenos: seguridad básica, logro, pertenencia, crecimiento e intimidad.

La magia de los grandes equipos es que después de que los miembros del equipo desarrollan confianza, descubren que son libres de ser más ellos mismos
como resultado de su trabajo conjunto.

### Economía

El software cuesta. Alguien o varias personas pagaron o invirtieron en él.

Asegúrate de que lo que estás haciendo tenga valor de negocio, cumpla con los objetivos del negocio y sirva a las necesidades del negocio. Por ejemplo, resolver
la necesidad de negocio de mayor prioridad primero maximiza el valor del proyecto.

Cuanto antes el software genere dinero, antes el desarrollo será valioso.

### Beneficio Mutuo

El beneficio mutuo en XP se trata de actividades que beneficien a todos los involucrados. Este principio trata de encontrar prácticas que
me beneficien ahora, me beneficien después, y también beneficien a los clientes.

El libro presenta 3 puntos sobre cómo XP trata mutuamente los problemas de comunicación-con-el-futuro:

- Escribo tests automatizados que me ayudan a diseñar e implementar mejor hoy. Dejo estos tests para que los futuros programadores
  también los usen. Esta práctica me beneficia ahora y a los mantenedores en el futuro.
- Refactorizo cuidadosamente para eliminar complejidad accidental, dándome tanto satisfacción como menos defectos y haciendo que
  el código sea más fácil de entender para quienes lo encuentren después.
- Elijo nombres de un conjunto coherente y explícito de metáforas que acelera mi desarrollo y hace el código más claro para
  nuevos programadores.

### Auto-Similaridad

Este principio trata de copiar la estructura de una solución a un nuevo contexto.

Por ejemplo, la estructura básica del desarrollo es que escribes un test que falla y luego lo haces funcionar. Esta estructura
opera a todas las diferentes escalas. Ten en cuenta que este principio es un buen comienzo, pero puede que no siempre funcione.

### Mejora

Haz lo mejor que puedas hoy pero esfuérzate por hacerlo mejor mañana, esfuérzate por tener una comprensión más profunda mañana. XP brilla en este
aspecto, se trata de mejorar siempre.

> Pon la mejora a trabajar no esperando la perfección. Encuentra un punto de partida, comienza y mejora desde ahí.

### Diversidad

Los equipos necesitan incorporar personas de diferentes orígenes, con diferentes experiencias, actitudes, etc. Para que el
equipo tenga diferentes formas de pensar y resolver un problema.

El principio de diversidad sugiere que los programadores deberían trabajar juntos en el problema y ambas opiniones deberían ser valoradas.

### Reflexión

Los buenos equipos reflexionan después de la acción, regularmente. Piensan sobre por qué y cómo están trabajando.

- ¿Por qué tuvimos éxito? ¿Qué deberíamos seguir haciendo?
- ¿Por qué fallamos? ¿Qué podemos hacer mejor o diferente?

Reflexiona y esfuérzate por mejorar. Incluso si todo parece perfecto, sabe que siempre hay espacio para mejorar y
lanza la pregunta:

- ¿Por qué las cosas parecen perfectas? ¿Qué estamos haciendo bien? ¿Qué podemos hacer mejor para tener aún más éxito?

### Flujo

El flujo en el desarrollo de software es entregar un flujo constante de software valioso al participar en todas las actividades de
desarrollo simultáneamente. No entregues software en grandes porciones. Despliega incrementos más pequeños de valor con más frecuencia.

### Oportunidad

Aprende a ver los problemas como oportunidades para aprender y mejorar.

> Parte de ser extremo es elegir conscientemente transformar cada problema en una oportunidad:
> una oportunidad para el crecimiento personal, profundizar relaciones y mejorar el software.

### Redundancia

Los problemas difíciles en el desarrollo de software deberían resolverse de múltiples maneras.

> El costo de la redundancia se paga con creces por los ahorros de no tener un desastre.

### Fracaso

A veces es extremadamente difícil implementar algo, no sabemos qué camino o enfoque tomar, ¡prueba las ideas
que tienes, incluso si fallan! El fracaso no es un desperdicio, sino una experiencia de aprendizaje.

Ten cuidado de caer en la trampa de discutir o pensar eternamente y no hacer las cosas.

> Cuando no sabes qué hacer, arriesgarse al fracaso puede ser el camino más corto y seguro hacia el éxito.

### Calidad

Los proyectos no van más rápido bajando la calidad. En realidad, a menudo es al revés (si no siempre). Resulta
en entregas más tardías y menos predecibles, especialmente debido a la cantidad de tiempo dedicado a corregir bugs por ejemplo.

Aumentar la calidad a menudo resulta en entregas más rápidas.

> La preocupación por la calidad no es excusa para la inacción. Si no conoces una forma limpia de hacer un trabajo que tiene que hacerse,
> hazlo lo mejor que puedas. Si conoces una forma limpia pero tomaría demasiado tiempo, haz el trabajo tan bien como el tiempo te permita
> por ahora. Resuelve terminarlo de la forma limpia después.

### Pasos de Bebé

Da pasos de bebé. Hacer grandes cambios en grandes pasos es peligroso. Las personas y los equipos pueden dar muchos pasos pequeños para que parezca
que se mueven rápidamente hacia adelante.

> Los pasos de bebé reconocen que la sobrecarga de los pasos pequeños es mucho menor que cuando un equipo retrocede desperdiciando cambios grandes abortados.

### Responsabilidad Aceptada

> La responsabilidad no puede asignarse; solo puede aceptarse. Si alguien intenta darte responsabilidad, solo tú puedes decidir si eres responsable o no.

---

## Prácticas

Si bien es posible hacer estas prácticas de forma aislada, muchos equipos han descubierto que algunas prácticas refuerzan a las otras y
deberían hacerse conjuntamente para eliminar completamente los riesgos que a menudo enfrentas en el desarrollo de software.

### Sentarse Juntos

Dado que la comunicación es uno de los cinco valores de XP, haz que tu equipo se siente junto en el mismo espacio sin barreras para
la comunicación, como paredes de cubículos.

### Equipo Completo

Incluye en el equipo personas con todas las habilidades y perspectivas necesarias para que el proyecto tenga éxito.

### Espacio de Trabajo Informativo

Configura el espacio de tu equipo para facilitar la comunicación cara a cara, permite que las personas tengan algo de privacidad cuando la necesiten,
y haz que el trabajo del equipo sea transparente entre ellos y para las partes interesadas fuera del equipo.

### Trabajo Energizado

Eres más efectivo en el desarrollo de software y todo trabajo de conocimiento cuando estás enfocado y libre de distracciones.

### Programación en Parejas

Programación en Parejas significa que todo el software de producción se desarrolla por dos personas sentadas en la misma máquina. La idea detrás de
esta práctica es que dos cerebros y cuatro ojos son mejores que un cerebro y dos ojos. Efectivamente obtienes una revisión de código continua
y una respuesta más rápida a problemas molestos que podrían detener a una persona en seco.

Los equipos que han usado programación en parejas han descubierto que mejora la calidad y en realidad no toma el doble de tiempo
porque pueden resolver problemas más rápido, y se mantienen más enfocados en la tarea en cuestión, creando así
menos código para lograr lo mismo.

Los programadores en pareja:

- Se mantienen mutuamente en la tarea.
- Hacen lluvia de ideas sobre refinamientos al sistema.
- Clarifican ideas.
- Toman la iniciativa cuando su compañero está atascado, reduciendo así la frustración.
- Se hacen mutuamente responsables de las prácticas del equipo.

> La programación en parejas es un diálogo entre dos personas programando simultáneamente (y analizando y diseñando y probando)
> e intentando programar mejor.

Sin embargo, si necesitas privacidad y tiempo para trabajar en una idea, adelante y hazlo. Necesitamos tanto compañía como privacidad.
Asegúrate de rotar parejas frecuentemente y tomar descansos frecuentes, el pairing puede ser agotador, pero seguramente es gratificante.

### Historias

Describe lo que el producto debería hacer en términos significativos para clientes y usuarios. Estas historias pretenden ser descripciones cortas
de cosas que los usuarios quieren poder hacer con el producto que pueden usarse para planificación y servir como recordatorios
para conversaciones más detalladas cuando el equipo llegue a realizar esa historia en particular.

Dale a las historias un título corto y una descripción. Escríbelas en tarjetas y ponlas en una pared por la que se pase a menudo.

En XP las historias se estiman extremadamente temprano, lo que hace que el equipo piense en cómo obtener el mayor retorno de la
pequeña inversión.

### Ciclo Semanal

El Ciclo Semanal es sinónimo de una iteración. En el caso de XP, el equipo se reúne el primer día de la semana para
reflexionar sobre el progreso hasta la fecha, el cliente elige las historias que le gustaría que se entregaran esa semana, y el equipo
determina cómo abordarán esas historias.

La intención detrás del período de entrega con tiempo limitado es producir algo para mostrar al cliente para retroalimentación.

### Build de Diez Minutos

El objetivo con el Build de Diez Minutos es construir automáticamente todo el sistema y ejecutar todos los tests en diez minutos.

### Integración Continua

La Integración Continua es una práctica donde los cambios de código se prueban inmediatamente cuando se añaden a una base de código
más grande. El beneficio de esta práctica es que puedes detectar y corregir problemas de integración antes.

Esta práctica requiere algo de disciplina extra y depende mucho del Build de Diez Minutos y el Desarrollo Test-First.

### Programación Test-First

> Escribe un test automatizado que falle antes de cambiar cualquier código.

El libro menciona 4 problemas que la Programación Test-First aborda a la vez:

- Expansión del alcance: Es fácil dejarse llevar programando y poner código "por si acaso". Al declarar explícita y
  objetivamente lo que el programa debe hacer, te das un enfoque para tu codificación. Si realmente quieres poner
  ese otro código, escribe otro test después de que hayas hecho funcionar este.

- Acoplamiento y cohesión: Si es difícil escribir un test, es una señal de que tienes un problema de diseño, no un problema de
  testing. El código débilmente acoplado y altamente cohesivo es fácil de probar.

- Confianza: Es difícil confiar en el autor de código que no funciona. Al escribir código limpio que funciona y demostrar
  tus intenciones con tests automatizados, das a tus compañeros de equipo una razón para confiar en ti.

- Ritmo: Es fácil perderse durante horas cuando estás programando. Cuando programas test-first, es más claro qué hacer
  a continuación: o escribir otro test o hacer que el test roto funcione. Pronto esto se desarrolla en un ritmo natural y eficiente:
  test, código, refactorizar, test, código, refactorizar.

### Diseño Incremental

> Invierte en el diseño del sistema todos los días.

Haces un poco de trabajo por adelantado para entender la perspectiva a lo ancho del diseño del sistema, y luego
profundizas en los detalles de un aspecto particular de ese diseño cuando entregas características específicas.

Este enfoque reduce el costo de los cambios y te permite tomar decisiones de diseño cuando es necesario basándote en la
información más actual disponible.

---

## Roles

Aunque XP especifica prácticas particulares para que tu equipo siga, realmente no establece roles específicos para las
personas en tu equipo.

Dependiendo de qué fuente leas, o no hay orientación, o hay una descripción de cómo los roles típicamente encontrados
en proyectos más tradicionales se comportan en proyectos XP.

### El Cliente

El rol del Cliente es responsable de tomar todas las decisiones de negocio respecto al proyecto incluyendo:

Se asume que el Cliente XP es una sola persona, sin embargo la experiencia ha mostrado que una persona no puede proporcionar adecuadamente
toda la información relacionada con el negocio sobre un proyecto.

### El Desarrollador

Debido a que XP no tiene mucha necesidad de definición de roles, todos en el equipo (con la excepción del cliente y un
par de roles secundarios listados abajo) se etiquetan como desarrollador. Los desarrolladores son responsables de realizar las historias
identificadas por el Cliente.

### El Rastreador

El propósito principal de este rol es llevar el seguimiento de métricas relevantes que el equipo sienta necesarias para rastrear su progreso
e identificar áreas de mejora.

### El Coach

Este es usualmente un consultor externo (o alguien de otra parte de tu organización) que ha usado XP antes y está
incluido en tu equipo para ayudar a mentorear a los otros miembros del equipo en las Prácticas XP y para ayudar a tu equipo a mantener su
autodisciplina.

---

#### ¿Qué es XP? (en 2 min)

{{ youtube(id="hbFOwqYIOcU") }}

#### Tech Talk de Kent Beck: XP 20 años después

{{ youtube(id="cGuTmOUdFbo") }}
