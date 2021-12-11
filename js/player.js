import { aiMove } from './ai/aiMove.js'
import { markBox } from './gameBoard.js'
import { gameCheck } from './gameCheck.js'
import { turnText } from './domVariables.js'
import { gameDraw, gameWon } from './gameResult.js'
import { isAgaintAi } from './startMenu/chooseType.js'
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

function nextTurn() {
  if (gameDraw() || gameWon(player)) return
  
  if (isAgaintAi()) {
    showTurnActive(true, getAiPlayer())
    setTimeout(aiMove, 500)
  }
  else {
    player = (player === 'X') ? 'O' : 'X'
    showTurnActive(true)
  } 
}

export function showTurnActive(isActive, playerTurn = player) {
  if (isActive)
    turnText.textContent = `Player ${playerTurn}'s Turn`
  else 
    turnText.style.display = 'none'
}