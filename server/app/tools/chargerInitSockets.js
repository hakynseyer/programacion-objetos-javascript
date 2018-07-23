const path = require('path')
const fs = require('fs')

const { PackageSockets } = require('./chargerSockets')

module.exports = SocketGL => {
  SocketGL.on('connection', SocketID => {
    console.log(`\n New connection ${SocketID.id}`)

    fs
      .readdirSync(path.resolve(__dirname, '../views'))
      .forEach(view => {
        require(path.join(__dirname, '../views/', view, '/sockets/index.js'))(SocketGL, SocketID, PackageSockets)
      })
  })
}
