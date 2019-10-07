const remote = require('electron').remote

function DiscordRPC (PlaybackAPI) {
  this.PlaybackAPI = PlaybackAPI
  this.client = remote.require('discord-rich-presence')('630525607691943942')

  this.update = () => {
    const info = this.PlaybackAPI.getAllInfo()
    this.client.updatePresence({
      details: ((this.PlaybackAPI.isPlaying()) ? 'Playing: ' : 'Paused: ') + info.song.title,
      state: `By: ${info.song.artist}`,
      startTimestamp: Date.now() - (info.progress.current * 1e3),
      largeImageKey: 'logo',
      largeImageText: 'YouTube Music Desktop Player',
      instance: false
    })
  }

  this.PlaybackAPI.on('song:change', this.update)
  this.PlaybackAPI.on('playback:seek', this.update)
  this.PlaybackAPI.on('playback:change', this.update)

  setInterval(() => {
    this.update()
  }, 10e3)

  setInterval(() => {
    if (!this.PlaybackAPI.isPlaying()) {
      this.update()
    }
  }, 500)
}

// discordRPC.update({ song: { title: 'Test', artist: 'John' }, progress: { current: 123 } })

module.exports = DiscordRPC
