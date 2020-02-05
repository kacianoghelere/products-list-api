'use strict';

const Sequelize = require('sequelize')

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      price: {
        allowNull: false,
        type: DataTypes.DataTypes.DECIMAL(10,2)
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }, {})
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('products')
  }
}