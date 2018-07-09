import Values from './valuesModuleUsers'
import Validate from './validateModuleUsers'
import { Text } from '|Assets/js/tools'
import styleLogs from '|Assets/js/styleLogs'

class EventsBoardUsers {
  constructor (Emitter, Resources) {
    this.Emitter = Emitter
    this.Resources = Resources
  }

  clearFields (names) {
    this.clearErrors(names)

    for (const name of names) {
      if (name !== 'State') this.Emitter.emit('[formInput]:clearField', Text.camelCase(name))
      else if (name === 'State') this.Emitter.emit('[formCheckbox]:clearField', Text.camelCase(name))
    }
  }

  clearErrors (names) {
    this.Emitter.emit('[formForm]:removeErrors')

    for (const name of names) {
      if (name !== 'State') this.Emitter.emit('[formInput]:removeErrors', Text.camelCase(name))
      else if (name === 'State') this.Emitter.emit('[formCheckbox]:removeErrors', Text.camelCase(name))
    }
  }

  lauchErrors (errors) {
    if (Array.isArray(errors)) this.Emitter.emit('[formForm]:lauchErrors', errors)
    else {
      for (const error of Object.keys(errors)) {
        if (error !== 'State') this.Emitter.emit('[formInput]:lauchErrors', {name: Text.camelCase(error), errors: errors[error]})
        else if (error === 'State') this.Emitter.emit('[formCheckbox]:lauchErrors', {name: Text.camelCase(error), errors: errors[error]})
      }
    }
  }

  form (buttons) {
    let clearButton = null, sendButton = null

    for (const btn of Object.keys(buttons)) {
      if (buttons[btn].id === 'clearButton') clearButton = buttons[btn]
      else if (buttons[btn].id === 'sendButton') sendButton = buttons[btn]
    }

    if (clearButton !== null && sendButton !== null) {
      clearButton.addEventListener('click', e => {
        const values = Values(this.Emitter, this.Resources)

        this.clearFields(Object.keys(values))
      })

      sendButton.addEventListener('click', async e => {
        const values = Values(this.Emitter, this.Resources)

        this.clearErrors(Object.keys(values))

        const errors = Validate(values)

        if (errors !== null) this.lauchErrors(errors)
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

            if (rawResponse.status === 422 || rawResponse.status === 400) this.lauchErrors(dataResponse.errors)
            else {
              const { User } = dataResponse
              this.clearFields(Object.keys(values))

              this.Emitter.emit('[fastMessage]:hideMessageComplete', {
                id: 'userCreate',
                delay: 1300,
                setProps: {
                  id: this.Resources.fastMessage.userCreate.id,
                  type: this.Resources.fastMessage.userCreate.type,
                  title: this.Resources.fastMessage.userCreate.title.replace('#####', User.alias),
                  content: this.Resources.fastMessage.userCreate.content.replace('#####', User.created)
                }
              })
            }

          } catch (error) {
            console.log(`%c${error}`, styleLogs.error)
          }
        }
      })
    }
  }

  static init (Emitter, resources) {
    return new EventsBoardUsers(Emitter, resources)
  }
}

module.exports = {EventsBoardUsers}
