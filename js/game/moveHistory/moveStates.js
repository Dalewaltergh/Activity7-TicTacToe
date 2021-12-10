import { rows } from '../../domVariables.js'

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
  const nextBtn = document.getElementById('nextBtn')
  const prevBtn = document.getElementById('prevBtn')

  if (e.target.id === 'prevBtn') {
    moveCount -= 1
    nextBtn.disabled = false
    if (moveCount === 0) 
      e.target.disabled = true
  }
  else if (e.target.id === 'nextBtn') {
    moveCount += 1
    prevBtn.disabled = false
    if (moveCount === moveStateSize()) 
      e.target.disabled = true
  }

  updateBoardState()
}

function updateBoardState() {
  let curState = moveStates[moveCount]
  curState.forEach((rowData, rowIndex) => 
    rowData.forEach((boxData, boxIndex) => 
      rows[rowIndex].children[boxIndex].textContent = boxData
    )
  )
}

export const resetMoveState = () => moveStates = []