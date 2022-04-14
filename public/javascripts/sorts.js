import { populateTasksAndAddListeners } from "./taskUtils.js";

const allTasks = document.getElementById("all-tasks-link");
const todaysTasks = document.getElementById("todays-tasks-link");
const tomorrowsTasks = document.getElementById("tomorrows-tasks-link");
<<<<<<< HEAD
const overdueTasks = document.getElementById("overdue-tasks-link");
=======
>>>>>>> a0962a4 (Dates mostly working)

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

overdueTasks.addEventListener("click", async (e) => {
  e.preventDefault();
  await populateTasksAndAddListeners("overdue");
});
=======
>>>>>>> a0962a4 (Dates mostly working)
