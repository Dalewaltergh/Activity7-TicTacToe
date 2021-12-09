import { rows } from '../domElements.js'
import { checkWinner } from '../checkWinner.js'
import { emptySquares } from '../emptySquares.js'

let moveCount
let moveStates = []

const moveStateSize = () => moveStates.length-1

export function saveMoveState(board) {
  const moveSave = board.map(arr => arr.slice())
  moveStates.push(moveSave)
  console.log('Move History', moveStates)
  moveCount = moveStateSize()
}

export function updateState(e) {
  if (e.target.id === 'prevBtn') {
    moveCount -= 1
    document.getElementById('nextBtn').disabled = false
    if (moveCount === 0) 
      e.target.disabled = true
  }

  if (e.target.id === 'nextBtn') {
    moveCount += 1
    document.getElementById('prevBtn').disabled = false
    if (moveCount === moveStateSize()) 
      e.target.disabled = true
  }

  let curState = moveStates[moveCount]

  curState.forEach((rowData, rowIndex) => 
    rowData.forEach((boxData, boxIndex) => 
      rows[rowIndex].children[boxIndex].textContent = boxData
    )
  )
}

export const resetMoveState = () => moveStates = []