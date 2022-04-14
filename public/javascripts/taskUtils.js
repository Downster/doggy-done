import { fetchWithToken } from "./utils.js";
import { taskToggleListeners } from "./taskToggle.js";
import { checkboxListeners } from "./completeTask.js";
const singleTaskClass = "single-task";
const taskContainerPrefix = "task-container";
const checkboxPrefix = "task-checkbox";
const checkboxClass = "task-checkbox";
const anchorClass = "task-click";
const anchorPrefix = "task-click";
const taskContainer = "all-tasks";

export const genTasks = async (type, listId) => {
  if (type !== "list") {
    const res = await fetchWithToken("/tasks");
    const { tasks } = await res.json();
    return tasks;
  } else {
    const res = await fetchWithToken(`/lists/${listId}`, "GET");
    const data = await res.json();
    console.log(data.Tasks);
    return data.Tasks;
  }
};

const buildTaskHTML = (task) => {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add(singleTaskClass);
  taskContainer.setAttribute("id", `${taskContainerPrefix}-${task.id}`);
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", `${checkboxPrefix}-${task.id}`);
  checkbox.classList.add(checkboxClass);
  if (task.completed) {
    checkbox.setAttribute("checked", true);
  }
  taskContainer.append(checkbox);
  const anchor = document.createElement("a");
  anchor.setAttribute("href", "");
  anchor.classList.add(anchorClass);
  anchor.setAttribute("id", `${anchorPrefix}-${task.id}`);
  anchor.innerText = task.detail;
  taskContainer.appendChild(anchor);
  return taskContainer;
};

export const genTasksHTML = async (type, listId) => {
  if (type !== "list") {
    const tasks = await genTasks(type);
    return tasks.map((task) => buildTaskHTML(task));
  } else {
    const lists = await genTasks(type, listId);
    return lists.map((task) => buildTaskHTML(task));
  }
};

export const populateTasks = async (type, listId) => {
  const tasksHTML = await genTasksHTML(type, listId);
  const allTasks = document.querySelector(".task-items");
  const tasksDetails = allTasks.querySelectorAll(".single-task");
  tasksDetails.forEach((task) => task.remove());
  for (let taskDetail of tasksHTML) {
    allTasks.append(taskDetail);
  }
};

export const populateTasksAndAddListeners = async () => {
  await populateTasks();
  taskToggleListeners();
  checkboxListeners();
};
