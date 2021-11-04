// Reference to game controllers and elements to be updated
const exit = document.querySelector('.exit > button');
const currentRoundLabel = document.querySelector('.current-round');
const play = document.querySelector('.play > button');
const computerWinsLabel = document.querySelector('.left .tracker');
const drawsLabel = document.querySelector('.mid .tracker');
const huamnWinsLabel = document.querySelector('.right .tracker');
const computerSelection = document.querySelector('.left .selection i');
const humanSelection = document.querySelector('.right .selection i');
const history = document.querySelector('.mid .list');
const rockSelectionButton = document.querySelector('.selectors :nth-child(1)');
const paperSelectionButton = document.querySelector('.selectors :nth-child(2)');
const scissorsSelectionButton = document.querySelector('.selectors :nth-child(3)');
const timerLabel = document.querySelector('.timer .countdown');
// const notify = document.querySelector('.notification');
const container = document.querySelector('.container');

let computerChoice = null;
let playerChoice = null;
let currentRound = 1;
let winner = null;
let humanWins = 0;
let computerWins = 0;
let draws = 0;
let timeRemaining = 10;
let timer = null;

// Game controller (button) functions

// Helper functions
const showNotification = (message) => {
  // notify.classList.add('notify');
  let el = document.createElement('div');
  // let childEl = document.createElement('div');
  el.textContent = message;
  el.classList.add('notify');
  // el.append(childEl);
  container.append(el);
}

const removeNotification = () => {
  // notify.classList.remove('notify');
  document.querySelector('.notify').remove();
}

const displayNotification = (message) => {
  showNotification(message);
  setTimeout(() => {
    removeNotification();
  }, 2000);
}

const startTimer = () => {
  timer = setInterval(() => {
  timeRemaining--;
  timerLabel.textContent = timeRemaining;
  if (timeRemaining < 0) {
    resetGame();
    displayNotification('GAME OVER! TIMER EXPIRED');
  }
  }, 1000)
}

const resetTimer = () => {
  clearInterval(timer);
  timeRemaining = 10;
  timerLabel.textContent = timeRemaining;
}

const activate = el => {
  el.disabled = false;
  el.style.opacity = 1;
}
const deactivate = el => {
  el.style.opacity = 0.5;
  el.disabled = true;
}

const animateRound = () => {
  computerSelection.classList.add('animate-left-hand');
  humanSelection.classList.add('animate-right-hand');
}

const removeAnimation = () => {
  computerSelection.classList.remove('animate-left-hand');
  humanSelection.classList.remove('animate-right-hand');
}

// func to get computer's choice
const computerPlay = () => {
  const options = ['rock', 'paper', 'scissors']
  let index = Math.floor(Math.random() * 3)
  return `${options[index]} far fa-hand-${options[index]} hand-left`
}

const displaySelections = () => {
  computerSelection.className = '';
  computerSelection.className = computerChoice;
  humanSelection.className = '';
  humanSelection.className = playerChoice;
}

const resetSelctions = () => {
  computerSelection.className = 'rock far fa-hand-rock hand-left';
  humanSelection.className = 'rock far fa-hand-rock hand-right';
}

const resetGame = () => {
  resetTimer();
  deactivate(exit);
  activate(play);
  deactivate(rockSelectionButton);
  deactivate(paperSelectionButton);
  deactivate(scissorsSelectionButton);
  resetSelctions();
  computerWinsLabel.textContent = 0;
  huamnWinsLabel.textContent = 0;
  drawsLabel.textContent = 0;
  timerLabel.textContent = 10;
  history.textContent = '';
  currentRoundLabel.textContent = 1;

  computerChoice = null;
  playerChoice = null;
  currentRound = 1;
  winner = null;
  humanWins = 0;
  computerWins = 0;
  draws = 0;
}

const startRound = el => {
  resetTimer();
  console.log(el);
  resetSelctions();
  animateRound();
  playerChoice = playerClassList(el);
  computerChoice = computerPlay();
}

const determineWinner = (computerSelection, humanSelection) => {
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

const updateTracker  = () => {
    switch (winner) {
      case 0:
        draws++;
        break
      case 1:
        computerWins++;
        break
      case 2:
        humanWins++;
        break
      default:
        return
    }
    currentRound++
  }

  const updateTrackerLabels = () => {
    computerWinsLabel.textContent = computerWins;
    huamnWinsLabel.textContent = humanWins;
    drawsLabel.textContent = draws;
    currentRoundLabel.textContent = currentRound;
  }

  const updateHistory = () => {
    history.innerHTML += `
           <div class="item">
              <div class="computer-pick ${winner === 1 ? 'win' : ''}">
                <i class='${computerChoice}'></i>
              </div>
              <div class="round-num">
                <span>${currentRound - 1}</span>
              </div>
              <div class="human-pick ${winner === 2 ? 'win' : ''}">
                <i class='${playerChoice}'></i>
              </div>
            </div>
          `
  }

// Function to end and reset game to default state
const exitGame = () => {
  resetGame();
  notifacation('You ended the game');
}

// Function to make game ready to play
const playGame = () => {
  console.log('play func called')
}

// Get player selection
const playerClassList = (el) => {
  return el.className + ' hand-right';
}

// Event listeners
exit.addEventListener('click', () => {
  resetGame();
})

play.addEventListener('click', () => {
  activate(exit)
  deactivate(play)
  activate(rockSelectionButton);
  activate(paperSelectionButton);
  activate(scissorsSelectionButton);
  startTimer();
})

rockSelectionButton.addEventListener('click', e => {
  startRound(e.target)
})

paperSelectionButton.addEventListener('click', e => {
  startRound(e.target)
})

scissorsSelectionButton.addEventListener('click', e => {
  startRound(e.target)
})

humanSelection.addEventListener('animationend', e => {
  removeAnimation();
  displaySelections();
  winner = determineWinner(computerChoice.split(' ')[0], playerChoice.split(' ')[0]);
  console.log('winner', winner)
  updateTracker();
  updateTrackerLabels();
  updateHistory();
  startTimer();

  if(humanWins === 5) {
    // document.querySelector('.notify').textContent = 'YOU WON! CONGRATULATIONS!!';
    displayNotification('YOU WON! CONGRATULATIONS!!');
    resetGame();
  }
  if(computerWins === 5) {
    // notify.textContent = 'COMPUTER WON! BETTER LUCK NEXT TIME!!';
    displayNotification('COMPUTER WON! BETTER LUCK NEXT TIME!!');
    resetGame();
  }
})

document.addEventListener('DOMContentLoaded', () => {
  console.log('Dom content loaded')
  resetGame();
})
