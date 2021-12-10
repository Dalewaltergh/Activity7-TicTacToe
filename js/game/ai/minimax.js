import { checkWin } from '../checkWin.js'
import { getMainBoard, isBoardFull } from '../gameBoard.js'
import { getPlayer, getAiPlayer } from '../startMenu/choosePlayer.js'

export function minimax(depth, isMaximizing) {
  const board = getMainBoard()

  if (checkWin(getPlayer())) return -10
  else if (checkWin(getAiPlayer())) return 10
  else if (isBoardFull()) return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = getAiPlayer()
          let score = minimax(board, depth + 1, false)
          board[i][j] = ''
          bestScore = Math.max(score, bestScore)
        }
      }
    }
    return bestScore
  } 
  else {
    let bestScore = Infinity
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = getPlayer()
          let score = minimax(board, depth + 1, true)
          board[i][j] = ''
          bestScore = Math.min(score, bestScore)
        }
      }
    }
    return bestScore
  }
}

