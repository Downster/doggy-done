import { fetchWithToken } from "./utils.js";

const searchBar = document.getElementById("search");

const generateSearchArea = async () => {
  const searchDiv = document.createElement("div");
  searchDiv.id = "search-div";
  console.log("generated");
};

searchBar.addEventListener("click", generateSearchArea);

searchBar.addEventListener("keyup", (e) => {
  const currTasks = [];
  const allTasks = document.querySelectorAll(".task-click");
  console.log(e.target.value);
  allTasks.forEach((el) => {
    currTasks.push(el.innerText.toLowerCase());
  });
  const filteredTasks = currTasks.filter((task) =>
    task.includes(e.target.value)
  );
  console.log(filteredTasks);
});
