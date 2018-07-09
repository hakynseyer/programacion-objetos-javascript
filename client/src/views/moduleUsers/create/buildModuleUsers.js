import Emitter from '|Assets/js/eventEmitter'

import { ModuleTitle } from '|Components/module/title/title'
import { ModuleLogo } from '|Components/module/logo/logo'
import { FormForm } from '|Components/form/form/form'
import { FormError } from '|Components/form/error/error'
import { FormLabel } from '|Components/form/label/label'
import { FormInput } from '|Components/form/input/input'
import { FormCheckbox } from '|Components/form/checkbox/checkbox'
import { FastMessage } from '|Components/fastMessage/fastMessage'
import { SmallTable } from '|Components/table/small/smallTable'

import { EventsBoardUsers } from './eventsModuleUsers'

import urlLogo from '|Assets/images/hlooLogo.svg'

class Build {
  constructor () {
    const Events = EventsBoardUsers.init(Emitter, Resources.Lang)

    this.title()
    this.logo()
    this.fastMessage()
    this.smallTable()
    this.form(Events)
    this.formError()
    this.formLabel()
    this.formName()
    this.formAlias()
    this.formEmail()
    this.formPassword()
    this.formRepeatPassword()
    this.formState()

    Emitter.clear('[formLabel]:getLabel')

    // Emitter.checkEvents
  }

  title () {
    const moduleTitle = ModuleTitle.init(Emitter)
    moduleTitle.setTitle = Resources.Lang.module.title
  }

  logo () {
    const moduleLogo = ModuleLogo.init(Emitter)
    moduleLogo.setLogo = urlLogo
  }

  form (Event) {
    const moduleForm = FormForm.init(Emitter, 'module')
    moduleForm.setProps = Resources.Lang.form.form

    Event.form(moduleForm.getButtons)
  }

  formError () {
    FormError.init(Emitter)
  }

  formLabel () {
    FormLabel.init(Emitter)
  }

  formName () {
    const formName = FormInput.init(Emitter)
    formName.setProps = Resources.Lang.form.formName
  }

  formAlias () {
    const formAlias = FormInput.init(Emitter)
    formAlias.setProps = Resources.Lang.form.formAlias
  }

  formEmail () {
    const formEmail = FormInput.init(Emitter)
    formEmail.setProps = Resources.Lang.form.formEmail
  }

  formPassword () {
    const formPassword = FormInput.init(Emitter)
    formPassword.setProps = Resources.Lang.form.formPassword
  }

  formRepeatPassword () {
    const formRepeatPassword = FormInput.init(Emitter)
    formRepeatPassword.setProps = Resources.Lang.form.formRepeatPassword
  }

  formState () {
    const formState = FormCheckbox.init(Emitter)
    formState.setProps = Resources.Lang.form.formState
  }

  fastMessage () {
    FastMessage.init(Emitter, 'module')
  }

  smallTable () {
    SmallTable.init(Emitter, 'module')

    Emitter.emit('[smallTable]:building', {
      header: ['id', 'alias', 'state'],
      icons: {active: 'far fa-check-square', inactive: 'far fa-square'},
      body: [
        {id: 0, alias: 'Alias', checkbox: {id: 'alias2', state: true}},
        {id: 0, alias: 'Alias', checkbox: {id: 'alias3', state: false}},
        {id: 0, alias: 'Alias', checkbox: {id: 'alias4', state: true}}
      ]
    })
  }

  static init () {
    return new Build()
  }
}


module.exports = {CreateBuildBoardUsers: Build}
