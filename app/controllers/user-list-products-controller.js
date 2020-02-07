const HttpStatus = require('http-status-codes')

const { Product, UserListProduct } = require(`${__basedir}/app/models`)
const controller = require('./controller')

const formatListProduct = ({ dataValues: { amount, product } }) => ({
  ...product.dataValues,
  amount
})

const includeProduct = {
  model: Product,
  as: 'product',
  attributes: ['id', 'name', 'price', 'image']
}

module.exports = controller((router, ErrorHandler, EntityService) => {
  router.get('/:user_list_id', async (request, response) => {
    const { user_list_id } = request.params

    try {
      const page = parseInt(request.query.page) || 0

      const limit = 1000

      const { count, rows } = await UserListProduct.findAndCountAll({
        where: { user_list_id },
        limit,
        offset: (page * limit),
        attributes: ['amount'],
        include: [{
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'price', 'image']
        }]
      })

      return response.json({
        currentPage: page + 1,
        results: rows.map(formatListProduct),
        totalPages: Math.ceil(count / limit)
      })
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

  router.get('/:user_list_id/product/:product_id', async (request, response) => {
    try {
      const { product_id, user_list_id } = request.params

      const listProduct = await EntityService.getUserListProduct(
        user_list_id,
        product_id,
        { include: [includeProduct] }
      )

      return response.json(formatListProduct(listProduct))
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

  router.post('/:user_list_id/product/:product_id', async (request, response) => {
    const { product_id, user_list_id } = request.params

    try {
      await EntityService.getProduct(product_id)

      await EntityService.getUserList(user_list_id)

      const listProduct = await UserListProduct.create({
        ...request.body,
        product_id,
        user_list_id
      }, {
        fields: ['user_list_id', 'product_id', 'amount']
      })

      return response.json(formatListProduct(listProduct))
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return response.status(HttpStatus.CONFLICT).json({
          message: `O produto '${product_id}' já pertence à lista`
        })
      }

      ErrorHandler.handle(error, response)
    }
  })

  router.put('/:user_list_id/product/:product_id', async (request, response) => {
    try {
      const { product_id, user_list_id } = request.params

      const listProduct = await EntityService.getUserListProduct(
        user_list_id,
        product_id
      )

      await listProduct.update(request.body, { fields: ['amount'] })

      return response.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

  router.delete('/:user_list_id/product/:product_id', async (request, response) => {
    try {
      const { product_id, user_list_id } = request.params

      const listProduct = await EntityService.getUserListProduct(
        user_list_id,
        product_id
      )

      await listProduct.destroy()

      return response.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })
})