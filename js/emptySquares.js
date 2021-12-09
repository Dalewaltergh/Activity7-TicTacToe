export function emptySquares(board) {
  let boardFlat = board.flat() || [[]]
  return boardFlat.filter(i => !i)
}