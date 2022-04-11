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

  const columnMap = {
    through: "Contact",
    otherKey: "user_id2",
    foreignKey: "user_id1",
  };

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Dog, { foreignKey: "owner_id" }),
      User.hasMany(models.List, { foreignKey: "owner_id" }),
      User.hasMany(models.Note, { foreignKey: "owner_id" }),
      User.hasMany(models.Task, { foreignKey: "owner_id" });
    // User.belongsToMany(models.Contact, columnMap);
  };
  return User;
};
