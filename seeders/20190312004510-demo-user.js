'use strict';
var repository = require('../repository/usuarios');
const bcrypt = require('bcryptjs');
module.exports = {
  up: async(queryInterface, Sequelize) => {
    var retorno =  await repository.saveUser({
      name: "Admin",
      tipo: "AD",
      email: "admin@mail.com",
      password: "123456"
    });
    /*
    
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
