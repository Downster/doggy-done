var express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('splash-page', { title: 'Doggy Done!' });
  // if () {
  //   res.redirect('/register')
  // }
});


//this is just a test route that I will use for stuff - kai
router.get('/limsa-lominsa', function(req, res, next)  {
  res.render('limsa-lominsa', {title: 'Limsa Lominsa'})
})

module.exports = router;
