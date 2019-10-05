const getSongInfo = require('./song_info')
const addCSS = require('./add_css')
const setTitle = require('./set_title')

function onPageLoad (win) {
  addCSS('main.css')

  setInterval(() => {
    setTitle(win, getSongInfo())
  }, 200)
}

module.exports = {
  onPageLoad: onPageLoad
}
