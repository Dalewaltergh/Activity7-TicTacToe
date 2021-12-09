import { showTurn } from './showTurn.js'
import { emptySquares } from './emptySquares.js'
import { isAgaintAi } from './menu/chooseType.js'
import { bestMove } from './ai/bestMove.js'
import { getPlayer } from './menu/choosePlayer.js'

let nextPlayer = getPlayer()

export function nextTurn(board, player) {
  if (emptySquares(board).length && isAgaintAi())  {
    setTimeout(() => bestMove(board), 500)
    showTurn(false, player) 
  }
  else {
    nextPlayer = (player === 'X') ? 'O' : 'X'
    showTurn(false, nextPlayer)
  } 
}

export const getNextPlayer = () => nextPlayer


