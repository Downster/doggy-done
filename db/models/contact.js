'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    user_id1: DataTypes.INTEGER,
    user_id2: DataTypes.INTEGER
  }, {});

  const columnMap = {
    through: 'Contact',
    otherKey: 'user_id1',
    foreignKey: 'user_id2'
  }

  Contact.associate = function(models) {
    // associations can be defined here
    // Contact.belongsToMany(models.Contact, columnMap)

  };
  return Contact;
};
