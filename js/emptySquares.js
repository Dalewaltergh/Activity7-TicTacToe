export function emptySquares(board) {
  // let boardFlat = board.flat() || [[]]
  let boardFlat = [].concat(...board)
  return boardFlat.filter(i => !i)
}