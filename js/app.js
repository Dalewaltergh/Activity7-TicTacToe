import { startBtn } from './domVariables.js'
import { initGameBoard } from './gameBoard.js'
import { isAgaintAi } from './startMenu/chooseMode.js'
import { getPlayer } from './startMenu/choosePlayer.js'
import { choosePlayer} from './startMenu/choosePlayer.js'
import { chooseGameMode } from './startMenu/chooseMode.js'

startBtn.addEventListener('click', startGame)
function startGame() {
  choosePlayer()
  chooseGameMode()

  if (isAgaintAi() !== undefined && getPlayer())
    initGameBoard()
}