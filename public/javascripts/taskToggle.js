const taskList = document.querySelectorAll(".task-click");
console.log(taskList);

taskList.forEach((task) => {
  task.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = e.target.id;
    const appRight = document.querySelector(".app-inner-body-right");
    const taskDetails = document.querySelector(".task-details");
    appRight.classList.toggle("active");
    taskDetails.classList.toggle("active");

    const res = await fetch(`/tasks/${id}`, {
      method: "GET",
    });

    const data = await res.json();
    console.log(data);
    const detailInput = taskDetails.getElementsByTagName("input");
    const dueDate = (detailInput[0].value = data.task.detail);
  });
});

const closeButton = document.querySelector(".close-detail");

closeButton.addEventListener("click", (e) => {
  e.preventDefault();
  const appRight = document.querySelector(".app-inner-body-right");
  const taskDetails = document.querySelector(".task-details");
  appRight.classList.toggle("active");
  taskDetails.classList.toggle("active");
});
