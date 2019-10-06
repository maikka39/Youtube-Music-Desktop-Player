function Observer () {
  this.objects = {}
  this.timer = 0

  this.selectors = {
    title: "document.querySelector('.ytmusic-player-bar.title')",
    artist: "document.querySelector('.ytmusic-player-bar.byline')",
    thumbnail: "document.querySelector('.ytmusic-player-bar > img')",
    progressBar: "document.querySelector('#progress-bar')",
    volume: "document.getElementById('volume-slider')",
    playButton: "document.querySelector('.play-pause-button.ytmusic-player-bar')"
  }

  this.events = {
    'song:change': [],
    'playback:change': [],
    'playback:progress': [],
    'volume:change': []
  }

  this.on = (what, callback) => {
    this.events[what].push(callback)
  }

  this._get = (v) => {
    if (!this.objects[v]) {
      this.objects[v] = eval(this.selectors[v])
    }

    // Return empty element if we can't find the object to prevent further errors
    return this.objects[v] || document.createElement('p')
  }

  let oldSong
  let oldVolume
  let oldPlayState
  setInterval(() => {
    const newSong = {
      title: this._get('title').textContent || 'Unknown',
      artist: this._get('artist').textContent.split('•')[0].trim() || 'Unknown',
      thumbnail: this._get('thumbnail').getAttribute('src') || '',
      total: parseInt(this._get('progressBar').getAttribute('aria-valuemax')) || 0
    }

    if (JSON.stringify(newSong) !== JSON.stringify(oldSong)) {
      oldSong = newSong
      this.timer = 0

      for (const callback of this.events['song:change']) {
        callback(newSong)
      }
    }

    const progress = parseInt(this._get('progressBar').getAttribute('value')) || 0
    for (const callback of this.events['playback:progress']) {
      callback(progress)
    }

    const newVolume = this._get('volume').getAttribute('value') || 100
    if (newVolume !== oldVolume) {
      oldVolume = newVolume
      for (const callback of this.events['volume:change']) {
        callback(newVolume)
      }
    }

    const newPlayState = this._get('playButton').getAttribute('title') === 'Pause' // TODO: Make cross-language
    if (newPlayState !== oldPlayState) {
      oldPlayState = newPlayState
      for (const callback of this.events['playback:change']) {
        callback(newPlayState)
      }
    }
  }, 200)
}

module.exports = Observer
