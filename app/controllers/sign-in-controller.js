const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require(`${__basedir}/app/models`)
const controller = require('./controller')

module.exports = controller((router, ErrorHandler) => {
  router.post('/', async (request, response) => {
    try {
      const { email, password } = request.body

      const user = await User.findOne({ where: { email } });

      if (! user) {
        ErrorHandler.notFound('Usuário não encontrado')
      }

      if (! bcrypt.compareSync(password, user.password)) {
        ErrorHandler.unauthorized('Senha incorreta')
      }

      const token = jwt.sign({
        id: user.id,
        name: user.name,
      }, process.env.JWT_SECRET_KEY)

      return response.json({ token })
    } catch (error) {
      ErrorHandler.handle(error, response)
    }
  })
})