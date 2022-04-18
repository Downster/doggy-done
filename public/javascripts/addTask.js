import { fetchWithToken } from "./utils.js";
import { populateTasksAndAddListeners } from "./taskUtils.js";
const submitDiv = document.querySelector(".task-submit");
const button = submitDiv.lastChild;
const dateInput = document.getElementById("task-date");
const taskInput = document.getElementById("task-input");
dateInput.valueAsDate = new Date();


const handleAddTask = async (e) => {
  const input = document.getElementById("task-input");
  const priority = document.getElementById("task-priority");
    const date = document.getElementById("task-date");
    if (input.value === '') {
        window.alert('Please input a non empty value')
    } else {
        const body = JSON.stringify({
            detail: input.value,
            due_date: dayjs(date.value),
            priority: priority.value,
            completed: false,
        });
        if (document.querySelector(".edit-list-button")) {
            const listId = document
                .querySelector(".edit-list-button")
                .id.split("edit-list-")
                .pop();
            const res = await fetchWithToken(`/lists/${listId}/tasks`, "POST", body);
            await populateTasksAndAddListeners("list", listId);
        } else {
            const res = await fetchWithToken("/tasks", "POST", body);
            await populateTasksAndAddListeners();
        }
        input.value = null;
        priority.value = 1;
    }
}

const handleAddTaskWithKeydownWrapper = async (e) => {
  if (e.key === "Enter") {
    return handleAddTask(e);
  }
}

button.addEventListener("click", handleAddTask);
taskInput.addEventListener("keydown", handleAddTaskWithKeydownWrapper);
