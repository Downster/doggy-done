const express = require("express");
const router = express.Router();
const { Task } = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");


router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const tasks = await Task.findAll();
    console.log(tasks);
    res.render("app", { title: "Doggy Done 🐶", tasks });
  })
);

module.exports = router;
