import { saveMoveState } from './moveHistory/moveStates.js'
import { rows } from './utils/domElements.js'

export function writeCell(board, player, rowId, cellId) {
  board[rowId][cellId] = player
  rows[rowId].children[cellId].textContent = player
  saveMoveState(board)
}