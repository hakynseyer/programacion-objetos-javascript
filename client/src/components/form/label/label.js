class LabelElements {
  container () {
    const container = document.createElement('label')
    container.classList.add('form__group__label')
    if (this.id) container.setAttribute('for', this.id)
    const containerText = document.createTextNode(this.label ? this.label : 'label')

    container.appendChild(containerText)

    return container
  }
}

class Label extends LabelElements {
  get getLabel () {
    return this.container()
  }

  set setProps (props) {
    this.id = props.id
    this.label = props.label
  }

  constructor (Emitter) {
    super()

    this.Emitter = Emitter
    this.listeners()
  }

  listeners () {
    this.Emitter.on('[formLabel]:getLabel', (props) => {
      this.setProps = props
      return this.getLabel
    })
  }

  static init (Emitter) {
    return new Label(Emitter)
  }
}

module.exports = {FormLabel: Label}
