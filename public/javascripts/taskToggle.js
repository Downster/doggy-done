import { fetchWithToken } from "./utils.js";
import { genDogs, filterTasksWithDogId } from "./dogUtils.js";
import { populateTasks, populateTasksAndAddListeners } from "./taskUtils.js";
import { genLists } from "./listUtils.js";

export const handleTaskToggler = async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  if (document.getElementById("search-div").classList.contains("active")) {
    console.log("here");
    const searchDiv = document.getElementById("search-div");
    const searchBar = document.getElementById("task-s");
    searchBar.value = "";
    searchDiv.classList.toggle("active");
    const appBody = document.querySelector(".app-body");
    const header = document.querySelector(".header-nav");
    const navMenu = document.querySelector(".nav-menu-container");
    appBody.classList.toggle("blur");
    header.classList.toggle("blur");
    navMenu.classList.toggle("blur");
  }
  console.log(e.currentTarget);
  const id = e.currentTarget.id.split("task-click-").pop();
  const appRight = document.querySelector(".app-inner-body-right");
  const taskDetails = document.querySelector(".task-details");
  appRight.classList.toggle("active");
  taskDetails.classList.toggle("active");

  const res = await fetchWithToken(`/tasks/${id}`, "GET");
  const { task } = await res.json();
  const detailInput = taskDetails.getElementsByTagName("input");
  const dueDate = taskDetails.getElementsByClassName("detail-date");
  const taskId = document.getElementById("task-id");
  taskId.innerText = id;
  detailInput[0].value = task.detail;
  if (task.due_date) {
    dueDate[0].value = task.due_date.split("T")[0];
  }
  await genDogsForm(task);
  await genListsForm(task);
};

export const buildSelectWithIdValues = (
  data,
  selectedMatch,
  styleClass,
  styleId
) => {
  const select = document.createElement("select");
  select.classList.add(styleClass);
  select.setAttribute("id", styleId);
  const defaultOpt = (document.createElement("option").innerText = "-------");
  select.append(defaultOpt);
  for (let datum of data) {
    const option = document.createElement("option");
    option.setAttribute("value", datum.id);
    option.innerText = datum.name;
    if (selectedMatch && selectedMatch.toString() === datum.id.toString()) {
      option.setAttribute("selected", true);
    }
    select.append(option);
  }
  return select;
};

const handleDogSelect = async (e) => {
  const [, taskId] = e.currentTarget.id.split("task-update-dropdown-dog-");
  const select = e.currentTarget;
  const dogId = select.value;
  await fetchWithToken(`/tasks/${taskId}/dog/${dogId}`, "PATCH");
  const newDogIsActive = document.querySelector(`#single-dog-${dogId}`);
  newDogIsActive
    ? window.filterTaskByDog.add(taskId.toString())
    : window.filterTaskByDog.delete(taskId.toString());
  filterTasksWithDogId();
};

export const genDogsForm = async (task) => {
  const dogId = task.dog_id;
  const formArea = document.querySelector(".dynamic-update-area-dog");
  formArea.innerHTML = "";
  const container = document.createElement("div");
  container.classList.add("task-update-dropdown-area");
  container.setAttribute("id", `task-update-dog`);

  const dogs = await genDogs();
  const select = buildSelectWithIdValues(
    dogs,
    dogId,
    "task-update-dropdown",
    `task-update-dropdown-dog-${task.id}`
  );
  select.setAttribute("name", "taskDog");
  const label = document.createElement("label");
  label.setAttribute("for", "taskDog");
  label.innerText = "Associate Dog";
  container.append(label);
  container.append(select);
  formArea.append(container);
  select.addEventListener("change", handleDogSelect);
};

const handleListSelect = async (e) => {
  const [, taskId] = e.currentTarget.id.split("task-update-dropdown-lists-");
  const select = e.currentTarget;
  const majorListId = select.value;
  for (let option of select.options) {
    const listId = option.value;
    if (!listId) {
      return;
    }
    if(option.selected) {
      await fetchWithToken(`/tasks/${taskId}/list/${listId}`, "PATCH");
    } else {
      await fetchWithToken(`/tasks/${taskId}/list/${listId}`, "DELETE");
    }
  }
  populateTasksAndAddListeners("list", majorListId);
};

export const genListsForm = async (task) => {
  const taskLists = task.Lists.map(taskList => taskList.TaskList);
  const listIds = taskLists.map(tl => tl.list_id);
  const formArea = document.querySelector(".dynamic-update-area-list");
  formArea.innerHTML = "";
  const container = document.createElement("div");
  container.classList.add("task-update-dropdown-area");
  container.setAttribute("id", `task-update-list`);
  const lists = await genLists();
  const select = buildSelectWithIdValues(
    lists,
    null,
    'task-update-dropdown',
    `task-update-dropdown-lists-${task.id}`
  );
  select.setAttribute("multiple", true);
  for (let option of select.children) {
    if (listIds.includes(Number(option.value))) {
      option.setAttribute("selected", true);
    }
  }
  select.setAttribute("name", "tasList");
  const label = document.createElement("label");
  label.setAttribute("for", "taskDog");
  label.innerText = "Lists";
  container.append(label);
  container.append(select);
  formArea.append(container);
  select.addEventListener("change", handleListSelect);
};

export const handleCloseButton = (e) => {
  e.preventDefault();
  const appRight = document.querySelector(".app-inner-body-right");
  const taskDetails = document.querySelector(".task-details");
  appRight.classList.toggle("active");
  taskDetails.classList.toggle("active");
};

export const taskToggleListeners = () => {
  const taskList = document.querySelectorAll("a.task-click");
  taskList.forEach((task) => {
    task.addEventListener("click", handleTaskToggler);
  });
};

export const closeButtonListeners = () => {
  const closeButton = document.querySelector(".close-detail");
  closeButton.addEventListener("click", handleCloseButton);
};
