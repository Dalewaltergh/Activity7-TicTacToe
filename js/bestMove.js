import { rows } from './domElements.js'
import { getAiPlayer } from './players.js'
import { minimax } from './minimax.js'
import { writeCell } from './playerWrite.js'
import { checkGameOver } from './game.js'
import { turnClick } from './game.js'

export function bestMove(board) {
  let bestScore = -Infinity
  let move
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows.length; j++) {
      if (board[i][j] === '') {
        board[i][j] = getAiPlayer()
        let score = minimax(board, 0, false)
        board[i][j] = ''
        if (score > bestScore) {
          bestScore = score
          move = { i, j }
        }
      }
    }
  }
  writeCell(board, getAiPlayer(), move.i, move.j)
  rows[move.i].children[move.j].removeEventListener('click', turnClick)
  checkGameOver(getAiPlayer())
}