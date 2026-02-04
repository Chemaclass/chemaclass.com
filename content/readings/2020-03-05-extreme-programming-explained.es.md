+++
title = "Programación Extrema Explicada"
description = "XP busca producir mejor software y mejor calidad de vida para el equipo. Es el framework ágil más específico en cuanto a prácticas de ingeniería."
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

Extreme Programming (XP) es un framework ágil que busca producir mejor software y mejor calidad de vida para el equipo de desarrollo. Es el más específico de los frameworks ágiles en cuanto a prácticas de ingeniería.

---

## Valores

Los cinco valores de XP son comunicación, simplicidad, feedback, coraje y respeto.

### Comunicación

El desarrollo de software es un deporte de equipo. Depende de la comunicación para transferir conocimiento entre los miembros. XP enfatiza la comunicación cara a cara, preferiblemente con una pizarra a mano.

### Simplicidad

Simplicidad significa "¿qué es lo más simple que funcionará?" El objetivo es evitar el desperdicio y hacer solo lo necesario. Mantener el diseño lo más simple posible facilita el mantenimiento y la revisión. También significa abordar solo los requisitos que conoces ahora, sin intentar predecir el futuro.

### Feedback

Con feedback constante sobre el trabajo previo, los equipos identifican áreas de mejora y ajustan sus prácticas. El equipo construye algo, recoge feedback sobre el diseño e implementación, y ajusta el producto en consecuencia.

### Coraje

Kent Beck definió el coraje como "acción efectiva ante el miedo". Necesitas coraje para:

- Plantear problemas organizacionales que reducen la efectividad del equipo.
- Dejar de hacer algo que no funciona y probar algo diferente.
- Aceptar y actuar según el feedback, aunque sea difícil de escuchar.

### Respeto

Los miembros del equipo necesitan respetarse mutuamente para comunicarse bien, dar y recibir feedback de forma constructiva, y trabajar juntos en diseños y soluciones simples.

---

## Principios

### Humanidad

Los seres humanos desarrollan software. El libro menciona 5 cosas que necesitan los desarrolladores para crecer: seguridad básica, logro, pertenencia, crecimiento e intimidad.

La magia de los grandes equipos es que, una vez que desarrollan confianza, sus miembros se sienten libres de ser más ellos mismos.

### Economía

El software cuesta dinero. Alguien pagó o invirtió en él.

Asegúrate de que lo que haces tenga valor de negocio y sirva a sus necesidades. Resolver primero la necesidad más prioritaria maximiza el valor del proyecto.

Cuanto antes el software genere dinero, antes el desarrollo será valioso.

### Beneficio Mutuo

El beneficio mutuo en XP busca actividades que beneficien a todos los involucrados: a mí ahora, a mí después, y a los clientes.

El libro presenta 3 formas de comunicarte con el futuro:

- Escribo tests automatizados que me ayudan a diseñar e implementar hoy. Los dejo para que los futuros programadores también los usen.
- Refactorizo para eliminar complejidad accidental. Menos defectos y código más fácil de entender para quien venga después.
- Elijo nombres de un conjunto coherente de metáforas. Acelera mi desarrollo y hace el código más claro para nuevos programadores.

### Auto-Similaridad

Copiar la estructura de una solución a un nuevo contexto.

Por ejemplo, la estructura básica del desarrollo: escribes un test que falla y luego lo haces funcionar. Esta estructura opera a todas las escalas. Ojo: es un buen comienzo, pero no siempre funciona.

### Mejora

Haz lo mejor que puedas hoy, pero esfuérzate por hacerlo mejor mañana. XP brilla aquí: se trata de mejorar siempre.

> Pon la mejora a trabajar sin esperar la perfección. Encuentra un punto de partida, comienza y mejora desde ahí.

### Diversidad

Los equipos necesitan personas de diferentes orígenes, experiencias y actitudes. Así tienen diferentes formas de pensar y resolver problemas.

Los programadores deberían trabajar juntos en el problema y valorar ambas opiniones.

### Reflexión

Los buenos equipos reflexionan después de la acción, regularmente. Piensan sobre por qué y cómo están trabajando.

- ¿Por qué tuvimos éxito? ¿Qué deberíamos seguir haciendo?
- ¿Por qué fallamos? ¿Qué podemos hacer mejor?

Aunque todo parezca perfecto, siempre hay espacio para mejorar:

- ¿Por qué las cosas parecen perfectas? ¿Qué hacemos bien? ¿Qué podemos mejorar?

### Flujo

El flujo en desarrollo de software es entregar valor constante participando en todas las actividades simultáneamente. No entregues software en grandes porciones. Despliega incrementos más pequeños con más frecuencia.

### Oportunidad

Aprende a ver los problemas como oportunidades para aprender y mejorar.

> Parte de ser extremo es elegir conscientemente transformar cada problema en una oportunidad: para el crecimiento personal, profundizar relaciones y mejorar el software.

### Redundancia

Los problemas difíciles deberían resolverse de múltiples maneras.

> El costo de la redundancia se paga con creces por los ahorros de evitar un desastre.

### Fracaso

A veces no sabes qué camino tomar. Prueba las ideas que tienes, aunque fallen. El fracaso no es desperdicio, sino aprendizaje.

Cuidado con la trampa de discutir o pensar eternamente sin hacer nada.

> Cuando no sabes qué hacer, arriesgarte al fracaso puede ser el camino más corto hacia el éxito.

### Calidad

Los proyectos no van más rápido bajando la calidad. Suele ser al revés. Resulta en entregas más tardías y menos predecibles por el tiempo dedicado a corregir bugs.

Aumentar la calidad suele resultar en entregas más rápidas.

> La preocupación por la calidad no es excusa para la inacción. Si no conoces una forma limpia de hacer algo que hay que hacer, hazlo lo mejor que puedas. Si conoces una forma limpia pero tomaría demasiado tiempo, haz el trabajo tan bien como el tiempo te permita. Resuélvelo de forma limpia después.

### Pasos Pequeños

Da pasos pequeños. Hacer grandes cambios de golpe es peligroso. Las personas y equipos pueden dar muchos pasos pequeños y parecer que avanzan rápido.

> Los pasos pequeños reconocen que su sobrecarga es mucho menor que cuando un equipo retrocede desperdiciando cambios grandes abortados.

### Responsabilidad Aceptada

> La responsabilidad no puede asignarse; solo puede aceptarse. Si alguien intenta darte responsabilidad, solo tú puedes decidir si la aceptas o no.

---

## Prácticas

Se pueden hacer de forma aislada, pero muchos equipos han descubierto que algunas prácticas refuerzan a otras. Hacerlas juntas elimina los riesgos típicos del desarrollo de software.

### Sentarse Juntos

La comunicación es uno de los cinco valores de XP. Haz que tu equipo se siente junto en el mismo espacio sin barreras como paredes de cubículos.

### Equipo Completo

Incluye personas con todas las habilidades y perspectivas necesarias para que el proyecto tenga éxito.

### Espacio de Trabajo Informativo

Configura el espacio para facilitar la comunicación cara a cara, permite algo de privacidad cuando la necesiten, y haz el trabajo transparente para el equipo y las partes interesadas.

### Trabajo Energizado

Eres más efectivo en el desarrollo de software cuando estás enfocado y libre de distracciones.

### Programación en Parejas

Todo el software de producción lo desarrollan dos personas en la misma máquina. Dos cerebros y cuatro ojos son mejores que un cerebro y dos ojos. Obtienes revisión de código continua y respuestas más rápidas a problemas que podrían bloquear a una persona sola.

Los equipos que usan programación en parejas descubren que mejora la calidad sin tomar el doble de tiempo. Resuelven problemas más rápido y se mantienen más enfocados, escribiendo menos código para lograr lo mismo.

Los programadores en pareja:

- Se mantienen mutuamente en la tarea.
- Hacen lluvia de ideas sobre mejoras al sistema.
- Clarifican ideas.
- Toman la iniciativa cuando el compañero está atascado, reduciendo la frustración.
- Se hacen mutuamente responsables de las prácticas del equipo.

> La programación en parejas es un diálogo entre dos personas programando simultáneamente (analizando, diseñando y probando) e intentando programar mejor.

Si necesitas privacidad y tiempo para trabajar en una idea, adelante. Necesitamos tanto compañía como privacidad. Rota parejas frecuentemente y toma descansos: el pairing puede ser agotador, pero es gratificante.

### Historias

Describe lo que el producto debería hacer en términos significativos para clientes y usuarios. Son descripciones cortas de cosas que los usuarios quieren hacer. Sirven para planificar y como recordatorios para conversaciones más detalladas.

Dale a las historias un título corto y una descripción. Escríbelas en tarjetas y ponlas en una pared visible.

En XP las historias se estiman muy temprano. Esto hace que el equipo piense en cómo obtener el mayor retorno de la pequeña inversión.

### Ciclo Semanal

El Ciclo Semanal es una iteración. El equipo se reúne el primer día de la semana para reflexionar sobre el progreso. El cliente elige las historias que quiere entregar esa semana, y el equipo determina cómo abordarlas.

La idea es producir algo para mostrar al cliente y obtener feedback.

### Build de Diez Minutos

El objetivo es construir automáticamente todo el sistema y ejecutar todos los tests en diez minutos.

### Integración Continua

Los cambios de código se prueban inmediatamente al añadirse al código base. El beneficio: detectas y corriges problemas de integración antes.

Requiere disciplina extra y depende mucho del Build de Diez Minutos y el Desarrollo Test-First.

### Programación Test-First

> Escribe un test automatizado que falle antes de cambiar cualquier código.

El libro menciona 4 problemas que aborda:

- Expansión del alcance: Es fácil dejarse llevar y poner código "por si acaso". Al declarar explícitamente lo que el programa debe hacer, te das un foco. Si quieres ese otro código, escribe otro test después.

- Acoplamiento y cohesión: Si es difícil escribir un test, tienes un problema de diseño, no de testing. El código débilmente acoplado y altamente cohesivo es fácil de probar.

- Confianza: Es difícil confiar en el autor de código que no funciona. Al escribir código limpio que funciona y demostrar tus intenciones con tests, das a tus compañeros razones para confiar en ti.

- Ritmo: Es fácil perderse horas programando. Con test-first, siempre sabes qué hacer: escribir otro test o hacer que el test roto funcione. Se desarrolla un ritmo natural: test, código, refactorizar, test, código, refactorizar.

### Diseño Incremental

> Invierte en el diseño del sistema todos los días.

Haces un poco de trabajo inicial para entender el diseño general, y luego profundizas en los detalles cuando entregas características específicas.

Este enfoque reduce el costo de los cambios y te permite tomar decisiones de diseño basándote en la información más actual.

---

## Roles

XP especifica prácticas, pero no establece roles específicos. Según la fuente, o no hay orientación, o hay descripciones de cómo los roles tradicionales se comportan en proyectos XP.

### El Cliente

Responsable de tomar todas las decisiones de negocio del proyecto.

Se asume que es una sola persona, pero la experiencia muestra que una persona no puede proporcionar toda la información de negocio de un proyecto.

### El Desarrollador

Como XP no necesita definición de roles, todos (excepto el cliente y un par de roles secundarios) se llaman desarrolladores. Son responsables de realizar las historias identificadas por el Cliente.

### El Rastreador

Su propósito es llevar el seguimiento de métricas relevantes para rastrear el progreso e identificar áreas de mejora.

### El Coach

Usualmente un consultor externo (o alguien de otra parte de la organización) que ha usado XP antes. Ayuda a mentorear al equipo en las prácticas XP y a mantener la autodisciplina.

---

#### ¿Qué es XP? (en 2 min)

{{ youtube(id="hbFOwqYIOcU") }}

#### Tech Talk de Kent Beck: XP 20 años después

{{ youtube(id="cGuTmOUdFbo") }}
