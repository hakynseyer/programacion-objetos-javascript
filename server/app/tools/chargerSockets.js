const path = require('path')
const fs = require('fs')

module.exports = io => {
  io.on('connection', socket => {
    console.log('Nueva conexion' + socket)

    fs
      .readdirSync(path.resolve(__dirname, '../views'))
      .forEach(view => {
        console.log(path.join(__dirname, '../views/', view, '/sockets/index.js'))
      })
  })
}
