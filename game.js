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

let origBoard = [
  ['','',''],
  ['','',''],
  ['','','']
]

let moveCount
let moveStates = []
let huPlayer
const aiPlayer = 'X'
const rows = document.querySelectorAll('tr')
const cells = document.querySelectorAll('td')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')

const startBtn = document.getElementById('startBtn')
startBtn.addEventListener('click', playerChoose)

function playerChoose() {
  const playerChoice = document.querySelectorAll('input[name="player"]')
  for (const choice of playerChoice) {
    if(choice.checked) {
      huPlayer = choice.value
      break // or return(out of function)
    }
  }
}

startGame()

function startGame() {
  document.querySelector('.endgame').style.display = 'none'
  cells.forEach(cell => {
    cell.textContent = ''
    cell.style.removeProperty('background')
    cell.addEventListener('click', turnClick, { once: true })
  })
}

function turnClick(e) {
  let rowId = e.target.parentNode.id
  let cellId = e.target.id
  turn(rowId, cellId, huPlayer)
  huPlayer = huPlayer === 'X' ? 'O' : 'X'
  
  // if (!checkTie())
  //   turn(bestSpot(), aiPlayer)
}

function turn(rowId, cellId, player) {
  origBoard[rowId][cellId] = player

  rows[rowId].children[cellId].textContent = player

  let moveSave = origBoard.map(arr => arr.slice())
  moveStates.push(moveSave)
  console.log('Move States', moveStates)

  let gameWon = checkWin(origBoard, player)
  if (gameWon) {
    console.log(player + ' Wins')
    moveCount = moveStates.length -1
    //   gameOver(gameWon)
  } else if (!emptySquares().length) 
    console.log('Draw')

}

function checkWin(board, player) {
  let boardFlat = board.flat()
  
  let plays = boardFlat.reduce((a, e, i) =>
    e === player ?
      a.concat(i) :
      a, []
  )

  let gameWon = null
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {index: index, player: player}
      break
    }
  }
  return gameWon
}

// function gameOver(gameWon) {
//   winCombos[gameWon.index].forEach(i =>
//     document.getElementById(i).style.background =
//       gameWon.player === huPlayer ? 'blue' : 'red'
//   )
//   cells.forEach(cell => cell.removeEventListener('click', turnClick))
//   declareWinner(gameWon.player === huPlayer ? 'You Win!' : 'You Lose')
// }
//
// function declareWinner(who) {
//   document.querySelector('.endgame').style.display = 'block'
//   document.querySelector('.endgame .text').textContent = who
// }
//
function emptySquares() {
  let boardFlat = origBoard.flat()
  return boardFlat.filter(i => !i)
}
//
// function bestSpot() {
//   return minimax(origBoard, aiPlayer).index
// }
//
// function checkTie() {
//   if (!emptySquares().length) {
//     cells.forEach(cell => {
//       cell.style.background = 'green'
//       cell.removeEventListener('click', turnClick)
//     })
//     // declareWinner('Tie Game')
//     return true
//   }
//   return false
// }
//
//
// function minimax(newBoard, player) {
//   let availSpots = emptySquares(newBoard)
//
//   if (checkWin(newBoard, huPlayer)) {
//     return {score: -10}
//   } else if (checkWin(newBoard, aiPlayer)) {
//     return {score: 10}
//   } else if (availSpots.length === 0) {
//     return {score: 0}
//   }
//
//   let moves = []
//   for (let i = 0; i < availSpots.length; i++) {
//     let move = {}
//     move.index = newBoard[availSpots[i]]
//     newBoard[availSpots[i]] = player
//
//     if (player === aiPlayer) {
//       let result = minimax(newBoard, huPlayer)
//       move.score = result.score
//     } else {
//       let result = minimax(newBoard, aiPlayer)
//       move.score = result.score
//     }
//
//     newBoard[availSpots[i]] = move.index
//     moves.push(move)
//   }
//
//   let bestMove
//   if(player === aiPlayer) {
//     let bestScore = -10000;
//     for(let i = 0; i < moves.length; i++) {
//       if (moves[i].score > bestScore) {
//         bestScore = moves[i].score
//         bestMove = i
//       }
//     }
//   } else {
//     let bestScore = 10000;
//     for(let i = 0; i < moves.length; i++) {
//       if (moves[i].score < bestScore) {
//         bestScore = moves[i].score
//         bestMove = i
//       }
//     }
//   }
//   return moves[bestMove]
// }

function updateState(e) {
  if (e.target.id === 'prevBtn')
    moveCount -= 1
  else
    moveCount += 1

  let curState = moveStates[moveCount]

  curState.forEach((rowData, rowIndex) => 
    rowData.forEach((boxData, boxIndex) => 
      rows[rowIndex].children[boxIndex].textContent = boxData
    )
  )
}