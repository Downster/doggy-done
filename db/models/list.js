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
<<<<<<< HEAD
    through: "TaskList",
    otherKey: "task_id",
    foreignKey: "list_id",
  };
  List.associate = function (models) {
=======
=======
>>>>>>> f581fca (Mostly solved)
    through:'TaskList',
    otherKey: 'task_id',
    foreignKey: 'list_id',
  }
  List.associate = function(models) {
<<<<<<< HEAD
>>>>>>> 7a7de1e (task and list migrations updated for cascading delete on tasklists)
=======
=======
    through: "TaskList",
    otherKey: "task_id",
    foreignKey: "list_id",
  };
  List.associate = function (models) {
>>>>>>> 90f3c39 (Mostly solved)
>>>>>>> f581fca (Mostly solved)
    // associations can be defined here
    List.belongsToMany(models.Task, columnMap),
      List.belongsTo(models.User, { foreignKey: "owner_id" });
  };
  return List;
};
