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
        {
          dogId: 3,
          tagId: 1,
        },
        {
          dogId: 3,
          tagId: 2,
        },
        {
          dogId: 3,
          tagId: 3,
        },
        {
          dogId: 3,
          tagId: 4,
        },
        {
          dogId: 3,
          tagId: 5,
        },
        {
          dogId: 3,
          tagId: 6,
        },
        {
          dogId: 3,
          tagId: 7,
        },
        {
          dogId: 3,
          tagId: 8,
        },
        {
          dogId: 3,
          tagId: 9,
        },
        {
          dogId: 3,
          tagId: 10,
        },
        {
          dogId: 3,
          tagId: 11,
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
