import styleLogs from '|Assets/js/styleLogs.js'

class FormActions {
  static removeErrors () {
    const form = document.querySelector('.form')

    if (form.length) {
      for (const child of form.childNodes) {
        if (child.id === 'formErrorsServer') form.removeChild(document.getElementById('formErrorsServer'))
      }
    }
  }
}

class FormElements {
  container () {
    const container = document.createElement('form')
    container.classList.add('form')
    container.setAttribute('autocomplete', 'off')
    container.setAttribute('ectype', 'multipart/form-data')

    container.appendChild(this.header())

    return container
  }

  header () {
    const header = document.createElement('div')
    header.classList.add('form__header')

    header.appendChild(this.headerTitle())
    header.appendChild(this.headerButtons())

    return header
  }

  headerTitle () {
    const title = document.createElement('span')
    title.classList.add('form__header__title')
    const spanText = document.createTextNode(this.TITLE ? this.TITLE : 'Form Title')

    title.appendChild(spanText)

    return title
  }

  headerButtons () {
    const buttons = document.createElement('div')
    buttons.classList.add('form__header__buttons')

    if (Array.isArray(this.BUTTONS)) {
      for (const [index, btn] of this.BUTTONS.entries()) {
        const button = document.createElement('button')
        button.classList.add('form__header__buttons__button')
        if (index === 0) button.classList.add('form__header__buttons__button--clear')
        button.setAttribute('type', 'button')
        button.setAttribute('id', btn.ID)
        const buttonText = document.createTextNode(btn.TITLE)

        button.appendChild(buttonText)

        buttons.appendChild(button)
      }
    }

    return buttons
  }

  groupErrors (errors) {
    const form = document.querySelector('.form')

    if (form.length) {
      for (const child of form.childNodes) {
        if (child.id === 'formErrorsServer') form.removeChild(document.getElementById('formErrorsServer'))
      }

      form.insertBefore(_EMITTER.emit('[formError]:getErrors', {server: errors}), form.childNodes[1])
    }
  }
}

class Form extends FormElements {
  get getButtons () {
    return document.querySelectorAll('.form__header__buttons__button')
  }

  set setProps (props) {
    this.TITLE = props.TITLE
    this.BUTTONS = props.BUTTONS
    this.building()
  }

  constructor (output) {
    super()

    this.listeners()

    this.OUTPUT = output
  }

  building () {
    switch (this.OUTPUT) {
      case 'module':
        const moduleForm = document.createElement('div')
        moduleForm.classList.add('module__form')

        moduleForm.appendChild(this.container())

        const module = document.querySelector('.module')

        module.appendChild(moduleForm)
        break

      default:
        console.log(`%c No exists the output: %c"${this.OUTPUT}"%c by this form container`, styleLogs.error, styleLogs.errorBold, styleLogs.error)
    }
  }

  listeners () {
    _EMITTER.on('[formForm]:lauchErrors', errors => {
      if (Array.isArray(errors)) this.groupErrors(errors)
    })

    _EMITTER.on('[formForm]:removeErrors', () => FormActions.removeErrors())
  }

  static init (output) {
    return new Form(output)
  }
}

module.exports = {FormForm: Form}
