const deleteTask = document.querySelectorAll('.delete-task');
if(deleteTask){
    deleteTask.forEach(button => {
        button.addEventListener('click', async(event) => {
            const id = event.target.id.split('-')[2];
            const taskToBeDeleted = document.querySelector('task/:taskId');
            const res = await fetch(`/tasks/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json()
            console.log(data);
            if(data.message === 'Success'){
               const taskToBeDeleted = document.getElementById(`task-container-${task.id}`);
               taskToBeDeleted.remove();
            }

        })
    })
}

deleteTask
