import { fetchWithToken } from './utils.js';

const signOutBtn = document.getElementById('sign-out-btn');

signOutBtn.addEventListener('click', async(e) => {
    console.log('log me out please');
     await fetch("/users/logout", {
         method: "POST",
         headers: { "Content-Type": "text/html" }})
})
