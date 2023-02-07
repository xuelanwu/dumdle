"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Friend.belongsTo(models.Dog, { foreignKey: "dogId_1" });
      Friend.belongsTo(models.Dog, { foreignKey: "dogId_2" });
      Friend.hasMany(models.DirectMessage, {
        foreignKey: "friendId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Friend.init(
    {
      dogId_1: { type: DataTypes.INTEGER, allowNull: false },
      dogId_2: { type: DataTypes.INTEGER, allowNull: false },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["pending", "matched", "rejected", "initial"]],
            msg: "Must be Initial, Pending, Matched or Rejected",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Friend",
      validate: {
        duplicateUser() {
          if (this.dogId_1 === this.dogId_2) {
            throw new Error("You cannot send friend request to yourself");
          }
        },
      },
    }
  );
  return Friend;
};
