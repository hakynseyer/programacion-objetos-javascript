const { Text } = require('./tools')

function noEmpty (data) {
  if (data.length || data !== null) return true

  return false
}

class Treatment {
  static trim (data) {
    if (noEmpty(data)) return data.trim()
    return data
  }

  static text (option, data) {
    if (noEmpty(data)) {
      let treatData = null

      switch (option) {
        case 'lowerCase':
          treatData = data.toLowerCase()
          break
        case 'capitalize':
          treatData = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase()
          break
      }

      return treatData
    }

    return data
  }

  static specialCharacters (data) {
    if (noEmpty(data)) return data.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return data
  }

  static replace (data, search, change) {
    if (noEmpty(data)) return data.replace(search, change)
    return data
  }

  static replaceSpaces (option, data) {
    if (noEmpty(data)) {
      let treatData = null

      switch (option) {
        case '_:space':
          treatData = data.replace(/_/g, ' ')
          break
        case 'space:_':
          treatData = data.replace(/ /g, '_')
          break
        case '-:space':
          treatData = data.replace(/-/g, ' ')
          break
        case 'space:-':
          treatData = data.replace(/ /g, '-')
          break
        case 'space:CamelCase':
          const dataArray = data.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())

          treatData = dataArray.toString().replace(/,/g, '')
          break
        case 'sapce:void':
          treatData = data.replace(/ /g, '')
          break
      }

      return treatData
    }

    return data
  }
}

class TreatmentMethods {
  static async basic (data, text) {
    try {
      const treat = new Promise (resolve => resolve(Treatment.trim(data)))

      const dataTreat = await treat
        .then(trim => Treatment.text(text, trim))
        .then(text => Treatment.specialCharacters(text))
        .catch(error => {throw new Error(`An Error found TreatmentMethods [basic] [args: ${data}, ${text}] => ${error}`)})

      return dataTreat
    } catch (error) {
      console.error(error)

      return undefined
    }
  }

  static async route (title, extension) {
    try {
      const basic = await TreatmentMethods.basic(title, 'lowerCase')

      const build = new Promise (resolve => resolve(Treatment.replaceSpaces('space:CamelCase', basic)))

      const route = await build
        .then(replaceSpaces => replaceSpaces + '-' + Text.MasterKey(10) + '-.' + extension)
        .catch(error => {throw new Error(`An Error found TreatmentMethods [route] [args: ${title}, ${extension}] => ${error}`)})

      return route
    } catch (error) {
      console.error(error)
      return undefined
    }
  }
}

module.exports = {Treatment, TreatmentMethods}
