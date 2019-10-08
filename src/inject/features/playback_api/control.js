const selectors = {
  playPauseButton: "document.querySelector('.play-pause-button.ytmusic-player-bar')",
  nextButton: "document.querySelector('.next-button.ytmusic-player-bar')",
  previousButton: "document.querySelector('.previous-button.ytmusic-player-bar')",
  volumeSlider: "document.getElementById('volume-slider')",
  seekBar: "document.querySelector('#movie_player video')"
}

const objects = {}

function get (v) {
  // Return empty element if we can't find the object to prevent further errors
  return eval(selectors[v]) || document.createElement('p')
}

function toggle () {
  get('playPauseButton').click()
}

function next () {
  get('nextButton').click()
}

function previous () {
  get('previousButton').click()
}

function seek (time) {
  get('seekBar').currentTime = time
}

function setVolume (volume) {
  get('volumeSlider').setAttribute('value', volume)
}

module.exports = {
  toggle: toggle,
  next: next,
  skip: next,
  previous: previous,
  seek: seek,
  setVolume: setVolume
}
