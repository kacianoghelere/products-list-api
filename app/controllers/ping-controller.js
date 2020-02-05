const controller = require('./controller')

module.exports = controller((router) => {
  router.get('/', async (request, response) => {
    response.sendStatus(204)
  })
})