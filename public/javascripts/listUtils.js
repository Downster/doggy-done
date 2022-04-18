import { fetchWithToken } from "./utils.js";
import { deleteList, editListName, viewList } from "./viewEditDeleteList.js";
import { createListListener} from "./createList.js"

export const genLists = async () => {
    const response = await fetchWithToken('/lists');
    return await response.json();
}

export const buildListHTML = (list) => {
    const listDiv = document.createElement('div')
    listDiv.classList.add('list-div')
    const listEle = document.createElement("li");
    listEle.classList.add('menu-list');
    const listAnchor = document.createElement("a");
    listAnchor.href = ''
    listAnchor.classList.add('list-button')
    listAnchor.innerText = list.name
    listAnchor.setAttribute("id", `list-${list.id}`);
    const listButton = document.createElement("button");
    listButton.classList.add('delete-list-button');
    listButton.setAttribute("id", `delete-list-${list.id}`);
    listButton.innerText = '-'
    listEle.appendChild(listAnchor);
    listEle.appendChild(listButton)
    listDiv.appendChild(listEle)
    return listDiv;
};
  
export const genListHTML = async () => {
      const lists = await genLists();
      return lists.map((list) => buildListHTML(list));
};
  
export const populateLists = async () => {
    const listsHTML = await genListHTML();
    const allLists = document.querySelector(".list-items");
    allLists.innerHTML = "";
    for (let listName of listsHTML) {
        allLists.append(listName);
      }
  };


  export const populateListsAndAddListeners = async () => {
      await populateLists();
      viewList()
      deleteList();
  };

populateListsAndAddListeners();