class LogoElements {
  container () {
    const container = document.createElement('div')
    container.classList.add('module__logo')

    if (this.LOGO) container.style.setProperty('--url-logo', `url(${this.LOGO})`)

    return container
  }
}

class Logo extends LogoElements {
  set setProps (props) {
    this.LOGO = props.LOGO

    return this.building()
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

  static init () {
    return new Logo()
  }
}

module.exports = {ModuleLogo: Logo}
