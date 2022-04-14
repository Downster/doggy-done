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
    return data;
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
    return lists;
  }
};

export const populateTasks = async (type, listId) => {
  const tasksHTML = await genTasksHTML(type, listId);
  const allTasks = document.querySelector(".task-items");
  allTasks.innerHTML = "";
  if (type !== "list") {
    for (let taskDetail of tasksHTML) {
      allTasks.append(taskDetail);
    }
  } else {
    const mappedTasks = tasksHTML.Tasks.map((task) => buildTaskHTML(task));
    const name = tasksHTML.name;
    const listName = document.createElement("input");
    const editListName = document.createElement("button");
    editListName.innerText = "Edit Name";
    editListName.classList.add(`edit-list-button`);
    editListName.setAttribute("id", `edit-list-${listId}`);
    listName.classList.add(`list-title`);
    listName.setAttribute("id", `list-title-${listId}`);
    listName.value = name;
    allTasks.append(listName);
    allTasks.append(editListName);
    for (let taskDetail of mappedTasks) {
      allTasks.append(taskDetail);
    }
  }
};

export const populateTasksAndAddListeners = async () => {
  await populateTasks();
  taskToggleListeners();
  checkboxListeners();
};
