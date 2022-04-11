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
  check("emailAddress")
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
    }),

  check("hashedPassword")
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
  //   check("confirmPassword")
  //     .matches("hashedPassword")
  //     .withMessage("Learn to type jabroni"),
];

//Login Validators
const loginValidators = [
  check("emailAddress")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address"),
  check("hashedPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password"),
];

router.get(
  "/user/register",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = await db.User.build();
    res.render("signup", {
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
  "/user/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("login", {
      tile: "Login",
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/user/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { emailAddress, hashedPassword } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { emailAddress } });
      if (user !== null) {
        // If the user exists then compare their password
        // to the provided password.
        const passwordMatch = await bcrypt.compare(
          hashedPassword,
          user.hashedPassword.toString()
        );
        if (passwordMatch) {
          // If the password hashes match, then login the user
          // and redirect them to the default route.
          // TODO Login the user.
          loginUser(req, res, user);
          return res.redirect("/");
        }
      }
      errors.push("Login failed for the provided email address and password");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render("login", {
      title: "Login",
      emailAddress,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/user/logout",
  asyncHandler(async (req, res) => {
    logoutUser(req, res);
    res.redirect("/");
  })
);

module.exports = router;
