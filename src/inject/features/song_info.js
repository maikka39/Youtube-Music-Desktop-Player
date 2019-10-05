function getSongInfo () {
  const data = {}

  // Set defaults
  data.title = 'Unknown'
  data.artist = 'Unknown'
  data.thumbnail = ''
  data.progress = 0
  data.length = 0
  data.volume = 0
  data.isPlaying = false

  const title = document.querySelector('.ytmusic-player-bar.title')
  if (title && title.textContent !== '') {
    data.title = title.textContent
  }

  const artistLine = document.querySelector('.ytmusic-player-bar.byline')
  if (artistLine) {
    data.artist = artistLine.textContent.split('•')[0].trim()
  }

  const thumbnail = document.querySelector('.ytmusic-player-bar.byline')
  if (thumbnail) {
    data.thumbnail = thumbnail
  }

  const bar = document.querySelector('#progress-bar')
  if (bar) {
    const progress = parseInt(bar.getAttribute('value'))
    if (progress) {
      data.progress = progress
    }

    const length = parseInt(bar.getAttribute('aria-valuemax'))
    if (length) {
      data.length = length
    }
  }

  const volume = document.getElementById('volume-slider')
  if (volume) {
    data.volume = volume.getAttribute('value')
  }

  const isPlaying = document.querySelector('.play-pause-button.ytmusic-player-bar')
  if (isPlaying) {
    // TODO: Make this work in multiple languages
    data.isPlaying = isPlaying.getAttribute('title') === 'Pause'
  }

  return data
}

module.exports = getSongInfo
