import { fetchWithToken } from './utils.js';

export const checkboxListeners = () => {
  const checkboxList = document.querySelectorAll(".task-checkbox");
  checkboxList.forEach((task) => {
    task.addEventListener("click", async (e) => {
        const id = e.target.id.split("-")[2];
        const checked = e.target.checked;
        const body = JSON.stringify({
            completed: checked,
        });
        const res = await fetchWithToken(`/tasks/${id}/completed`, 'PUT', body);
        const data = await res.json();
        console.log(data);
    });
})};
