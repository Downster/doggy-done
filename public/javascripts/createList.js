const addListButton = document.querySelector(".add-list");

addListButton.addEventListener("click", async (e) => {
  const addListForm = document.querySelector(".add-list-form");
  const appBody = document.querySelector(".app-body");
  const header = document.querySelector(".header-nav");
  const navMenu = document.querySelector(".nav-menu-container");
  addListForm.classList.toggle("active");
  appBody.classList.toggle("blur");
  header.classList.toggle("blur");
  navMenu.classList.toggle("blur");
});
