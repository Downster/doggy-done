const express = require("express");
const db = require("../db/models");
const { check, validationResult } = require("express-validator");
const { csrfProtection, asyncHandler } = require("./utils");
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const {userId} = req.session.auth;
    const tasks = await db.Task.findAll({where:{owner_id: userId}});
    // res.render("all-tasks", { title: "Tasks 🐶", tasks });
    res.json({tasks});
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    console.log(taskId);
    const task = await db.Task.findByPk(taskId);
    res.json({
      message: "Success",
      task,
    });
  })
);

const taskValidators = [
    check('detail')
        .exists({checkFalsy: true})
        .withMessage('Task details are required'),
    check('completed')
        .exists({checkFalsy: true})
        .withMessage('Must set task to complete or incomplete')
];

router.post(
  "/",
  taskValidators,
  asyncHandler(async (req, res) => {
    const { detail, due_date, priority, completed } = req.body;
    const owner_id = req.session.auth.userId;
    const task = db.Task.create({
      owner_id,
      detail,
      due_date,
      priority,
      completed,
    });

    res.json({
      message: "Task Created",
    });
  })
);

router.put(
  "/:id/completed",
  asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const { completed } = req.body;
    const task = await db.Task.findByPk(taskId);
    task.completed = completed;
    await task.save();
    res.json({ message: "Task completion toggled" });
  })
);

router.delete('/tasks/:taskId(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    const task = await db.Task.findByPk(taskId);
    if (!task) {
        const err = new Error("Task not found");
        next(err);
    } else {
        await task.destroy();
        res.status(204).end();
    }
}));


module.exports = router;
