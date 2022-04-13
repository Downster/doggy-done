'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskList = sequelize.define('TaskList', {
    task_id: DataTypes.INTEGER,
    list_id: DataTypes.INTEGER
  }, {});
  TaskList.associate = function(models) {
    // associations can be defined here
    // TaskList.belongsTo(models.List,{foreignKey:'list_id'});
    // TaskList.belongsTo(models.Task, { foreignKey: 'task_id'});
  };
  return TaskList;
};
