import styleLogs from '|Assets/js/styleLogs.js'


class SmallTableEvents {
  static changeCheckboxIcon (checkbox, icons) {
    checkbox.addEventListener('click', e => {
      const element = checkbox.nextSibling.childNodes[0]
      element.removeAttribute('class')

      if (!checkbox.checked) element.setAttribute('class', icons.inactive)
      else element.setAttribute('class', icons.active)
      element.classList.add('table-small__body__row__column__actions__checkbox__label__icon')
    })
  }
}

class SmallTableElements {
  container () {
    const container = document.createElement('table')
    container.setAttribute('id', this.ID)
    container.classList.add('table-small')

    container.appendChild(this.sTHeader())
    container.appendChild(this.sTBody())

    return container
  }

  sTHeader () {
    const header = document.createElement('thead')
    header.classList.add('table-small__header')

    const row = document.createElement('tr')
    row.classList.add('table-small__header__row')

    for (const head of this.HEADER) {
      const column = document.createElement('th')
      column.classList.add('table-small__header__row__column')
      const columnText = document.createTextNode(head)

      column.appendChild(columnText)

      row.appendChild(column)
    }

    header.appendChild(row)

    return header
  }

  sTBody (bodyTable = null) {
    const tbody = document.createElement('tbody')
    tbody.classList.add('table-small__body')

    if (!bodyTable) bodyTable = this.BODY

    if (bodyTable) {
      for (const body of bodyTable) {
        const row = document.createElement('tr')
        row.classList.add('table-small__body__row')

        const renderBody = Object.assign({}, body)
        for (const noRender of body.NO_RENDER) {
          delete renderBody[noRender]
          delete renderBody.NO_RENDER
        }

        for (const data of Object.keys(renderBody)) {
          const column = document.createElement('td')
          column.classList.add('table-small__body__row__column')

          if (data === 'ACTIONS') column.appendChild(this.sTBodyActions(renderBody[data]))
          else {
            const columnText = document.createTextNode(renderBody[data])

            column.appendChild(columnText)
          }

          row.appendChild(column)
        }

        tbody.appendChild(row)
      }
    }

    return tbody
  }

  sTBodyActions (actions) {
    const column = document.createElement('div')
    column.classList.add('table-small__body__row__column__actions')

    for (const action of Object.keys(actions)) {
      switch (action) {
        case 'edit':
          const edit = document.createElement('div')
          edit.classList.add('table-small__body__row__column__actions__edit')

          const buttonEdit = document.createElement('button')
          buttonEdit.setAttribute('type', 'button')
          buttonEdit.classList.add('table-small__body__row__column__actions__edit__button')

          const iconEdit = document.createElement('i')
          iconEdit.setAttribute('class', actions[action].icon)
          iconEdit.classList.add('table-small__body__row__column__actions__edit__button__icon')

          buttonEdit.appendChild(iconEdit)

          edit.appendChild(buttonEdit)

          column.appendChild(edit)
          break
        case 'checkbox':
          const checkbox = document.createElement('div')
          checkbox.classList.add('table-small__body__row__column__actions__checkbox')

          const inputCheckbox = document.createElement('input')
          inputCheckbox.setAttribute('type', 'checkbox')
          inputCheckbox.setAttribute('id', actions[action].id)
          inputCheckbox.classList.add('table-small__body__row__column__actions__checkbox__input')

          if (actions[action].state) inputCheckbox.checked = true
          else inputCheckbox.checked = false

          checkbox.appendChild(inputCheckbox)

          const labelCheckbox = document.createElement('label')
          labelCheckbox.classList.add('table-small__body__row__column__actions__checkbox__label')
          labelCheckbox.setAttribute('for', actions[action].id)

          const iconCheckbox = document.createElement('i')
          if (actions[action].state) iconCheckbox.setAttribute('class', actions[action].icons.active)
          else iconCheckbox.setAttribute('class', actions[action].icons.inactive)
          iconCheckbox.classList.add('table-small__body__row__column__actions__checkbox__label__icon')

          labelCheckbox.appendChild(iconCheckbox)

          checkbox.appendChild(labelCheckbox)

          column.appendChild(checkbox)

          SmallTableEvents.changeCheckboxIcon(inputCheckbox, actions[action].icons)
          break
      }
    }

    return column
  }
}

class TableSmall extends SmallTableElements {
  get getCheckboxes () {
    const checkboxes = []

    const rows = document.querySelectorAll('.table-small__body__row__column__checkbox')

    for (const row of rows) checkboxes.push(row.childNodes[0])

    return checkboxes
  }

  set setProps (props) {
    this.HEADER = props.HEADER
    this.ID = props.ID
    this.BODY = props.BODY

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
        const pastTable = document.querySelector('.module__table-small')

        if (pastTable) pastTable.parentNode.removeChild(pastTable)

        const moduleSmallTable = document.createElement('div')
        moduleSmallTable.classList.add('module__table-small')

        moduleSmallTable.appendChild(this.container())

        const module = document.querySelector('.module')

        module.appendChild(moduleSmallTable)
        break
      default:
        console.log(`%c No exists the output: %c"${this.OUTPUT}"%c by this tableSmall container`, styleLogs.error, styleLogs.errorBold, styleLogs.error)
    }
  }

  listeners () {
    _EMITTER.on('[tableSmall]:building', props => {
      this.setProps = props
    })

    _EMITTER.on('[tableSmall]:addBody', props => {
      const table = document.getElementById(props.ID)

      if (table && table.childNodes.length > 1) {
        table.removeChild(table.lastChild)
        table.appendChild(this.sTBody(props.BODY))
      } else table.appendChild(this.sTBody(props.BODY))
    })

    _EMITTER.on('[tableSmall]:cleaner', tableID => {
      const table = document.getElementById(tableID)

      if (table && table.childNodes.length > 1) table.removeChild(table.lastChild)
    })
  }

  static init (output) {
    return new TableSmall(output)
  }
}

module.exports = {TableSmall: TableSmall}
