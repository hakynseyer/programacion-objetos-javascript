class TableSmallEvents {
  updateTable (input, limitByPage, table) {
    if (!isNaN(input.value)) this.requestData(input.getAttribute('name'), limitByPage)
    else {
      input.value = 1
      input.focus()
      this.requestData(input.getAttribute('name'), limitByPage)
    }

    _EMITTER.emit('[tableOrdering]:cleaner', table)
  }

  updateTableSearching (elements, currentPage, limitByPage, table) {
    const input = elements.searchInput[0].value
    const server = elements.serverButton[0].value

    if (server === 'true') {
      _EMITTER.emit('[tablePagination]:cleaner', currentPage.getAttribute('name'))
      _EMITTER.emit('[tableSmall]:cleaner', table)

      if (input) this.requestDataSearch(input, currentPage.getAttribute('name'), limitByPage)
      else {
        // TODO: Crear un mensaje rápido arriba del botón server el cual muestre un mensaje de no se ha escrito nada en el input o algo similar
      }
    } else _EMITTER.emit('[tableOrdering]:searching', {search: ['alias', 'email'], value: input, table: table})
  }

  paginationEvents (elements, limitByPage, table) {
    elements.input.addEventListener('keyup', e => this.updateTable(elements.input, limitByPage, table))

    elements.buttons.buttonLeft.addEventListener('click', e => this.updateTable(elements.input, limitByPage, table))

    elements.buttons.buttonRight.addEventListener('click', e => this.updateTable(elements.input, limitByPage, table))
  }

  seekerEvents (elements, currentPage, limitByPage, table) {
    elements.searchInput[0].addEventListener('keyup', e => {
      if (e.keyCode === 13) this.updateTableSearching(elements, currentPage, limitByPage, table)
    })

    elements.searchButton[0].addEventListener('click', e => this.updateTableSearching(elements, currentPage, limitByPage, table))

    elements.serverButton[0].addEventListener('click', e => {
      if (elements.serverButton[0].value === 'false') {
        this.updateTable(currentPage, limitByPage, table)
        elements.searchInput[0].value = ''
      }
    })
  }
}

class TableSmall extends TableSmallEvents{
  constructor (DATA_TABLE) {
    super()

    this.DATA_TABLE = DATA_TABLE
  }

  requestData () {
    throw new Error('You must implement this method "requestData"')
  }

  requestDataSearch () {
    throw new Error('You must implement this method "requestDataSearch"')
  }

  buildingTable () {
    throw new Error('You must implement this method "buildingTable"')
  }

  tableSmall () {
    _EMITTER.emit('[tableSmall]:building', {
      HEADER: this.DATA_TABLE.TABLE_SMALL.HEADER,
      ID: this.DATA_TABLE.TABLE_SMALL.ID,
      BODY: null
    })

    const seekerElements = _EMITTER.emit('[tableSeeker]:building', this.DATA_TABLE.TABLE_SMALL.SEEKER)

    _EMITTER.emit('[tableOrdering]:building', this.DATA_TABLE.TABLE_SMALL.ORDERING)

    const paginationElements = _EMITTER.emit('[tablePagination]:building', this.DATA_TABLE.TABLE_SMALL.PAGINATION)

    this.paginationEvents(paginationElements, this.DATA_TABLE.TABLE_SMALL.LIMIT_BY_PAGE, this.DATA_TABLE.TABLE_SMALL.ID)
    this.seekerEvents(seekerElements, paginationElements.input, this.DATA_TABLE.TABLE_SMALL.LIMIT_BY_PAGE, this.DATA_TABLE.TABLE_SMALL.ID)

    this.requestData(this.DATA_TABLE.TABLE_SMALL.PAGINATION.NAME_INPUT, this.DATA_TABLE.TABLE_SMALL.LIMIT_BY_PAGE)

    this.buildingTable()
  }
}

module.exports = {MIXIN_TableSmall: TableSmall}
