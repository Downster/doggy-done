'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: DataTypes.STRING,
    owner_id: DataTypes.INTEGER
  }, {});

  const columnMap = {
    through:'TaskList',
    otherKey: 'task_id',
    foreignKey: 'list_id',
  }
  List.associate = function(models) {
    // associations can be defined here
    List.belongsToMany(models.Task, columnMap),
    List.belongsTo(models.User, {foreignKey: 'owner_id'})
  };
  return List;
};
