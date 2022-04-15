"use strict";
const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const password = "Password123!";
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/
    return bcrypt.hash(password, 10).then((password) => {
      return queryInterface.bulkInsert(
        "Users",
        [
          {
            email: "joe@gmail.com",
            display_name: "joeSchmoe",
            firstName: "Joe",
            lastName: "Schmoe",
            password: password,
            photo:
              "https://www.looper.com/img/gallery/heres-where-you-can-watch-despicable-me/intro-1634355974.webp",
            createdAt: dayjs().toDate(),
            updatedAt: dayjs().toDate(),
          },
        ],
        {}
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.*/

    return queryInterface.bulkDelete("Users", null, {});
  },
};
