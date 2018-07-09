const { sequelize, UsersRanks } = require('../app/tools/chargerModels')

const Promise = require('bluebird')
const usersRanks = require('./json/usersRanks.json')

sequelize.sync({force: true})
  .then(async () => {
    await Promise.all(
      usersRanks.map(userRank => {
        UsersRanks.create(userRank)
      })
    )
  })
