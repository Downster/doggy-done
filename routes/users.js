var express = require("express");
const {
  csrfProtection,
  asyncHandler,
  emailReg,
  lowerCase,
  upperCase,
  oneNumeric,
  alphaNumeric,
  eightCharacters,
  checkPermissions,
} = require("./utils");
const { loginUser, logoutUser } = require("../auth.js");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { redirect } = require("express/lib/response");
const db = require("../db/models");

const router = express.Router();

//User validators
const userValidators = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please Provide a first name")
    .isLength({ max: 50 })
    .withMessage("First name must be less than 50 characters"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please Provide a last name")
    .isLength({ max: 50 })
    .withMessage("last name must be less than 50 characters"),
  check("displayName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username")
    .isLength({ max: 50 })
    .withMessage("Username can only be 50 characters max"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address")
    .isLength({ max: 255 })
    .withMessage("Email Address must not be more than 255 characters long")
    .isEmail()
    .withMessage("Email Address is not a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { emailAddress: value } }).then(
        (user) => {
          if (user) {
            return Promise.reject(
              "The provided Email Address is already in use by another account"
            );
          }
        }
      );
    })
    .matches(emailReg)
    .withMessage("Please provide a valid email"),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please Provide a password")
    .isLength({ max: 50 })
    .withMessage("password must be less than 50 characters")
    .matches(lowerCase)
    .withMessage(
      "Please input a password with at least one lower case character"
    )
    .matches(upperCase)
    .withMessage(
      "Please input a password with at least one upper case character"
    )
    .matches(oneNumeric)
    .withMessage("Please input a password with at least one numeric character")
    .matches(alphaNumeric)
    .withMessage(
      "Please input a password with at least one alpha numeric character"
    )
    .matches(eightCharacters)
    .withMessage("Please input a password at least eight characters long"),
  check("confirmPassword")
    .matches("password")
    .withMessage("Passwords do not match"),
];

//Login Validators
const loginValidators = [
  check("emailAddress")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password"),
];

router.get(
  "/register",
  csrfProtection,
  asyncHandler(async (req, res) => {
    // const user = await db.User.build();
    const user = {};
    res.render("signup", {
      tile: "Register",
      user,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/register",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, displayName, email, password } = req.body;
    // console.log(firstName, lastName, displayName, email, password);

    const user = await db.User.build({
      firstName,
      lastName,
      displayName,
      email,
      password,
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
      res.render("signup", {
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
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("login", {
      tile: "Login",
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });
      if (user !== null) {
        // If the user exists then compare their password
        // to the provided password.
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );
        if (passwordMatch) {
          // If the password hashes match, then login the user
          // and redirect them to the default route.
          // TODO Login the user.
          loginUser(req, res, user);
          return res.redirect("/app");
        }
      }
      errors.push("Login failed for the provided email address and password");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render("login", {
      title: "Login",
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    logoutUser(req, res);
    res.redirect("/");
  })
);

module.exports = router;
