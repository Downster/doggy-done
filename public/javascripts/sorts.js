import { populateTasksAndAddListeners } from "./taskUtils.js";

const allTasks = document.getElementById("all-tasks-link");
const todaysTasks = document.getElementById("todays-tasks-link");
const tomorrowsTasks = document.getElementById("tomorrows-tasks-link");
<<<<<<< HEAD
<<<<<<< HEAD
const overdueTasks = document.getElementById("overdue-tasks-link");
=======
>>>>>>> 85b8179 (Dates mostly working)
=======
const overdueTasks = document.getElementById("overdue-tasks-link");
>>>>>>> f581fca (Mostly solved)

allTasks.addEventListener("click", async (e) => {
  e.preventDefault();
  await populateTasksAndAddListeners();
});

todaysTasks.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("here");
  await populateTasksAndAddListeners("today");
});

tomorrowsTasks.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("here");
  await populateTasksAndAddListeners("tomorrow");
});
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f581fca (Mostly solved)

overdueTasks.addEventListener("click", async (e) => {
  e.preventDefault();
  await populateTasksAndAddListeners("overdue");
});
<<<<<<< HEAD
=======
>>>>>>> 85b8179 (Dates mostly working)
=======
>>>>>>> f581fca (Mostly solved)
