import { playSound } from './sound.js'
import { aiMove } from './ai/aiMove.js'
import { turnText } from '../domVariables.js'
import { isAgaintAi } from './startMenu/chooseType.js'
import { gameCheck, isGameOver } from './gameCheck.js'
import { isBoardFull, writeBox } from './gameBoard.js'
import { getAiPlayer, getPlayer } from './startMenu/choosePlayer.js'

let player
export const initPlayer = () => player = getPlayer()

export function turnClick(e) {
  const rowId = e.target.parentNode.id
  const boxId = e.target.id

  writeBox(player, rowId, boxId)  
  gameCheck(player)
  nextTurn()
  playSound() 
}

function nextTurn() {
  if (isBoardFull() && isGameOver()) return

  if (isAgaintAi()) {
    showTurnActive(true, getAiPlayer())  
    setTimeout(aiMove, 500)
    showTurnActive(true, player)
  }
  else {
    player = (player === 'X') ? 'O' : 'X'
    showTurnActive(true, player)
  } 
}

export function showTurnActive(isActive, playerTurn) {
  if (isActive)
    turnText.textContent = `Player ${playerTurn}'s Turn`
  else 
    turnText.style.display = 'none'
}