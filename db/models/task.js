'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init({
    id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    dog_id: DataTypes.INTEGER,
    detail: DataTypes.STRING,
    notes: DataTypes.STRING,
    priority: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};