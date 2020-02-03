module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    image: DataTypes.STRING
  }, {
    paranoid: true,
    tableName: 'products',
    timestamps: false
  })

  return Product
}