var express = require('express');
const { csrfProtection, asyncHandler } = require('./utils');
const db = require('../db/models');
const list = require('../db/models/list');
const tasklist = require('../db/models/tasklist');
const {taskValidators, handleValidationErrors, listValidators} = require("./validators");

var router = express.Router();

/* GET lists */
router.get('/', asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    console.log(userId);
    const lists = await db.List.findAll({
        where: {owner_id: userId},
        include: [
            {model: db.Task}
    ]});
    res.json(lists);
}));

router.get('/:listId(\\d+)', asyncHandler(async (req, res, next) => {
    const { listId } = req.params;
    console.log(listId);
    const list = await db.List.findByPk(listId, {include: [{model: db.Task}]});
    if (!list) {
        const err = new Error("List not found error");
        next(err);
    } else {
        res.json(list);
    }
}));

router.post('/', csrfProtection, listValidators, asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const { listName } = req.body;
    const list = await db.List.create({
        owner_id: userId,
        name: listName,
    });
    res.json(list);
}));

router.post('/:listId/tasks', csrfProtection, taskValidators, handleValidationErrors, asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const { listId } = req.params;
    const { taskDetail, taskPriority, taskCompleted, taskDueDate } = req.body;
    const list = await db.List.findByPk(listId);
    if (!list) {
        const err = new Error("List not found error");
        next(err);
    } else {
        const task = await db.Task.create({
            owner_id: userId,
            detail: taskDetail,
            priority: taskPriority,
            completed: taskCompleted,
            due_date: taskDueDate,
        });
        const TaskList = await db.TaskList.create({
            task_id: task.id,
            list_id: listId
        });
        res.json(task);
    }
}));


router.delete('/lists/:listId(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
    const listId = req.params.id;
    const list = await db.List.findByPk(listId);
    if (!list) {
        const err = new Error("List not found");
        next(err);
    } else {
        await list.destroy();
        res.status(204).end();
    }
}));


module.exports = router;
