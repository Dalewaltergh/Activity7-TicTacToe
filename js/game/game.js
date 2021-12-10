import { initGameBoard } from './gameBoard.js'
import { isAgaintAi } from './startMenu/chooseType.js'
import { getPlayer } from './startMenu/choosePlayer.js'
import { choosePlayer} from './startMenu/choosePlayer.js'
import { chooseGameType } from './startMenu/chooseType.js'

startBtn.addEventListener('click', startGame)

function startGame() {
  choosePlayer()
  chooseGameType()

  if (isAgaintAi() !== undefined && getPlayer())
    initGameBoard()
}