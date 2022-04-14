"use strict";
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    "List",
    {
      name: DataTypes.STRING,
      owner_id: DataTypes.INTEGER,
    },
    {}
  );

  const columnMap = {
<<<<<<< HEAD
    through: "TaskList",
    otherKey: "task_id",
    foreignKey: "list_id",
  };
  List.associate = function (models) {
=======
    through:'TaskList',
    otherKey: 'task_id',
    foreignKey: 'list_id',
  }
  List.associate = function(models) {
>>>>>>> 7a7de1e (task and list migrations updated for cascading delete on tasklists)
    // associations can be defined here
    List.belongsToMany(models.Task, columnMap),
      List.belongsTo(models.User, { foreignKey: "owner_id" });
  };
  return List;
};
