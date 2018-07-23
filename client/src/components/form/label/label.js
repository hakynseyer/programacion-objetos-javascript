class LabelElements {
  container () {
    const container = document.createElement('label')
    container.classList.add('form__group__label')
    if (this.ID) container.setAttribute('for', this.ID)
    const containerText = document.createTextNode(this.LABEL ? this.LABEL : 'label')

    container.appendChild(containerText)

    return container
  }
}

class Label extends LabelElements {
  get getLabel () {
    return this.container()
  }

  set setProps (props) {
    this.ID = props.ID
    this.LABEL = props.LABEL
  }

  constructor () {
    super()

    this.listeners()
  }

  listeners () {
    _EMITTER.on('[formLabel]:getLabel', (props) => {
      this.setProps = props
      return this.getLabel
    })
  }

  static init () {
    return new Label()
  }
}

module.exports = {FormLabel: Label}
