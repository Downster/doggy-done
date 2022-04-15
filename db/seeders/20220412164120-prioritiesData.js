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
      "Priorities",
      [
        {
          name: "High",
          createdAt: dayjs().toDate(),
          updatedAt: dayjs().toDate(),
        },
        {
          name: "Medium",
          createdAt: dayjs().toDate(),
          updatedAt: dayjs().toDate(),
        },
        {
          name: "Low",
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
    return queryInterface.bulkDelete("Priorities", null, {});
  },
};
