const searchBar = document.getElementById("search");

searchBar.addEventListener("click", (e) => {
  console.log("clicked bar");
});

searchBar.addEventListener("keyup", (e) => {
  console.log(e.target.value);
});

export const genSearchArea = async () => {};
