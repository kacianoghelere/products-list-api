'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('user_lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }, {})
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('user_lists')
  }
}
