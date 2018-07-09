import styleLogs from '|Assets/js/styleLogs.js'


class SmallTableEvents {
  static changeIcon (checkboxes, icons) {
    for (const checkbox of checkboxes) {
      checkbox.addEventListener('click', e => {
        const element = checkbox.nextSibling.childNodes[0]
        element.removeAttribute('class')

        if (!checkbox.checked) element.setAttribute('class', icons.inactive)
        else element.setAttribute('class', icons.active)
      })
    }
  }
}

class SmallTableElements {
  container () {
    const container = document.createElement('table')
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

    for (const head of this.header) {
      const column = document.createElement('th')
      column.classList.add('table-small__header__row__column')
      const columnText = document.createTextNode(head)

      column.appendChild(columnText)

      row.appendChild(column)
    }

    header.appendChild(row)

    return header
  }

  sTBody () {
    const tbody = document.createElement('tbody')
    tbody.classList.add('table-small__body')

    for (const body of this.body) {
      const row = document.createElement('tr')
      row.classList.add('table-small__body__row')

      for (const data of Object.keys(body)) {
        const column = document.createElement('td')
        column.classList.add('table-small__body__row__column')

        if (data === 'checkbox') column.appendChild(this.sTBodyCheckbox(body[data]))
        else {
          const columnText = document.createTextNode(body[data])

          column.appendChild(columnText)
        }

        row.appendChild(column)
      }

      tbody.appendChild(row)
    }

    return tbody
  }

  sTBodyCheckbox(data) {
    const column = document.createElement('div')
    column.classList.add('table-small__body__row__column__checkbox')

    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('id', data.id)
    checkbox.classList.add('table-small__body__row__column__checkbox__input')

    if (data.state) checkbox.checked = true
    else checkbox.checked = false

    column.appendChild(checkbox)

    const label = document.createElement('label')
    label.setAttribute('for', data.id)

    const icon = document.createElement('i')
    if (this.icons !== null) {
      if (data.state) icon.setAttribute('class', this.icons.active)
      else icon.setAttribute('class', this.icons.inactive)
    }

    label.appendChild(icon)

    column.appendChild(label)

    return column
  }
}

class SmallTable extends SmallTableElements {
  get getCheckboxes () {
    const checkboxes = []

    const rows = document.querySelectorAll('.table-small__body__row__column__checkbox')

    for (const row of rows) checkboxes.push(row.childNodes[0])

    return checkboxes
  }

  set setProps(props) {
    this.header = props.header
    this.icons = typeof props.icons !== 'undefined' ? props.icons : null,
    this.body = props.body

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
        const moduleSmallTable = document.createElement('div')
        moduleSmallTable.classList.add('module__small-table')

        moduleSmallTable.appendChild(this.container())

        const module = document.querySelector('.module')

        module.appendChild(moduleSmallTable)
        break
      default:
        console.log(`%c No exists the output: %c"${this.output}"%c by this smallTable container`, styleLogs.error, styleLogs.errorBold, styleLogs.error)
    }

    SmallTableEvents.changeIcon(this.getCheckboxes, this.icons)
  }

  listeners () {
    this.Emitter.on('[smallTable]:building', props => {
      this.setProps = props
    })
  }

  static init (Emitter, output) {
    return new SmallTable(Emitter, output)
  }
}

module.exports = {SmallTable}
