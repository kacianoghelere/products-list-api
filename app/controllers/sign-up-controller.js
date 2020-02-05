const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require(`${__basedir}/app/models`)
const controller = require('./controller')

module.exports = controller((router) => {
  router.post('/', async (request, response) => {
    try {
      const { name, email, password } = request.body

      const salt = await bcrypt.genSalt(5)

      const hashedPassword = await bcrypt.hash(password, salt)

      const allowedFields = ['name', 'email', 'password']

      const user = await User.create({
        name,
        email,
        password: hashedPassword
      }, {
        fields: allowedFields
      })

      const token = jwt.sign({
        id: user.id,
        name: user.name
      }, process.env.JWT_SECRET_KEY)

      response.json({ token })
    } catch (error) {
      console.error(error)

      return response.sendStatus(500)
    }
  })
})