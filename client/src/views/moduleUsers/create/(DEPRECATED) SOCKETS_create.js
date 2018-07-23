import { DATA_TABLE } from '../global/DATA'
import { Random } from '|Assets/js/tools'

class SOCKETSEmitters {
  static getTableSmall (nameInput, limitByPage) {
    _SOCKET.emit('[tableSmall][req]:getUsers', {
      currentPage: _EMITTER.emit('[tablePagination]:getCurrentPage', nameInput),
      limitByPage: limitByPage
    })
  }

  static getTableSmallSearching (search, nameInput, limitByPage) {
    _SOCKET.emit('[tableSmall][req]:getUsersBySearching', {
      searching: search,
      currentPage: _EMITTER.emit('[tablePagination]:getCurrentPage', nameInput),
      limitByPage: limitByPage
    })
  }
}

function updateTable (input, limitByPage, table) {
  if (!isNaN(input.value)) SOCKETSEmitters.getTableSmall(input.getAttribute('name'), limitByPage)
  else {
    input.value = 1
    input.focus()
    SOCKETSEmitters.getTableSmall(input.getAttribute('name'), limitByPage)
  }

  _EMITTER.emit('[tableOrdering]:cleaner', table)
}

function updateTableSearching (elements, currentPage, limitByPage, table) {
  const input = elements.searchInput[0].value
  const server = elements.serverButton[0].value

  if (server === 'true') {
    _EMITTER.emit('[tablePagination]:cleaner', currentPage.getAttribute('name'))
    _EMITTER.emit('[tableSmall]:cleaner', table)

    if (input) SOCKETSEmitters.getTableSmallSearching(input, currentPage.getAttribute('name'), limitByPage)
    else {
      // TODO: Crear un mensaje rápido arriba del botón server el cual muestre un mensaje de no se ha escrito nada en el input o algo similar
    }
  } else _EMITTER.emit('[tableOrdering]:searching', {search: ['alias', 'email'], value: input, table: table})
}

class SOCKETSEvents {
  paginationEvents (elements, limitByPage, table) {
    elements.input.addEventListener('keyup', e => updateTable(elements.input, limitByPage, table))

    elements.buttons.buttonLeft.addEventListener('click', e => updateTable(elements.input, limitByPage, table))

    elements.buttons.buttonRight.addEventListener('click', e => updateTable(elements.input, limitByPage, table))
  }

  seekerEvents (elements, currentPage, limitByPage, table) {
    elements.searchInput[0].addEventListener('keyup', e => {
      if (e.keyCode === 13) updateTableSearching(elements, currentPage, limitByPage, table)
    })

    elements.searchButton[0].addEventListener('click', e => updateTableSearching(elements, currentPage, limitByPage, table))

    elements.serverButton[0].addEventListener('click', e => {
      if (elements.serverButton[0].value === 'false') {
        updateTable(currentPage, limitByPage, table)
        elements.searchInput[0].value = ''
      }
    })
  }
}

class SOCKETS extends SOCKETSEvents{
  constructor () {super()}

  tableSmall () {
    const limitByPage = 2

    _EMITTER.emit('[tableSmall]:building', {
      HEADER: DATA_TABLE.TABLE_SMALL.HEADER,
      ID: DATA_TABLE.TABLE_SMALL.ID,
      BODY: null
    })

    const seekerElements = _EMITTER.emit('[tableSeeker]:building', DATA_TABLE.TABLE_SMALL.SEEKER)

    _EMITTER.emit('[tableOrdering]:building', DATA_TABLE.TABLE_SMALL.ORDERING)

    const paginationElements = _EMITTER.emit('[tablePagination]:building', DATA_TABLE.TABLE_SMALL.PAGINATION)

    this.paginationEvents(paginationElements, DATA_TABLE.TABLE_SMALL.LIMIT_BY_PAGE, DATA_TABLE.TABLE_SMALL.ID)
    this.seekerEvents(seekerElements, paginationElements.input, DATA_TABLE.TABLE_SMALL.LIMIT_BY_PAGE, DATA_TABLE.TABLE_SMALL.ID)

    SOCKETSEmitters.getTableSmall(DATA_TABLE.TABLE_SMALL.PAGINATION.NAME_INPUT, DATA_TABLE.TABLE_SMALL.LIMIT_BY_PAGE)

    _SOCKET.on('[tableSmall][res]:getUsers', res => {
      const fixUsers = res.rows.map(user => {
        return {
          NO_RENDER: ['state'],
          id: user.id,
          alias: user.alias,
          state: user.state,
          ACTIONS: {
            edit: {
              icon: 'far fa-edit'
            },
            checkbox: {
              raw: user.state,
              id: `checkbox${user.id}`,
              icons: {active: 'far fa-check-square', inactive: 'far fa-square'},
              state: user.state ? true : false
            }
          }
        }
      })


      _EMITTER.emit('[tableSmall]:addBody', {
        ID: DATA_TABLE.TABLE_SMALL.ID,
        BODY: fixUsers
      })

      _EMITTER.emit('[tableOrdering]:setBody', fixUsers)

      const pageRight = Math.ceil(res.count / limitByPage)
      _EMITTER.emit('[tablePagination]:setPageRight', pageRight >= 1 ? pageRight : 1)

    })
  }

  static init () {
    return new SOCKETS
  }
}

module.exports = {SOCKETS_create: SOCKETS}
