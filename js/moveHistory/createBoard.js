import { getMainBoard } from '../gameBoard.js'

export function createBoard(board) {
  let table = document.createElement('table')

  board.forEach((rowData, i) => {
    let row = document.createElement('tr')

    rowData.forEach((cellData, j) => {
      let cell = document.createElement('td')
      cell.textContent = board[i][j]
      row.append(cell)
    })

    table.append(row)
  })
  document.getElementById('historyModal').append(table)
}