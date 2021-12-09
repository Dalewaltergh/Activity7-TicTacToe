import { checkWinner } from '../checkWinner.js'
import { emptySquares } from '../emptySquares.js'
import { getPlayer, getAiPlayer } from '../menu/choosePlayer.js'

export function minimax(board, depth, isMaximizing) {
  if (checkWinner(board, getPlayer())) return -10
  else if (checkWinner(board, getAiPlayer())) return 10
  else if (!emptySquares(board).length) return 0

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
  } else {
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