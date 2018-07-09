// const formidable = require('formidable')
const { Lang } = require('./lang/accept')

const Create = {
  resources: require('./middleware/create/resources'),
  treat: require('./middleware/create/treat'),
  validate: require('./middleware/create/validate'),
  server: require('./middleware/create/server')
}

module.exports = router => {
  router.get('/module/users', (req, res) => {
    res.render('moduleUsers/moduleUsers.html', {
      Resources: {
        Title: 'Módulo: Usuariossssss',
        Lang: Lang(req, 'GET')
      }
    })
  })

  router.post('/module/users', Create.resources, Create.treat, Create.validate, Create.server)

  // router.post('/', (req, res) => {
  //   const form = new formidable.IncomingForm()

  //   form.parse(req, (err, fields, files) => {
  //     console.log(fields, files)
  //     res.status(400).send({message: 'VALIDACIón NO EXITOSA'})
  //   })
  // })

  return router
}
