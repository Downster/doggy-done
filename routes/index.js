var express = require("express");
const { csrfProtection, asyncHandler } = require("./utils");
const db = require("../db/models");

var router = express.Router();

/* GET home page. */
<<<<<<< HEAD
router.get("/", function (req, res, next) {
  res.render("splash-page", { title: "Doggy Done!" });
  // if () {
  //   res.redirect('/register')
  // }
=======
router.get('/', function(req, res, next) {

  res.render('splash-page', { title: 'Doggy Done!' });
>>>>>>> eddaf7a (removed comments)
});

router.get(
  "/shapoopi",
  asyncHandler(async (req, res) => {
    res.render("app", {
      title: "Doggy-Done",
    });
  })
);

module.exports = router;
