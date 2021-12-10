import { initGame } from '../game.js'
import { resetGame } from '../playerTurn.js'
import { updateState } from './moveStates.js'
import { showWinner, turnDisplay } from '../domElements.js'

export function showStateButtons() {
  createStateButton('prev', updateState, false)
  createStateButton('reset', removeStateButtons, false)
  createStateButton('next', updateState, true)
}

function createStateButton(name, callback, disabled) {
  const btn = document.createElement('button')
  btn.id = `${name}Btn`
  btn.textContent = name
  btn.addEventListener('click', callback)
  document.querySelector('footer').append(btn)
  btn.disabled = disabled
}

function removeStateButtons(e) {
  showWinner.style.display = 'none'
  turnDisplay.style.display = ''
  initGame()
  document.getElementById('prevBtn').remove()
  document.getElementById('nextBtn').remove()
  e.target.remove()
}