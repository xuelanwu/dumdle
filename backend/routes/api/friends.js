const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { Friend, Dog, DogImage } = require("../../db/models");

const { Op } = require("sequelize");

const router = express.Router();

router.get("/matches", requireAuth, async (req, res) => {
  const { dogId } = req.query;

  const friends = await Friend.findAll({
    where: {
      [Op.or]: [{ dogId_1: dogId }, { dogId_2: dogId }],
      status: "matched",
    },
  });

  if (friends.length > 0) {
    const friendList = friends.map((friend) => {
      if (friend.dogId_1 === parseInt(dogId)) {
        return { friendId: friend.id, dog: friend.dogId_2 };
      } else {
        return { friendId: friend.id, dog: friend.dogId_1 };
      }
    });

    for (const friend of friendList) {
      const dog = await Dog.findByPk(friend.dog, {
        include: {
          model: DogImage,
        },
      });
      friend.dog = dog;
    }
    return res.json(friendList);
  } else return res.json(null);
});

router.get("/pending", requireAuth, async (req, res) => {
  const { dogId } = req.query;

  const friends = await Friend.findAll({
    where: {
      dogId_1: dogId,
      status: "pending",
    },
    include: {
      model: Dog,
      include: {
        model: DogImage,
      },
    },
  });

  if (friends.length > 0) {
    return res.json(friends);
  } else return res.json(null);
});

router.get("/new", requireAuth, async (req, res) => {
  const userId = req.user.id;

  const { dogId } = req.query;
  const dogIdNum = parseInt(dogId);

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

    const pendingFriends = await Friend.findAll({
      where: {
        dogId_1: dogId,
        status: "pending",
      },
    });
    const pendingFriendIds = pendingFriends.map((friend) => friend.dogId_2);

    const ids = [...friendIds, ...pendingFriendIds];

    const newFriend = await Dog.findOne({
      where: {
        ownerId: {
          [Op.ne]: userId,
        },
        id: {
          [Op.notIn]: [...ids],
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

router.post("/", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const { dogId_1, dogId_2 } = req.body;

  const dog = await Dog.findByPk(dogId_1);

  const friend = await Friend.findOne({
    where: {
      dogId_1,
      dogId_2,
      status: "initial",
    },
  });

  const reverseFriend = await Friend.findOne({
    where: {
      dogId_1: dogId_2,
      dogId_2: dogId_1,
      status: "pending",
    },
  });

  if (friend) return res.json(friend);
  else if (reverseFriend) return res.json(reverseFriend);
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

router.put("/like", requireAuth, async (req, res, next) => {
  const { friendId } = req.body;

  const friend = await Friend.findByPk(friendId);
  if (friend) {
    if (friend.status === "initial") {
      const updatedFriend = await friend.update({
        status: "pending",
      });

      return res.json(updatedFriend);
    } else if (friend.status === "pending") {
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

router.put("/block", requireAuth, async (req, res, next) => {
  const { friendId } = req.body;

  const friend = await Friend.findByPk(friendId);
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
