import { gameTypes } from './domElements.js'

let againstAi

export function chooseGameType() {
  for (const type of gameTypes) {
    if(type.checked) {
      againstAi = (type.value === 'true')
      break
    }
  }
}

export const isAgaintAi = () => againstAi