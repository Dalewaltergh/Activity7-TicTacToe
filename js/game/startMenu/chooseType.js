import { gameTypes } from '../../domVariables.js'

let againstAi

export function chooseGameType() {
  for (const type of gameTypes) {
    if(type.checked) {
      againstAi = (type.value === 'true') 
      // break
      return
    }
  }
}

export const isAgaintAi = () => againstAi