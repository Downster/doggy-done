import { fetchWithToken } from "./utils.js";
import { genTasksHTML, populateTasks } from "./taskUtils.js";

const viewList = (e) => {
  const listButtons = document.querySelectorAll(".list-button");
  listButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const listId = button.id.split("-")[1];
      populateTasks("list", listId);
    });
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
