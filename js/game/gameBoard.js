import { turnClick } from './player.js'
import * as dom from '../domVariables.js'
import { getPlayer } from './startMenu/choosePlayer.js'
import { initPlayer, showTurnActive } from './player.js'
import { saveMoveState } from './moveHistory/moveStates.js'
import { resetMoveState } from './moveHistory/moveStates.js'
import { isAgaintAi } from './startMenu/chooseType.js'

let mainBoard
export const getMainBoard = () => mainBoard

export function initGameBoard() {
  mainBoard = [
    ['','',''],
    ['','',''],
    ['','',''] 
  ]

  initPlayer()
  enableClicks()
  resetMoveState()
  showTurnActive(true, getPlayer())

  dom.winnerText.display = 'none'
  dom.modal.style.display = 'none'
  dom.newGameBtn.style.display = 'initial'
  dom.newGameBtn.addEventListener('click', () => location.reload())
}
 
const enableClicks = () =>   
  dom.boxes.forEach(box => {
    box.textContent = ''
    box.addEventListener(
      'click', turnClick, { once: true })
  }
)

export function writeBox(player, rowId, boxId) {
  mainBoard[rowId][boxId] = player
  dom.rows[rowId].children[boxId].textContent = player
  saveMoveState(mainBoard)
}

export function isBoardFull() {
  const boardInputs = [].concat(...mainBoard)
  const boxesFilled = boardInputs.filter(i => !i)
  return !boxesFilled.length
}