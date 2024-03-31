+++
title = "Racing horses in Golang"
description = "I built a terminal game that emulates horse racing. Each horse is a goroutine that works in a different process within a shared bidimensional matrix."
draft = true
[taxonomies]
tags = [ "software", "golang" ]
[extra]
subtitle = "Learning Golang"
static_thumbnail = "/images/blog/2024-04-08/cover.jpg"
+++

![cover](/images/blog/2024-04-08/cover.jpg)

I wanted to learn a new programming language, so after trying some, I ended up with Golang as one of my favorites, for its simplicity and capabilities. It has features that I haven’t used in years, like multithreading".

<!-- more -->

Go is not a multithreading language but concurrency. Although these terms may seem similar to a regular developer when working with them (as the APIs you will use are very similar), they are actually different concepts.

- **Multithreading** is about multiple threads that run in parallel and can share the same resources running in a single process. Java has threads.
- **Concurrency** is about running multiple processes simultaneously "practically (but not really)"—at least for the final user. These processes can share the same resources on runtime. Golang has goroutines.

For both, things happen in unspecified order, and you can multitask as if doing multiple tasks simultaneously.

---

I remember building a similar game in Java when I was learning multithreading ten years ago, and I thought it would be a great opportunity to do it again with the modern [Go language](https://go.dev/).

I built a terminal game that emulates horse racing. Each horse is a goroutine that works in a different process within a shared bidimensional matrix.

I separated the code into four areas to help visualize it:
- Entry point
- Generating the board
- Rendering the game
- Moving the horses


![cover](/images/blog/2024-04-08/race-horses-demo.gif)

### Entry point


```go
type Horse struct {
  Name   string // The name of the horse
  Position int  // The position in its line
  Line   int  // The line number where it's compiting
  IsWinner bool   // A flag to know if it's the winner
}

func main() {
  race := generateRaceBoard()
  // render the race board using a goroutine
  go renderRaceBoard(race)

  var wg sync.WaitGroup
  // use a channel with a flag to notify when a horse won
  ch := make(chan bool)
  winner := Horse{}

  for i := range race {
     wg.Add(1)
     // each horse will be moved in different processes
     go moveHorse(&wg, race, i, ch, &winner)
  }

  wg.Wait()
  renderRace(race)
  
  fmt.Println("Race finished!")
  fmt.Printf("# Winner: %s (line: %d)\n",
      winner.Name, winner.Line)
}
```

### Generating the board

The race board is a bidimensional matrix of pointers to Horses. Each line will contain only one Horse and the rest will be pointers to `nil`.

```go
func generateRaceBoard() [][]*Horse {
  race := make([][]*Horse, rows)
  for i := range race {
    race[i] = make([]*Horse, cols)
    race[i][0] = &Horse{
      Name:   generateName(),
      Position: 0,
      Line:   i,
      IsWinner: false,
    }
  }
  return race
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

Enable rendering the board independently of the racing in another process. This is done using `go renderRaceBoard(race)`.

```go
func renderRaceBoard(race [][]*Horse) {
  for {
    time.Sleep(milliDelay * time.Millisecond)
    renderRace(race)
  }
}
```

Then `printRace()`, `printRaceLine()` and `printRaceLinePosition()` are separated to help focusing on each method responsibility identify what is the subject under "printing".

```go
func renderRace(race [][]*Horse) {
  // make sure we have a fresh drawing every time
  clearScreen()

  for i := range race {
    renderRaceLine(race, i)
  }
}

func clearScreen() {
  cmd := exec.Command("clear")
  cmd.Stdout = os.Stdout
  cmd.Run()
}

func renderRaceLine(race [][]*Horse, i int) {
  fmt.Printf("%.2d | ", i)
  var horse Horse
  for j := range race[i] {
    renderRaceLinePosition(race, i, j, &horse)
  }
  fmt.Printf("| %s", horse.Name)
  if horse.IsWinner {
    fmt.Print(" [Won!]")
  }
  fmt.Println()
}

func renderRaceLinePosition(
  race [][]*Horse, 
  i, j int, 
  horse *Horse,
) {
  if race[i][j] == nil {
    fmt.Printf(" ")
    return
  }
  currentHorse := race[i][j]
  if currentHorse.IsWinner {
    removeChars(currentHorse.Position + 1)
    for range race[i] {
      fmt.Printf("-")
    }
  }
  fmt.Print(currentHorse.Letter())
  horse.Clone(currentHorse)
}

func removeChars(n int) {
  fmt.Printf("\033[%dD", n)
  fmt.Printf("\033[K")
}
```

### Moving the horses

```go
func moveHorse(
  wg *sync.WaitGroup,
  race [][]*Horse,
  line int,
  ch chan bool,
  winner *Horse,
) {
  defer wg.Done()
  for {
    select {
    case <-ch: // check if another horse finished
      return   // in such a case, then stop the for loop
    default:
      // otherwise, sleep some random milliseconds
      time.Sleep(
        time.Millisecond * time.Duration(
          rand.Intn(milliDelay)))
      // and move the horse one column forward
      for j := cols - 1; j > 0; j-- {
        if race[line][j-1] != nil {
          // here we identify that there is a horse in the 
          // following position, so we move it to the current 
          // position, and we set nil in the other one
          race[line][j],race[line][j-1] = race[line][j-1],nil
          race[line][j].Position++

          if race[line][j].Position+1 == finalPosition {
            // try to declare a winner
            declareWinnerHorse(ch, race[line][j], winner)
            return
          }
          break
        }
      }
    }
  }
}

func declareWinnerHorse(
  ch chan bool,
  actual *Horse,
  winner *Horse
) {
  // do just once to avoid multiple winners; which is highly
  // possible, as they are running in different processes
  once.Do(func() {
    actual.IsWinner = true
    winner.Clone(actual)

    // the winner will close the channel nofifying
    // all other goroutines, so they can stop their
    // loops and finalising the WaitGroup, so the
    // main program can also stop. See `racingHorses()`
    close(ch)
  })
}
```

---

Full code in my public Gist: [gist/85b2bb49bc6736271cdde8f219dfc27e](https://gist.github.com/Chemaclass/85b2bb49bc6736271cdde8f219dfc27e)

