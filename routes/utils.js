//import csurf
const csrf = require("csurf");

//declare csrfProtection variable
const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => {
  handler(req, res, next).catch(next);
};

//Regex checks for emails and passwords
const emailReg = /^[^\s@]+@\w+\.[A-z]{2,3}$/;
const lowerCase = /^(?=.*[a-z])/; //checks to see if the word contaions one lowercase character
const upperCase = /^(?=.*[A-Z])/; //checks to see if the word contains one uppercase character
const oneNumeric = /(?=.*[0-9])/; //checks to see if the word contains one numeric character
const alphaNumeric = /(?=.*[!@#$%^&*])/; //checks to see if the word contains one alphanumeric character
const eightCharacters = /(?=.{8,})/; //checks to see if the word contains eight characters

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
