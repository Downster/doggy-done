var express = require("express");
const { csrfProtection, asyncHandler } = require("./utils");
const db = require("../db/models");

var router = express.Router();

/* GET home page. */
<<<<<<< HEAD
<<<<<<< HEAD
router.get("/", function (req, res, next) {
  res.render("splash-page", { title: "Doggy Done!" });
  // if () {
  //   res.redirect('/register')
  // }
=======
=======
>>>>>>> baf9d35 (App page is looking good!)
router.get('/', function(req, res, next) {

  res.render('splash-page', { title: 'Doggy Done!' });
>>>>>>> eddaf7a (removed comments)
});

<<<<<<< HEAD
router.get(
  "/shapoopi",
  asyncHandler(async (req, res) => {
    res.render("app", {
      title: "Doggy-Done",
    });
  })
);
=======

//this is just a test route that I will use for stuff - kai
router.get('/limsa-lominsa', function(req, res, next)  {
  res.render('limsa-lominsa', {title: 'Limsa Lominsa'})
})
<<<<<<< HEAD
>>>>>>> 6ecb380 (add base routes for lists/dogs/notes and force email to lowercase)
=======
=======
router.get("/", function (req, res, next) {
  res.render("splash-page", { title: "Doggy Done!" });
  // if () {
  //   res.redirect('/register')
  // }
});

router.get(
  "/shapoopi",
  asyncHandler(async (req, res) => {
    res.render("app", {
      title: "Doggy-Done",
    });
  })
);
>>>>>>> 7e263d4 (App page is looking good!)
>>>>>>> baf9d35 (App page is looking good!)

module.exports = router;
