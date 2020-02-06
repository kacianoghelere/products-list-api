const express = require('express')

const ErrorHandler = require(`../utils/error-handler`)
const EntityService = require(`../services/entity-service`)

module.exports = (builder, path = '') => {
  const router = express.Router()

  builder(router, ErrorHandler, EntityService)

  return {
    path,
    router
  }
}