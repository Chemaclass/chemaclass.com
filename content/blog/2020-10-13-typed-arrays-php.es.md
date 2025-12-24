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
- Desempaquetado de argumentos: En lugar de pasar el argumento en sí a la función, los elementos que contiene serán pasados (como argumentos individuales).
- Lista de argumentos variables de función: Los argumentos serán pasados a la variable dada como un array.
- Función variádica: Los tipos pueden verificarse con un type-hint.

Usaremos este snippet para nuestros ejemplos
Teniendo una clase, `Customer`:

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

Definimos el tipo del array usando el bloque de comentarios PHPDoc param arriba. Pero no podemos definir el tipo real del elemento. El código seguirá ejecutándose sin ningún problema pasando cualquier tipo en ese argumento `array $customers`:

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

¡Una alternativa (recomendada!) podría ser extraer esa lógica y pedir el tipo particular para "verificarlo" en tiempo de ejecución en ese momento particular, fallando si uno de los elementos no era realmente un Customer:

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

Al hacer ese `createInvoice(Customer $customer)` estamos asegurando el tipo del argumento, ¡lo cual es bueno! Pero, ¿qué tal dar un paso más? ¿Podríamos verificar los tipos de los elementos al llamar a la función `createInvoiceForCustomers(array $customers)`, incluso haciendo que el IDE se queje cuando los tipos no son correctos?

Bueno, eso es realmente para lo que son los Generics, pero tristemente, aún no están en PHP. Ni siquiera en el próximo PHP 8. Esperemos que en un futuro cercano, pero no podemos predecir eso por ahora.
Afortunadamente, tenemos actualmente una alternativa hoy en día, pero no es tan popular. Tiene sus propios "pros" y "contras", así que echemos un vistazo a un ejemplo primero:

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
- Podemos tipar fácilmente una lista de cualquier tipo concreto.

### CONTRAS
- Es mejor definir nuestras funciones con uno o dos argumentos máximo. De lo contrario, sería demasiado complicado de leer.

### Observaciones importantes
- Necesita ser el último argumento tomado de una función.
- Ayuda a minimizar el número de argumentos que usamos en una función.


## Conclusiones

El desempaquetado de argumentos es una gran característica que, en combinación con funciones variádicas, puede ayudarnos a simular arrays tipados. Un gran poder conlleva una gran responsabilidad, y esto no es una excepción.
Necesitamos aprender sobre nuestra caja de herramientas para usarla sabiamente.

![blog-cover](/images/blog/2020-10-13/footer.jpg)

---

### Referencias
- [Desempaquetado de argumentos](https://wiki.php.net/rfc/argument_unpacking)
- [Lista de argumentos variables de función](https://www.php.net/manual/en/functions.arguments.php#functions.variable-arg-list)
- [Función variádica](https://wiki.php.net/rfc/variadics)
