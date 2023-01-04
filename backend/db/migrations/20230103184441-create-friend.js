"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Friends", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dogId_1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Dogs", key: "id" },
        onDelete: "CASCADE",
      },
      dogId_2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Dogs", key: "id" },
        onDelete: "CASCADE",
      },
      status: {
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
    await queryInterface.dropTable("Friends");
  },
};
