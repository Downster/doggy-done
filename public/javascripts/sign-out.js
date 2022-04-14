import { fetchWithToken } from './utils.js';

// console.log(logoutUser);



const signOutBtn = document.getElementById('sign-out-btn');


signOutBtn.addEventListener('click', async(e) => {
    console.log('log me out please');
    // console.log(req.session.auth)
    // btn is clicked
        // cookie
        // session
            // user is logged out of app
        //redirect to home
     await fetch("/users/logout", {
         method: "POST",
         headers: { "Content-Type": "text/html" }})

})

//might need to change to app .json
