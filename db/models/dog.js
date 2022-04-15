"use strict";
module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define(
    "Dog",
    {
      owner_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      breed_id: DataTypes.INTEGER,
      photo: DataTypes.STRING,
    },
    {}
  );
  Dog.associate = function (models) {
    // associations can be defined here
    Dog.belongsTo(models.Breed, { foreignKey: "breed_id" }),
    Dog.belongsTo(models.User, { foreignKey: "owner_id" });
    Dog.hasMany(models.Task, {foreignKey: "dog_id"});
  };
  return Dog;
};
