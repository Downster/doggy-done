var express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');

var router = express.Router();

/* GET lists */
router.get('/', asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const lists = await db.List.findAll({where: userId, include: [{model: db.Task}]});
    res.json(lists);
}));

router.post('/', asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const { listName } = req.body;
    const list = await db.List.create({
        owner_id: userId,
        name: listName,
    });
    res.json(list);
}));

module.exports = router;
