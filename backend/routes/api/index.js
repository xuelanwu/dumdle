const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const dogsRouter = require("./dogs.js");
const friendsRouter = require("./friends.js");
const dmRouter = require("./DMs");

const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/dogs", dogsRouter);
router.use("/friends", friendsRouter);
router.use("/DMs", dmRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
