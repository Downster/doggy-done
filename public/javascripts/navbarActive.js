const allTasks = document.querySelector(".all-tasks-list");
console.log(allTasks);
allTasks.addEventListener("click", (e) => {
  e.preventDefault();
  allTasks.classList.toggle("active");
});
