const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { authenticateJWT } = require(`${__basedir}/app/middlewares`)

module.exports = (app) => {
  const { User } = require(`${__basedir}/app/models`)

  app.get('/ping', authenticateJWT, async (request, response) => {
    response.sendStatus(204)
  })

  app.post('/sign-in', async (request, response) => {
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

      response.json({ token })
    } catch (error) {
      console.error(error)
    }
  })

  app.post('/sign-up', async (request, response) => {
    try {
      const { name, email, password } = request.body

      const salt = await bcrypt.genSalt(5)

      const hashedPassword = await bcrypt.hash(password, salt)

      const user = await User.create({
        name,
        email,
        password: hashedPassword
      })

      const token = jwt.sign({
        id: user.id,
        name: user.name
      }, process.env.JWT_SECRET_KEY)

      response.json({ token })
    } catch (error) {
      console.error(error)
    }
  })
}