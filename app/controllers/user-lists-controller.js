const { UserList } = require(`${__basedir}/app/models`)
const controller = require('./controller')

module.exports = controller((router) => {
  router.get('/:user_id', (request, response) => {
    return response.json({}) // RETURNS USER LISTS
  })

  router.post('/', (request, response) => {
    return response.json({}) // CREATES USER LIST
  })

  router.put('/:id', (request, response) => {
    return response.sendStatus(204) // UPDATES USER LIST
  })

  router.delete('/:id', (request, response) => {
    return response.sendStatus(204) // REMOVES USER LIST
  })
})