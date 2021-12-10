import { rows } from './domElements.js'
import { getMainBoard } from './game.js'
import { saveMoveState } from './moveHistory/moveStates.js'

export function writeCell(player, rowId, cellId) {
  const board = getMainBoard()
  board[rowId][cellId] = player
  rows[rowId].children[cellId].textContent = player
  saveMoveState(board)
}