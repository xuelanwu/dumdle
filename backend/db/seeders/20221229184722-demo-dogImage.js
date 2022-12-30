"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "DogImages",
      [
        {
          dogId: 1,
          url: "https://images.pexels.com/photos/235805/pexels-photo-235805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 1,
          url: "https://images.pexels.com/photos/46505/swiss-shepherd-dog-dog-pet-portrait-46505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 1,
          url: "https://images.pexels.com/photos/247937/pexels-photo-247937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 2,
          url: "https://images.pexels.com/photos/1938126/pexels-photo-1938126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 2,
          url: "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 2,
          url: "https://images.pexels.com/photos/1124002/pexels-photo-1124002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 3,
          url: "https://images.pexels.com/photos/14267214/pexels-photo-14267214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 3,
          url: "https://images.pexels.com/photos/11335034/pexels-photo-11335034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 3,
          url: "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 4,
          url: "https://images.pexels.com/photos/800330/pexels-photo-800330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 4,
          url: "https://images.pexels.com/photos/825947/pexels-photo-825947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 4,
          url: "https://images.pexels.com/photos/825949/pexels-photo-825949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 5,
          url: "https://images.pexels.com/photos/9294302/pexels-photo-9294302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 5,
          url: "https://images.pexels.com/photos/5108127/pexels-photo-5108127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
          dogId: 5,
          url: "https://images.pexels.com/photos/1870301/pexels-photo-1870301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("DogImage", null, {});
  },
};
