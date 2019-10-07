const remote = require('electron').remote
const fs = remote.require('fs')
const path = remote.require('path')

function AddAssets () {
  this.addCSS = (filename) => {
    filepath = path.join(__dirname, '..', 'assets', filename)
    fs.readFile(filepath, (err, data) => {
      if (err) throw err

      const node = document.createElement('style')
      const textnode = document.createTextNode(data)
      node.appendChild(textnode)
      document.getElementsByTagName('head')[0].appendChild(node)
    })
  }

  this.addJS = (filename) => {
    const filepath = path.join(__dirname, '..', 'assets', filename)
    fs.readFile(filepath, (err, data) => {
      if (err) throw err

      const node = document.createElement('script')
      const textnode = document.createTextNode(data)
      node.appendChild(textnode)
      document.getElementsByTagName('body')[0].appendChild(node)
    })
  }
}

module.exports = AddAssets
