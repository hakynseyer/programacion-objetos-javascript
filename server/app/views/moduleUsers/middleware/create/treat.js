const { Treatment, TreatmentMethods } = require('./../../../../tools/treatment')

module.exports = async ({body}, res, next) => {
  body.Name = await TreatmentMethods.basic(body.Name, 'lowerCase')
  body.Alias = await TreatmentMethods.basic(body.Alias, 'lowerCase')
  body.Email = Treatment.trim(body.Email)
  body.Password = Treatment.trim(body.Password)
  body.RepeatPassword = Treatment.trim(body.RepeatPassword)

  next()
}
