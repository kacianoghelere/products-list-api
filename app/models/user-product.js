module.exports = (sequelize, DataTypes) => {
  const UserProduct = sequelize.define('UserProduct', {
    user_id: DataTypes.INTEGER(11),
    product_id: DataTypes.INTEGER(11)
  }, {
    paranoid: true,
    tableName: 'user_products',
    timestamps: false
  })

  UserProduct.associate = (models) => {
    UserProduct.belongsTo(models.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'user'
    })

    UserProduct.belongsTo(models.Product, {
      foreignKey: 'product_id',
      targetKey: 'id',
      as: 'product'
    })
  }

  return UserProduct
}