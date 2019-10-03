const { webContents, getCurrentWindow } = require('electron').remote
const getSongInfo = require('./song_info')

const win = getCurrentWindow()
const contents = webContents.fromId(win.id)
contents.on('did-finish-load', pageLoaded)

function pageLoaded () {
  // document.title = getSongInfo()
  document.getElementsByTagName('body')[0].addEventListener('click', onClick)
}

function onClick () {

}

function updateTitle () {
  const info = getSongInfo()
  let playing = ''
  if (!info.isPlaying) {
    playing = '(Paused) '
  }
  win.setTitle(playing + info.title + ' - ' + info.artist)
}

setInterval(updateTitle, 200)
