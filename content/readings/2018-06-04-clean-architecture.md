+++
title = "Clean Architecture"
description = "A Craftsman's Guide to Software Structure and Design"
[taxonomies]
tags = [ "book", "software", "clean-code" ]
[extra]
pages = "400"
author = "Robert C. Martin"
static_thumbnail = "https://images-na.ssl-images-amazon.com/images/I/41TPrNDI50L._SX387_BO1,204,203,200_.jpg"
+++

<a target="_blank"  href="https://www.amazon.de/gp/product/0134494164/ref=as_li_tl?ie=UTF8&camp=1638&creative=6742&creativeASIN=0134494164&linkCode=as2&tag=chemaclass-21&linkId=ab2f15463aa16df7325e957c539878e0">
    <img border="0" src="https://images-na.ssl-images-amazon.com/images/I/41TPrNDI50L._SX387_BO1,204,203,200_.jpg" >
</a>

<!-- more -->

### Code design principles (SOLID)

- **Single Responsibility**: a class should have one, and only one, reason to change. Or the new version: a module
  should be responsible to one, and only one, actor.
- **Open-closed**: a class should be open for extension but closed for modification.
- **Liskov’s Substitution**: objects in a program should be replaceable with instances of their subtypes without
  altering the correctness of that program.
- **Interface Segregation**: many client-specific interfaces are better than one general-purpose interface.
- **Dependency Inversion** : one should depend upon abstractions, not concretions.

### Component principles

#### Component cohesion

- **Reuse/Release Equivalence** Principle: classes and modules (i.e. a component) reused together should be released
  together. They should have the same version number and there should be proper documentation such as changelogs.
- **Common Closure** Principle: classes that change together should be grouped together, and vice versa. The single
  responsibility principle at component-level.
- **Common Reuse** Principle: don’t force users of a component to depend on things they don’t need. The Interface
  Segregation Principle at component-level.

#### Component coupling

- **Acyclic Dependencies** Principle: no cycle in the dependency graph. Cycles couple components and, among other
  things, force them to be to released together. Use the dependency inversion principle to break cycles.
- **The Stable Dependency** Principle: less stable components should depend on more stable components. Depend on the
  direction of stability.
- **Stable Abstractions** Principle: stable components should be abstract, and vice versa. An example of an abstract
  stable component is a high-level policy which is changed by extension following the open-closed principle.

### Architecture principles

#### Setting boundaries

Boundaries are lines that separate software elements. They separate things that matter from things that don’t, i.e.
high-level components from low-level components. If a high-level component depends on a low-level component at the
source level, changes in the low-level components will spread to the high-level component. Therefore, we place a
boundary between the two, using polymorphism to invert the logic flow. This is the Dependency Inversion Principle in the
SOLID principles.

#### Separating layers

We can identify four main layers, although the number may vary:

- **Entities**: objects containing critical business logic. For example, a bank could establish that no loans are
  granted to customers not satisfying some credit score requirements. Entities may be shared across apps in the same
  enterprise.
- **Use-cases**: app-specific business rules. For example, the sequence of screens to execute a bank transfer.
- **Interface adapters**: Gateways, presenters and controllers. For example, this layer will contain the MVC
  architecture of the GUI and also objects that transform data between the format of the database and the use-cases.
- **Frameworks and drivers**: web frameworks, database, the view of MVC.


