import urlLogo from '|Assets/images/hlooLogo.svg'
import { Random } from '|Assets/js/tools'

const idTable = `tableSmall${Random.basic(20)}`
const nameSeekerInput = `inputTableSmall${Random.basic(20)}`

module.exports = {
  DATA_TITLE: {
    TITLE: _RESOURCES.Lang.module.title
  },
  DATA_LOGO: {
    LOGO: urlLogo
  },
  DATA_FORM: {
    OUTPUT: 'module',
    CONTAINER: {
      TITLE: _RESOURCES.Lang.form.container.title,
      BUTTONS: [
        {
          ID: 'clearButton',
          TITLE: _RESOURCES.Lang.form.container.buttons.clear
        },
        {
          ID: 'sendButton',
          TITLE: _RESOURCES.Lang.form.container.buttons.send
        }
      ],
    },
    NAME: {
      LABEL: _RESOURCES.Lang.form.formName,
      TYPE: 'text',
      NAME: 'name'
    },
    ALIAS: {
      LABEL: _RESOURCES.Lang.form.formAlias,
      TYPE: 'text',
      NAME: 'alias'
    },
    EMAIL: {
      LABEL: _RESOURCES.Lang.form.formEmail,
      TYPE: 'email',
      NAME: 'email'
    },
    PASSWORD: {
      LABEL: _RESOURCES.Lang.form.formPassword,
      TYPE: 'password',
      NAME: 'password'
    },
    REPEAT_PASSWORD: {
      LABEL: _RESOURCES.Lang.form.formRepeatPassword,
      TYPE: 'password',
      NAME: 'repeatPassword'
    },
    STATE: {
      LABEL: _RESOURCES.Lang.form.formState.label,
      NAME: 'state',
      CHECKBOXES: [
        {
          'ID': 'state',
          'VALUE': null,
          'LABEL': _RESOURCES.Lang.form.formState.checkboxes.checkbox_A
        }
      ]
    }
  },
  DATA_FAST_MESSAGE: {
    USER_CREATE: {
      ID: 'userCreate',
      DELAY: 1300,
      TYPE: 'success',
      TITLE: _RESOURCES.Lang.fastMessage.userCreate.title,
      CONTENT: _RESOURCES.Lang.fastMessage.userCreate.content
    }
  },
  DATA_TABLE: {
    TABLE_SMALL: {
      OUTPUT: 'tableSmall',
      ID: idTable,
      HEADER: _RESOURCES.Lang.table.tableSmall.header,
      LIMIT_BY_PAGE: 10,
      SEEKER: {
        PLACEHOLDER: _RESOURCES.Lang.table.tableSmall.seeker.placeholder
      },
      PAGINATION: {
        NAME_INPUT: nameSeekerInput,
        PAGE_LEFT: _RESOURCES.Lang.table.tableSmall.pagination.pageLeft,
        CURRENT_PAGE: 1,
        PAGE_RIGHT: null
      },
      ORDERING: {
        TABLE: idTable,
        ID: 'tableSmallOrdering',
        LABEL: _RESOURCES.Lang.table.tableSmall.ordering.label,
        LABEL_BASE_DEFAULT: _RESOURCES.Lang.table.tableSmall.ordering.labelBaseDefault,
        OPTIONS: [
          {
            value: {
              id: 1,
              order: {type: 'string', order: 'alias'},
              label: _RESOURCES.Lang.table.tableSmall.ordering.options[0]
            },
            label: _RESOURCES.Lang.table.tableSmall.ordering.options[0]
          },
          {
            value: {
              id: 2,
              order: {type: 'string', order: 'state'},
              label: _RESOURCES.Lang.table.tableSmall.ordering.options[1]
            },
            label: _RESOURCES.Lang.table.tableSmall.ordering.options[1]
          }
        ]
      }
    }
  }
}
