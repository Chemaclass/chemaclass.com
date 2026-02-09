+++
title = "El Programador Limpio"
description = "Guía de conducta para programadores profesionales"
authors = [ "Robert C. Martin" ]
[taxonomies]
tags = [ "clean-code", "career", "tdd", "communication" ]
[extra]
subtitle = "Un código de conducta para programadores profesionales"
pages = "250"
author = "Robert C. Martin"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/51lbNIP1YLL._SX381_BO1,204,203,200_.jpg"
expand_preview = true
related_readings = [
  "readings/2016-05-01-clean-code.md",
  "readings/2022-07-11-clean-craftsmanship.md",
  "readings/2018-06-04-clean-architecture.md",
]
+++

Los programadores que triunfan bajo presión e incertidumbre comparten algo: les importa de verdad crear buen software. Lo tratan como un oficio. Son profesionales.

<!-- more -->

### Aprenderás

- Qué significa ser un verdadero artesano del software
- Cómo lidiar con conflictos, plazos ajustados y jefes difíciles
- Cómo entrar en flujo y superar el bloqueo
- Cómo manejar la presión y evitar el agotamiento
- Cómo combinar actitudes clásicas con nuevos paradigmas de desarrollo
- Cómo gestionar tu tiempo y evitar atascos
- Cómo crear entornos donde los programadores y equipos prosperen
- Cuándo decir **No** y cómo hacerlo
- Cuándo decir **Sí** y qué implica realmente

---

## Resumen

### Capítulo 1: Profesionalismo

- Ser profesional significa asumir responsabilidad total de tus acciones.
- Primera regla: no dañes ni la función ni la estructura del software.
- Siempre cometerás errores, pero aprende de cada uno.
- Confía en el código que liberas. Espera que QA no encuentre nada.
  - Prueba una y otra vez.
  - Automatiza tus tests.
  - Diseña el código para que sea fácil de probar.
- Sigue la regla del Boy Scout: deja el código un poco más limpio de como lo encontraste.
- Tu carrera es **tu responsabilidad**, no la de tu jefe.
  - Dedica 20 horas semanales extra a mejorar tus habilidades.
  - Lee, experimenta, practica (katas), habla con otros, colabora, mentoriza.
  - Que sea divertido.
- Conoce tu dominio e identifícate con tu cliente (nunca "nosotros vs. ellos").

### Capítulo 2: Decir No

- Los profesionales tienen el coraje de decir no a sus jefes.
- Managers y desarrolladores a menudo chocan porque sus objetivos a corto plazo entran en conflicto.
- Cuanto mayor el riesgo, más valioso es un "no" y más difícil de decir.
- Los buenos equipos trabajan hacia un sí, pero solo un sí correcto que funcione en la práctica.

### Capítulo 3: Decir Sí

- Hay tres partes para hacer un compromiso:
  - Dices que lo harás
  - Lo dices en serio
  - Realmente lo haces
- Tu compromiso debe respetar los límites de lo que esperas (basado en tu experiencia) poder y no poder hacer.
  - Si reconoces que probablemente no podrás cumplir un compromiso, necesitas levantar una bandera roja inmediatamente.

### Capítulo 4: Codificación

- Programar requiere un nivel de concentración que pocas disciplinas exigen.
- "La zona" (o flujo) no es tan buena como parece: serás productivo localmente, pero puedes perder la visión global y producir diseños mediocres.
- Las interrupciones son malas distracciones.
  - El pair programming ayuda a gestionarlas.
  - TDD hace que el contexto pre-interrupción sea reproducible.
    - Minimiza el tiempo de depuración.
- Programar es una **maratón**, no un sprint. Conserva energía y creatividad.
- Vete cuando sea hora, aunque estés en medio de algo importante.
- Reestima continuamente tu tiempo de finalización y avisa en cuanto veas que llegarás tarde.
  - No dejes que nadie te meta prisa.
  - Define bien qué significa "terminado", con requisitos de calidad altos.
- Programar es difícil para todos. Pide ayuda y ofrécela, especialmente como mentor.
  - No tengas vergüenza de preguntar.

### Capítulo 5: Test-Driven Development

- [TDD](https://en.wikipedia.org/wiki/Test-driven_development) no es una cura milagrosa y es impráctico o inapropiado en algunos casos (raros).
- Ciclo TDD:
  1. Añade un test
  2. Ejecuta todos los tests. El nuevo test debería fallar por razones esperadas
  3. Escribe el código más simple que pase el nuevo test
  4. Todos los tests deberían pasar ahora
  5. Refactoriza según sea necesario
  6. Repite

### Capítulo 6: Practicar

- Una Kata de programación es un conjunto preciso de pulsaciones de teclas y movimientos de ratón coreografiados que simula la resolución de algún problema de programación.
  - Una Kata es sobre el proceso, no la solución.
  - No estás resolviendo el problema porque ya conoces la solución.

### Capítulo 7: Tests de Aceptación

- Evita "basura entra, basura sale". Asegúrate de entender los requisitos.
  - Entenderlos bien significa eliminar ambigüedad.
- La mejor forma es definir tests de aceptación:
  - Los tests automatizados verifican que el software cumple las condiciones del cliente.
  - Pasar esos tests define "Terminado".
- Empieza a implementar solo cuando los tests estén definidos.
- Los tests unitarios son para programadores. Los tests de aceptación son para negocio y desarrolladores.
- Ejecuta todos los tests en integración continua y arregla los fallos de inmediato.

### Capítulo 8: Estrategias de Testing

- QA es parte del equipo. Escriben tests de aceptación, casos de fallo, casos límite y hacen testing exploratorio.
- Pirámide de testing:
  - La mayoría son tests unitarios: por y para desarrolladores.
  - Muchos son tests de componentes o integración: por QA/Negocio con ayuda de desarrolladores, para ambos.

### Capítulo 9: Gestión del tiempo

- En desarrollo de software, gestionar bien el tiempo es esencial.
- Las reuniones son necesarias pero a menudo una pérdida de tiempo. Evita las que no aporten valor claro: es una obligación profesional.
- Las reuniones deben tener agenda y objetivo claro.
  - Las dailies ágiles son un formato eficiente.
  - La planificación de iteración debería ocupar el 5% de la iteración.
- La concentración es un recurso escaso.
  - Úsala cuando la tengas y recarga con tareas simples y descansos.
  - Para mejorarla:
    - Haz deporte.
    - Busca estímulos creativos.
    - Toma descansos cortos cada 45 minutos.

### Capítulo 10: Estimación

- Las estimaciones son la mayor fuente de desconfianza entre negocio y desarrolladores. Los desarrolladores dan estimaciones que negocio trata como compromisos.
  - Ambos olvidan que una estimación es una distribución de probabilidad, no un número fijo.

### Capítulo 11: Presión

- El profesional mantiene la calma bajo presión. Sigue sus disciplinas porque sabe que es la mejor forma de cumplir plazos.
- Evita situaciones de presión:
  - Haz solo compromisos que puedas cumplir.
  - Mantén tu código limpio.
  - Trabaja de forma que no necesites cambiar de método en crisis.
- No entres en pánico. Habla con tu equipo. No te aceleres. Confía en tus disciplinas.
- Ofrece hacer pairing a compañeros en crisis.

### Capítulo 12: Colaboración

- A la mayoría de programadores les gusta trabajar solos. Pero hay que entender los objetivos de quienes nos rodean, incluido negocio.
  - Eso requiere **comunicación**.
- Dentro del equipo: solo la propiedad colectiva del código y el pairing producen buena comunicación.
  - Programar es **comunicarse**.

### Capítulo 13: Equipos y proyectos

- Los equipos necesitan meses para consolidarse, conocerse y aprender a trabajar juntos.
  - Asignar personas a varios proyectos a la vez es mala idea. Romper un buen equipo también.
  - Mejor asignar varios proyectos a un mismo equipo.

### Capítulo 14: Mentoría, aprendizaje y artesanía

- Los programadores jóvenes necesitan mentoría, ya sea implícita o explícita.
- El software controla todos los aspectos de nuestras vidas. Un período de entrenamiento y práctica supervisada es más que apropiado.

---

En esta lección, Uncle Bob explica por qué es necesario escribir código limpio y establece las bases para lograrlo, tanto sociales como técnicas. El futuro de la programación se basa en un código ético y bien educado.

{{ youtube(id="7EmboKQH8lM") }}

---

En esta segunda lección, Uncle Bob habla del propósito de los comentarios. Rompe la idea de que comentar es algo que "hay que hacer" por ser supuestamente buena práctica. Para él, escribir un comentario es señal de fracaso: el buen código se explica solo. Menos comentarios = mejor código.

{{ youtube(id="2a_ytyt9sf8") }}

---

En esta tercera lección, Uncle Bob quiere crear conciencia sobre la necesidad de elevar el criterio al producir código. Señala la falta de preparación de muchos programadores como una de las principales causas de la ineficiencia en el desarrollo de software actual.

{{ youtube(id="Qjywrq2gM8o") }}

---

En esta cuarta lección, Uncle Bob introduce el Test-Driven Development (TDD). Es una práctica con curva de aprendizaje larga, pero produce código más robusto, seguro, mantenible y desarrollado con mayor eficiencia.

{{ youtube(id="58jGpV2Cg50") }}
