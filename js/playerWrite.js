import { saveMoveState } from './game.js'
import { rows } from './domElements.js'

export function writeCell(board, player, rowId, cellId) {
  board[rowId][cellId] = player
  rows[rowId].children[cellId].textContent = player
  saveMoveState()
}