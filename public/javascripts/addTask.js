const submitDiv = document.querySelector(".task-submit");
const button = submitDiv.lastChild;

button.addEventListener("click", async (e) => {
  const input = document.getElementById("task-input");
  const priority = document.getElementById("task-priority");
  const date = document.getElementById("task-date");

  const res = await fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      detail: input.value,
      due_date: new Date(date.value),
      priority: priority.value,
      completed: false,
    }),
  });
  //select div and re render
});
