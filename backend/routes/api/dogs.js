const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Dog } = require("../../db/models");

const { Sequelize, Op } = require("sequelize");

const router = express.Router();

router.put("/:dogId", requireAuth, async (req, res, next) => {
  const ownerId = req.user.id;
  const { dogId } = req.params;
  const { name, age, gender, size, breed, description } = req.body;

  const dog = await Dog.findByPk(dogId);

  if (!dog) {
    const err = new Error("Not Found");
    err.title = "Not Found";
    err.errors = ["Not Found"];
    err.status = 404;
    return next(err);
  }
  if (ownerId === dog.dataValues.ownerId) {
    const updatedDog = await dog.update({
      name,
      age,
      gender,
      size,
      breed,
      description,
    });
    return res.json(updatedDog);
  } else {
    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = ["Unauthorized"];
    err.status = 403;
    return next(err);
  }
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
  } else {
    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = ["Unauthorized"];
    err.status = 403;
    return next(err);
  }
});

module.exports = router;
