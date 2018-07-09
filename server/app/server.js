const express = require('express')
const http = require('http')
const path = require('path')
const engines = require('consolidate')
const bodyParser = require('body-parser')
const { sequelize } = require('./tools/chargerModels')
const socketIO = require('socket.io')

const config = require('./config/config')
const router = require('./tools/chargerRouter')

const reload = require('reload')

module.exports = class Server {
  constructor () {
    this.port = config.server.port

    this.app = express()

    this.bodyParser()
    this.public()
    this.router()
    this.engine()

    this.server = http.createServer(this.app)

    this.socket()
  }

  bodyParser () {
    this.app.use(bodyParser.json())
  }

  public () {
    this.app.use('/public', express.static(path.join(__dirname, '../../client/public')))
    this.app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))
  }

  router () {
    this.app.use(router)
  }

  engine () {
    this.app.set('views', path.resolve(__dirname, '../../client/public'))

    this.app.engine('html', engines.swig)
  }

  socket () {
    const io = socketIO(this.server)

    io.on('connection', socket => {
      socket.on('HOLA', () => {
        console.log('RECIVIDO EL HOLA')
      })
    })
    // require('./tools/chargerSockets')
  }

  async start (callback) {
    try {
      await sequelize.sync({force: false})
      this.server.listen(this.port, callback(this.port))

    } catch (error) {
      console.error(error)
    }
  }

  reload () {
    reload(this.app)
  }

  static init () {
    return new Server()
  }
}
