const { Lang } = require('../../lang/accept')

module.exports = (req, res, next) => {
  req.Resources = {}
  req.Resources.Lang = Lang(req, 'POST')

  next()
}
