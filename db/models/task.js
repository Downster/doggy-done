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

  const columnMap = {
    through:'TaskList',
    otherKey: 'task_id',
    foreignKey: 'list_id'
  }

  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.Priority, {foreignKey: 'priority_id'});
    Task.belongsToMany(models.List, columnMap);
  };
  return Task;
};
