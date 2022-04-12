var express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('splash-page', { title: 'Doggy Done!' });
});

module.exports = router;
