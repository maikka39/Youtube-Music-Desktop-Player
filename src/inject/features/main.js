const { getCurrentWindow } = require('electron').remote
const win = getCurrentWindow()

const AddAssetsConstructor = require('./add_assets')
const DiscordRPCConstructor = require('./discord_rpc')
const PlaybackAPIConstructor = require('./playback_api/main')

const AddAssets = new AddAssetsConstructor()
const PlaybackAPI = new PlaybackAPIConstructor()

function onPageLoad () {
  AddAssets.addCSS('main.css')
  AddAssets.addJS('main.js')

  const DiscordRPC = new DiscordRPCConstructor(PlaybackAPI) // eslint-disable-line no-unused-vars

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
