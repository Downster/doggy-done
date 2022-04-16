import { populateTasksAndAddListeners } from "./taskUtils.js";

export const getCompletedTasks = async (e) => {
    const completedLink = document.getElementById('completed-tasks-link');
    completedLink.addEventListener('click', async (e) => {
        console.log('here')
        e.preventDefault();
        await populateTasksAndAddListeners('completed');
    })
}

getCompletedTasks()
