import { Validator, ValidatorMethods } from '|Assets/js/validator'

const errors = {
  Name: [],
  Alias: [],
  Email: [],
  Password: [],
  RepeatPassword: [],
  State: []
}

function resetErrors () {
  for (const error of Object.keys(errors)) errors[error] = []
}

function checkErrors () {
  let res = false

  for (const error of Object.keys(errors)) {
    if (errors[error].length) {
      res = true
      break
    }
  }

  return res
}

class Validate {
  constructor ({Name, Alias, Email, Password, RepeatPassword, State}) {
    resetErrors()

    this.Name(Name)
    this.Alias(Alias)
    this.Email(Email)
    this.Password(Password)
    this.RepeatPassword(RepeatPassword, {data: Password, message: Resources.Lang.form.formPassword.label})
    this.State(State)
  }

  Name (value) {
    let err = null

    err = ValidatorMethods.basicMain(value, 'text', 4, 25)
    if (err !== null) errors.Name.push(err)
  }

  Alias (value) {
    let err = null

    err = ValidatorMethods.basicMain(value, 'text', 3, 15)
    if (err !== null) errors.Alias.push(err)
  }

  Email (value) {
    let err = null

    err = ValidatorMethods.basicMain(value, 'email', 4, 255)
    if (err !== null) errors.Email.push(err)
  }

  Password (value) {
    let err = null

    err = ValidatorMethods.basicMain(value, 'password', 7, 255)
    if (err !== null) errors.Password.push(err)
  }

  RepeatPassword (value, compare) {
    let err = null

    err = ValidatorMethods.basicMain(value, 'password', 7, 255)
    if (err !== null) errors.RepeatPassword.push(err)

    err = Validator.equal(value, compare)
    if (err !== null) errors.RepeatPassword.push(err)
  }

  State (value) {
    let err = null

    err = Validator.type('boolean', {value})
    if (err !== null) errors.State.push(err)
  }
}


module.exports = values => {
  new Validate(values)

  if (checkErrors()) return errors

  return null
}
