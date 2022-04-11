'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    user_id1: DataTypes.INTEGER,
    user_id2: DataTypes.INTEGER
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};