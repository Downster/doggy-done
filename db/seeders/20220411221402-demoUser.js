"use strict";
const bcrypt = require("bcryptjs");
const password = "Password123!";
const hashed = await bcrypt.hash(password, 10);
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.*/

    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "joe@gmail.com",
          display_name: "joeSchmoe",
          firstName: "Joe",
          lastName: "Schmoe",
          password: hashed,
          photo:
            "https://www.looper.com/img/gallery/heres-where-you-can-watch-despicable-me/intro-1634355974.webp",
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
      Return a promise to correctly handle asynchronicity.*/

    return queryInterface.bulkDelete("Users", null, {});
  },
};
