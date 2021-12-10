import { playSound } from './sound.js'
import { aiMove } from './ai/aiMove.js'
import { writeCell } from './writeCell.js'
import { turnText } from './domElements.js'
import { checkBoard } from './checkBoard.js'
import { isAgaintAi } from './menu/chooseType.js'
import { getEmptyCells } from './emptySquares.js'
import { getAiPlayer, getPlayer } from './menu/choosePlayer.js'

let player
export const initPlayer = () => player = getPlayer()

export function turnClick(e) {
  const rowId = e.target.parentNode.id
  const cellId = e.target.id

  writeCell(player, rowId, cellId)  
  checkBoard(player)
  nextTurn()
  playSound() 
}

function nextTurn() {
  if (getEmptyCells().length && isAgaintAi())  {
    showTurnActive(true, getAiPlayer())  
    setTimeout(() => {
      aiMove()
      showTurnActive(true, player)
    }, 500)
  }
  else {
    player = getNextPlayer()
    showTurnActive(true, player)
  } 
}

export const getNextPlayer = () => 
  (player === 'X') ? 'O' : 'X'

export function showTurnActive(isActive, playerTurn) {
  if (isActive)
    turnText.textContent = `Player ${playerTurn}'s Turn`
  else 
    turnText.style.display = 'none'
}