module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    image: DataTypes.STRING
  }, {
    paranoid: true,
    tableName: 'products',
    timestamps: true
  })

  Product.belongsToMany(models.UserList, {
    through: 'UserListProduct',
    as: 'user_lists',
    foreignKey: 'user_list_id'
  })

  return Product
}