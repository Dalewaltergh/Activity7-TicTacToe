import { playSound } from './sound.js'
import { turnClick } from './player.js'
import { checkWin } from './checkWin.js'
import { isBoardFull } from './gameBoard.js'
import { getAiPlayer } from './startMenu/choosePlayer.js'
import { showStateButtons } from './moveHistory/stateButtons.js'
import { boxes, winnerText, turnText } from '../domVariables.js'

let gameOver

export function gameCheck(player) {
  gameOver = checkWin(player)
  const gameTie = isBoardFull()

  if (gameOver || gameTie) {
    turnText.style.display = 'none'
    winnerText.style.display = ''

    winnerText.textContent = 
      gameOver ? 
      `Player ${player} Wins` : 
      `It's a Tie!`

    boxes.forEach(box => box.removeEventListener('click', turnClick))
    showStateButtons()
  } 

  if (gameOver) playSound('gameOver')
}

export const isGameOver = () => gameOver