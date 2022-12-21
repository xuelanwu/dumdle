"use strict";
const bcrypt = require("bcryptjs");
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
      "Users",
      [
        {
          email: "demo@user.io",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          hashedPassword: bcrypt.hashSync("password1"),
        },
        {
          email: "user2@user.io",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user3@user.io",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "user4@user.io",
          hashedPassword: bcrypt.hashSync("password4"),
        },
        {
          email: "user5@user.io",
          hashedPassword: bcrypt.hashSync("password5"),
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
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      "Users",
      {
        email: {
          [Op.in]: [
            "demo@user.io",
            "user1@user.io",
            "user2@user.io",
            "user3@user.io",
            "user4@user.io",
            "user5@user.io",
          ],
        },
      },
      {}
    );
  },
};
