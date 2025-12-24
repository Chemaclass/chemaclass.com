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

> Un test de caracterización describe el comportamiento real de una pieza de software existente, y por lo tanto protege el
> comportamiento existente del código legacy contra cambios no intencionados mediante testing automatizado. Este término fue acuñado por [Michael Feathers](/readings/working-effectively-with-legacy-code/).

Permiten y proporcionan una red de seguridad para extender y refactorizar código que no tiene tests adecuados. Se puede
escribir un test que afirme que la salida del código legacy coincide con el resultado observado para las entradas dadas.

## ¿Cómo empezar?

Estos son mis aprendizajes un año después de
leer [Working Effectively with Legacy Code](/readings/working-effectively-with-legacy-code/) y aplicarlo a los
diferentes proyectos en los que he trabajado desde entonces.

### 1. ¿Qué quieres testear?

Averigua las aserciones. Crea un archivo de test para tu clase, y un método de test para la función que quieres testear.
Pista:

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

### 2. Instancia la clase concreta/final que quieres testear.

No mockees tus clases concretas. Especialmente tu dominio de negocio. Mockea solo interfaces. De lo contrario, puedes estar ocultando
bugs sin querer (¡con tests verdes/pasando!). Trata tus [clases de dominio de negocio como finales](/blog/final-classes).

O mockea la interfaz o instancia una clase anónima si quieres crear un Stub:

> Los Stubs proporcionan respuestas a llamadas hechas durante el test, normalmente sin responder a nada fuera de lo programado para el test.

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

> Donde `FakeDependency` es una implementación concreta de `DependencyInterface` con "datos/implementación falsos" ya preparados que solo es útil para propósitos de testing.

### 3. Llama al método de esa clase proporcionando la entrada deseada.

La salida será determinada por el estado inicial de la clase de lógica de negocio que queremos testear MÁS los argumentos
de entrada que estamos usando.

```php
input = new Input(/* ... */);
returnType = myBusinessLogic.applySomeLogic(input);
```

### 4. Afirma la salida con el valor esperado.

Del paso 1 necesitas saber qué quieres. Aplica la(s) aserción(es) ahora.

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

### 5. Puede que quieras afirmar diferentes valores esperados.

Puedes proporcionar fácilmente diferentes argumentos a tu lógica de negocio ya sea a través de la construcción de la lógica o diferentes
argumentos dados. Para hacerlo, usa la anotación @dataProvider. El método "dataProvider" debe ser público y devolver cualquier iterable.


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

### Por último: limpia lo que hiciste.

Sí, limpia los tests. Merecen estar tan limpios como tu código de producción. De lo contrario, se pudrirán con el tiempo y
¡permanecerán sucios para tus compañeros y tu yo futuro!

Por ejemplo, puedes aplicar el refactoring extract method para mover los detalles de implementación (de la creación de los
diferentes objetos) y mantener el mismo nivel de abstracción mientras lees el código del test.

```php
myBusinessLogic = this.createBusinessLogic(concreteMapping);
input = this.createInput(argInput);
actual = myBusinessLogic.applySomeLogic(input);
assertEquals(expectedValue, actual.getProperty());
```

Por supuesto, todo depende del contexto. ¿Realmente tiene sentido extraer a un método privado
createBusinessLogic() o incluso createInput()? Bueno, eso depende de ti. Depende del número de líneas y, lo más
importante, del nivel de abstracción que pertenece a ese contexto.

> Solo recuerda: mantén tus métodos pequeños.

Ahora puedes refactorizar el código de producción que cubriste con tests sin ese miedo a romperlo.

---

### Todo junto

{{ gist(url="Chemaclass/07704606fcb337dbb0881c94197c329e") }}

{{ gist(url="Chemaclass/9f7f96242153b696b3f8da5c7fa80461") }}

---

## El código legacy es código sin tests

![blog-cover](/images/blog/2020-08-17/footer.jpg)

Por supuesto, hay mucho más que aprender
sobre [testing y trabajo con código legacy](/readings/working-effectively-with-legacy-code/). De hecho, especialmente cuando
tratamos con código legacy, encontrarás situaciones donde el código está acoplado de alguna manera que podrías querer mockear
tus clases concretas porque no hay interfaz (todavía) para ello.

Este libro te presenta muchas técnicas sobre cuándo, por qué, dónde y cómo puedes aplicar estos cambios.

> Cuando trabajas con código necesitas **feedback**. El feedback automatizado es el mejor. Por lo tanto, esto es lo primero que necesitas hacer: escribir los tests.

### Primero, añade tests, luego haz tus cambios.

#### Cambia la menor cantidad de código posible para poner los tests en su lugar con la receta:

1. Identifica "puntos de cambio" para romper las dependencias de tu código.
1. Rompe las dependencias.
1. Escribe los tests.
1. Haz tus cambios.
1. Refactoriza.

---

{{ youtube(id="wRtJRkRIa2s") }}
