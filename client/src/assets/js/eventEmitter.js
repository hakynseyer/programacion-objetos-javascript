import styleLogs from '|Assets/js/styleLogs.js'

class EventEmitter {
  constructor () {
    this.events = {}
  }

  on (eventName, func) {
    if (typeof this.events[eventName] === 'undefined') this.events[eventName] = null

    this.events[eventName] = func
  }

  clear (eventName) {
    delete(this.events[eventName])
  }

  emit (eventName, data) {
    if (typeof this.events[eventName] !== 'undefined') {
      return this.events[eventName].call(null, data)

    } else console.log(`%cNo exists the event %c"${eventName}"`, styleLogs.error, styleLogs.errorBold)
  }

  get checkEvents () {
    for (const eventName of Object.keys(this.events)) {
      console.log(`%cThe event: %c${eventName} %chas %c${this.events[eventName].length} %carguments`, styleLogs.normal, styleLogs.purpleBold, styleLogs.normal, styleLogs.purpleBold, styleLogs.normal)
    }
  }
}

module.exports = new EventEmitter()

// Example
// const emmiter = new EventEmitter()
// const destroy = emmiter.on('evento1', (saludo) => {
//   console.log(saludo)
//   destroy()
// })

// emmiter.emit('evento1', 'HOLA AMIGO')
// emmiter.emit('evento1', 'ADIOS A TODOS')

// emmiter.checkEvents
