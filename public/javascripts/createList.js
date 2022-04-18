import { fetchWithToken } from "./utils.js";
import { populateTasksAndAddListeners } from "./taskUtils.js";
import {  populateListsAndAddListeners} from "./listUtils.js";

export const createListListener = (e) => {

    const addListButton = document.querySelector(".add-list");

    const listFormButton = document.getElementById("create-list");

    const handleListAdd = async (e) => {
        e.preventDefault();
        const addListForm = document.querySelector(".add-list-form");
        const appBody = document.querySelector(".app-body");
        const header = document.querySelector(".header-nav");
        const navMenu = document.querySelector(".nav-menu-container");
        const input = document.getElementById("list-name-input");
        if (input.value === '') {
            window.alert('Please input a non empty value')
        } else {
            const listName = input.value;
            const body = JSON.stringify({ listName });
            try {
                const response = await fetchWithToken("/lists", "POST", body);
                const { list } = await response.json();
                const newListId = list.id;
                addListForm.classList.toggle("active");
                appBody.classList.toggle("blur");
                header.classList.toggle("blur");
                navMenu.classList.toggle("blur");
                await populateTasksAndAddListeners("list", newListId);
                await populateListsAndAddListeners();
                input.value = ''
            } catch (e) {
                alert("Couldn't add list! Do you already have a list with that name?")
            }
        }

    }


    listFormButton.addEventListener("click", handleListAdd);


    addListButton.addEventListener("click", async (e) => {
        e.stopPropagation();
        const addListForm = document.querySelector(".add-list-form");
        const appBody = document.querySelector(".app-body");
        const header = document.querySelector(".header-nav");
        const navMenu = document.querySelector(".nav-menu-container");
        addListForm.classList.toggle("active");
        appBody.classList.toggle("blur");
        header.classList.toggle("blur");
        navMenu.classList.toggle("blur");
    });

}

createListListener()
