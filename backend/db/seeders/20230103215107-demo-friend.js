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
      "Friends",
      [
        {
          dogId_1: 1,
          dogId_2: 2,
          status: "matched",
        },
        {
          dogId_1: 1,
          dogId_2: 3,
          status: "initial",
        },
        {
          dogId_1: 4,
          dogId_2: 1,
          status: "pending",
        },
        {
          dogId_1: 1,
          dogId_2: 5,
          status: "pending",
        },
        {
          dogId_1: 2,
          dogId_2: 3,
          status: "matched",
        },
        {
          dogId_1: 2,
          dogId_2: 4,
          status: "matched",
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
    await queryInterface.bulkDelete("Friends", null, {});
  },
};
