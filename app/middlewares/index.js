const jwt = require('jsonwebtoken')

module.exports = {
  authenticateJWT: (request, response, next) => {
    const authorizationHeader = request.headers.authorization

    if (authorizationHeader) {
      const [,token] = authorizationHeader.split(' ')

      jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
          console.error('authenticateJWT', error)

          return response.status(401).send('O token de acesso recebido não é valido.')
        }

        request.user = user

        next()
      })
    } else {
      response.status(401).send('O cabeçalho Authorization não foi informado.')
    }
  }
}