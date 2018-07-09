const path = require('path')
const fs = require('fs')

let entriesJS = {}
let entriesPug = {}

fs
  .readdirSync(path.resolve(__dirname, '../src/views'))
  .forEach(folder => {
    entriesJS[folder] = path.join(__dirname, '../src/views/', folder, `${folder}.js`)
    entriesPug[folder] = folder + `/${folder}.pug`
  })

module.exports = {entriesJS, entriesPug}
