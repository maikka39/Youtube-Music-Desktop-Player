const selectors = {
  title: "document.querySelector('.ytmusic-player-bar.title')",
  artist: "document.querySelector('.ytmusic-player-bar.byline')",
  thumbnail: "document.querySelector('.ytmusic-player-bar > img')",
  progressBar: "document.querySelector('#progress-bar')",
  volume: "document.getElementById('volume-slider')",
  playButton: "document.querySelector('.play-pause-button.ytmusic-player-bar')"
}

const objects = {}

function get (v) {
  if (!objects[v]) {
    objects[v] = eval(selectors[v])
  }

  // Return empty element if we can't find the object to prevent further errors
  return objects[v] || document.createElement('p')
}

function getSongInfo () {
  const data = {}

  data.title = get('title').textContent || 'Unknown'
  data.artist = get('artist').textContent.split('•')[0].trim() || 'Unknown'
  data.thumbnail = get('thumbnail').getAttribute('src') || ''
  data.progress = parseInt(get('progressBar').getAttribute('value')) || 0
  data.length = parseInt(get('progressBar').getAttribute('aria-valuemax')) || 0
  data.volume = get('volume').getAttribute('value') || 100
  data.isPlaying = get('playButton').getAttribute('title') === 'Pause' // TODO: Make cross-language

  return data
}

module.exports = getSongInfo
