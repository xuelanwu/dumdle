"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DirectMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DirectMessage.belongsTo(models.Friend, { foreignKey: "friendId" });
      DirectMessage.belongsTo(models.Dog, { foreignKey: "senderId" });
    }
  }
  DirectMessage.init(
    {
      friendId: { type: DataTypes.INTEGER, allowNull: false },
      senderId: { type: DataTypes.INTEGER, allowNull: false },
      message: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "DirectMessage",
    }
  );
  return DirectMessage;
};
