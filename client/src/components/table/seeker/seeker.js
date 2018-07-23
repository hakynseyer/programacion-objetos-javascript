import styleLogs from '|Assets/js/styleLogs.js'

class SeekerEvents {
  static serverButton (element) {
    element.addEventListener('click', e => {
      if (element.value === 'true') {
        element.firstChild.classList.remove('seeker__buttons__button__icon--active')

        element.value = 'false'
      } else if (element.value === 'false') {
        element.firstChild.classList.add('seeker__buttons__button__icon--active')

        element.value = 'true'
      } else element.value = 'false'
    })
  }
}

class SeekerElements {
  container () {
    const container = document.createElement('div')
    container.classList.add('seeker')

    container.appendChild(this.seekerSearch())
    container.appendChild(this.seekerButtons())

    return container
  }

  seekerSearch() {
    const box = document.createElement('div')
    box.classList.add('seeker__search')

    const input = document.createElement('input')
    input.classList.add('seeker__search__input')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', this.PLACEHOLDER)

    box.appendChild(input)

    const button = document.createElement('button')
    button.classList.add('seeker__search__button')
    button.setAttribute('type', 'button')

    const buttonIcon = document.createElement('i')
    buttonIcon.setAttribute('class', 'fas fa-search')
    buttonIcon.classList.add('seeker__search__button__icon')

    button.appendChild(buttonIcon)

    box.appendChild(button)

    return box
  }

  seekerButtons () {
    const box = document.createElement('div')
    box.classList.add('seeker__buttons')

    const server = document.createElement('button')
    server.classList.add('seeker__buttons__button')
    server.setAttribute('value', 'false')
    server.setAttribute('type', 'button')

    SeekerEvents.serverButton(server)

    const serverIcon = document.createElement('i')
    serverIcon.setAttribute('class', 'fas fa-server')
    serverIcon.classList.add('seeker__buttons__button__icon')

    server.appendChild(serverIcon)

    box.appendChild(server)

    return box
  }
}

class Seeker extends SeekerElements {
  get getElements () {
    return {
      searchInput: document.querySelectorAll('.seeker__search__input'),
      searchButton: document.querySelectorAll('.seeker__search__button'),
      serverButton: document.querySelectorAll('.seeker__buttons__button')
    }
  }

  set setProps (props) {
    this.PLACEHOLDER = props.PLACEHOLDER ? props.PLACEHOLDER : ''

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
  }

  listeners () {
    _EMITTER.on('[tableSeeker]:building', props => {
      this.setProps = props

      return this.getElements
    })
  }

  static init(output) {
    return new Seeker(output)
  }
}

module.exports = {TableSeeker: Seeker}
