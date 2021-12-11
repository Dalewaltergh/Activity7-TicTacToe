import { changeState } from './moveStates.js'
import { initGameBoard } from '../gameBoard.js'
import { winnerText, turnText, newGameBtn } from '../domVariables.js'

export function showStateButtons() {
  createStateButton('prev', changeState, false)
  createStateButton('reset', removeStateButtons, false)
  createStateButton('next', changeState, true)
}

function createStateButton(name, callback, isDisabled) {
  const btn = document.createElement('button')
  btn.id = `${name}Btn`
  btn.textContent = name
  btn.addEventListener('click', callback)
  document.querySelector('footer').append(btn)
  btn.disabled = isDisabled
}

function removeStateButtons(e) {
  initGameBoard()
  turnText.style.display = ''
  winnerText.style.display = 'none'
  document.getElementById('prevBtn').remove()
  document.getElementById('nextBtn').remove()
  e.target.remove()
}