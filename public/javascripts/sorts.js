import { populateTasksAndAddListeners } from "./taskUtils.js";

const allTasks = document.getElementById("all-tasks-link");
const todaysTasks = document.getElementById("todays-tasks-link");
const tomorrowsTasks = document.getElementById("tomorrows-tasks-link");
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const overdueTasks = document.getElementById("overdue-tasks-link");
=======
>>>>>>> 85b8179 (Dates mostly working)
=======
const overdueTasks = document.getElementById("overdue-tasks-link");
>>>>>>> f581fca (Mostly solved)
=======
const overdueTasks = document.getElementById("overdue-tasks-link");
=======
>>>>>>> a0962a4 (Dates mostly working)
>>>>>>> 6dac566 (Dates mostly working)
=======
const overdueTasks = document.getElementById("overdue-tasks-link");
=======
>>>>>>> a0962a4 (Dates mostly working)
=======
const overdueTasks = document.getElementById("overdue-tasks-link");
>>>>>>> c41de1e (Mostly solved)
>>>>>>> 5a3ed4a (Mostly solved)
=======
const overdueTasks = document.getElementById("overdue-tasks-link");
>>>>>>> 0f37de1 (Fixed some bugs testing to see if works before pushing)

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f581fca (Mostly solved)
=======
>>>>>>> 6dac566 (Dates mostly working)
=======
=======
>>>>>>> c41de1e (Mostly solved)
>>>>>>> 5a3ed4a (Mostly solved)
=======
>>>>>>> 0f37de1 (Fixed some bugs testing to see if works before pushing)

overdueTasks.addEventListener("click", async (e) => {
  e.preventDefault();
  await populateTasksAndAddListeners("overdue");
});
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 85b8179 (Dates mostly working)
=======
>>>>>>> f581fca (Mostly solved)
=======
=======
>>>>>>> a0962a4 (Dates mostly working)
>>>>>>> 6dac566 (Dates mostly working)
=======
=======
>>>>>>> a0962a4 (Dates mostly working)
=======
>>>>>>> c41de1e (Mostly solved)
>>>>>>> 5a3ed4a (Mostly solved)
=======
>>>>>>> 0f37de1 (Fixed some bugs testing to see if works before pushing)
