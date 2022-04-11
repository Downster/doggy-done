const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const emailReg = /^[^\s@]+@\w+\.[A-z]{2,3}$/;

// const passwordReg =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const lowerCase = /^(?=.*[a-z])/;
const upperCase = /^(?=.*[A-Z])/;
const oneNumeric = /(?=.*[0-9])/;
const alphaNumeric = /(?=.*[!@#$%^&*])/;
const eightCharacters = /(?=.{8,})/;

module.exports = {
  csrfProtection,
  asyncHandler,
  emailReg,
  lowerCase,
  upperCase,
  oneNumeric,
  alphaNumeric,
  eightCharacters,
};
