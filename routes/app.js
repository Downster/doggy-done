const express = require('express');
const router = express.Router();
const {csrfProtection,asyncHandler} = require('./utils');

router.get('/', (req, res, next) => {
    res.render('splash-page', {title: "Doggy Done! 🐶"});
});

module.exports = router;
