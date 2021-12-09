import { playSound } from './sound.js'
import { showTurn } from './showTurn.js'
import { minimax } from './ai/minimax.js'
import { checkBoard } from './gameOver.js'
import { bestMove } from './ai/bestMove.js'
import { writeCell } from './playerWrite.js'
import { checkWinner } from './checkWinner.js'
import { rows, cells } from './domElements.js'
import { emptySquares } from './emptySquares.js'
import { newGameBtn, modal } from './domElements.js'
import { getNextPlayer, nextTurn } from './nextTurn.js'
import { turnDisplay, showWinner } from './domElements.js'
import { chooseGameType, isAgaintAi } from './menu/chooseType.js'
import { choosePlayer, getPlayer } from './menu/choosePlayer.js'

let origBoard
let player

startBtn.addEventListener('click', startGame)
newGameBtn.addEventListener('click', newGame)

export function startGame() {
  choosePlayer()
  chooseGameType()
  
  if (isAgaintAi() === undefined || getPlayer() === undefined) return
  initGame()
} 

function initGame() {
  newGameBtn.style.display = 'initial'
  showTurn(false, getPlayer())
  player = getPlayer()
  enableClicks()
  resetBoard()
  modal.style.display = 'none'
  showWinner.display = 'none'
}

function newGame() {
  location.reload()
}

const enableClicks = () =>   
  cells.forEach(c => {
    c.textContent = ''
    c.addEventListener('click', turnClick, { once: true })
  })

export const resetBoard = () => 
  origBoard = [
    ['','',''],
    ['','',''],
    ['','','']
  ]

export function turnClick(e) {
  const rowId = e.target.parentNode.id
  const cellId = e.target.id
  writeCell(origBoard, player, rowId, cellId)  
  checkBoard(origBoard, player)
  nextTurn(origBoard, player)
  playSound()
  if (!isAgaintAi())
    player = getNextPlayer()
}

