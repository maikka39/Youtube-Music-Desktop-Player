const control = require('./control')
const ObserverConstructor = require('./observer')

const Observer = new ObserverConstructor()

function PlaybackAPI () {
  this.data = {}

  this.events = {
    'playback:pause': [],
    'playback:play': [],
    'playback:change': [],
    'playback:seek': [],
    'song:change': [],
    'volume:change': []
  }

  this.reset = () => {
    this.data = {
      playing: false,
      song: {
        title: null,
        artist: null,
        album: null,
        thumbnail: null
      },
      rating: {
        liked: false,
        disliked: false
      },
      progress: {
        current: 0,
        total: 0
      },
      songLyrics: null,
      shuffle: 'NO_SHUFFLE',
      repeat: 'NO_REPEAT',
      volume: 100
    }
  }
  this.reset()

  this.seconds = 0
  setInterval(() => {
    if (!this.data.playing) {
      return
    }

    this.seconds++
  }, 1000)

  Observer.on('playback:change', (state) => {
    if (state == this.data.playing) {
      return
    }

    this.data.playing = state
    if (state) {
      for (const callback of this.events['playback:play']) {
        callback()
      }
    } else {
      for (const callback of this.events['playback:pause']) {
        callback()
      }
    }

    for (const callback of this.events['playback:change']) {
      callback(this.data.playing)
    }
  })

  Observer.on('song:change', (info) => {
    this.data.song.title = info.title
    this.data.song.artist = info.artist
    this.data.song.thumbnail = info.thumbnail

    this.data.progress.total = info.total

    for (const callback of this.events['song:change']) {
      callback(this.data)
    }
  })

  Observer.on('volume:change', (v) => {
    this.data.volume = v
    for (const callback of this.events['volume:change']) {
      callback(this.data.volume)
    }
  })

  Observer.on('playback:progress', (time) => {
    this.data.progress.current = time
  })

  setInterval(() => {
    if (this.data.progress.current - 2 > this.seconds || this.data.progress.current + 2 < this.seconds) {
      this.seconds = this.data.progress.current

      for (const callback of this.events['playback:seek']) {
        callback(this.data.progress.current)
      }
    }
  }, 1000)

  this.on = (what, callback) => {
    this.events[what].push(callback)
  }

  this.play = () => {
    if (this.isPlaying()) {
      return
    }

    control.toggle()
  }

  this.pause = () => {
    if (!this.isPlaying()) {
      return
    }

    control.toggle()
  }

  this.togglePlayback = () => {
    control.toggle()
  }

  this.next = () => {
    control.next()
  }

  this.previous = () => {
    control.previous()
  }

  this.setVolume = (v) => {
    control.setVolume(v)
  }

  this.isPlaying = () => {
    return this.data.playing
  }

  this.getCurrentSong = () => {
    return this.data.song
  }

  this.getProgress = () => {
    return this.data.progress
  }

  this.getVolume = () => {
    return this.data.volume
  }
}

module.exports = PlaybackAPI
