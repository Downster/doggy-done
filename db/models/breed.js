'use strict';
module.exports = (sequelize, DataTypes) => {
  const Breed = sequelize.define('Breed', {
    name: DataTypes.STRING
  }, {});
  Breed.associate = function(models) {
    Breed.hasMany(models.Dog, {foreignKey: 'breed_id'})
  };
  return Breed;
};
