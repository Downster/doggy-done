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
      "Notes",
      [
        {
          owner_id: 1,
          task_id: 1,
          text: "Try a different trail",
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
    return queryInterface.bulkDelete("Notes", null, {});
  },
};
