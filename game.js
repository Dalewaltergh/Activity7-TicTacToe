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
let huPlayer = 'O'
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
  // huPlayer = huPlayer === 'X' ? 'O' : 'X'
}

function turn(rowId, cellId, player) {
  origBoard[rowId][cellId] = player

  rows[rowId].children[cellId].textContent = player

  let moveSave = origBoard.map(arr => arr.slice())
  moveStates.push(moveSave)
  console.log('Move States', moveStates)

  if (emptySquares().length) {
    bestMove()
  }

  let boardFlat = origBoard.flat()
  let gameWon = checkWin(boardFlat, player)

  if (gameWon) {
    console.log(player + ' Wins')
    moveCount = moveStates.length -1
  } else if (!emptySquares().length) 
    console.log('Draw')
}

function checkWin(board, player) {  
  let plays = board.reduce((a, e, i) =>
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

function emptySquares() {
  let boardFlat = origBoard.flat()
  return boardFlat.filter(i => !i)
}

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

function bestMove() {
  let bestScore = -Infinity
  let move
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows.length; j++) {
      if (origBoard[i][j] === '') {
        origBoard[i][j] = aiPlayer
        console.log(origBoard)
        let score = minimax(origBoard, 0, false)
        origBoard[i][j] = ''
        console.log(score)
        if (score > bestScore) {
          bestScore = score
          move = { i, j }
          console.log('Hi')
        }
      }
    }
  }
  origBoard[move.i][move.j] = aiPlayer
  rows[move.i].children[move.j].textContent = aiPlayer

  console.log(origBoard)

  // let moveSave = origBoard.map(arr => arr.slice())
  // moveStates.push(moveSave)
  // console.log('Move States', moveStates)
}

function minimax(board, depth, isMaximizing) {
  let boardFlat = origBoard.flat()
  let result = checkWin(boardFlat, aiPlayer)
  
  if (checkWin(boardFlat, huPlayer)) {
    return -10
  } else if (checkWin(boardFlat, aiPlayer)) {
    return 10
  } else if (emptySquares().length === 0) {
    return 0
  }

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows.length; j++) {
        if (origBoard[i][j] === '') {
          origBoard[i][j] = aiPlayer
          let score = minimax(origBoard, depth + 1, false)
          origBoard[i][j] = ''
          bestScore = Math.max(score, bestScore)
        }
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows.length; j++) {
        if (origBoard[i][j] === '') {
          origBoard[i][j] = huPlayer
          let score = minimax(origBoard, depth + 1, true)
          origBoard[i][j] = ''
          bestScore = Math.min(score, bestScore)
        }
      }
    }
    return bestScore
  }
}