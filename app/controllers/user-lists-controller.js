const HttpStatus = require('http-status-codes')

const { Product, UserList, UserListProduct } = require(`${__basedir}/app/models`)
const { random } = require(`${__basedir}/app/utils`)
const controller = require('./controller')

module.exports = controller((router, ErrorHandler, EntityService) => {
  router.get('/my-lists', async (request, response) => {
    try {
      const page = parseInt(request.query.page) || 0

      const limit = 20

      const { count, rows } = await UserList.findAndCountAll({
        where: { user_id: request.user.id },
        limit,
        offset: (page * limit)
      })

      const userLists = await Promise.all(rows.map(async ({ dataValues }) => {
        const productsCount = await UserListProduct.count({
          where: { user_list_id: dataValues.id }
        })

        return {
          ...dataValues,
          productsCount
        }
      }))

      return response.json({
        currentPage: page + 1,
        results: userLists,
        totalPages: Math.ceil(count / limit)
      })
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
      if (! request.body.title) {
        ErrorHandler.badRequest('Você precisa informar um título para a sua lista')
      }

      const userList = await UserList.create({
        title: request.body.title,
        user_id: request.user.id,
      })

      const initialProducts = await Product.findAll({ limit: 50 })

      initialProducts.forEach((product) => {
        userList.createListProduct({
          product_id: product.id,
          amount: random(1, 3)
        })
      })

      return response.json(userList)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

  router.put('/:id', async (request, response) => {
    try {
      if (! request.body.title) {
        ErrorHandler.badRequest('Você precisa informar um título para a sua lista')
      }

      const userList = await EntityService.getUserList(request.params.id)

      await userList.update({
        title: request.body.title,
        user_id: request.user.id,
      })

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