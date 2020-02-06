const HttpStatus = require('http-status-codes')

const { Product } = require(`${__basedir}/app/models`)
const controller = require('./controller')

module.exports = controller((router, ErrorHandler, EntityService) => {
  router.get('/', async (request, response) => {
    try {
      const page = parseInt(request.query.page)

      const limit = 20

      const offset = (page * limit)

      const productsCount = await Product.count()

      const totalPages = productsCount / limit

      const products = await Product.findAll({ limit, offset })

      return response.json({
        page: page + 1,
        results: products,
        totalPages
      })
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

  router.get('/:product_id', async (request, response) => {
    try {
      const product = await EntityService.getProduct(request.params.product_id, {
        attributes: ['id', 'name', 'price', 'image']
      })

      return response.json(product)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

  router.post('/', async (request, response) => {
    try {
      const product = await Product.create(request.body, {
        fields: ['name', 'price', 'image']
      })

      return response.json(product)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

  router.put('/:product_id', async (request, response) => {
    try {
      const product = await EntityService.getProduct(request.params.product_id)

      await product.update(request.body, {
        fields: ['name', 'price', 'image']
      })

      return response.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

  router.delete('/:product_id', async (request, response) => {
    try {
      const product = await EntityService.getProduct(request.params.product_id)

      await product.destroy()

      return response.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })
})