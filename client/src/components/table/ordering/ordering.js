import styleLogs from '|Assets/js/styleLogs.js'

class OrderingActions {
  static searching (search, value, table) {
    const body = _EMITTER.emit('[tableOrdering]:getBody')
    const bodyClone = body.slice(0)

    let newBody = null

    newBody = bodyClone.filter(body => {
      for (const searchKey of search) {
        if (typeof body[searchKey] !== 'undefined') {
          let regExp = new RegExp('.*' + value + '.*')
          return regExp.test(body[searchKey])
        }
      }
    })

    if (newBody) {
      _EMITTER.emit('[tableSmall]:addBody', {
        ID: table,
        BODY: newBody
      })
    }

  }
}

class OrderingEvents {
  static orderingUp (up, idSelect, table) {
    up.addEventListener('click', e => {
      const selectValue = _EMITTER.emit('[formSelect]:getValue', idSelect)
      const body = _EMITTER.emit('[tableOrdering]:getBody')
      const bodyClone = body.slice(0)

      if (selectValue) {
        up.childNodes[0].classList.add('ordering__buttons__button__icon--active')
        up.nextSibling.childNodes[0].classList.remove('ordering__buttons__button__icon--active')

        let newBody = null

        switch (selectValue.order.type) {
          case 'string':
            newBody = bodyClone.sort((a, b) => {
              return a[selectValue.order.order] > b[selectValue.order.order]
            })
            break
          case 'date':
            newBody = bodyClone.sort((a, b) => {
              return Date.parse(a[selectValue.order.order]) - Date.parse(b[selectValue.order.order])
            })
            break
        }

        if (newBody) {
          _EMITTER.emit('[tableSmall]:addBody', {
            ID: table,
            BODY: newBody
          })
        }
      }
    })
  }

  static orderingDown (down, idSelect, table) {
    down.addEventListener('click', e => {
      const selectValue = _EMITTER.emit('[formSelect]:getValue', idSelect)
      const body = _EMITTER.emit('[tableOrdering]:getBody')
      const bodyClone = body.slice(0)

      if (selectValue) {
        down.childNodes[0].classList.add('ordering__buttons__button__icon--active')
        down.previousSibling.childNodes[0].classList.remove('ordering__buttons__button__icon--active')

        let newBody = null

        switch (selectValue.order.type) {
          case 'string':
            newBody = bodyClone.sort((a, b) => {
              return a[selectValue.order.order] < b[selectValue.order.order]
            })
            break
          case 'date':
            newBody = bodyClone.sort((a, b) => {
              return Date.parse(a[selectValue.order.order]) + Date.parse(b[selectValue.order.order])
            })
            break
        }

        if (newBody) {
          _EMITTER.emit('[tableSmall]:addBody', {
            ID: table,
            BODY: newBody
          })
        }
      }
    })
  }

  static orderingRefresh (refresh, table, select) {
    refresh.addEventListener('click', e => {
      refresh.previousSibling.childNodes[0].classList.remove('ordering__buttons__button__icon--active')
      refresh.previousSibling.previousSibling.childNodes[0].classList.remove('ordering__buttons__button__icon--active')

      _EMITTER.emit('[formSelect]:reset', select)

      const body = _EMITTER.emit('[tableOrdering]:getBody')

      _EMITTER.emit('[tableSmall]:addBody', {
        ID: table,
        BODY: body
      })
    })
  }
}

class OrderingElements {
  container () {
    const container = document.createElement('div')
    container.classList.add('ordering')

    container.appendChild(this.orderingOptions())
    container.appendChild(this.orderingButtons())

    return container
  }

  orderingOptions () {
    const options = document.createElement('div')
    options.classList.add('ordering__options')

    const label = document.createElement('label')
    label.classList.add('ordering__options__label')
    label.setAttribute('for', this.ID)
    const labelText = document.createTextNode(this.LABEL)

    label.appendChild(labelText)

    options.appendChild(label)

    return options
  }

  orderingButtons () {
    const buttons = document.createElement('div')
    buttons.classList.add('ordering__buttons')

    const leftButton = document.createElement('button')
    leftButton.classList.add('ordering__buttons__button')
    leftButton.setAttribute('type', 'button')

    const leftButtonIcon = document.createElement('i')
    leftButtonIcon.setAttribute('class', 'fas fa-sort-alpha-up')
    leftButtonIcon.classList.add('ordering__buttons__button__icon')

    leftButton.appendChild(leftButtonIcon)

    OrderingEvents.orderingUp(leftButton, this.ID, this.TABLE)

    buttons.appendChild(leftButton)

    const rightButton = document.createElement('button')
    rightButton.classList.add('ordering__buttons__button')
    rightButton.setAttribute('type', 'button')

    const rightButtonIcon = document.createElement('i')
    rightButtonIcon.setAttribute('class', 'fas fa-sort-alpha-down')
    rightButtonIcon.classList.add('ordering__buttons__button__icon')

    rightButton.appendChild(rightButtonIcon)

    OrderingEvents.orderingDown(rightButton, this.ID, this.TABLE)

    buttons.appendChild(rightButton)

    const refreshButton = document.createElement('button')
    refreshButton.classList.add('ordering__buttons__button')
    refreshButton.setAttribute('type', 'button')

    const refreshButtonIcon = document.createElement('i')
    refreshButtonIcon.setAttribute('class', 'fas fa-sync-alt')
    refreshButtonIcon.classList.add('ordering__buttons__button__icon')
    refreshButtonIcon.classList.add('ordering__buttons__button__icon--refresh')

    refreshButton.appendChild(refreshButtonIcon)

    OrderingEvents.orderingRefresh(refreshButton, this.TABLE, this.ID)

    buttons.appendChild(refreshButton)

    return buttons
  }
}

class Ordering extends OrderingElements {
  get getBody () {
    return this.body
  }

  set setBody (body) {
    this.body = body
  }

  set setProps (props) {
    this.ID = props.ID
    this.LABEL = props.LABEL
    this.OPTIONS = props.OPTIONS
    this.TABLE = props.TABLE

    this.building()

    _EMITTER.emit('[formSelect]:building', {
      OUTPUT: 'ordering',
      ID: this.ID,
      CONFIG: {
        THEME: 'ordering',
        ICON: false,
        LABEL: false
      },
      LABEL_BASE_DEFAULT: props.LABEL_BASE_DEFAULT,
      OPTIONS: this.OPTIONS
    })
  }

  constructor (output) {
    super()

    this.listeners()

    this.OUTPUT = output
  }

  building () {
    switch (this.OUTPUT) {
      case 'tableSmall':
        const tableSmall = document.querySelector('.module__table-small')

        if (tableSmall) tableSmall.appendChild(this.container())

        break
      default:
        console.log(`%c No exists the output: %c"${this.OUTPUT}"%c by this form container`, styleLogs.error, styleLogs.errorBold, styleLogs.error)
    }
  }

  listeners() {
    _EMITTER.on('[tableOrdering]:building', props => {
      this.setProps = props
    })

    _EMITTER.on('[tableOrdering]:setBody', body => {
      // TODO: Esta es una manera funcional, pero no eficiente debido a que si se crea otra tabla dentro de la misma página, se sobrescribirá la variable al valor del último body ingresado, por lo que no se podrá acceder al body de los anteriores. Una forma alternativa para solucionar esto es el de guardarlo en una varibale localStorage.
      this.setBody = body
    })

    _EMITTER.on('[tableOrdering]:getBody', body => {
      return this.getBody
    })

    _EMITTER.on('[tableOrdering]:cleaner', table => {
      const tableContainer = document.getElementById(table)
      const ordering = tableContainer.parentNode.querySelector('.ordering')

      _EMITTER.emit('[formSelect]:reset', this.ID)

      const buttons = ordering.childNodes[1]

      buttons.childNodes[0].firstChild.classList.remove('ordering__buttons__button__icon--active')
      buttons.childNodes[1].firstChild.classList.remove('ordering__buttons__button__icon--active')

    })

    _EMITTER.on('[tableOrdering]:searching', searching => {
      if (typeof searching === 'object') OrderingActions.searching(searching.search, searching.value, searching.table)
    })
  }

  static init(output) {
    return new Ordering(output)
  }
}

module.exports = {TableOrdering: Ordering}
