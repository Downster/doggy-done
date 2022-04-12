const express = require('express');
const router = express.Router();
const {csrfProtection,asyncHandler} = require('./utils');

router.get('/all', (req, res, next) => {
    res.render('app', {title: "Doggy Done! 🐶"});
});

module.exports = router;
