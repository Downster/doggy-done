import { fetchWithToken } from "./utils.js";
import { populateTasksAndAddListeners } from "./taskUtils.js";

const viewList = (e) => {
  const listButtons = document.querySelectorAll(".list-button");
  listButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const listId = button.id.split("-")[1];
      const taskItems = document.querySelector(".task-items");
      await populateTasksAndAddListeners("list", listId);
      editListName();
    });
  });
};

const editListName = (e) => {
  const editButton = document.querySelector(".edit-list-button");
  editButton.addEventListener("click", async (e) => {
    const listName = document.querySelector(".list-title");
    const listId = listName.id.split(`list-title-`).pop();
    const body = JSON.stringify({
      name: listName.value,
    });
    const res = await fetchWithToken(`/lists/${listId}`, "PATCH", body);
    const data = await res.json();
    console.log(data);
  });
};

const deleteList = (e) => {
  const deleteButtons = document.querySelectorAll(".delete-list-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const listId = button.id.split("-")[2];
      const res = await fetchWithToken(`/lists/${listId}`, "DELETE");
    });
  });
};

deleteList();
viewList();
