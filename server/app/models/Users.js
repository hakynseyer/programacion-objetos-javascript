module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    question1: {
      type: DataTypes.STRING,
      defaultValue: 'PENDIENTE',
      allowNull: false
    },
    answer1: {
      type: DataTypes.STRING,
      defaultValue: 'PENDIENTE',
      allowNull: false
    },
    question2: {
      type: DataTypes.STRING,
      defaultValue: 'PENDIENTE',
      allowNull: false
    },
    answer2: {
      type: DataTypes.STRING,
      defaultValue: 'PENDIENTE',
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: -1,
      allowNull: false
    },
    activation: {
      type: DataTypes.STRING,
      defaultValue: 'PENDIENTE',
      allowNull: false
    },
    recover: {
      type: DataTypes.STRING
    },
    soul: {
      type: DataTypes.STRING,
      defaultValue: 'PENDIENTE',
      allowNull: false
    }
  }, {
    freezeTableName: true
  })

  Users.associate = model => {
    Users.belongsTo(model.UsersRanks, {
      as: '_$userRanks',
      foreignKey: {name: 'usersRanks', allowNull: false, defaultValue: 1},
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    })
  }

  return Users
}
