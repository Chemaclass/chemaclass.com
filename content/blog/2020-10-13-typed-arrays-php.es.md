+++
title = "Arrays tipados en PHP"
description = "Desempaquetado de argumentos, lista de argumentos variables de función, y funciones variádicas."
[taxonomies]
tags = [ "php", "software-design", "clean-code"]
[extra]
subtitle = "Una alternativa a la característica que falta en PHP: Generics"
static_thumbnail = "/images/blog/2020-10-13/cover.jpg"
+++

![blog-cover](/images/blog/2020-10-13/cover.jpg)

Desempaquetado de argumentos, lista de argumentos variables de función, y funciones variádicas.

<!-- more -->

### La combinación perfecta
- **Desempaquetado de argumentos**: pasa los elementos de un array como argumentos individuales a una función.
- **Lista de argumentos variables**: la función recibe los argumentos como un array.
- **Función variádica**: permite verificar los tipos con un type-hint.

Usaremos este snippet para nuestros ejemplos.
Tenemos una clase `Customer`:

```php
<?php
/**
 * @psalm-immutable
 */
final class Customer
{
    // Usando la promoción de propiedades en constructor de PHP 8
    // https://wiki.php.net/rfc/constructor_promotion
    public function __construct(
        public string $name,
    ) {}
}
// Creamos una lista de 6 clientes
$customers = array_map(
    fn(int $i): Customer => new Customer("name-{$i}"),
    range(1, 6)
);
```

Siempre que queramos manipular una lista de Customers, podemos pasar como argumento: `…$customers`.

## Cómo solíamos hacerlo

Definimos el tipo del array con PHPDoc, pero no podemos forzar el tipo real de cada elemento. El código se ejecuta sin problemas aunque pases cualquier tipo en `array $customers`:

```php
<?php
/**
 * @param Customer[]
 */
function createInvoiceForCustomers(array $customers): void
{
    foreach ($customers as $customer) {
        // ... alguna lógica irrelevante para este ejemplo
    }
}
```

El código de abajo funcionaría en "tiempo de compilación". Pero podría fallar en "tiempo de ejecución".
```php
<?php
createInvoiceForCustomers($customers);
createInvoiceForCustomers([new Customer('any name')]);
createInvoiceForCustomers([new AnyOtherType()]);
```

Una alternativa recomendada: extraer la lógica y pedir el tipo concreto para verificarlo en tiempo de ejecución. Fallará si alguno de los elementos no es un Customer:

```php
<?php
/**
 * @param Customer[]
 */
function createInvoiceForCustomers(array $customers): void
{
    foreach ($customers as $customer) {
        createInvoice($customer);
    }
}
function createInvoice(Customer $customer): void
{
    // ... alguna lógica irrelevante para este ejemplo
}
```

Todo lo de aquí abajo funcionaría en "tiempo de compilación". Seguro que fallará durante "tiempo de ejecución" si `createInvoice(Customer $customer)` recibe algo diferente a un Customer.

```php
<?php
createInvoiceForCustomers($customers);
createInvoiceForCustomers([new Customer('any name')]);
createInvoiceForCustomers([new AnyOtherType()]); // no funcionará
```

Con `createInvoice(Customer $customer)` aseguramos el tipo del argumento. Pero, ¿podemos ir un paso más allá? ¿Podríamos verificar los tipos al llamar a `createInvoiceForCustomers(array $customers)`, y que el IDE se queje si los tipos no son correctos?

Eso es precisamente para lo que sirven los Generics, pero aún no existen en PHP. Ni siquiera en PHP 8. Quizás lleguen pronto, pero por ahora hay una alternativa menos conocida con sus pros y contras. Veamos un ejemplo:

```php
<?php
function createInvoiceForCustomers(Customer ...$customers): void
{
    foreach ($customers as $customer) {
        createInvoice($customer);
    }
}
```

Todo lo de aquí abajo funcionaría en "tiempo de compilación". Seguro que fallará durante "tiempo de ejecución" si `createInvoice()` recibe algo diferente a un Customer.

```php
<?php
createInvoiceForCustomers(...$customers); // OK
createInvoiceForCustomers(
    new Customer('any name'),
    new Customer('any name'),
); // OK
// Esto ni siquiera es posible de escribir. El IDE te gritará.
// Está esperando un `Customer`, pero `AnyOtherType` es dado:
createInvoiceForCustomers(new AnyOtherType());
```

### PROS
- Podemos tipar una lista de cualquier tipo concreto de forma sencilla.

### CONTRAS
- Mejor limitar las funciones a uno o dos argumentos. De lo contrario, se complica la lectura.

### Observaciones importantes
- Debe ser el último argumento de la función.
- Ayuda a minimizar el número de argumentos.


## Conclusiones

El desempaquetado de argumentos, combinado con funciones variádicas, nos permite simular arrays tipados. Un gran poder conlleva una gran responsabilidad.
Hay que conocer bien nuestras herramientas para usarlas con criterio.

![blog-cover](/images/blog/2020-10-13/footer.jpg)

---

### Referencias
- [Desempaquetado de argumentos](https://wiki.php.net/rfc/argument_unpacking)
- [Lista de argumentos variables de función](https://www.php.net/manual/en/functions.arguments.php#functions.variable-arg-list)
- [Función variádica](https://wiki.php.net/rfc/variadics)
