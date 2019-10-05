const { webContents, getCurrentWindow } = require('electron').remote
const features = require('./features/main')

const win = getCurrentWindow()
const contents = webContents.fromId(win.id)
contents.on('did-finish-load', onPageLoad)

function onPageLoad () {
  features.onPageLoad(win)
}
