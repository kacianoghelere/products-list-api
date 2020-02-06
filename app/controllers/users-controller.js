const { User, UserList } = require(`${__basedir}/app/models`)
const controller = require('./controller')

module.exports = controller((router) => {
  router.get('/:id', async (request, response) => {
    const user = await User.findByPk(request.params.id, {
      attributes: ['id', 'name', 'email']
    })

    return response.json(user) // RETURNS USER DATA
  })

  router.put('/:id', async (request, response) => {
    const user = await User.findByPk(request.params.id)

    await user.update(request.body, {
      fields: ['name', 'email', 'password']
    })

    return response.sendStatus(204)
  })

  router.get('/:id/lists', async (request, response) => {
    const userLists = await UserList.findAll({
      where: { user_id: request.params.id },
      attributes: ['id', 'title', 'createdAt']
    })

    return response.json(userLists)
  })
})