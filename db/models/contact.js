"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      user_id1: DataTypes.INTEGER,
      user_id2: DataTypes.INTEGER,
    },
    {}
  );

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const columnMap = {
    through: "Contact",
    otherKey: "user_id1",
    foreignKey: "user_id2",
  };

  Contact.associate = function (models) {
    // associations can be defined here
    // Contact.belongsToMany(models.Contact, columnMap)
=======
  Contact.associate = function(models) {
    // associations can be defined here
>>>>>>> 8b3887d (update user self-association for contacts)
=======
  Contact.associate = function(models) {
    // associations can be defined here
=======
  const columnMap = {
    through: "Contact",
    otherKey: "user_id1",
    foreignKey: "user_id2",
  };

  Contact.associate = function (models) {
    // associations can be defined here
    // Contact.belongsToMany(models.Contact, columnMap)
>>>>>>> 181fd02 (Added css files, logout page, navbar)
>>>>>>> 023a344 (Added css files, logout page, navbar)
=======
  Contact.associate = function (models) {
    // associations can be defined here
>>>>>>> 94ae998 (REBASED)
  };
  return Contact;
};
