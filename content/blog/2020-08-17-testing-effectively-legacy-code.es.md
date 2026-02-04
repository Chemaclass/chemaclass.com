+++
title = "Testeando código legacy de forma efectiva"
description = "Estos tests también se conocen como tests de caracterización."
[taxonomies]
tags = [ "testing", "refactoring", "clean-code", "tdd"]
[extra]
subtitle = "Cómo escribir tests adecuados para código ya escrito"
static_thumbnail = "/images/blog/2021-01-11/cover.jpg"
+++

![blog-cover](/images/blog/2020-08-17/cover.jpg)

Estos tests también se conocen como tests de caracterización.

<!-- more -->

> Un test de caracterización describe el comportamiento real de software existente. Protege el comportamiento del código legacy contra cambios no intencionados mediante testing automatizado. Este término lo acuñó [Michael Feathers](/readings/working-effectively-with-legacy-code/).

Proporcionan una red de seguridad para extender y refactorizar código sin tests. Escribes un test que afirma que la salida del código legacy coincide con el resultado observado para ciertas entradas.

## ¿Cómo empezar?

Estos son mis aprendizajes un año después de leer [Trabajando con código legacy](/readings/working-effectively-with-legacy-code/) y aplicarlo en varios proyectos.

### 1. ¿Qué quieres testear?

Identifica las aserciones. Crea un archivo de test para tu clase y un método de test para la función que quieres probar. Pista:

- Si tienes el siguiente método `applySomeLogic(): ReturnType`,
- el test que podrías escribir es `test_apply_some_logic(): void`.

```php
final class MyBusinessLogic
{
    private DependencyInterface dependencyInterface;
    private ConcreteDependency concrete;

    public function __construct(
        DependencyInterface dependencyInterface,
        ConcreteDependency concrete
    ) {
        this.dependencyInterface = dependencyInterface;
        this.concrete = concrete;
    }

    public function applySomeLogic(Input input): ReturnType
    {
        // caja negra responsable de crear un ReturnType
        // basado en el Input dado
        return returnType;
    }
}

final class MyBusinessLogicTest extends TestCase
{
    public function test_apply_some_logic(): void
    {
        // Quiero afirmar que "aplicando alguna lógica"
        // de MyBusinessLogic con el Input dado
        // recibiré un ReturnType concreto con un
        // cierto valor como su propiedad. Algo como:

        returnType = myBusinessLogic.applySomeLogic(input);
        assertEquals('expected', returnType.getProperty());
    }
}
```

### 2. Instancia la clase concreta/final que quieres testear

No mockees clases concretas. Especialmente tu dominio de negocio. Mockea solo interfaces. Si no, puedes ocultar bugs sin querer (¡con tests verdes!). Trata tus [clases de dominio como finales](/blog/final-classes).

Mockea la interfaz o instancia una clase anónima para crear un Stub:

> Los Stubs dan respuestas predefinidas durante el test, sin responder a nada fuera de lo programado.

```php
final class MyBusinessLogicTest extends TestCase
{
    public function test_apply_some_logic(): void
    {
        myBusinessLogic = new MyBusinessLogic(
            this.createMock(DependencyInterface.class),
            new ConcreteDependency(/* ... */)
        );
        // O
        myBusinessLogic = new MyBusinessLogic(
            new FakeDependency(),
            new ConcreteDependency(/* ... */)
        );
        // ...
    }
}
```

> `FakeDependency` es una implementación concreta de `DependencyInterface` con datos falsos preparados, útil solo para testing.

### 3. Llama al método con la entrada deseada

La salida depende del estado inicial de la clase más los argumentos de entrada.

```php
input = new Input(/* ... */);
returnType = myBusinessLogic.applySomeLogic(input);
```

### 4. Afirma la salida con el valor esperado

Del paso 1 ya sabes qué quieres. Aplica las aserciones.

```php
final class MyBusinessLogicTest extends TestCase
{
    public function test_apply_some_logic(): void
    {
        myBusinessLogic = new MyBusinessLogic(
            this.createMock(DependencyInterface::class),
            new ConcreteDependency(/* ... */)
        );

        input = new Input(/* ... */);
        returnType = myBusinessLogic.applySomeLogic(input);
        assertEquals('expected', returnType.getProperty());
    }
}
```

### 5. Puede que quieras probar diferentes valores

Puedes pasar diferentes argumentos a tu lógica de negocio. Usa la anotación `@dataProvider`. El método dataProvider debe ser público y devolver un iterable.


```php
final class MyBusinessLogicTest extends TestCase
{
    /** @dataProvider providerApplySomeLogic */
    public function test_apply_some_logic(
        array concreteMapping,
        string argInput,
        string expectedValue
    ): void {
        myBusinessLogic = new MyBusinessLogic(
            this.createMock(DependencyInterface.class),
            new ConcreteDependency(concreteMapping),
            /* ... */
        );

        input = new Input(argInput, /* ... */);

        actual = myBusinessLogic.applySomeLogic(input);
        assertEquals($expectedValue, actual.getProperty());
    }

    public function providerApplySomeLogic(): Generator
    {
        yield [
            'concreteMapping' => ['key' => 'value'],
            'argInput' => 'something',
            'expectedValue' => 'expected-value-A',
        ];

        yield [
            'concreteMapping' => ['key2' => 'value2'],
            'argInput' => 'something-else',
            'expectedValue' => 'expected-value-B',
        ];
    }
}
```

### Por último: limpia lo que hiciste

Sí, limpia los tests. Merecen estar tan limpios como el código de producción. Si no, se pudrirán con el tiempo.

Por ejemplo, usa "extract method" para mover detalles de implementación y mantener el mismo nivel de abstracción al leer el test.

```php
myBusinessLogic = this.createBusinessLogic(concreteMapping);
input = this.createInput(argInput);
actual = myBusinessLogic.applySomeLogic(input);
assertEquals(expectedValue, actual.getProperty());
```

Todo depende del contexto. ¿Tiene sentido extraer `createBusinessLogic()` o `createInput()`? Depende del número de líneas y del nivel de abstracción adecuado para ese contexto.

> Solo recuerda: mantén tus métodos pequeños.

Ahora puedes refactorizar el código de producción que cubriste con tests sin ese miedo a romperlo.

---

### Todo junto

{{ gist(url="Chemaclass/07704606fcb337dbb0881c94197c329e") }}

{{ gist(url="Chemaclass/9f7f96242153b696b3f8da5c7fa80461") }}

---

## El código legacy es código sin tests

![blog-cover](/images/blog/2020-08-17/footer.jpg)

Hay mucho más que aprender sobre [testing y trabajo con código legacy](/readings/working-effectively-with-legacy-code/). Con código legacy encontrarás situaciones donde el código está tan acoplado que querrás mockear clases concretas porque no hay interfaz (todavía).

Este libro presenta muchas técnicas sobre cuándo, por qué, dónde y cómo aplicar estos cambios.

> Cuando trabajas con código necesitas **feedback**. El feedback automatizado es el mejor. Por eso lo primero es escribir tests.

### Primero tests, luego cambios

#### Cambia el mínimo código posible para poner los tests. La receta:

1. Identifica "puntos de cambio" para romper las dependencias de tu código.
1. Rompe las dependencias.
1. Escribe los tests.
1. Haz tus cambios.
1. Refactoriza.

---

{{ youtube(id="wRtJRkRIa2s") }}
