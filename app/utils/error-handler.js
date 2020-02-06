const HttpStatus = require('http-status-codes')

const HttpError = require('./http-error')

module.exports = {
  handle: (error, response) => {
    console.error(error)

    if (error instanceof HttpError) {
      return response.status(error.code).json({ message: error.message })
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      return response.status(HttpStatus.CONFLICT).json({
        message: error
      })
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Ocorreu um erro inexperado no servidor'
    })
  },
  badRequest: (message) => {
    throw new HttpError(HttpStatus.BAD_REQUEST, message)
  },
  conflict: (message) => {
    throw new HttpError(HttpStatus.CONFLICT, message)
  },
  forbidden: (message) => {
    throw new HttpError(HttpStatus.FORBIDDEN, message)
  },
  internalServerError: (message) => {
    throw new HttpError(HttpStatus.INTERNAL_SERVER_ERROR, message)
  },
  notFound: (message) => {
    throw new HttpError(HttpStatus.NOT_FOUND, message)
  },
  unauthorized: (message) => {
    throw new HttpError(HttpStatus.UNAUTHORIZED, message)
  }
}