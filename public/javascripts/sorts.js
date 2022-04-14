import { populateTasksAndAddListeners } from "./taskUtils.js";

const allTasks = document.getElementById("all-tasks-link");
const todaysTasks = document.getElementById("todays-tasks-link");
const tomorrowsTasks = document.getElementById("tomorrows-tasks-link");

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
