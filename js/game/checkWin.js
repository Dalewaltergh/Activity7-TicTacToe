import { getMainBoard } from './gameBoard.js'
import { isAgaintAi } from './startMenu/chooseType.js'
import { showStateButtons } from './moveHistory/stateButtons.js'

const winCombos = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  
  // Diagonal
  [0, 4, 8],
  [6, 4, 2]
]

export function checkWin(player) {  
  const inputs = getPlaysFromBoard(player)
  if(!isAgaintAi()) console.log(`${player} Player: [${inputs}]`)

  let gameWon = false
  for (let combo of winCombos) 
    if (combo.every(num => inputs.indexOf(num) > -1)) {
      gameWon = true
      break
    }

  return gameWon
}

function getPlaysFromBoard(player) {
  const boardInputs = [].concat(...getMainBoard())
  
  const inputsToIndex = boardInputs
    .reduce((init, element, index) =>
      (element === player) ? 
        init.concat(index) : init, 
      []
    )

  return inputsToIndex
} 