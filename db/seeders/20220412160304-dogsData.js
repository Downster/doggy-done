"use strict";
const dayjs = require("dayjs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Dogs",
      [
        {
          owner_id: 1,
          name: "Hachiko",
          breed_id: 1,
          createdAt: dayjs().toDate(),
          updatedAt: dayjs().toDate(),
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
    return queryInterface.bulkDelete("Dogs", null, {});
  },
};
