'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: DataTypes.STRING,
    owner_id: DataTypes.INTEGER
  }, {});
  List.associate = function(models) {
    // associations can be defined here
  };
  return List;
};