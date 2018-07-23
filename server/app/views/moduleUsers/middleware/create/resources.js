const { Lang } = require('../../lang/accept')

module.exports = (req, res, next) => {
  req._RESOURCES = {}
  req._RESOURCES.Lang = Lang(req, 'POST')

  next()
}
