'use strict';

const { range, random } = require('../../app/utils')

module.exports = {
  up: (queryInterface) => {
    const userListProducts = [...range(1, 100)].map((index) => ({
      user_list_id: 1,
      product_id: index,
      amount: random(1, 4)
    }))

    return queryInterface.bulkInsert('user_list_products', userListProducts)
  },
  down: (queryInterface) => queryInterface.bulkDelete('user_list_products', null, {})
}