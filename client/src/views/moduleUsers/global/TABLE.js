import { DATA_TABLE } from '../global/DATA'

import { MIXIN_TableSmall } from '|Assets/mixins/tableSmall'

class Table extends MIXIN_TableSmall {
  constructor () {super(DATA_TABLE)}

  requestData (nameInput, limitByPage) {
    _SOCKET.emit('[tableSmall][req]:getUsers', {
      currentPage: _EMITTER.emit('[tablePagination]:getCurrentPage', nameInput),
      limitByPage: limitByPage
    })
  }

  requestDataSearch (search, nameInput, limitByPage) {
    _SOCKET.emit('[tableSmall][req]:getUsersBySearching', {
      searching: search,
      currentPage: _EMITTER.emit('[tablePagination]:getCurrentPage', nameInput),
      limitByPage: limitByPage
    })
  }

  buildingTable () {
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

      const pageRight = Math.ceil(res.count / DATA_TABLE.TABLE_SMALL.LIMIT_BY_PAGE)
      _EMITTER.emit('[tablePagination]:setPageRight', pageRight >= 1 ? pageRight : 1)

    })
  }

  static init () {
    return new Table()
  }
}

module.exports = {TABLE_global: Table}
