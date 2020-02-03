'use strict';

const bcrypt = require('bcrypt')

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5))
}

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', [
    {
      name: 'John Doe',
      email: 'kacianoghelere@gmail.com',
      password: hashPassword('123456')
    },
    {
      name: 'John Travolta',
      email: 'test1@test.com',
      password: hashPassword('123456')
    }
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {})
}
