'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('user_products', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        unique: 'unique-product-per-user'
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
        unique: 'unique-product-per-user'
      },
    }, {})
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('user_products')
  }
}
