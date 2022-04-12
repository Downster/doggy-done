'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Tasks', [
    { owner_id: 1, dog_id: 1, detail: 'Take Hachi on a walk', due_date: new Date(), priority: 5, completed: false, createdAt: new Date(), updatedAt: new Date() },
    { owner_id: 1, dog_id: 1, detail: 'Bring Hachi on hike with friends', due_date: new Date(), priority: 5, completed: false, createdAt: new Date(), updatedAt: new Date() },
    { owner_id: 1, dog_id: 1, detail: 'Buy dog food', due_date: new Date(), priority: 3, completed: false, createdAt: new Date(), updatedAt: new Date() },
    { owner_id: 1, dog_id: 1, detail: 'Schedule a vet appointment', due_date: new Date(), priority: 2, completed: false, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Tasks', null, {});
  }
};
