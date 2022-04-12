'use strict';
module.exports = (sequelize, DataTypes) => {
  const Priority = sequelize.define('Priority', {
    name: DataTypes.STRING
  }, {});
  Priority.associate = function(models) {
    // associations can be defined here
    Priority.belongsTo(models.Task, {foreignKey:'priority_id'})
  };
  return Priority;
};
