import { turnDisplay } from './domElements.js'

export function showTurn(isGameOver, player = '') {
  turnDisplay.textContent = !isGameOver ? 
  `Player ${player}'s Turn` : '' 
}