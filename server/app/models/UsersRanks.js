module.exports = (sequelize, DataTypes) => {
  const UsersRanks = sequelize.define('UsersRanks', {
    rank: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    freezeTableName: true
  })

  return UsersRanks
}
