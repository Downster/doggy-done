import { handleTaskToggler } from "./taskToggle.js";

const searchDiv = document.createElement("div");
searchDiv.id = "search-div";
document.body.append(searchDiv);

const generateSearchItems = (text) => {
  const searchArea = document.getElementById("search-div");
  if (searchArea.childNodes.length) {
    const items = document.querySelectorAll(".task-click-search");
    items.forEach((el) => {
      el.remove();
    });
  }
  text.forEach((ele) => {
    const searchItem = document.createElement("a");
    searchItem.id = ele[1];
    searchItem.innerText = ele[0];
    searchItem.href = null;
    searchItem.classList.add("task-click-search");
    searchArea.append(searchItem);
    searchItem.addEventListener("click", handleTaskToggler);
  });
};

const generateSearchArea = async () => {
  const searchDiv = document.getElementById("search-div");
  searchDiv.classList.toggle("active");

  const appBody = document.querySelector(".app-body");
  const header = document.querySelector(".header-nav");
  const navMenu = document.querySelector(".nav-menu-container");
  appBody.classList.toggle("blur");
  header.classList.toggle("blur");
  navMenu.classList.toggle("blur");
};
document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("task-s");
  const searchDiv = document.getElementById("search-div");
  const appBody = document.querySelector(".app-body");
  const header = document.querySelector(".header-nav");
  const navMenu = document.querySelector(".nav-menu-container");

  searchBar.addEventListener("click", generateSearchArea);
  document.addEventListener("click", function (event) {
    const isClickInside = searchDiv.contains(event.target) || searchBar.contains(event.target);

    if (!isClickInside) {
      //the click was outside the specifiedElement, do something
      searchDiv.classList.remove("active");
      appBody.classList.remove("blur");
      header.classList.remove("blur");
      navMenu.classList.remove("blur");
      searchBar.value = ''
    }
  })

  searchBar.addEventListener("keyup", (e) => {
    const currTasks = new Set();
    const allTasks = document.querySelectorAll(".task-click");
    allTasks.forEach((el) => {
      currTasks.add(`${el.innerText.toLowerCase()}%${el.id}`);
    });
    const taskArray = [...currTasks];
    const splitTasks = [];
    taskArray.forEach((el) => {
      splitTasks.push(el.split("%"));
    });
    const filteredTasks = splitTasks.filter(([task, taskId]) => {
      return task.includes(e.target.value);
    });
    generateSearchItems(filteredTasks);
  });
});
