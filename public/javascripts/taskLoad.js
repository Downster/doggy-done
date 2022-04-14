import { populateTasksAndAddListeners } from "./taskUtils.js";
import { fetchWithToken } from "./utils.js";
import { closeButtonListeners, taskToggleListeners } from "./taskToggle.js";
import { checkboxListeners } from "./completeTask.js";

document.addEventListener('DOMContentLoaded', async (e) => {
    await populateTasksAndAddListeners();
});
