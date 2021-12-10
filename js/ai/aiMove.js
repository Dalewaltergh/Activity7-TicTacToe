import { minimax } from './minimax.js'
import { playSound } from '../sound.js'
import { showTurnActive, turnClick } from '../player.js'
import { rows } from '../domVariables.js'
import { gameCheck } from '../gameCheck.js'
import { getMainBoard, writeBox } from '../gameBoard.js'
import { getAiPlayer } from '../startMenu/choosePlayer.js'

export function aiMove() {
  const {row, box} = getBestMove()
  
  playSound()
  writeBox(getAiPlayer(), row, box)
  gameCheck(getAiPlayer()) 
  showTurnActive(true)
}

function getBestMove() {
  let move
  let bestScore = -Infinity
  const board = getMainBoard()
  
  for (let row = 0; row < 3; row++) {
    for (let box = 0; box < 3; box++) {
      if (board[row][box] === '') {
        board[row][box] = getAiPlayer()
        const score = minimax(board, 0, false)
        board[row][box] = ''
  
        if (score > bestScore) {
          bestScore = score
          move = { row, box }
        }
      }
    }
  }

  console.log('AI move', move)
  rows[move.row].children[move.box].removeEventListener('click', turnClick)
  return move
}