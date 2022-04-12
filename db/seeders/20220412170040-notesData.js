'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Notes', [
     {owner_id: 1, task_id: 3, text: 'Try a different brand this time', createdAt: new Date(), updatedAt: new Date() },
     {owner_id: 1, task_id: 2, text: 'Ask friends for recommendations', createdAt: new Date(), updatedAt: new Date() }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Notes', null, {});
  }
};
