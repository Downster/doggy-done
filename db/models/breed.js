'use strict';
const fetch = require("node-fetch");
module.exports = (sequelize, DataTypes) => {
  const Breed = sequelize.define('Breed', {
    name: DataTypes.STRING
  }, {});
  Breed.associate = function(models) {
    Breed.hasMany(models.Dog, {foreignKey: 'breed_id'})
  };
  Breed.gen = async () => {
    const dogAPIbyBreed = "https://api.thedogapi.com/v1/breeds";
    const apiKey = "85fba8f0-d24f-47c9-be09-653017c090d5";
    const response = await fetch(dogAPIbyBreed, {headers: {"x-api-key": apiKey}});
    const data = await response.json();
    const breeds = data.map(datum => datum.name);
    console.log(breeds);
    return breeds;
  }

  return Breed;
};
