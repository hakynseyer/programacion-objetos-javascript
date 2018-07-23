import { DATA_FORM } from '../global/DATA'
import { Text } from '|Assets/js/tools'

class VALUES {
  get getValues () {
    return this.values
  }

  constructor () {
    this.values = {
      Name: null,
      Alias: null,
      Email: null,
      Password: null,
      RepeatPassword: null,
      State: null
    }

    this.inputs()
    this.checkboxes()
  }

  inputs () {
    for (const input of Object.keys(this.values)) {
      if (input !== 'State') this.values[input] = _EMITTER.emit('[formInput]:getValue', DATA_FORM[Text.upperCase_DATA(input)].NAME)
    }
  }

  checkboxes () {
    const rawState = _EMITTER.emit('[formCheckbox]:isChecked', DATA_FORM.STATE.NAME)

    for (const key of Object.keys(rawState)) {
      if (DATA_FORM.STATE.CHECKBOXES[0].LABEL.includes(key)) {
        this.values.State = rawState[key]
        break
      }
    }
  }

  static init () {
    const values = new VALUES()
    return values.getValues
  }
}

module.exports = {VALUES_create: VALUES}
