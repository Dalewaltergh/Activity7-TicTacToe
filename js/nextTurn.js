import { showTurn } from './showTurn.js'
import { bestMove } from './ai/bestMove.js'
import { emptySquares } from './emptySquares.js'
import { isAgaintAi } from './menu/chooseType.js'
import { getAiPlayer, getPlayer } from './menu/choosePlayer.js'

let nextPlayer = getPlayer()

export function nextTurn(board, player) {
  if (emptySquares(board).length && isAgaintAi())  {
    showTurn(false, getAiPlayer()) 
    setTimeout(() => bestMove(board), 500)
  }
  else {
    nextPlayer = (player === 'X') ? 'O' : 'X'
    showTurn(false, nextPlayer)
  } 
}

export const getNextPlayer = () => nextPlayer


