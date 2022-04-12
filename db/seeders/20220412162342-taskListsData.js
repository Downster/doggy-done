'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('TaskLists', [
    {task_id: 1, list_id: 1, createdAt: new Date(), updatedAt: new Date()},
    {task_id: 2, list_id: 2, createdAt: new Date(), updatedAt: new Date()},
    {task_id: 3, list_id: 2, createdAt: new Date(), updatedAt: new Date()},
    {task_id: 4, list_id: 3, createdAt: new Date(), updatedAt: new Date()}
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('People', null, {});
  }
};
