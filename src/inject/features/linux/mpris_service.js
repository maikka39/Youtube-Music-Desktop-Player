const remote = require('electron').remote
const { app } = remote
const mpris = require('mpris-service')
const win = remote.getCurrentWindow()

module.exports = (PlaybackAPI) => {
  const player = mpris({
    name: 'youtube_music_desktop_player',
    identity: 'YouTube Music Desktop Player',
    canRaise: true,
    supportedInterfaces: ['player'],
    desktopEntry: 'youtube-music-desktop-player'
  })

  player.playbackStatus = 'Stopped'
  player.canEditTracks = false

  player.getPosition = () => {
    return PlaybackAPI.getProgress().current * 1e6
  }

  player.on('raise', () => {
    win.setSkipTaskbar(false)
    win.show()
  })

  player.on('quit', () => {
    app.quit()
  })

  player.on('play', () => {
    PlaybackAPI.play()
  })

  player.on('pause', () => {
    PlaybackAPI.pause()
  })

  player.on('playpause', () => {
    PlaybackAPI.togglePlayback()
  })

  player.on('next', () => {
    PlaybackAPI.next()
  })

  player.on('previous', () => {
    PlaybackAPI.previous()
  })

  player.on('stop', () => {
    // TODO: Create stop function
    PlaybackAPI.pause()
  })

  player.on('volume', (volume) => {
    PlaybackAPI.setVolume(Math.round(volume * 100))
  })

  player.on('position', (data) => {
    //
  })

  player.on('seek', (offset) => {
    //
  })

  PlaybackAPI.on('song:change', (info) => {
    player.canSeek = false
    player.canPlay = true
    player.canPause = true
    player.canGoPrevious = true
    player.canGoNext = true
    player.metadata = {
      'xesam:title': info.song.title,
      'xesam:artist': [info.song.artist],
      // 'xesam:album': info.song.album,
      'mpris:artUrl': info.song.thumbnail,
      'mpris:length': info.progress.total * 1e6
    }
  })

  PlaybackAPI.on('playback:seek', (time) => {
    player.seeked(time * 1e6)
  })

  PlaybackAPI.on('playback:change', (playbackState) => {
    player.playbackStatus = (playbackState) ? 'Playing' : 'Paused'
  })

  PlaybackAPI.on('volume:change', (volume) => {
    player.volume = volume / 100
  })
}
