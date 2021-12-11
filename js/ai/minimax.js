import { getMainBoard } from '../gameBoard.js'
import { gameDraw, isGameWon } from '../gameResult.js'
import { getPlayer, getAiPlayer } from '../startMenu/choosePlayer.js'

export function minimax(alpha, beta, isMaximizing) {
  const board = getMainBoard()

  if (isGameWon(getPlayer())) return -10
  else if (isGameWon(getAiPlayer())) return 10
  else if (gameDraw()) return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < 3; i++) 
      for (let j = 0; j < 3; j++)
        if (board[i][j] === '') {
        board[i][j] = getAiPlayer()
        let score = minimax(alpha, beta, false)
        board[i][j] = ''
        bestScore = Math.max(score, bestScore)
        alpha = Math.max(alpha, score)
        if (beta <= alpha)
          break
      }
    return bestScore
  }

  else {
    let bestScore = Infinity
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[i][j] === '') {
          board[i][j] = getPlayer()
          let score = minimax(alpha, beta, true)
          board[i][j] = ''
          bestScore = Math.min(score, bestScore)
          beta = Math.min(beta, score)
          if (beta <= alpha)
            break
      }
    return bestScore
  }
}