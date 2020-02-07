const HttpStatus = require('http-status-codes')

const { Product } = require(`${__basedir}/app/models`)
const controller = require('./controller')

module.exports = controller((router, ErrorHandler, EntityService) => {
  router.get('/', async (request, response) => {
    try {
      const page = parseInt(request.query.page) || 0

      const limit = 20

      const offset = (page * limit)

      const { count, rows } = await Product.findAndCountAll({ limit, offset })

      return response.json({
        currentPage: page + 1,
        results: rows,
        totalPages: Math.ceil(count / limit)
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

  router.get('/search', async (request, response) => {
    try {
      const { name, priceStart, priceEnd } = request.query

      const product = await Product.findAll({
        where: { name },
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