var express = require("express");
const { csrfProtection, asyncHandler } = require("./utils");
const db = require("../db/models");
const {
  taskValidators,
  handleValidationErrors,
  listValidators,
  validateOwner,
} = require("./validators");

var router = express.Router();

/* GET lists */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    console.log(userId);
    const lists = await db.List.findAll({
      where: { owner_id: userId },
      include: [{ model: db.Task }],
    });
    res.json(lists);
  })
);

router.get(
  "/:listId(\\d+)",
  asyncHandler(async (req, res, next) => {
    const { listId } = req.params;
    console.log("this " + listId);
    const list = await db.List.findByPk(listId, {
      include: [{ model: db.Task }],
    });
    if (!list) {
      const err = new Error("List not found error");
      next(err);
    } else {
      res.json(list);
    }
  })
);

router.patch(
  "/:listId(\\d+)",
  asyncHandler(async (req, res, next) => {
    const { listId } = req.params;
    const { name } = req.body;
    console.log(listId);
    console.log(name);
    const list = await db.List.findByPk(listId);
    console.log(list);
    if (!list) {
      const err = new Error("List not found error");
      next(err);
    }
    await list.update({
      name: name,
    });
    res.json(list.name);
  })
);

router.post(
  "/",
  csrfProtection,
  listValidators,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const { listName } = req.body;
    const list = await db.List.create({
      owner_id: userId,
      name: listName,
    });
    res.redirect("/app");
  })
);

router.post(
  "/:listId/tasks",
  csrfProtection,
  taskValidators,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.session.auth;
    const { listId } = req.params;
    const { detail, priority, completed, due_date } = req.body;
    const list = await db.List.findByPk(listId);
    if (!list) {
      const err = new Error("List not found error");
      next(err);
    } else {
      const permCheck = validateOwner(req, list);
      if (!permCheck) {
        return res.status(401).end();
      }
      const task = await db.Task.create({
        owner_id: userId,
        detail,
        priority,
        completed,
        due_date,
      });
      const TaskList = await db.TaskList.create({
        task_id: task.id,
        list_id: listId,
      });
      res.json(task);
    }
  })
);

router.delete(
  "/:listId(\\d+)",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const listId = req.params.listId;
    const list = await db.List.findByPk(listId);
    if (!list) {
      const err = new Error("List not found");
      next(err);
    } else {
      const permCheck = validateOwner(req, list);
      if (!permCheck) {
        return res.status(401).end();
      }
      await list.destroy();
      res.status(204).end();
    }
  })
);

module.exports = router;
