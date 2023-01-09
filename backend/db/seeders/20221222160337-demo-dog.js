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
          name: "Cedar",
          age: 1,
          gender: "male",
          size: "giant",
          breed: "Bernedoodle",
          description:
            "My mom said she has never met another dog who loves belly rubs as much as Me!",
        },
        {
          ownerId: 2,
          name: "Tom",
          age: 3,
          gender: "male",
          size: "small",
          breed: "Beagle",
          description:
            "I love to go on walks and will spin in circles with anticipation.",
        },
        {
          ownerId: 3,
          name: "Jerry",
          age: 0,
          gender: "female",
          size: "large",
          breed: "Border Collie",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nisi risus, auctor rutrum dui in, faucibus vulputate est. Donec in diam a dui condimentum vestibulum a et arcu.",
        },
        {
          ownerId: 4,
          name: "Tic",
          age: 15,
          gender: "other",
          size: "medium",
          breed: "Corgi",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          ownerId: 5,
          name: "Tac",
          age: 20,
          gender: "female",
          size: "small",
          breed: "Golden Retriever",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque massa placerat duis ultricies lacus sed.",
        },
        {
          ownerId: 6,
          name: "Toe",
          age: 18,
          gender: "male",
          size: "giant",
          breed: "German Shepherd",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque massa placerat duis ultricies lacus sed.",
        },
        {
          ownerId: 7,
          name: "Sherlock",
          age: 6,
          gender: "female",
          size: "large",
          breed: "Siberian Husky",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque massa placerat duis ultricies lacus sed.",
        },
        {
          ownerId: 8,
          name: "Watson",
          age: 10,
          gender: "male",
          size: "small",
          breed: "French Bulldog",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque massa placerat duis ultricies lacus sed.",
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
