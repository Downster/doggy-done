const taskList = document.querySelectorAll(".task-checkbox");
taskList.forEach((task) => {
  task.addEventListener("click", async (e) => {
    const id = e.target.id.split("-")[2];
    const checked =
      document.querySelector(`#task-checkbox-${id}:checked`) !== null;
    const res = await fetch(`/tasks/${id}/completed`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: checked,
      }),
    });
    const data = await res.json();
    console.log(data);
  });
});
