const {validator} = _RESOURCES.Lang

class Validator {
  static empty (data) {
    let res = null

    if (!data.length || data === null) res = validator.empty

    return res
  }

  static type (option, data) {
    let res = null

    switch (option) {
      case 'text':
        if (typeof data !== 'string' || !isNaN(data)) res = validator.type.text
        break
      case 'number':
        if (isNan(data)) res = validator.type.number
        break
      case 'email':
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(data)) res = validator.type.email
        break
      case 'password':
        if (data.search(/[!@#$%^&*_+].*[!@#$%^&*_+].*[!@#$%^&*_+]/) < 0) res = validator.type.password.special
        if (data.search(/[a-z].*[a-z].*[a-z]/i) < 0) res = validator.type.password.letters
        if (data.search(/[0-9].*[0-9].*[0-9]/) < 0) res = validator.type.password.numbers
        break
      case 'boolean':
        if (typeof data.value !== 'boolean') res = validator.type.boolean.default
        if (typeof data.response !== 'undefined') {
          if (data.response) {
            if (!data.value) res = validator.type.boolean.true
          } else if (!data.response) {
            if (data.value) res = validator.type.boolean.false
          }
        }
        break
      default:
        res = validator.type.default
    }

    return res
  }

  static min (data, min) {
    let res = null

    if (data.length < min) res = validator.min.replace('#####', min)

    return res
  }

  static max (data, max) {
    let res = null

    if (data.length > max) res = validator.max.replace('#####', max)

    return res
  }

  static equal (data, compare) {
    let res = null

    if (data !== compare.data) res = validator.equal.replace('#####', compare.message)

    return res
  }

  static unequal (option, data, compare) {
    let res = null

    switch (option) {
      case 'simple':
        if (data === compare.data) res = validator.unequal.simple.replace('#####', compare.message)
        break
      case 'array':
        if (compare.indexOf(data) >= 0) res = validator.unequal.array.replace('#####', compare.message.toString())
        break
      default:
        res = validator.unequal.default
    }

    return res
  }

  static numbers (option, number, limit) {
    let res = null

    switch (option) {
      case 'minimum':
        if (number < limit) res = validator.numbers.minimum.replace('#####', limit)
        break
      case 'maximum':
        if (number > limit) res = validator.numbers.maximum.replace('#####', limit)
        break
      default:
        res = validator.numbers.default
    }

    return res
  }

  static extensions (option, data, listExtensions) {
    let res = null

    switch (option) {
      case 'image':
        if (!listExtensions.includes(data)) res = validator.extensions.image.replace('#####', listExtensions.toString())
        break
      default:
        res = validator.extensions.default
    }

    return res
  }
}

class ValidatorMethods {
  static basicMain (data, type, min, max) {
    let res = null

    res = Validator.empty(data)
    if (res === null) {
      res = Validator.type(type, data)
      if (res === null) {
        res = Validator.min(data, min)
        if (res === null) {
          res = Validator.max(data, max)
          if (res === null) return null
        }
      }
    }

    return res
  }

  static basicMainOptionalEmpty (data, type, min, max) {
    let res = null

    if (Validator.empty(data) === null) {
      res = Validator.type(type, data)
      if (res === null) {
        res = Validator.min(data, min)
        if (res === null) {
          res = Validator.max(data, max)
          if (res === null) return null
        }
      }
    }

    return res
  }
}

module.exports = {Validator, ValidatorMethods}
