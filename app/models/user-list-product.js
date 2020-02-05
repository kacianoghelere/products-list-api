'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserListProduct = sequelize.define('UserListProduct', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    paranoid: true,
    tableName: 'user_list_products',
    timestamps: false
  })

  UserListProduct.associate = (models) => {
    UserListProduct.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'user'
    })

    UserListProduct.belongsTo(models.Product, {
      foreignKey: 'product_id',
      targetKey: 'id',
      as: 'product'
    })
  }

  return UserListProduct
}