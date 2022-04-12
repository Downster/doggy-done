const taskList = document.querySelectorAll(".task-click");
console.log(taskList);

task.addEventListener("click", async (e) => {
  e.preventDefault();
  const appRight = document.querySelector(".app-inner-body-right");
  const taskDetails = document.querySelector(".task-details");
  appRight.classList.toggle("active");
  taskDetails.classList.toggle("active");
  const parent = task.parentElement.id.split("-");
  const id = parent[2];
  console.log(parent);

  const res = await fetch(`/tasks/${id}`, {
    method: "GET",
  });

  const data = await res.json();
  console.log(data);
});

const closeButton = document.querySelector(".close-detail");

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  const appRight = document.querySelector(".app-inner-body-right");
  const taskDetails = document.querySelector(".task-details");
  appRight.classList.toggle("active");
  taskDetails.classList.toggle("active");
});
