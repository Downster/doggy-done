import { fetchWithToken } from "./utils.js"

export const genDogsArea = async () => {
    const res = await fetchWithToken(`/dogs`);
    const data = await res.json();
    console.log(data);
    const dogsArea = document.querySelector(".app-dogs");
    const collapse = document.createElement("button");
    collapse.classList.add('dog-area-collapse');
    collapse.innerText = "My Dogs"
    dogsArea.parentNode.insertBefore(collapse, dogsArea);
    collapse.addEventListener("click", handleDogCollapse);
    if(data.length === 0) {
        const form = await genNewDogForm();
        dogsArea.append(form);
    }
}

const handleDogCollapse = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const button = e.target;
    button.classList.toggle("active");
    const dogsArea = document.querySelector(".app-dogs");
    dogsArea.classList.toggle("active");
}

const handleFormCollapse = () => {
    
}

const handleNewDog = async (e) => {

}

const genBreedSelector = async () => {
    const response = await fetchWithToken("/breeds");
    const data = await response.json();
    const selector = document.createElement("select");
    selector.classList.add("breed-select");
    selector.setAttribute("name", "breedId");
    const defaultOption = document.createElement("option");
    defaultOption.setAttribute("disabled", true);
    defaultOption.innerText = "---- Select your doggo's breed! Woof! ----";
    selector.append(defaultOption);
    defaultOption.classList.add("breed-select-option");
    console.log(data);
    for (let breed of data) {
        const option = document.createElement("option");
        option.setAttribute("value", breed.Id)
        option.classList.add("breed-select-option");
        option.innerText = breed.name;
        selector.append(option);
    }
    return selector;
}

export const genNewDogForm = async () => {
    const breedSelect = await genBreedSelector();
    const container = document.createElement("div");
    container.classList.add("new-dog-container");
    const dogNameInput = document.createElement("input");
    dogNameInput.setAttribute("name", "dogName");
    dogNameInput.setAttribute("type", "text");
    dogNameInput.classList.add("new-dog-name-input");
    const submit = document.createElement("button")
    submit.classList.add("new-dog-button");
    submit.innerText = "Add Doggo";
    container.append(dogNameInput);
    container.append(breedSelect);
    container.append(submit);
    return container;
}
