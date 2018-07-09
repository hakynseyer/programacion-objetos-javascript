class ValidatorMethods {
  async basicMain (data, type, min, max) {
    try {
      let res = null

      const basic = new Promise (resolve => resolve(this.empty(data)))

      res = await basic
        .then(empty => empty === null ? this.type(type, data) : empty)
        .then(type => type === null ? this.min(data, min) : type)
        .then(min => min === null ? this.max(data, max) : min)
        .catch(error => {throw new Error(`An Error found ValidatorMethods [basicMain] [args: ${data}, ${type}, ${min}, ${max}] => ${error}`)})

      return res
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  async basicMainOptionalEmpty (data, type, min, max) {
    try {
      let res = null

      const basic = new Promise (resolve => resolve(this.empty(data)))

      res = await basic
        .then(empty => empty === null ? this.type(type, data) : undefined)
        .then(type => type === null ? this.min(data, min) : type)
        .then(min => min === null ? this.max(data, max) : min)
        .catch(error => {throw new Error(`An Error found ValidatorMethods [basicMainOptionalEmpty] [args: ${data}, ${type}, ${min}, ${max}] => ${error}`)})

      return res === undefined ? null : res
    } catch (error) {
      console.error(error)
      return undefined
    }
  }
}

class Validator extends ValidatorMethods{
  constructor (Lang) {
    super()

    this.Lang = Lang
  }

  empty (data) {
    let res = null

    if (!data.length || data === null) res = this.Lang.empty

    return res
  }

  type (option, data) {
    let res = null

    switch (option) {
      case 'text':
        if (typeof data !== 'string' || !isNaN(data)) res = this.Lang.type.text
        break
      case 'number':
        if (isNan(data)) res = this.Lang.type.number
        break
      case 'email':
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(data)) res = this.Lang.type.email
        break
      case 'password':
        if (data.search(/[!@#$%^&*_+].*[!@#$%^&*_+].*[!@#$%^&*_+]/) < 0) res = this.Lang.type.password.special
        if (data.search(/[a-z].*[a-z].*[a-z]/i) < 0) res = this.Lang.type.password.letters
        if (data.search(/[0-9].*[0-9].*[0-9]/) < 0) res = this.Lang.type.password.numbers
        break
      case 'boolean':
        if (typeof data.value !== 'boolean') res = this.Lang.type.boolean.default
        if (typeof data.response !== 'undefined') {
          if (data.response) {
            if (!data.value) res = this.Lang.type.boolean.true
          } else if (!data.response) {
            if (data.value) res = this.Lang.type.boolean.false
          }
        }
        break
      default:
        res = this.Lang.type.default
    }

    return res
  }

  min (data, min) {
    let res = null

    if (data.length < min) res = this.Lang.min.replace('#####', min)

    return res
  }

  max (data, max) {
    let res = null

    if (data.length > max) res = this.Lang.max.replace('#####', max)

    return res
  }

  equal (data, compare) {
    let res = null

    if (data !== compare.data) res = this.Lang.equal.replace('#####', compare.message)

    return res
  }

  unequal (option, data, compare) {
    let res = null

    switch (option) {
      case 'simple':
        if (data === compare.data) res = this.Lang.unequal.simple.replace('#####', compare.message)
        break
      case 'array':
        if (compare.indexOf(data) >= 0) res = this.Lang.unequal.array.replace('#####', compare.message.toString())
        break
      default:
        res = this.Lang.unequal.default
    }

    return res
  }

  numbers (option, number, limit) {
    let res = null

    switch (option) {
      case 'minimum':
        if (number < limit) res = this.Lang.numbers.minimum.replace('#####', limit)
        break
      case 'maximum':
        if (number > limit) res = this.Lang.numbers.maximum.replace('#####', limit)
        break
      default:
        res = this.Lang.numbers.default
    }

    return res
  }

  extensions (option, data, listExtensions) {
    let res = null

    switch (option) {
      case 'image':
        if (!listExtensions.includes(data)) res = this.Lang.extensions.image.replace('#####', listExtensions.toString())
        break
      default:
        res = this.Lang.extensions.default
    }

    return res
  }

  static init (Lang) {
    return new Validator(Lang)
  }
}

module.exports = {Validator}
