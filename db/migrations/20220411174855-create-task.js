'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      owner_id: {
        type: Sequelize.INTEGER,
        references: {model:'Users'},
        allowNull: false
      },
      dog_id: {
        type: Sequelize.INTEGER,
        references: {model:'Dogs'}
      },
      detail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      due_date: {
        type: Sequelize.DATE
      },
      priority: {
        type: Sequelize.INTEGER
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};
