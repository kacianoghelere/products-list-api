const ErrorHandler = require('../utils/error-handler')
const { Product, UserList, UserListProduct } = require(`../models`)

module.exports = {
  getProduct: async (productId, options = {}) => {
    const product = await Product.findByPk(productId, options)

    if (! product) {
      ErrorHandler.notFound(
        `Não encontramos nenhum produto com o código '${productId}'`
      )
    }

    return product
  },
  getUserLists: (user_id) => {
    return UserList.findAll({
      where: { user_id },
      attributes: ['id', 'title', 'createdAt']
    })
  },
  getUserListProduct: async (user_list_id, product_id, options = {}) => {
    const listProduct = await UserListProduct.findOne({
      where: { user_list_id, product_id }
    }, options)

    if (! listProduct) {
      ErrorHandler.notFound(
        `Nenhum produto com código '${product_id}' encontrado na lista '${user_list_id}'`
      )
    }

    return listProduct
  },
  getUser: async (userId, options = {}) => {
    const user = await User.findByPk(userId, options)

    if (! user) {
      ErrorHandler.notFound(`Não encontramos nenhum usuário com o código '${userId}'`)
    }

    return user
  },
  getUserList: async (listId, options = {}) => {
    const userList = await UserList.findByPk(listId, options)

    if (! userList) {
      ErrorHandler.notFound(`Não encontramos nenhuma lista com o código '${listId}'`)
    }

    return userList
  },
}