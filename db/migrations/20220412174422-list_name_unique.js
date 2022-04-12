'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      return Promise.all([
        queryInterface.addConstraint('Lists', {
          fields: ['name', 'owner_id'],
          type: 'unique',
          name: 'lists_unique_name_by_owner',
        }),
        queryInterface.removeConstraint('Lists', 'Lists_name_key'),
      ])

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
      return Promise.all([
        queryInterface.addConstraint('Lists', {
          fields: ['name'],
          type: "unique",
          name: "Lists_name_key"
        }),
        queryInterface.removeConstraint('Lists', 'lists_unique_name_by_owner'),
    ]);
  }
};
