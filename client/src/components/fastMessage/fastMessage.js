import styleLogs from '|Assets/js/styleLogs.js'

class FastMessageActions {
  static destroyMessage (id) {
    const fastMessage = document.getElementById(id)
    const parent = fastMessage.parentElement

    parent.parentNode.removeChild(parent)
  }

  static hideMessageComplete (id, delay, callback) {
    const fastMessage = document.getElementById(id)

    if (fastMessage) {
      const parent = fastMessage.parentElement

      const translateStart = 0
      const translateEnd = 100

      setTimeout(() => {
        parent.style.setProperty('--fast-message-delay', delay + 'ms')
        parent.style.setProperty('--fast-message-translate-start', translateStart +  '%')
        parent.style.setProperty('--fast-message-translate-end', translateEnd +  '%')

        const newFastMessage = parent.cloneNode(true)
        parent.parentNode.replaceChild(newFastMessage, parent)

        callback()
      }, delay * 4)
    }
  }
}

class FastMessageElements {
  container () {
    const container = document.createElement('div')
    container.classList.add('fast-message')
    container.setAttribute('id', this.id)

    switch (this.type) {
      case 'success':
        container.classList.add('fast-message--success')
        break
    }

    container.appendChild(this.fastMessageTitle())
    container.appendChild(this.fastMessageContent())

    return container
  }

  fastMessageTitle () {
    const span = document.createElement('span')
    span.classList.add('fast-message__title')
    const spanText = document.createTextNode(this.title)

    span.appendChild(spanText)

    return span
  }

  fastMessageContent () {
    const p = document.createElement('p')
    p.classList.add('fast-message__content')
    const pText = document.createTextNode(this.content)

    p.appendChild(pText)

    return p
  }
}

class FastMessage extends FastMessageElements {
  set setProps (props) {
    this.id = props.id
    this.type = props.type
    this.title = props.title
    this.content = props.content

    this.building()
  }

  constructor (Emitter, output) {
    super()

    this.Emitter = Emitter
    this.listeners()

    this.output = output
  }

  building () {
    switch (this.output) {
      case 'module':
        const moduleFastMessage = document.createElement('div')
        moduleFastMessage.classList.add('module__fast-message')

        moduleFastMessage.appendChild(this.container())

        const module = document.querySelector('.module')

        module.appendChild(moduleFastMessage)
        break
      default:
        console.log(`%c No exists the output: %c"${this.output}"%c by this fastMessage container`, styleLogs.error, styleLogs.errorBold, styleLogs.error)
    }
  }

  listeners () {
    this.Emitter.on('[fastMessage]:hideMessageComplete', (props) => {
      this.setProps = props.setProps
      if (Object.keys(props).length) {
        FastMessageActions.hideMessageComplete(props.id, props.delay, () => {
          setTimeout(() => {
            FastMessageActions.destroyMessage(props.id)
          }, 1000)
        })
      }
    })
  }

  static init (Emitter, output) {
    return new FastMessage(Emitter, output)
  }
}

module.exports = {FastMessage}
