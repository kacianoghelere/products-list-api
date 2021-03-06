const jwt = require('jsonwebtoken')

const uncheckedRoutes = [
  '/sign-in',
  '/sign-up'
]

module.exports = {
  authenticateJWT: (request, response, next) => {
    if (uncheckedRoutes.indexOf(request.path) !== -1) {
      return next()
    }

    const authorizationHeader = request.headers.authorization

    if (authorizationHeader) {
      const [,token] = authorizationHeader.split(' ')

      jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
          console.error('Authenticate JWT', error)

          return response.status(401).json({
            message: 'O token de acesso recebido não é valido.'
          })
        }

        request.user = user

        next()
      })
    } else {
      response.status(401).json({
        message: 'O cabeçalho Authorization não foi informado.'
      })
    }
  }
}