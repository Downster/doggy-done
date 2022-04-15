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
      "Lists",
      [
        {
          name: "Today",
          owner_id: 1,
          createdAt: dayjs().toDate(),
          updatedAt: dayjs().toDate(),
        },
        {
          name: "Work",
          owner_id: 1,
          createdAt: dayjs().toDate(),
          updatedAt: dayjs().toDate(),
        },
        {
          name: "Home",
          owner_id: 1,
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
    return queryInterface.bulkDelete("Lists", null, {});
  },
};
