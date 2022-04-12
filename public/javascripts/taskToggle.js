const task = document.querySelector(".click-me");

task.addEventListener("click", (e) => {
  e.preventDefault();
  const rightGeneric = document.querySelector(".generic-right");
  const taskDetails = document.querySelector(".task-details");
  rightGeneric.classList.toggle("active");
  taskDetails.classList.toggle("active");
});
