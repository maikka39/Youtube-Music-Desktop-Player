function setTitle (win, info) {
  if (info.title === 'Unknown') {
    win.setTitle('YouTube Music Desktop Player')
    return
  }

  let playing = ''
  if (!info.isPlaying) {
    playing = '(Paused) '
  }
  win.setTitle(playing + info.title + ' - ' + info.artist)
}

module.exports = setTitle
