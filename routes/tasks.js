const express = require("express");
const db = require("../db/models");
const { check, validationResult } = require("express-validator");
const { csrfProtection, asyncHandler } = require("./utils");
const router = express.Router();
const {validateOwner, taskValidators} = require('./validators');

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const {userId} = req.session.auth;
    const tasks = await db.Task.findAll({where:{owner_id: userId}});
    // res.render("all-tasks", { title: "Tasks 🐶", tasks });
    res.json({tasks});
  })
);
router.get(
  "/completed",
  asyncHandler(async (req, res, next) => {
    const {userId} = req.session.auth;
    const tasks = await db.Task.findAll({where:{owner_id: userId, completed: true}});
    // res.render("all-tasks", { title: "Tasks 🐶", tasks });
    res.json({tasks});
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    const task = await db.Task.findByPk(taskId, {include: [{model: db.List}]});
    if (!task) {
        const err = new Error("Task not found");
        next(err);
    } else {
        res.json({
            message: "Success",
            task,
          });
    }
  })
);

router.post(
  "/",
  csrfProtection,
  taskValidators,
  asyncHandler(async (req, res, next) => {
    const { detail, due_date, priority, completed } = req.body;
    req.body;
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

router.patch(
  "/:id",
  csrfProtection,
  taskValidators,
  asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    const { detail, due_date } = req.body;
    const task = await db.Task.findByPk(taskId);
    if (!task) {
        const err = new Error("Task not found");
        next(err);
    } else {
        const permCheck = validateOwner(req, task);
        if(!permCheck) {
            return res.status(401).end();
        }
        task.detail = detail;
        task.due_date = due_date
        await task.save();
        res.json({ message: "Task updated! Woof!" });
    }
  })
);

router.patch(
    "/:taskId(\\d+)/dog/:dogId(\\d+)",
    csrfProtection,
    taskValidators,
    asyncHandler(async (req, res, next) => {
        const { taskId, dogId } = req.params;
        const [task, dog] = await Promise.all([db.Task.findByPk(taskId), db.Dog.findByPk(dogId)]);
        if (!task) {
            const err = new Error("Task not found");
            next(err);
        } else if (!dog) {
            const err = new Error("Dog not found");
            next(err);
        } else {
            const permCheck = validateOwner(req, task);
            if(!permCheck) {
                return res.status(401).end();
            } else {
                task.dog_id = dogId;
                await task.save();
                res.json({ message: "Task updated! Woof!" });
            }
        }
    })
);


router.patch(
    "/:taskId(\\d+)/list/:listId(\\d+)",
    csrfProtection,
    taskValidators,
    asyncHandler(async (req, res, next) => {
        const { taskId, listId} = req.params;
        const [task, list] = await Promise.all([db.Task.findByPk(taskId), db.List.findByPk(listId)]);
        const listEntry= await db.TaskList.findOne({where : {task_id: taskId, list_id: listId}});
        if (listEntry) {
            return res.json(listEntry);
        }
        if (!task) {
            const err = new Error("Task not found");
            next(err);
        } else if (!list) {
            const err = new Error("List not found");
            next(err);
        } else {
            const permCheck = validateOwner(req, task);
            if(!permCheck) {
                return res.status(401).end();
            } else {
                const listEntry = db.TaskList.build();
                listEntry.task_id = task.id;
                listEntry.list_id = list.id;
                await listEntry.save();
                res.json({ message: "Task updated! Woof!" });
            }
        }
    })
);



router.put(
  "/:id/completed",
  asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    const { completed } = req.body;
    const task = await db.Task.findByPk(taskId);
    if (!task) {
        const err = new Error("Task not found");
        next(err);
    } else {
        const permCheck = validateOwner(req, task);
        if(!permCheck) {
            return res.status(401).end();
        }
        task.completed = completed;
        await task.save();
        res.json({ message: "Task completion toggled" });
    }
  })
);



router.delete('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res, next) => {
    const taskId = req.params.id;
    const task = await db.Task.findByPk(taskId);
    if (!task) {
        const err = new Error("Task not found");
        next(err);
    } else {
        const permCheck = validateOwner(req, task);
        if(!permCheck) {
            return res.status(401).end();
        }
        await task.destroy();
        res.status(204).end();
    }
}));


router.delete(
    "/:taskId(\\d+)/list/:listId(\\d+)",
    csrfProtection,
    taskValidators,
    asyncHandler(async (req, res, next) => {
        const { taskId, listId} = req.params;
        const task = await db.Task.findByPk(taskId);
        if (!task) {
            const err = new Error("Task not found");
            next(err);
        } else {
            const permCheck = validateOwner(req, task);
            if(!permCheck) {
                return res.status(401).end();
            }
            const listEntries = await db.TaskList.findAll({where : {task_id: taskId, list_id: listId}});
            for (let entry of listEntries) {
                await entry.destroy();
            }
            res.status(204).end();
        }
    })
);


module.exports = router;
