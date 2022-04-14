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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const res = await fetchWithToken(`/tasks/${id}`, "GET");
  const { task } = await res.json();
  const detailInput = taskDetails.getElementsByTagName("input");
  const dueDate = taskDetails.getElementsByClassName("detail-date");
  const taskId = document.getElementById("task-id");
  taskId.innerText = id;
  detailInput[0].value = data.task.detail;
  if (data.task.task.dueDate) {
    dueDate[0].value = data.task.due_date.split("T")[0];
  }
};
=======
=======
>>>>>>> f581fca (Mostly solved)
=======
>>>>>>> 0edf544 (Dogs part 1)
=======
>>>>>>> 5a3ed4a (Mostly solved)
=======
>>>>>>> 0f37de1 (Fixed some bugs testing to see if works before pushing)
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
<<<<<<< HEAD
>>>>>>> 121b76f (Dogs part 1)
=======
=======
=======
>>>>>>> fcf44d5 (Dogs part 1)
=======
>>>>>>> 521ec6d (Mostly solved)
=======
>>>>>>> c16f886 (Fixed some bugs testing to see if works before pushing)
  const res = await fetchWithToken(`/tasks/${id}`, "GET");
  const { task } = await res.json();
  const detailInput = taskDetails.getElementsByTagName("input");
  const dueDate = taskDetails.getElementsByClassName("detail-date");
  const taskId = document.getElementById("task-id");
  taskId.innerText = id;
  detailInput[0].value = data.task.detail;
  if (data.task.task.dueDate) {
    dueDate[0].value = data.task.due_date.split("T")[0];
  }
};
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 90f3c39 (Mostly solved)
<<<<<<< HEAD
>>>>>>> f581fca (Mostly solved)
=======
=======
=======
=======
>>>>>>> c41de1e (Mostly solved)
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
<<<<<<< HEAD
>>>>>>> 121b76f (Dogs part 1)
<<<<<<< HEAD
>>>>>>> fcf44d5 (Dogs part 1)
<<<<<<< HEAD
>>>>>>> 0edf544 (Dogs part 1)
=======
=======
=======
=======
  const res = await fetchWithToken(`/tasks/${id}`, "GET");
  const data = await res.json();
  const detailInput = taskDetails.getElementsByTagName("input");
  const dueDate = taskDetails.getElementsByClassName("detail-date");
  const taskId = document.getElementById("task-id");
  taskId.innerText = id;
  detailInput[0].value = data.task.detail;
  dueDate[0].value = data.task.due_date.split("T")[0];
};
>>>>>>> 90f3c39 (Mostly solved)
>>>>>>> c41de1e (Mostly solved)
>>>>>>> 521ec6d (Mostly solved)
<<<<<<< HEAD
>>>>>>> 5a3ed4a (Mostly solved)
=======
=======
>>>>>>> c16f886 (Fixed some bugs testing to see if works before pushing)
>>>>>>> 0f37de1 (Fixed some bugs testing to see if works before pushing)

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
