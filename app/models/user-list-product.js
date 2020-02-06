'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserListProduct = sequelize.define('UserListProduct', {
    user_list_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    paranoid: true,
    tableName: 'user_list_products',
    timestamps: false
  })

  UserListProduct.associate = (models) => {
    UserListProduct.belongsTo(models.UserList, {
      foreignKey: 'user_list_id',
      targetKey: 'id',
      as: 'list',
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION'
    })

    UserListProduct.belongsTo(models.Product, {
      foreignKey: 'product_id',
      targetKey: 'id',
      as: 'product',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  }

  return UserListProduct
}