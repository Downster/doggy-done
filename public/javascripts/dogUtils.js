import { fetchWithToken } from "./utils.js";
import { getAllTasks } from "./taskUtils.js";

const handleDogCollapse = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const button = e.target;
  button.classList.toggle("active");
  const dogsArea = document.querySelector(".app-dogs");
  dogsArea.classList.toggle("active");
};

const handleFormCollapse = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const button = e.target;
  button.classList.toggle("active");
  const dogsForm = document.querySelector(".new-dog-container");
  dogsForm.classList.toggle("active");
};

const reloadDogs = async () => {
  const myDogs = document.querySelector('.app-dogs');
  myDogs.innerHTML = '';
  await genDogsArea();
}

const handleNewDog = async (e) => {
    const dogNameInput = document.querySelector('.new-dog-name-input');
    const dogBreedSelect = document.querySelector('.new-dog-breed-select');
    const dogName = dogNameInput.value;
    const breedId = dogBreedSelect.value;
    const body = JSON.stringify({dogName, breedId});
    const newDog = await fetchWithToken('/dogs', 'POST', body);
    await reloadDogs();
}

const genBreedSelector = async () => {
  const response = await fetchWithToken("/breeds");
  const data = await response.json();
  const selector = document.createElement("select");
  selector.classList.add("new-dog-breed-select");
  selector.setAttribute("name", "breedId");
  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("disabled", true);
  defaultOption.setAttribute("selected", true);
  defaultOption.innerText = "---- Select your doggo's breed! Woof! ----";
  selector.append(defaultOption);
  defaultOption.classList.add("breed-select-option");
  for (let breed of data) {
    const option = document.createElement("option");
    option.setAttribute("value", breed.id);
    option.classList.add("breed-select-option");
    option.innerText = breed.name;
    selector.append(option);
  }
  return selector;
};

export const genNewDogForm = async () => {
  const breedSelect = await genBreedSelector();
  const container = document.createElement("div");
  container.classList.add("new-dog-container");
  const dogNameInput = document.createElement("input");
  dogNameInput.setAttribute("name", "dogName");
  dogNameInput.setAttribute("type", "text");
  dogNameInput.classList.add("new-dog-name-input");
  const submit = document.createElement("button");
  submit.classList.add("new-dog-submit-button");
  submit.innerText = "Add Doggo";
  container.append(dogNameInput);
  container.append(breedSelect);
  container.append(submit);
  return container;
};

const pickBg = (dog) => {
  const bgImg = [
    "../images/dogbg0.png",
    "../images/dogbg1.png",
    "../images/dogbg2.png",
    "../images/dogbg3.png",
  ];
  return bgImg[dog.breed_id % bgImg.length];
};

const filterTasksWithDogId = () => {
  const allTasks = getAllTasks();
  const dogHeaders = document.querySelectorAll(".single-dog.active");
  console.log(dogHeaders);
  allTasks.forEach((task) => {
    const [, taskId] = task.id
      .split("task-container-")
      .map((e) => e.toString());
    if (
      !window.filterTaskByDog.has(taskId) &&
      (window.filterTaskByDog.length > 0 || dogHeaders.length > 0)
    ) {
      task.classList.add("hidden");
    } else {
      task.classList.remove("hidden");
    }
  });
};




const handleDogClick = async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const [ , dogId ] = e.target.id.split("single-dog-content-");
    console.log(dogId);
    const parent = e.target.parentNode;
    parent.classList.toggle("active");
    parent.classList.toggle("inactive");
    const dogRes = await fetchWithToken(`/dogs/${dogId}`);
    const data = await dogRes.json();
    const dogTasks = data.Tasks.map(task => task.id.toString());
    const activeDogs = document.querySelectorAll('.single-dog.active');
    const allDogs = document.querySelectorAll('.single-dog');
    if (activeDogs.length === 0) {
      allDogs.forEach(dog => dog.classList.remove("inactive"));
    }
    // filtertaskbydog is set in dogsload.js
    if (parent.classList.contains("active")) {
        parent.classList.remove("inactive");
        window.filterTaskByDog = new Set([...window.filterTaskByDog, ...dogTasks])
        const otherDogs = document.querySelectorAll('.single-dog:not(.active');
        otherDogs.forEach(dog => dog.classList.add("inactive"));
        console.log(otherDogs, 'bananas');
    } else {
        for (let dogTask of dogTasks) {
            window.filterTaskByDog.delete(dogTask);
            console.log(window.filterTaskByDog);
        }
    }
    filterTasksWithDogId();

}

const makeSingleDogArea = (dog) => {
  const entry = document.createElement("li");
  entry.classList.add("single-dog");
  entry.setAttribute("id", `$single-dog-${dog.id}`);
  const dogView = document.createElement("a");
  dogView.classList.add(".single-dog-content");
  dogView.setAttribute("id", `.single-dog-content-${dog.id}`);
  const bgSrc = pickBg(dog);
  entry.style.backgroundImage = `url(${bgSrc})`;
  entry.append(dogView);
  dogView.addEventListener("click", handleDogClick);
  dogView.innerText = dog.name;
  return entry;
};

const makeDogsArea = (dogs) => {
  const myDogs = document.querySelector(".my-dogs");
  if (dogs.length < 1) {
    myDogs.innerText = "You don't have any dogs!";
  } else {
    const list = document.createElement("ul");
    myDogs.append(list);
    list.classList.add("my-dogs-view");
    for (let dog of dogs) {
      list.append(makeSingleDogArea(dog));
    }
  }
};

export async function genDogsArea() {
    const res = await fetchWithToken(`/dogs`);
    const data = await res.json();
    console.log(data);
    const dogsArea = document.querySelector(".app-dogs");
    const collapse = document.createElement("button");
    collapse.classList.add('dog-area-collapse');
    collapse.innerText = "My Dogs"
    const dogList = document.createElement("div");
    dogList.classList.add("my-dogs");
    dogsArea.append(dogList);
    makeDogsArea(data);
    dogsArea.parentNode.insertBefore(collapse, dogsArea);
    const form = await genNewDogForm();
    const formCollapse = document.createElement("button");
    formCollapse.classList.add('dog-area-form-collapse');
    formCollapse.innerText = "New Doggo"
    dogsArea.append(formCollapse);
    dogsArea.append(form);
    collapse.addEventListener("click", handleDogCollapse);
    formCollapse.addEventListener("click", handleFormCollapse);
    const addDogBtn = document.querySelector('.new-dog-submit-button')
    addDogBtn.addEventListener("click", handleNewDog);
}
