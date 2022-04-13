import { fetchWithToken } from "./utils.js";
// const fetchWithToken = require('./utils');
const deleteTask = document.getElementById('delete-button');

deleteTask.addEventListener('click', async() => {
        const id = document.getElementById(`task-id`).innerText;
        console.log(id)
        const res = await fetchWithToken(`/tasks/${id}`, 'DELETE');
        const data = await res.json();
        console.log(data);
        if(data.message === 'Success'){
            const taskToBeDeleted = document.getElementById(`task-container-${task.id}`);
            taskToBeDeleted.remove();
        }

    })
