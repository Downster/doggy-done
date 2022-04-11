'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    owner_id: DataTypes.INTEGER,
    dog_id: DataTypes.INTEGER,
    detail: DataTypes.STRING,
    due_date: DataTypes.DATE,
    priority: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.hasOne(models.Priority, {foreignKey: 'priority'})
  };
  return Task;
};
