// func to get computer's choice
const computerPlay = () => {
  const options = ['rock', 'paper', 'scissors']
  let index = Math.floor(Math.random() * 3)
  return options[index]
}

// func to get human choice
const humanPlay = (currentRound) => {
  let userChoice = null
  let goodChoice = null
  do {
    userChoice = prompt(`Round ${currentRound}: type R for rock, P for paper, S for scissors`).toLowerCase()
    if (userChoice === 'r' || userChoice === 'p' || userChoice === 's') {
      goodChoice = true
    } else {
      goodChoice = false
    }
  } while (!goodChoice)
  switch(userChoice) {
    case 'r':
      return 'rock'
    case 'p':
      return 'paper'
    case 's':
      return 'scissors'
    default:
      return null
  }
}

// func to play a single round of the game
const playRound = (computerSelection, humanSelection) => {
  if (computerSelection === humanSelection) {
    return 0
  } else if (computerSelection === 'rock' && humanSelection === 'scissors') {
    return 1
  } else if (computerSelection === 'rock' && humanSelection === 'paper') {
    return 2
  } else if (computerSelection === 'scissors' && humanSelection === 'rock') {
    return 2
  } else if (computerSelection === 'scissors' && humanSelection === 'paper') {
    return 1
  } else if (computerSelection === 'paper' && humanSelection === 'rock') {
    return 1
  }
  else if (computerSelection === 'paper' && humanSelection === 'scissors') {
    return 2
  }
}

// func to play entire game
const game  = () => {
  const NUM_OF_ROUNDS = 5
  let currentRound = 1
  let humanWins = 0
  let computerWins = 0
  let computerSelection = null
  let humanSelection = null
  let winner = null
  do {
    computerSelection = computerPlay()
    humanSelection = humanPlay(currentRound)
    winner = playRound(computerSelection, humanSelection)
    switch (winner) {
      case 0:
        humanWins++
        computerWins++
        alert(`Round ${currentRound}: It's a draw`)
        break
      case 1:
        computerWins++
        alert(`Round ${currentRound}: Computer wins`)
        break
      case 2:
        humanWins++
        alert(`Round ${currentRound}: You win`)
        break
      default:
        return
    }
    currentRound++
  } while (currentRound <= NUM_OF_ROUNDS)
  // determine game winner
  console.log('GAME OVER!!')
  if (humanWins === computerWins) {
    console.log('The game is a draw')
  } else if (humanWins > computerWins) {
    console.log('You won! Congratulations!')
  } else {
    console.log('Computer wins!')
  }
}

// game play
//game()
