const remote = require('electron').remote
const { app } = remote
const mpris = require('mpris-service')
const getSongInfo = require('./song_info')
const control = require('./control')

const win = remote.getCurrentWindow()

const player = mpris({
  name: 'youtube_music_desktop_player',
  identity: 'YouTube Music Desktop Player',
  canRaise: true,
  supportedInterfaces: ['player'],
  desktopEntry: 'youtube-music-desktop-player'
})

player.playbackStatus = 'Stopped'
player.canEditTracks = false

player.getPosition = function getPosition () {
  return getSongInfo.progress * 1e3
}

player.on('raise', () => {
  win.setSkipTaskbar(false)
  win.show()
})

player.on('quit', () => {
  app.quit()
})

player.on('play', () => {
  control.play()
})

player.on('pause', () => {
  control.pause()
})

player.on('playpause', () => {
  control.toggle()
})

player.on('next', () => {
  control.next()
})

player.on('previous', () => {
  control.previous()
})

player.on('stop', () => {
  // TODO: Create stop function
  control.pause()
})

player.on('volume', (volume) => {
  control.setVolume(Math.round(volume * 100))
})

player.on('position', (data) => {
  //
})

player.on('seek', (offset) => {
  //
})

function onSongInfoUpdated (info) {
  player.canSeek = false
  player.canPlay = true
  player.canPause = true
  player.canGoPrevious = true
  player.canGoNext = true
  player.metadata = {
    'mpris:artUrl': info.thumbnail,
    'mpris:length': info.length * 1e6,
    'xesam:title': info.title,
    'xesam:artist': [info.artist]
    // 'xesam:album': info.album,
  }
}

const lastPosition = 0
function onSeeked (time) {
  player.seeked(time * 1e6)
}

function onPlaybackStateChange (playbackState) {
  player.playbackStatus = (playbackState) ? 'Playing' : 'Paused'
}

function onVolumeChange (volume) {
  player.volume = volume / 100
}

module.exports = {
  onSongInfoUpdated: onSongInfoUpdated,
  onSeeked: onSeeked,
  onPlaybackStateChange: onPlaybackStateChange,
  onVolumeChange: onVolumeChange
}
