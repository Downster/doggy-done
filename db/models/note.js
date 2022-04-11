'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    owner_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.User, {foreignKey:'owner_id'}),
    Note.belongsTo(models.Task, {foreignKey: 'task_id'})
  };
  return Note;
};
