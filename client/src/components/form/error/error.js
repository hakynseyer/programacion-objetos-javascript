class ErrorElements {
  container () {
    const container = document.createElement('div')
    container.classList.add('form__errors')

    if (typeof this.errorsFields !== 'undefined') container.appendChild(this.errorsField())
    else if (typeof this.errorsServer !== 'undefined') {
      container.setAttribute('id', 'formErrorsServer')
      container.appendChild(this.errorsServ())
    }

    return container
  }

  errorsField () {
    const fields = document.createElement('div')
    fields.classList.add('form__errors__fields')

    for (const error of this.errorsFields) {
      const span = document.createElement('span')
      span.classList.add('form__errors__fields__error')
      const spanText = document.createTextNode(error)

      span.appendChild(spanText)

      fields.appendChild(span)
    }

    return fields
  }

  errorsServ() {
    const server = document.createElement('div')
    server.classList.add('form__errors__server')

    for (const error of this.errorsServer) {
      const span = document.createElement('span')
      span.classList.add('form__errors__server__error')
      const spanText = document.createTextNode(error)

      span.appendChild(spanText)

      server.appendChild(span)
    }

    return server
  }
}

class Error extends ErrorElements {
  get getErrors () {
    return this.container()
  }

  set setErrorsFields (errors) {
    this.errorsFields = errors
  }

  set setErrorsServer (errors) {
    this.errorsServer = errors
  }

  constructor () {
    super()

    this.listeners()
  }

  listeners () {
    _EMITTER.on('[formError]:getErrors', data => {
      if (typeof data.fields !== 'undefined') {
        this.setErrorsFields = data.fields

        return this.getErrors
      } else if (typeof data.server !== 'undefined') {
        this.setErrorsServer = data.server

        return this.getErrors
      }
    })
  }

  static init () {
    return new Error()
  }
}

module.exports = {FormError: Error}
