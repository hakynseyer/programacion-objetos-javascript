const accepts = require('accepts')

const { languages } = require('../../../config/config')
const { Files } = require('../../../tools/tools')

const Lang = (req, state) => {
  const Accept = accepts(req)

  let packages = {
    validator: {},
    module: {},
    form: {}
  }

  switch (Accept.language(languages)) {
    case 'es': case 'es-MX':
      switch (state) {
        case 'GET':
          packages = {
            validator: Files.RequireJSON(__dirname, '../../../lang/validator/es.json'),
            module: Files.RequireJSON(__dirname, './packages/module/es.json'),
            form: Files.RequireJSON(__dirname, './packages/form/es.json'),
            fastMessage: Files.RequireJSON(__dirname, './packages/fastMessage/es.json')
          }
          break
        case 'POST':
          packages = {
            form: Files.RequireJSON(__dirname, './packages/form/es.json'),
            validator: Files.RequireJSON(__dirname, '../../../lang/validator/es.json'),
            validatorModuleUsers: Files.RequireJSON(__dirname, './packages/validator/es.json'),
            dateFormat: Files.RequireJSON(__dirname, '../../../lang/dateFormat/es.json')
          }
          break
      }
      break
    case 'en': case 'en-US':
      console.log('El idioma elegido es ingles')
      break
  }

  return packages
}

module.exports = {Lang}
