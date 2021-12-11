import { turnClick } from './player.js'
import * as dom from './domVariables.js'
import { createBoard } from './moveHistory/createBoard.js'
import { getMoveStates } from './moveHistory/moveStates.js'
import { showStateButtons } from './moveHistory/stateButtons.js'
import { gameDraw, gameWon, getWinningCombo } from './gameResult.js'

export function gameCheck(player) {
  if (!(gameWon(player) || gameDraw())) return
  showStateButtons()
  displayCombo(player)
  displayResult(player)
  displayBoardHistory()
}

function displayResult(player) {
  dom.turnText.style.display = 'none'
  dom.winnerText.style.display = ''
  
  dom.winnerText.textContent =
  gameWon(player) ?
  `Player ${player} Wins` :
  `It's a Tie!`
}

function displayBoardHistory() {
  getMoveStates().forEach(board => createBoard(board))
  dom.historyBtn.style.display = 'initial'
  dom.boxes.forEach(box => box.removeEventListener('click', turnClick))
}

function displayCombo(player) {
  if (gameWon(player)) {
    getWinningCombo().forEach(w => {
      dom.boxes[w].style.background = 'rgba(0, 0, 0, .15)'
      dom.boxes[w].style.color = 'white'
    })
  }
  else if (gameDraw()) 
    dom.boxes.forEach(box => box.style.background = 'rgba(0, 0, 0, .15)')
}