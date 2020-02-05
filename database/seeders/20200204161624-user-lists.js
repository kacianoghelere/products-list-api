'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('user_lists', [
    {
      id: 1,
      user_id: 1,
      title: 'Meus produtos'
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('user_lists', null, {})
}