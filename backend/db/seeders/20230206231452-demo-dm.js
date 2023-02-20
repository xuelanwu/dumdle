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
      "DirectMessages",
      [
        {
          friendId: 1,
          senderId: 1,
          message: "Hello!",
        },
        {
          friendId: 1,
          senderId: 1,
          message: "Woof! Woof!",
        },
        {
          friendId: 1,
          senderId: 2,
          message: "Hi, nice to meet you!",
        },
        {
          friendId: 5,
          senderId: 2,
          message: "Hi, Jerry!",
        },
        {
          friendId: 5,
          senderId: 3,
          message: "Hello, Tom!",
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
    await queryInterface.bulkDelete("DirectMessages", null, {});
  },
};
