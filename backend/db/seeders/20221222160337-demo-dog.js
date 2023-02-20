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
          description: "I am 28 in human years.",
        },
        {
          ownerId: 4,
          name: "Tic",
          age: 15,
          gender: "other",
          size: "medium",
          breed: "Corgi",
          description:
            "I like dogs. Cats too. Kids. Bleh. No kids. They stressed me out.",
        },
        {
          ownerId: 5,
          name: "Tac",
          age: 20,
          gender: "female",
          size: "small",
          breed: "Golden Retriever",
          description:
            "I like long walks on the beach...but the neighborhood at your house will do just fine.",
        },
        {
          ownerId: 6,
          name: "Toe",
          age: 18,
          gender: "male",
          size: "giant",
          breed: "German Shepherd",
          description:
            "I'm so full of love that my mom says I'd be a great therapy dog.",
        },
        {
          ownerId: 7,
          name: "Sherlock",
          age: 6,
          gender: "female",
          size: "large",
          breed: "Siberian Husky",
          description: "Yes. Okay, already. I'm a dog. I really am.",
        },
        {
          ownerId: 8,
          name: "Watson",
          age: 10,
          gender: "male",
          size: "small",
          breed: "French Bulldog",
          description:
            "I prefer the comfort of home where I can sit. Dog parks and hikes are too chaotic for me. I like my house.",
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
