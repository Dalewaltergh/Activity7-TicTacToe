import { minimax } from './minimax.js'
import { playSound } from '../sound.js'
import { rows } from '../domElements.js'
import { turnClick } from '../player.js'
import { getMainBoard } from '../game.js'
import { writeCell } from '../writeCell.js'
import { checkBoard } from '../checkBoard.js'
import { getAiPlayer } from '../menu/choosePlayer.js'

export function aiMove() {
  const {row, cell} = getBestMove()
  
  playSound()
  writeCell(getAiPlayer(), row, cell)
  checkBoard(getAiPlayer()) 
}

function getBestMove() {
  let move
  let bestScore = -Infinity
  const board = getMainBoard()
  
  for (let row = 0; row < 3; row++) {
    for (let cell = 0; cell < 3; cell++) {
      if (board[row][cell] === '') {
        board[row][cell] = getAiPlayer()
        const score = minimax(board, 0, false)
        board[row][cell] = ''
  
        if (score > bestScore) {
          bestScore = score
          move = { row, cell }
        }
      }
    }
  }
  
  rows[move.row].children[move.cell].removeEventListener('click', turnClick)
  return move
}