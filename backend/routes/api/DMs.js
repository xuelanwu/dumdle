const express = require("express");

const { requireAuth } = require("../../utils/auth");
const { DirectMessage } = require("../../db/models");

const router = express.Router();

router.post("/", requireAuth, async (req, res, next) => {
  const { friendId, senderId, message } = req.body;

  const DM = await DirectMessage.create({ friendId, senderId, message });

  return res.json(DM);
});

router.get("/", requireAuth, async (req, res, next) => {
  const friendId = req.query;

  const DMs = await DirectMessage.findAll({
    where: friendId,
    order: ["createdAt"],
  });

  if (DMs.length > 0) return res.json(DMs);
  else return res.json(null);
});

module.exports = router;
