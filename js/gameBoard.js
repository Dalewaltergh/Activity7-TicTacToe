import { turnClick } from './player.js'
import * as dom from './domVariables.js'
import { getPlayer } from './startMenu/choosePlayer.js'
import { initPlayer, showTurnActive } from './player.js'
import { resetMoveState } from './moveHistory/moveStates.js'
import { moveStateSize, saveMoveState } from './moveHistory/moveStates.js'

let mainBoard
export const getMainBoard = () => mainBoard

export function initGameBoard() {
  mainBoard = [
    ['','',''],
    ['','',''],
    ['','',''] 
  ]

  domInit()
  initPlayer()
  clearBoxes()
  resetMoveState()
  showTurnActive(true, getPlayer()) 
}

function clearBoxes() {
  dom.boxes.forEach(box => {
    box.textContent = ''
    box.style.background = 'transparent'
    box.addEventListener(
      'click', turnClick, { once: true })
    })
}

export function markBox(player, rowId, boxId) {
  mainBoard[rowId][boxId] = player
  dom.rows[rowId].children[boxId].textContent = player
  saveMoveState(mainBoard)
}

function domInit() {
  dom.historyBtn.style.display = 'none'
  dom.modal.style.display = 'none'
  dom.newGameBtn.style.display = 'initial'
  dom.table.style.display = 'initial'
  dom.newGameBtn.addEventListener('click', () => location.reload())
  for (let i = 0; i <= moveStateSize(); i++) {
    let board = dom.historyModal.lastChild
    board.remove()
  }
}