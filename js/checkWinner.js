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
  const plays = getPlaysFromBoard(board, player)
  let gameWon = false
  for (let [index, combo] of winCombos.entries()) 
    if (combo.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = true
      break
    }
  return gameWon
}

function getPlaysFromBoard(board, player) {
  const boardFlat = [].concat(...board)
  const plays = boardFlat
    .reduce((a, e, i) =>
      (e === player) ? a.concat(i) : a, 
      []
    )

  return plays
} 

