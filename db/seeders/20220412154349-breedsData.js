'use strict';

const { Breed } = require ("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return Breed.gen()
        .then(breedsData => {
          return breedsData.map(breed => {
            const obj = {};
            obj.name = breed;
            obj.createdAt = new Date();
            obj.updatedAt = new Date();
            return obj;
          })
        }).then(breedsObjs => {
          breedsObjs.unshift({name: "Just A Doggo", createdAt: new Date(), updatedAt: new Date()});
          return queryInterface.bulkInsert('Breeds', breedsObjs)
        });
      },
  //  return queryInterface.bulkInsert('Breeds', [
  //    { name: 'Akita Inu', createdAt: new Date(), updatedAt: new Date() },
  //    { name: 'Siberian Husky', createdAt: new Date(), updatedAt: new Date() },
  //    { name: 'German Shepherd', createdAt: new Date(), updatedAt: new Date() },
  //    { name: 'Labrador Retriever', createdAt: new Date(), updatedAt: new Date() },
  //    { name: 'Beagle', createdAt: new Date(), updatedAt: new Date() },
  //    { name: 'Pekingese', createdAt: new Date(), updatedAt: new Date() }
  // ], {});
  // },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Breeds', null, {});
  }
};
