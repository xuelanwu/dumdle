"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DogTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DogTag.init(
    {
      dogId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DogTag",
      timestamps: false,
    }
  );
  return DogTag;
};
