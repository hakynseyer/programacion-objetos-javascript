const { Validator } = require('../../../../tools/validator')
const { Users } = require('../../../../tools/chargerModels')

const errorsFields = {
  Name: [],
  Alias: [],
  Email: [],
  Password: [],
  RepeatPassword: [],
  State: []
}

function resetErrors () {
  for (const error of Object.keys(errorsFields)) errorsFields[error] = []
}

function checkErrors () {
  let res = false

  for (const error of Object.keys(errorsFields)) {
    if (errorsFields[error].length) {
      res = true
      break
    }
  }

  return res
}

class ValidateBasic {
  constructor (language) {
    resetErrors()

    this.Validator = Validator.init(language)
  }

  async Name (value) {
    let err = null

    err = await this.Validator.basicMain(value, 'text', 4, 25)

    if (err !== null) errorsFields.Name.push(err)
  }

  async Alias (value) {
    let err = null

    err = await this.Validator.basicMain(value, 'text', 3, 15)
    if (err !== null) errorsFields.Alias.push(err)
  }

  async Email (value) {
    let err = null

    err = await this.Validator.basicMain(value, 'email', 4, 255)
    if (err !== null) errorsFields.Email.push(err)
  }

  async Password (value) {
    let err = null

    err = await this.Validator.basicMain(value, 'password', 7, 255)
    if (err !== null) errorsFields.Password.push(err)
  }

  async RepeatPassword (value, compare) {
    let err = null

    err = await this.Validator.basicMain(value, 'password', 7, 255)
    if (err !== null) errorsFields.RepeatPassword.push(err)

    err = this.Validator.equal(value, compare)
    if (err !== null) errorsFields.RepeatPassword.push(err)
  }

  State (value) {
    let err = null

    err = this.Validator.type('boolean', {value})
    if (err !== null) errorsFields.State.push(err)
  }
}

class ValidateServer {
  constructor (language) {
    this.Language = language
  }

  async Alias (value) {
    const userID = await Users.findOne({
      where: {alias: value},
      attributes: ['id']
    })

    if (userID !== null) {
      if (userID.id) errorsFields.Alias.push(this.Language.alias.unique)
    }
  }

  async Email (value) {
    const userID = await Users.findOne({
      where: {email: value},
      attributes: ['id']
    })

    if (userID !== null) {
      if (userID.id) errorsFields.Email.push(this.Language.email.unique)
    }
  }

}

module.exports = (req, res, next) => {
  const { body } = req
  const { validator, validatorModuleUsers } = req.Resources.Lang

  const validate = new Promise (async (resolve, reject) => {
    const valBasic = new ValidateBasic(validator)

    try {
      await valBasic.Name(body.Name)
      await valBasic.Alias(body.Alias)
      await valBasic.Email(body.Email)
      await valBasic.Password(body.Password)
      await valBasic.RepeatPassword(body.RepeatPassword, {data: body.Password, message: req.Resources.Lang.form.formPassword.label})
      valBasic.State(body.State)

      if (checkErrors()) res.status(422).send({errors: errorsFields})
      else resolve(true)

    } catch (error) {
      reject(new Error(error))
    }
  })

  validate
    .then(async basic => {
      if (basic) {
        const valServer = new ValidateServer(validatorModuleUsers)

        try {
          await valServer.Alias(body.Alias)
          await valServer.Email(body.Email)

          if (checkErrors()) res.status(422).send({errors: errorsFields})
          else next()

        } catch (error) {
          throw new Error(error)
        }
      }
    })
    .catch(error => {
      console.error(error)
      res.status(400).send({errors: validatorModuleUsers.server})
    })
}
