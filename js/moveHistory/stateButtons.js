import { initGame } from '../game.js'
import { updateState } from './moveStates.js'
import { winnerText, turnText } from '../domElements.js'

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
  winnerText.style.display = 'none'
  turnText.style.display = ''
  initGame()
  document.getElementById('prevBtn').remove()
  document.getElementById('nextBtn').remove()
  e.target.remove()
}