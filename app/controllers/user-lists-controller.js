const HttpStatus = require('http-status-codes')

const { Product, UserList, UserListProduct } = require(`${__basedir}/app/models`)
const { random } = require(`${__basedir}/app/utils`)
const controller = require('./controller')

module.exports = controller((router, ErrorHandler, EntityService) => {
  router.get('/:user_id/lists', async (request, response) => {
    try {
      await EntityService.validateUser(request.params.user_id)

      const userLists = await EntityService.getUserLists(request.params.user_id)

      return response.json(userLists)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

  router.get('/my-lists', async (request, response) => {
    try {
      const userLists = await getUserLists(request.user.id)

      return response.json(userLists)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

  router.get('/:id', async (request, response) => {
    try {
      const userList = await EntityService.getUserList(request.params.id, {
        attributes: ['id', 'title', 'createdAt']
      })

      return response.json(userList)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

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
      ErrorHandler.handle(error, response)
    }
  })

  router.put('/:id', async (request, response) => {
    try {
      const userList = await EntityService.getUserList(request.params.id)

      await userList.update(request.body, { fields: ['title'] })

      return response.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

  router.delete('/:id', async (request, response) => {
    try {
      const userList = await EntityService.getUserList(request.params.id)

      await userList.destroy()

      return response.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })
})