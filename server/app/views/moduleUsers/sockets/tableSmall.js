module.exports = (SocketGL, SocketID, Store) => {
  SocketID.on('[tableSmall][req]:getUsers', async props => {
    const offset = (props.currentPage - 1) * props.limitByPage

    const Users = await Store.Users.findAndCountAll({
      attributes: ['id', 'alias', 'state'],
      limit: props.limitByPage,
      offset,
      order: [['updatedAt', 'DESC']]
    })

    SocketID.emit('[tableSmall][res]:getUsers', {rows: Users.rows, count: Users.count})
    // SocketGL.sockets.emit('[tableSmall][res]:getUsers', {Users})
  })

  SocketID.on('[tableSmall][req]:getUsersBySearching', async props => {
    //TODO: Esto esta construido para que solo se renderice la primera página, por lo que si existen más registros que superen el limitByPage, éstos nunca se podrán renderizar.
    const offset = (props.currentPage - 1) * props.limitByPage

    const Users = await Store.Users.findAndCountAll({
      where: {
        $or:[
          { alias: { like: `%${props.searching}%` } },
          { email: { like: `%${props.searching}%` } }
        ]
      },
      attributes: ['id', 'alias', 'state'],
      limit: props.limitByPage,
      offset,
      order: [['updatedAt', 'DESC']]
    })

    SocketID.emit('[tableSmall][res]:getUsers', {rows: Users.rows, count: Users.count})
  })
}
