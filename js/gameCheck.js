import { playSound } from './sound.js'
import { turnClick } from './player.js'
import { gameDraw, gameWon } from './gameResult.js'
import { getAiPlayer } from './startMenu/choosePlayer.js'
import { boxes, winnerText, turnText } from './domVariables.js'
import { showStateButtons } from './moveHistory/stateButtons.js'

export function gameCheck(player) {
  if (gameWon(player) || gameDraw()) {
    showStateButtons()
    playSound('gameOver')
    displayResult(player)
    boxes.forEach(box => box.removeEventListener('click', turnClick))
  }
}

function displayResult(player) {
  turnText.style.display = 'none'
  winnerText.style.display = ''

  winnerText.textContent = 
    gameWon(player) ? 
    `Player ${player} Wins` : 
    `It's a Tie!`
}

