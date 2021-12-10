import { rows } from './domElements.js'
import { saveMoveState } from './moveHistory/moveStates.js'

export function writeCell(board, player, rowId, cellId) {
  board[rowId][cellId] = player
  rows[rowId].children[cellId].textContent = player
  saveMoveState(board)
}