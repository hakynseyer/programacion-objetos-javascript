import { Random } from '|Assets/js/tools.js'

class CheckboxActions {
  static removeErrors (name) {
    const checkbox = document.getElementsByName(name)

    if (checkbox.length) {
      const parent = checkbox[0].parentElement

      if (parent.childNodes.length > 2) {
        while (parent.childNodes.length > 2) parent.removeChild(parent.lastChild)
      }
    }
  }
}

class CheckboxEvents {
  constructor (checkboxes) {
    this.changeIcon(checkboxes)
  }

  changeIcon (checkboxes) {
    for (const checkbox of checkboxes) {
      checkbox.addEventListener('click', e => {
        if (!checkbox.checked) checkbox.nextSibling.style.setProperty('--icon-checkbox', '"\\f0c8"')
        else checkbox.nextSibling.style.setProperty('--icon-checkbox', '"\\f14a"')
      })
    }
  }
}

class CheckboxElements {
  container () {
    const container = document.createElement('div')
    container.classList.add('form__group')

    container.appendChild(this.groupLabel())
    container.appendChild(this.groupCheckboxes())

    return container
  }

  groupLabel () {
    return _EMITTER.emit('[formLabel]:getLabel', {
      id: null,
      label: this.LABEL
    })
  }

  groupCheckboxes () {
    const checkboxes = document.createElement('div')
    checkboxes.classList.add('form__group__checkboxes')

    if (Array.isArray(this.CHECKBOXES)) {
      for (const check of this.CHECKBOXES) {
        const checkbox = document.createElement('input')
        checkbox.classList.add('form__group__checkboxes__checkbox')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.setAttribute('name', this.NAME ? this.NAME : `checkbox${Random.basic(20)}`)
        if (check.VALUE) checkbox.setAttribute('value', check.VALUE)
        checkbox.setAttribute('id', check.ID)

        const labelCheckbox = document.createElement('label')
        labelCheckbox.classList.add('form__group__checkboxes__label')
        labelCheckbox.setAttribute('for', check.ID)
        if (Array.isArray(check.LABEL)) {
          const labelCheckboxText = document.createTextNode(check.LABEL[0])
          labelCheckbox.appendChild(labelCheckboxText)
        } else {
          const labelCheckboxText = document.createTextNode(check.LABEL)
          labelCheckbox.appendChild(labelCheckboxText)
        }

        checkboxes.appendChild(checkbox)
        checkboxes.appendChild(labelCheckbox)
      }
    }

    return checkboxes
  }

  groupErrors (name, errors) {
    const checkbox = document.getElementsByName(name)

    if (checkbox.length) {
      const parent = checkbox[0].parentElement

      if (parent.childNodes.length > 2) {
        while (parent.childNodes.length > 2) parent.removeChild(parent.lastChild)
      }

      parent.appendChild(_EMITTER.emit('[formError]:getErrors', {fields: errors}))
    }
  }
}

class Checkbox extends CheckboxElements {
  get getCheckboxes () {
    return document.getElementsByName(this.NAME)
  }

  set setProps (props) {
    this.LABEL = props.LABEL
    this.CHECKBOXES = props.CHECKBOXES
    this.NAME = props.NAME

    this.building()
  }

  constructor () {
    super()

    this.listeners()
  }

  building () {
    const form = document.querySelector('.form')

    form.appendChild(this.container())

    new CheckboxEvents(this.getCheckboxes)
  }

  listeners () {
    _EMITTER.on('[formCheckbox]:isChecked', (name = null) => {
      let checked = []

      if (name) {
        const checkboxes = document.getElementsByName(name)

        for (const checkbox of checkboxes) {
          checked[checkbox.nextSibling.textContent] = checkbox.checked
        }
      }

      return checked
    })

    _EMITTER.on('[formCheckbox]:clearField', (name = null) => {
      if (name) {
        const checkboxes = document.getElementsByName(name)

        for (const checkbox of checkboxes) {
          checkbox.checked = false
          checkbox.nextSibling.style.setProperty('--icon-checkbox', '"\\f0c8"')
        }
      }
    })

    _EMITTER.on('[formCheckbox]:lauchErrors', data => {
      if (typeof data.name === 'string' && Array.isArray(data.errors)) {
        if (data.errors.length) this.groupErrors(data.name, data.errors)
      }
    })

    _EMITTER.on('[formCheckbox]:removeErrors', (name = null) => {
      if (name) CheckboxActions.removeErrors(name)
    })
  }

  static init () {
    return new Checkbox()
  }
}

module.exports = {FormCheckbox: Checkbox}
