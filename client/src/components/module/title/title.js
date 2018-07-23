class TitleElements {
  container () {
    const container = document.createElement('div')
    container.classList.add('module__title')

    container.appendChild(this.title())

    return container
  }

  title () {
    const title = document.createElement('span')
    title.classList.add('module__title__name')
    const titleText = document.createTextNode(this.TITLE? this.TITLE: 'Module')
    title.appendChild(titleText)

    return title
  }
}

class Title extends TitleElements {
  get getTitle () {
    return this.TITLE
  }

  set setProps (props) {
    this.TITLE = props.TITLE
    this.building()
  }

  constructor () {
    super()

    this.listeners()
  }

  building () {
    const module = document.querySelector('.module')

    module.appendChild(this.container())
  }

  listeners () {

  }

  static init() {
    return new Title()
  }
}

module.exports = {ModuleTitle: Title}
