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
    const titleText = document.createTextNode(this.titleName? this.titleName: 'Module')
    title.appendChild(titleText)

    return title
  }
}

class Title extends TitleElements {
  get getTitle () {
    return this.titleName
  }

  set setTitle (title) {
    this.titleName = title
    this.building()
  }

  constructor (Emitter) {
    super()

    this.Emitter = Emitter
    this.listeners()
  }

  building () {
    const module = document.querySelector('.module')

    module.appendChild(this.container())
  }

  listeners () {

  }

  static init(Emitter) {
    return new Title(Emitter)
  }
}

module.exports = {ModuleTitle: Title}
