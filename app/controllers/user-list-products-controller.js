const { Product } = require(`${__basedir}/app/models`)
const controller = require('./controller')

module.exports = controller((router) => {
  router.get('/:user_list_id', (request, response) => {
    return response.json({}) // RETURNS USER LISTS
  })

  router.post('/:product_id', (request, response) => {
    return response.sendStatus(204) // ADDS PRODUCT TO USER LIST
  })

  router.delete('/:product_id', (request, response) => {
    return response.sendStatus(204) // REMOVES PRODUCT FROM USER LIST
  })
})