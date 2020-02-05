const { authenticateJWT } = require(`${__basedir}/app/middlewares`)

module.exports = (app) => {
  const { Product } = require(`${__basedir}/app/models`)

  app.get('/products', authenticateJWT, async (request, response) => {
    const page = parseInt(request.query.page)

    const limit = 20

    const offset = (page * limit)

    const productsCount = await Product.count()

    const totalPages = productsCount / limit

    const products = await Product.findAll({ limit, offset })

    response.json({
      page: page + 1,
      results: products,
      totalPages
    })
  })

  app.post('/products/:id', authenticateJWT, (request, response) => {
    const productId = parseInt(request.params.id)

    return response.status(204).end()
  })

  app.delete('/products/:id', authenticateJWT, (request, response) => {
    const productId = parseInt(request.params.id)

    return response.status(204).end()
  })
}