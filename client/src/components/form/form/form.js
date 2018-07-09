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
    const spanText = document.createTextNode(this.title ? this.title : 'Form Title')

    title.appendChild(spanText)

    return title
  }

  headerButtons () {
    const buttons = document.createElement('div')
    buttons.classList.add('form__header__buttons')

    if (Array.isArray(this.buttons)) {
      for (const [index, btn] of this.buttons.entries()) {
        const button = document.createElement('button')
        button.classList.add('form__header__buttons__button')
        if (index === 0) button.classList.add('form__header__buttons__button--clear')
        button.setAttribute('type', 'button')
        button.setAttribute('id', btn.id)
        const buttonText = document.createTextNode(btn.title)

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

      form.insertBefore(this.Emitter.emit('[formError]:getErrors', {server: errors}), form.childNodes[1])
    }
  }
}

class Form extends FormElements {
  get getButtons () {
    return document.querySelectorAll('.form__header__buttons__button')
  }

  set setProps (props) {
    this.title = props.title
    this.buttons = props.buttons
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
        const moduleForm = document.createElement('div')
        moduleForm.classList.add('module__form')

        moduleForm.appendChild(this.container())

        const module = document.querySelector('.module')

        module.appendChild(moduleForm)
        break

      default:
        console.log(`%c No exists the output: %c"${this.output}"%c by this form container`, styleLogs.error, styleLogs.errorBold, styleLogs.error)
    }
  }

  listeners () {
    this.Emitter.on('[formForm]:lauchErrors', errors => {
      if (Array.isArray(errors)) this.groupErrors(errors)
    })

    this.Emitter.on('[formForm]:removeErrors', () => FormActions.removeErrors())
  }

  static init (Emitter, output) {
    return new Form(Emitter, output)
  }
}

module.exports = {FormForm: Form}
