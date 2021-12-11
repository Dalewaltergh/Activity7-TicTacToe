import { aiMove } from './ai/aiMove.js'
import { markBox } from './gameBoard.js'
import { gameCheck } from './gameOver.js'
import { turnText } from './domVariables.js'
import { gameDraw, isGameWon } from './gameResult.js'
import { isAgaintAi } from './startMenu/chooseMode.js'
import { getAiPlayer, getPlayer } from './startMenu/choosePlayer.js'

let player

export const initPlayer = () => player = getPlayer()

export function turnClick(e) {
  const rowId = e.target.parentNode.id
  const boxId = e.target.id

  markBox(player, rowId, boxId)  
  gameCheck(player)
  nextTurn()
}

export function showTurnActive(isActive, playerTurn = player) {
  if (isActive)
    turnText.textContent = `Player ${playerTurn}'s Turn`
  else 
    turnText.style.display = 'none'
}

function nextTurn() {
  if (gameDraw() || isGameWon(player)) return
  
  if (isAgaintAi()) {
    showTurnActive(true, getAiPlayer())
    setTimeout(aiMove, 500)
  }
  else {
    player = (player === 'X') ? 'O' : 'X'
    showTurnActive(true)
  } 
}