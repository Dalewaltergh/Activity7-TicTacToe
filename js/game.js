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

function saveMoveState() {
  const moveSave = origBoard.map(arr => arr.slice())
  moveStates.push(moveSave)
  console.log('Move States', moveStates)
}

function turnClick(e) {
  const rowId = e.target.parentNode.id
  const cellId = e.target.id
  writeCell(nextPlayer, rowId, cellId)  
  checkGameOver(nextPlayer)
  nextTurn()
}

function nextTurn() {
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

  writeCell(getAiPlayer(), move.i, move.j)
  rows[move.i].children[move.j].removeEventListener('click', turnClick)
  checkGameOver(getAiPlayer())
}

function writeCell(player, rowId, cellId) {
  origBoard[rowId][cellId] = player
  rows[rowId].children[cellId].textContent = player
  saveMoveState()
}

function checkGameOver(player) {
  let boardFlat = origBoard.flat()
  let gameWon = checkWinner(boardFlat, player)
  if (gameWon) {
    console.log(`Player ${player} Wins`)
    moveCount = moveStates.length -1
    cells.forEach(cell => cell.removeEventListener('click', turnClick))
  }
  else if (!emptySquares().length) {
    console.log('Draw')
    moveCount = moveStates.length -1
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