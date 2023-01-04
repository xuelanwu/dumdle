const express = require("express");

const { requireAuth, restoreUser } = require("../../utils/auth");
const { Friend, Dog, DogImage } = require("../../db/models");

const { Sequelize, Op } = require("sequelize");

const router = express.Router();

router.get("/matches", requireAuth, async (req, res) => {
  const { dogId } = req.query;

  const friends = await Friend.findAll({
    where: {
      [Op.or]: [{ dogId_1: dogId }, { dogId_2: dogId }],
      status: "matched",
    },
  });
  console.log("************** matches friend", friends);
  if (friends) {
    const matchIds = friends.map((friend) => {
      if (friend.dogId_1 === parseInt(dogId)) return friend.dogId_2;
      else return friend.dogId_1;
    });
    const matches = await Dog.findAll({
      where: {
        id: { [Op.in]: matchIds },
      },
      include: {
        model: DogImage,
      },
    });
    console.log("************** friend in if", friends);
    if (matches) {
      console.log("************** matches in if", matches);
      return res.json(matches);
    } else return res.json(null);
  } else return res.json(null);
});

router.get("/pending", requireAuth, async (req, res) => {
  const { dogId } = req.query;

  const friends = await Friend.findAll({
    where: {
      [Op.or]: [{ dogId_1: dogId }, { dogId_2: dogId }],
      status: "pending",
    },
  });
  console.log("************** friend", friends);
  if (friends) {
    return res.json(friends);
  } else return res.json(null);
});

router.get("/", requireAuth, async (req, res) => {
  console.log("************** get new dog empty");
  console.log("************** get new dog", req.originalUrl);
  const userId = req.user.id;
  console.log("************** get new dog userId", userId);
  const { dogId } = req.query;
  const dogIdNum = parseInt(dogId);
  console.log("************** get dog", dogIdNum);

  const friend = await Dog.findOne({
    include: [
      {
        model: Friend,
        where: {
          dogId_1: dogIdNum,
          status: "initial",
        },
      },
      { model: DogImage },
    ],
  });

  if (friend) {
    console.log("************** one friend", friend);
    return res.json(friend);
  } else {
    const friends = await Friend.findAll({
      where: {
        [Op.or]: [{ dogId_1: dogId }, { dogId_2: dogId }],
        status: { [Op.ne]: "pending" },
      },
    });
    const friendIds = friends.map((friend) => {
      if (friend.dogId_1 === parseInt(dogId)) return friend.dogId_2;
      else return friend.dogId_1;
    });
    const newFriend = await Dog.findOne({
      where: {
        ownerId: {
          [Op.ne]: userId,
        },
        id: {
          [Op.notIn]: [...friendIds],
          [Op.ne]: dogIdNum,
        },
      },
      include: [
        {
          model: DogImage,
        },
      ],
    });
    if (newFriend) {
      return res.json(newFriend);
    } else return res.json(null);
  }
});

router.post("/", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { dogId_1, dogId_2 } = req.body;

  const dog = await Dog.findByPk(dogId_1);

  const friend = await Friend.findOne({
    where: {
      dogId_1,
      dogId_2,
    },
  });

  if (friend) return res.json(friend);
  else if (userId === dog.dataValues.ownerId) {
    const newFriend = await Friend.create({
      dogId_1,
      dogId_2,
      status: "initial",
    });
    return res.json(newFriend);
  } else {
    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = ["Unauthorized"];
    err.status = 403;
    return next(err);
  }
});

router.put("/like", requireAuth, async (req, res) => {
  const { dogId_1, dogId_2 } = req.body;
  const friend = await Friend.findOne({
    where: {
      dogId_1,
      dogId_2,
    },
  });
  if (friend) {
    if (friend.status === "initial") {
      const updatedFriend = await friend.update({
        status: "pending",
      });
      return res.json(updatedFriend);
    } else if (friend.statu === "pending") {
      const updatedFriend = await friend.update({
        status: "matched",
      });
      return res.json(updatedFriend);
    }
  } else {
    const err = new Error("Not Found");
    err.title = "Not Found";
    err.errors = ["Not Found"];
    err.status = 404;
    return next(err);
  }
});

router.put("/block", requireAuth, async (req, res) => {
  const { dogId_1, dogId_2 } = req.body;
  const friend = await Friend.findOne({
    where: {
      dogId_1,
      dogId_2,
    },
  });
  if (friend) {
    const updatedFriend = await friend.update({
      status: "rejected",
    });
    return res.json(updatedFriend);
  } else {
    const err = new Error("Not Found");
    err.title = "Not Found";
    err.errors = ["Not Found"];
    err.status = 404;
    return next(err);
  }
});

module.exports = router;
