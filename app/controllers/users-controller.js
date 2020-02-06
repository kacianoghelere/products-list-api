const HttpStatus = require('http-status-codes')

const controller = require('./controller')

module.exports = controller((router, ErrorHandler, EntityService) => {
  router.get('/:id', async (request, response) => {
    try {
      const user = await EntityService.getUser(request.params.id, {
        attributes: ['id', 'name', 'email']
      })

      return response.json(user)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })

  router.put('/:id', async (request, response) => {
    try {
      const user = await EntityService.getUser(request.params.id)

      await user.update(request.body, {
        fields: ['name', 'email', 'password']
      })

      return response.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })
})