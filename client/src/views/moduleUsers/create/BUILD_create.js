import { DATA_TITLE, DATA_LOGO, DATA_FORM, DATA_TABLE } from '../global/DATA'

import { ModuleTitle } from '|Components/module/title/title'
import { ModuleLogo } from '|Components/module/logo/logo'
import { FormForm } from '|Components/form/form/form'
import { FormError } from '|Components/form/error/error'
import { FormLabel } from '|Components/form/label/label'
import { FormInput } from '|Components/form/input/input'
import { FormCheckbox } from '|Components/form/checkbox/checkbox'
import { FormSelect } from '|Components/form/select/select'
import { FastMessage } from '|Components/fastMessage/fastMessage'
import { TableSmall } from '|Components/table/small/small'
import { TablePagination } from '|Components/table/pagination/pagination'
import { TableOrdering } from '|Components/table/ordering/ordering'
import { TableSeeker } from '|Components/table/seeker/seeker'

import { REST_create } from './REST_create'
import { TABLE_global } from '../global/TABLE'

class BUILD {
  constructor () {
    const REST = REST_create.init()
    const TABLE = TABLE_global.init()

    this.title()
    this.logo()
    this.fastMessage()
    this.formElements()
    this.tableSmall(TABLE)
    this.form(REST)
    this.formName()
    this.formAlias()
    this.formEmail()
    this.formPassword()
    this.formRepeatPassword()
    this.formState()

    _EMITTER.clear('[formLabel]:getLabel')
    _EMITTER.clear('[formSelect]:building')
    _EMITTER.clear('[tableSmall]:building')
    _EMITTER.clear('[tablePagination]:building')
    _EMITTER.clear('[tableOrdering]:building')
    _EMITTER.clear('[tableSeeker]:building')

  }

  title () {
    const moduleTitle = ModuleTitle.init()
    moduleTitle.setProps = DATA_TITLE
  }

  logo () {
    const moduleLogo = ModuleLogo.init()
    moduleLogo.setProps = DATA_LOGO
  }

  form (REST) {
    const moduleForm = FormForm.init(DATA_FORM.OUTPUT)
    moduleForm.setProps = DATA_FORM.CONTAINER

    REST.form(moduleForm.getButtons)
  }

  formElements () {
    FormError.init()
    FormLabel.init()
    FormSelect.init()

    // PROPIEDADES PARA LA CREACIÓN DE UN SELECT
    // const formSelect = FormSelect.init()
    // formSelect.setProps = {
    //   id: 'idSelect',
    //   config: {
    //     label: false
    //   },
    //   options: [
    //     {value: {id: 1}, label: 'Option A'},
    //     {value: {id: 2}, label: 'Option B'},
    //     {value: {id: 3}, label: 'Option C'},
    //     {value: {id: 4}, label: 'Option D'},
    //     {value: {id: 5}, label: 'Option E'},
    //     {value: {id: 6}, label: 'Option F'}
    //   ]
    // }
  }

  formName () {
    const formName = FormInput.init()
    formName.setProps = DATA_FORM.NAME
  }

  formAlias () {
    const formAlias = FormInput.init()
    formAlias.setProps = DATA_FORM.ALIAS
  }

  formEmail () {
    const formEmail = FormInput.init()
    formEmail.setProps = DATA_FORM.EMAIL
  }

  formPassword () {
    const formPassword = FormInput.init()
    formPassword.setProps = DATA_FORM.PASSWORD
  }

  formRepeatPassword () {
    const formRepeatPassword = FormInput.init()
    formRepeatPassword.setProps = DATA_FORM.REPEAT_PASSWORD
  }

  formState () {
    const formState = FormCheckbox.init()
    formState.setProps = DATA_FORM.STATE
  }

  fastMessage () {
    FastMessage.init('module')
  }

  tableSmall (TABLE) {
    TableSmall.init('module')

    TablePagination.init(DATA_TABLE.TABLE_SMALL.OUTPUT)

    TableOrdering.init(DATA_TABLE.TABLE_SMALL.OUTPUT)

    TableSeeker.init(DATA_TABLE.TABLE_SMALL.OUTPUT)

    TABLE.tableSmall()
  }

  static init () {
    return new BUILD()
  }
}


module.exports = {BUILD_create: BUILD}
