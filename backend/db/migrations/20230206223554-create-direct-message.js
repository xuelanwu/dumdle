"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DirectMessages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      friendId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Friends", key: "id" },
        onDelete: "CASCADE",
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Dogs", key: "id" },
        onDelete: "CASCADE",
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DirectMessages");
  },
};
