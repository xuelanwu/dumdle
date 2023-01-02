"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DogImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DogImage.belongsTo(models.Dog, { foreignKey: "dogId" });
    }
  }
  DogImage.init(
    {
      dogId: { type: DataTypes.INTEGER, allowNull: false },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Must be in url format",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "DogImage",
    }
  );
  return DogImage;
};
