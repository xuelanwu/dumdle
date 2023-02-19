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
      "DogTags",
      [
        {
          dogId: 1,
          tagId: 1,
        },
        {
          dogId: 1,
          tagId: 2,
        },
        {
          dogId: 1,
          tagId: 3,
        },
        {
          dogId: 2,
          tagId: 4,
        },
        {
          dogId: 2,
          tagId: 5,
        },
        {
          dogId: 2,
          tagId: 6,
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
  },
};
