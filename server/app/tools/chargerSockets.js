const path = require('path')
const fs = require('fs')

const PackageSockets = {}

fs
  .readdirSync(path.resolve(__dirname, '../views'))
  .forEach(view => {
    PackageSockets[view] = {}

    fs
      .readdirSync(path.join(__dirname, '../views/', view, '/sockets'))
      .filter(file => file !== 'index.js')
      .forEach(file => {
        PackageSockets[view][file.split('.')[0]] = require(path.join(__dirname, '../views/', view, '/sockets/', file))
      })
  })

module.exports = {PackageSockets}
