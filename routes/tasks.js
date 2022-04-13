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


router.post("/add",csrfProtection,taskValidators,asyncHandler(async (req, res) => {
    const { detail, due_date, priority, completed } = req.body;


    const task = db.Task.build({
      detail,
      due_date,
      priority,
      completed,
    });

    res.render("all-tasks", {
      title: "Add Tasks 🐶",
      tasks,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

module.exports = router;
