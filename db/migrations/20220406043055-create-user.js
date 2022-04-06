'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(320),
        unique: true,
        allowNull: false,
      },
      displayName: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING(35),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(35),
        allowNull: false,
      },
      hashedPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      photo: {
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
