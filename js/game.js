import { 
  rows, 
  cells, 
  startBtn, 
  nextBtn, 
  prevBtn 
} from './domElements.js'
import { 
  getHuPlayer, 
  getAiPlayer,
  choosePlayer,
} from './players.js'
import { chooseGameType, isAgaintAi } from './chooseType.js'
import { checkWinner } from './checkWinner.js'

let origBoard
let moveCount
let moveStates
let nextPlayer

function newGame() {
  choosePlayer()
  chooseGameType()
  nextPlayer = getHuPlayer()
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

startBtn.addEventListener('click', newGame)
prevBtn.addEventListener('click', updateState)
nextBtn.addEventListener('click', updateState)

function turnClick(e) {
  let rowId = e.target.parentNode.id
  let cellId = e.target.id

  origBoard[rowId][cellId] = nextPlayer
  
  rows[rowId].children[cellId].textContent = nextPlayer
  
  let moveSave = origBoard.map(arr => arr.slice())
  moveStates.push(moveSave)
  console.log('Player Move States', moveStates)
  
  let boardFlat = origBoard.flat()
  let gameWon = checkWinner(boardFlat, nextPlayer)
  
  if (gameWon) {
    console.log(`Player ${nextPlayer} Wins`)
    moveCount = moveStates.length -1
    cells.forEach(cell => cell.removeEventListener('click', turnClick))
  } else if (!emptySquares().length) {
    console.log('Draw')
    moveCount = moveStates.length -1
  }

  if (emptySquares().length && isAgaintAi())
    bestMove()
  else 
    nextPlayer = (nextPlayer === 'X') ? 'O' : 'X'
}

function emptySquares() {
  let boardFlat = origBoard.flat()
  return boardFlat.filter(i => !i)
}

function bestMove() {
  let bestScore = -Infinity
  let move
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows.length; j++) {
      if (origBoard[i][j] === '') {
        origBoard[i][j] = getAiPlayer()
        let score = minimax(origBoard, 0, false)
        origBoard[i][j] = ''
        if (score > bestScore) {
          bestScore = score
          move = { i, j }
        }
      }
    }
  }
  origBoard[move.i][move.j] = getAiPlayer()
  rows[move.i].children[move.j].textContent = getAiPlayer()
  rows[move.i].children[move.j].removeEventListener('click', turnClick)

  let moveSave = origBoard.map(arr => arr.slice())
  moveStates.push(moveSave)
  console.log('AI Move States', moveStates)

  let boardFlat = origBoard.flat()

  let gameWon = checkWinner(boardFlat, getAiPlayer())
  if (gameWon) {
    console.log(`CPU ${getAiPlayer()} Wins`)
    moveCount = moveStates.length -1
    cells.forEach(cell => cell.removeEventListener('click', turnClick))
  }
}

function minimax(board, depth, isMaximizing) {
  let boardFlat = board.flat()
  let result = checkWinner(boardFlat, getAiPlayer())
  
  if (checkWinner(boardFlat, getHuPlayer())) return -10
  else if (checkWinner(boardFlat, getAiPlayer())) return 10
  else if (!emptySquares().length) return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows.length; j++) {
        if (board[i][j] === '') {
          board[i][j] = getAiPlayer()
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
          board[i][j] = getHuPlayer()
          let score = minimax(board, depth + 1, true)
          board[i][j] = ''
          bestScore = Math.min(score, bestScore)
        }
      }
    }
    return bestScore
  }
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