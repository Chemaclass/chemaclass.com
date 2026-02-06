+++
title = "97 cosas que todo programador debería saber"
description = "97 consejos cortos y prácticos para mejorar como programador. Da igual qué lenguaje uses: aquí encontrarás nuevos enfoques, buenas prácticas y consejos sólidos de expertos."
authors = [ "Kevlin Henney" ]
[taxonomies]
tags = [ "software-design", "clean-code", "career", "productivity" ]
[extra]
subtitle = "Sabiduría colectiva de los expertos"
pages = "250"
author = "Kevlin Henney"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/51AqVDUY13L._SX331_BO1,204,203,200_.jpg"
expand_preview = true
related_readings = [
  "readings/2016-10-01-the-pragmatic-programmer.md",
  "readings/2016-05-01-clean-code.md",
  "readings/2016-08-01-the-clean-coder.md",
]
+++

97 consejos cortos y útiles para programadores. Da igual qué lenguaje uses: aquí encontrarás nuevos enfoques para viejos problemas, buenas prácticas y consejos de expertos para mejorar tu oficio.

<!-- more -->

### Mis principales aprendizajes

01.- Paga la deuda técnica lo antes posible.

02.- Aprende y domina la **programación funcional**.
- Hace tu código menos propenso a errores y más fácil de depurar.

03.- No adivines lo que haría un usuario; haz que los usuarios hagan cosas y obsérvalos.

04.- **Automatiza** los estándares de código.

05.- Escribe código **simple**, nombres descriptivos simples, relaciones simples.

06.- Antes de refactorizar: considera los tests existentes y el código.
- Trabaja en incrementos, asegúrate de que los tests sigan pasando después de cada cambio.

08.- Siempre deja el código **más limpio** de lo que lo encontraste, incluso si no lo escribiste.

10.- Elige tus librerías/frameworks cuidadosamente para evitar complejidad innecesaria.

11.- Haz tu código fácil de entender usando términos del **dominio**.

13.- El **formato** del código también es importante.

14.- Usa **revisiones** de código enfocándote en compartir conocimiento entre miembros del equipo.

15.- Objetos **inmutables** siempre que sea relevante. Cada variable debería tener el menor alcance posible. Nunca incluyas más de cuatro argumentos de función.

18.- Toma **responsabilidad** de tu propia educación. Nunca dejes de aprender.
- Basta con dedicar un poco de tiempo cada semana: podcasts, cursos, libros...

19.- Al diseñar una API, apunta a hacerla **fácil de usar**, no conveniente de codificar.

20.- Despliega temprano y **frecuentemente** – no lo dejes hasta el final del proyecto.

22.- Mejorar tus habilidades debería ser algo diario.

23.- Adapta el nivel técnico de tu lenguaje específico del dominio a tu audiencia.

24.- **No tengas miedo** de romper cosas si eso es lo necesario para arreglar cosas.

25.- Ten cuidado con tus datos de prueba porque podrían hacerse públicos accidentalmente.

26.- Maneja tus errores cuando aparecen, no lo dejes para después.

27.- Aprende **diferentes** lenguajes de programación.
- Aprende su propia "cultura" o forma de hacer las cosas.
- Definitivamente te hará un mejor programador.

28.- No solo captures tus errores, realmente manéjalos.

29.- Entiende al menos algunas complejidades de tu negocio, no solo programación.

30.- **DRY** – No Te Repitas.

32.- Encapsula comportamiento, no solo estado.

33.- Los números de punto flotante inevitablemente pueden crear errores en los cálculos.

34.- El **código abierto** es una gran oportunidad para hacer trabajo interesante y desarrollar habilidades de programación.

36.- Da el **contexto** adecuado cuando pidas ayuda, porque la gente no puede adivinar lo que está pasando.

37.- No se trata de echar muchas horas. Aprende a **trabajar con eficacia**.
- Dedica tiempo a aprender y a pensar en lo que haces.

38.- Escribe **reportes de bugs** apropiados:
- Precisamente cómo reproducir el bug,
- con qué frecuencia aparece,
- qué debería haber pasado,
- qué realmente pasó.

39.- No escribas código innecesario.
- Solo escribe código que añada valor y se necesite ahora mismo.
- **Elimina código muerto**.

41.- La causa principal de lentitud en aplicaciones suele ser el exceso de llamadas remotas **entre procesos**, no el algoritmo.
- Por ejemplo, conexiones a base de datos.

42.- Si aparece una advertencia del compilador, arréglala.
- No lo dejes para después, aunque no vaya a ser problema en producción.
- "Compilador" incluye cualquier análisis estático en lenguajes no compilados.

43.- Aprender a usar herramientas de **línea de comandos** es una experiencia educativa valiosa, y podrías terminar prefiriéndolas.

44.- Aprende (al menos) dos lenguajes y paradigmas diferentes bien.

45.- Invierte algo de tiempo para **dominar** el IDE que usas.
- Te hará la vida más fácil y te ahorrará tiempo a largo plazo.

46.- Conoce y trabaja con tus limitaciones: presupuesto, recursos, tiempo, etc.

47.- Trabaja en **tareas pequeñas**. No tengas miedo de descartar cambios.
- El conocimiento adquirido no se pierde.
- Ten claro qué quieres lograr antes de empezar.

48.- Usa una BD relacional si tu aplicación va a manejar un conjunto grande, persistente e interconectado de datos.

49.- Aprende a **comunicar** bien: no solo con tu máquina, también con negocio. Y quizás otro idioma.
- Es bueno para las conexiones y para la vida.

54.- Piensa dos veces antes de implementar "soluciones temporales".

55.- Haz la **GUI** fácil de usar bien y difícil de usar mal.
- Anticipa errores y busca cómo prevenirlos.
- Se trata de la experiencia del usuario, no de la tuya.

56.- En proyectos, encuentra formas de hacer **lo invisible visible**.

57.- El paso de mensajes lleva a mejor **escalabilidad** en sistemas paralelos.

58.- Escribe código que otras personas puedan **entender** fácilmente.

59.- El **polimorfismo** reduce la necesidad de if/else, lo que produce código más corto y seguro.

60.- QA es tu amigo, no tu enemigo.

61.- Versiona tus releases.

62.- Asegúrate de que tu código fuente indique claramente lo que el programa está haciendo.

63.- Aprende sobre el proceso de build. Es una parte importante del desarrollo.

64.- Practica **pair programming**.

65.- Prefiere **tipos específicos del dominio** sobre tipos primitivos.
- Hacen el código más legible y menos propenso a errores en el desarrollo.

67.- Un profesional toma **responsabilidad personal** por su carrera y su código.

68.- Usa control de versiones.

69.- A veces la mejor forma de resolver un problema es alejarte del ordenador y dejar que la solución aparezca mágicamente en tu mente.

70.- Leer código es una buena forma de **aprender**. El código de otras personas o tu código antiguo.

72.- Reinventar la rueda es una gran forma de desarrollar tus habilidades.

75.- Si el código que escribiste es verdaderamente horrible, no intentes arreglarlo. **Bórralo** y empieza de nuevo.

76.- Aplica el Principio de Responsabilidad Única (**SRP**).

77.- Si alguien pide un cambio de producto, no lo descartes aunque no estés de acuerdo. Pregunta por qué.
- Llegarás a conversaciones más productivas y mejores resultados.

78.- Si estás haciendo lo mismo una y otra vez, intenta encontrar una forma de **automatizarlo**.

79.- Aprovecha las herramientas de análisis de código.

80.- Escribe tests basados en la **funcionalidad deseada** de tu programa, no en comportamiento incidental.

83.- El testing toma tiempo, pero asegura la **calidad** del producto final. Hazlo.

85.- Hay muchos beneficios en el trabajo colaborativo y pair programming.

86.- A veces arreglar un error en el código lleva a descubrir un error oculto.

87.- Escribe código **pensando en otros programadores**.

88.- Aprende a usar herramientas Unix. Aprende a usar el **terminal**.

89.- Usa el algoritmo y estructura de datos correctos para el trabajo.
- Para hacer eso, necesitas entenderlos bien.

90.- Ten una buena política de logging.

91.- Usar el principio DRY te ayuda a identificar y reparar cuellos de botella de rendimiento.

92.- Testers y programadores deberían **colaborar**.

93.- Escribe código como si tuvieras que mantenerlo **el resto de tu vida**.

94.- Intenta escribir **funciones "pequeñas"**.

95. Los buenos tests actúan como **documentación** para el código que prueban.
- Describen cómo funciona el código.

96. Para ser un buen programador, tienes que preocuparte por la **calidad** del código.

97.- **Habla con tus clientes** antes de asumir que entiendes lo que quieren. De verdad.
