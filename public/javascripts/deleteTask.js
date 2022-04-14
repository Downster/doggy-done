import { fetchWithToken } from "./utils.js";
// const fetchWithToken = require('./utils');
const deleteTask = document.getElementById('delete-button');

deleteTask.addEventListener('click', async() => {
        const id = document.getElementById(`task-id`).innerText;
        const res = await fetchWithToken(`/tasks/${id}`, 'DELETE');
        if(res.ok){
            const taskToBeDeleted = document.getElementById(`task-container-${id}`);
            taskToBeDeleted.remove();
        }
    });
