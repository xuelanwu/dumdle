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

  if (dog) {
    return res.json(dog);
  } else return res.json(null);
});

router.post("/:userId/dog", requireAuth, async (req, res, next) => {
  const { userId } = req.params;
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

  if (parseInt(userId) === req.user.id) {
    const dog = await Dog.create({
      ownerId: parseInt(userId),
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
  } else {
    const err = new Error("Unauthorized");
    err.title = "Unauthorized";
    err.errors = ["Forbidden"];
    err.status = 403;
    return next(err);
  }
});

module.exports = router;
