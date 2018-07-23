class SelectEvents {
  static selectOption (options) {
    for (const option of options) {
      option.addEventListener('click', e => {
        const base = option.parentNode.previousSibling
        base.childNodes[0].textContent = option.textContent
        base.childNodes[1].value = option.nextSibling.value

        option.parentNode.classList.remove('form__group__select__options--show')
      })
    }
  }

  static showOptions () {
    const selects = document.querySelectorAll('.form__group__select__base')

    for (const select of selects) {
      select.addEventListener('click', e => {
        const options = select.nextSibling
        options.classList.add('form__group__select__options--show')
      })

      SelectEvents.selectOption(select.nextSibling.childNodes)
    }
  }
}

class SelectElements {
  container () {
    let container = document.createElement('div')
    container.classList.add('form__group')

    if (this.CONFIG.LABEL) container.appendChild(this.selectLabel())

    const select = document.createElement('div')
    select.setAttribute('id', this.ID)
    select.classList.add('form__group__select')

    select.appendChild(this.selectBase())
    select.appendChild(this.selectOptions())

    switch (this.CONFIG.THEME) {
      case 'form':
        select.classList.add('form__group__select--form')

        container.appendChild(select)
        break
      case 'ordering':
        select.classList.add('form__group__select--ordering')

        container = select
        break
      default:
        select.classList.add('form__group__select--form')
    }

    return container
  }

  selectLabel () {
    return _EMITTER.emit('[formLabel]:getLabel', {
      id: this.ID,
      label: this.LABEL
    })
  }

  selectBase () {
    const div = document.createElement('div')
    div.classList.add('form__group__select__base')
    if (this.CONFIG.ICON) div.classList.add('form__group__select__base--icon')

    const label = document.createElement('label')
    label.classList.add('form__group__select__base__option-choosen')

    switch (this.CONFIG.THEME) {
      case 'ordering':
        label.classList.add('form__group__select__base__option-choosen--ordering')
        break
    }

    const labelText = document.createTextNode(this.LABEL_BASE_DEFAULT)

    label.appendChild(labelText)

    div.appendChild(label)

    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('value', null)

    div.appendChild(input)

    return div
  }

  selectOptions () {
    const div = document.createElement('div')
    div.classList.add('form__group__select__options')

    if (this.OPTIONS.length) {
      for (const option of this.OPTIONS) {
        const label = document.createElement('label')
        label.classList.add('form__group__select__options__option')

        switch (this.CONFIG.THEME) {
          case 'ordering':
            label.classList.add('form__group__select__options__option--ordering')
            break
        }

        const labelText = document.createTextNode(option.label)

        label.appendChild(labelText)

        div.appendChild(label)

        if (typeof option.value === 'object') {
          const input = document.createElement('input')
          input.setAttribute('type', 'hidden')
          input.setAttribute('value', JSON.stringify(option.value).replace(/"/gi, '&quot;'))

          div.appendChild(input)
        }
      }
    }

    return div
  }
}

class Select extends SelectElements {
  set setProps (props) {
    this.ID = props.ID

    if (typeof props.CONFIG !== 'undefined') {
      const icon = typeof props.CONFIG.ICON !== 'undefined' ? props.CONFIG.ICON : true
      const theme = typeof props.CONFIG.THEME !== 'undefined' ? props.CONFIG.THEME : 'default'
      const label = typeof props.CONFIG.LABEL !== 'undefined' ? props.CONFIG.LABEL : true

      this.CONFIG = {
        THEME: theme,
        ICON: icon,
        LABEL: label
      }
    } else {
      this.CONFIG = {
        THEME: 'form',
        ICON: true,
        LABEL: true
      }
    }

    this.LABEL = props.LABEL
    this.LABEL_BASE_DEFAULT = props.LABEL_BASE_DEFAULT
    this.OPTIONS = props.OPTIONS

    this.building()
  }

  constructor (output = 'form') {
    super()

    this.listeners()

    this.OUTPUT = output
  }

  building () {

    switch (this.OUTPUT) {
      case 'form':
        const form = document.querySelector('.form')

        form.appendChild(this.container())

        break
      case 'ordering':
        const ordering = document.querySelector('.ordering__options')

        ordering.appendChild(this.container())
        break
    }

    SelectEvents.showOptions()
  }

  listeners () {
    _EMITTER.on('[formSelect]:getValue', (id = null) => {
      let value = null

      if (id) {
        const select = document.getElementById(id)
        const selectValue = select.childNodes[0].getElementsByTagName('input')[0].value

        if (selectValue) value = JSON.parse(selectValue.replace(/&quot;/gi, '"'))
      }

      return value
    })

    _EMITTER.on('[formSelect]:building', props => {
      this.OUTPUT = props.OUTPUT
      this.setProps = props
    })

    _EMITTER.on('[formSelect]:reset', (id = null) => {
      if (id) {
        const select = document.getElementById(id)

        const selectBase = select.firstChild
        selectBase.childNodes[0].textContent = this.LABEL_BASE_DEFAULT
        selectBase.childNodes[1].value = 'null'
      }
    })
  }

  static init (output) {
    return new Select(output)
  }
}

module.exports = {FormSelect: Select}
