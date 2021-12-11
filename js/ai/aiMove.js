import { minimax } from './minimax.js'
import { rows } from '../domVariables.js'
import { gameCheck } from '../gameOver.js'
import { getMainBoard, markBox } from '../gameBoard.js'
import { showTurnActive, turnClick } from '../player.js'
import { getAiPlayer } from '../startMenu/choosePlayer.js'

export function aiMove() {
  const {row, box} = initialMove()
  
  markBox(getAiPlayer(), row, box)
  gameCheck(getAiPlayer()) 
  showTurnActive(true)
}

function initialMove() {
  let move
  let bestScore = -Infinity
  const board = getMainBoard()
  
  for (let row = 0; row < 3; row++) {
    for (let box = 0; box < 3; box++) {
      if (board[row][box] === '') {
        board[row][box] = getAiPlayer()
        const score = minimax(-Infinity, Infinity, false)
        board[row][box] = ''

        if (score > bestScore) {
          bestScore = score
          move = {row, box}
        }
      }
    }
  }

  console.log('AI move', move)
  rows[move.row].children[move.box].removeEventListener('click', turnClick)
  return move
}