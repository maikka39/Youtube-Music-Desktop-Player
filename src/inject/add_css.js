const remote = require('electron').remote
const fs = remote.require('fs')
const path = remote.require('path')

function addCSS (filepath) {
  filepath = path.join(__dirname, 'content', filepath)
  fs.readFile(filepath, (err, data) => {
    if (err) throw err

    const node = document.createElement('style')
    const textnode = document.createTextNode(data)
    node.appendChild(textnode)
    document.getElementsByTagName('head')[0].appendChild(node)
  })
}

module.exports = addCSS
