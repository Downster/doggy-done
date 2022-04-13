import {extractCSRFToken } from './utils.js';

const editBtn = document.getElementById('edit-detail-btn')

editBtn.addEventListener('click', async(e) => {
    console.log("clicked")
    const detail = document.getElementById('detail-text');
    const date = document.getElementById('detail-date');
    const taskId = document.getElementById('task-id').innerText

    const token = extractCSRFToken();

    console.log(taskId)

    //fetch request!
        //

    const res = await fetch(`/tasks/${taskId}`, {
        method: 'PATCH',
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "CSRF-Token": token },
        body: JSON.stringify({
            detail: detail.value,
            due_date: new Date(date.value),
          }),
    });
    

})
