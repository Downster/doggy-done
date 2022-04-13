"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Lists",
      [
        {
          name: "Today",
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Work",
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Home",
          owner_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Lists", null, {});
  },
};
