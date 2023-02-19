const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Dog, DogImage, Tag } = require("../../db/models");

// const { Sequelize, Op } = require("sequelize");

const router = express.Router();

router.post("/", requireAuth, async (req, res, next) => {
  const { name, age, gender, size, breed, description } = req.body;

  const dog = await Dog.create({
    ownerId: req.user.id,
    name,
    age,
    gender,
    size,
    breed,
    description,
  });
  return res.json(dog);
});

router.get("/", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const dog = await Dog.findOne({
    where: { ownerId: userId },
    include: [
      {
        model: DogImage,
      },
      {
        model: Tag,
      },
    ],
  });

  if (dog) {
    return res.json(dog);
  } else return res.json(null);
});

router.put("/", requireAuth, async (req, res, next) => {
  const userId = req.user.id;

  const { dogId, name, age, gender, size, breed, description } = req.body;

  const dog = await Dog.findByPk(dogId);

  if (!dog) {
    const err = new Error("Not Found");
    err.title = "Not Found";
    err.errors = ["Not Found"];
    err.status = 404;
    return next(err);
  }
  if (userId === dog.dataValues.ownerId) {
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

router.delete("/", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { dogId } = req.body;

  const dog = await Dog.findByPk(dogId);

  if (!dog) {
    const err = new Error("Not Found");
    err.title = "Not Found";
    err.errors = ["Not Found"];
    err.status = 404;
    return next(err);
  }
  if (userId === dog.dataValues.ownerId) {
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

router.post("/images", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { dogId, urls } = req.body;

  const dog = await Dog.findByPk(dogId);

  // const dog = await Dog.findByPk(dogId);
  if (!dog) {
    const err = new Error("Not Found");
    err.title = "Not Found";
    err.errors = ["Not Found"];
    err.status = 404;
    return next(err);
  }

  if (userId === dog.dataValues.ownerId) {
    const images = await DogImage.findAll({
      where: { dogId },
    });
    if (images.length > 0) {
      DogImage.destroy({ where: { dogId } });
    }
    const newImages = await DogImage.bulkCreate([
      { dogId, url: urls[0], blockId: 1 },
      { dogId, url: urls[1], blockId: 2 },
      { dogId, url: urls[2], blockId: 3 },
    ]);
    return res.json(newImages);

    // return res.json(image);
  } else {
    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = ["Unauthorized"];
    err.status = 403;
    return next(err);
  }
});

router.delete("/images", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { imageId } = req.body;

  const image = await DogImage.findByPk(imageId);
  if (!image) {
    const err = new Error("Dog Image couldn't be found");
    err.status = 404;
    err.title = "dogImage Not Found";
    err.errors = ["Dog Image couldn't be found"];
    return next(err);
  }

  const dog = await Dog.findByPk(image.dataValues.dogId);
  if (userId !== dog.dataValues.ownerId) {
    const err = new Error("Dog must belong to the current user");
    err.status = 403;
    err.title = "Forbidden";
    err.errors = ["Dog must belong to the current user"];
    return next(err);
  }

  await image.destroy();

  return res.json({
    message: `Successfully deleted spotImageId:${imageId}`,
    statusCode: 200,
  });
});

router.post("/tags", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { dogId, tags } = req.body;

  const dog = await Dog.findByPk(dogId);

  if (!dog) {
    const err = new Error("Not Found");
    err.title = "Not Found";
    err.errors = ["Not Found"];
    err.status = 404;
    return next(err);
  }

  if (userId === dog.dataValues.ownerId) {
    for (const t of tags) {
      const tag = await Tag.findOne({
        where: { content: t },
      });
      if (tag) {
        await dog.addTag(tag);
      } else {
        const newTag = await Tag.create({ content: t });
        await dog.addTag(newTag);
      }
    }
    const updatedDog = await Dog.findByPk(dogId, { include: Tag });
    return res.json(updatedDog);
  } else {
    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = ["Unauthorized"];
    err.status = 403;
    return next(err);
  }
});

router.put("/tags", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { dogId, tags } = req.body;

  const dog = await Dog.findByPk(dogId);

  if (!dog) {
    const err = new Error("Not Found");
    err.title = "Not Found";
    err.errors = ["Not Found"];
    err.status = 404;
    return next(err);
  }

  if (userId === dog.dataValues.ownerId) {
    for (const t of tags) {
      const tag = await Tag.findOne({
        where: { content: t },
      });
      if (tag) {
        await dog.removeTag(tag);
      }
    }
    const updatedDog = await Dog.findByPk(dogId, { include: Tag });
    return res.json(updatedDog);
  } else {
    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = ["Unauthorized"];
    err.status = 403;
    return next(err);
  }
});

module.exports = router;
