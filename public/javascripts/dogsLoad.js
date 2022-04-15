import * as DogUtils from "./dogUtils.js";

(() => window.filterTaskByDog = new Set())();


document.addEventListener('DOMContentLoaded', async (_e) => {
    await DogUtils.genDogsArea();
})
