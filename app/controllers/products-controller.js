const { Product } = require(`${__basedir}/app/models`)
const controller = require('./controller')

module.exports = controller((router) => {
  router.get('/', async (request, response) => {
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
  })

  router.post('/', (request, response) => {
    return response.status(204).end() // CREATES A NEW PRODUCT
  })

  router.delete('/:id', (request, response) => {
    const productId = parseInt(request.params.id)

    return response.status(204).end() // REMOVES A PRODUCT
  })
})