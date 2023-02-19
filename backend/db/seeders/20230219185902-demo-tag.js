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
      "Tags",
      [
        {
          content: "fetch",
        },
        {
          content: "bullystick",
        },
        {
          content: "watchingTV",
        },
        {
          content: "cats",
        },
        {
          content: "swimming",
        },
        {
          content: "cuddle",
        },
        {
          content: "bark",
        },
        {
          content: "treats",
        },
        {
          content: "agility",
        },
        {
          content: "human",
        },
        {
          content: "running",
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
    await queryInterface.bulkDelete("Tag", null, {});
  },
};
