const winCombos = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  
  // Diagonal
  [0, 4, 8],
  [6, 4, 2]
]

export function checkWinner(board, player) {  
  let boardFlat = board.flat() || [[]]

  let plays = boardFlat.reduce((a, e, i) =>
    e === player ?
      a.concat(i) :
      a, []
  )
  
  let gameWon = null
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {
        index: index, 
        player: player
      }
      break
    }
  }
  return gameWon
}