// import { listenForOutsideClick } from "./taskDetailOutsideClick.js";
const taskList = document.querySelectorAll(".task-click");
// const eventListener = (e) => {
//   console.log("clicks");
//   const taskDetails = document.querySelector(".task-details");
//   if (taskDetails.classList.contains("active")) {
//     taskDetails.classList.toggle("active");
//   }
// };

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
    const detailInput = taskDetails.getElementsByTagName("input");
    const dueDate = taskDetails.getElementsByClassName("detail-date");
    const taskId = document.getElementById("task-id");
    taskId.innerText = id;
    detailInput[0].value = data.task.detail;
    dueDate[0].value = data.task.due_date.split("T")[0];
    // listenForOutsideClick(eventListener);
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
