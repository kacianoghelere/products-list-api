

const controller = require('./controller')

module.exports = controller((router) => {
  router.get('/', (request, response) => {
    response.sendStatus(204)
  })
})