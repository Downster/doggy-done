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
<<<<<<< HEAD
    through: "TaskList",
    otherKey: "list_id",
    foreignKey: "task_id",
  };
=======
    through:'TaskList',
    otherKey: 'list_id',
    foreignKey: 'task_id',
  }
>>>>>>> 7a7de1e (task and list migrations updated for cascading delete on tasklists)

  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.Priority, { foreignKey: "priority" });
    Task.belongsToMany(models.List, columnMap);
  };
  return Task;
};
