+++
title = "The Clean Coder"
description = "Un código de conducta para programadores profesionales"
authors = [ "Robert C. Martin" ]
[taxonomies]
tags = [ "clean-code", "career", "tdd", "communication", "professionalism" ]
[extra]
subtitle = "Un código de conducta para programadores profesionales"
pages = "250"
author = "Robert C. Martin"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/51lbNIP1YLL._SX381_BO1,204,203,200_.jpg"
expand_preview = true
+++

<img border="0" src="https://images-na.ssl-images-amazon.com/images/I/51lbNIP1YLL._SX381_BO1,204,203,200_.jpg" >

Los programadores que perduran y tienen éxito en medio de la incertidumbre y la presión constante comparten un atributo común: Se preocupan profundamente por la práctica de crear software. Lo tratan como un oficio. Son profesionales.

<!-- more -->

### Los lectores aprenderán

- Qué significa comportarse como un verdadero artesano del software
- Cómo lidiar con conflictos, plazos ajustados y gerentes irrazonables
- Cómo entrar en el flujo de codificación y superar el bloqueo del escritor
- Cómo manejar la presión implacable y evitar el agotamiento
- Cómo combinar actitudes duraderas con nuevos paradigmas de desarrollo
- Cómo gestionar tu tiempo y evitar callejones sin salida, pantanos y lodazales
- Cómo fomentar entornos donde programadores y equipos puedan prosperar
- Cuándo decir **No** y cómo decirlo
- Cuándo decir **Sí** y qué significa realmente sí

---

## Resumen

### Capítulo 1: Profesionalismo

- Ser profesional significa asumir la responsabilidad total de las propias acciones.
- La primera regla es no hacer daño ni a la función ni a la estructura del software.
- Siempre cometerás errores ocasionales, pero debes aprender de cada uno.
- Deberías estar seguro de todo el código que liberas y esperar firmemente que QA no encuentre nada malo.
  - Pruébalo y pruébalo de nuevo.
  - Automatiza tus tests.
  - Diseña tu código para que sea fácil de probar.
- Deberías seguir la regla del Boy Scout y siempre dejar un módulo un poco más limpio de lo que lo encontraste para que sea más fácil de cambiar con el tiempo, no más difícil.
- Tu carrera es **tu responsabilidad**, no la de tu jefe ni la de tus empleadores.
  - Dedicar 20 horas a la semana más allá de tu trabajo normal para mejorar tus conocimientos y habilidades.
  - Lee, experimenta, practica (kata), habla con otros, colabora, mira por encima de la valla, mentoriza.
  - Debería ser divertido.
- También, conoce tu dominio, identifícate con tu cliente (nunca "nosotros vs. ellos").

### Capítulo 2: Decir No

- Los profesionales tienen el coraje de decir no a sus gerentes.
- Los gerentes y desarrolladores tienen roles que a menudo son adversarios, porque a corto plazo, sus objetivos tienden a entrar en conflicto.
- Cuanto más alto es el riesgo, más valioso se vuelve un "no", y más difícil de decir.
- Los buenos equipos trabajarán exitosamente hacia un sí, pero solo un sí correcto, que luego funcionará en la práctica.

### Capítulo 3: Decir Sí

- Hay tres partes para hacer un compromiso:
  - Dices que lo harás
  - Lo dices en serio
  - Realmente lo haces
- Tu compromiso debe respetar los límites de lo que esperas (basado en tu experiencia) poder y no poder hacer.
  - Si reconoces que probablemente no podrás cumplir un compromiso, necesitas levantar una bandera roja inmediatamente.

### Capítulo 4: Codificación

- La programación requiere un nivel de concentración que pocas otras disciplinas requieren.
- "La zona" (o "flujo") no es tan bueno como la gente piensa: serás localmente productivo, pero a menudo perderás la imagen más grande y posiblemente producirás diseños no tan buenos.
- Las interrupciones son malas distracciones.
  - El pair programming es útil para lidiar con ellas.
  - TDD ayuda a hacer el contexto pre-interrupción reproducible.
    - Minimiza el tiempo de depuración
- Codificar es una **maratón**, no un sprint, así que conserva la energía y creatividad.
- Vete cuando sea hora, incluso en medio de algo importante.
- Reestima continuamente tu mejor/probable/peor tiempo de finalización y habla tan pronto como reconozcas que probablemente llegarás tarde.
  - No permitas que nadie te apure.
  - Usa una definición adecuada de "terminado", con requisitos de calidad suficientemente altos.
- La programación es demasiado difícil para cualquiera, así que obtén ayuda y proporciona ayuda a otros, en particular (pero no solo) en estilo de mentoría.
  - No seas tímido para preguntar.

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

- Evita basura entra, basura sale. Asegúrate de entender los requisitos.
  - Crear este entendimiento significa eliminar ambigüedad.
- La mejor forma de hacer esto es definir tests de aceptación:
  - Todas las condiciones del cliente necesitan ser cumplidas por tests automatizados para probar el comportamiento esperado del software.
  - El éxito de esos tests constituye la definición de "Terminado".
- La implementación del código debería empezar solo cuando los tests estén completos.
- A diferencia de los tests unitarios (que son solo para programadores), la audiencia de los tests de aceptación son ambos: negocio y desarrolladores.
- Ejecuta todos los tests en integración continua y arregla cualquier fallo inmediatamente.

### Capítulo 8: Estrategias de Testing

- Considera a QA parte del equipo. Actúan como especificadores: escribiendo tests de aceptación, incluyendo los casos de fallo y casos límite, y realizan testing exploratorio.
- Pirámide de testing:
  - La mayoría de tests son tests unitarios. Por desarrolladores y para desarrolladores.
  - Muchos tests son tests de componentes o integración. Por QA o Negocio asistidos por Desarrolladores. Para Negocio y Desarrolladores.

### Capítulo 9: Gestión del tiempo

- Los roles de gestión en desarrollo de software requieren buena gestión del tiempo.
- Las reuniones son necesarias pero también son a menudo grandes pérdidas de tiempo, así que evita reuniones que no tengan un beneficio claro <- esto es una obligación profesional.
- Las reuniones deben tener una agenda y un objetivo claro.
  - Las reuniones de pie ágiles pueden ser un formato eficiente.
  - La planificación de iteración debería tomar el 5% de la iteración.
- La concentración (enfoque) es un recurso escaso.
  - Úsalo bien cuando esté presente y recarga con tareas más simples (reuniones) y descansos entre medio.
  - ¿Cómo mejorar?
    - Deporte.
    - Entrada creativa.
    - Descansos cortos cada 45 minutos.

### Capítulo 10: Estimación

- La estimación es la fuente de la mayor desconfianza entre la gente de negocio y los desarrolladores porque los últimos proporcionan estimaciones que los primeros tratan como compromisos.
  - Ambos son insuficientemente conscientes de que la estimación realmente es una distribución de probabilidad, no un número fijo.

### Capítulo 11: Presión

- El desarrollador profesional está calmado y decidido bajo presión, adhiriéndose a su entrenamiento y disciplinas, sabiendo que son la mejor forma de cumplir plazos y compromisos apremiantes.
- Evita situaciones que causen presión mediante:
  - hacer solo compromisos que puedas cumplir
  - mantener tu código limpio
  - trabajar de tal manera que no necesites cambiarlo cuando estés en crisis
- No entres en pánico. Habla con tu equipo. No te apresures. Confía en tus disciplinas.
- Ofrece hacer pairing a otros en crisis.

### Capítulo 12: Colaboración

- No todos pero la mayoría de programadores les gusta trabajar solos. Pero necesitamos entender los objetivos de las personas que nos rodean, incluyendo la gente de negocio.
  - Esto requiere **comunicación**.
- Igualmente, dentro del equipo de desarrollo: solo la propiedad colectiva del código y el pairing producen un buen nivel de comunicación.
  - La programación se trata de **comunicación**.

### Capítulo 13: Equipos y proyectos

- Los equipos necesitan tiempo (meses) para consolidarse, para realmente conocerse y aprender a trabajar juntos de verdad.
  - Asignar personas fraccionarias a diferentes proyectos es una mala idea, al igual que romper un buen equipo al final de un proyecto.
  - En cambio, asignar varios proyectos a un equipo puede funcionar bien.

### Capítulo 14: Mentoría, aprendizaje y artesanía

- Los programadores jóvenes necesitan mentoría.
  - La mentoría puede ser implícita o explícita.
- Dado que confiamos el software con todos los aspectos de nuestras vidas, un período razonable de entrenamiento y práctica supervisada sería apropiado.

---

En esta lección, Uncle Bob demuestra la necesidad de escribir código limpio y establece las bases para lograrlo, siendo estas bases de naturaleza social y científica. Dejando claro que el futuro de la programación se basa en un código ético y educado.

{{ youtube(id="7EmboKQH8lM") }}

---

En esta segunda lección, Uncle Bob nos enseña el propósito de los comentarios en el código, rompiendo el paradigma de que comentar es algo que "tengo que hacer" por el simple hecho de que erróneamente consideramos que comentar es una buena práctica. Para Uncle Bob, escribir un comentario es una señal de fracaso, ya que un buen código debe poder explicarse por sí mismo: Menos Comentarios = Mejor Código.

{{ youtube(id="2a_ytyt9sf8") }}

---

En esta tercera lección, Uncle Bob se enfoca en crear conciencia, dada la necesidad de aumentar el nivel de criterio en la producción de código. Señalando la falta de preparación en la mayoría de programadores, como una de las principales razones de la ineficiencia en el desarrollo de software actual.

{{ youtube(id="Qjywrq2gM8o") }}

---

En esta cuarta lección, Uncle Bob nos introduce a una metodología de desarrollo de software orientada a través de testing. Este es el Test-Driven Development (TDD), una práctica con una larga curva de aprendizaje, pero con resultados significativos para generar un código más robusto, seguro, más mantenible y con mayor eficiencia de desarrollo.

{{ youtube(id="58jGpV2Cg50") }}
