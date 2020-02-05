const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require(`${__basedir}/app/models`)
const controller = require('./controller')

module.exports = controller((router) => {
  router.post('/', async (request, response) => {
    try {
      const { email, password } = request.body

      const user = await User.findOne({ where: { email } });

      if (! user) {
        return response.status(404).json({
          message: 'Usuário não encontrado'
        })
      }

      if (! bcrypt.compareSync(password, user.password)) {
        return response.status(401).json({
          message: 'Senha incorreta'
        })
      }

      const token = jwt.sign({
        id: user.id,
        name: user.name,
      }, process.env.JWT_SECRET_KEY)

      return response.json({ token })
    } catch (error) {
      console.error(error)

      return response.sendStatus(500)
    }
  })
})