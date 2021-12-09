import { minimax } from './minimax.js'
import { bestMove } from './bestMove.js'
import { writeCell } from './playerWrite.js'
import { checkWinner } from './checkWinner.js'
import { rows, cells } from './domElements.js'
import { gameButtons } from './gameButtons.js'
import { emptySquares } from './emptySquares.js'
import { choosePlayer, getHuPlayer} from './players.js'
import { chooseGameType, isAgaintAi } from './chooseType.js'

let origBoard
let moveCount
let moveStates = []
let nextPlayer

onload = () => gameButtons()

export function newGame() {
  choosePlayer()
  chooseGameType()
  nextPlayer = getHuPlayer()
  cells.forEach(cell => {
    cell.textContent = ''
    cell.addEventListener('click', turnClick, { once: true })
  })
  origBoard = [
    ['','',''],
    ['','',''],
    ['','','']
  ]
}

export function saveMoveState() {
  const moveSave = origBoard.map(arr => arr.slice())
  moveStates.push(moveSave)
  console.log('Move States', moveStates)
}

export function turnClick(e) {
  const rowId = e.target.parentNode.id
  const cellId = e.target.id
  writeCell(origBoard, nextPlayer, rowId, cellId)  
  checkGameOver(nextPlayer)
  nextTurn()
}

function nextTurn() {
  if (emptySquares(origBoard).length && isAgaintAi()) 
    bestMove(origBoard)
  else 
    nextPlayer = (nextPlayer === 'X') ? 'O' : 'X'
}

export function checkGameOver(player) {
  let gameWon = checkWinner(origBoard, player)
  if (gameWon) {
    console.log(`Player ${player} Wins`)
    moveCount = moveStates.length -1
    cells.forEach(cell => cell.removeEventListener('click', turnClick))
  }
  else if (!emptySquares(origBoard).length) {
    console.log('Draw')
    moveCount = moveStates.length -1
  }
}

export function updateState(e) {
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