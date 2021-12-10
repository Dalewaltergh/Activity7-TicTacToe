import { initCells, clearBoard } from './resets.js'
import { initPlayer, showTurnActive } from './player.js'
import { resetMoveState } from './moveHistory/moveStates.js'
import { choosePlayer, getPlayer } from './menu/choosePlayer.js'
import { newGameBtn, modal, winnerText } from './domElements.js'
import { chooseGameType, isAgaintAi } from './menu/chooseType.js'

startBtn.addEventListener('click', startGame)

let mainBoard
export const getMainBoard = () => mainBoard

function startGame() {
  choosePlayer()
  chooseGameType()

  if (isAgaintAi() !== undefined && getPlayer())
    initGame()
}

export function initGame() {
  mainBoard = clearBoard()
  initPlayer()
  initCells()

  resetMoveState()
  showTurnActive(true, getPlayer())

  modal.style.display = 'none'
  winnerText.display = 'none'
  newGameBtn.style.display = 'initial'
  newGameBtn.addEventListener('click', () => location.reload())
}