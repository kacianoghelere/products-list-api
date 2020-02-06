const { Product, UserList, UserListProduct } = require(`${__basedir}/app/models`)
const { random } = require(`${__basedir}/app/utils`)
const controller = require('./controller')

module.exports = controller((router) => {
  router.post('/', async (request, response) => {
    try {
      const products = await Product.findAll({ limit: 50 })

      const userList = await UserList.create({
        ...request.body,
        user_id: request.user.id,
        listProducts: products.map((product) => ({
          product_id: product.id,
          amount: random(1, 4)
        }))
      }, {
        fields: ['title', 'user_id'],
        include: [{
          model: UserListProduct,
          as: 'listProducts'
        }]
      })

      return response.json(userList)
    } catch (error) {
      console.error(error)

      return response.status(500).json({ message: error })
    }
  })

  router.put('/:id', async (request, response) => {
    try {
      const userList = await UserList.findByPk(request.params.id)

      await userList.update(request.body, {
        fields: ['title']
      })

      return response.sendStatus(204)
    } catch (error) {
      console.error(error)

      return response.status(500).json({ message: error })
    }
  })

  router.delete('/:id', async (request, response) => {
    try {
      const userList = await UserList.findByPk(request.params.id)

      await userList.destroy()

      return response.sendStatus(204)
    } catch (error) {
      console.error(error)

      return response.status(500).json({ message: error })
    }
  })

  router.get('/:id/products', async (request, response) => {
    try {
      const rawResults = await UserListProduct.findAll({
        where: {
          user_list_id: request.params.id
        },
        attributes: ['amount'],
        include: [{
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'price', 'image']
        }]
      })

      listProducts = rawResults.map(({ dataValues: { amount, product } }) => ({
        ...product.dataValues,
        amount
      }))

      return response.json(listProducts)
    } catch (error) {
      console.error(error)

      return response.status(500).json({ message: error })
    }
  })
})