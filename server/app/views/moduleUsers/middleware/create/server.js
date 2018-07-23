const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcryptjs'))

const { Users } = require('../../../../tools/chargerModels')
const { Text, Json } = require('../../../../tools/tools')

module.exports = async (req, res) => {
  const { body } = req
  const { dateFormat, validatorModuleUsers } = req._RESOURCES.Lang

  const salt = bcrypt.genSaltSync(10)
  body.Password = bcrypt.hashSync(body.Password, salt)

  try {
    const _User = await Users.create({
      name: body.Name,
      alias: body.Alias,
      email: body.Email,
      password: body.Password,
      state: body.State ? 1 : 0
    })

    const User = _User.toJSON()
    User['created'] = Text.DateFormat(dateFormat)(User.createdAt, 'fullDate')

    res.send({User: Json.RemoveKeys(User, ['question1', 'answer1', 'question2', 'answer2', 'activation', 'soul', 'rank', 'id', 'name', 'email', 'password', 'state', 'updatedAt', 'createdAt'])})
  } catch (error) {
    console.error(error)
    res.status(400).send({errors: validatorModuleUsers.server})
  }
}
