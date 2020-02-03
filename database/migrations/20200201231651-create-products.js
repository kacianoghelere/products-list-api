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
      }
    }, {})
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('products')
  }
}