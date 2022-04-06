'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init({
    user_id1: DataTypes.INTEGER,
    user_id2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};