const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const { DB } = require('../config/config')

const db = {}

const sequelize = new Sequelize(
  DB.dataBase,
  DB.user,
  DB.password,
  DB.options
)

fs
  .readdirSync(path.resolve(__dirname, '../models'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, '../models/', file))
    db[model.name] = model
  })

for (const model of Object.keys(db)) {
  if ('associate' in db[model]) db[model].associate(db)
}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
