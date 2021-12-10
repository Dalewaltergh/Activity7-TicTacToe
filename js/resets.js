import { turnClick } from './player.js'
import { cells } from './domElements.js'

export const clearBoard = () => [
  ['','',''],
  ['','',''],
  ['','',''] 
]

export const initCells = () =>   
  cells.forEach(c => {
    c.textContent = ''
    c.addEventListener(
      'click', turnClick, { once: true })
  }
)