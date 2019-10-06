const { getCurrentWindow } = require('electron').remote
const win = getCurrentWindow()

const addCSS = require('./add_css')
const PlaybackAPIConstructor = require('./playback_api/main')

const PlaybackAPI = new PlaybackAPIConstructor()

function onPageLoad () {
  addCSS('main.css')

  if (process.platform === 'linux') {
    require('./linux/main')(PlaybackAPI)
  }
}

let title = ''
PlaybackAPI.on('song:change', (info) => {
  title = (info.song.title) ? info.song.title + ' - ' + info.song.artist : 'YouTube Music Desktop Player'
  win.setTitle(title)
})

PlaybackAPI.on('playback:change', () => {
  win.setTitle(((!PlaybackAPI.isPlaying()) ? '(Paused) ' : '') + title)
})

module.exports = {
  onPageLoad: onPageLoad
}
