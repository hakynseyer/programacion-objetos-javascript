import { Random } from '|Assets/js/tools.js'

class InputActions {
  static removeErrors (name) {
    const input = document.getElementsByName(name)

    if (input.length) {
      const parent = input[0].parentElement

      if (parent.childNodes.length > 2) {
        while (parent.childNodes.length > 2) parent.removeChild(parent.lastChild)
      }
    }
  }
}

class InputElements {
  container () {
    const container = document.createElement('div')
    container.classList.add('form__group')

    if (!this.name) this.name = `label${Random.basic(20)}`

    container.appendChild(this.groupLabel())
    container.appendChild(this.groupInput())

    return container
  }

  groupLabel () {
    return this.Emitter.emit('[formLabel]:getLabel', (
      {
        id: this.name,
        label: this.label,
      }
    ))
  }

  groupInput () {
    const input = document.createElement('input')
    input.classList.add('form__group__input')
    input.setAttribute('id', this.name)
    input.setAttribute('name', this.name)
    input.setAttribute('type', this.type ? this.type : 'text')

    return input
  }

  groupErrors (name, errors) {
    const input = document.getElementsByName(name)

    if (input.length) {
      const parent = input[0].parentElement

      if (parent.childNodes.length > 2) {
        while (parent.childNodes.length > 2) parent.removeChild(parent.lastChild)
      }

      parent.appendChild(this.Emitter.emit('[formError]:getErrors', {fields: errors}))
    }
  }
}

class Input extends InputElements {
  set setProps (props) {
    this.label = props.label
    this.type = props.type
    this.name = props.name

    this.building()
  }

  constructor (Emitter) {
    super()

    this.Emitter = Emitter
    this.listeners()
  }

  building () {
    const form = document.querySelector('.form')

    form.appendChild(this.container())
  }

  listeners () {
    /**
     * @description Todas las funciones del emitter requieren por obligación la especificación del atributo name (Si es que se require) para poder acceder al DOM de dicho objeto. Esto es debido a que cuando se llama a la creación de un nuevo objeto de este componente, los emitter.on sobrescribirán las funciones hasta obtener por defecto todas las propiedades del último objeto creado, es por eso que this.name siempre tendrá el valor del último objeto creado.
     */
    this.Emitter.on('[formInput]:getValue', (name = null) => {
      let value = null

      if (name) value = document.getElementsByName(name)[0].value

      return value
    })

    this.Emitter.on('[formInput]:clearField', (name = null) => {
      if (name) document.getElementsByName(name)[0].value = ''
    })

    this.Emitter.on('[formInput]:lauchErrors', data => {
      if (typeof data.name === 'string' && Array.isArray(data.errors)) {
        if (data.errors.length) this.groupErrors(data.name, data.errors)
      }
    })

    this.Emitter.on('[formInput]:removeErrors', (name = null) => {
      if (name) InputActions.removeErrors(name)
    })
  }

  static init (Emitter) {
    return new Input(Emitter)
  }
}

module.exports = {FormInput: Input}
