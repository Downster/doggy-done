var express = require("express");
const { asyncHandler } = require("./utils");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const router = express.Router();

/* GET users listing. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.send("respond with a resource");
  })
);

router.get(
  "/user/register",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = await db.User.build();
    res.render("register", {
      tile: "Register",
      user,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/user/register",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, emailAddress, hashedPassword } = req.body;

    const user = await db.User.build({
      firstName,
      lastName,
      emailAddress,
      hashedPassword,
    });
    const validatorErrors = validationResult(req);
    console.log(validatorErrors);

    if (validatorErrors.isEmpty()) {
      const hashed = await bcrypt.hash(hashedPassword, 10);
      user.hashedPassword = hashed;
      await user.save();
      loginUser(req, res, user);
      res.redirect("/");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render("register", {
        title: "Register",
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.get(
  "/login",
  asyncHandler(async (req, res, next) => {})
);

router.post(
  "/login",
  asyncHandler(async (req, res, next) => {})
);

router.post(
  "/logout",
  asyncHandler(async (req, res, next) => {})
);

module.exports = router;
