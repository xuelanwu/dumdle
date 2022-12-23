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
      "Dogs",
      [
        {
          ownerId: 1,
          name: "Tom",
          age: 5,
          gender: 1,
          size: 2,
          breed: "Mixed",
          description:
            "My mom said she has never met another dog who loves belly rubs as much as Me!",
          // fixed: true,
          // houseTrained: true,
          // energyLevel: 1,
          // goodWithCats: true,
          // goodWithKids: true,
        },
        {
          ownerId: 2,
          name: "Jerry",
          age: 3,
          gender: 1,
          size: 3,
          breed: "Beagle",
          description:
            "I love to go on walks and will spin in circles with anticipation.",
          // fixed: true,
          // houseTrained: false,
          // energyLevel: 3,
          // goodWithCats: true,
          // goodWithKids: true,
        },
        {
          ownerId: 3,
          name: "Tic",
          age: 0,
          gender: 1,
          size: 3,
          breed: "Border Collie",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi risus, auctor rutrum dui in, faucibus vulputate est. Donec in diam a dui condimentum vestibulum a et arcu.",
          // fixed: true,
          // houseTrained: true,
          // energyLevel: 3,
          // goodWithCats: false,
          // goodWithKids: true,
        },
        {
          ownerId: 4,
          name: "Tac",
          age: 15,
          gender: 2,
          size: 1,
          breed: "Corgi",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          // fixed: true,
          // houseTrained: true,
          // energyLevel: 2,
          // goodWithCats: true,
          // goodWithKids: false,
        },
        {
          ownerId: 5,
          name: "Toe",
          age: 20,
          gender: 2,
          size: 1,
          breed: "French Bulldog",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque massa placerat duis ultricies lacus sed.",
          // fixed: false,
          // houseTrained: true,
          // energyLevel: 1,
          // goodWithCats: true,
          // goodWithKids: true,
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
    await queryInterface.bulkDelete("Dogs", null, {});
  },
};
