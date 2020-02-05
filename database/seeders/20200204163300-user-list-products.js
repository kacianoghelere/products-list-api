'use strict';

module.exports = {
  up: (queryInterface) => {
    function* range(start, end) {
      for (let i = start; i <= end; i++) {
        yield i;
      }
    }

    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const userListProducts = [...range(1, 100)].map((product_id) => ({
      user_id: 1,
      product_id,
      amount: random(1, 4)
    }))

    return queryInterface.bulkInsert('user_list_products', userListProducts)
  },
  down: (queryInterface) => queryInterface.bulkDelete('user_list_products', null, {})
}