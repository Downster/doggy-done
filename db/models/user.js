'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
      unique: true,
    },
    displayName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
    },
    photo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
