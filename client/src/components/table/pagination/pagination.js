import styleLogs from '|Assets/js/styleLogs.js'

class PaginationEvents {
  static nexPage (nameInput) {
    const buttonRight = document.querySelector('.pagination__buttons__right')

    buttonRight.addEventListener('click', e => {
      const input = document.getElementsByName(nameInput)[0]

      if (!isNaN(input.value)) {
        const pageRight = document.querySelector('.pagination__page__right').textContent

        if (parseInt(input.value) + 1 > parseInt(pageRight)) input.value = parseInt(pageRight)
        else input.value = parseInt(input.value) + 1
      } else input.value = 1
    })
  }

  static previousPage (nameInput) {
    const buttonLeft = document.querySelector('.pagination__buttons__left')

    buttonLeft.addEventListener('click', e => {
      const input = document.getElementsByName(nameInput)[0]

      if (!isNaN(input.value)) {
        if (parseInt(input.value) - 1 <= 0) input.value = 1
        else input.value = parseInt(input.value) - 1
      } else input.value = 1
    })
  }
}

class PaginationElements {
  container () {
    const container = document.createElement('div')
    container.classList.add('pagination')

    container.appendChild(this.page())
    container.appendChild(this.buttons())

    return container
  }

  page () {
    const page = document.createElement('div')
    page.classList.add('pagination__page')

    const pageLeft = document.createElement('span')
    pageLeft.classList.add('pagination__page__left')
    const pageLeftText = document.createTextNode(this.PAGE_LEFT)

    pageLeft.appendChild(pageLeftText)

    page.appendChild(pageLeft)

    const pageInput = document.createElement('input')
    pageInput.setAttribute('type', 'text')
    pageInput.setAttribute('value', this.CURRENT_PAGE)
    pageInput.setAttribute('name', this.NAME_INPUT)
    pageInput.classList.add('pagination__page__input')

    page.appendChild(pageInput)

    const pageLine = document.createElement('span')
    pageLine.classList.add('pagination__page__line')
    const pageLineText = document.createTextNode('-')

    pageLine.appendChild(pageLineText)

    page.appendChild(pageLine)

    const pageRight = document.createElement('span')
    pageRight.classList.add('pagination__page__right')
    const pageRightText = document.createTextNode(this.PAGE_RIGHT ? this.PAGE_RIGHT : '9999')

    pageRight.appendChild(pageRightText)

    page.appendChild(pageRight)

    return page
  }

  buttons () {
    const buttons = document.createElement('div')
    buttons.classList.add('pagination__buttons')

    const buttonLeft = document.createElement('button')
    buttonLeft.setAttribute('type', 'button')
    buttonLeft.classList.add('pagination__buttons__left')

    const buttonLeftIcon = document.createElement('i')
    buttonLeftIcon.setAttribute('class', 'far fa-caret-square-left')
    buttonLeftIcon.classList.add('pagination__buttons__left__icon')

    buttonLeft.appendChild(buttonLeftIcon)

    buttons.appendChild(buttonLeft)

    const buttonRight = document.createElement('button')
    buttonRight.setAttribute('type', 'button')
    buttonRight.classList.add('pagination__buttons__right')

    const buttonRightIcon = document.createElement('i')
    buttonRightIcon.setAttribute('class', 'far fa-caret-square-right')
    buttonRightIcon.classList.add('pagination__buttons__right__icon')

    buttonRight.appendChild(buttonRightIcon)

    buttons.appendChild(buttonRight)

    return buttons
  }
}

class Pagination extends PaginationElements {
  get getInputPage () {
    return document.getElementsByName(this.NAME_INPUT)[0]
  }

  get getButtonsPage () {
    return {
      buttonLeft: document.querySelector('.pagination__buttons__left'),
      buttonRight: document.querySelector('.pagination__buttons__right')
    }
  }

  set setProps (props) {
    this.NAME_INPUT = props.NAME_INPUT
    this.PAGE_LEFT = props.PAGE_LEFT
    this.CURRENT_PAGE = props.CURRENT_PAGE
    this.PAGE_RIGHT = props.PAGE_RIGHT
    this.building()
  }

  constructor (output) {
    super()

    this.OUTPUT = output

    this.listeners()
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

    PaginationEvents.nexPage(this.NAME_INPUT)
    PaginationEvents.previousPage(this.NAME_INPUT)
  }

  listeners () {
    _EMITTER.on('[tablePagination]:building', props => {
      this.setProps = props

      return {input: this.getInputPage, buttons: this.getButtonsPage}
    })

    _EMITTER.on('[tablePagination]:setPageRight', (pageRight = null) => {
      if (pageRight) document.querySelector('.pagination__page__right').textContent = pageRight
    })

    _EMITTER.on('[tablePagination]:cleaner', (name = null) => {
      if (name) {
        const element = document.getElementsByName(name)

        if (element.length) {
          element[0].value = 1
          element[0].parentNode.querySelector('.pagination__page__right').textContent = 1
        }
      }
    })

    _EMITTER.on('[tablePagination]:getCurrentPage', (name = null) => {
      let value = 1

      if (name) {
        const element = document.getElementsByName(name)

        if (element.length) {
          if (!isNaN(element[0].value)) {
            const pageRight = parseInt(document.querySelector('.pagination__page__right').textContent)
            if (parseInt(element[0].value) <= pageRight && parseInt(element[0].value) > 0) value = parseInt(element[0].value)
            else if (parseInt(element[0].value) > pageRight) {
              value = pageRight
              element[0].value = pageRight
            } else if (parseInt(element[0].value) <= 0) element[0].value = 1
          }
        }
      }

      return value
    })
  }

  static init (output) {
    return new Pagination(output)
  }
}

module.exports = {TablePagination: Pagination}
