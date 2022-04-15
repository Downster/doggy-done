import { fetchWithToken } from "./utils.js";
const signOutBtn = document.getElementById("nav-sign-out");

signOutBtn.addEventListener("click", async (e) => {
  console.log("log me out please");
  await fetch("/users/logout", {
    method: "POST",
    headers: { "Content-Type": "text/html" },
  });
});

