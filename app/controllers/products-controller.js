const { authenticateJWT } = require(`${__basedir}/app/middlewares`)

module.exports = (app) => {
  const { Product } = require(`${__basedir}/app/models`)

  app.get('/products', authenticateJWT, async (request, response) => {
    const products = await Product.findAll()

    response.json(products)
  })

  app.post('/products/:id', authenticateJWT, (request, response) => {
    const productId = parseInt(request.params.id)

    response.status(204).end()
  })

  app.delete('/products/:id', authenticateJWT, (request, response) => {
    const productId = parseInt(request.params.id)

    response.status(204).end()
  })
}