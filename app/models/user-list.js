module.exports = (sequelize, DataTypes) => {
  const UserList = sequelize.define('UserList', {
    title: DataTypes.STRING
  }, {
    paranoid: true,
    tableName: 'user_lists',
    timestamps: true
  })

  UserList.associate = (models) => {
    UserList.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'user'
    })

    UserList.hasMany(models.UserListProduct, {
      sourceKey: 'id',
      foreignKey: 'user_list_id',
      as: 'listProducts'
    })

    UserList.belongsToMany(models.Product, {
      through: 'UserListProduct',
      as: 'products',
      foreignKey: 'product_id'
    })
  }

  return UserList
}