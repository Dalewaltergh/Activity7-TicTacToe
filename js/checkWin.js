import { getMainBoard } from './game.js'
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
  const plays = getPlaysFromBoard(player)
  let gameWon = false
  for (let [index, combo] of winCombos.entries()) 
    if (combo.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = true
      break
    }
  return gameWon
}

function getPlaysFromBoard(player) {
  const board = getMainBoard()
  const boardFlat = [].concat(...board)
  const plays = boardFlat
    .reduce((a, e, i) =>
      (e === player) ? a.concat(i) : a, 
      []
    )

  return plays
} 

