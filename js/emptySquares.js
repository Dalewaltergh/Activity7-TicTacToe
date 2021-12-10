import { getMainBoard } from './game.js'

export function getEmptyCells() {
  const board = getMainBoard()

  // let boardFlat = board.flat() || [[]]
  let boardFlat = [].concat(...board)
  return boardFlat.filter(i => !i) 
}