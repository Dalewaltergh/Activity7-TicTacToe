import { turnClick } from './player.js'
import { checkWin } from './checkWin.js'
import { getEmptyCells } from './emptySquares.js'
import { getAiPlayer } from './menu/choosePlayer.js'
import { cells, winnerText, turnText } from './domElements.js'
import { showStateButtons } from './moveHistory/stateButtons.js'

export function checkBoard(player) {
  const playerWon = checkWin(player)
  const gameTie = !getEmptyCells().length

  if (playerWon || gameTie) {
    turnText.style.display = 'none'
    winnerText.style.display = ''

    winnerText.textContent = 
      playerWon ? 
      `Player ${player} Wins` : 
      `It's a Tie!`

    cells.forEach(cell => cell.removeEventListener('click', turnClick))
    showStateButtons()
  } 
}