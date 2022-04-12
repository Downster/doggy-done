console.log("navbar-file");

const hamburgerMenu = document.querySelector("#sub-nav-toggle");
console.log(hamburgerMenu);
hamburgerMenu.addEventListener("click", (e) => {
  console.log("here");
  const menu = document.querySelector(".nav-menu");
  const menuTitle = document.getElementById("menu-title");
  const appBody = document.querySelector(".app-body");
  console.log(appBody);
  menu.classList.toggle("active");
  menuTitle.classList.toggle("active");
  appBody.classList.toggle("active");
});
