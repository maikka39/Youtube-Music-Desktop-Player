function getSongInfo () {
  const bar = document.querySelector('#progress-bar')

  return {
    title: document.querySelector('.ytmusic-player-bar.title').textContent,
    artist: document.querySelector('.ytmusic-player-bar.byline').textContent.split('•')[0].slice(0, -1),
    thumbnail: document.querySelector('.ytmusic-player-bar > img').getAttribute('src'),
    progress: parseInt(bar.getAttribute('value')),
    length: parseInt(bar.getAttribute('aria-valuemax')),
    // TODO: Change so that is works in multiple languages
    isPlaying: document.querySelector('.play-pause-button.ytmusic-player-bar').getAttribute('title') == 'Pause'
  }
}

module.exports = getSongInfo
