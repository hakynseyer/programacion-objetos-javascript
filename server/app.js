const Server = require('./app/server')

const hloo = Server.init()

hloo.start(port => {
  console.log(`\nServidor arrancando en el puerto ${port} :P`)
})

hloo.reload()
