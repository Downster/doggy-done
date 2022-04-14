var express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');

var router = express.Router();

/* GET all breeds. */
router.get('/', asyncHandler(async (req, res, next) => {
    const breeds = await db.Breed.findAll();
    res.json(breeds);
}));

module.exports = router;
