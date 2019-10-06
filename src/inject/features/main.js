const getSongInfo = require('./song_info')
const addCSS = require('./add_css')
const setTitle = require('./set_title')
const mprisService = require('./mpris_service')

function onPageLoad (win) {
  addCSS('main.css')

  setInterval(() => {
    const info = getSongInfo()
    setTitle(win, info)
    mprisService.onSongInfoUpdated(info)
    mprisService.onSeeked(info.progress)
    mprisService.onPlaybackStateChange(info.isPlaying)
    mprisService.onVolumeChange(info.volume)
  }, 1000)
}

module.exports = {
  onPageLoad: onPageLoad
}
