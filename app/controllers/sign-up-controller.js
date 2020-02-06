const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require(`${__basedir}/app/models`)
const controller = require('./controller')

module.exports = controller((router, ErrorHandler, EntityService) => {
  router.post('/', async (request, response) => {
    const { name, email, password } = request.body

    try {
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

      return response.json({ token })
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return response.status(HttpStatus.CONFLICT).json({
          message: `O e-mail '${email}' já está sendo utilizado`
        })
      }

      ErrorHandler.handle(error, response)
    }
  })
})