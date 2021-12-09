import { turnClick } from './game.js'
import { checkWinner } from './checkWinner.js'
import { emptySquares } from './emptySquares.js'
import { showStateButtons } from './moveHistory/stateButtons.js'
import { cells, showWinner, turnDisplay } from './domElements.js'

export function checkBoard(board, player) {
  let gameWon = checkWinner(board, player)
  if (gameWon) {
    turnDisplay.style.display = 'none'
    showWinner.style.display = ''
    showWinner.textContent = `Player ${player} Wins`
    cells.forEach(cell => cell.removeEventListener('click', turnClick))
    showStateButtons()
  }
  else if (!emptySquares(board).length) {
    turnDisplay.style.display = 'none'
    showWinner.style.display = ''
    showWinner.textContent = `It's a Tie!`
    showStateButtons()
  }
}

