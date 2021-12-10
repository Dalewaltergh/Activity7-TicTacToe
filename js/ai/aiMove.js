import { minimax } from './minimax.js'
import { playSound } from '../sound.js'
import { rows } from '../domElements.js'
import { checkBoard } from '../gameOver.js'
import { writeCell } from '../writeCell.js'
import { showTurn } from '../playerTurn.js'
import { turnClick } from '../playerTurn.js'
import { getAiPlayer, getPlayer } from '../menu/choosePlayer.js'

export function aiMove(board) {
  let bestScore = -Infinity
  let move
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows.length; j++) {
      if (board[i][j] === '') {
        board[i][j] = getAiPlayer()
        const score = minimax(board, 0, false)
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
  checkBoard(board, getAiPlayer())
  showTurn(false, getPlayer())
  playSound()
}