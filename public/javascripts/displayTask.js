const taskBar = document.getElementById("task-input");

taskBar.addEventListener("click", (e) => {
  const sumbitButton = document.querySelector(".task-submit");
  sumbitButton.classList.toggle("active");
});
