import { playSound } from './sound.js'
import { aiMove } from './ai/aiMove.js'
import { resetBoard } from './resets.js'
import { checkBoard } from './gameOver.js'
import { writeCell } from './writeCell.js'
import { turnDisplay } from './domElements.js'
import { emptySquares } from './emptySquares.js'
import { isAgaintAi } from './menu/chooseType.js'
import { resetMoveState } from './moveHistory/moveStates.js'
import { getAiPlayer, getPlayer } from './menu/choosePlayer.js'

let player
let mainBoard

export function resetGame() {
  resetMoveState()
  player = getPlayer()
  mainBoard = resetBoard()
}

export function turnClick(e) {
  const rowId = e.target.parentNode.id
  const cellId = e.target.id

  writeCell(mainBoard, player, rowId, cellId)  
  checkBoard(mainBoard, player)
  nextTurn(mainBoard)
  playSound()
}

function nextTurn(board) {
  if (emptySquares(board).length && isAgaintAi())  {
    showTurn(false, getAiPlayer()) 
    setTimeout(() => aiMove(board), 500)
  }
  else {
    player = getNextPlayer()
    showTurn(false, player)
  } 
}

export function showTurn(isGameOver) {
  turnDisplay.textContent = !isGameOver ? 
  `Player ${player}'s Turn` : '' 
}

export const getNextPlayer = () => 
  (player === 'X') ? 'O' : 'X'
