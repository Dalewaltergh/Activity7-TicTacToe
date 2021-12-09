import { newGame, updateState } from './game.js'

export function gameButtons() {
  startBtn.addEventListener('click', newGame)
  prevBtn.addEventListener('click', updateState)
  nextBtn.addEventListener('click', updateState)
}
