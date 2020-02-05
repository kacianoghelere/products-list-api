const express = require('express')

module.exports = (builder, path = '') => {
  const router = express.Router()

  builder(router)

  return {
    path,
    router
  }
}