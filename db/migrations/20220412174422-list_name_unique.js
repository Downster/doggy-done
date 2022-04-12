'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
      await queryInterface.changeColumn("Lists", "name", {
        type: Sequelize.STRING(35),
        allowNull: false,
      });
      return queryInterface.addConstraint('Lists', {
        fields: ['owner_id', 'name'],
        type: 'unique',
        name: 'lists_unique_name_by_owner',
      });
      
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
