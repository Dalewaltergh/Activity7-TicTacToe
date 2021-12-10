import { cells } from './domElements.js'
import { resetGame } from './playerTurn.js'
import { newGameBtn, modal } from './domElements.js'
import { showTurn, turnClick } from './playerTurn.js'
import { resetMoveState } from './moveHistory/moveStates.js'
import { choosePlayer, getPlayer } from './menu/choosePlayer.js'
import { chooseGameType, isAgaintAi } from './menu/chooseType.js'

startBtn.addEventListener('click', startGame)
newGameBtn.addEventListener('click', () => location.reload())

function startGame() {
  choosePlayer()
  chooseGameType()
  
  if (isAgaintAi() !== undefined && getPlayer())
    initGame()
} 

export function initGame() {
  newGameBtn.style.display = 'initial'
  showTurn(false, getPlayer())
  enableClicks()
  resetGame()
  modal.style.display = 'none'
  showWinner.display = 'none'
}

const enableClicks = () =>   
  cells.forEach(c => {
    c.textContent = ''
    c.addEventListener('click', turnClick, { once: true })
  })