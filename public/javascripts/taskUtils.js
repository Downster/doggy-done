import { fetchWithToken } from "./utils.js";
import { taskToggleListeners } from "./taskToggle.js";
import { checkboxListeners } from "./completeTask.js";
import { closeButtonListeners } from "./taskToggle.js";
import { buildNewTasksAndFilter } from "./dateLogic.js";
const singleTaskClass = "single-task";
const taskContainerPrefix = "task-container";
const checkboxPrefix = "task-checkbox";
const checkboxClass = "task-checkbox";
const anchorClass = "task-click";
const anchorPrefix = "task-click";
const taskContainer = "all-tasks";

export const genTasks = async (type, listId) => {
  if (type === undefined) {
    const res = await fetchWithToken("/tasks");
    const { tasks } = await res.json();
    return tasks;
  } else if (type === "today") {
    const res = await fetchWithToken("/tasks");
    const { tasks } = await res.json();
    console.log(tasks);
    const sortedTask = buildNewTasksAndFilter(tasks, "today");
    return sortedTask;
  } else if (type === "tomorrow") {
    const res = await fetchWithToken("/tasks");
    const { tasks } = await res.json();
    const sortedTask = buildNewTasksAndFilter(tasks, "tomorrow");
    return sortedTask;
  } else if (type === "overdue") {
    const res = await fetchWithToken("/tasks");
    const { tasks } = await res.json();
    const sortedTask = buildNewTasksAndFilter(tasks, "overdue");
    return sortedTask;
  } else if (type === "list") {
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
  const fake = document.createElement("div");
  fake.innerText = "🐾";
  fake.classList.add("fake-checkbox");
  fake.setAttribute("id", `fake-checkbox-${task.id}`);
  const icon = document.createElement("i");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-check");
  icon.classList.add("checkbox-fake-check");
  icon.setAttribute("id", `checkbox-fake-check-${task.id}`);
  taskContainer.append(fake);
  taskContainer.append(checkbox);
  taskContainer.append(icon);
  if (task.completed) {
    checkbox.setAttribute("checked", true);
    icon.classList.add("active");
    fake.classList.add("active");
  }
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

export const populateTasksAndAddListeners = async (type, listId) => {
  await populateTasks(type, listId);
  taskToggleListeners();
  closeButtonListeners();
  checkboxListeners();
};

export const getAllTasks = () => document.querySelectorAll(".single-task");
