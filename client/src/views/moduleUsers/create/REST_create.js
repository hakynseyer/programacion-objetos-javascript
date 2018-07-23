import { DATA_FAST_MESSAGE, DATA_TABLE } from '../global/DATA'

import { VALUES_create } from './VALUES_create'
import { VALIDATES_create } from './VALIDATES_create'
import { Text } from '|Assets/js/tools'
import styleLogs from '|Assets/js/styleLogs'


function clearErrors (names) {
  _EMITTER.emit('[formForm]:removeErrors')

  for (const name of names) {
    if (name !== 'State') _EMITTER.emit('[formInput]:removeErrors', Text.camelCase(name))
    else if (name === 'State') _EMITTER.emit('[formCheckbox]:removeErrors', Text.camelCase(name))
  }
}

function clearFields (names) {
  clearErrors(names)

  for (const name of names) {
    if (name !== 'State') _EMITTER.emit('[formInput]:clearField', Text.camelCase(name))
    else if (name === 'State') _EMITTER.emit('[formCheckbox]:clearField', Text.camelCase(name))
  }
}

function lauchErrors (errors) {
  if (Array.isArray(errors)) _EMITTER.emit('[formForm]:lauchErrors', errors)
  else {
    for (const error of Object.keys(errors)) {
      if (error !== 'State') _EMITTER.emit('[formInput]:lauchErrors', {name: Text.camelCase(error), errors: errors[error]})
      else if (error === 'State') _EMITTER.emit('[formCheckbox]:lauchErrors', {name: Text.camelCase(error), errors: errors[error]})
    }
  }
}

class RESTEvents {
  clearButton (button) {
    button.addEventListener('click', e => {
      clearFields(Object.keys(VALUES_create.init()))
    })
  }

  sendButton (button) {
    button.addEventListener('click', async e => {
      const values = VALUES_create.init()

      clearErrors(Object.keys(values))

      const errors = VALIDATES_create.init(values)

      if (errors !== null) lauchErrors(errors)
      else {
        try {
          const rawResponse = await fetch('/module/users', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
          const dataResponse = await rawResponse.json()

          if (rawResponse.status === 422 || rawResponse.status === 400) lauchErrors(dataResponse.errors)
          else {
            const { User } = dataResponse
            clearFields(Object.keys(values))

            _EMITTER.emit('[fastMessage]:lauch', {
              ID: DATA_FAST_MESSAGE.USER_CREATE.ID,
              DELAY: DATA_FAST_MESSAGE.USER_CREATE.DELAY,
              TYPE: DATA_FAST_MESSAGE.USER_CREATE.TYPE,
              TITLE: DATA_FAST_MESSAGE.USER_CREATE.TITLE.replace('#####', User.alias),
              CONTENT: DATA_FAST_MESSAGE.USER_CREATE.CONTENT.replace('#####', User.created)
            })
          }

          _SOCKET.emit('[tableSmall][req]:getUsers', {
            currentPage: 1,
            limitByPage: DATA_TABLE.TABLE_SMALL.LIMIT_BY_PAGE
          })

          _EMITTER.emit('[tablePagination]:cleaner', DATA_TABLE.TABLE_SMALL.PAGINATION.NAME_INPUT)

        } catch (error) {
          console.log(`%c${error}`, styleLogs.error)
        }
      }
    })
  }
}

class REST extends RESTEvents {
  constructor () {super()}

  form (buttons) {
    let clearButton = null, sendButton = null

    for (const btn of Object.keys(buttons)) {
      if (buttons[btn].id === 'clearButton') clearButton = buttons[btn]
      else if (buttons[btn].id === 'sendButton') sendButton = buttons[btn]
    }

    if (clearButton !== null && sendButton !== null) {
      this.clearButton(clearButton)

      this.sendButton(sendButton)
    }
  }

  static init () {
    return new REST()
  }
}

module.exports = {REST_create: REST}
