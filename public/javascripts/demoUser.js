import { fetchWithToken } from "./utils.js";
const demoJoe = document.querySelector('.demo');
const body = JSON.stringify({
    email: 'joe@gmail.com',
    password: 'Password123!'
});

demoJoe.addEventListener('click', async(_e) => {
    const res = await fetchWithToken('users/login', 'POST', body);
    window.location.href = '/app';
});
