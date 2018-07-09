const express = require('express')
const router = express.Router()

const path = require('path')
const fs = require('fs')

fs
  .readdirSync(path.resolve(__dirname, '../views'))
  .forEach(folder => {
    require(path.join(__dirname, '../views', folder, 'router.js'))(router)
  })

module.exports = router
