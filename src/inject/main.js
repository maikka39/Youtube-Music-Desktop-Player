const { webContents, getCurrentWindow } = require('electron').remote
const getSongInfo = require('./song_info')
const addCSS = require('./add_css')

const win = getCurrentWindow()
const contents = webContents.fromId(win.id)
contents.on('did-finish-load', pageLoaded)

function pageLoaded () {
  // document.title = getSongInfo()
  addCSS('main.css')

  document.getElementsByTagName('body')[0].addEventListener('click', onClick)
}

function onClick () {

}

function updateTitle () {
  const info = getSongInfo()
  if (info.title === 'Unknown') {
    win.setTitle('YouTube Music Desktop Player')
    return
  }

  let playing = ''
  if (!info.isPlaying) {
    playing = '(Paused) '
  }
  win.setTitle(playing + info.title + ' - ' + info.artist)
}

setInterval(updateTitle, 200)
