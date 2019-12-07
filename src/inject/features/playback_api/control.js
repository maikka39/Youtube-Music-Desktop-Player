/* eslint-disable no-undef */
function toggle () {
  if (player.playerApi_.getPlayerState() === 1) {
    pause()
    return
  }

  play()
}

function play () {
  player.playerApi_.playVideo()
}

function pause () {
  player.playerApi_.pauseVideo()
}

function next () {
  player.playerApi_.nextVideo()
}

function previous () {
  player.playerApi_.previousVideo()
}

function seek (time) {
  player.playerApi_.seekTo(time)
}

function seekBy (time) {
  player.playerApi_.seekBy(time)
}

function setVolume (volume) {
  player.playerApi_.setVolume(volume)
}

module.exports = {
  toggle: toggle,
  play: play,
  pause: pause,
  next: next,
  skip: next,
  previous: previous,
  seek: seek,
  seekBy: seekBy,
  setVolume: setVolume
}
