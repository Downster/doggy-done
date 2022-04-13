import { fetchWithToken } from "./utils.js";
import { taskToggleListeners } from "./taskToggle.js";
import { checkboxListeners } from "./completeTask.js";
const singleTaskClass = "single-task";
const taskContainerPrefix = "task-container";
const checkboxPrefix = "task-checkbox";
const checkboxClass = "task-checkbox";
const anchorClass = "task-click"
const anchorPrefix = "task-click";
const taskContainer = "all-tasks";


//                each task in tasks
// div(id=`task-container-${task.id}`).single-task
// if task.completed
//     input(type='checkbox' class='task-checkbox' id=`task-checkbox-${task.id}` checked='true')
//     a(href='' class=`task-click` id=`${task.id}`)= task.detail
// else
//     input(type='checkbox' class='task-checkbox' id=`task-checkbox-${task.id}`)
//     a(href='' class=`task-click` id=`${task.id}`)= task.detail

export const genTasks = async () => {
    const res =  await fetchWithToken("/tasks");
    const { tasks } = await res.json();
    return tasks;
}

const buildTaskHTML = (task) => {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add(singleTaskClass);
    taskContainer.setAttribute("id", `${taskContainerPrefix}-${task.id}`);
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `${checkboxPrefix}-${task.id}`);
    checkbox.classList.add(checkboxClass);
    if (task.completed) {
        checkbox.setAttribute("checked", true);
    }
    taskContainer.append(checkbox);
    const anchor = document.createElement("a");
    anchor.setAttribute("href", '');
    anchor.classList.add(anchorClass);
    anchor.setAttribute("id", `${anchorPrefix}-${task.id}`);
    anchor.innerText = task.detail;
    taskContainer.appendChild(anchor);
    return taskContainer;
}

export const genTasksHTML = async () => {
    const tasks = await genTasks();
    return tasks.map(task => buildTaskHTML(task));
}

export const populateTasks = async () => {
    const tasksHTML = await genTasksHTML();
    const allTasks = document.querySelector(".task-items");
    const tasksDetails = allTasks.querySelectorAll(".single-task");
    tasksDetails.forEach(task => task.remove());
    for (let taskDetail of tasksHTML) {
        console.log(taskDetail);
        allTasks.append(taskDetail);
    }
}

export const populateTasksAndAddListeners = async () => {
    await populateTasks();
    taskToggleListeners();
    checkboxListeners();
}
