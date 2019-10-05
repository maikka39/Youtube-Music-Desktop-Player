const getSongInfo = require('./song_info')

let playPauseButton
let nextButton
let previousButton
let volumeSlider

function checkPlayPauseButton () {
  if (!playPauseButton) {
    playPauseButton = document.querySelector('.play-pause-button.ytmusic-player-bar')
  }

  return !!playPauseButton
}

function checkNextButton () {
  if (!nextButton) {
    nextButton = document.querySelector('.next-button.ytmusic-player-bar')
  }

  return !!nextButton
}

function checkPreviousButton () {
  if (!previousButton) {
    previousButton = document.querySelector('.previous-button.ytmusic-player-bar')
  }

  return !!previousButton
}

function play () {
  if (checkPlayPauseButton()) {
    if (!getSongInfo().isPlaying) {
      playPauseButton.click()
    }
  }
}

function pause () {
  if (checkPlayPauseButton()) {
    if (getSongInfo().isPlaying) {
      playPauseButton.click()
    }
  }
}

function toggle () {
  if (checkPlayPauseButton()) {
    playPauseButton.click()
  }
}

function next () {
  if (checkNextButton()) {
    nextButton.click()
  }
}

function previous () {
  if (checkPreviousButton()) {
    previousButton.click()
  }
}

function setVolume (volume) {
  document.getElementById('volume-slider').setAttribute('value', volume)
}

module.exports = {
  play: play,
  pause: pause,
  toggle: toggle,
  next: next,
  skip: next,
  previous: previous,
  setVolume: setVolume
}
