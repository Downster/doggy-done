import {extractCSRFToken } from './utils.js';

const taskList = document.querySelectorAll(".task-checkbox");
taskList.forEach((task) => {
  task.addEventListener("click", async (e) => {
    const id = e.target.id.split("-")[2];
    const token = extractCSRFToken();
    const checked =
      document.querySelector(`#task-checkbox-${id}:checked`) !== null;
    const res = await fetch(`/tasks/${id}/completed`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "CSRF-Token": token },
      body: JSON.stringify({
        completed: checked,
      }),
    });
    const data = await res.json();
    console.log(data);
  });
});
