+++
title = "Learning concurrency in Golang"
description = "I wanted to learn a new programming language, so after trying some, I ended up with Golang as one of my favorites, for its simplicity and capabilities. It has features that I haven’t used in years, like multithreading."
draft = true
[taxonomies]
tags = [ "software", "golang" ]
[extra]
subtitle = "Horse racing emulator explained step by step"
static_thumbnail = "/images/blog/2024-04-02/cover.jpg"
+++

![cover](/images/blog/2024-04-02/cover.jpg)

I wanted to learn a new programming language, so after trying some, I ended up with Golang as one of my favorites, for its simplicity and capabilities. It has features that I haven’t used in years, like multithreading".

<!-- more -->

Go is not a multithreading language but concurrency. Although these terms may seem similar to a regular developer when working with them (as the APIs you will use are very similar), they are actually different concepts.

- **Multithreading** is about multiple threads that run in parallel and can share the same resources running in a single process. Java has threads.
- **Concurrency** is about running multiple processes simultaneously "practically (but not really)"—at least for the final user. These processes can share the same resources on runtime. Golang has goroutines.

For both, things happen in unspecified order, and you can multitask as if doing multiple tasks simultaneously.

![cover](/images/blog/2024-04-02/multithreading-vs-concurrency-processing.jpg)

---

I remember building a similar game in Java when I was learning multithreading ten years ago, and I thought it would be a great opportunity to do it again with the modern [Go language](https://go.dev/).

I built a terminal game emulator that mimics one horse racing. Each horse is a goroutine that runs in a shared bidimensional matrix. Once a horse reaches the end, it is notified to a shared channel between all other horses -running in different processes- and they all stop, showing in the terminal the winner of the race.

I separated the code into four areas to help visualize it:
- Entry point
- Generating the board
- Rendering the game
- Moving the horses


![cover](/images/blog/2024-04-02/race-horses-demo.gif)

### Entry point

You can spawn a new process using the keyword `go` when invoking any function.
In this game, this is used 1) to render the board and 2) for each horse's movement.

> Goal: keep the rendering and logic working concurrently.

```go
type Horse struct {
  Name   string // The name of the horse
  Position int  // The position in its line
  Line   int    // The line number where it's compiting
  IsWinner bool // A flag to know if it's the winner
}

func main() {
  board := generateRaceBoard()

  // render the game in another process
  go func() {
    for {
      time.Sleep(milliDelay * time.Millisecond)
      renderRaceBoard(board)
    }
  }()

  var wg sync.WaitGroup
  // use a channel with a flag to notify when a horse won
  ch := make(chan bool)
  winner := Horse{}

  for line := range board {
    wg.Add(1)
    // each horse will be moved in different processes
    go moveHorse(&wg, board, line, ch, &winner)
  }

  wg.Wait() // wait until one horse reaches the end
  // at this point, the winner horse should be defined

  fmt.Println("Race finished!")
  fmt.Printf("# Winner: %s\n", winner)
}
```

### Generating the board

The race board is a bidimensional matrix of pointers to Horses. Each line will contain only one Horse and the rest will be pointers to `nil`.

```go
func generateRaceBoard() [][]*Horse {
  board := make([][]*Horse, rows)
  for line := range board {
    board[line] = make([]*Horse, cols)
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

The names are randomly generated using `horseNames`.

```go
var horseNames = [20][2]string{
  {"Alloping", "Giggles"},
  {"A-lot", "Gallop"},
  {"BoJack", "Jack"},
  {"Baroness", "Belle"},
  // ...
}

func generateName() string {
  name := horseNames[rand.Intn(len(horseNames))][0]
  surname := horseNames[rand.Intn(len(horseNames))][1]

  return name + " " + surname
}
```

### Rendering the game

Then `renderRaceBoard()`, `renderRaceLine()` and `renderRaceLinePosition()` are separated to help focusing on each method responsibility identify what is the subject under "render".

```go
func renderRaceBoard(board [][]*Horse) {
  clearScreen()
  for line := range board {
    renderRaceLine(board, line)
  }
}

func clearScreen() {
  cmd := exec.Command("clear")
  cmd.Stdout = os.Stdout
  cmd.Run()
}

func renderRaceLine(board [][]*Horse, line int) {
  fmt.Printf("%.2d | ", line)
  var horse Horse
  for col := range board[line] {
    renderRacePosition(board, line, col, &horse)
  }
  fmt.Printf("| %s", horse.Name)
  if horse.IsWinner {
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
  horse := board[line][col]
  if horse.IsWinner {
    removeChars(horse.Position + 1)
    for range board[line] {
      fmt.Printf("-")
    }
  }
  fmt.Print(horse.Letter())
  current.Clone(horse)
}

func removeChars(n int) {
  fmt.Printf("\033[%dD", n)
  fmt.Printf("\033[K")
}
```

### Moving the horses

Each horse will run a loop until reaching the end of the line OR receiving (via the shared channel) the message that another horse already won the race. Until then, each horse will move independently by randomly sleeping milliseconds before moving to the next position in their line.

```go
func moveHorse(
  wg *sync.WaitGroup,
  board [][]*Horse,
  line int,
  ch chan bool,
  winner *Horse,
) {
  defer wg.Done()
  for {
    select {
    case <-ch: // check if another horse finished
      return // in such a case, then stop the for loop
    default:
      // otherwise, sleep some random milliseconds
      randomDuration := time.Duration(rand.Intn(milliDelay))
      time.Sleep(time.Millisecond * randomDuration)
      // and move the horse one column forward
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
        if board[line][col].Position+1 == finalPosition {
          declareWinner(ch, board[line][col], winner)
          return
        }
        break
      }
    }
  }
}

func declareWinner(
  ch chan bool,
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
    // main program can also stop. See `racingHorses()`
    close(ch)
  })
}
```

> Full code: [gist:Chemaclass/85b2bb49bc6736271cdde8f219dfc27e](https://gist.github.com/Chemaclass/85b2bb49bc6736271cdde8f219dfc27e)
