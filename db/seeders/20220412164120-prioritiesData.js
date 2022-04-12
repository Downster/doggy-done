'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Priorities', [
     { name: 'Low priority', createdAt: new Date(), updatedAt: new Date()},
     { name: 'Medium priority', createdAt: new Date(), updatedAt: new Date()},
     { name: 'High priority', createdAt: new Date(), updatedAt: new Date()},
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Priorities', null, {});
  }
};
