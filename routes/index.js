var express = require("express");
const { csrfProtection, asyncHandler } = require("./utils");
const db = require("../db/models");
const restoreUser = require('../auth');


var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {

  async(req,res,next) => {
    if(res.locals.authenticated){
      res.redirect('/app');
    }else{
      res.render('splash-page', { title: 'Doggy Done! 🐶' });
    }

  }

});


router.get(
  "/shapoopi",
  asyncHandler(async (req, res) => {
    res.render("app", {
      title: "Doggy-Done",
    });
  })
);


//this is just a test route that I will use for stuff - kai
router.get('/limsa-lominsa', csrfProtection, asyncHandler(async (req, res, next) => {
  const breeds = await db.Breed.findAll();
  res.render('limsa-lominsa', {title: 'Limsa Lominsa', breeds, csrfToken: req.csrfToken})
}));


module.exports = router;
