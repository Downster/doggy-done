import { fetchWithToken } from "./utils.js";
import { populateTasksAndAddListeners } from "./taskUtils.js";
import { populateListsAndAddListeners } from "./listUtils.js";

export const viewList = (e) => {
  const listButtons = document.querySelectorAll(".list-button");
  listButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const listId = button.id.split("-")[1];
      const taskItems = document.querySelector(".task-items");
      await populateTasksAndAddListeners("list", listId);
      showButton()
      editListName();
    });
  });
};

export const showButton = (e) => {
  const listInput = document.querySelector('.list-title');
  listInput.addEventListener('click', (e) => {
    const editButton = document.querySelector(".edit-list-button");
    editButton.classList.toggle('active')
  })
}

export const editListName = (e) => {
  const editButton = document.querySelector(".edit-list-button");
  editButton.addEventListener("click", async (e) => {
    const listName = document.querySelector(".list-title");
    if (listName.value === '') {
      window.alert('Please input a non empty value')
    } else {
      const listId = listName.id.split(`list-title-`).pop();
      const body = JSON.stringify({
        name: listName.value,
      });
      const res = await fetchWithToken(`/lists/${listId}`, "PATCH", body);
      const data = await res.json();
      await populateTasksAndAddListeners("list", listId);
      await populateListsAndAddListeners()
    }
  });
};

export const deleteList = (e) => {
  const deleteButtons = document.querySelectorAll(".delete-list-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const cont = confirm("Delete this list?");
      if (!cont) {
        return;
      } else {
        const listId = button.id.split("-")[2];
        const res = await fetchWithToken(`/lists/${listId}`, "DELETE");
        await populateTasksAndAddListeners();
        await populateListsAndAddListeners()
      }
    });
  });
};

