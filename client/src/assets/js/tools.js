class Random {
  static basic (max) {
    return Math.floor((Math.random() * max) + 1)
  }
}

class Text {
  static camelCase (text) {
    const characters = text.split('')
    let breakPoints = []

    for (const character of characters) {
      if (character === character.toUpperCase()) {
        const key = text.indexOf(character)
        if (key > 0) breakPoints.push(key)
      }
    }

    if (breakPoints.length) {
      let newText = []
      let passPoint = 0
      for (const breakPoint of breakPoints) {
        newText.push(text.slice(passPoint, breakPoint).toLowerCase())
        passPoint = breakPoint
      }

      newText.push(text.slice(passPoint, text.length))

      return newText.toString().replace(',', '')
    } else return text.toLowerCase()
  }
}

module.exports = { Random, Text }
