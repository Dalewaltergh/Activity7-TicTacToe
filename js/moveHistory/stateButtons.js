import { resetBoard, startGame } from '../game.js'
import { showWinner, turnDisplay } from '../domElements.js'
import { resetMoveState, updateState } from './moveStates.js'

export function showStateButtons() {
  createStateButton('prev', updateState)
  createStateButton('next', updateState)
  createStateButton('reset', removeStateButtons)
}

function createStateButton(name, callback) {
  const btn = document.createElement('button')
  btn.id = `${name}Btn`
  btn.textContent = name
  btn.addEventListener('click', callback)
  document.body.append(btn)
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