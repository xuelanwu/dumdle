"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dog.belongsTo(models.User, { foreignKey: "ownerId" });
      Dog.hasMany(models.DogImage, {
        foreignKey: "dogId",
        onDelete: "CASCADE",
        hooks: true,
      });
      Dog.hasMany(models.Friend, { foreignKey: "dogId_1" });
      Dog.hasMany(models.Friend, { foreignKey: "dogId_2" });
    }
  }
  Dog.init(
    {
      ownerId: { type: DataTypes.INTEGER, allowNull: false },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 50],
        },
      },
      age: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          max: {
            args: [20],
            msg: "Max age is not valid",
          },
          min: {
            args: [0],
            msg: "Min age is not valid",
          },
        },
      },
      gender: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["female", "male", "other"]],
            msg: "Must be Female, Male or Other",
          },
        },
      },
      size: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["small", "medium", "large", "giant"]],
            msg: "Must be Small, Medium, Large or Giant",
          },
        },
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 50],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
        },
      },
      // fixed: { type: DataTypes.BOOLEAN, allowNull: false },
      // houseTrained: { type: DataTypes.BOOLEAN, allowNull: false },
      // energyLevel: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      //   validate: {
      //     min: {
      //       args: 1,
      //       msg: "EnergyLevel is not valid",
      //     },
      //     max: {
      //       args: 3,
      //       msg: "EnergyLevel is not valid",
      //     },
      //   },
      // },
      // goodWithCats: { type: DataTypes.BOOLEAN, allowNull: false },
      // goodWithKids: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      modelName: "Dog",
    }
  );
  return Dog;
};
