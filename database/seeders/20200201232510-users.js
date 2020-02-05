'use strict';

const bcrypt = require('bcrypt')

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5))
}

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', [
    {
      id: 1,
      name: 'John Doe',
      email: 'kacianoghelere@gmail.com',
      password: hashPassword('123456')
    },
    {
      id: 2,
      name: 'John Travolta',
      email: 'test1@test.com',
      password: hashPassword('123456')
    }
  ], {}),
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {})
}
