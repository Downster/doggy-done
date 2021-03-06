import { populateTasksAndAddListeners } from "./taskUtils.js";

const allTasks = document.getElementById("all-tasks-link");
const todaysTasks = document.getElementById("todays-tasks-link");
const tomorrowsTasks = document.getElementById("tomorrows-tasks-link");
const overdueTasks = document.getElementById("overdue-tasks-link");

allTasks.addEventListener("click", async (e) => {
  e.preventDefault();
  await populateTasksAndAddListeners();
});

todaysTasks.addEventListener("click", async (e) => {
  e.preventDefault();
  await populateTasksAndAddListeners("today");
});

tomorrowsTasks.addEventListener("click", async (e) => {
  e.preventDefault();
  await populateTasksAndAddListeners("tomorrow");
});

overdueTasks.addEventListener("click", async (e) => {
  e.preventDefault();
  await populateTasksAndAddListeners("overdue");
});
