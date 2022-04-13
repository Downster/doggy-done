const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");

router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res, next) => {
    const userId = req.session.auth.userId;
    res.cookie('CSRF-Token', req.csrfToken());
    const tasks = await db.Task.findAll({
      where: {
        owner_id: userId,
      },
    });
    const priorities = await db.Priority.findAll();
    const lists = await db.List.findAll({
      where: {
        owner_id: userId,
      },
    });
    console.log(priorities);
    res.render("app", {
      title: "Doggy Done 🐶",
      tasks,
      priorities,
      lists,
      csrfToken: req.csrfToken(),
    });
  })
);

module.exports = router;
