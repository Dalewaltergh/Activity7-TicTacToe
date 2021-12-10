document.body.innerHTML = `
<h2 id="turnText"></h2>
<h2 id="winnerText"></h2>

<table>
  <tr id="0">
    <td id="0"></td>
    <td id="1"></td>
    <td id="2"></td>
  </tr>
  <tr id="1">
    <td id="0"></td>
    <td id="1"></td>
    <td id="2"></td>
  </tr>
  <tr id="2">
    <td id="0"></td>
    <td id="1"></td>
    <td id="2"></td>
  </tr>
</table>

<button id="newGame">New Game</button>  
<footer>
  <div class="modal-container" id="modal_container">  
    <h1>Choose Player: </h1>
    <div style="margin-bottom: 50px;">
      <input type="radio" id="xRadio" name="player" value="X">
      <label for="xRadio">X</label>
      <input type="radio" id="oRadio" name="player" value="O">
      <label for="oRadio">O</label>  
    </div>
  
    <h1>Game Type: </h1>
    <div style="margin-bottom: 50px;">
      <input type="radio" id="twoPlayer" name="gameType" value="false">
      <label for="twoPlayer">2P</label>
      <input type="radio" id="vsComputer" name="gameType" value="true">
      <label for="vsComputer">AI</label>  
    </div>
    <button id="startBtn">Start Game</button>
  </div>
</footer>`