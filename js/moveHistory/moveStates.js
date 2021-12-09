import { rows } from '../utils/domElements.js'
import { checkWinner } from '../checkWinner.js'
import { emptySquares } from '../emptySquares.js'

let moveCount
let moveStates = []

const moveStateSize = () => moveStates.length-1

export function saveMoveState(board) {
  const moveSave = board.map(arr => arr.slice())
  moveStates.push(moveSave)
  console.log('Move States', moveStates)
  moveCount = moveStateSize()
}

export function updateState(e) {
  if (e.target.id === 'prevBtn' && moveCount)
    moveCount -= 1
  else if (e.target.id === 'nextBtn' && moveCount < moveStateSize())
    moveCount += 1

  let curState = moveStates[moveCount]

  curState.forEach((rowData, rowIndex) => 
    rowData.forEach((boxData, boxIndex) => 
      rows[rowIndex].children[boxIndex].textContent = boxData
    )
  )
}

export const resetMoveState = () => moveStates = []