'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('user_list_products', {
      user_list_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'user_lists',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'unique-product-user-list'
      },
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'unique-product-user-list'
      },
      amount: {
        type: DataTypes.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
    }, {})
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('user_list_products')
  }
}
