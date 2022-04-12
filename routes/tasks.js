const express = require('express');
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const {csrfProtection, asyncHandler } = require('./utils');
const router = express.Router();

router.get('/', asyncHandler(async(req,res) => {
    const tasks = await db.Task.findAll();
    // res.render('all-tasks', {title: 'Tasks 🐶', tasks})

}));

const taskValidators = [
    check('detail')
        .exists({checkFalsy: true})
        .withMessage('Task details are required'),
    check('completed')
        .exists({checkFalsy: true})
        .withMessage('Must set task to complete or incomplete')
];

router.post('/add',csrfProtection,taskValidators,asyncHandler(async(req,res) => {
    const {
        detail,
        due_date,
        priority,
        completed
    } = req.body;

    const task = db.Task.build({
        detail,
        due_date,
        priority,
        completed,
    });

    res.render('all-tasks', {
        title: 'Add Tasks 🐶',
        tasks,
        errors,
        csrfToken: req.csrfToken(),
      });
}));

module.exports = router;
