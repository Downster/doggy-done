console.log("navbar-file");

const hamburgerMenu = document.querySelector("#sub-nav-toggle");
hamburgerMenu.addEventListener("click", (e) => {
  const menu = document.querySelector(".nav-menu");
  const menuTitle = document.getElementById("menu-title");
  menu.classList.toggle("active");
  menuTitle.classList.toggle("active");
});
