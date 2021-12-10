const sound = {
  click : '../../sfx/click.wav',
  gameOver : '../../sfx/win.wav'
}

export function playSound(url) {
  url = (url === 'gameOver') ? sound.gameOver : sound.click 
  new Audio(url).play()
}