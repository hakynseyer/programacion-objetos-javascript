class LogoElements {
  container () {
    const container = document.createElement('div')
    container.classList.add('module__logo')

    if (this.urlLogo) container.style.setProperty('--url-logo', `url(${this.urlLogo})`)

    return container
  }
}

class Logo extends LogoElements {
  set setLogo (url) {
    this.urlLogo = url

    return this.building()
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

  static init (Emitter) {
    return new Logo(Emitter)
  }
}

module.exports = {ModuleLogo: Logo}
