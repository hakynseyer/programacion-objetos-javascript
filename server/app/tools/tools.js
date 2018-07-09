const fs = require('fs')
const path = require('path')

class Files {
  static RequireJSON (base, route) {
    return  JSON.parse(fs.readFileSync(path.resolve(base, route)))
  }
}

class Json {
  static RemoveKeys (dataJson, remove) {
    let dataJsonCopy = Object.assign({}, dataJson)

    for (const rem of remove) delete (dataJsonCopy[rem])

    return dataJsonCopy
  }
}

class Text {
  static MasterKey (size) {
    let key = ''

    const characters = '0HJK19LQW8mn0bzlE2RTv9cxYUIO31PkjhgfdsB4NM87ap2SDFG5oi6uyt3rew6qZXC75VA4'

    for (let c = 0; c < size; c++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return key
  }

  static DateFormat (language) {
    const dateFormat = require('dateformat')
    dateFormat.i18n = {
      dayNames: language.dayNames,
      monthNames: language.monthNames,
      timeNames: language.timeNames
    }

    return dateFormat
  }
}

module.exports = {Files, Text, Json}
