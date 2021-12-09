import { checkWinner } from './checkWinner.js'
import { emptySquares } from './emptySquares.js'
import { showStateButtons } from './moveHistory/stateButtons.js'
import { cells } from './utils/domElements.js'
import { turnClick } from './game.js'

export function checkBoard(board, player) {
  let gameWon = checkWinner(board, player)
  if (gameWon) {
    console.log(`Player ${player} Wins`)
    cells.forEach(cell => cell.removeEventListener('click', turnClick))
    showStateButtons()
  }
  else if (!emptySquares(board).length) {
    console.log('Draw')
    showStateButtons()
  }
}

