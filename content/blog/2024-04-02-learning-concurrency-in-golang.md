+++
title = "Learning concurrency in Golang"
description = "I wanted to learn a new programming language, so after trying some, I ended up with Golang as one of my favorites, for its simplicity and capabilities. It has features that I haven’t used in years, like multithreading."
draft = false
[taxonomies]
tags = [ "software", "golang" ]
[extra]
subtitle = "Horse racing emulator explained step by step"
static_thumbnail = "/images/blog/2024-04-02/cover.jpg"
+++

![cover](/images/blog/2024-04-02/cover.jpg)

I wanted to learn a new programming language, so after trying some, I ended up with Golang as one of my favorites, for its simplicity and capabilities. It has features that I haven’t used in years, like multithreading.

<!-- more -->

[Golang](https://go.dev/) (or `Go`) supports concurrency through _**lightweight threads**_ called **_goroutines_**, different from traditional multithreading (like in Java*). While the usage may seem similar, Go's concurrency model provides efficient parallelism and asynchronous execution, managed at the language level for better scalability and resource utilization.

> *In traditional multithreading from Java, threads are heavyweight, managed by the OS, and can consume significant system resources. Developers must handle synchronization and coordination to manage shared resources safely. In contrast, Golang's goroutines are lightweight, managed by the Go runtime, and are cheaper to create and manage.

---

I remember building a similar game in `Java` when I was learning multithreading ten years ago… let’s use this opportunity to do it again with modern `Go`.

I built a terminal game emulator that mimics one horse racing. Each horse is a goroutine that runs in a shared bidimensional matrix. Once a horse reaches the end, it notifies the shared channel between all other horses --running in different processes-- and they all stop, showing in the terminal the winner of the race.

I separated the code into four areas to help visualize it:
- Entry point
- Generating the board
- Rendering the game
- Moving the horses


![cover](/images/blog/2024-04-02/race-horses-demo.gif)

### Entry point

The struct `Horse` represents each Horse in the race. 
The game consists of a list of lines, in which each Horse is running.

```go
type Horse struct {
  Name     string // The name of the horse
  Line     int    // The competition line
  Position int    // The position in its line
  IsWinner bool   // A flag to know if it's the winner
}
```

You can spawn a new process using the keyword `go` when invoking any function.
In this game, this is used 1) to render the board [`RenderGame()`] and 2) for each horse's movement [`StartRace()`]. The goal is to keep the rendering and logic working concurrently.

```go
func main() {
  const lines, lineLength = 12, 30
  board := NewRaceBoard(lines, lineLength)
  RenderGame(board)

  winner := Horse{}
  StartRace(board, &winner)

  fmt.Printf("# Winner: %s\n", winner)
}
```

### Generating the board

The race board is a bidimensional matrix of pointers to Horses. Each line "contains" only one Horse; aka only one pointer will point to an actual Horse, the rest will be pointers to `nil`. During the generation of the Board, we will create one Horse at the first position of each line.

```go
func NewRaceBoard(lines, lineLength int) [][]*Horse {
  board := make([][]*Horse, lines)
  for line := range board {
    board[line] = make([]*Horse, lineLength)
    board[line][0] = &Horse{
      Name:     generateName(),
      Position: 0,
      Line:     line,
      IsWinner: false,
    }
  }
  return board
}

```

The names are randomly generated using `HorseNames`.

```go
var HorseNames = [][2]string{
  {"Alloping", "Giggles"},
  {"A-lot", "Gallop"},
  {"BoJack", "Jack"},
  {"Baroness", "Belle"},
  // ...
}

func generateName() string {
  name := HorseNames[rand.Intn(len(HorseNames))][0]
  surname := HorseNames[rand.Intn(len(HorseNames))][1]

  return name + " " + surname
}
```

### Rendering the game

Then `RenderGame()`, `renderRaceBoard()`, `renderRaceLine()` and `renderRacePosition()` are separated to help focus on each method's responsibility --identifying what is the subject to be rendered.

> `RenderGame()` is being executed in another process using `go`.

```go
func RenderGame(board [][]*Horse) {
  go func() {
    for {
      time.Sleep(milliDelay * time.Millisecond)
      renderRaceBoard(board)
    }
  }()
}

func renderRaceBoard(board [][]*Horse) {
  for line := range board {
    renderRaceLine(board, line)
  }
}

func renderRaceLine(board [][]*Horse, line int) {
  fmt.Printf(" %.2d | ", line)
  var current Horse
  for col := range board[line] {
    renderRacePosition(board, line, col, &current)
  }
  fmt.Printf("| %s", current.Name)
  if current.IsWinner {
    fmt.Print(" [Won!]")
  }
  fmt.Println()
}

func renderRacePosition(
  board [][]*Horse,
  line, col int,
  current *Horse,
) {
  if board[line][col] == nil {
    fmt.Printf(" ")
    return
  }

  current.Clone(board[line][col])
  if current.IsWinner {
    removeChars(current.Position + 1)
    for range board[line] {
      fmt.Printf("-")
    }
  }
  fmt.Print(current.Letter())
}
```

### Moving the horses

In `StartRace(...)`, the `winner` argument is a pointer to a Horse which will be assigned by the first Horse reaching the last position in their line.

Each Horse will run a loop until reaching the end of the line OR receiving (via the shared channel `won`) the message that another Horse already won the race. Until then, each horse will move independently by randomly sleeping milliseconds before moving to the next position in their line.

> `startHorseRunning()` runs in another process using `go`.

```go
func StartRace(
  board [][]*Horse,
  winner *Horse,
) {
  var wg sync.WaitGroup
  // use a channel with a flag to notify when a horse won
  won := make(chan bool)

  for line := range board {
    wg.Add(1)
    go startHorseRunning(&wg, board, line, won, winner)
  }

  wg.Wait() // wait until one horse reaches the end, 
  // which is controlled by the shared channel `won`
}

func startHorseRunning(
  wg *sync.WaitGroup,
  board [][]*Horse,
  line int,
  won chan bool,
  winner *Horse,
) {
  defer wg.Done()
  for {
    select {
    case <-won: // check if another horse finished in
      return    // such a case, then stop the for loop
    default:
      sleepRandomMilliseconds()
      moveHorseOnePosition(board, line, ch, winner)
      if winner.IsFound() {
        return
      }
    }
  }
}

func moveHorseOnePosition(
  board [][]*Horse,
  line int,
  won chan bool,
  winner *Horse,
) {
  cols := len(board[line])
  for col := cols - 1; col > 0; col-- {
    if board[line][col-1] == nil {
      continue
    }
    // here we identify that there is a horse in
    // the following position, so we move it to the
    // current pos, and we set nil in the other one
    board[line][col] = board[line][col-1]
    board[line][col].Position++
    board[line][col-1] = nil
    // try to declare a winner
    if board[line][col].Position+1 == cols {
      declareWinner(won, board[line][col], winner)
    }
    break
  }
}

var once sync.Once

func declareWinner(
  won chan bool,
  actual *Horse,
  winner *Horse,
) {
  // do just once to avoid multiple winners; which is highly
  // possible, as they are running in different processes
  once.Do(func() {
    actual.IsWinner = true
    winner.Clone(actual)

    // the winner will close the channel nofifying
    // all other goroutines, so they can stop their
    // loops and finalising the WaitGroup and the
    // main program can also stop.
    close(won)
  })
}
```

### Source code

The code showed is not all, so if you would like to check the working source code, you can check the one file version (1), or the more complete project version (2).

1. Code in a single file: [gist:Chemaclass/racing_horses.go](https://gist.github.com/Chemaclass/85b2bb49bc6736271cdde8f219dfc27e)
2. Improved version repository: [Chemaclass/go-horse-racing](https://github.com/Chemaclass/go-horse-racing)
    - using a string buffer for better displaying
    - split in different files by responsibility
    - adding unit tests
    - among other improvements
        - _further improvements (and refactorings) will be applied to this version_
