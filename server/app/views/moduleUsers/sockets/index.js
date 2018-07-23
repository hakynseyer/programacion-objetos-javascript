const { Users } = require('../../../tools/chargerModels')

module.exports = (SocketGL, SocketID, PackageSockets) => {
  PackageSockets.moduleUsers.tableSmall(SocketGL, SocketID, {Users})
}
