import { resetBoard, startGame } from '../game.js'
import { showWinner, turnDisplay } from '../domElements.js'
import { resetMoveState, updateState } from './moveStates.js'

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
  startGame()
  resetMoveState()
  resetBoard()
  document.getElementById('prevBtn').remove()
  document.getElementById('nextBtn').remove()
  e.target.remove()
}