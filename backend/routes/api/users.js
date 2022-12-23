const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Dog } = require("../../db/models");

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),

  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });
  await setTokenCookie(res, user);
  return res.json({
    user,
  });
});

router.get("/:userId/dog", requireAuth, async (req, res, next) => {
  const { userId } = req.params;

  const dog = await Dog.findOne({
    where: { ownerId: userId },
  });

  if (!dog) {
    const err = new Error("Not Found");
    err.title = "Not Found";
    err.errors = ["Not Found"];
    err.status = 404;
    return next(err);
  }

  return res.json(dog);
});

module.exports = router;
