import {
  rows,
  cells, 
  nextBtn, 
  prevBtn,
  startBtn,
} from './domElements.js'

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

let origBoard
let moveCount
let moveStates
let huPlayer
let aiPlayer
let againstAi

startBtn.addEventListener('click', startGame)
prevBtn.addEventListener('click', updateState)
nextBtn.addEventListener('click', updateState)

function playerChoose() {
  const playerChoice = document.querySelectorAll('input[name="player"]')
  for (const choice of playerChoice) {
    if(choice.checked) {
      huPlayer = choice.value
      break // or return(out of function)
    }
  }
  aiPlayer = huPlayer === 'X' ? 'O' : 'X'
}

function gameTypeChoose() {
  const gameType = document.querySelectorAll('input[name="gameType"]')
  for (const type of gameType) {
    if(type.checked) {
      againstAi = (type.value === 'true')
      break // or return(out of function)
    }
  }
}

function startGame() {
  playerChoose()
  gameTypeChoose()
  cells.forEach(cell => {
    cell.textContent = ''
    cell.addEventListener('click', turnClick, { once: true })
  })
  moveStates = []
  origBoard = [
    ['','',''],
    ['','',''],
    ['','','']
  ]
}

function turnClick(e) {
  let rowId = e.target.parentNode.id
  let cellId = e.target.id
  turn(rowId, cellId, huPlayer)
}

function turn(rowId, cellId, player) {
  origBoard[rowId][cellId] = player
  
  rows[rowId].children[cellId].textContent = player
  
  let moveSave = origBoard.map(arr => arr.slice())
  moveStates.push(moveSave)
  console.log('Move States', moveStates)
  
  
  let boardFlat = origBoard.flat()
  let gameWon = checkWin(boardFlat, player)
  
  if (gameWon) {
    console.log(`Player ${huPlayer} Wins`)
    moveCount = moveStates.length -1
    cells.forEach(cell => cell.removeEventListener('click', turnClick))
  } else if (!emptySquares().length) {
    console.log('Draw')
    moveCount = moveStates.length -1
  }

  if (emptySquares().length && againstAi)
    bestMove()
  else 
    huPlayer = huPlayer === 'X' ? 'O' : 'X'
  
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
      gameWon = {
        index: index, 
        player: player
      }
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
  if (e.target.id === 'prevBtn' && moveCount)
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
        let score = minimax(origBoard, 0, false)
        origBoard[i][j] = ''
        if (score > bestScore) {
          bestScore = score
          move = { i, j }
        }
      }
    }
  }
  origBoard[move.i][move.j] = aiPlayer
  rows[move.i].children[move.j].textContent = aiPlayer
  rows[move.i].children[move.j].removeEventListener('click', turnClick)

  let moveSave = origBoard.map(arr => arr.slice())
  moveStates.push(moveSave)
  console.log('Move States', moveStates)

  let boardFlat = origBoard.flat()

  let gameWon = checkWin(boardFlat, aiPlayer)
  if (gameWon) {
    console.log(`CPU ${aiPlayer} Wins`)
    moveCount = moveStates.length -1
    cells.forEach(cell => cell.removeEventListener('click', turnClick))
  }
}

function minimax(board, depth, isMaximizing) {
  let boardFlat = board.flat()
  let result = checkWin(boardFlat, aiPlayer)
  
  if (checkWin(boardFlat, huPlayer)) return -10
  else if (checkWin(boardFlat, aiPlayer)) return 10
  else if (emptySquares().length === 0) return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows.length; j++) {
        if (board[i][j] === '') {
          board[i][j] = aiPlayer
          let score = minimax(board, depth + 1, false)
          board[i][j] = ''
          bestScore = Math.max(score, bestScore)
        }
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows.length; j++) {
        if (board[i][j] === '') {
          board[i][j] = huPlayer
          let score = minimax(board, depth + 1, true)
          board[i][j] = ''
          bestScore = Math.min(score, bestScore)
        }
      }
    }
    return bestScore
  }
}