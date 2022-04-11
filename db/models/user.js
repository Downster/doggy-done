"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING,
      display_name: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {}
  );

  const columnMapUser = {
    through: "Contact",
    otherKey: "contact_id",
    foreignKey: "user_id",
    as: "userContact"
  };

  const columnMapContact = {
    through: "Contact",
    otherKey: "user_id",
    foreignKey: "contact_id",
    as: "contactUser"
  }

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Dog, { foreignKey: "owner_id" }),
      User.hasMany(models.List, { foreignKey: "owner_id" }),
      User.hasMany(models.Note, { foreignKey: "owner_id" }),
      User.hasMany(models.Task, { foreignKey: "owner_id" });
      User.belongsToMany(models.User, columnMapUser);
      User.belongsToMany(models.User, columnMapContact);
  };
  return User;
};
