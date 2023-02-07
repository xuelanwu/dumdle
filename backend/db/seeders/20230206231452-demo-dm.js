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
          message: "Lorem ipsum dolor sit amet.",
        },
        {
          friendId: 1,
          senderId: 1,
          message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          friendId: 1,
          senderId: 2,
          message: "Morbi non turpis a eros ullamcorper convallis a ac ex.",
        },
        {
          friendId: 1,
          senderId: 2,
          message:
            "Etiam laoreet nibh vel urna tristique, sed sagittis elit viverra.",
        },
        {
          friendId: 1,
          senderId: 1,
          message: "Praesent tincidunt nunc eu congue ultrices.",
        },
        {
          friendId: 1,
          senderId: 2,
          message:
            "In suscipit urna sit amet tortor dignissim, vel cursus arcu porttitor.",
        },
        {
          friendId: 5,
          senderId: 2,
          message:
            "Nam tincidunt arcu et diam laoreet, eu sagittis tortor dapibus.",
        },
        {
          friendId: 5,
          senderId: 3,
          message: "Nulla sollicitudin ligula eget sollicitudin rutrum.",
        },
        {
          friendId: 5,
          senderId: 2,
          message: "Sed nec augue ac nunc iaculis viverra.",
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
