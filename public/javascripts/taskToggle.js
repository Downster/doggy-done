import { fetchWithToken } from "./utils.js";

export const handleTaskToggler = async (e) => {
  e.stopImmediatePropagation();
  e.preventDefault();
  console.log(e.currentTarget);
  const id = e.currentTarget.id.split("task-click-").pop();
  const appRight = document.querySelector(".app-inner-body-right");
  const taskDetails = document.querySelector(".task-details");
  appRight.classList.toggle("active");
  taskDetails.classList.toggle("active");

        const res = await fetchWithToken(`/tasks/${id}`, "GET");
        const {task} = await res.json();
        const detailInput = taskDetails.getElementsByTagName("input");
        const dueDate = taskDetails.getElementsByClassName("detail-date");
        const taskId = document.getElementById('task-id');
        taskId.innerText = id;
        detailInput[0].value = data.task.detail;
        if (data.task.task.dueDate) {
          dueDate[0].value = data.task.due_date.split("T")[0];
        }

}

export const handleCloseButton = (e) => {
  console.log("here");
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
