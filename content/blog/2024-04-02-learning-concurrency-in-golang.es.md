+++
title = "Aprendiendo concurrencia en Golang"
description = "Quería aprender un nuevo lenguaje de programación, así que después de probar algunos, terminé con Golang como uno de mis favoritos por su simplicidad y capacidades. Tiene características que no había usado en años, como multithreading y concurrencia."
draft = false
[taxonomies]
tags = ["golang", "software-design", "clean-code"]
[extra]
subtitle = "Un emulador de carreras de caballos explicado paso a paso"
static_thumbnail = "/images/blog/2024-04-02/cover.jpg"
+++

![blog-cover](/images/blog/2024-04-02/cover.jpg)

Quería aprender un nuevo lenguaje, así que después de probar algunos, terminé con Golang como uno de mis favoritos por su simplicidad y capacidades. Tiene características que no había usado en años, como multithreading y concurrencia.

<!-- more -->

[Golang](https://go.dev/) (o `Go`) soporta concurrencia mediante hilos ligeros llamados goroutines. Son diferentes del multithreading tradicional de Java, donde hay que manejar sincronizacion y coordinacion para gestionar recursos compartidos de forma segura. Las goroutines son ligeras, las gestiona el runtime de Go, y son mas baratas de crear y manejar.

El paralelismo es **hacer** varias cosas simultaneamente. La concurrencia es **lidiar** con varias cosas a la vez. En ambos casos, no conocemos el orden de ejecucion: no sabemos que pasara primero ni que terminara antes.

> Imagina que cocinas: preparas una sopa, una ensalada y una tortilla. Eres una sola persona, pero preparas varios platos. Podrias terminar primero la ensalada, la sopa o la tortilla... no hay garantia. Esto es concurrencia: lidias con varias cosas a la vez. Cuando tu pareja viene a ayudarte, eso ya es paralelismo.

![cover](/images/blog/2024-04-02/concurrency-vs-multithreading.jpg)

Recuerdo haber construido un juego similar en `Java` cuando aprendia multithreading hace diez anos. Aprovecho esta oportunidad para hacerlo de nuevo con `Go` moderno.

Construi un juego de terminal que simula una carrera de caballos. Cada caballo es una goroutine que corre en una matriz bidimensional compartida. Cuando un caballo llega al final, notifica al canal compartido con los demas caballos (que corren en diferentes procesos) y todos se detienen, mostrando al ganador.

Separé el código en cuatro áreas para ayudar a visualizarlo:
- Punto de entrada
- Generando el tablero
- Renderizando el juego
- Moviendo los caballos


![cover](/images/blog/2024-04-02/race-horses-demo.gif)

### Punto de entrada

La estructura `Horse` representa cada Caballo en la carrera.
El juego consiste en una lista de líneas, en las cuales cada Caballo está corriendo.

```go
type Horse struct {
  Name string // El nombre del caballo
  Line int    // La línea de competición
}

func (h Horse) Letter() string {
  return fmt.Sprintf("%c", h.Name[0])
}

func (h Horse) Equals(other *Horse) bool {
  return other != nil &&
    h.Line == other.Line &&
    h.Name == other.Name
}

func (h Horse) String() string {
  return fmt.Sprintf("%s (line:%d)", h.Name, h.Line)
}
```

Puedes generar un nuevo proceso usando la palabra clave `go` al invocar cualquier función.
En este juego, esto se usa 1) para renderizar el juego `RenderGame()` y 2) para el movimiento de cada caballo `startRuningHorseInLine()`. El objetivo es mantener la "renderización" y la "lógica de movimiento" trabajando en paralelo.

```go
func main() {
  const lines, lineLength = 12, 30

  board := NewRaceBoard(lines, lineLength)
  go RenderGame(board)

  winnerChan := make(chan Horse)
  for line := range board {
    // cada caballo será movido en diferentes procesos
    go startRunningHorseInLine(board, line, winnerChan)
  }

  // esperar hasta que un caballo llegue al final
  winner := <-winnerChan
  // renderizar una última vez para asegurar el último estado del tablero
  RenderRaceBoard(board, &winner)

  fmt.Println("Race finished!")
  fmt.Printf("# Winner: %s\n", winner)
}
```

### Generando el tablero

El tablero de carreras es una matriz bidimensional de punteros a Horses. Cada linea "contiene" un solo Caballo: solo un puntero apunta a un Caballo real, el resto son `nil`. Al generar el Tablero, creamos un Caballo en la primera posicion de cada linea.

```go
func NewRaceBoard(lines, lineLength int) [][]*Horse {
  board := make([][]*Horse, lines)
  for line := range board {
    board[line] = make([]*Horse, lineLength)
    board[line][0] = &Horse{
      Name: generateHorseName(),
      Line: line,
    }
  }
  return board
}
```

Los nombres se generan aleatoriamente usando `HorseNames`.

```go
var HorseNames = [][2]string{
  {"Alloping", "Giggles"},
  {"A-lot", "Gallop"},
  {"BoJack", "Jack"},
  {"Baroness", "Belle"},
  // ...
}

func generateHorseName() string {
  name := HorseNames[rand.Intn(len(HorseNames))][0]
  surname := HorseNames[rand.Intn(len(HorseNames))][1]

  return name + " " + surname
}
```

### Renderizando el juego

Los metodos `RenderGame()`, `renderRaceBoard()`, `renderRaceLine()` y `renderRacePosition()` estan separados para que cada uno tenga una responsabilidad clara: renderizar su sujeto correspondiente.

> `RenderGame()` se está ejecutando en otro proceso usando `go`.

```go
func RenderGame(board [][]*Horse) {
  for {
    time.Sleep(renderDelay * time.Millisecond)
    RenderRaceBoard(board, nil)
  }
}

func RenderRaceBoard(board [][]*Horse, winner *Horse) {
  // usar un "buffer de string" para guardar todo el estado del tablero
  // para que luego podamos usar una sola llamada IO para renderizarlo
  var buffer bytes.Buffer
  buffer.WriteString("\n")
  for line := range board {
    renderRaceLine(board, line, &buffer, winner)
  }
  clearScreen()
  fmt.Println(buffer.String())
}

func clearScreen() {
  cmd := exec.Command("clear")
  cmd.Stdout = os.Stdout
  cmd.Run()
}

func renderRaceLine(
  board [][]*Horse,
  line int,
  buffer *bytes.Buffer,
  winner *Horse,
) {
  buffer.WriteString(fmt.Sprintf(" %.2d | ", line))
  var current Horse
  for col := range board[line] {
    h := renderRacePosition(board, line, col, buffer, winner)
    if h != nil {
      current = *h
    }
  }
  buffer.WriteString(fmt.Sprintf("| %s", current.Name))

  if current.Equals(winner) {
    buffer.WriteString(" [Won!]")
  }
  buffer.WriteString("\n")
}

func renderRacePosition(
  board [][]*Horse,
  line, col int,
  buffer *bytes.Buffer,
  winner *Horse,
) *Horse {
  if board[line][col] == nil {
    buffer.WriteString(" ")
    return nil
  }

  current := board[line][col]

  if current.Equals(winner) {
    removeChars(buffer, col+1)
    for range board[line] {
      buffer.WriteString("-")
    }
  }

  buffer.WriteString(current.Letter())

  return current
}
```

### Moviendo los caballos

En `main(...)`, el `winnerChan` es un canal compartido que usara el primer Caballo que llegue a la ultima posicion de su linea.

Cada Caballo ejecuta un bucle hasta llegar al final de la linea o recibir (via `winnerChan`) el mensaje de que otro Caballo ya gano. Hasta entonces, cada caballo se mueve de forma independiente, durmiendo milisegundos aleatorios antes de avanzar a la siguiente posicion.

> `startRuningHorseInLine()` se ejecuta en otro proceso usando `go`.

```go
func main() {
  //...
  winnerChan := make(chan Horse)
  for line := range board {
    // cada caballo será movido en diferentes procesos
    go startHorseRunning(board, line, winnerChan)
  }
  // esperar hasta que un caballo llegue al final
  winner := <-winnerChan
  //...
}

func startRunningHorseInLine(board [][]*Horse, line int, winnerChan chan Horse) {
  for {
    select {
    case <-winnerChan: // verificar si otro caballo terminó
      return // en tal caso, entonces detener el bucle for
    default:
      time.Sleep(time.Millisecond * time.Duration(rand.Intn(maxSleepDelay)))
      moveHorseOnePos(board, line, winnerChan)
    }
  }
}

func moveHorseOnePos(board [][]*Horse, line int, winnerChan chan Horse) {
  cols := len(board[line])
  for col := cols - 1; col > 0; col-- {
    if board[line][col-1] == nil {
      continue
    }
    // aquí identificamos que hay un caballo en
    // la siguiente columna, así que lo movemos a la
    // columna actual, y ponemos `nil` en la otra
    board[line][col] = board[line][col-1]
    board[line][col-1] = nil

    if col+1 == cols {
      winnerChan <- *board[line][col]
    }
    break
  }
}
```

### Código fuente

El codigo de este post es una version simplificada. Si quieres ver el codigo completo funcionando, esta aqui: [Chemaclass/go-horse-racing](https://github.com/Chemaclass/go-horse-racing).

> Gracias a mi antiguo Team Lead, Andrei Boar, que me ayudo a revisar mi solucion original y proporciono una [solucion alternativa](https://gist.github.com/zuzuleinen/79413aa7933d7d6c6d84ec6ba8c3910a) (mas simple y mejor) que aplique a mi codigo. Lo principal que aprendi fue usar un `chan Horse` para pasar el Caballo ganador desde `main()`, en vez de usar un `chan bool` y un `sync.WaitGroup` entre todos los hilos.
