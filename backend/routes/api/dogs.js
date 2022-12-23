const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Dog } = require("../../db/models");

const { Sequelize, Op } = require("sequelize");

const router = express.Router();

router.post("/", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id;
  const {
    name,
    age,
    gender,
    size,
    breed,
    description,
    // fixed,
    // houseTrained,
    // energyLevel,
    // goodWithCats,
    // goodWithKids,
  } = req.body;

  const dog = await Dog.create({
    ownerId,
    name,
    age,
    gender,
    size,
    breed,
    description,
    // fixed,
    // houseTrained,
    // energyLevel,
    // goodWithCats,
    // goodWithKids,
  });
  return res.json(dog);
});

router.delete("/:dogId", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id;
  const { dogId } = req.params;

  const dog = await Dog.findByPk(dogId);

  if (!dog) {
    const err = new Error("Not Found");
    err.title = "Not Found";
    err.errors = ["Not Found"];
    err.status = 404;
    return next(err);
  }

  if (ownerId === dog.dataValues.ownerId) {
    await dog.destroy();
    res.status = 200;
    return res.json({
      message: `Successfully deleted ${dogId}`,
      statusCode: 200,
    });
  } else return res.json("Only owner can delete");
});

module.exports = router;
