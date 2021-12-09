import { playSound } from './sound.js'
import { minimax } from './ai/minimax.js'
import { checkBoard } from './gameOver.js'
import { bestMove } from './ai/bestMove.js'
import { writeCell } from './playerWrite.js'
import { checkWinner } from './checkWinner.js'
import { emptySquares } from './emptySquares.js'
import { rows, cells } from './utils/domElements.js'
import { choosePlayer, getHuPlayer} from './choosePlayer.js'
import { chooseGameType, isAgaintAi } from './chooseType.js'

let origBoard
let nextPlayer

startBtn.addEventListener('click', newGame)
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

export function turnClick(e) {
  const rowId = e.target.parentNode.id
  const cellId = e.target.id

  writeCell(origBoard, nextPlayer, rowId, cellId)  
  nextTurn()
  playSound()
}

function nextTurn() {
  if (emptySquares(origBoard).length && isAgaintAi()) 
    setTimeout(() => bestMove(origBoard), 500)
  else 
    nextPlayer = (nextPlayer === 'X') ? 'O' : 'X'
  
  checkBoard(origBoard, nextPlayer)
}
