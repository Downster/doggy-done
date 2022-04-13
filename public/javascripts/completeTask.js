import { fetchWithToken } from './utils.js';

const taskList = document.querySelectorAll(".task-checkbox");
taskList.forEach((task) => {
  task.addEventListener("click", async (e) => {
    const id = e.target.id.split("-")[2];
    const checked =
      document.querySelector(`#task-checkbox-${id}:checked`) !== null;
    const body = JSON.stringify({
        completed: checked,
    });
    const res = await fetchWithToken(`/tasks/${id}/completed`, 'POST', body);
    const data = await res.json();
    console.log(data);
  });
});
