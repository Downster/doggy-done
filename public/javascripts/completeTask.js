import { fetchWithToken } from './utils.js';

export const checkboxListeners = () => {
  const checkboxList = document.querySelectorAll(".task-checkbox");
  checkboxList.forEach((task) => {
    task.addEventListener("click", async (e) => {
        e.stopImmediatePropagation();
        const id = e.currentTarget.id.split("-")[2];
        const checked = e.currentTarget.checked;
        const body = JSON.stringify({
            completed: checked,
        });
        const fakeCheck = document.getElementById(`checkbox-fake-check-${id}`);
        const fakeDiv = document.getElementById(`fake-checkbox-${id}`);
        fakeCheck.classList.toggle("active");
        fakeDiv.classList.toggle("active");
        const res = await fetchWithToken(`/tasks/${id}/completed`, 'PUT', body);
        const data = await res.json();

    });
})};
