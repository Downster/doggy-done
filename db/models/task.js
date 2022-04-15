"use strict";
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      owner_id: DataTypes.INTEGER,
      dog_id: DataTypes.INTEGER,
      detail: DataTypes.STRING,
      due_date: DataTypes.DATE,
      priority: DataTypes.INTEGER,
      completed: DataTypes.BOOLEAN,
    },
    {}
  );

  const columnMap = {
    through:'TaskList',
    otherKey: 'list_id',
    foreignKey: 'task_id',
  }

  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.Priority, {foreignKey: 'priority'});
    Task.belongsToMany(models.List, columnMap);
    Task.belongsTo(models.Dog, {foreignKey: 'dog_id'});
  };
  return Task;
};
